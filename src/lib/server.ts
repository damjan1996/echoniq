// src/lib/server.ts
// Server-side API functions to replace Supabase server functions

import { FilterOptions } from '@/types/database';

import mockData from './mock-data';

// ARTISTS

export async function getServerArtists(options: FilterOptions = {}) {
  // Get artists with default filtering for published ones
  return mockData.getArtists({
    ...options,
    published: options.published !== undefined ? options.published : true,
  });
}

export async function getServerArtistBySlug(slug: string) {
  const artist = mockData.getArtistBySlug(slug);
  if (!artist) return null;

  // Get artist's releases
  const releases = mockData
    .getReleases({
      published: true,
    })
    .filter((release) => release.artist_id === artist.id);

  // Add tracks to each release
  const releasesWithTracks = releases.map((release) => {
    const tracks = mockData.getTracksForRelease(release.id);
    return { ...release, tracks };
  });

  return { ...artist, releases: releasesWithTracks };
}

export async function getServerArtistForSitemap() {
  // Get all published artists for sitemap generation
  return mockData.getArtists({ published: true });
}

// MUSIC

export async function getServerMusicGenres() {
  return mockData.getGenres();
}

export async function getServerReleases(options: FilterOptions = {}) {
  // Get releases with default filtering for published ones
  return mockData.getReleases({
    ...options,
    published: options.published !== undefined ? options.published : true,
  });
}

export async function getServerReleaseBySlug(slug: string) {
  const release = mockData.getReleaseBySlug(slug);
  if (!release) return null;

  // Get artist
  const artist = mockData.getArtistBySlug(release.artist_id);

  // Get tracks
  const tracks = mockData.getTracksForRelease(release.id);

  return {
    ...release,
    artist,
    tracks,
  };
}

export async function getServerReleasesForSitemap() {
  // Get all published releases for sitemap generation
  return mockData.getReleases({ published: true });
}

// BLOG

export async function getServerBlogPosts(options: FilterOptions = {}) {
  // Get blog posts with default filtering for published ones
  const posts = mockData.getBlogPosts({
    ...options,
    published: options.published !== undefined ? options.published : true,
  });

  // Add author to each post
  return posts.map((post) => {
    const author = post.author_id ? mockData.getArtistBySlug(post.author_id) : null;

    return { ...post, authors: author };
  });
}

export async function getServerBlogPostBySlug(slug: string) {
  const post = mockData.getBlogPostBySlug(slug);
  if (!post) return null;

  // Get author
  const author = post.author_id ? mockData.getArtistBySlug(post.author_id) : null;

  return { ...post, authors: author };
}

export async function getServerBlogCategories() {
  return mockData.getBlogCategories();
}

export async function getServerBlogPostsForSitemap() {
  // Get all published blog posts for sitemap generation
  return mockData.getBlogPosts({ published: true });
}

// STUDIO

export async function getServerStudioServices() {
  return mockData.getStudioServices();
}

// CONTACT - Send email functions would go here
// In a real app, you would integrate with an email service

// NEWSLETTER - Subscribe functions would go here
// In a real app, you would integrate with a newsletter service
