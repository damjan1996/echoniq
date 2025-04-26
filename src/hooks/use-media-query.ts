import { useState, useEffect } from 'react';

/**
 * Custom hook to check if a media query matches
 *
 * @param query - CSS media query string
 * @returns Boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  // Initialize with false for SSR
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Return early if we're in a server environment
    if (typeof window === 'undefined') return undefined;

    // Get the initial match status
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    // Define event listener
    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    // Add event listener with appropriate API
    // The change event is deprecated in newer browsers, but addEventListener is not supported in older ones
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // @ts-ignore - Using deprecated API for older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // @ts-ignore - Using deprecated API for older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

/**
 * Predefined media query hooks for common breakpoints
 */
export const useBreakpoints = () => {
  // Tailwind default breakpoints
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');
  const is2xl = useMediaQuery('(min-width: 1536px)');

  // Mobile-first helpers
  const isMobile = !isMd; // < 768px
  const isTablet = isMd && !isLg; // >= 768px and < 1024px
  const isDesktop = isLg; // >= 1024px

  // Current active breakpoint
  const current = (() => {
    if (is2xl) return '2xl';
    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    return 'xs';
  })();

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isMobile,
    isTablet,
    isDesktop,
    current,
  };
};

/**
 * Check for device orientation
 */
export const useOrientation = () => {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return {
    isPortrait,
    isLandscape,
  };
};

/**
 * Check for dark mode preference
 */
export const useDarkMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  return {
    prefersDarkMode,
    prefersLightMode,
  };
};

/**
 * Check for reduced motion preference
 */
export const useReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

export default useMediaQuery;
