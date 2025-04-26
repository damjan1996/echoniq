// src/lib/supabase/types.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          slug: string;
          bio: string | null;
          genre: string | null;
          profile_image: string | null;
          cover_image: string | null;
          email: string | null;
          website: string | null;
          instagram: string | null;
          facebook: string | null;
          twitter: string | null;
          soundcloud: string | null;
          spotify: string | null;
          bandcamp: string | null;
          youtube: string | null;
          is_published: boolean;
          sort_order: number | null;
          is_featured: boolean;
          seo_title: string | null;
          seo_description: string | null;
          seo_keywords: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          slug: string;
          bio?: string | null;
          genre?: string | null;
          profile_image?: string | null;
          cover_image?: string | null;
          email?: string | null;
          website?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          twitter?: string | null;
          soundcloud?: string | null;
          spotify?: string | null;
          bandcamp?: string | null;
          youtube?: string | null;
          is_published?: boolean;
          sort_order?: number | null;
          is_featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          slug?: string;
          bio?: string | null;
          genre?: string | null;
          profile_image?: string | null;
          cover_image?: string | null;
          email?: string | null;
          website?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          twitter?: string | null;
          soundcloud?: string | null;
          spotify?: string | null;
          bandcamp?: string | null;
          youtube?: string | null;
          is_published?: boolean;
          sort_order?: number | null;
          is_featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'artists_genre_fkey';
            columns: ['genre'];
            referencedRelation: 'genres';
            referencedColumns: ['id'];
          },
        ];
      };
      releases: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          artist_id: string | null;
          description: string | null;
          cover_image: string | null;
          release_date: string | null;
          genre: string | null;
          catalog_number: string | null;
          spotify_url: string | null;
          apple_music_url: string | null;
          bandcamp_url: string | null;
          soundcloud_url: string | null;
          beatport_url: string | null;
          youtube_url: string | null;
          is_published: boolean;
          is_featured: boolean;
          release_type: string | null;
          seo_title: string | null;
          seo_description: string | null;
          seo_keywords: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          slug: string;
          artist_id?: string | null;
          description?: string | null;
          cover_image?: string | null;
          release_date?: string | null;
          genre?: string | null;
          catalog_number?: string | null;
          spotify_url?: string | null;
          apple_music_url?: string | null;
          bandcamp_url?: string | null;
          soundcloud_url?: string | null;
          beatport_url?: string | null;
          youtube_url?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          release_type?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          slug?: string;
          artist_id?: string | null;
          description?: string | null;
          cover_image?: string | null;
          release_date?: string | null;
          genre?: string | null;
          catalog_number?: string | null;
          spotify_url?: string | null;
          apple_music_url?: string | null;
          bandcamp_url?: string | null;
          soundcloud_url?: string | null;
          beatport_url?: string | null;
          youtube_url?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          release_type?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'releases_artist_id_fkey';
            columns: ['artist_id'];
            referencedRelation: 'artists';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'releases_genre_fkey';
            columns: ['genre'];
            referencedRelation: 'genres';
            referencedColumns: ['id'];
          },
        ];
      };
      tracks: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          release_id: string;
          track_number: number | null;
          duration: number | null;
          preview_url: string | null;
          waveform_image: string | null;
          isrc: string | null;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          release_id: string;
          track_number?: number | null;
          duration?: number | null;
          preview_url?: string | null;
          waveform_image?: string | null;
          isrc?: string | null;
          is_published?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          release_id?: string;
          track_number?: number | null;
          duration?: number | null;
          preview_url?: string | null;
          waveform_image?: string | null;
          isrc?: string | null;
          is_published?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'tracks_release_id_fkey';
            columns: ['release_id'];
            referencedRelation: 'releases';
            referencedColumns: ['id'];
          },
        ];
      };
      genres: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          content: string | null;
          excerpt: string | null;
          featured_image: string | null;
          author_id: string | null;
          category: string | null;
          published_at: string | null;
          is_published: boolean;
          is_featured: boolean;
          seo_title: string | null;
          seo_description: string | null;
          seo_keywords: string | null;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          slug: string;
          content?: string | null;
          excerpt?: string | null;
          featured_image?: string | null;
          author_id?: string | null;
          category?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string | null;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          slug?: string;
          content?: string | null;
          excerpt?: string | null;
          featured_image?: string | null;
          author_id?: string | null;
          category?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string | null;
          tags?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'blog_posts_author_id_fkey';
            columns: ['author_id'];
            referencedRelation: 'authors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blog_posts_category_fkey';
            columns: ['category'];
            referencedRelation: 'blog_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      blog_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      authors: {
        Row: {
          id: string;
          name: string;
          bio: string | null;
          avatar: string | null;
          email: string | null;
          website: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          bio?: string | null;
          avatar?: string | null;
          email?: string | null;
          website?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          bio?: string | null;
          avatar?: string | null;
          email?: string | null;
          website?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          is_read: boolean;
          source: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          source?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          source?: string | null;
        };
        Relationships: [];
      };
      studio_bookings: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          booking_date: string;
          booking_time: string;
          service: string;
          number_of_people: number | null;
          additional_info: string | null;
          status: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          booking_date: string;
          booking_time: string;
          service: string;
          number_of_people?: number | null;
          additional_info?: string | null;
          status?: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          booking_date?: string;
          booking_time?: string;
          service?: string;
          number_of_people?: number | null;
          additional_info?: string | null;
          status?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      studio_services: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          price: number | null;
          duration: string | null;
          image: string | null;
          is_active: boolean;
          sort_order: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          price?: number | null;
          duration?: string | null;
          image?: string | null;
          is_active?: boolean;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          price?: number | null;
          duration?: string | null;
          image?: string | null;
          is_active?: boolean;
          sort_order?: number | null;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          subscribed_at: string | null;
          unsubscribed_at: string | null;
          status: string;
          source: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          subscribed_at?: string | null;
          unsubscribed_at?: string | null;
          status?: string;
          source?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          subscribed_at?: string | null;
          unsubscribed_at?: string | null;
          status?: string;
          source?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      artist_releases: {
        Row: {
          id: string;
          artist_id: string;
          release_id: string;
          is_primary: boolean;
        };
        Insert: {
          id?: string;
          artist_id: string;
          release_id: string;
          is_primary?: boolean;
        };
        Update: {
          id?: string;
          artist_id?: string;
          release_id?: string;
          is_primary?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'artist_releases_artist_id_fkey';
            columns: ['artist_id'];
            referencedRelation: 'artists';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'artist_releases_release_id_fkey';
            columns: ['release_id'];
            referencedRelation: 'releases';
            referencedColumns: ['id'];
          },
        ];
      };
      studio: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          location: string | null;
          address: string | null;
          phone: string | null;
          email: string | null;
          created_at: string;
          updated_at: string | null;
          images: string[] | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          location?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string | null;
          images?: string[] | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          location?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string | null;
          images?: string[] | null;
          is_active?: boolean;
        };
        Relationships: [];
      };
      // Add additional tables that were missing from the type but present in the database
      studio_equipment: {
        Row: {
          id: string;
          category: string;
          name: string;
          description: string | null;
          created_at: string;
          sort_order: number | null;
        };
        Insert: {
          id?: string;
          category: string;
          name: string;
          description?: string | null;
          created_at?: string;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          category?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          sort_order?: number | null;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string | null;
          image: string | null;
          order: number;
          created_at: string;
          email: string | null;
          social_instagram: string | null;
          social_linkedin: string | null;
          social_twitter: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          bio?: string | null;
          image?: string | null;
          order?: number;
          created_at?: string;
          email?: string | null;
          social_instagram?: string | null;
          social_linkedin?: string | null;
          social_twitter?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          bio?: string | null;
          image?: string | null;
          order?: number;
          created_at?: string;
          email?: string | null;
          social_instagram?: string | null;
          social_linkedin?: string | null;
          social_twitter?: string | null;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          author_email: string;
          content: string;
          created_at: string;
          is_approved: boolean;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_name: string;
          author_email: string;
          content: string;
          created_at?: string;
          is_approved?: boolean;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_name?: string;
          author_email?: string;
          content?: string;
          created_at?: string;
          is_approved?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey';
            columns: ['post_id'];
            referencedRelation: 'blog_posts';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Types for frontend use
export type Artist = Database['public']['Tables']['artists']['Row'];
export type ArtistInsert = Database['public']['Tables']['artists']['Insert'];
export type ArtistUpdate = Database['public']['Tables']['artists']['Update'];

export type Release = Database['public']['Tables']['releases']['Row'];
export type ReleaseInsert = Database['public']['Tables']['releases']['Insert'];
export type ReleaseUpdate = Database['public']['Tables']['releases']['Update'];

export type Track = Database['public']['Tables']['tracks']['Row'];
export type TrackInsert = Database['public']['Tables']['tracks']['Insert'];
export type TrackUpdate = Database['public']['Tables']['tracks']['Update'];

export type Genre = Database['public']['Tables']['genres']['Row'];
export type GenreInsert = Database['public']['Tables']['genres']['Insert'];
export type GenreUpdate = Database['public']['Tables']['genres']['Update'];

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

export type BlogCategory = Database['public']['Tables']['blog_categories']['Row'];
export type BlogCategoryInsert = Database['public']['Tables']['blog_categories']['Insert'];
export type BlogCategoryUpdate = Database['public']['Tables']['blog_categories']['Update'];

export type Author = Database['public']['Tables']['authors']['Row'];
export type AuthorInsert = Database['public']['Tables']['authors']['Insert'];
export type AuthorUpdate = Database['public']['Tables']['authors']['Update'];

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update'];

export type StudioBooking = Database['public']['Tables']['studio_bookings']['Row'];
export type StudioBookingInsert = Database['public']['Tables']['studio_bookings']['Insert'];
export type StudioBookingUpdate = Database['public']['Tables']['studio_bookings']['Update'];

export type StudioService = Database['public']['Tables']['studio_services']['Row'];
export type StudioServiceInsert = Database['public']['Tables']['studio_services']['Insert'];
export type StudioServiceUpdate = Database['public']['Tables']['studio_services']['Update'];

export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];
export type NewsletterSubscriberInsert =
  Database['public']['Tables']['newsletter_subscribers']['Insert'];
export type NewsletterSubscriberUpdate =
  Database['public']['Tables']['newsletter_subscribers']['Update'];

export type ArtistRelease = Database['public']['Tables']['artist_releases']['Row'];
export type ArtistReleaseInsert = Database['public']['Tables']['artist_releases']['Insert'];
export type ArtistReleaseUpdate = Database['public']['Tables']['artist_releases']['Update'];

// Studio table types
export type Studio = Database['public']['Tables']['studio']['Row'];
export type StudioInsert = Database['public']['Tables']['studio']['Insert'];
export type StudioUpdate = Database['public']['Tables']['studio']['Update'];

// Add missing type exports for the additional tables
export type StudioEquipment = Database['public']['Tables']['studio_equipment']['Row'];
export type StudioEquipmentInsert = Database['public']['Tables']['studio_equipment']['Insert'];
export type StudioEquipmentUpdate = Database['public']['Tables']['studio_equipment']['Update'];

export type TeamMember = Database['public']['Tables']['team_members']['Row'];
export type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert'];
export type TeamMemberUpdate = Database['public']['Tables']['team_members']['Update'];

export type Comment = Database['public']['Tables']['comments']['Row'];
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentUpdate = Database['public']['Tables']['comments']['Update'];

// Extended types with relationships
export interface ArtistWithReleases extends Artist {
  releases?: ReleaseWithTracks[];
}

export interface ReleaseWithTracks extends Release {
  tracks?: Track[];
  artists?: Artist[];
}

export interface ReleaseWithArtist extends Release {
  artists?: Artist[];
}

// Modified to handle null values properly
export interface BlogPostWithAuthor extends BlogPost {
  authors?: Author | null; // Changed from Author? to Author | null to properly handle null values
}
