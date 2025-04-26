import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-neutral-800 text-text-primary hover:bg-neutral-700',
        primary: 'bg-accent-500 text-white hover:bg-accent-600',
        secondary: 'bg-neutral-700 text-text-primary hover:bg-neutral-600',
        outline: 'border border-neutral-700 bg-transparent hover:bg-neutral-800 text-text-primary',
        ghost: 'bg-transparent hover:bg-neutral-800 text-text-primary',
        link: 'bg-transparent underline-offset-4 hover:underline text-text-primary hover:bg-transparent',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded',
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-11 px-6 text-base rounded-md',
        xl: 'h-12 px-8 text-lg rounded-lg',
        icon: 'h-10 w-10 p-0 rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        default: '',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isExternal?: boolean;
  animate?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      href,
      type = 'button',
      loading = false,
      loadingText,
      disabled,
      children,
      leftIcon,
      rightIcon,
      isExternal = false,
      animate = true,
      ...props
    },
    ref
  ) => {
    // Animation variants for hover effect
    const buttonAnimationVariants = {
      hover: { scale: 1.03, transition: { duration: 0.2 } },
      tap: { scale: 0.97, transition: { duration: 0.1 } },
    };

    // Base button classes
    const buttonClasses = buttonVariants({
      variant,
      size,
      fullWidth,
      rounded,
      className,
    });

    // Render as Link if href is provided
    if (href) {
      const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

      return (
        <motion.div
          className="inline-block"
          whileHover={animate ? 'hover' : undefined}
          whileTap={animate ? 'tap' : undefined}
          variants={buttonAnimationVariants}
        >
          <Link href={href} className={buttonClasses} {...linkProps}>
            {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
          </Link>
        </motion.div>
      );
    }

    // Render as button
    return (
      <motion.div
        className="inline-block"
        whileHover={animate && !disabled && !loading ? 'hover' : undefined}
        whileTap={animate && !disabled && !loading ? 'tap' : undefined}
        variants={buttonAnimationVariants}
      >
        <button
          type={type}
          className={buttonClasses}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingText || children}
            </>
          ) : (
            <>
              {leftIcon && <span className="mr-2">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="ml-2">{rightIcon}</span>}
            </>
          )}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
