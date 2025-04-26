import { useContext } from 'react';

import { AnalyticsContext } from '@/components/providers/AnalyticsProvider';
import { eventTypes } from '@/config/analytics';

/**
 * Hook for tracking analytics events and page views
 *
 * @returns Analytics context with tracking functions
 */
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }

  // Type-safe wrapper for trackEvent with predefined event types
  type EventName = keyof typeof eventTypes;
  type EventProperties = Record<string, string | number | boolean | undefined>;

  /**
   * Track a custom event with optional properties
   *
   * @param name - Event name
   * @param properties - Optional event properties
   */
  const trackEvent = (name: EventName, properties?: EventProperties) => {
    context.trackEvent(name, properties);
  };

  /**
   * Track common music-related events
   */
  const trackMusicEvents = {
    /**
     * Track when a user plays a track
     */
    playTrack: (trackData: {
      trackId: string;
      trackTitle: string;
      artist: string;
      releaseId?: string;
      releaseTitle?: string;
    }) => {
      trackEvent('PLAY_TRACK', trackData);
    },

    /**
     * Track when a user pauses a track
     */
    pauseTrack: (trackData: {
      trackId: string;
      trackTitle: string;
      artist: string;
      releaseId?: string;
    }) => {
      trackEvent('PAUSE_TRACK', trackData);
    },

    /**
     * Track when a track playback completes
     */
    completeTrack: (trackData: {
      trackId: string;
      trackTitle: string;
      artist: string;
      releaseId?: string;
    }) => {
      trackEvent('COMPLETE_TRACK', trackData);
    },

    /**
     * Track when a user skips a track
     */
    skipTrack: (trackData?: {
      trackId?: string;
      trackTitle?: string;
      artist?: string;
      releaseId?: string;
    }) => {
      trackEvent('SKIP_TRACK', trackData);
    },

    /**
     * Track when a user shares a track
     */
    shareTrack: (trackData: {
      trackId: string;
      trackTitle: string;
      artist: string;
      platform: string;
    }) => {
      trackEvent('SHARE_TRACK', trackData);
    },
  };

  /**
   * Track artist-related events
   */
  const trackArtistEvents = {
    /**
     * Track when a user views an artist profile
     */
    viewArtist: (artistData: { artistId: string; artistName: string }) => {
      trackEvent('VIEW_ARTIST', artistData);
    },

    /**
     * Track when a user follows an artist
     */
    followArtist: (artistData: { artistId: string; artistName: string }) => {
      trackEvent('FOLLOW_ARTIST', artistData);
    },
  };

  /**
   * Track studio-related events
   */
  const trackStudioEvents = {
    /**
     * Track when a user views studio services
     */
    viewStudioServices: () => {
      trackEvent('VIEW_STUDIO_SERVICES');
    },

    /**
     * Track when a user starts a booking
     */
    bookingStarted: (bookingData?: { serviceId?: string; serviceName?: string }) => {
      trackEvent('BOOKING_STARTED', bookingData);
    },

    /**
     * Track when a user completes a booking
     */
    bookingCompleted: (bookingData: {
      serviceId: string;
      serviceName: string;
      bookingDate: string;
    }) => {
      trackEvent('BOOKING_COMPLETED', bookingData);
    },
  };

  /**
   * Track engagement events
   */
  const trackEngagementEvents = {
    /**
     * Track when a user signs up for the newsletter
     */
    newsletterSignup: (data?: { source?: string }) => {
      trackEvent('NEWSLETTER_SIGNUP', data);
    },

    /**
     * Track when a user submits a contact form
     */
    contactFormSubmit: (data?: { subject?: string }) => {
      trackEvent('CONTACT_FORM_SUBMIT', data);
    },
  };

  return {
    ...context,
    trackEvent,
    trackMusicEvents,
    trackArtistEvents,
    trackStudioEvents,
    trackEngagementEvents,
  };
};

export default useAnalytics;
