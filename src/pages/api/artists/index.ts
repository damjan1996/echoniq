// src/pages/api/artists/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { trackEvent } from '@/lib/analytics';
import adminClient, { getAllArtists, getArtistBySlug } from '@/lib/supabase/admin';

/**
 * Artist API handler
 *
 * GET: Retrieves artists, optionally filtered
 * POST: Creates a new artist (admin only)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (method) {
      case 'GET':
        return await handleGet(req, res);

      case 'POST':
        return await handlePost(req, res);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('Artists API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Handle GET requests
 *
 * Query parameters:
 * - slug: Get a specific artist by slug
 * - genre: Filter by genre
 * - limit: Limit the number of results
 * - featured: Only return featured artists (true/false)
 * - orderBy: Field to order by
 * - ascending: Order direction (true/false)
 */
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { slug, genre, limit = 100, featured, orderBy = 'name', ascending = 'true' } = req.query;

  // Handle retrieval by slug
  if (slug && typeof slug === 'string') {
    const artist = await getArtistBySlug(slug);

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    // Track artist view if analytics is enabled
    trackEvent('artist_view', {
      category: 'content',
      label: artist.name,
      artistId: artist.id,
    });

    return res.status(200).json(artist);
  }

  // Get multiple artists with filters
  const artists = await getAllArtists({
    genre: typeof genre === 'string' ? genre : undefined,
    limit: typeof limit === 'string' ? parseInt(limit, 10) : 100,
    orderBy: typeof orderBy === 'string' ? orderBy : 'name',
    ascending: ascending === 'true',
  });

  // Filter for featured artists if requested
  const filteredArtists =
    featured === 'true' ? artists.filter((artist) => artist.is_featured) : artists;

  return res.status(200).json(filteredArtists);
}

/**
 * Handle POST requests to create a new artist
 * Requires admin authentication
 */
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // Check for API key or auth token to ensure only admins can create artists
  const apiKey = req.headers['x-api-key'];
  const authToken = req.headers.authorization?.split(' ')[1];

  if (!apiKey && !authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validate API key or verify auth token
  if (apiKey) {
    if (apiKey !== process.env.API_SECRET_KEY) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
  } else if (authToken) {
    // Verify JWT token
    const { error } = await adminClient.auth.getUser(authToken);
    if (error) {
      return res.status(401).json({ error: 'Invalid authentication token' });
    }
  }

  // Validate request body
  const { name, slug, bio, genre, profile_image } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ error: 'Name and slug are required' });
  }

  // Check if artist with this slug already exists
  const { data: existingArtist } = await adminClient
    .from('artists')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (existingArtist) {
    return res.status(409).json({ error: 'An artist with this slug already exists' });
  }

  // Create new artist
  const { data, error } = await adminClient
    .from('artists')
    .insert([
      {
        name,
        slug,
        bio: bio || null,
        genre: genre || null,
        profile_image: profile_image || null,
        is_published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating artist:', error);
    return res.status(500).json({ error: 'Failed to create artist' });
  }

  return res.status(201).json(data);
}
