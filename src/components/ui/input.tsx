import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

const inputVariants = cva(
  'flex w-full rounded-md border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-background-tertiary border-neutral-700 text-text-primary placeholder:text-text-tertiary focus:border-accent-500',
        outline:
          'bg-transparent border-neutral-700 text-text-primary placeholder:text-text-tertiary focus:border-accent-500',
        ghost:
          'bg-transparent border-transparent text-text-primary placeholder:text-text-tertiary hover:bg-neutral-800/50 focus:bg-neutral-800/50',
        error:
          'bg-background-tertiary border-red-500 text-text-primary placeholder:text-text-tertiary focus:border-red-500 focus:ring-red-500',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
      },
      contentPosition: {
        left: 'pl-10',
        right: 'pr-10',
        both: 'pl-10 pr-10',
        none: '',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      contentPosition: 'none',
      fullWidth: true,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  hideError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      contentPosition,
      fullWidth,
      type = 'text',
      leftIcon,
      rightIcon,
      error,
      hideError = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Determine content position based on provided icons
    const resolvedContentPosition =
      contentPosition ||
      (leftIcon && rightIcon ? 'both' : leftIcon ? 'left' : rightIcon ? 'right' : 'none');

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Use type="text" when showPassword is true and type="password" otherwise
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    // If type is password, use Eye/EyeOff as rightIcon
    const resolvedRightIcon =
      type === 'password' ? (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      ) : (
        rightIcon
      );

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          type={inputType}
          className={inputVariants({
            variant: error ? 'error' : variant,
            size,
            contentPosition: resolvedContentPosition,
            fullWidth,
            className,
          })}
          ref={ref}
          {...props}
        />

        {resolvedRightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {resolvedRightIcon}
          </div>
        )}

        {!hideError && error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
