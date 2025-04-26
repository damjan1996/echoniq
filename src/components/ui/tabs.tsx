import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect, useCallback } from 'react';

// Tab container variants
const tabsContainerVariants = cva('', {
  variants: {
    variant: {
      default: '',
      pills: '',
      underlined: 'border-b border-neutral-700',
      boxed: 'p-1 bg-background-tertiary rounded-lg',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    fullWidth: false,
  },
});

// Tab list variants
const tabListVariants = cva('flex', {
  variants: {
    variant: {
      default: 'space-x-2',
      pills: 'space-x-2',
      underlined: 'space-x-6',
      boxed: 'space-x-0',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    variant: 'default',
    fullWidth: false,
  },
});

// Tab button variants
const tabButtonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'px-4 py-2 rounded-md hover:bg-neutral-800 data-[state=active]:bg-neutral-800 data-[state=active]:text-text-primary',
        pills:
          'px-4 py-2 rounded-full hover:bg-neutral-800 data-[state=active]:bg-accent-500 data-[state=active]:text-white',
        underlined:
          'px-1 py-2.5 hover:text-accent-500 data-[state=active]:text-accent-500 border-b-2 border-transparent data-[state=active]:border-accent-500',
        boxed:
          'px-4 py-2 rounded-md data-[state=active]:bg-background-secondary data-[state=active]:text-text-primary',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      fullWidth: {
        true: 'flex-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Tab content variants
const tabContentVariants = cva('mt-4', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    padding: 'none',
  },
});

// Tab interface
export interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// Tabs component props
export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContainerVariants> {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  size?: VariantProps<typeof tabButtonVariants>['size'];
  contentPadding?: VariantProps<typeof tabContentVariants>['padding'];
  animated?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  tabs,
  variant = 'default',
  fullWidth = false,
  size = 'md',
  activeTab,
  onTabChange,
  contentPadding = 'none',
  animated = true,
  ...props
}) => {
  // State for active tab
  const [activeTabId, setActiveTabId] = useState<string>(
    activeTab || (tabs.length > 0 ? tabs[0].id : '')
  );

  // Track indicator position
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  // Update active tab when activeTab prop changes
  useEffect(() => {
    if (activeTab) {
      setActiveTabId(activeTab);
    }
  }, [activeTab]);

  // Update indicator position when active tab changes
  useEffect(() => {
    if (variant === 'underlined' && tabRefs.current[activeTabId]) {
      const tabElement = tabRefs.current[activeTabId];
      if (tabElement) {
        setIndicatorStyle({
          width: `${tabElement.offsetWidth}px`,
          transform: `translateX(${tabElement.offsetLeft}px)`,
          transition: 'transform 0.3s ease, width 0.3s ease',
        });
      }
    }
  }, [activeTabId, variant, tabs]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Create a ref callback to store button references
  const setTabRef = useCallback((element: HTMLButtonElement | null, id: string) => {
    if (element) {
      tabRefs.current[id] = element;
    }
  }, []);

  // Get active tab content
  const activeTabContent = tabs.find((tab) => tab.id === activeTabId)?.content;

  // Animation variants for content transition
  const contentAnimation = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.3 } },
  };

  return (
    <div className={tabsContainerVariants({ variant, fullWidth, className })} {...props}>
      <div className="relative">
        <div role="tablist" className={tabListVariants({ variant, fullWidth })}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => setTabRef(el, tab.id)}
              role="tab"
              aria-selected={activeTabId === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={activeTabId === tab.id ? 0 : -1}
              className={tabButtonVariants({ variant, size, fullWidth })}
              data-state={activeTabId === tab.id ? 'active' : 'inactive'}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated indicator for underlined variant */}
        {variant === 'underlined' && (
          <motion.div
            className="absolute bottom-0 h-0.5 bg-accent-500 rounded-full"
            style={indicatorStyle}
            layout
          />
        )}
      </div>

      <div className={tabContentVariants({ padding: contentPadding })}>
        {animated ? (
          <motion.div
            key={activeTabId}
            id={`tabpanel-${activeTabId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTabId}`}
            tabIndex={0}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentAnimation}
          >
            {activeTabContent}
          </motion.div>
        ) : (
          <div
            id={`tabpanel-${activeTabId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTabId}`}
            tabIndex={0}
          >
            {activeTabContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
