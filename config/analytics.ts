/**
 * Analytics configuration for echoniq Label website
 * This file contains settings for various analytics services
 */

// Google Analytics configuration
export const googleAnalytics = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  enabled: process.env.NODE_ENV === 'production',
  debug: false,
};

// Facebook Pixel configuration
export const facebookPixel = {
  pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
  enabled: process.env.NODE_ENV === 'production',
};

// Custom analytics events for music and artist interactions
export const eventTypes = {
  // Music interaction events
  PLAY_TRACK: 'play_track',
  PAUSE_TRACK: 'pause_track',
  COMPLETE_TRACK: 'complete_track',
  SKIP_TRACK: 'skip_track',
  SHARE_TRACK: 'share_track',
  ADD_TO_PLAYLIST: 'add_to_playlist',

  // Artist interaction events
  VIEW_ARTIST: 'view_artist',
  FOLLOW_ARTIST: 'follow_artist',

  // Studio engagement events
  VIEW_STUDIO_SERVICES: 'view_studio_services',
  BOOKING_STARTED: 'booking_started',
  BOOKING_COMPLETED: 'booking_completed',

  // General website engagement
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
};

// Define default tracking options
export const defaultTrackingOptions = {
  anonymizeIp: true,
  cookieExpires: 30 * 86400, // 30 days in seconds
};

// Define user-friendly consent categories
export const consentCategories = {
  necessary: {
    id: 'necessary',
    label: 'Notwendig',
    description:
      'Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
    required: true,
  },
  analytics: {
    id: 'analytics',
    label: 'Analyse',
    description:
      'Diese Cookies ermöglichen es uns, die Nutzung der Website zu analysieren, um die Performance zu messen und zu verbessern.',
    required: false,
  },
  marketing: {
    id: 'marketing',
    label: 'Marketing',
    description: 'Diese Cookies werden verwendet, um Werbung relevanter für dich zu gestalten.',
    required: false,
  },
};

export default {
  googleAnalytics,
  facebookPixel,
  eventTypes,
  defaultTrackingOptions,
  consentCategories,
};
