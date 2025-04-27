import { motion } from 'framer-motion';
import React from 'react';

import { LoadingSpinner } from '@/components/common/loading-spinner';
import { BlogPost, Author } from '@/types/database';

import { Pagination } from './Pagination';
import { PostCard } from './PostCard';

export interface BlogPostWithAuthor extends BlogPost {
  authors?: Author | null;
}

interface BlogListProps {
  posts: BlogPostWithAuthor[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  layout?: 'grid' | 'list';
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  isLoading = false,
  error = null,
  emptyMessage = 'No blog posts found',
  totalCount = 0,
  currentPage = 1,
  pageSize = 9,
  onPageChange,
  layout = 'grid',
}) => {
  // Animation variants for grid container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="py-16 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block">
          <p className="font-medium">Error loading blog posts</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!posts || posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  // Determine grid layout classes
  const gridLayoutClasses =
    layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-10';

  return (
    <div className="blog-list">
      <motion.div
        className={gridLayoutClasses}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <PostCard post={post} layout={layout} />
          </motion.div>
        ))}
      </motion.div>

      {/* Show pagination if we have total count, page size and more than one page */}
      {totalCount > 0 && pageSize > 0 && totalCount > pageSize && onPageChange && (
        <div className="mt-12">
          <Pagination
            totalItems={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

// Compact view for featured blog posts (e.g., for homepage)
export const FeaturedBlogList: React.FC<
  Omit<BlogListProps, 'layout' | 'totalCount' | 'currentPage' | 'pageSize' | 'onPageChange'>
> = ({ posts, isLoading = false, error = null, emptyMessage = 'No featured blog posts' }) => {
  // Only show featured posts
  const featuredPosts = posts.filter((post) => post.is_featured);

  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Handle empty state
  if (!featuredPosts || featuredPosts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  // Render featured posts with a featured layout
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Highlight the first featured post */}
      <motion.div variants={itemVariants} className="lg:row-span-2">
        <PostCard post={featuredPosts[0]} layout="feature" featured={true} />
      </motion.div>

      {/* Show up to 2 more featured posts */}
      {featuredPosts.slice(1, 3).map((post) => (
        <motion.div key={post.id} variants={itemVariants}>
          <PostCard post={post} layout="compact" featured={true} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogList;
