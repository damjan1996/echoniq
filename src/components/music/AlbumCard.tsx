import { motion } from 'framer-motion';
import { Play, Calendar, Music } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useAudioPlayer } from '@/hooks/use-audio-player';

interface Track {
  id: string;
  title: string;
  audioUrl?: string;
  duration: number;
}

interface AlbumCardProps {
  id: string;
  slug: string;
  title: string;
  artist: string;
  artistSlug: string;
  coverImage: string;
  releaseDate: string;
  type: 'album' | 'ep' | 'single';
  tracks?: Track[];
  featured?: boolean;
  index?: number;
  imagePriority?: boolean;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  slug,
  title,
  artist,
  artistSlug,
  coverImage,
  releaseDate,
  type,
  tracks = [],
  featured = false,
  index = 0,
  imagePriority = false,
}) => {
  const { playTrack } = useAudioPlayer();

  // Format release date
  const formattedDate = new Date(releaseDate).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
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

  // Count number of tracks with preview
  const previewCount = tracks.filter((track) => track.audioUrl).length;

  // Get first track with preview for quick play
  const previewTrack = tracks.find((track) => track.audioUrl);

  // Handle play button click
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (previewTrack && previewTrack.audioUrl) {
      playTrack({
        id: previewTrack.id,
        title: previewTrack.title,
        artist: artist,
        src: previewTrack.audioUrl,
        artwork: coverImage,
        releaseId: id,
        releaseTitle: title,
      });
    }
  };

  return (
    <motion.div
      className={`h-full ${featured ? 'col-span-2' : ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
    >
      <Link href={`/music/${slug}`} className="block h-full">
        <div className="bg-background-secondary rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
          {/* Cover image with play button overlay */}
          <div className="relative aspect-square overflow-hidden">
            <motion.div className="relative w-full h-full" variants={imageVariants}>
              <Image
                src={coverImage}
                alt={`${title} by ${artist}`}
                fill
                sizes={
                  featured
                    ? '(max-width: 768px) 100vw, 66.66vw'
                    : '(max-width: 768px) 100vw, 33.33vw'
                }
                className="object-cover"
                priority={imagePriority || featured || index < 2}
              />

              {/* Play button overlay */}
              {previewTrack && previewTrack.audioUrl && (
                <button
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  onClick={handlePlay}
                  aria-label={`Play preview of ${title}`}
                >
                  <motion.span
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-accent-500 text-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </motion.span>
                </button>
              )}

              {/* Release type badge */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-background-primary/80 backdrop-blur-sm rounded-full text-xs font-medium">
                {type.toUpperCase()}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-text-primary leading-tight mb-1">{title}</h3>

            <Link
              href={`/artists/${artistSlug}`}
              className="text-accent-500 hover:text-accent-400 transition-colors text-sm font-medium mb-3"
              onClick={(e) => e.stopPropagation()}
            >
              {artist}
            </Link>

            <div className="mt-auto pt-3 flex flex-wrap items-center text-xs text-text-tertiary space-y-2">
              <div className="flex items-center mr-4">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>{formattedDate}</span>
              </div>

              {tracks.length > 0 && (
                <div className="flex items-center">
                  <Music className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {tracks.length} Track{tracks.length !== 1 ? 's' : ''}
                  </span>

                  {previewCount > 0 && (
                    <span className="ml-1 text-accent-500">
                      ({previewCount} Preview{previewCount !== 1 ? 's' : ''})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-accent-500 text-text-inverted rounded-full text-xs font-medium">
              Featured
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default AlbumCard;
