// src/lib/analytics/facebook.ts
import { facebookPixel } from '@/config/analytics';

// Get Facebook Pixel ID from config
const FACEBOOK_PIXEL_ID = facebookPixel?.pixelId;

// Interface for the Facebook Pixel object
export interface FacebookPixel {
  (command: string, event: string, data?: object): void;
  (args: unknown[]): void;
  push: (args: unknown[]) => void;
  init: (pixelId: string) => void;
  track: (event: string, data?: object) => void;
  trackCustom: (event: string, data?: object) => void;
  pageView: () => void;
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
  queue?: unknown[];
}

// Define global window interface here
declare global {
  interface Window {
    fbq?: FacebookPixel;
    _fbq?: unknown[];
  }
}

/**
 * Initialize Facebook Pixel
 */
export const initFacebookPixel = (): void => {
  if (!FACEBOOK_PIXEL_ID) return;

  // Skip if already initialized
  if (window.fbq) return;

  // Initialize the Facebook Pixel code
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  // Initialize the pixel
  const fbq = function (this: unknown, ...args: unknown[]) {
    // @ts-ignore - Facebook API requires this unusual pattern for backwards compatibility
    if (fbq.callMethod) {
      // @ts-ignore - Accessing dynamically added property that TypeScript doesn't know about
      fbq.callMethod(...args);
    } else {
      // @ts-ignore - Need to create queue property if it doesn't exist
      if (!fbq.queue) fbq.queue = [];
      // @ts-ignore - Accessing dynamically added property
      fbq.queue.push(args);
    }
  } as FacebookPixel;

  // @ts-ignore - Dynamically adding properties to function object as required by Facebook SDK
  fbq.push = fbq;
  // @ts-ignore - Setting required properties for Facebook Pixel initialization
  fbq.loaded = true;
  // @ts-ignore - Setting required version property
  fbq.version = '2.0';
  // @ts-ignore - Initializing queue array
  fbq.queue = [];
  // @ts-ignore - Adding custom methods to the fbq function
  fbq.init = function (pixelId: string) {
    fbq('init', pixelId);
  };
  // @ts-ignore - Adding pageView method to the fbq function
  fbq.pageView = function () {
    fbq('track', 'PageView');
  };

  window.fbq = fbq;
  window._fbq = [fbq];

  // Initialize pixel - using non-null assertion because we've just assigned to fbq
  window.fbq!.init(FACEBOOK_PIXEL_ID);
  window.fbq!.pageView();
};

/**
 * Track a standard Facebook event
 * @param event - Event name from standard Facebook events
 * @param data - Optional event data
 */
export const trackFacebookEvent = (event: string, data?: object): void => {
  if (!window.fbq) return;
  window.fbq('track', event, data);
};

/**
 * Track a custom Facebook event
 * @param event - Custom event name
 * @param data - Optional event data
 */
export const trackFacebookCustomEvent = (event: string, data?: object): void => {
  if (!window.fbq) return;
  window.fbq('trackCustom', event, data);
};

// Music-specific event tracking functions
export const trackSongPlay = (songData: {
  title: string;
  artist: string;
  album?: string;
}): void => {
  trackFacebookCustomEvent('SongPlay', songData);
};

export const trackAlbumView = (albumData: {
  title: string;
  artist: string;
  releaseDate?: string;
}): void => {
  trackFacebookCustomEvent('AlbumView', albumData);
};

export const trackArtistView = (artistData: { name: string; genre?: string }): void => {
  trackFacebookCustomEvent('ArtistView', artistData);
};
