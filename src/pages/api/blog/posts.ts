import type { NextApiRequest, NextApiResponse } from 'next';

import mockData from '@/lib/mock-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract query parameters
    const {
      category,
      tag,
      search,
      page = '1',
      pageSize = '9',
      featured,
      orderBy = 'published_at',
      ascending = 'false',
    } = req.query;

    // Convert to proper types
    const currentPage = parseInt(page as string, 10);
    const limit = parseInt(pageSize as string, 10);
    const skip = (currentPage - 1) * limit;

    // Fetch all matching posts first for total count
    const allPosts = mockData.getBlogPosts({
      category: category as string,
      tag: tag as string,
      search: search as string,
      published: true,
      featured: featured === 'true',
      orderBy: orderBy as string,
      ascending: ascending === 'true',
    });

    // Calculate total
    const total = allPosts.length;

    // Apply pagination manually
    const paginatedPosts = allPosts.slice(skip, skip + limit);

    // Add author to each post
    const postsWithAuthors = paginatedPosts.map((post) => {
      if (!post.author_id) return { ...post, authors: null };

      const author = mockData.getArtistBySlug(post.author_id);
      return { ...post, authors: author };
    });

    // Return paginated results with metadata
    return res.status(200).json({
      posts: postsWithAuthors,
      pagination: {
        total,
        page: currentPage,
        pageSize: limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error in blog posts API:', error);
    return res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
}
