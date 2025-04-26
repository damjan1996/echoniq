import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

import { LoadingSpinner } from './loading-spinner';

interface PageTransitionProps {
  children: ReactNode;
  mode?: 'fade' | 'slide' | 'none';
  duration?: number;
  skipTransitions?: boolean;
  showSpinner?: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = 'fade',
  duration = 0.3,
  skipTransitions = false,
  showSpinner = true,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Animation variants
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration } },
    exit: { opacity: 0, transition: { duration: duration / 2 } },
  };

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration } },
    exit: { opacity: 0, x: -20, transition: { duration: duration / 2 } },
  };

  // Select which variant to use
  const variants = mode === 'slide' ? slideVariants : fadeVariants;

  // Handle route changes
  useEffect(() => {
    // If transitions are skipped, don't do anything
    if (skipTransitions) return;

    const handleStart = (url: string) => {
      // Only trigger loading if it's a different route
      if (url !== router.asPath) {
        setLoading(true);
        setTransitioning(true);
      }
    };

    const handleComplete = () => {
      setLoading(false);
      // Small delay to ensure transition completes
      setTimeout(() => setTransitioning(false), duration * 1000);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, duration, skipTransitions]);

  // If transitions are disabled, render children directly
  if (skipTransitions || mode === 'none') {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && showSpinner ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-background-primary/90 z-50"
          >
            <LoadingSpinner size="lg" label="Seite wird geladen..." />
          </motion.div>
        ) : (
          <motion.div
            key={router.asPath}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className={transitioning ? 'pointer-events-none' : ''}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
