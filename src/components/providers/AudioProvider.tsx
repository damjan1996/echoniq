import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// Use a specific import name to avoid the linting error
import { default as analyticsHook } from '@/hooks/use-analytics';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  artwork?: string;
  releaseId?: string;
  releaseTitle?: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  queue: AudioTrack[];
  playTrack: (track: AudioTrack) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  addToQueue: (track: AudioTrack) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
}

// Create a no-op function to use as default
const noop = () => {
  // Intentionally empty implementation
};

// Export AudioContext so it can be imported in other files
export const AudioContext = createContext<AudioContextType>({
  currentTrack: null,
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  volume: 1,
  isMuted: false,
  queue: [],
  playTrack: noop,
  togglePlay: noop,
  playNext: noop,
  playPrevious: noop,
  seek: noop,
  setCurrentTime: noop,
  setVolume: noop,
  toggleMute: noop,
  addToQueue: noop,
  removeFromQueue: noop,
  clearQueue: noop,
});

export const useAudioPlayer = () => useContext(AudioContext);

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [queue, setQueue] = useState<AudioTrack[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create refs for audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Analytics for tracking
  const { trackEvent } = analyticsHook();

  // Define event handlers with useCallback to maintain reference stability
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleDurationChange = useCallback(() => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  }, []);

  // Player control functions (defined early because we need to reference them in handleTrackEnded)
  const playNext = useCallback(() => {
    if (queue.length <= 1) return;

    // Find current track in queue
    const currentIndex = queue.findIndex((track) => track.id === currentTrack?.id);

    // If current track is found, play next track
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % queue.length;
      setCurrentTrack(queue[nextIndex]);
      setIsPlaying(true);
    }

    // Track event
    trackEvent('SKIP_TRACK');
  }, [queue, currentTrack, trackEvent]);

  const handleTrackEnded = useCallback(() => {
    // Track event
    if (currentTrack) {
      trackEvent('COMPLETE_TRACK', {
        trackId: currentTrack.id,
        trackTitle: currentTrack.title,
        artist: currentTrack.artist,
        releaseId: currentTrack.releaseId,
      });
    }

    // Play next track if available
    if (queue.length > 1) {
      playNext();
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [currentTrack, queue, playNext, trackEvent]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);

    // Auto play when track is loaded
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((_unusedError) => {
        // Handle error silently
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const handleError = useCallback((_unusedEvent: Event) => {
    // Handle error silently
    setIsPlaying(false);
    setIsLoaded(false);
  }, []);

  // Initialize audio element
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'metadata';
      audioRef.current = audio;

      // Event listeners
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('durationchange', handleDurationChange);
      audio.addEventListener('ended', handleTrackEnded);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
    }

    // Cleanup when unmounting
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('durationchange', handleDurationChange);
        audioRef.current.removeEventListener('ended', handleTrackEnded);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current = null;
      }
    };
  }, [handleTimeUpdate, handleDurationChange, handleTrackEnded, handleCanPlay, handleError]);

  // Sync state with local storage to persist volume settings
  useEffect(() => {
    // Load volume settings from local storage
    const storedVolume = localStorage.getItem('audioPlayerVolume');
    const storedMuted = localStorage.getItem('audioPlayerMuted');

    if (storedVolume !== null) {
      const parsedVolume = parseFloat(storedVolume);
      setVolume(parsedVolume);
      if (audioRef.current) {
        audioRef.current.volume = parsedVolume;
      }
    }

    if (storedMuted !== null) {
      const parsedMuted = storedMuted === 'true';
      setIsMuted(parsedMuted);
      if (audioRef.current) {
        audioRef.current.muted = parsedMuted;
      }
    }
  }, []);

  // Update audio source when currentTrack changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    // Set new source and load audio
    audioRef.current.src = currentTrack.src;
    audioRef.current.load();
    setIsLoaded(false);

    // Reset time
    setCurrentTime(0);

    // Track event
    trackEvent('PLAY_TRACK', {
      trackId: currentTrack.id,
      trackTitle: currentTrack.title,
      artist: currentTrack.artist,
      releaseId: currentTrack.releaseId,
    });
  }, [currentTrack, trackEvent]);

  // Update audio state when isPlaying changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      // Try to play, handle autoplay restrictions
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handle error silently
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Update audio volume when volume or muted state changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;

    // Save to local storage
    localStorage.setItem('audioPlayerVolume', volume.toString());
    localStorage.setItem('audioPlayerMuted', isMuted.toString());
  }, [volume, isMuted]);

  // Player control functions
  const playTrack = useCallback(
    (track: AudioTrack) => {
      // Check if track is already in queue
      const trackIndex = queue.findIndex((t) => t.id === track.id);

      if (trackIndex !== -1) {
        // Track already in queue, move to current and play
        setCurrentTrack(track);
        setIsPlaying(true);

        // Update queue to place this track first
        const newQueue = [...queue];
        newQueue.splice(trackIndex, 1);
        newQueue.unshift(track);
        setQueue(newQueue);
      } else {
        // Add track to queue and play
        setCurrentTrack(track);
        setIsPlaying(true);
        setQueue([track, ...queue]);
      }
    },
    [queue]
  );

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;

    setIsPlaying(!isPlaying);

    // Track event
    if (!isPlaying) {
      trackEvent('PLAY_TRACK', {
        trackId: currentTrack.id,
        trackTitle: currentTrack.title,
        artist: currentTrack.artist,
        releaseId: currentTrack.releaseId,
      });
    } else {
      trackEvent('PAUSE_TRACK', {
        trackId: currentTrack.id,
        trackTitle: currentTrack.title,
        artist: currentTrack.artist,
        releaseId: currentTrack.releaseId,
      });
    }
  }, [currentTrack, isPlaying, trackEvent]);

  const playPrevious = useCallback(() => {
    if (queue.length <= 1) return;

    // Find current track in queue
    const currentIndex = queue.findIndex((track) => track.id === currentTrack?.id);

    // If current track is found, play previous track
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      setCurrentTrack(queue[prevIndex]);
      setIsPlaying(true);
    }
  }, [queue, currentTrack]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }, []);

  const setCurrentTimeDirectly = useCallback(
    (time: number) => {
      if (!audioRef.current || !isLoaded) return;
      seek(time);
    },
    [isLoaded, seek]
  );

  const setVolumeLevel = useCallback(
    (newVolume: number) => {
      // Ensure volume is between 0 and 1
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      setVolume(clampedVolume);

      // Unmute if setting volume above 0
      if (clampedVolume > 0 && isMuted) {
        setIsMuted(false);
      }

      // Mute if setting volume to 0
      if (clampedVolume === 0 && !isMuted) {
        setIsMuted(true);
      }
    },
    [isMuted]
  );

  const toggleMuteState = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const addToQueue = useCallback(
    (track: AudioTrack) => {
      // Only add if not already in queue
      if (!queue.some((t) => t.id === track.id)) {
        setQueue([...queue, track]);
      }
    },
    [queue]
  );

  const removeFromQueue = useCallback(
    (id: string) => {
      const newQueue = queue.filter((track) => track.id !== id);
      setQueue(newQueue);

      // If removing current track, play next or stop
      if (currentTrack?.id === id) {
        if (newQueue.length > 0) {
          setCurrentTrack(newQueue[0]);
        } else {
          setCurrentTrack(null);
          setIsPlaying(false);
        }
      }
    },
    [queue, currentTrack]
  );

  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentTrack(null);
    setIsPlaying(false);
  }, []);

  // Context value
  const value: AudioContextType = {
    currentTrack,
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    queue,
    playTrack,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setCurrentTime: setCurrentTimeDirectly,
    setVolume: setVolumeLevel,
    toggleMute: toggleMuteState,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export default AudioProvider;
