// src/lib/api.ts
import { API_URL } from './constants';

/**
 * Available API endpoints
 */
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
  ARTISTS: '/api/artists',
  MUSIC: '/api/music',
  STUDIO_BOOKING: '/api/studio/booking',
  SEARCH: '/api/search',
};

/**
 * Base options for fetch requests
 */
const baseOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Custom fetch wrapper with error handling
 */
export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  const fetchOptions = {
    ...baseOptions,
    ...options,
    headers: {
      ...baseOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') === -1) {
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return (await response.text()) as unknown as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status} ${response.statusText}`);
    }

    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * GET request helper
 */
export async function get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;

  return fetchAPI<T>(url, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function put<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function del<T>(endpoint: string): Promise<T> {
  return fetchAPI<T>(endpoint, { method: 'DELETE' });
}

/**
 * Type definitions for API responses
 */
export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  genre?: string;
  location?: string;
  formed_year?: number;
  disbanded_year?: number | null;
  profile_image?: string;
  banner_image?: string;
  links?: Record<string, string>;
  is_published: boolean;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Release {
  id: string;
  title: string;
  slug: string;
  release_date: string;
  catalog_number?: string;
  cover_image?: string;
  description?: string;
  tracklist?: Array<{
    title: string;
    duration: number;
    preview_url?: string;
  }>;
  links?: Record<string, string>;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  artists: Artist[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id: string;
  author?: {
    name: string;
    avatar?: string;
  };
  categories?: string[];
  tags?: string[];
  published_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
  subscribeToNewsletter?: boolean;
}): Promise<{ success: boolean; message: string }> {
  return post(API_ENDPOINTS.CONTACT, data);
}

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
}): Promise<{ success: boolean; message: string }> {
  return post(API_ENDPOINTS.NEWSLETTER, data);
}

/**
 * Get all artists
 */
export async function getArtists(params?: { limit?: number; genre?: string }): Promise<Artist[]> {
  const queryParams: Record<string, string> = {};

  if (params?.limit) {
    queryParams.limit = params.limit.toString();
  }

  if (params?.genre) {
    queryParams.genre = params.genre;
  }

  return get(API_ENDPOINTS.ARTISTS, queryParams);
}

/**
 * Get artist by slug
 */
export async function getArtistBySlug(slug: string): Promise<Artist> {
  return get(`${API_ENDPOINTS.ARTISTS}/${slug}`);
}

/**
 * Get all releases
 */
export async function getReleases(params?: {
  limit?: number;
  genre?: string;
  artistId?: string;
}): Promise<Release[]> {
  const queryParams: Record<string, string> = {};

  if (params?.limit) {
    queryParams.limit = params.limit.toString();
  }

  if (params?.genre) {
    queryParams.genre = params.genre;
  }

  if (params?.artistId) {
    queryParams.artistId = params.artistId;
  }

  return get(API_ENDPOINTS.MUSIC, queryParams);
}

/**
 * Get release by slug
 */
export async function getReleaseBySlug(slug: string): Promise<Release> {
  return get(`${API_ENDPOINTS.MUSIC}/${slug}`);
}

/**
 * Book studio session
 */
export async function bookStudioSession(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  numberOfPeople?: number;
  additionalInfo?: string;
  subscribeToNewsletter?: boolean;
}): Promise<{ success: boolean; message: string; bookingId?: string }> {
  return post(API_ENDPOINTS.STUDIO_BOOKING, data);
}

/**
 * Search content
 */
export async function searchSite(query: string): Promise<{
  artists: Artist[];
  releases: Release[];
  blogPosts: BlogPost[];
}> {
  return get(`${API_ENDPOINTS.SEARCH}`, { q: query });
}

/**
 * Handle error responses
 */
export function handleApiError(error: unknown): { message: string } {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'An unknown error occurred' };
}
