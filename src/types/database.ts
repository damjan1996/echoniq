// src/types/database.ts
// Type definitions for the database entities

// Base type with common fields
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at?: string;
}

// User related types
export interface User extends BaseEntity {
  email: string;
  name?: string;
  role?: 'admin' | 'user';
  password?: string; // Only stored in mock data, in real app would be hashed
}

// Artist related types
export interface Artist extends BaseEntity {
  name: string;
  slug: string;
  bio?: string | null;
  genre?: string | null;
  profile_image?: string | null;
  cover_image?: string | null;
  is_published?: boolean;
  is_featured?: boolean;
  email?: string | null;
  website?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  soundcloud?: string | null;
  spotify?: string | null;
  bandcamp?: string | null;
  youtube?: string | null;
}

// Music related types
export interface Release extends BaseEntity {
  title: string;
  slug: string;
  release_date: string;
  artist_id: string;
  cover_image?: string | null;
  description?: string | null;
  genre_id?: string | null;
  is_published?: boolean;
  is_featured?: boolean;
  spotify_url?: string | null;
  apple_music_url?: string | null;
  soundcloud_url?: string | null;
  bandcamp_url?: string | null;
  beatport_url?: string | null;
  youtube_url?: string | null;
}

export interface ReleaseWithArtist extends Release {
  artist?: Artist;
}

export interface Track extends BaseEntity {
  title: string;
  release_id: string;
  duration?: number | null;
  track_number?: number | null;
  preview_url?: string | null;
  is_published?: boolean;
}

export interface ReleaseWithTracks extends Release {
  tracks?: Track[];
}

// Die Definition wurde angepasst, um mit der in der Komponente erwarteten Struktur kompatibel zu sein
export interface ArtistWithReleases extends Artist {
  releases?: ReleaseWithTracks[];
}

export interface MusicGenre extends BaseEntity {
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
}

// Blog related types
export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  content?: string | null;
  excerpt?: string | null;
  author_id?: string | null;
  featured_image?: string | null;
  category?: string | null;
  tags?: string[] | null;
  is_published?: boolean;
  is_featured?: boolean;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
}

export interface Author extends BaseEntity {
  name: string;
  bio?: string | null;
  avatar?: string | null;
  website?: string | null;
  email?: string | null;
}

export interface BlogPostWithAuthor extends BlogPost {
  authors?: Author | null;
}

export interface BlogCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
}

export interface BlogComment extends BaseEntity {
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  avatar?: string | null;
}

// Studio related types
export interface StudioService extends BaseEntity {
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  duration?: number | null;
  is_published?: boolean;
}

// Filter options for queries
export interface FilterOptions {
  limit?: number;
  orderBy?: string;
  ascending?: boolean;
  category?: string | null;
  genre?: string | null;
  tag?: string | null;
  featured?: boolean;
  search?: string;
  published?: boolean;
}

// Newsletter related types
export interface NewsletterSubscriber extends BaseEntity {
  email: string;
  name?: string | null;
  is_active: boolean;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
