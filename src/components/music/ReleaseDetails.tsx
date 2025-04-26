import { motion } from 'framer-motion';
import { Calendar, Clock, Music, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { StreamingLinks } from '@/components/music/StreamingLinks';

interface ReleaseDetailsProps {
  id?: string; // Made optional since it's not used
  title: string;
  artist: string;
  artistSlug: string;
  coverImage: string;
  releaseDate: string;
  type: 'album' | 'ep' | 'single';
  description?: string;
  genres?: string[];
  duration?: number;
  trackCount?: number;
  streamingLinks?: Record<string, string>;
}

export const ReleaseDetails: React.FC<ReleaseDetailsProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id, // Add eslint comment to suppress the warning
  title,
  artist,
  artistSlug,
  coverImage,
  releaseDate,
  type,
  description,
  genres = [],
  duration,
  trackCount,
  streamingLinks = {},
}) => {
  // Format the release date
  const formattedDate = new Date(releaseDate).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format duration in hours and minutes
  const formatDuration = (seconds: number): string => {
    if (!seconds) return '';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} Std. ${minutes} Min.`;
    } else {
      return `${minutes} Min.`;
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="py-16 bg-background-primary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Cover art */}
          <motion.div
            variants={itemVariants}
            className="relative aspect-square overflow-hidden rounded-lg shadow-xl bg-neutral-900"
          >
            <Image
              src={coverImage}
              alt={`${title} by ${artist}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Release info */}
          <motion.div variants={containerVariants} className="flex flex-col">
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block px-3 py-1 bg-background-secondary rounded-full text-xs font-medium uppercase">
                {type}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-2"
            >
              {title}
            </motion.h1>

            <motion.div variants={itemVariants}>
              <Link
                href={`/artists/${artistSlug}`}
                className="text-xl md:text-2xl text-accent-500 hover:text-accent-400 transition-colors"
              >
                {artist}
              </Link>
            </motion.div>

            {/* Release metadata */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-6 text-text-secondary text-sm"
            >
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-accent-500" />
                <span>{formattedDate}</span>
              </div>

              {trackCount && (
                <div className="flex items-center">
                  <Music className="h-4 w-4 mr-2 text-accent-500" />
                  <span>
                    {trackCount} Track{trackCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {duration && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-accent-500" />
                  <span>{formatDuration(duration)}</span>
                </div>
              )}
            </motion.div>

            {/* Genres */}
            {genres.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-6">
                <div className="flex items-center mr-2">
                  <Tag className="h-4 w-4 mr-1 text-accent-500" />
                  <span className="text-sm text-text-secondary">Genres:</span>
                </div>
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 text-sm rounded-full bg-background-secondary hover:bg-background-tertiary transition-colors"
                  >
                    {genre}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Description */}
            {description && (
              <motion.div
                variants={itemVariants}
                className="mt-8 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {/* Streaming links */}
            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-text-primary font-semibold mb-4">Stream / Download</h3>
              <StreamingLinks links={streamingLinks} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ReleaseDetails;
