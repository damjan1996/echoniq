// src/lib/server-api.ts
// Replacement for Supabase server functions
import mockData from '@/lib/mock-data';
import {
  Artist,
  ArtistWithReleases,
  BlogCategory,
  BlogPost,
  BlogPostWithAuthor,
  FilterOptions,
  MusicGenre,
  Release,
  ReleaseWithTracks,
} from '@/types/database';

// Server-side functions that replace the original Supabase server functions

// Artist functions
export const getServerArtists = async (options: FilterOptions = {}): Promise<Artist[]> => {
  return mockData.getArtists(options);
};

export const getServerArtistBySlug = async (slug: string): Promise<ArtistWithReleases | null> => {
  return mockData.getArtistBySlug(slug);
};

// Music genre functions
export const getServerMusicGenres = async (): Promise<MusicGenre[]> => {
  return mockData.getGenres();
};

// Release functions
export const getServerReleases = async (options: FilterOptions = {}): Promise<Release[]> => {
  return mockData.getReleases(options);
};

export const getServerReleaseBySlug = async (slug: string): Promise<ReleaseWithTracks | null> => {
  return mockData.getReleaseBySlug(slug);
};

// Blog functions
export const getServerBlogPosts = async (
  options: FilterOptions = {}
): Promise<BlogPostWithAuthor[]> => {
  return mockData.getBlogPosts(options);
};

export const getServerBlogPostBySlug = async (slug: string): Promise<BlogPostWithAuthor | null> => {
  return mockData.getBlogPostBySlug(slug);
};

export const getServerBlogCategories = async (): Promise<BlogCategory[]> => {
  return mockData.getBlogCategories();
};

export const getServerBlogPostsForSitemap = async (): Promise<BlogPost[]> => {
  // For sitemap generation, we return all published posts
  const posts = mockData.getBlogPosts({ featured: false });
  return posts.filter((post) => post.is_published);
};

// Studio functions
export const getServerStudioServices = async () => {
  return mockData.getStudioServices();
};
