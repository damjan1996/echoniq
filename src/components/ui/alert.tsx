import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import React from 'react';

const alertVariants = cva('relative w-full rounded-lg border p-4', {
  variants: {
    variant: {
      default: 'bg-background-tertiary border-neutral-700 text-text-primary',
      error: 'bg-red-500/10 border-red-500/20 text-red-500',
      warning: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
      success: 'bg-green-500/10 border-green-500/20 text-green-500',
      info: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, children, icon, onClose, dismissible = false, ...props }, ref) => {
    // Determine the appropriate icon based on the variant
    const getDefaultIcon = () => {
      if (icon) return icon;

      switch (variant) {
        case 'error':
          return <AlertCircle className="h-5 w-5" />;
        case 'warning':
          return <AlertCircle className="h-5 w-5" />;
        case 'success':
          return <CheckCircle className="h-5 w-5" />;
        case 'info':
          return <Info className="h-5 w-5" />;
        default:
          return <Info className="h-5 w-5" />;
      }
    };

    return (
      <div ref={ref} {...props}>
        <AnimatePresence>
          <motion.div
            role="alert"
            className={alertVariants({ variant, className })}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {dismissible && onClose && (
              <button
                type="button"
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/10 transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <div className="flex">
              {getDefaultIcon() && <div className="flex-shrink-0 mr-3">{getDefaultIcon()}</div>}

              <div className={dismissible ? 'pr-8' : ''}>
                {title && <h5 className="text-sm font-medium mb-1">{title}</h5>}
                <div className="text-sm opacity-90">{children}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
