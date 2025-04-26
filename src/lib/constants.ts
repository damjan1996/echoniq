// src/lib/constants.ts

/**
 * Environment and configuration
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';

/**
 * Site URLs
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://echoniq.com';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || SITE_URL;
export const ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL || SITE_URL;

/**
 * Site information
 */
export const SITE_NAME = 'echoniq';
export const SITE_DESCRIPTION = 'Electronic music label and recording studio';
export const SITE_KEYWORDS = 'music, record label, electronic music, studio, music production';
export const SITE_LOCALE = 'de-DE';
export const SITE_AUTHOR = 'echoniq Records';

/**
 * Contact information
 */
export const CONTACT_EMAIL = 'info@echoniq.com';
export const CONTACT_PHONE = '+49 123 456789';
export const STUDIO_ADDRESS = {
  street: 'Musterstraße 123',
  city: 'Berlin',
  postcode: '10115',
  country: 'Germany',
  googleMapsUrl: 'https://goo.gl/maps/your-map-link',
};

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/echoniq',
  facebook: 'https://facebook.com/echoniq',
  twitter: 'https://twitter.com/echoniq',
  youtube: 'https://youtube.com/c/echoniq',
  soundcloud: 'https://soundcloud.com/echoniq',
  spotify: 'https://open.spotify.com/artist/echoniq',
  bandcamp: 'https://echoniq.bandcamp.com',
};

/**
 * Navigation paths
 */
export const PATHS = {
  HOME: '/',
  ARTISTS: '/artists',
  ARTIST_DETAIL: (slug: string) => `/artists/${slug}`,
  MUSIC: '/music',
  RELEASE_DETAIL: (slug: string) => `/music/${slug}`,
  STUDIO: '/studio',
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  CONTACT: '/kontakt',
  ABOUT: '/ueber-uns',
  PRIVACY: '/datenschutz',
  IMPRINT: '/impressum',
};

/**
 * Image sizing and quality
 */
export const IMAGE_SIZES = {
  THUMBNAIL: {
    width: 400,
    height: 400,
  },
  CARD: {
    width: 600,
    height: 400,
  },
  HERO: {
    width: 1920,
    height: 1080,
  },
  PROFILE: {
    width: 800,
    height: 800,
  },
  COVER: {
    width: 1200,
    height: 1200,
  },
};

/**
 * Breakpoint values for responsive design (in pixels)
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Audio player configuration
 */
export const AUDIO_PLAYER = {
  DEFAULT_VOLUME: 0.7,
  FADE_DURATION: 0.5, // seconds
  WAVEFORM_COLOR: '#000000',
  WAVEFORM_PROGRESS_COLOR: '#666666',
};

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  PAGE_TRANSITION: 400,
};

/**
 * Pagination default values
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  BLOG_PAGE_SIZE: 9,
  ARTISTS_PAGE_SIZE: 12,
  MUSIC_PAGE_SIZE: 12,
};

/**
 * Date and time formats
 */
export const DATE_FORMAT = {
  FULL: 'dd. MMMM yyyy',
  SHORT: 'dd.MM.yyyy',
  MONTH_YEAR: 'MMMM yyyy',
  TIME: 'HH:mm',
  DAY_MONTH: 'dd. MMMM',
};

/**
 * Music genre categories
 */
export const MUSIC_GENRES = [
  'Ambient',
  'Breakbeat',
  'Deep House',
  'Downtempo',
  'Drum & Bass',
  'Dub Techno',
  'Dubstep',
  'Electro',
  'Electronica',
  'Experimental',
  'House',
  'IDM',
  'Minimal',
  'Progressive House',
  'Techno',
  'Trance',
];

/**
 * Studio service types
 */
export const STUDIO_SERVICES = [
  'Mixing',
  'Mastering',
  'Producing',
  'Recording',
  'Sound Design',
  'Composition',
  'Vocal Coaching',
];

/**
 * Form validation messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Dieses Feld ist erforderlich',
  EMAIL: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  MIN_LENGTH: (min: number) => `Muss mindestens ${min} Zeichen lang sein`,
  MAX_LENGTH: (max: number) => `Darf höchstens ${max} Zeichen lang sein`,
  PHONE: 'Bitte geben Sie eine gültige Telefonnummer ein',
  DATE: 'Bitte geben Sie ein gültiges Datum ein',
  NUMBER: 'Bitte geben Sie eine gültige Zahl ein',
};

/**
 * Default SEO values
 */
export const DEFAULT_SEO = {
  title: 'echoniq - Electronic Music Label & Studio',
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    handle: '@echoniq',
    site: '@echoniq',
    cardType: 'summary_large_image',
  },
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'echoniq-theme',
  VOLUME: 'echoniq-volume',
  COOKIE_CONSENT: 'echoniq-cookie-consent',
  RECENTLY_PLAYED: 'echoniq-recently-played',
};

/**
 * Cookie consent categories
 */
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  PREFERENCES: 'preferences',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
};

/**
 * Default query limit for fetching data
 */
export const DEFAULT_QUERY_LIMIT = 100;

/**
 * Maximum file upload sizes (in bytes)
 */
export const MAX_UPLOAD_SIZES = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  AUDIO: 20 * 1024 * 1024, // 20MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
};

/**
 * Accepted file types for uploads
 */
export const ACCEPTED_FILE_TYPES = {
  IMAGE: 'image/jpeg, image/png, image/webp',
  AUDIO: 'audio/mpeg, audio/wav, audio/ogg',
  DOCUMENT:
    'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
