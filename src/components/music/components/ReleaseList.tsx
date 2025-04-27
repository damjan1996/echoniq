import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import type { Release } from '@/types';

type ReleaseCardProps = {
  release: Release;
  index: number;
  currentlyPlaying: string | null;
  onPlayTrack: (releaseId: string, trackId: string | null) => void;
};

const ReleaseCard: React.FC<ReleaseCardProps> = ({
  release,
  index,
  currentlyPlaying,
  onPlayTrack,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const isPlaying = currentlyPlaying === release.id;
  const previewTrack = release.tracks && release.tracks.length > 0 ? release.tracks[0] : null;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (previewTrack) {
      onPlayTrack(release.id, isPlaying ? null : previewTrack.id);
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="bg-gray-900/60 backdrop-blur-sm rounded-lg overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px]"
    >
      <Link href={`/music/${release.slug}`} className="block group">
        <div className="relative">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={release.cover}
              alt={`${release.title} by ${release.artistName}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <button
            onClick={handlePlayClick}
            className="absolute bottom-4 right-4 bg-primary text-black p-3 rounded-full shadow-lg transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/90 focus:outline-none"
            aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
          >
            {isPlaying ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 9V15M14 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7519 11.1679L11.5547 9.03647C10.8901 8.59343 10 9.06982 10 9.86852V14.1315C10 14.9302 10.8901 15.4066 11.5547 14.9635L14.7519 12.8321C15.3457 12.4362 15.3457 11.5638 14.7519 11.1679Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                {release.title}
              </h3>
              <p className="text-gray-400 hover:text-gray-300 transition-colors">
                {release.artistName}
              </p>
            </div>
            <span className="text-sm text-gray-500">{formatReleaseDate(release.releaseDate)}</span>
          </div>

          <div className="flex gap-2 mt-3 mb-4 flex-wrap">
            {release.genres.map((genre, idx) => (
              <span key={idx} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                {genre}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-300 mb-4 line-clamp-2">{release.description}</p>

          {isPlaying && previewTrack && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-2">Spielt jetzt: {previewTrack.title}</p>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{
                    duration: previewTrack.duration / 1000, // Convert to seconds if duration is in ms
                    ease: 'linear',
                    repeat: 0,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

type ReleaseListProps = {
  releases: Release[];
};

export const ReleaseList: React.FC<ReleaseListProps> = ({ releases }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState<string | null>(null);

  const handlePlayTrack = (releaseId: string, trackId: string | null) => {
    setCurrentlyPlaying(trackId ? releaseId : null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {releases.map((release, index) => (
        <ReleaseCard
          key={release.id}
          release={release}
          index={index}
          currentlyPlaying={currentlyPlaying}
          onPlayTrack={handlePlayTrack}
        />
      ))}

      {releases.length === 0 && (
        <div className="col-span-3 text-center py-16">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-4 text-gray-600"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 15.5H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8.5C9 9.60457 8.10457 10.5 7 10.5C5.89543 10.5 5 9.60457 5 8.5C5 7.39543 5.89543 6.5 7 6.5C8.10457 6.5 9 7.39543 9 8.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 8.5C19 9.60457 18.1046 10.5 17 10.5C15.8954 10.5 15 9.60457 15 8.5C15 7.39543 15.8954 6.5 17 6.5C18.1046 6.5 19 7.39543 19 8.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="text-xl font-medium mb-2">Keine Releases gefunden</h3>
          <p className="text-gray-400">
            Mit den aktuellen Filtern wurden keine Releases gefunden. Versuche, die Filter
            anzupassen.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReleaseList;
