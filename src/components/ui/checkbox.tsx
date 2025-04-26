import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  checkboxSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent';
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, description, error, checkboxSize = 'md', variant = 'default', ...props },
    ref
  ) => {
    const id = props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    // Determine the checkbox size
    const sizeClasses = {
      sm: {
        container: 'h-4 w-4',
        check: 'h-3 w-3',
      },
      md: {
        container: 'h-5 w-5',
        check: 'h-4 w-4',
      },
      lg: {
        container: 'h-6 w-6',
        check: 'h-5 w-5',
      },
    }[checkboxSize];

    // Determine the variant
    const variantClasses = {
      default: {
        border: 'border-neutral-700',
        bg: 'bg-neutral-700',
      },
      accent: {
        border: 'border-accent-500',
        bg: 'bg-accent-500',
      },
    }[variant];

    // Animation variants
    const checkVariants = {
      checked: { scale: 1, opacity: 1 },
      unchecked: { scale: 0, opacity: 0 },
    };

    return (
      <div className={className}>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" id={id} ref={ref} className="sr-only" {...props} />
              <div
                className={`
                  ${sizeClasses.container}
                  ${error ? 'border-red-500' : variantClasses.border}
                  ${props.disabled ? 'opacity-50' : ''}
                  border-2 rounded-sm transition-colors
                  ${props.disabled ? '' : 'cursor-pointer'}
                `}
              >
                {props.checked && (
                  <motion.div
                    className={`
                      flex items-center justify-center
                      ${sizeClasses.container}
                      ${error ? 'bg-red-500' : variantClasses.bg}
                      text-white rounded-sm
                    `}
                    initial="unchecked"
                    animate="checked"
                    exit="unchecked"
                    variants={checkVariants}
                  >
                    <Check className={sizeClasses.check} />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {(label || description) && (
            <div className="ml-3 text-sm">
              {label && (
                <label
                  htmlFor={id}
                  className={`font-medium text-text-primary ${props.disabled ? 'opacity-50' : ''} ${props.disabled ? '' : 'cursor-pointer'}`}
                >
                  {label}
                </label>
              )}
              {description && (
                <p className={`text-text-tertiary mt-1 ${props.disabled ? 'opacity-50' : ''}`}>
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
