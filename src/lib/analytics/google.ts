// src/lib/analytics/google.ts
import { googleAnalytics } from '@/config/analytics';

// Get Google Analytics ID from config
const GOOGLE_ANALYTICS_ID = googleAnalytics?.measurementId;

// Define window with gtag property
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Initialize Google Analytics
 */
export const initGoogleAnalytics = (): void => {
  if (!GOOGLE_ANALYTICS_ID) return;

  // Skip if already initialized
  if (window.gtag) return;

  // Create script for Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  // Initialize with the appropriate tracking ID
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });
};

/**
 * Track a page view in Google Analytics
 * @param url - The URL to track
 */
export const pageview = (url: string): void => {
  if (!window.gtag) return;

  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

/**
 * Track an event in Google Analytics
 * @param action - Event action
 * @param category - Event category
 * @param label - Event label
 * @param value - Event value
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Music-specific event tracking functions
export const trackSongPlay = (songData: {
  title: string;
  artist: string;
  album?: string;
  duration?: number;
}): void => {
  event({
    action: 'play',
    category: 'song',
    label: `${songData.title} - ${songData.artist}`,
    value: songData.duration,
  });
};

export const trackSongPause = (songData: {
  title: string;
  artist: string;
  playTime?: number;
}): void => {
  event({
    action: 'pause',
    category: 'song',
    label: `${songData.title} - ${songData.artist}`,
    value: songData.playTime,
  });
};

export const trackAlbumView = (albumData: { title: string; artist: string }): void => {
  event({
    action: 'view',
    category: 'album',
    label: `${albumData.title} - ${albumData.artist}`,
  });
};

export const trackArtistView = (artistName: string): void => {
  event({
    action: 'view',
    category: 'artist',
    label: artistName,
  });
};

export const trackStudioBookingStart = (): void => {
  event({
    action: 'start',
    category: 'studio_booking',
  });
};

export const trackStudioBookingComplete = (serviceType: string): void => {
  event({
    action: 'complete',
    category: 'studio_booking',
    label: serviceType,
  });
};
