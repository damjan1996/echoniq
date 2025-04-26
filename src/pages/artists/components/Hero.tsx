import { motion } from 'framer-motion';
import Image from 'next/image';
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
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Our Artists',
  subtitle = 'Discover the talented musicians and producers behind echoniq',
  backgroundImage = '/images/artists/hero-background.jpg',
  className,
  overlayOpacity = 0.5,
  buttonText,
  buttonLink,
  imagePosition = 'center',
  height = 'medium',
  textAlignment = 'center',
  variant = 'dark',
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
            alt="Artists Hero Background"
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
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="text-lg md:text-xl max-w-xl mx-auto opacity-90 mb-8">{subtitle}</p>
            )}

            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className={cn(
                  'inline-block px-6 py-3 rounded-md font-medium transition-colors',
                  variant === 'dark'
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                )}
              >
                {buttonText}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Alternative hero component with an animated gradient background
export const GradientHero: React.FC<
  Omit<HeroProps, 'backgroundImage' | 'imagePosition' | 'overlayOpacity'>
> = ({
  title = 'Our Artists',
  subtitle = 'Discover the talented musicians and producers behind echoniq',
  className,
  buttonText,
  buttonLink,
  height = 'medium',
  textAlignment = 'center',
  // Wir verwenden den Variant-Parameter hier, definieren aber separate Styles
  // da der Gradient-Hero immer einen dunklen Hintergrund hat
  variant: _variant = 'dark', // Umbenennen mit Unterstrich, um zu zeigen, dass er nicht verwendet wird
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

  return (
    <div className={cn('relative w-full overflow-hidden', heightClasses[height], className)}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-black to-blue-900 animate-gradient-x"></div>

      {/* Gradient overlay pattern */}
      <div className="absolute inset-0 opacity-30 mix-blend-soft-light">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M0 0 L40 0 L40 40 L0 40 Z"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div
        className={cn(
          'relative h-full w-full flex flex-col justify-center px-4 md:px-8 text-white',
          alignmentClasses[textAlignment]
        )}
      >
        <div className="container mx-auto">
          <motion.div initial="hidden" animate="visible" variants={textVariants}>
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="text-lg md:text-xl max-w-xl mx-auto opacity-90 mb-8">{subtitle}</p>
            )}

            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className="inline-block px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-md font-medium transition-colors"
              >
                {buttonText}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
