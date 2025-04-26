import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState, useCallback } from 'react';

import { googleAnalytics, facebookPixel, eventTypes } from '@/config/analytics';
import { FacebookPixel } from '@/lib/analytics/facebook';

// Define more specific types
type GtagFunction = (...args: unknown[]) => void;

// Define analytics event types
type EventName = keyof typeof eventTypes;

interface AnalyticsContextType {
  trackEvent: (name: EventName, properties?: Record<string, unknown>) => void;
  trackPageView: (url?: string) => void;
  consentGiven: {
    analytics: boolean;
    marketing: boolean;
  };
  isInitialized: boolean;
}

// Instead of extending Window directly, we'll declare global
// This is the preferred way to extend the Window interface
declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
    // We're now using the FacebookPixel type here, which is imported from facebook.ts
    fbq?: FacebookPixel;
    _fbq?: unknown[];
  }
}

// Create a no-op function to use as default
const noop = () => {
  // Intentionally empty implementation
};

// Create the context with default values
export const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: noop,
  trackPageView: noop,
  consentGiven: {
    analytics: false,
    marketing: false,
  },
  isInitialized: false,
});

// We're removing this hook from here since it's now in its own file
// export const useAnalytics = () => useContext(AnalyticsContext);

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [consentGiven, setConsentGiven] = useState({
    analytics: false,
    marketing: false,
  });

  // Track page view - wrapped in useCallback to maintain reference stability
  const trackPageView = useCallback(
    (url?: string) => {
      if (!isInitialized) return;

      const pageUrl =
        url ||
        (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '');

      // Google Analytics
      if (consentGiven.analytics && window.gtag) {
        window.gtag('config', googleAnalytics.measurementId, {
          page_path: pageUrl,
        });
      }

      // Facebook Pixel
      if (consentGiven.marketing && window.fbq) {
        window.fbq('track', 'PageView');
      }
    },
    [isInitialized, consentGiven.analytics, consentGiven.marketing]
  );

  // Track custom event - wrapped in useCallback for consistency
  const trackEvent = useCallback(
    (name: EventName, properties?: Record<string, unknown>) => {
      if (!isInitialized) return;

      const eventName = eventTypes[name] || name;

      // Google Analytics
      if (consentGiven.analytics && window.gtag) {
        window.gtag('event', eventName, properties);
      }

      // Facebook Pixel
      if (consentGiven.marketing && window.fbq) {
        window.fbq('trackCustom', eventName, properties);
      }
    },
    [isInitialized, consentGiven.analytics, consentGiven.marketing]
  );

  // Load Google Analytics script
  useEffect(() => {
    if (!googleAnalytics.measurementId || !consentGiven.analytics) return;

    // Check if Google Analytics is already loaded
    if (window.gtag) {
      setIsInitialized(true);
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];

      const gtag: GtagFunction = function (...args) {
        window.dataLayer?.push(args);
      };

      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', googleAnalytics.measurementId, {
        anonymize_ip: true,
        cookie_expires: 30 * 86400, // 30 days in seconds
        debug_mode: googleAnalytics.debug,
      });
      setIsInitialized(true);
    };
  }, [consentGiven.analytics]);

  // Load Facebook Pixel script
  useEffect(() => {
    if (!facebookPixel.pixelId || !consentGiven.marketing) return;

    // Check if Facebook Pixel is already loaded
    if (window.fbq) return;

    // Load Facebook Pixel script - using the FacebookPixel type from facebook.ts
    window.fbq = function (...args) {
      window._fbq?.push(args);
    } as FacebookPixel;

    window._fbq = window._fbq || [];

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.async = true;
    document.head.appendChild(script);

    if (window.fbq) {
      window.fbq('init', facebookPixel.pixelId);
      window.fbq('track', 'PageView');
    }
  }, [consentGiven.marketing]);

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, trackPageView]);

  // Listen for cookie consent changes
  useEffect(() => {
    const handleConsentUpdate = (e: CustomEvent<{ analytics: boolean; marketing: boolean }>) => {
      const { analytics, marketing } = e.detail;
      setConsentGiven({
        analytics,
        marketing,
      });
    };

    window.addEventListener('cookieConsentUpdate', handleConsentUpdate as EventListener);

    // Check if consent is already stored in localStorage
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent) {
      try {
        const { analytics, marketing } = JSON.parse(storedConsent);
        setConsentGiven({
          analytics,
          marketing,
        });
      } catch {
        // Silently handle error - invalid storage value
      }
    }

    return () => {
      window.removeEventListener('cookieConsentUpdate', handleConsentUpdate as EventListener);
    };
  }, []);

  const value = {
    trackEvent,
    trackPageView,
    consentGiven,
    isInitialized,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export default AnalyticsProvider;
