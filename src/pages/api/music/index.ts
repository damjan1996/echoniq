// src/pages/api/music/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { trackEvent } from '@/lib/analytics';
import adminClient, { getAllReleases, getReleaseBySlug } from '@/lib/supabase/admin';

/**
 * Music/Releases API handler
 *
 * GET: Retrieves music releases, optionally filtered
 * POST: Creates a new release (admin only)
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
    console.error('Music API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Handle GET requests
 *
 * Query parameters:
 * - slug: Get a specific release by slug
 * - artistId: Filter by artist ID
 * - genre: Filter by genre
 * - limit: Limit the number of results
 * - featured: Only return featured releases (true/false)
 * - orderBy: Field to order by
 * - ascending: Order direction (true/false)
 */
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const {
    slug,
    artistId,
    genre,
    limit = 100,
    featured,
    orderBy = 'release_date',
    ascending = 'false',
  } = req.query;

  // Handle retrieval by slug
  if (slug && typeof slug === 'string') {
    const release = await getReleaseBySlug(slug);

    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }

    // Get artist name safely - handle both array and object structures
    let artistName = 'Unknown Artist';
    if (release.artists) {
      if (Array.isArray(release.artists) && release.artists.length > 0) {
        artistName = release.artists[0].name || 'Unknown Artist';
      } else if (typeof release.artists === 'object' && release.artists !== null) {
        // Handle case where artists might be a single object or have a different structure
        artistName = release.artists.name || 'Unknown Artist';
      }
    }

    // Track release view if analytics is enabled
    trackEvent('release_view', {
      category: 'content',
      label: release.title,
      releaseId: release.id,
      artist: artistName,
    });

    return res.status(200).json(release);
  }

  // Get multiple releases with filters
  const releases = await getAllReleases({
    artistId: typeof artistId === 'string' ? artistId : undefined,
    genre: typeof genre === 'string' ? genre : undefined,
    limit: typeof limit === 'string' ? parseInt(limit, 10) : 100,
    orderBy: typeof orderBy === 'string' ? orderBy : 'release_date',
    ascending: ascending === 'true',
  });

  // Filter for featured releases if requested
  const filteredReleases =
    featured === 'true' ? releases.filter((release) => release.is_featured) : releases;

  return res.status(200).json(filteredReleases);
}

/**
 * Handle POST requests to create a new release
 * Requires admin authentication
 */
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // Check for API key or auth token to ensure only admins can create releases
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
  const {
    title,
    slug,
    artist_id,
    description,
    cover_image,
    release_date,
    genre,
    catalog_number,
    release_type = 'Single',
    tracks = [],
  } = req.body;

  if (!title || !slug || !artist_id || !release_date) {
    return res.status(400).json({
      error: 'Required fields missing',
      requiredFields: ['title', 'slug', 'artist_id', 'release_date'],
    });
  }

  // Check if release with this slug already exists
  const { data: existingRelease } = await adminClient
    .from('releases')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (existingRelease) {
    return res.status(409).json({ error: 'A release with this slug already exists' });
  }

  // Check if artist exists
  const { data: artist } = await adminClient
    .from('artists')
    .select('id')
    .eq('id', artist_id)
    .maybeSingle();

  if (!artist) {
    return res.status(404).json({ error: 'Artist not found' });
  }

  // Create new release
  const { data: release, error: releaseError } = await adminClient
    .from('releases')
    .insert([
      {
        title,
        slug,
        artist_id,
        description: description || null,
        cover_image: cover_image || null,
        release_date,
        genre: genre || null,
        catalog_number: catalog_number || null,
        release_type,
        is_published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (releaseError) {
    console.error('Error creating release:', releaseError);
    return res.status(500).json({ error: 'Failed to create release' });
  }

  // Add tracks if provided
  if (tracks.length > 0) {
    interface TrackInput {
      title: string;
      track_number?: number;
      duration?: number | string;
      preview_url?: string;
      isrc?: string;
      [key: string]: unknown; // Geändert von 'any' zu 'unknown'
    }

    const formattedTracks = tracks.map((track: TrackInput, index: number) => ({
      title: track.title,
      release_id: release.id,
      track_number: track.track_number || index + 1,
      duration: track.duration || null,
      preview_url: track.preview_url || null,
      isrc: track.isrc || null,
      is_published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { error: tracksError } = await adminClient.from('tracks').insert(formattedTracks);

    if (tracksError) {
      console.error('Error adding tracks:', tracksError);
      // We've already created the release, so return success but with a warning
      return res.status(201).json({
        ...release,
        warning: 'Release was created but tracks could not be added',
        error: tracksError.message,
      });
    }
  }

  // Create the artist-release relation
  const { error: relationError } = await adminClient.from('artist_releases').insert([
    {
      artist_id,
      release_id: release.id,
      is_primary: true,
    },
  ]);

  if (relationError) {
    console.error('Error creating artist-release relation:', relationError);
    // We've already created the release, so return success but with a warning
    return res.status(201).json({
      ...release,
      warning: 'Release was created but artist relation could not be added',
      error: relationError.message,
    });
  }

  return res.status(201).json(release);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
