import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollDirection {
  vertical: 'up' | 'down' | 'none';
  horizontal: 'left' | 'right' | 'none';
}

interface ScrollState {
  position: ScrollPosition;
  direction: ScrollDirection;
  progress: {
    vertical: number;
    horizontal: number;
  };
  isAtTop: boolean;
  isAtBottom: boolean;
  isAtLeft: boolean;
  isAtRight: boolean;
}

// Remove unused interface
// interface ScrollHandling {...}

/**
 * Hook for tracking and controlling scroll position, direction, and state
 *
 * @param bottomThreshold - Distance from bottom to consider as "at bottom" (in pixels)
 * @param throttleMs - Throttle time for scroll event in milliseconds
 * @returns Scroll state and utility functions
 */
export const useScroll = (bottomThreshold = 50, throttleMs = 100) => {
  // State
  const [scrollState, setScrollState] = useState<ScrollState>({
    position: { x: 0, y: 0 },
    direction: { vertical: 'none', horizontal: 'none' },
    progress: { vertical: 0, horizontal: 0 },
    isAtTop: true,
    isAtBottom: false,
    isAtLeft: true,
    isAtRight: false,
  });

  // References
  const lastScrollPosition = useRef<ScrollPosition>({ x: 0, y: 0 });
  const scrollListenerActive = useRef<boolean>(true);
  const ticking = useRef<boolean>(false);

  /**
   * Calculate scroll progress
   */
  const calculateScrollProgress = useCallback(() => {
    if (typeof window === 'undefined') return { vertical: 0, horizontal: 0 };

    // Vertical scroll progress
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const viewportHeight = window.innerHeight;
    const maxScroll = docHeight - viewportHeight;
    const verticalProgress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;

    // Horizontal scroll progress
    const docWidth = Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    );
    const viewportWidth = window.innerWidth;
    const maxScrollX = docWidth - viewportWidth;
    const horizontalProgress = maxScrollX <= 0 ? 0 : window.scrollX / maxScrollX;

    return {
      vertical: Math.min(Math.max(0, verticalProgress), 1),
      horizontal: Math.min(Math.max(0, horizontalProgress), 1),
    };
  }, []);

  /**
   * Update scroll state
   */
  const updateScrollState = useCallback(() => {
    if (typeof window === 'undefined' || !scrollListenerActive.current) return;

    // Get current scroll position
    const currentScrollPosition = {
      x: window.scrollX,
      y: window.scrollY,
    };

    // Determine scroll direction
    const scrollDirection: ScrollDirection = {
      vertical:
        currentScrollPosition.y > lastScrollPosition.current.y
          ? 'down'
          : currentScrollPosition.y < lastScrollPosition.current.y
            ? 'up'
            : 'none',
      horizontal:
        currentScrollPosition.x > lastScrollPosition.current.x
          ? 'right'
          : currentScrollPosition.x < lastScrollPosition.current.x
            ? 'left'
            : 'none',
    };

    // Calculate progress
    const progress = calculateScrollProgress();

    // Check if at top, bottom, left, or right
    const isAtTop = currentScrollPosition.y <= 0;
    const isAtBottom =
      window.innerHeight + currentScrollPosition.y + bottomThreshold >=
      document.documentElement.scrollHeight;
    const isAtLeft = currentScrollPosition.x <= 0;
    const isAtRight =
      window.innerWidth + currentScrollPosition.x + bottomThreshold >=
      document.documentElement.scrollWidth;

    // Update state
    setScrollState({
      position: currentScrollPosition,
      direction: scrollDirection,
      progress,
      isAtTop,
      isAtBottom,
      isAtLeft,
      isAtRight,
    });

    // Update last scroll position
    lastScrollPosition.current = currentScrollPosition;

    // Reset ticking flag
    ticking.current = false;
  }, [bottomThreshold, calculateScrollProgress]);

  /**
   * Throttled scroll handler
   */
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined' || !scrollListenerActive.current || ticking.current) return;

    ticking.current = true;

    // Use requestAnimationFrame for smooth performance
    if (throttleMs <= 0) {
      requestAnimationFrame(updateScrollState);
    } else {
      setTimeout(updateScrollState, throttleMs);
    }
  }, [throttleMs, updateScrollState]);

  /**
   * Scroll to a specific position
   */
  const scrollTo = useCallback((options: ScrollToOptions) => {
    if (typeof window === 'undefined') return;
    window.scrollTo(options);
  }, []);

  /**
   * Scroll to top of page
   */
  const scrollToTop = useCallback(
    (smooth = true) => {
      scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
    },
    [scrollTo]
  );

  /**
   * Scroll to bottom of page
   */
  const scrollToBottom = useCallback(
    (smooth = true) => {
      if (typeof document === 'undefined') return;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      scrollTo({
        top: docHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    },
    [scrollTo]
  );

  /**
   * Scroll to a specific element
   */
  const scrollToElement = useCallback(
    (element: HTMLElement | string, offset = 0, smooth = true) => {
      if (typeof document === 'undefined') return;

      let targetElement: HTMLElement | null = null;

      if (typeof element === 'string') {
        targetElement = document.getElementById(element);
      } else {
        targetElement = element;
      }

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        scrollTo({
          top: rect.top + scrollTop + offset,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    },
    [scrollTo]
  );

  /**
   * Disable scrolling
   */
  const disableScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    // Save current scroll position
    const scrollPosition = { x: window.scrollX, y: window.scrollY };

    // Add styles to prevent scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition.y}px`;
    document.body.style.width = '100%';

    // Disable scroll listener
    scrollListenerActive.current = false;
  }, []);

  /**
   * Enable scrolling
   */
  const enableScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    // Get the scroll position from the style
    const scrollY = document.body.style.top
      ? parseInt(document.body.style.top.replace('-', ''))
      : 0;

    // Remove styles
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    // Restore scroll position
    window.scrollTo(0, scrollY);

    // Enable scroll listener
    scrollListenerActive.current = true;
  }, []);

  /**
   * Set up scroll listener
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial values
    lastScrollPosition.current = {
      x: window.scrollX,
      y: window.scrollY,
    };

    // Update initial state
    updateScrollState();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Add resize event listener to recalculate when window is resized
    window.addEventListener('resize', updateScrollState, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [handleScroll, updateScrollState]);

  // Return scroll state and functions
  return {
    scroll: scrollState,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    disableScroll,
    enableScroll,
  };
};

export default useScroll;
