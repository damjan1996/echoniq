import type { NextApiRequest, NextApiResponse } from 'next';

import mockData from '@/lib/mock-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract query parameters
    const { genre, orderBy, ascending, featured, search } = req.query;

    // Fetch artists with filters
    const artists = mockData.getArtists({
      genre: genre as string,
      orderBy: orderBy as string,
      ascending: ascending === 'true',
      featured: featured === 'true',
      search: search as string,
      published: true, // Only published artists
    });

    return res.status(200).json(artists);
  } catch (error) {
    console.error('Error in artists API:', error);
    return res.status(500).json({ error: 'Failed to fetch artists' });
  }
}
