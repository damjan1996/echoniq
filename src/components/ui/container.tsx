import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
      content: 'max-w-[1200px]',
      slim: 'max-w-[768px]',
      wide: 'max-w-[1440px]',
      screen: 'max-w-screen-2xl',
    },
    withPadding: {
      true: '',
      false: 'px-0 sm:px-0 lg:px-0',
    },
    withGutter: {
      true: 'px-4 sm:px-6 lg:px-8',
      false: 'px-0',
    },
  },
  defaultVariants: {
    size: 'content',
    withPadding: true,
    withGutter: true,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, withPadding, withGutter, as = 'div', ...props }, ref) => {
    const Comp = as;

    return (
      <Comp
        ref={ref}
        className={containerVariants({ size, withPadding, withGutter, className })}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export { Container };
