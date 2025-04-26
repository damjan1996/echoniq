import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Types
interface ArtistCardProps {
  id?: string; // Made optional since it's not used
  name: string;
  slug: string;
  imageUrl?: string;
  genres?: string[];
  isFeatured?: boolean;
  index?: number;
  size?: 'small' | 'medium' | 'large';
  genre?: string;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id, // Add eslint disable comment to suppress the warning
  name,
  slug,
  imageUrl,
  genres = [],
  isFeatured = false,
  index = 0,
  size = 'medium',
  genre,
}) => {
  // Convert single genre to array if provided instead of genres array
  const genreArray = genres.length > 0 ? genres : genre ? [genre] : [];

  // Add size class based on the size prop
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl md:text-3xl',
    large: 'text-3xl md:text-4xl',
  };
  const titleSizeClass = sizeClasses[size] || sizeClasses.medium;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Stagger effect based on index
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.5 },
    },
  };

  const arrowVariants = {
    hover: {
      x: 5,
      transition: { repeat: Infinity, repeatType: 'mirror' as const, duration: 0.7 },
    },
  };

  const placeholderImage = '/images/placeholder-artist.jpg';

  return (
    <motion.div
      className={`h-full ${isFeatured ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
    >
      <Link href={`/artists/${slug}`} className="block h-full">
        <div className="relative group h-full overflow-hidden bg-background-secondary rounded-lg shadow-lg flex flex-col">
          {/* Image Container */}
          <div
            className={`aspect-square w-full overflow-hidden ${isFeatured ? 'md:aspect-[16/9]' : ''}`}
          >
            <motion.div className="relative w-full h-full" variants={imageVariants}>
              <Image
                src={imageUrl || placeholderImage}
                alt={name}
                fill
                sizes={
                  isFeatured
                    ? '(max-width: 768px) 100vw, 66.66vw'
                    : '(max-width: 768px) 100vw, 33.33vw'
                }
                className="object-cover"
                priority={isFeatured || index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
            </motion.div>
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <h3 className={`${titleSizeClass} font-bold mb-2`}>{name}</h3>

            {genreArray.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {genreArray.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 text-xs rounded-full bg-accent-500/20 text-accent-100"
                  >
                    {genre}
                  </span>
                ))}
                {genreArray.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-neutral-700/50 text-neutral-200">
                    +{genreArray.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center mt-auto">
              <span className="text-sm font-medium">Profil ansehen</span>
              <motion.div variants={arrowVariants} className="ml-2">
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent-500 text-text-inverted rounded-full text-xs font-medium">
              Featured Artist
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtistCard;
