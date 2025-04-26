// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

import { supabaseConfig } from '@/config/supabase';

import { Database } from './types';

// Extract Supabase credentials from config
const SUPABASE_URL = supabaseConfig?.url || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  supabaseConfig?.anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Creates a Supabase client with anonymous key.
 * This client respects RLS (Row Level Security) and is safe to use in the browser.
 */
const supabaseClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export default supabaseClient;

/**
 * Function to get all artists for public display
 */
export const getPublicArtists = async (options?: {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  genre?: string;
}) => {
  let query = supabaseClient.from('artists').select('*');

  // Apply filters (only for published artists)
  query = query.eq('is_published', true);

  if (options?.genre) {
    query = query.eq('genre', options.genre);
  }

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? false });
  } else {
    query = query.order('name');
  }

  // Apply limit
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching public artists:', error);
    return [];
  }

  return data;
};

/**
 * Function to get a public artist by slug
 */
export const getPublicArtistBySlug = async (slug: string) => {
  const { data, error } = await supabaseClient
    .from('artists')
    .select('*, releases!artist_releases(*, tracks(*))')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching public artist:', error);
    return null;
  }

  return data;
};

/**
 * Function to get all releases for public display
 */
export const getPublicReleases = async (options?: {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  genre?: string;
  artistId?: string;
}) => {
  let query = supabaseClient.from('releases').select('*, artists!release_artists(*)');

  // Apply filters (only for published releases)
  query = query.eq('is_published', true);

  if (options?.genre) {
    query = query.eq('genre', options.genre);
  }

  if (options?.artistId) {
    query = query.eq('artist_id', options.artistId);
  }

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? false });
  } else {
    query = query.order('release_date', { ascending: false });
  }

  // Apply limit
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching public releases:', error);
    return [];
  }

  return data;
};

/**
 * Function to get a public release by slug
 */
export const getPublicReleaseBySlug = async (slug: string) => {
  const { data, error } = await supabaseClient
    .from('releases')
    .select('*, artists!release_artists(*), tracks(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching public release:', error);
    return null;
  }

  return data;
};

/**
 * Function to get all published blog posts
 */
export const getPublicBlogPosts = async (options?: {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  category?: string;
  page?: number;
  pageSize?: number;
}) => {
  let query = supabaseClient.from('blog_posts').select('*, authors(*)');

  // Apply filters (only for published posts)
  query = query.eq('is_published', true);

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? false });
  } else {
    query = query.order('published_at', { ascending: false });
  }

  // Apply pagination
  if (options?.page && options?.pageSize) {
    const from = (options.page - 1) * options.pageSize;
    const to = from + options.pageSize - 1;
    query = query.range(from, to);
  } else if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching public blog posts:', error);
    return [];
  }

  return data;
};

/**
 * Function to get a public blog post by slug
 */
export const getPublicBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabaseClient
    .from('blog_posts')
    .select('*, authors(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching public blog post:', error);
    return null;
  }

  return data;
};

/**
 * Function to submit a contact form
 */
export const submitContactForm = async (submission: {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
}) => {
  const { data, error } = await supabaseClient
    .from('contact_submissions')
    .insert([
      {
        name: submission.name,
        email: submission.email,
        message: submission.message,
        subject: submission.subject || null,
        phone: submission.phone || null,
        source: 'website',
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form');
  }

  return data;
};

/**
 * Function to submit a studio booking
 */
export const submitStudioBooking = async (booking: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  numberOfPeople?: number;
  additionalInfo?: string;
}) => {
  const { data, error } = await supabaseClient
    .from('studio_bookings')
    .insert([
      {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        booking_date: booking.date,
        booking_time: booking.time,
        service: booking.service,
        number_of_people: booking.numberOfPeople || null,
        additional_info: booking.additionalInfo || null,
        created_at: new Date().toISOString(),
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting studio booking:', error);
    throw new Error('Failed to submit studio booking');
  }

  return data;
};

/**
 * Function to subscribe to newsletter
 */
export const subscribeToNewsletter = async (subscription: {
  email: string;
  firstName?: string;
  lastName?: string;
}) => {
  const { data, error } = await supabaseClient
    .from('newsletter_subscribers')
    .insert([
      {
        email: subscription.email,
        first_name: subscription.firstName || null,
        last_name: subscription.lastName || null,
        source: 'website',
        subscribed_at: new Date().toISOString(),
        status: 'active',
      },
    ])
    .select()
    .single();

  if (error) {
    // Check if it's a duplicate email error
    if (error.code === '23505') {
      // Update the existing record instead
      const { data: updatedData, error: updateError } = await supabaseClient
        .from('newsletter_subscribers')
        .update({
          first_name: subscription.firstName || null,
          last_name: subscription.lastName || null,
          status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('email', subscription.email)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating newsletter subscription:', updateError);
        throw new Error('Failed to update newsletter subscription');
      }

      return updatedData;
    }

    console.error('Error subscribing to newsletter:', error);
    throw new Error('Failed to subscribe to newsletter');
  }

  return data;
};

/**
 * Function to get all blog categories
 */
export const getBlogCategories = async () => {
  const { data, error } = await supabaseClient.from('blog_categories').select('*').order('name');

  if (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }

  return data;
};

/**
 * Function to get all music genres
 */
export const getMusicGenres = async () => {
  const { data, error } = await supabaseClient.from('genres').select('*').order('name');

  if (error) {
    console.error('Error fetching music genres:', error);
    return [];
  }

  return data;
};

/**
 * Function to get all studio services
 */
export const getStudioServices = async () => {
  const { data, error } = await supabaseClient
    .from('studio_services')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching studio services:', error);
    return [];
  }

  return data;
};

/**
 * Function to search across the site
 */
export const searchSite = async (query: string) => {
  // Search multiple tables
  const [artistsResult, releasesResult, blogResult] = await Promise.all([
    // Search artists
    supabaseClient
      .from('artists')
      .select('*')
      .eq('is_published', true)
      .or(`name.ilike.%${query}%, bio.ilike.%${query}%`)
      .limit(5),

    // Search releases
    supabaseClient
      .from('releases')
      .select('*, artists!release_artists(*)')
      .eq('is_published', true)
      .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
      .limit(5),

    // Search blog posts
    supabaseClient
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${query}%, content.ilike.%${query}%`)
      .limit(5),
  ]);

  return {
    artists: artistsResult.error ? [] : artistsResult.data,
    releases: releasesResult.error ? [] : releasesResult.data,
    blogPosts: blogResult.error ? [] : blogResult.data,
  };
};
