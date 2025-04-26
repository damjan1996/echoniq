import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  overlayOpacity?: number;
  buttonText?: string;
  buttonLink?: string;
  imagePosition?: 'top' | 'center' | 'bottom';
  height?: 'small' | 'medium' | 'large' | 'full';
  textAlignment?: 'left' | 'center' | 'right';
  variant?: 'light' | 'dark';
  latestPostBadge?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Blog',
  subtitle = 'Latest news, insights, and stories from echoniq',
  backgroundImage = '/images/blog/hero-background.jpg',
  className,
  overlayOpacity = 0.5,
  buttonText,
  buttonLink,
  imagePosition = 'center',
  height = 'medium',
  textAlignment = 'center',
  variant = 'dark',
  latestPostBadge = false,
}) => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Height classes based on the height prop
  const heightClasses = {
    small: 'h-[30vh] md:h-[40vh]',
    medium: 'h-[50vh] md:h-[60vh]',
    large: 'h-[70vh] md:h-[80vh]',
    full: 'h-screen',
  };

  // Text alignment classes
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // Variant classes (text color)
  const variantClasses = {
    light: 'text-black',
    dark: 'text-white',
  };

  // Calculate object position based on imagePosition
  const objectPositionMap = {
    top: 'object-top',
    center: 'object-center',
    bottom: 'object-bottom',
  };

  return (
    <div className={cn('relative w-full overflow-hidden', heightClasses[height], className)}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Blog Hero Background"
            fill
            priority
            className={cn('object-cover', objectPositionMap[imagePosition])}
          />
        )}

        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black',
            variant === 'light' ? 'bg-opacity-25' : 'bg-opacity-60'
          )}
          style={{ opacity: overlayOpacity }}
        ></div>
      </div>

      {/* Content */}
      <div
        className={cn(
          'relative h-full w-full flex flex-col justify-center px-4 md:px-8',
          alignmentClasses[textAlignment],
          variantClasses[variant]
        )}
      >
        <div className="container mx-auto">
          <motion.div initial="hidden" animate="visible" variants={textVariants}>
            {latestPostBadge && (
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-4">
                Latest Post
              </span>
            )}

            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="text-lg md:text-xl max-w-xl mx-auto opacity-90 mb-8">{subtitle}</p>
            )}

            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className={cn(
                  'inline-block px-6 py-3 rounded-md font-medium transition-colors',
                  variant === 'dark'
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                )}
              >
                {buttonText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Alternative featured post hero
export const FeaturedPostHero: React.FC<{
  post: {
    id: string;
    title: string;
    excerpt?: string | null;
    slug: string;
    featured_image?: string | null;
    published_at?: string | null;
    authors?: {
      name: string;
      avatar?: string | null;
    } | null;
  };
  className?: string;
}> = ({ post, className }) => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className={cn('relative w-full h-[60vh] md:h-[70vh] overflow-hidden', className)}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full w-full flex flex-col justify-end px-4 md:px-8 pb-12 md:pb-16 text-white">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-4">
              Featured Post
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg md:text-xl opacity-90 mb-6 line-clamp-3">{post.excerpt}</p>
            )}

            <div className="flex items-center space-x-4 mb-6">
              {post.authors?.avatar && (
                <div className="flex-shrink-0">
                  <Image
                    src={post.authors.avatar}
                    alt={post.authors.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              <div>
                <div className="font-medium">{post.authors?.name || 'echoniq'}</div>
                {post.published_at && (
                  <div className="text-sm text-gray-300">
                    {new Date(post.published_at).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                )}
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-block px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-md font-medium transition-colors"
            >
              Read Article
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
