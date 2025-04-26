import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import React from 'react';

interface ErrorMessageProps {
  message: string | null;
  onDismiss?: () => void;
  showIcon?: boolean;
  variant?: 'error' | 'warning' | 'info';
  className?: string;
  dismissable?: boolean;
  timeout?: number | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  showIcon = true,
  variant = 'error',
  className = '',
  dismissable = true,
  timeout = null,
}) => {
  // Set color variants
  const variantClasses = {
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  // Animation variants
  const messageVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Auto-dismiss timer
  React.useEffect(() => {
    if (message && timeout && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, timeout);

      return () => clearTimeout(timer);
    }

    // Add a return for the case when the condition is not met
    return undefined;
  }, [message, timeout, onDismiss]);

  // Don't render anything if there's no message
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`flex items-center justify-between px-4 py-3 rounded-lg border ${variantClasses[variant]} ${className}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={messageVariants}
        transition={{ duration: 0.2 }}
        role={variant === 'error' ? 'alert' : 'status'}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
      >
        <div className="flex items-center">
          {showIcon && <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
          <p className="text-sm font-medium">{message}</p>
        </div>

        {dismissable && onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;
