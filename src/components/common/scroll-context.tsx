import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

interface ScrollContextProps {
  scroll: {
    y: number;
    direction: 'up' | 'down' | 'none';
    isAtTop: boolean;
    isAtBottom: boolean;
    scrollTo: (y: number, smooth?: boolean) => void;
    scrollToElement: (id: string, offset?: number) => void;
  };
}

interface ScrollProviderProps {
  children: ReactNode;
  bottomThreshold?: number;
}

// Create the context with default values
const ScrollContext = createContext<ScrollContextProps>({
  scroll: {
    y: 0,
    direction: 'none',
    isAtTop: true,
    isAtBottom: false,
    // Provide non-empty implementations for the context default value
    scrollTo: () => {
      // This is intentionally empty as it will be overridden by the provider
      console.warn('scrollTo called before ScrollProvider was initialized');
    },
    scrollToElement: () => {
      // This is intentionally empty as it will be overridden by the provider
      console.warn('scrollToElement called before ScrollProvider was initialized');
    },
  },
});

// Hook to use the scroll context
export const useScroll = () => useContext(ScrollContext);

// Provider component
export const ScrollProvider: React.FC<ScrollProviderProps> = ({
  children,
  bottomThreshold = 50, // How close to bottom (in px) to trigger isAtBottom
}) => {
  const [y, setY] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const router = useRouter();

  // Scroll to a specific Y position - use useCallback to memoize
  const scrollTo = useCallback((yPos: number, smooth = true) => {
    window.scrollTo({
      top: yPos,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Scroll to an element by ID - use useCallback to memoize
  const scrollToElement = useCallback(
    (id: string, offset = 0) => {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
        scrollTo(y);
      }
    },
    [scrollTo]
  );

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.pageYOffset;

      // Determine scroll direction
      if (currentY > lastY) {
        setDirection('down');
      } else if (currentY < lastY) {
        setDirection('up');
      }

      // Check if at top
      setIsAtTop(currentY <= 0);

      // Check if at bottom
      const isBottom =
        window.innerHeight + currentY >= document.documentElement.scrollHeight - bottomThreshold;
      setIsAtBottom(isBottom);

      // Update state
      setY(currentY);
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastY, bottomThreshold]);

  // Reset scroll position on route change
  useEffect(() => {
    const handleRouteChange = () => {
      // Delay to ensure DOM is updated
      setTimeout(() => {
        // Check if there's a hash in the URL
        if (window.location.hash) {
          const id = window.location.hash.substring(1);
          scrollToElement(id);
        } else {
          // Otherwise scroll to top
          window.scrollTo(0, 0);
        }
      }, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, scrollToElement]);

  // Handle hash links on initial page load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      // Wait for the page to fully load
      setTimeout(() => {
        scrollToElement(id);
      }, 500);
    }
  }, [scrollToElement]);

  // Context value
  const value = {
    scroll: {
      y,
      direction,
      isAtTop,
      isAtBottom,
      scrollTo,
      scrollToElement,
    },
  };

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};

export default ScrollProvider;
