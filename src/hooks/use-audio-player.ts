import { useContext } from 'react';

import { AudioContext, AudioTrack } from '@/components/providers/AudioProvider';

import { useAnalytics } from './use-analytics';

/**
 * Hook for using the audio player functionality
 *
 * @returns Audio player methods and state
 */
export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  const { trackMusicEvents } = useAnalytics();

  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioProvider');
  }

  /**
   * Enhanced audio player with additional helper methods
   */
  return {
    ...context,

    /**
     * Play a collection of tracks starting with the first one
     *
     * @param tracks - Array of tracks to play
     * @param startIndex - Optional index to start from (default: 0)
     */
    playCollection: (tracks: AudioTrack[], startIndex = 0) => {
      if (tracks.length === 0) return;

      const tracksToAdd = [...tracks];
      const firstTrack = tracksToAdd.splice(startIndex, 1)[0];

      if (firstTrack) {
        // Add all other tracks to queue
        tracksToAdd.forEach((track) => {
          context.addToQueue(track);
        });

        // Play the first selected track
        context.playTrack(firstTrack);

        // Track analytics event
        trackMusicEvents.playTrack({
          trackId: firstTrack.id,
          trackTitle: firstTrack.title,
          artist: firstTrack.artist,
          releaseId: firstTrack.releaseId,
          releaseTitle: firstTrack.releaseTitle,
        });
      }
    },

    /**
     * Toggle play for a specific track
     * If the track is already playing, pause it.
     * If it's a different track, play the new track.
     *
     * @param track - Track to toggle
     */
    toggleTrack: (track: AudioTrack) => {
      if (context.currentTrack?.id === track.id) {
        context.togglePlay();

        // Track analytics event
        if (context.isPlaying) {
          trackMusicEvents.pauseTrack({
            trackId: track.id,
            trackTitle: track.title,
            artist: track.artist,
            releaseId: track.releaseId,
          });
        } else {
          trackMusicEvents.playTrack({
            trackId: track.id,
            trackTitle: track.title,
            artist: track.artist,
            releaseId: track.releaseId,
            releaseTitle: track.releaseTitle,
          });
        }
      } else {
        context.playTrack(track);

        // Track analytics event
        trackMusicEvents.playTrack({
          trackId: track.id,
          trackTitle: track.title,
          artist: track.artist,
          releaseId: track.releaseId,
          releaseTitle: track.releaseTitle,
        });
      }
    },

    /**
     * Format time in MM:SS format
     *
     * @param seconds - Time in seconds
     * @returns Formatted time string
     */
    formatTime: (seconds: number): string => {
      if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Get current progress percentage
     *
     * @returns Progress percentage (0-100)
     */
    getProgress: (): number => {
      if (!context.duration) return 0;
      return (context.currentTime / context.duration) * 100;
    },

    /**
     * Check if a specific track is currently playing
     *
     * @param trackId - ID of the track to check
     * @returns Boolean indicating if the track is playing
     */
    isTrackPlaying: (trackId: string): boolean => {
      return context.currentTrack?.id === trackId && context.isPlaying;
    },

    /**
     * Check if a specific track is currently active (may be paused)
     *
     * @param trackId - ID of the track to check
     * @returns Boolean indicating if the track is active
     */
    isTrackActive: (trackId: string): boolean => {
      return context.currentTrack?.id === trackId;
    },
  };
};

export default useAudioPlayer;
