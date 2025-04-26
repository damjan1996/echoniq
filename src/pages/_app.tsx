import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';
import { AudioProvider } from '@/components/providers/AudioProvider';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Handle page transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Add any route change start logic here (like showing a loader)
      document.documentElement.classList.add('page-transition');
    };

    const handleRouteChangeComplete = () => {
      // Add any route change complete logic here
      document.documentElement.classList.remove('page-transition');

      // Scroll to top on page change
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <AnalyticsProvider>
      <AudioProvider>
        <Component {...pageProps} />
        <Analytics />
      </AudioProvider>
    </AnalyticsProvider>
  );
}

export default MyApp;
