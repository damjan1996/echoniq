import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const cardVariants = cva('rounded-lg overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-background-secondary border border-neutral-800',
      outline: 'border border-neutral-800 bg-transparent',
      elevated: 'bg-background-secondary shadow-md',
      ghost: 'bg-transparent',
      filled: 'bg-background-tertiary',
    },
    hover: {
      none: '',
      lift: 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg',
      shadow: 'transition-shadow duration-300 hover:shadow-lg',
      border: 'transition-colors duration-300 hover:border-accent-500',
    },
  },
  defaultVariants: {
    variant: 'default',
    hover: 'none',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  clickable?: boolean;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, clickable = false, onClick, ...props }, ref) => {
    const cardClass = `${cardVariants({ variant, hover, className })} ${
      clickable ? 'cursor-pointer' : ''
    }`;

    return (
      <div
        ref={ref}
        className={cardClass}
        onClick={clickable ? onClick : undefined}
        onKeyDown={
          clickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-6', {
  variants: {
    withBorder: {
      true: 'border-b border-neutral-800',
    },
  },
  defaultVariants: {
    withBorder: false,
  },
});

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, withBorder, ...props }, ref) => {
    return <div ref={ref} className={cardHeaderVariants({ withBorder, className })} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-xl font-semibold leading-none tracking-tight text-text-primary ${className || ''}`}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-text-tertiary ${className || ''}`} {...props} />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className || ''}`} {...props} />
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { withBorder?: boolean }
>(({ className, withBorder = false, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${withBorder ? 'mt-auto border-t border-neutral-800' : ''} ${className || ''}`}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
