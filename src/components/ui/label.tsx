import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none',
  {
    variants: {
      variant: {
        default: 'text-text-primary',
        muted: 'text-text-secondary',
        light: 'text-text-tertiary',
        accent: 'text-accent-500',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  disabled?: boolean;
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, children, required, disabled, optional, ...props }, ref) => {
    return (
      <label ref={ref} className={labelVariants({ variant, size, className })} {...props}>
        {children}

        {required && <span className="ml-1 text-red-500">*</span>}

        {optional && (
          <span className="ml-1 text-text-tertiary text-xs font-normal">(optional)</span>
        )}

        {disabled && (
          <span className="ml-1 text-text-tertiary text-xs font-normal">(disabled)</span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };
