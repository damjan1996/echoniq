// Re-export all types from each type file
export * from './artists';
export * from './blog';
export * from './common';
export * from './forms';
export * from './music';
export * from './studio';

// Global app-level types

// Theme configuration
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: {
    body: string;
    heading: string;
    mono: string;
  };
  logo: {
    light: string;
    dark: string;
  };
  darkMode: boolean;
}

// Site configuration
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle: string;
  locale: string;
  analytics: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
}

// Menu configuration
export interface MenuConfig {
  main: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
      description?: string;
      icon?: string;
    }>;
  }>;
  footer: {
    main: Array<{
      label: string;
      href: string;
    }>;
    secondary: Array<{
      label: string;
      href: string;
    }>;
    social: Array<{
      label: string;
      href: string;
      icon: string;
    }>;
  };
}

// App state types
export interface AppState {
  theme: 'light' | 'dark' | 'system';
  showCookieBanner: boolean;
  acceptedCookies: boolean;
  isNavOpen: boolean;
  isPlaying: boolean;
  currentlyPlayingTrack: string | null;
  volume: number;
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    autoClose?: boolean;
  }>;
}

// API response types
export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
  status: number;
}

export interface ApiSuccessResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
    hasMore?: boolean;
  };
  status: number;
}
