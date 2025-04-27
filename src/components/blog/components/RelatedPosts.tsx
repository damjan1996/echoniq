import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { BlogPostWithAuthor } from '@/components/blog/components/BlogList';
import { formatDate, cn } from '@/lib/utils';

interface RelatedPostsProps {
  posts: BlogPostWithAuthor[];
  className?: string;
  title?: string;
  layout?: 'grid' | 'list';
}

interface RelatedPostCardProps {
  post: BlogPostWithAuthor;
  layout: 'grid' | 'list';
  variants: Variants;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  className,
  title = 'Related Posts',
  layout = 'grid',
}) => {
  // If no posts, don't render anything
  if (!posts || posts.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className={className}>
      {title && <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>}

      <motion.div
        className={cn(layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-6')}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <RelatedPostCard key={post.id} post={post} layout={layout} variants={itemVariants} />
        ))}
      </motion.div>
    </div>
  );
};

const RelatedPostCard: React.FC<RelatedPostCardProps> = ({ post, layout, variants }) => {
  // Format date
  const formattedDate = post.published_at ? formatDate(post.published_at, 'dd.MM.yyyy') : '';

  // Grid layout
  if (layout === 'grid') {
    return (
      <motion.div
        variants={variants}
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <Link href={`/blog/${post.slug}`} className="group">
          {/* Post thumbnail */}
          {post.featured_image ? (
            <div className="relative aspect-video w-full">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="bg-gray-200 dark:bg-gray-700 aspect-video w-full" />
          )}

          {/* Post content */}
          <div className="p-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
              {post.title}
            </h4>

            {/* Meta */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              {post.authors?.name && <span className="mr-2">{post.authors.name}</span>}

              {formattedDate && (
                <>
                  <span className="mx-1">•</span>
                  <span>{formattedDate}</span>
                </>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // List layout
  return (
    <motion.div
      variants={variants}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={`/blog/${post.slug}`} className="group flex">
        {/* Post thumbnail */}
        {post.featured_image ? (
          <div className="relative w-32 md:w-48">
            <Image
              src={post.featured_image}
              alt={post.title}
              width={192}
              height={108}
              className="object-cover h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="bg-gray-200 dark:bg-gray-700 w-32 md:w-48" />
        )}

        {/* Post content */}
        <div className="p-4 flex-grow">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
            {post.title}
          </h4>

          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            {post.authors?.name && <span className="mr-2">{post.authors.name}</span>}

            {formattedDate && (
              <>
                <span className="mx-1">•</span>
                <span>{formattedDate}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Alternative layout with larger cards for more prominent recommendations
export const FeaturedRelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  className,
  title = 'You might also like',
}) => {
  // If no posts, don't render anything
  if (!posts || posts.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className={cn('py-12', className)}>
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          {title}
        </h2>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => {
          // Format the date for each post
          const postDate = post.published_at ? formatDate(post.published_at, 'dd.MM.yyyy') : '';

          return (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Link href={`/blog/${post.slug}`} className="group">
                {/* Post thumbnail */}
                {post.featured_image ? (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-700 aspect-[16/9] w-full" />
                )}

                {/* Post content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    {post.authors?.avatar && (
                      <Image
                        src={post.authors.avatar}
                        alt={post.authors.name || 'Author'}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                    )}

                    <div>
                      {post.authors?.name && (
                        <span className="font-medium">{post.authors.name}</span>
                      )}

                      {postDate && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{postDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default RelatedPosts;
