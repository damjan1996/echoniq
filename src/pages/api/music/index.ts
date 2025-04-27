import type { NextApiRequest, NextApiResponse } from 'next';

import mockData from '@/lib/mock-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract query parameters
    const { genre, orderBy, ascending, featured, search, artist } = req.query;

    // Fetch releases with filters
    let releases = mockData.getReleases({
      genre: genre as string,
      orderBy: orderBy as string,
      ascending: ascending === 'true',
      featured: featured === 'true',
      search: search as string,
      published: true, // Only published releases
    });

    // Additional filter by artist if provided
    if (artist) {
      releases = releases.filter((release) => release.artist_id === artist);
    }

    // Add artist details to each release
    const releasesWithArtists = releases.map((release) => {
      const artist = mockData.getArtistBySlug(release.artist_id);
      return { ...release, artist };
    });

    // Add tracks to each release
    const releasesWithTracks = releasesWithArtists.map((release) => {
      const tracks = mockData.getTracksForRelease(release.id);
      return { ...release, tracks };
    });

    return res.status(200).json(releasesWithTracks);
  } catch (error) {
    console.error('Error in music API:', error);
    return res.status(500).json({ error: 'Failed to fetch releases' });
  }
}
