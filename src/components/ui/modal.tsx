import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';

const modalVariants = cva(
  'fixed z-50 border border-neutral-700 bg-background-secondary shadow-lg',
  {
    variants: {
      position: {
        center: 'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
        top: 'left-[50%] top-8 -translate-x-[50%]',
        bottom: 'left-[50%] bottom-8 -translate-x-[50%]',
        left: 'left-8 top-[50%] -translate-y-[50%]',
        right: 'right-8 top-[50%] -translate-y-[50%]',
      },
      size: {
        xs: 'w-full max-w-xs',
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        '2xl': 'w-full max-w-2xl',
        '3xl': 'w-full max-w-3xl',
        '4xl': 'w-full max-w-4xl',
        '5xl': 'w-full max-w-5xl',
        full: 'w-[calc(100%-2rem)] h-[calc(100%-2rem)]',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      position: 'center',
      size: 'md',
      rounded: 'lg',
    },
  }
);

const backdropVariants = cva('fixed inset-0 z-40 bg-black/60', {
  variants: {
    blur: {
      none: '',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur',
      lg: 'backdrop-blur-xl',
    },
  },
  defaultVariants: {
    blur: 'none',
  },
});

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart'>,
    VariantProps<typeof modalVariants> {
  open: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  hideCloseButton?: boolean;
  backdropBlur?: VariantProps<typeof backdropVariants>['blur'];
  disableAnimation?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      children,
      open,
      onClose,
      position = 'center',
      size = 'md',
      rounded = 'lg',
      backdropBlur = 'none',
      header,
      footer,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      hideCloseButton = false,
      disableAnimation = false,
      ...props
    },
    ref
  ) => {
    // Lock body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    // Close modal on escape key press
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose, closeOnEscape]);

    // Determine if modal has header based on header prop
    const hasHeader = !!header;

    // Determine if modal has footer based on footer prop
    const hasFooter = !!footer;

    // Handle backdrop click
    const handleBackdropClick = closeOnBackdropClick ? onClose : undefined;

    // Create backdrop element based on animation setting
    const backdropElement = disableAnimation ? (
      <div
        className={backdropVariants({ blur: backdropBlur })}
        onClick={handleBackdropClick}
        aria-hidden="true"
        role="presentation"
      />
    ) : (
      <motion.div
        className={backdropVariants({ blur: backdropBlur })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={handleBackdropClick}
        aria-hidden="true"
        role="presentation"
      />
    );

    // Simplify the modal JSX to avoid Framer Motion type issues
    return (
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            {backdropElement}

            {/* Modal */}
            <div
              ref={ref}
              role="dialog"
              aria-modal="true"
              className={modalVariants({ position, size, rounded, className })}
              {...props}
            >
              {/* Header */}
              {hasHeader && (
                <div className="flex items-center justify-between border-b border-neutral-700 px-6 py-4">
                  <div className="flex items-center">{header}</div>

                  {!hideCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-text-tertiary hover:bg-neutral-800 hover:text-text-primary transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={`p-6 ${!hasHeader && !hideCloseButton ? 'pt-10' : ''}`}>
                {!hasHeader && !hideCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-text-tertiary hover:bg-neutral-800 hover:text-text-primary transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}

                {children}
              </div>

              {/* Footer */}
              {hasFooter && (
                <div className="border-t border-neutral-700 bg-background-tertiary/50 px-6 py-4">
                  {footer}
                </div>
              )}
            </div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = 'Modal';

const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight text-text-primary ${className || ''}`}
      {...props}
    />
  )
);

ModalHeader.displayName = 'ModalHeader';

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'center' | 'end' | 'between' }
>(({ className, align = 'end', ...props }, ref) => {
  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 ${alignClasses[align]} ${className || ''}`}
      {...props}
    />
  );
});

ModalFooter.displayName = 'ModalFooter';

export { Modal, ModalHeader, ModalFooter };
