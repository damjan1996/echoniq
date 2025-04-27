import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

import type { Release } from '@/types';

// Interface for Container props
interface ContainerProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown; // Better typing than 'any'
}

// Simple Container component implementation
const Container: React.FC<ContainerProps> = ({ children, className = '', ...props }) => (
  <div className={`container mx-auto px-4 ${className}`} {...props}>
    {children}
  </div>
);

// Interface for AudioPlayer props
interface AudioPlayerProps {
  trackUrl: string;
  trackTitle: string;
  artistName: string;
}

// Simple AudioPlayer component implementation
const AudioPlayer: React.FC<AudioPlayerProps> = ({ trackTitle, artistName }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center bg-gray-800 rounded-md p-2">
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <div className="ml-3">
        <div className="text-sm font-medium text-white">{trackTitle}</div>
        <div className="text-xs text-gray-400">{artistName}</div>
      </div>
      <div className="ml-auto">
        <div className="text-xs text-gray-400">Preview</div>
      </div>
    </div>
  );
};

// Sample releases data - in a real app, this would come from an API or CMS
const latestReleases: Release[] = [
  {
    id: '1',
    slug: 'nova-horizon',
    title: 'Nova Horizon',
    artistName: 'Alex Grey',
    artistSlug: 'alex-grey',
    cover: '/images/releases/nova-horizon.jpg',
    releaseDate: '2024-03-15',
    genres: ['Electronic', 'Ambient'],
    description: 'Eine Reise durch atmosphärische Klanglandschaften und innovative Beats.',
    tracks: [
      {
        id: '1-1',
        title: 'Dawn',
        duration: 215, // in seconds
        previewUrl: '/audio/alex-grey-dawn-preview.mp3',
      },
      {
        id: '1-2',
        title: 'Horizon',
        duration: 184,
        previewUrl: '/audio/alex-grey-horizon-preview.mp3',
      },
    ],
  },
  {
    id: '2',
    slug: 'ritmo-de-vida',
    title: 'Ritmo de Vida',
    artistName: 'EDU',
    artistSlug: 'edu',
    cover: '/images/releases/ritmo-de-vida.jpg',
    releaseDate: '2024-02-10',
    genres: ['Latin', 'Pop'],
    description: 'Eine lebendige Mischung aus lateinamerikanischen Rhythmen und modernem Pop.',
    tracks: [
      {
        id: '2-1',
        title: 'Corazón',
        duration: 198,
        previewUrl: '/audio/edu-corazon-preview.mp3',
      },
      {
        id: '2-2',
        title: 'Vida Nueva',
        duration: 212,
        previewUrl: '/audio/edu-vida-nueva-preview.mp3',
      },
    ],
  },
  {
    id: '3',
    slug: 'retro-future',
    title: 'Retro Future',
    artistName: 'Nova Wave',
    artistSlug: 'nova-wave',
    cover: '/images/releases/retro-future.jpg',
    releaseDate: '2024-01-20',
    genres: ['Synthwave', 'Electro'],
    description: 'Retro-futuristische Klänge mit modernen Produktionstechniken.',
    tracks: [
      {
        id: '3-1',
        title: 'Neon Dreams',
        duration: 226,
        previewUrl: '/audio/nova-wave-neon-dreams-preview.mp3',
      },
      {
        id: '3-2',
        title: 'Digital Love',
        duration: 195,
        previewUrl: '/audio/nova-wave-digital-love-preview.mp3',
      },
    ],
  },
];

type ReleaseCardProps = {
  release: Release;
  index: number;
};

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, index }) => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="bg-gray-900/60 backdrop-blur-sm rounded-lg overflow-hidden"
    >
      <Link href={`/music/${release.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={release.cover}
            alt={`${release.title} by ${release.artistName}`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/music/${release.slug}`} className="block">
          <h3 className="text-xl font-bold text-white hover:text-primary transition-colors">
            {release.title}
          </h3>
        </Link>

        <Link
          href={`/artists/${release.artistSlug}`}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          {release.artistName}
        </Link>

        <div className="flex gap-2 mt-2 mb-4">
          {release.genres.map((genre, idx) => (
            <span key={idx} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
              {genre}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{release.description}</p>

        {release.tracks && release.tracks.length > 0 && release.tracks[0].previewUrl && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Preview:</h4>
            <AudioPlayer
              trackUrl={release.tracks[0].previewUrl || ''}
              trackTitle={release.tracks[0].title}
              artistName={release.artistName}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const LatestReleases: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <Container>
        <div className="text-center mb-12">
          <span className="text-primary font-medium mb-2 block">Neue Musik</span>
          <h2 className="text-3xl md:text-4xl font-bold">Aktuelle Veröffentlichungen</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {latestReleases.map((release, index) => (
            <ReleaseCard key={release.id} release={release} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/music"
            className="group inline-flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white transition-colors"
          >
            Alle Releases entdecken
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default LatestReleases;
