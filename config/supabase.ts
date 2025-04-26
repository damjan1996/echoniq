/**
 * Supabase configuration for echoniq Label website
 * This file contains database settings, table names, and query defaults
 */

// Environment-specific configuration
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  jwtSecret: process.env.SUPABASE_JWT_SECRET || '',
};

// Database tables and views
export const tables = {
  // Artists related tables
  artists: {
    name: 'artists',
    columns: {
      id: 'id',
      slug: 'slug',
      name: 'name',
      bio: 'bio',
      image: 'image',
      featured: 'featured',
      socialLinks: 'social_links',
      genres: 'genres',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  // Music releases related tables
  releases: {
    name: 'releases',
    columns: {
      id: 'id',
      slug: 'slug',
      title: 'title',
      artistId: 'artist_id',
      releaseDate: 'release_date',
      coverImage: 'cover_image',
      type: 'type', // album, ep, single
      featured: 'featured',
      streamingLinks: 'streaming_links',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  tracks: {
    name: 'tracks',
    columns: {
      id: 'id',
      title: 'title',
      releaseId: 'release_id',
      trackNumber: 'track_number',
      duration: 'duration',
      audioUrl: 'audio_url',
      isPreview: 'is_preview',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  // Blog related tables
  blogPosts: {
    name: 'blog_posts',
    columns: {
      id: 'id',
      slug: 'slug',
      title: 'title',
      excerpt: 'excerpt',
      content: 'content',
      featuredImage: 'featured_image',
      authorId: 'author_id',
      categoryIds: 'category_ids',
      tags: 'tags',
      publishedAt: 'published_at',
      status: 'status', // draft, published
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  blogCategories: {
    name: 'blog_categories',
    columns: {
      id: 'id',
      name: 'name',
      slug: 'slug',
      description: 'description',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  // Studio related tables
  studioServices: {
    name: 'studio_services',
    columns: {
      id: 'id',
      name: 'name',
      description: 'description',
      price: 'price',
      duration: 'duration',
      featured: 'featured',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  studioEquipment: {
    name: 'studio_equipment',
    columns: {
      id: 'id',
      name: 'name',
      category: 'category', // microphones, instruments, etc.
      description: 'description',
      image: 'image',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  studioBookings: {
    name: 'studio_bookings',
    columns: {
      id: 'id',
      name: 'name',
      email: 'email',
      phone: 'phone',
      serviceId: 'service_id',
      date: 'date',
      startTime: 'start_time',
      endTime: 'end_time',
      message: 'message',
      status: 'status', // pending, confirmed, cancelled
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  // Contact and newsletter related tables
  contactSubmissions: {
    name: 'contact_submissions',
    columns: {
      id: 'id',
      name: 'name',
      email: 'email',
      subject: 'subject',
      message: 'message',
      status: 'status', // new, read, responded
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  newsletterSubscribers: {
    name: 'newsletter_subscribers',
    columns: {
      id: 'id',
      email: 'email',
      firstName: 'first_name',
      preferences: 'preferences', // JSON with subscription preferences
      status: 'status', // subscribed, unsubscribed
      confirmedAt: 'confirmed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  // User and authentication related tables
  users: {
    name: 'users',
    columns: {
      id: 'id',
      email: 'email',
      firstName: 'first_name',
      lastName: 'last_name',
      role: 'role', // admin, artist, user
      avatarUrl: 'avatar_url',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
};

// Storage buckets configuration
export const storage = {
  buckets: {
    artistImages: 'artist-images',
    releaseCovers: 'release-covers',
    audioFiles: 'audio-files',
    blogImages: 'blog-images',
    studioImages: 'studio-images',
    galleryImages: 'gallery-images',
  },

  // Default storage options
  options: {
    cacheControl: '3600',
    upsert: true,
    contentType: 'auto',
  },
};

// Default query parameters
export const queryDefaults = {
  // Common fetch limits
  pageSize: 10,
  featuredLimit: 6,
  relatedLimit: 3,

  // Default sorting
  defaultSort: {
    artists: { column: 'name', ascending: true },
    releases: { column: 'release_date', ascending: false },
    blogPosts: { column: 'published_at', ascending: false },
  },

  // Common filters
  filters: {
    onlyPublished: true,
    includeDrafts: false,
  },
};

// RLS (Row Level Security) policies
export const rlsPolicies = {
  // Example policy names
  artistSelect: 'artists_select_policy',
  artistInsert: 'artists_insert_policy',
  artistUpdate: 'artists_update_policy',
  artistDelete: 'artists_delete_policy',

  // ... other policies
};

// Database schema version for migrations
export const schemaVersion = '1.0.0';

export default {
  supabaseConfig,
  tables,
  storage,
  queryDefaults,
  rlsPolicies,
  schemaVersion,
};
