import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  X,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { useAudioPlayer } from '@/hooks/use-audio-player';

// Import WaveSurfer only on client side

// Create a wrapper component for WaveSurfer
const WaveSurferComponent = dynamic(
  () => import('./wavesurfer').then((mod) => mod.WaveSurferWrapper),
  { ssr: false }
);

interface AudioPlayerProps {
  minimal?: boolean;
  onClose?: () => void;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  minimal = false,
  onClose,
  className = '',
}) => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    queue,
    duration,
    currentTime,
    setCurrentTime,
    setVolume,
    volume,
    isMuted,
    toggleMute,
  } = useAudioPlayer();

  const [expanded, setExpanded] = useState(false);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create wavesurfer instance when track changes
  useEffect(() => {
    if (!currentTrack?.src || !waveformRef.current || minimal) return;

    // If a wavesurfer instance exists, destroy it
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    // WaveSurfer initialization is now handled by the WaveSurferWrapper component
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [currentTrack?.src, minimal]);

  // Update wavesurfer progress
  useEffect(() => {
    if (wavesurferRef.current && currentTrack?.src) {
      const progress = duration > 0 ? currentTime / duration : 0;
      wavesurferRef.current.seekTo(progress);
    }
  }, [currentTime, duration, currentTrack?.src]);

  // Handle play/pause
  useEffect(() => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [isPlaying]);

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

  const [showVolumeControl, setShowVolumeControl] = useState(false);

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack?.src || minimal) return;

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

  // If no track is playing, don't render the player
  if (!currentTrack) return null;

  // Define animation variants
  const playerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const expandedPlayerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  // Render minimal player
  if (minimal) {
    return (
      <motion.div
        className={`fixed bottom-4 right-4 bg-background-tertiary rounded-lg shadow-player p-3 z-50 ${className}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={playerVariants}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500 text-text-inverted hover:bg-accent-600 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <div className="text-sm">
            <div className="font-medium truncate max-w-[150px]">{currentTrack.title}</div>
            <div className="text-xs text-text-tertiary truncate max-w-[150px]">
              {currentTrack.artist}
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:text-accent-500 transition-colors"
              aria-label="Close player"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // Render the main player
  return (
    <>
      {/* Main fixed player */}
      <AnimatePresence>
        {!expanded && (
          <motion.div
            className={`fixed bottom-0 left-0 right-0 bg-background-primary border-t border-neutral-800 z-50 ${className}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={playerVariants}
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Track info */}
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={currentTrack.artwork || '/images/default-artwork.jpg'}
                      alt={currentTrack.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div className="mr-4">
                    <div className="font-medium text-text-primary truncate max-w-[120px] sm:max-w-xs">
                      {currentTrack.title}
                    </div>
                    <div className="text-sm text-text-tertiary truncate max-w-[120px] sm:max-w-xs">
                      {currentTrack.artist}
                    </div>
                  </div>
                </div>

                {/* Center controls */}
                <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-tertiary">{formatTime(currentTime)}</span>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={playPrevious}
                        disabled={queue.length <= 1}
                        className={`p-1 rounded-full ${queue.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                        aria-label="Previous track"
                      >
                        <SkipBack size={18} />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-500 text-text-inverted hover:bg-accent-600 transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                      </button>

                      <button
                        onClick={playNext}
                        disabled={queue.length <= 1}
                        className={`p-1 rounded-full ${queue.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                        aria-label="Next track"
                      >
                        <SkipForward size={18} />
                      </button>
                    </div>

                    <span className="text-xs text-text-tertiary">{formatTime(duration)}</span>
                  </div>

                  <div
                    className="h-1 bg-neutral-800 rounded-full overflow-hidden cursor-pointer"
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
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center">
                  {/* Mobile play/pause */}
                  <div className="md:hidden mr-3">
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500 text-text-inverted hover:bg-accent-600 transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                  </div>

                  {/* Volume control */}
                  <div
                    className="relative mr-3 hidden sm:block"
                    onMouseEnter={handleVolumeEnter}
                    onMouseLeave={handleVolumeLeave}
                  >
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    <AnimatePresence>
                      {showVolumeControl && (
                        <motion.div
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background-tertiary p-3 rounded-lg shadow-md"
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

                  {/* Expand button */}
                  <button
                    onClick={() => setExpanded(true)}
                    className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
                    aria-label="Expand player"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded player */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setExpanded(false);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded audio player"
            tabIndex={0}
          >
            <motion.div
              className="bg-background-secondary rounded-2xl max-w-3xl w-full overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              variants={expandedPlayerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Now Playing</h3>
                  <button
                    onClick={() => setExpanded(false)}
                    className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
                    aria-label="Minimize player"
                  >
                    <Minimize2 size={20} />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Artwork */}
                  <div className="w-full md:w-1/2 aspect-square rounded-lg overflow-hidden bg-neutral-900">
                    <div className="relative w-full h-full">
                      <Image
                        src={currentTrack.artwork || '/images/default-artwork.jpg'}
                        alt={currentTrack.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Track info and controls */}
                  <div className="w-full md:w-1/2 flex flex-col">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-text-primary truncate">
                        {currentTrack.title}
                      </h2>
                      <p className="text-lg text-text-secondary truncate">{currentTrack.artist}</p>

                      {currentTrack.releaseTitle && (
                        <div className="mt-2">
                          <span className="text-sm text-text-tertiary">From:</span>
                          <Link
                            href={`/music/${currentTrack.releaseId}`}
                            className="ml-2 text-sm text-accent-500 hover:text-accent-400 transition-colors"
                          >
                            {currentTrack.releaseTitle}
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Waveform Container - Now using WaveSurferComponent */}
                    <div className="mb-6">
                      <div ref={waveformRef} className="w-full">
                        {currentTrack?.src && !minimal && (
                          <WaveSurferComponent
                            audioSrc={currentTrack.src}
                            onReady={(wavesurfer) => {
                              wavesurferRef.current = wavesurfer;
                            }}
                            onInteraction={(newTime) => {
                              setCurrentTime(newTime);
                            }}
                            isPlaying={isPlaying}
                            currentTime={currentTime}
                            duration={duration}
                          />
                        )}
                      </div>

                      <div className="flex justify-between text-xs text-text-tertiary mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center space-x-6 mb-8">
                      <button
                        onClick={playPrevious}
                        disabled={queue.length <= 1}
                        className={`p-2 rounded-full ${queue.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                        aria-label="Previous track"
                      >
                        <SkipBack size={24} />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-500 text-text-inverted hover:bg-accent-600 transition-colors shadow-lg"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause size={30} /> : <Play size={30} className="ml-1" />}
                      </button>

                      <button
                        onClick={playNext}
                        disabled={queue.length <= 1}
                        className={`p-2 rounded-full ${queue.length <= 1 ? 'text-neutral-600' : 'hover:text-accent-500 transition-colors'}`}
                        aria-label="Next track"
                      >
                        <SkipForward size={24} />
                      </button>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center mb-6">
                      <button
                        onClick={toggleMute}
                        className="p-2 rounded-full hover:bg-neutral-800 transition-colors mr-3"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-accent-500"
                      />
                    </div>

                    {/* Queue info */}
                    <div className="mt-auto text-sm text-text-tertiary">
                      <p>
                        {queue.length > 1
                          ? `${queue.length} tracks in queue`
                          : 'No tracks in queue'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Type for WaveSurfer instance
type WaveSurfer = {
  destroy: () => void;
  seekTo: (progress: number) => void;
  play: () => void;
  pause: () => void;
};

export default AudioPlayer;
