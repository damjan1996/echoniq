import { BlogPostWithAuthor } from '@/lib/supabase/types';
// Removed unused import: SupabaseBlogCategory

import { Image, SEO, SocialLinks } from './common';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  authorId: string;
  categoryIds: string[];
  tags?: string[];
  readingTime?: number; // in minutes
  featured?: boolean;
  published?: boolean;
}

export interface BlogPostDetailed extends BlogPost {
  author: BlogAuthor;
  categories: BlogCategory[];
  relatedPosts?: BlogPost[];
  seo?: SEO;
  commentCount?: number;
  likes?: number;
  views?: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  socialLinks?: SocialLinks;
  role?: string;
  postCount?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string;
  postCount?: number;
  parentCategoryId?: string;
  created_at?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  approved: boolean;
  parentCommentId?: string;
  replies?: BlogComment[];
}

export interface BlogPostGallery {
  id: string;
  postId: string;
  title?: string;
  description?: string;
  images: Image[];
}

export interface BlogFilters {
  categories?: string[];
  tags?: string[];
  author?: string;
  search?: string;
  featured?: boolean;
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface BlogPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Neue Typdefinition für die BlogPostPage-Komponente
export interface BlogPostPageProps {
  post: BlogPostWithAuthor;
  relatedPosts: BlogPostWithAuthor[];
  categories: BlogCategory[];
}
