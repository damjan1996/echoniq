import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import React, { useState, useRef, useEffect, useCallback } from 'react';

// Dropdown container variants
const dropdownVariants = cva('relative inline-block text-left', {
  variants: {
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

// Dropdown button variants
const triggerVariants = cva(
  'inline-flex items-center justify-between font-medium rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-neutral-800 hover:bg-neutral-700 text-text-primary border border-neutral-700',
        ghost: 'bg-transparent hover:bg-neutral-800 text-text-primary',
        outline: 'bg-transparent border border-neutral-700 hover:bg-neutral-800 text-text-primary',
        plain: 'bg-transparent p-0 hover:text-accent-500 text-text-primary',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Dropdown content panel variants
const contentVariants = cva(
  'absolute z-50 min-w-[8rem] rounded-md border border-neutral-700 bg-background-secondary p-1 shadow-md focus:outline-none',
  {
    variants: {
      position: {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2',
        right: 'left-full ml-2',
      },
      align: {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
      },
      width: {
        auto: '',
        trigger: 'min-w-[var(--trigger-width)]',
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
        full: 'w-full',
      },
    },
    defaultVariants: {
      position: 'bottom',
      align: 'start',
      width: 'trigger',
    },
  }
);

// Item variants
const itemVariants = cva(
  'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-neutral-700 focus:bg-neutral-700 text-text-primary',
        destructive: 'hover:bg-red-500/10 focus:bg-red-500/10 text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Define position type explicitly
type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';

// Types for the Dropdown component
export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  trigger: React.ReactNode;
  triggerVariant?: VariantProps<typeof triggerVariants>['variant'];
  triggerSize?: VariantProps<typeof triggerVariants>['size'];
  triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  position?: DropdownPosition;
  align?: VariantProps<typeof contentVariants>['align'];
  width?: VariantProps<typeof contentVariants>['width'];
  closeOnItemClick?: boolean;
  // Only one of these should be used
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Types for the DropdownItem component
export interface DropdownItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof itemVariants> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

// Animation variants - properly typed for framer-motion
const menuAnimations: Record<DropdownPosition, Variants> = {
  top: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },
  bottom: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  left: {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  },
  right: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  },
};

// Create a shared context for dropdown items
const DropdownContext = React.createContext<{
  closeDropdown: () => void;
  closeOnItemClick: boolean;
}>({
  closeDropdown: () => {
    // This is intentionally empty as it will be overridden by the actual implementation
  },
  closeOnItemClick: true,
});

// Main Dropdown component
const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      children,
      trigger,
      triggerVariant = 'default',
      triggerSize = 'md',
      triggerProps,
      position = 'bottom',
      align = 'start',
      width = 'trigger',
      closeOnItemClick = true,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    // Determine if this is a controlled or uncontrolled component
    const isControlled = controlledOpen !== undefined;

    // State for uncontrolled component
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

    // Use the appropriate state for rendering
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    // Refs for measurements and focus management
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [triggerWidth, setTriggerWidth] = useState(0);

    // Toggle open state
    const toggleOpen = useCallback(() => {
      if (isControlled) {
        onOpenChange?.(!isOpen);
      } else {
        setUncontrolledOpen(!isOpen);
      }
    }, [isControlled, isOpen, onOpenChange]);

    // Close dropdown - wrapped in useCallback to prevent recreating the function on each render
    const closeDropdown = useCallback(() => {
      if (isControlled) {
        onOpenChange?.(false);
      } else {
        setUncontrolledOpen(false);
      }
    }, [isControlled, onOpenChange]);

    // Update trigger width for positioning
    useEffect(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }, []);

    // Add click outside listener
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          closeDropdown();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, closeDropdown]);

    // Get animation variants based on position
    const animationVariants = menuAnimations[position];

    return (
      <div ref={ref} className={dropdownVariants({ fullWidth, className })} {...props}>
        {/* Trigger button */}
        <button
          ref={triggerRef}
          type="button"
          className={triggerVariants({
            variant: triggerVariant,
            size: triggerSize,
            fullWidth,
          })}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleOpen}
          {...triggerProps}
        >
          {trigger}
          {triggerVariant !== 'plain' && (
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        {/* Dropdown content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              className={contentVariants({ position, align, width })}
              style={
                {
                  '--trigger-width': `${triggerWidth}px`,
                } as React.CSSProperties
              }
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.15 }}
            >
              <DropdownContext.Provider value={{ closeDropdown, closeOnItemClick }}>
                <ul className="space-y-1">{children}</ul>
              </DropdownContext.Provider>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

// Dropdown Item component
const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
  (
    {
      className,
      children,
      variant = 'default',
      icon,
      rightIcon,
      disabled = false,
      selected = false,
      onSelect,
      onClick,
      ...props
    },
    ref
  ) => {
    // Use context from parent dropdown
    const context = React.useContext(DropdownContext);

    // Handle click
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) return;

      if (onClick) onClick(e);
      if (onSelect) onSelect();

      if (context.closeOnItemClick) {
        context.closeDropdown();
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onClick) onClick(e as unknown as React.MouseEvent<HTMLLIElement>);
        if (onSelect) onSelect();

        if (context.closeOnItemClick) {
          context.closeDropdown();
        }
      }
    };

    return (
      <li
        ref={ref}
        className={itemVariants({ variant, className })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-disabled={disabled ? 'true' : undefined}
        {...props}
      >
        {icon && <span className="mr-2 inline-flex h-5 w-5 items-center">{icon}</span>}
        <span className="flex-1">{children}</span>
        {selected && <Check className="ml-2 h-4 w-4" />}
        {rightIcon && !selected && (
          <span className="ml-2 inline-flex h-5 w-5 items-center">{rightIcon}</span>
        )}
      </li>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

// Dropdown separator
const DropdownSeparator = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={`-mx-1 my-1 h-px bg-neutral-700 ${className || ''}`}
      role="separator"
      {...props}
    />
  )
);

DropdownSeparator.displayName = 'DropdownSeparator';

// Dropdown label
const DropdownLabel = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={`px-3 py-2 text-xs font-medium text-text-tertiary ${className || ''}`}
      {...props}
    />
  )
);

DropdownLabel.displayName = 'DropdownLabel';

export { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel };
