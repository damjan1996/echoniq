import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-neutral-800 text-text-primary hover:bg-neutral-700',
        primary: 'bg-accent-500 text-white hover:bg-accent-600',
        secondary: 'bg-neutral-700 text-text-primary hover:bg-neutral-600',
        outline:
          'bg-transparent border border-neutral-700 text-text-primary hover:border-neutral-600',
        ghost: 'bg-transparent hover:bg-neutral-800 text-text-primary',
        success: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
        warning: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
        error: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
        info: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Separate props for button and div elements
export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
}

const Badge = React.forwardRef<HTMLDivElement | HTMLButtonElement, BadgeProps>(
  ({ className, variant, size, children, icon, interactive = false, onClick, ...props }, ref) => {
    const badgeClass = badgeVariants({ variant, size, className });

    if (interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={`${badgeClass} cursor-pointer focus:ring-accent-500`}
          type="button"
        >
          {icon && <span className="mr-1">{icon}</span>}
          {children}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={badgeClass}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
