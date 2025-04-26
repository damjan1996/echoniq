// src/lib/analytics/index.ts
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { googleAnalytics, facebookPixel } from '@/config/analytics';

// Extract configuration values
const ANALYTICS_ENABLED = Boolean(googleAnalytics?.enabled || facebookPixel?.enabled);
const GOOGLE_ANALYTICS_ENABLED = Boolean(googleAnalytics?.enabled);
const FACEBOOK_PIXEL_ENABLED = Boolean(facebookPixel?.enabled);

// Import individual analytics modules
import {
  initFacebookPixel,
  trackFacebookEvent,
  trackFacebookCustomEvent,
  trackSongPlay as fbTrackSongPlay,
  trackAlbumView as fbTrackAlbumView,
  trackArtistView as fbTrackArtistView,
} from './facebook';
import {
  initGoogleAnalytics,
  pageview as gaPageview,
  event as gaEvent,
  trackSongPlay as gaTrackSongPlay,
  trackAlbumView as gaTrackAlbumView,
  trackArtistView as gaTrackArtistView,
  trackStudioBookingStart,
  trackStudioBookingComplete,
} from './google';

// Exported types for use with analytics
export type SongData = {
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  playTime?: number;
};

export type AlbumData = {
  title: string;
  artist: string;
  releaseDate?: string;
};

export type ArtistData = {
  name: string;
  genre?: string;
};

/**
 * Initialize all analytics services
 */
export const initAnalytics = (): void => {
  if (!ANALYTICS_ENABLED) return;

  if (GOOGLE_ANALYTICS_ENABLED) {
    initGoogleAnalytics();
  }

  if (FACEBOOK_PIXEL_ENABLED) {
    initFacebookPixel();
  }
};

/**
 * Track a page view across all analytics services
 * @param url - The URL to track
 */
export const trackPageView = (url: string): void => {
  if (!ANALYTICS_ENABLED) return;

  if (GOOGLE_ANALYTICS_ENABLED) {
    gaPageview(url);
  }

  // Facebook Pixel automatically tracks page views
};

/**
 * Track a generic event across all analytics services
 * @param name - Event name
 * @param props - Event properties
 */
export const trackEvent = (name: string, props?: Record<string, unknown>): void => {
  if (!ANALYTICS_ENABLED) return;

  if (GOOGLE_ANALYTICS_ENABLED) {
    gaEvent({
      action: name,
      category: String(props?.category || 'general'),
      label: props?.label as string | undefined,
      value: props?.value as number | undefined,
    });
  }

  if (FACEBOOK_PIXEL_ENABLED) {
    // Use standard event if it matches Facebook's standard events
    const isStandardEvent = [
      'AddPaymentInfo',
      'AddToCart',
      'AddToWishlist',
      'CompleteRegistration',
      'Contact',
      'CustomizeProduct',
      'Donate',
      'FindLocation',
      'InitiateCheckout',
      'Lead',
      'Purchase',
      'Schedule',
      'Search',
      'StartTrial',
      'SubmitApplication',
      'Subscribe',
      'ViewContent',
    ].includes(name);

    if (isStandardEvent) {
      trackFacebookEvent(name, props);
    } else {
      trackFacebookCustomEvent(name, props);
    }
  }
};

// Track search events
export const trackSearch = (query: string): void => {
  trackEvent('Search', { query });
};

// Music-specific tracking functions
export const trackSongPlay = (songData: SongData): void => {
  if (!ANALYTICS_ENABLED) return;

  if (GOOGLE_ANALYTICS_ENABLED) {
    gaTrackSongPlay(songData);
  }

  if (FACEBOOK_PIXEL_ENABLED) {
    fbTrackSongPlay(songData);
  }
};

export const trackAlbumView = (albumData: AlbumData): void => {
  if (!ANALYTICS_ENABLED) return;

  if (GOOGLE_ANALYTICS_ENABLED) {
    gaTrackAlbumView(albumData);
  }

  if (FACEBOOK_PIXEL_ENABLED) {
    fbTrackAlbumView(albumData);
  }
};

export const trackArtistView = (artistData: ArtistData): void => {
  if (!ANALYTICS_ENABLED) return;

  if (GOOGLE_ANALYTICS_ENABLED) {
    gaTrackArtistView(artistData.name);
  }

  if (FACEBOOK_PIXEL_ENABLED) {
    fbTrackArtistView(artistData);
  }
};

export const trackStudioBooking = (serviceType: string, isComplete: boolean): void => {
  if (!ANALYTICS_ENABLED) return;

  if (GOOGLE_ANALYTICS_ENABLED) {
    if (isComplete) {
      trackStudioBookingComplete(serviceType);
    } else {
      trackStudioBookingStart();
    }
  }

  if (FACEBOOK_PIXEL_ENABLED) {
    trackFacebookCustomEvent(isComplete ? 'StudioBookingComplete' : 'StudioBookingStart', {
      serviceType,
    });
  }
};

/**
 * React hook to initialize analytics and track page views
 */
export const useAnalytics = (): void => {
  const router = useRouter();

  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Track initial page view
    trackPageView(router.asPath);

    // Track page views on route change
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath]);
};

// Re-export individual modules for direct access if needed
export { gaEvent, trackFacebookEvent, trackFacebookCustomEvent };
