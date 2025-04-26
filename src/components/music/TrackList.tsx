import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, MoreHorizontal, Download, Share2, Plus } from 'lucide-react';
import React, { useState } from 'react';

import { useAudioPlayer } from '@/hooks/use-audio-player';
import { useSocialShare } from '@/hooks/use-social-share';

interface Track {
  id: string;
  title: string;
  duration: number;
  audioUrl?: string;
  isPreview?: boolean;
  downloadUrl?: string;
  credits?: string;
  lyrics?: string;
}

interface TrackListProps {
  tracks: Track[];
  artist: string;
  releaseTitle: string;
  releaseId: string;
  coverImage: string;
  onPlayAll?: () => void;
  className?: string;
  variant?: 'standard' | 'compact' | 'detailed';
  showHeader?: boolean;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  artist,
  releaseTitle,
  releaseId,
  coverImage,
  onPlayAll,
  className = '',
  variant = 'standard',
  showHeader = true,
}) => {
  const { currentTrack, isPlaying, togglePlay, playTrack } = useAudioPlayer();
  const { shareUrl } = useSocialShare();
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);

  // Helper function to format duration
  const formatDuration = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle track play button click
  const handlePlay = (track: Track) => {
    if (!track.audioUrl) return;

    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        artist: artist,
        src: track.audioUrl,
        artwork: coverImage,
        releaseId: releaseId,
        releaseTitle: releaseTitle,
      });
    }
  };

  // Toggle track details expansion
  const toggleTrackDetails = (trackId: string) => {
    setExpandedTrack(expandedTrack === trackId ? null : trackId);
  };

  // Share track
  const handleShareTrack = (track: Track) => {
    shareUrl(`https://echoniq.de/music/${releaseId}`, {
      title: `${track.title} by ${artist}`,
      text: `Check out "${track.title}" by ${artist} from the ${releaseTitle}.`,
    });
  };

  // Calculate total duration
  const totalDuration = tracks.reduce((sum, track) => sum + track.duration, 0);
  const totalDurationFormatted = formatDuration(totalDuration);

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 },
      },
    },
  };

  // Return empty message if no tracks
  if (tracks.length === 0) {
    return (
      <div className={`p-4 bg-background-secondary rounded-lg text-center ${className}`}>
        <p className="text-text-tertiary">Keine Tracks verfügbar.</p>
      </div>
    );
  }

  // Render track list based on variant
  return (
    <div className={className}>
      {/* Header */}
      {showHeader && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-text-primary">
            {tracks.length} Track{tracks.length !== 1 ? 's' : ''} ({totalDurationFormatted})
          </h3>

          {onPlayAll && (
            <button
              onClick={onPlayAll}
              className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500 hover:bg-accent-600 text-text-inverted transition-colors text-sm font-medium"
            >
              <Play className="h-4 w-4 mr-2" />
              <span>Alle abspielen</span>
            </button>
          )}
        </div>
      )}

      {/* Track list */}
      <motion.div
        className={`divide-y divide-neutral-800 rounded-lg overflow-hidden ${
          variant !== 'compact' ? 'bg-background-secondary' : ''
        }`}
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Table header (for standard and detailed variants) */}
        {variant !== 'compact' && (
          <div className="grid grid-cols-12 py-2 px-4 bg-background-tertiary text-xs font-medium text-text-tertiary uppercase">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-6 md:col-span-5">Title</div>
            <div className="hidden md:block md:col-span-3">
              {variant === 'detailed' ? 'Info' : ''}
            </div>
            <div className="col-span-4 md:col-span-2">
              <div className="flex justify-between items-center">
                <span>Duration</span>
                <MoreHorizontal className="h-4 w-4 opacity-0" />
              </div>
            </div>
          </div>
        )}

        {/* Track rows */}
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            variants={itemVariants}
            className={`relative ${variant === 'compact' ? 'py-2 flex items-center' : 'group'}`}
          >
            {/* Standard and detailed variants */}
            {variant !== 'compact' && (
              <>
                <div
                  className={`grid grid-cols-12 items-center py-3 px-4 ${
                    currentTrack?.id === track.id
                      ? 'bg-accent-500/10 text-accent-500'
                      : 'hover:bg-background-tertiary transition-colors'
                  }`}
                >
                  {/* Track number / play button */}
                  <div className="col-span-1 text-center">
                    {track.audioUrl ? (
                      <button
                        onClick={() => handlePlay(track)}
                        className="w-6 h-6 flex items-center justify-center"
                        aria-label={currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
                      >
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                        )}
                        <span
                          className={`${currentTrack?.id === track.id && isPlaying ? 'hidden' : 'group-hover:hidden'}`}
                        >
                          {index + 1}
                        </span>
                      </button>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Track title */}
                  <div className="col-span-6 md:col-span-5">
                    <div className="truncate pr-4">
                      <span className={`${currentTrack?.id === track.id ? 'font-medium' : ''}`}>
                        {track.title}
                      </span>
                      {track.isPreview && (
                        <span className="ml-2 text-xs italic text-text-tertiary">(Preview)</span>
                      )}
                    </div>
                  </div>

                  {/* Additional info (for detailed variant) */}
                  <div className="hidden md:block md:col-span-3">
                    {variant === 'detailed' && track.credits && (
                      <button
                        onClick={() => toggleTrackDetails(track.id)}
                        className="text-sm text-text-tertiary hover:text-text-secondary transition-colors text-left truncate"
                      >
                        <span>Credits & Lyrics</span>
                      </button>
                    )}
                  </div>

                  {/* Duration and actions */}
                  <div className="col-span-4 md:col-span-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{formatDuration(track.duration)}</span>

                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {track.downloadUrl && (
                          <a
                            href={track.downloadUrl}
                            download
                            className="p-1 text-text-tertiary hover:text-text-primary transition-colors"
                            aria-label="Download"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        )}

                        <button
                          onClick={() => handleShareTrack(track)}
                          className="p-1 text-text-tertiary hover:text-text-primary transition-colors"
                          aria-label="Share"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => toggleTrackDetails(track.id)}
                          className="p-1 text-text-tertiary hover:text-text-primary transition-colors"
                          aria-label="More"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded track details */}
                <AnimatePresence>
                  {expandedTrack === track.id &&
                    (variant === 'detailed' || variant === 'standard') && (
                      <motion.div
                        variants={detailsVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-background-tertiary px-4 py-4 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Credits */}
                          {track.credits && (
                            <div>
                              <h4 className="text-sm font-medium text-text-primary mb-2">
                                Credits
                              </h4>
                              <div className="text-sm text-text-secondary whitespace-pre-line">
                                {track.credits}
                              </div>
                            </div>
                          )}

                          {/* Lyrics */}
                          {track.lyrics && (
                            <div>
                              <h4 className="text-sm font-medium text-text-primary mb-2">Lyrics</h4>
                              <div className="text-sm text-text-secondary whitespace-pre-line max-h-40 overflow-y-auto custom-scrollbar">
                                {track.lyrics}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </>
            )}

            {/* Compact variant */}
            {variant === 'compact' && (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {track.audioUrl ? (
                    <button
                      onClick={() => handlePlay(track)}
                      className="w-8 h-8 mr-3 flex items-center justify-center"
                      aria-label={currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
                    >
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <span className="w-8 mr-3 text-center text-text-tertiary">{index + 1}</span>
                  )}

                  <div>
                    <div
                      className={`text-sm ${currentTrack?.id === track.id ? 'text-accent-500 font-medium' : 'text-text-primary'}`}
                    >
                      {track.title}
                    </div>
                    {track.isPreview && <div className="text-xs text-text-tertiary">Preview</div>}
                  </div>
                </div>

                <div className="text-xs text-text-tertiary">{formatDuration(track.duration)}</div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrackList;
