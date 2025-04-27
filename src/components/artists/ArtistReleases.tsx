// src/components/artists/ArtistReleases.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/lib/utils';
import { ReleaseWithTracks as DbReleaseWithTracks } from '@/types/database';

// Exportiere den ReleaseWithTracks Typ für die Verwendung in anderen Komponenten
export interface ReleaseWithTracks {
  id: string;
  slug: string;
  title: string;
  cover_image?: string | null;
  release_date: string;
  tracks?: {
    id: string;
    title: string;
    duration?: number | null;
  }[];
}

interface ArtistReleasesProps {
  artistName: string;
  releases: ReleaseWithTracks[] | DbReleaseWithTracks[];
}

export const ArtistReleases = ({ artistName, releases }: ArtistReleasesProps) => {
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {releases.map((release) => (
        <motion.div
          key={release.id}
          className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          variants={itemVariants}
        >
          <Link href={`/releases/${release.slug}`} className="block">
            <div className="relative aspect-square">
              {release.cover_image ? (
                <Image
                  src={release.cover_image}
                  alt={release.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-600">
                    {release.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{release.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{artistName}</p>
              {release.release_date && (
                <p className="text-xs text-gray-500">
                  Released: {formatDate(new Date(release.release_date))}
                </p>
              )}
              {release.tracks && (
                <p className="text-xs text-gray-500 mt-1">
                  {release.tracks.length} track{release.tracks.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ArtistReleases;
