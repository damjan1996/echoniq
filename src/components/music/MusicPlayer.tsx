import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { useAudioPlayer } from '@/hooks/use-audio-player';

// Define a proper type for WaveSurfer
type WaveSurferInstance = {
  destroy: () => void;
  seekTo: (progress: number) => void;
  play: () => void;
  pause: () => void;
};

// Import WaveSurfer wrapper component
const WaveSurferComponent = dynamic(
  () => import('@/components/common/wavesurfer').then((mod) => mod.WaveSurferWrapper),
  { ssr: false }
);

interface MusicPlayerProps {
  tracks: {
    id: string;
    title: string;
    audioUrl?: string;
    duration: number;
    isPreview?: boolean;
  }[];
  artist: string;
  releaseTitle: string;
  releaseId: string;
  coverImage: string;
  autoPlayFirst?: boolean;
  showCover?: boolean;
  variant?: 'compact' | 'full';
  className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  artist,
  releaseTitle,
  releaseId,
  coverImage,
  autoPlayFirst = false,
  showCover = true,
  variant = 'full',
  className = '',
}) => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playTrack,
    // We're not using these directly but keeping them in case we need them later
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    playNext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    playPrevious,
    duration,
    currentTime,
    setCurrentTime,
    setVolume,
    volume,
    isMuted,
    toggleMute,
  } = useAudioPlayer();

  const [activeTrackId, setActiveTrackId] = useState<string | null>(currentTrack?.id || null);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const wavesurferRef = useRef<WaveSurferInstance | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filtrar pistas con URL de audio disponible
  const playableTracks = tracks.filter((track) => track.audioUrl);

  // Get index of current track in playlist
  const currentTrackIndex = playableTracks.findIndex((track) => track.id === activeTrackId);

  // Setup initial track when component mounts
  useEffect(() => {
    if (playableTracks.length > 0 && autoPlayFirst && !currentTrack) {
      const firstTrack = playableTracks[0];
      playTrack({
        id: firstTrack.id,
        title: firstTrack.title,
        artist: artist,
        src: firstTrack.audioUrl || '',
        artwork: coverImage,
        releaseId: releaseId,
        releaseTitle: releaseTitle,
      });
      setActiveTrackId(firstTrack.id);
    } else if (currentTrack && tracks.some((track) => track.id === currentTrack.id)) {
      // If the current playing track is from this release, set it as active
      setActiveTrackId(currentTrack.id);
    }
  }, [
    playableTracks,
    autoPlayFirst,
    currentTrack,
    tracks,
    playTrack,
    artist,
    coverImage,
    releaseId,
    releaseTitle,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle volume hover
  const handleVolumeEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowVolumeControl(true);
  };

  const handleVolumeLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowVolumeControl(false);
    }, 1000);
  };

  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack?.src || variant === 'compact') return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;

    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Handle track selection
  const handleTrackSelect = (track: MusicPlayerProps['tracks'][0]) => {
    if (!track.audioUrl) return;

    setActiveTrackId(track.id);

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

  // Play next/previous track
  const handleNextTrack = () => {
    if (playableTracks.length <= 1) return;

    const nextIndex = currentTrackIndex < playableTracks.length - 1 ? currentTrackIndex + 1 : 0;

    const nextTrack = playableTracks[nextIndex];
    handleTrackSelect(nextTrack);
  };

  const handlePreviousTrack = () => {
    if (playableTracks.length <= 1) return;

    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : playableTracks.length - 1;

    const prevTrack = playableTracks[prevIndex];
    handleTrackSelect(prevTrack);
  };

  // Check if we have no playable tracks
  if (playableTracks.length === 0) {
    return (
      <div className={`p-4 bg-background-secondary rounded-lg ${className}`}>
        <p className="text-center text-text-tertiary">Keine abspielbare Vorschau verfügbar.</p>
      </div>
    );
  }

  // Render compact player
  if (variant === 'compact') {
    return (
      <div className={`p-4 bg-background-secondary rounded-lg ${className}`}>
        <div className="flex items-center">
          {showCover && (
            <div className="relative w-12 h-12 rounded-md overflow-hidden mr-4 flex-shrink-0">
              <Image
                src={coverImage}
                alt={releaseTitle}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="truncate">
                <span className="font-medium text-text-primary">
                  {playableTracks[currentTrackIndex]?.title || playableTracks[0]?.title}
                </span>
              </div>

              <span className="text-xs text-text-tertiary ml-2">
                {formatTime(currentTrack?.id === activeTrackId ? currentTime : 0)}/
                {formatTime(playableTracks[currentTrackIndex]?.duration || 0)}
              </span>
            </div>

            <div className="flex items-center">
              <button
                onClick={handlePreviousTrack}
                disabled={playableTracks.length <= 1}
                className={`p-1 rounded-full ${playableTracks.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                aria-label="Vorheriger Track"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  if (currentTrack?.id === activeTrackId) {
                    togglePlay();
                  } else if (activeTrackId) {
                    const track = tracks.find((t) => t.id === activeTrackId);
                    if (track && track.audioUrl) {
                      handleTrackSelect(track);
                    }
                  } else if (playableTracks.length > 0) {
                    handleTrackSelect(playableTracks[0]);
                  }
                }}
                className="w-8 h-8 mx-2 flex items-center justify-center rounded-full bg-accent-500 text-text-inverted hover:bg-accent-600 transition-colors"
                aria-label={currentTrack?.id === activeTrackId && isPlaying ? 'Pause' : 'Play'}
              >
                {currentTrack?.id === activeTrackId && isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                disabled={playableTracks.length <= 1}
                className={`p-1 rounded-full ${playableTracks.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                aria-label="Nächster Track"
              >
                <SkipForward className="h-4 w-4" />
              </button>

              <div
                className="relative ml-auto"
                onMouseEnter={handleVolumeEnter}
                onMouseLeave={handleVolumeLeave}
              >
                <button
                  onClick={toggleMute}
                  className="p-1 rounded-full hover:text-accent-500 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>

                <AnimatePresence>
                  {showVolumeControl && (
                    <motion.div
                      className="absolute bottom-full mb-2 right-0 bg-background-tertiary p-2 rounded-lg shadow-md z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 accent-accent-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="h-1 bg-neutral-800 rounded-full overflow-hidden mt-3 cursor-pointer"
          onClick={handleProgressClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleProgressClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          tabIndex={0}
          role="slider"
          aria-label="Progress bar"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
        >
          <div
            className="h-full bg-accent-500 rounded-full"
            style={{
              width: `${
                currentTrack?.id === activeTrackId && duration > 0
                  ? (currentTime / duration) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
      </div>
    );
  }

  // Render full player
  return (
    <div className={`p-6 bg-background-secondary rounded-lg ${className}`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover image and controls */}
        {showCover && (
          <div className="md:w-1/3">
            <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg mb-4">
              <Image
                src={coverImage}
                alt={releaseTitle}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={handlePreviousTrack}
                disabled={playableTracks.length <= 1}
                className={`p-2 rounded-full ${playableTracks.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                aria-label="Vorheriger Track"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={() => {
                  if (currentTrack?.id === activeTrackId) {
                    togglePlay();
                  } else if (activeTrackId) {
                    const track = tracks.find((t) => t.id === activeTrackId);
                    if (track && track.audioUrl) {
                      handleTrackSelect(track);
                    }
                  } else if (playableTracks.length > 0) {
                    handleTrackSelect(playableTracks[0]);
                  }
                }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-500 text-text-inverted hover:bg-accent-600 transition-colors shadow-md"
                aria-label={currentTrack?.id === activeTrackId && isPlaying ? 'Pause' : 'Play'}
              >
                {currentTrack?.id === activeTrackId && isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                disabled={playableTracks.length <= 1}
                className={`p-2 rounded-full ${playableTracks.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                aria-label="Nächster Track"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className="relative"
                onMouseEnter={handleVolumeEnter}
                onMouseLeave={handleVolumeLeave}
              >
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:text-accent-500 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>

                <AnimatePresence>
                  {showVolumeControl && (
                    <motion.div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background-tertiary p-2 rounded-lg shadow-md z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 accent-accent-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1 text-center">
                <div className="text-sm text-text-tertiary">
                  {currentTrackIndex + 1}/{playableTracks.length} Tracks
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Track list and waveform */}
        <div className={`${showCover ? 'md:w-2/3' : 'w-full'}`}>
          <h3 className="text-xl font-bold text-text-primary mb-4">Tracks</h3>

          {/* Waveform */}
          <div className="mb-6" ref={waveformRef}>
            {activeTrackId && variant === 'full' && (
              <>
                {/* Use the WaveSurferWrapper component */}
                {playableTracks.find((track) => track.id === activeTrackId)?.audioUrl && (
                  <WaveSurferComponent
                    audioSrc={
                      playableTracks.find((track) => track.id === activeTrackId)?.audioUrl || ''
                    }
                    onReady={(wavesurfer) => {
                      wavesurferRef.current = wavesurfer;
                    }}
                    onInteraction={(newTime) => {
                      setCurrentTime(newTime);
                    }}
                    isPlaying={isPlaying && currentTrack?.id === activeTrackId}
                    currentTime={currentTime}
                    duration={duration}
                  />
                )}

                <div className="flex justify-between text-xs text-text-tertiary mt-1">
                  <span>{formatTime(currentTrack?.id === activeTrackId ? currentTime : 0)}</span>
                  <span>
                    {formatTime(tracks.find((track) => track.id === activeTrackId)?.duration || 0)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Tracks list */}
          <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => track.audioUrl && handleTrackSelect(track)}
                disabled={!track.audioUrl}
                className={`
                  w-full text-left flex items-center justify-between py-2 px-3 rounded-md 
                  ${track.id === activeTrackId ? 'bg-accent-500/10 text-accent-500' : ''}
                  ${track.audioUrl ? 'cursor-pointer hover:bg-neutral-800/50' : 'cursor-default opacity-70'}
                  transition-colors duration-200
                `}
                aria-label={`Play ${track.title}`}
              >
                <div className="flex items-center min-w-0">
                  <div className="flex-shrink-0 w-8 text-center mr-3">
                    {track.audioUrl ? (
                      track.id === activeTrackId && isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )
                    ) : (
                      <span className="text-text-tertiary">{index + 1}</span>
                    )}
                  </div>

                  <div className="truncate">
                    <span className={`${track.id === activeTrackId ? 'font-medium' : ''}`}>
                      {track.title}
                      {track.isPreview && <span className="ml-2 text-xs italic">(Preview)</span>}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 text-xs text-text-tertiary ml-4">
                  {formatTime(track.duration)}
                </div>
              </button>
            ))}
          </div>

          {/* Note about previews */}
          <div className="mt-6 text-xs text-text-tertiary">
            <p>
              {playableTracks.length === tracks.length
                ? 'Alle Tracks sind als Vorschau verfügbar.'
                : `${playableTracks.length} von ${tracks.length} Tracks sind als Vorschau verfügbar.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
