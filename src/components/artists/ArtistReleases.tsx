import { motion } from 'framer-motion';
import { Play, Pause, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { useAudioPlayer } from '@/hooks/use-audio-player';

// Types
export interface Release {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  releaseDate: string;
  type: 'album' | 'ep' | 'single';
  streamingLinks?: {
    spotify?: string;
    apple_music?: string;
    soundcloud?: string;
    bandcamp?: string;
    youtube?: string;
  };
  tracks?: Track[];
}

// This interface is for compatibility with ReleaseWithTracks type from the API
export interface ReleaseWithTracks {
  id: string;
  slug: string;
  title: string;
  cover_image: string; // Note: different property name
  release_date: string; // Note: different property name
  release_type: 'album' | 'ep' | 'single'; // Note: different property name
  streaming_links?: {
    spotify?: string;
    apple_music?: string;
    soundcloud?: string;
    bandcamp?: string;
    youtube?: string;
  };
  tracks?: Track[];
}

interface Track {
  id: string;
  title: string;
  duration: number;
  audioUrl?: string;
  isPreview: boolean;
}

interface ArtistReleasesProps {
  artistName?: string;
  releases: Release[] | ReleaseWithTracks[];
}

export const ArtistReleases: React.FC<ArtistReleasesProps> = ({
  artistName = '',
  releases = [],
}) => {
  const { currentTrack, isPlaying, playTrack } = useAudioPlayer();

  const [expandedRelease, setExpandedRelease] = useState<string | null>(
    releases.length > 0 ? releases[0].id : null
  );

  // Function to normalize the releases to the Release interface format
  const normalizeReleases = (releases: (Release | ReleaseWithTracks)[]): Release[] => {
    return releases.map((release) => {
      // Check if it's a ReleaseWithTracks by looking for cover_image property
      if ('cover_image' in release) {
        return {
          id: release.id,
          slug: release.slug,
          title: release.title,
          coverImage: release.cover_image,
          releaseDate: release.release_date,
          type: release.release_type,
          streamingLinks: release.streaming_links,
          tracks: release.tracks,
        };
      }
      return release as Release;
    });
  };

  const normalizedReleases = normalizeReleases(releases);

  // Check if any releases exist
  if (!normalizedReleases || normalizedReleases.length === 0) {
    return (
      <section className="py-16 bg-background-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Releases</h2>
            <p className="text-text-secondary">
              {artistName
                ? `${artistName} hat noch keine Veröffentlichungen.`
                : 'Keine Veröffentlichungen verfügbar.'}{' '}
              Schau bald wieder vorbei!
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle expanded release
  const toggleExpanded = (releaseId: string) => {
    setExpandedRelease((prev) => (prev === releaseId ? null : releaseId));
  };

  // Handle play/pause
  const handlePlayTrack = (release: Release, track: Track) => {
    playTrack({
      id: track.id,
      title: track.title,
      artist: artistName,
      src: track.audioUrl || '',
      artwork: release.coverImage,
      releaseId: release.id,
      releaseTitle: release.title,
    });
  };

  return (
    <section className="py-16 bg-background-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Releases</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {artistName
              ? `Entdecke die Musik von ${artistName}.`
              : 'Entdecke unsere neuesten Releases.'}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {normalizedReleases.map((release) => (
            <motion.div
              key={release.id}
              variants={itemVariants}
              className="flex flex-col bg-background-secondary rounded-lg overflow-hidden shadow-lg"
            >
              <Link href={`/music/${release.slug}`} className="block">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={release.coverImage}
                    alt={release.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="uppercase text-xs font-medium text-text-tertiary block mb-1">
                      {release.type} • {new Date(release.releaseDate).getFullYear()}
                    </span>
                    <Link
                      href={`/music/${release.slug}`}
                      className="hover:text-accent-500 transition-colors"
                    >
                      <h3 className="text-xl font-bold text-text-primary">{release.title}</h3>
                    </Link>
                  </div>

                  <button
                    onClick={() => toggleExpanded(release.id)}
                    className="text-text-tertiary hover:text-text-primary transition-colors"
                    aria-expanded={expandedRelease === release.id}
                    aria-label={
                      expandedRelease === release.id ? 'Tracks ausblenden' : 'Tracks anzeigen'
                    }
                  >
                    {expandedRelease === release.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {expandedRelease === release.id && release.tracks && release.tracks.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {release.tracks.map((track) => (
                      <div
                        key={track.id}
                        className={`flex items-center justify-between py-2 px-3 rounded-md ${
                          currentTrack?.id === track.id
                            ? 'bg-accent-500/10 text-accent-500'
                            : 'hover:bg-neutral-800/50'
                        } transition-colors duration-200`}
                      >
                        <div className="flex items-center">
                          {track.audioUrl ? (
                            <button
                              onClick={() => handlePlayTrack(release, track)}
                              className="mr-3 flex-shrink-0"
                              aria-label={
                                currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'
                              }
                            >
                              {currentTrack?.id === track.id && isPlaying ? (
                                <Pause className="h-5 w-5" />
                              ) : (
                                <Play className="h-5 w-5" />
                              )}
                            </button>
                          ) : (
                            <div className="w-8"></div>
                          )}
                          <span className={`text-sm ${track.isPreview ? 'italic' : ''}`}>
                            {track.title}
                            {track.isPreview && ' (Preview)'}
                          </span>
                        </div>
                        <span className="text-xs text-text-tertiary">
                          {formatDuration(track.duration)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {release.streamingLinks && Object.keys(release.streamingLinks).length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xs uppercase font-medium text-text-tertiary mb-3">
                      Streaming
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {release.streamingLinks.spotify && (
                        <a
                          href={release.streamingLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954]/20 transition-colors flex items-center"
                        >
                          <span>Spotify</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                      {release.streamingLinks.apple_music && (
                        <a
                          href={release.streamingLinks.apple_music}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FB233B]/10 text-[#FB233B] hover:bg-[#FB233B]/20 transition-colors flex items-center"
                        >
                          <span>Apple Music</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                      {release.streamingLinks.soundcloud && (
                        <a
                          href={release.streamingLinks.soundcloud}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FF5500]/10 text-[#FF5500] hover:bg-[#FF5500]/20 transition-colors flex items-center"
                        >
                          <span>SoundCloud</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                      {release.streamingLinks.bandcamp && (
                        <a
                          href={release.streamingLinks.bandcamp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#629aa9]/10 text-[#629aa9] hover:bg-[#629aa9]/20 transition-colors flex items-center"
                        >
                          <span>Bandcamp</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                      {release.streamingLinks.youtube && (
                        <a
                          href={release.streamingLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20 transition-colors flex items-center"
                        >
                          <span>YouTube</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/music"
            className="inline-flex items-center px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-text-inverted font-medium transition-colors duration-300"
          >
            Alle Releases anzeigen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistReleases;
