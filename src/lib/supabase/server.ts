// src/lib/supabase/server.ts
import supabaseClient from './client';
import { BlogPostWithAuthor, BlogCategory, Genre, Studio } from './types';

/**
 * Get all blog posts with optional filtering
 */
export async function getServerBlogPosts(options?: {
  category?: string | null;
  tag?: string;
  authorId?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: string;
  ascending?: boolean;
}) {
  let query = supabaseClient
    .from('blog_posts')
    .select(
      `
      *,
      authors:author_id (*)
    `
    )
    .eq('is_published', true);

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? false });
  } else {
    query = query.order('published_at', { ascending: false });
  }

  // Apply filters if provided
  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.tag) {
    query = query.contains('tags', [options.tag]);
  }

  if (options?.authorId) {
    query = query.eq('author_id', options.authorId);
  }

  if (options?.featured !== undefined) {
    query = query.eq('is_featured', options.featured);
  }

  // Apply pagination
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }

  return data as BlogPostWithAuthor[];
}

/**
 * Get a blog post by slug
 */
export async function getServerBlogPostBySlug(slug: string) {
  const { data, error } = await supabaseClient
    .from('blog_posts')
    .select(
      `
      *,
      authors:author_id (*)
    `
    )
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }

  return data as BlogPostWithAuthor;
}

/**
 * Get all blog categories
 */
export async function getServerBlogCategories() {
  const { data, error } = await supabaseClient.from('blog_categories').select('*').order('name');

  if (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }

  return data as BlogCategory[];
}

/**
 * Get a blog category by slug
 */
export async function getServerBlogCategoryBySlug(slug: string) {
  const { data, error } = await supabaseClient
    .from('blog_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching blog category with slug ${slug}:`, error);
    return null;
  }

  return data as BlogCategory;
}

/**
 * Get total count of blog posts with optional filtering
 */
export async function getServerBlogPostsCount(options?: {
  category?: string;
  tag?: string;
  authorId?: string;
}) {
  let query = supabaseClient
    .from('blog_posts')
    .select('id', { count: 'exact' })
    .eq('is_published', true);

  // Apply filters if provided
  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.tag) {
    query = query.contains('tags', [options.tag]);
  }

  if (options?.authorId) {
    query = query.eq('author_id', options.authorId);
  }

  const { count, error } = await query;

  if (error) {
    console.error('Error counting blog posts:', error);
    throw error;
  }

  return count || 0;
}

/**
 * Get all blog posts for sitemap generation
 */
export async function getServerBlogPostsForSitemap() {
  const { data, error } = await supabaseClient
    .from('blog_posts')
    .select('slug, updated_at, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    throw error;
  }

  return data;
}

/**
 * Get all artists
 */
export async function getServerArtists(options?: {
  featured?: boolean;
  genre?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
  ascending?: boolean;
}) {
  let query = supabaseClient.from('artists').select('*');

  // Apply filters if provided
  if (options?.featured !== undefined) {
    query = query.eq('is_featured', options.featured);
  }

  if (options?.genre) {
    query = query.contains('genres', [options.genre]);
  }

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? true });
  } else {
    query = query.order('name');
  }

  // Apply pagination
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }

  return data;
}

/**
 * Get an artist by slug
 */
export async function getServerArtistBySlug(slug: string) {
  const { data, error } = await supabaseClient
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching artist with slug ${slug}:`, error);
    return null;
  }

  return data;
}

/**
 * Get all music genres
 */
export async function getServerMusicGenres() {
  const { data, error } = await supabaseClient.from('genres').select('*').order('name');

  if (error) {
    console.error('Error fetching music genres:', error);
    throw error;
  }

  return data as Genre[];
}

/**
 * Get all releases
 */
export async function getServerReleases(options?: {
  artistId?: string;
  genre?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: string;
  ascending?: boolean;
}) {
  let query = supabaseClient.from('releases').select(`
      *,
      artists:artist_id (*)
    `);

  // Apply filters if provided
  if (options?.artistId) {
    query = query.eq('artist_id', options.artistId);
  }

  if (options?.genre) {
    query = query.contains('genres', [options.genre]);
  }

  if (options?.featured !== undefined) {
    query = query.eq('is_featured', options.featured);
  }

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? false });
  } else {
    query = query.order('release_date', { ascending: false });
  }

  // Apply pagination
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching releases:', error);
    throw error;
  }

  return data;
}

/**
 * Get a release by slug
 */
export async function getServerReleaseBySlug(slug: string) {
  const { data, error } = await supabaseClient
    .from('releases')
    .select(
      `
      *,
      artists:artist_id (*)
    `
    )
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching release with slug ${slug}:`, error);
    return null;
  }

  return data;
}

// Define table interfaces for typings
// Removed unused StudioTable interface and keeping others needed for typings
interface EquipmentTable {
  id: string;
  name: string;
  category: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
}

interface TeamMemberTable {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar: string | null;
  order: number;
  created_at: string;
  updated_at: string | null;
}

interface CommentTable {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string | null;
}

/**
 * Get studio information
 */
export async function getServerStudioInfo() {
  const { data, error } = await supabaseClient.from('studio').select('*').single();

  if (error) {
    console.error('Error fetching studio information:', error);
    throw error;
  }

  return data as unknown as Studio;
}

/**
 * Get studio services
 */
export async function getServerStudioServices() {
  const { data, error } = await supabaseClient.from('studio_services').select('*').order('price');

  if (error) {
    console.error('Error fetching studio services:', error);
    throw error;
  }

  return data;
}

/**
 * Get studio equipment
 */
export async function getServerStudioEquipment() {
  const { data, error } = await supabaseClient
    .from('studio_equipment')
    .select('*')
    .order('category');

  if (error) {
    console.error('Error fetching studio equipment:', error);
    throw error;
  }

  return data as unknown as EquipmentTable[];
}

/**
 * Get team members
 */
export async function getServerTeamMembers() {
  const { data, error } = await supabaseClient.from('team_members').select('*').order('order');

  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }

  return data as unknown as TeamMemberTable[];
}

/**
 * Get all blog post comments
 */
export async function getServerBlogPostComments(postId: string) {
  const { data, error } = await supabaseClient
    .from('comments')
    .select('*')
    // @ts-ignore - Database schema type for comments table is not fully defined
    .eq('post_id', postId)
    // @ts-ignore - Database schema type for comments table is not fully defined
    .eq('is_approved', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }

  return data as unknown as CommentTable[];
}

/**
 * Submit a new blog post comment
 */
export async function submitServerBlogPostComment(comment: {
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
}) {
  // @ts-ignore - Database schema type for comments table is not fully defined
  const { data, error } = await supabaseClient
    .from('comments')
    .insert([
      {
        ...comment,
        is_approved: false, // Comments need approval by default
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }

  return data as unknown as CommentTable;
}

/**
 * Search content
 */
export async function searchServerContent(query: string) {
  // Search blog posts
  const blogQuery = supabaseClient
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .or(`title.ilike.%${query}%, excerpt.ilike.%${query}%, content.ilike.%${query}%`)
    .limit(5);

  // Search artists
  const artistsQuery = supabaseClient
    .from('artists')
    .select('*')
    .or(`name.ilike.%${query}%, bio.ilike.%${query}%`)
    .limit(5);

  // Search releases
  const releasesQuery = supabaseClient
    .from('releases')
    .select('*, artists:artist_id(*)')
    .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
    .limit(5);

  // Run all queries in parallel
  const [blogResult, artistsResult, releasesResult] = await Promise.all([
    blogQuery,
    artistsQuery,
    releasesQuery,
  ]);

  // Handle errors
  if (blogResult.error) {
    console.error('Error searching blog posts:', blogResult.error);
  }

  if (artistsResult.error) {
    console.error('Error searching artists:', artistsResult.error);
  }

  if (releasesResult.error) {
    console.error('Error searching releases:', releasesResult.error);
  }

  return {
    blogPosts: blogResult.data || [],
    artists: artistsResult.data || [],
    releases: releasesResult.data || [],
  };
}
