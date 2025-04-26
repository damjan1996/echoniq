import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { BlogPostWithAuthor } from '@/lib/supabase/types';
import { formatDate, calculateReadingTime, cn } from '@/lib/utils';

interface PostCardProps {
  post: BlogPostWithAuthor;
  layout?: 'grid' | 'list' | 'compact' | 'feature';
  featured?: boolean;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  layout = 'grid',
  featured = false,
  className,
}) => {
  // Format date
  const formattedDate = post.published_at ? formatDate(post.published_at) : '';

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content || '');

  // Determine which layout to use and apply appropriate styles
  const isGrid = layout === 'grid';
  const isList = layout === 'list';
  const isCompact = layout === 'compact';
  const isFeature = layout === 'feature';

  const cardClasses = cn(
    'group bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-300',
    {
      'shadow-md hover:shadow-xl': isGrid || isFeature,
      'border border-gray-200 dark:border-gray-700': isList || isCompact,
      'h-full flex flex-col': isGrid || isFeature,
      'flex flex-col md:flex-row gap-6': isList,
      'flex flex-row gap-4': isCompact,
      'transform hover:-translate-y-1': isGrid || isFeature,
    },
    className
  );

  // Image sizes based on layout
  const imageContainerClasses = cn({
    'w-full aspect-video relative overflow-hidden': isGrid || isFeature,
    'w-full md:w-1/3 aspect-video relative overflow-hidden': isList,
    'w-24 h-24 flex-shrink-0 relative overflow-hidden rounded': isCompact,
  });

  const contentClasses = cn('flex flex-col', {
    'flex-grow p-6': isGrid || isFeature,
    'flex-grow p-6 md:p-0': isList,
    'p-0': isCompact,
  });

  const titleClasses = cn(
    'font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors',
    {
      'text-xl mb-3': isGrid,
      'text-2xl mb-4': isFeature,
      'text-xl mb-2': isList,
      'text-base mb-1': isCompact,
    }
  );

  const excerptClasses = cn('text-gray-600 dark:text-gray-300 mb-4', {
    'line-clamp-3': isGrid || isList,
    'line-clamp-4': isFeature,
    'line-clamp-1 text-sm': isCompact,
    'mb-0': isCompact,
  });

  return (
    <Link href={`/blog/${post.slug}`} className={cardClasses}>
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Featured
          </span>
        </div>
      )}

      {/* Image */}
      {post.featured_image && (
        <div className={imageContainerClasses}>
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              (isGrid || isFeature) && 'group-hover:scale-105'
            )}
          />
        </div>
      )}

      {/* Content */}
      <div className={contentClasses}>
        {/* Category (if available) */}
        {post.category && !isCompact && (
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider mb-2">
            {post.category}
          </div>
        )}

        {/* Title */}
        <h3 className={titleClasses}>{post.title}</h3>

        {/* Excerpt */}
        {post.excerpt && <p className={excerptClasses}>{post.excerpt}</p>}

        {/* Meta - Author, Date, Reading Time */}
        {!isCompact && (
          <div className="mt-auto pt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            {/* Author avatar */}
            {post.authors?.avatar && (
              <div className="mr-2 flex-shrink-0">
                <Image
                  src={post.authors.avatar}
                  alt={post.authors.name || 'Author'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-x-2">
              {/* Author name */}
              {post.authors?.name && <span className="font-medium">{post.authors.name}</span>}

              {/* Date */}
              {formattedDate && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{formattedDate}</span>
                </>
              )}

              {/* Reading time */}
              {readingTime > 0 && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{readingTime} min read</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Compact layout date */}
        {isCompact && formattedDate && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formattedDate}</div>
        )}
      </div>
    </Link>
  );
};

// Horizontal card for use in featured sections
export const HorizontalPostCard: React.FC<Omit<PostCardProps, 'layout'>> = ({
  post,
  featured = false,
  className,
}) => {
  // Format date
  const formattedDate = post.published_at ? formatDate(post.published_at) : '';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full',
        className
      )}
    >
      {/* Image */}
      {post.featured_image && (
        <div className="w-full md:w-2/5 aspect-video relative overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Category (if available) */}
        {post.category && (
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider mb-2">
            {post.category}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{post.excerpt}</p>
        )}

        {/* Meta - Author, Date */}
        <div className="mt-auto pt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          {/* Author avatar */}
          {post.authors?.avatar && (
            <div className="mr-2 flex-shrink-0">
              <Image
                src={post.authors.avatar}
                alt={post.authors.name || 'Author'}
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-x-2">
            {/* Author name */}
            {post.authors?.name && <span className="font-medium">{post.authors.name}</span>}

            {/* Date */}
            {formattedDate && (
              <>
                <span>•</span>
                <span>{formattedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
