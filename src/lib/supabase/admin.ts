// src/lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

import { supabaseConfig } from '@/config/supabase';

import { Database } from './types';

// Extract Supabase credentials from config
const SUPABASE_URL = supabaseConfig?.url || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY =
  supabaseConfig?.serviceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Creates a Supabase admin client with service role permissions.
 * This client bypasses RLS (Row Level Security) and should only be used server-side.
 */
const adminClient = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export default adminClient;

/**
 * Function to get an artist by slug
 */
export const getArtistBySlug = async (slug: string) => {
  const { data, error } = await adminClient
    .from('artists')
    .select('*, releases(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching artist:', error);
    return null;
  }

  return data;
};

/**
 * Function to get all artists
 */
export const getAllArtists = async (options?: {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  genre?: string;
}) => {
  let query = adminClient.from('artists').select('*');

  // Apply filters
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
    console.error('Error fetching artists:', error);
    return [];
  }

  return data;
};

/**
 * Function to get a release by slug
 */
export const getReleaseBySlug = async (slug: string) => {
  const { data, error } = await adminClient
    .from('releases')
    .select('*, artists(*), tracks(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching release:', error);
    return null;
  }

  return data;
};

/**
 * Function to get all releases
 */
export const getAllReleases = async (options?: {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  genre?: string;
  artistId?: string;
}) => {
  let query = adminClient.from('releases').select('*, artists(*)');

  // Apply filters
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
    console.error('Error fetching releases:', error);
    return [];
  }

  return data;
};

/**
 * Function to get all blog posts
 */
export const getAllBlogPosts = async (options?: {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  category?: string;
  page?: number;
  pageSize?: number;
}) => {
  let query = adminClient.from('blog_posts').select('*, authors(*)');

  // Apply filters
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
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data;
};

/**
 * Function to get a blog post by slug
 */
export const getBlogPostBySlug = async (slug: string) => {
  const { data, error } = await adminClient
    .from('blog_posts')
    .select('*, authors(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
};

/**
 * Function to save a contact form submission
 */
export const saveContactSubmission = async (submission: {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
  source?: string;
}) => {
  const { data, error } = await adminClient
    .from('contact_submissions')
    .insert([
      {
        name: submission.name,
        email: submission.email,
        message: submission.message,
        subject: submission.subject || null,
        phone: submission.phone || null,
        source: submission.source || 'website',
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving contact submission:', error);
    return null;
  }

  return data;
};

/**
 * Function to save a studio booking
 */
export const saveStudioBooking = async (booking: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  numberOfPeople?: number;
  additionalInfo?: string;
}) => {
  const { data, error } = await adminClient
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
    console.error('Error saving studio booking:', error);
    return null;
  }

  return data;
};

/**
 * Function to save a newsletter subscription
 */
export const saveNewsletterSubscription = async (subscription: {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
}) => {
  const { data, error } = await adminClient
    .from('newsletter_subscribers')
    .insert([
      {
        email: subscription.email,
        first_name: subscription.firstName || null,
        last_name: subscription.lastName || null,
        source: subscription.source || 'website',
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
      const { data: updatedData, error: updateError } = await adminClient
        .from('newsletter_subscribers')
        .update({
          first_name: subscription.firstName || null,
          last_name: subscription.lastName || null,
          source: subscription.source || 'website',
          status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('email', subscription.email)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating newsletter subscription:', updateError);
        return null;
      }

      return updatedData;
    }

    console.error('Error saving newsletter subscription:', error);
    return null;
  }

  return data;
};
