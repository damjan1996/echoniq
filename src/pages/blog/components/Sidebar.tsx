import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { BlogPostWithAuthor, BlogCategory } from '@/lib/supabase/types';
import { cn, formatDate } from '@/lib/utils';

import { Search } from './Search';

interface SidebarProps {
  categories?: BlogCategory[];
  recentPosts?: BlogPostWithAuthor[];
  popularTags?: { name: string; count: number }[];
  currentCategorySlug?: string;
  currentPostId?: string;
  className?: string;
  showSearch?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories = [],
  recentPosts = [],
  popularTags = [],
  currentCategorySlug,
  currentPostId,
  className,
  showSearch = true,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className={cn('space-y-8', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Search */}
      {showSearch && (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Search</h3>
          <Search />
        </motion.div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog?category=${category.slug}`}
                  className={cn(
                    'block py-2 px-3 rounded-md transition-colors',
                    currentCategorySlug === category.slug
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/40'
                  )}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Posts</h3>
          <ul className="space-y-4">
            {recentPosts
              .filter((post) => post.id !== currentPostId) // Filter out current post
              .slice(0, 4) // Limit to 4 posts
              .map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group flex items-start space-x-3">
                    {/* Thumbnail */}
                    {post.featured_image && (
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                        {post.title}
                      </h4>

                      {post.published_at && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(post.published_at, 'dd.MM.yyyy')}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
          </ul>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all posts →
            </Link>
          </div>
        </motion.div>
      )}

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag.name}
                href={`/blog?tag=${tag.name}`}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {tag.name}
                {tag.count > 0 && <span className="ml-1 text-xs opacity-70">({tag.count})</span>}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow p-6 text-white"
      >
        <h3 className="text-lg font-semibold mb-3">Subscribe to our Newsletter</h3>
        <p className="text-sm opacity-90 mb-4">
          Get the latest updates, news and special offers sent directly to your inbox.
        </p>

        <form className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md text-gray-900 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs opacity-80 mt-3">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </motion.div>
    </motion.div>
  );
};

// Compact sidebar for narrower layouts
export const CompactSidebar: React.FC<SidebarProps> = ({
  categories = [],
  recentPosts = [],
  currentCategorySlug,
  currentPostId,
  className,
  showSearch = false,
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className={cn(
                  'px-3 py-1 rounded-full text-sm transition-colors',
                  currentCategorySlug === category.slug
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      {showSearch && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Search</h3>
          <Search variant="solid" size="small" />
        </div>
      )}

      {/* Recent Posts - Horizontal Layout */}
      {recentPosts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Posts</h3>
          <div className="grid grid-cols-2 gap-4">
            {recentPosts
              .filter((post) => post.id !== currentPostId)
              .slice(0, 2)
              .map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="relative aspect-video rounded overflow-hidden mb-2">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                    {post.title}
                  </h4>
                </Link>
              ))}
          </div>

          <div className="mt-3">
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all posts →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
