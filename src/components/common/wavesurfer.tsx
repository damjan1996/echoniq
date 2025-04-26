import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

// Define a proper type for WaveSurfer instance
type WaveSurferInstance = WaveSurfer;

interface WaveSurferWrapperProps {
  audioSrc: string;
  onReady: (wavesurfer: WaveSurferInstance) => void;
  onInteraction: (newTime: number) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export const WaveSurferWrapper: React.FC<WaveSurferWrapperProps> = ({
  audioSrc,
  onReady,
  onInteraction,
  isPlaying,
  currentTime,
  duration,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurferInstance | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  // Initialize WaveSurfer
  useEffect(() => {
    if (!containerRef.current) return;

    // If wavesurfer instance exists, destroy it
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    // Create new wavesurfer instance
    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#555555',
      progressColor: '#f97316',
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 1,
      barRadius: 3,
      height: 48,
      normalize: true,
    });

    // Load audio
    wavesurfer.load(audioSrc);

    // Set up event handlers
    wavesurfer.on('ready', () => {
      wavesurferRef.current = wavesurfer;
      onReady(wavesurfer);
    });

    wavesurfer.on('interaction', (newTime: number) => {
      isInteractingRef.current = true;
      onInteraction(newTime);

      // Reset interacting flag after a short timeout
      setTimeout(() => {
        isInteractingRef.current = false;
      }, 100);
    });

    // Cleanup
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioSrc, onReady, onInteraction]);

  // Update wavesurfer progress
  useEffect(() => {
    if (wavesurferRef.current && !isInteractingRef.current) {
      const progress = duration > 0 ? currentTime / duration : 0;
      wavesurferRef.current.seekTo(progress);
    }
  }, [currentTime, duration]);

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

  return <div ref={containerRef} className="w-full" />;
};

export default WaveSurferWrapper;
