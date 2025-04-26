// src/lib/analytics.ts
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { googleAnalytics, facebookPixel } from '@/config/analytics';
import {
  trackPageView as trackPageViewOriginal,
  trackEvent as trackEventOriginal,
  trackSongPlay,
  trackAlbumView,
  trackArtistView,
  trackStudioBooking,
  useAnalytics,
} from '@/lib/analytics/index';

// Export types
export type { SongData, AlbumData, ArtistData } from '@/lib/analytics/index';

// Check if any analytics service is enabled
const ANALYTICS_ENABLED = Boolean(googleAnalytics?.enabled || facebookPixel?.enabled);

// Re-export functions from the main analytics module
export { trackSongPlay, trackAlbumView, trackArtistView, trackStudioBooking, useAnalytics };

/**
 * Track page view in analytics
 * @deprecated Use the version from analytics/index.ts instead
 */
export const trackPageView = (url: string): void => {
  trackPageViewOriginal(url);
};

/**
 * Track event in analytics
 * @deprecated Use the version from analytics/index.ts instead
 */
export const trackEvent = (name: string, properties?: Record<string, unknown>): void => {
  trackEventOriginal(name, properties);
};

/**
 * Initialize analytics and track page views
 * @deprecated Use useAnalytics from analytics/index.ts instead
 */
export const usePageView = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

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

/**
 * Track user action (convenience wrapper around trackEvent)
 */
export const trackAction = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  trackEvent(action, {
    category,
    label,
    value,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string, success: boolean): void => {
  trackEvent('form_submission', {
    category: 'form',
    label: formName,
    value: success ? 1 : 0,
  });
};

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, linkType?: string): void => {
  trackEvent('outbound_link', {
    category: 'outbound',
    label: url,
    linkType: linkType || 'external',
  });
};

/**
 * Track social media link click
 */
export const trackSocialClick = (platform: string, url: string): void => {
  trackEvent('social_click', {
    category: 'social',
    label: platform,
    value: 1,
    url,
  });
};

/**
 * Track file download
 */
export const trackDownload = (fileName: string, fileType?: string): void => {
  trackEvent('download', {
    category: 'download',
    label: fileName,
    fileType: fileType || 'unknown',
  });
};

/**
 * Track search query
 */
export const trackSearch = (query: string, resultsCount?: number): void => {
  trackEvent('search', {
    category: 'search',
    label: query,
    value: resultsCount,
  });
};

/**
 * Track filter application
 */
export const trackFilter = (filterType: string, filterValue: string): void => {
  trackEvent('filter', {
    category: 'filter',
    label: `${filterType}:${filterValue}`,
  });
};

/**
 * Analytics utilities for things like Google Tag Manager
 */
export class Analytics {
  /**
   * Get Google Tag Manager initialization script
   */
  static googleTagManagerScript(): string {
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

    return `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
  }

  /**
   * Get Google Tag Manager noscript tag content
   */
  static googleTagManagerNoScript(): string {
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

    return `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
  }
}
