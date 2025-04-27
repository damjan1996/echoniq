import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

interface PostHeaderProps {
  title: string;
  date: string;
  author?: {
    name: string;
    avatar?: string | null;
  } | null;
  category?: string;
  categorySlug?: string;
  readingTime?: number;
  className?: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  date,
  author,
  category,
  categorySlug,
  readingTime,
  className,
}) => {
  return (
    <div className={cn('post-header', className)}>
      {/* Category */}
      {category && categorySlug && (
        <Link
          href={`/blog?category=${categorySlug}`}
          className="inline-block text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline mb-2"
        >
          {category}
        </Link>
      )}

      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      {/* Meta information */}
      <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm mb-8">
        {/* Author */}
        {author && (
          <div className="flex items-center mr-6 mb-2 md:mb-0">
            {author.avatar ? (
              <div className="mr-2 h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="mr-2 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-medium">{author.name}</span>
          </div>
        )}

        {/* Date */}
        {date && (
          <div className="flex items-center mr-6 mb-2 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{date}</span>
          </div>
        )}

        {/* Reading time */}
        {readingTime !== undefined && (
          <div className="flex items-center mb-2 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{readingTime} min read</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Alternative header with larger layout and more emphasis
export const FeaturedPostHeader: React.FC<PostHeaderProps> = ({
  title,
  date,
  author,
  category,
  categorySlug,
  readingTime,
  className,
}) => {
  return (
    <div className={cn('featured-post-header text-center max-w-4xl mx-auto', className)}>
      {/* Category */}
      {category && categorySlug && (
        <Link
          href={`/blog?category=${categorySlug}`}
          className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors mb-4"
        >
          {category}
        </Link>
      )}

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      {/* Meta information */}
      <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 mb-12">
        {/* Author */}
        {author && (
          <div className="flex items-center mb-4">
            {author.avatar ? (
              <div className="mr-3 h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="mr-3 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{author.name}</div>
              <div className="text-sm">{date}</div>
            </div>
          </div>
        )}

        {/* Reading time */}
        {readingTime !== undefined && (
          <div className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
            {readingTime} min read
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
