import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState, useRef, useEffect, useCallback } from 'react';

const textareaVariants = cva(
  'flex w-full rounded-md border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
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
        sm: 'text-xs px-3 py-2',
        md: 'text-sm px-4 py-3',
        lg: 'text-base px-5 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  hideError?: boolean;
  autoResize?: boolean;
  maxRows?: number;
  minRows?: number;
  showCount?: boolean;
  maxLength?: number;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      error,
      hideError = false,
      autoResize = false,
      maxRows = 10,
      minRows = 3,
      showCount = false,
      maxLength,
      wrapperClassName = '',
      rows = minRows,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [textValue, setTextValue] = useState(value || '');
    const [textareaHeight, setTextareaHeight] = useState<number | undefined>(undefined);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Merge external ref with internal ref
    const mergedRef = (node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Resize textarea based on content - wrapped in useCallback to stabilize the function reference
    const resizeTextarea = useCallback(() => {
      if (!autoResize || !textareaRef.current) return;

      // Reset height to calculate scrollHeight correctly
      textareaRef.current.style.height = 'auto';

      // Calculate line height based on font size
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const lineHeight =
        parseInt(computedStyle.lineHeight) || parseInt(computedStyle.fontSize) * 1.5;

      // Calculate min and max height based on rows
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;

      // Set new height
      const newHeight = Math.min(Math.max(textareaRef.current.scrollHeight, minHeight), maxHeight);

      if (newHeight !== textareaHeight) {
        setTextareaHeight(newHeight);
      }
    }, [autoResize, maxRows, minRows, textareaHeight]);

    // Handle textarea value change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    };

    // Resize on content change
    useEffect(() => {
      resizeTextarea();
    }, [textValue, autoResize, resizeTextarea]);

    // Initial resize
    useEffect(() => {
      if (autoResize) {
        resizeTextarea();
      }
    }, [autoResize, resizeTextarea]);

    return (
      <div className={wrapperClassName}>
        <div className="relative">
          <textarea
            ref={mergedRef}
            value={value}
            onChange={handleChange}
            className={textareaVariants({
              variant: error ? 'error' : variant,
              size,
              className,
            })}
            rows={rows}
            style={autoResize && textareaHeight ? { height: `${textareaHeight}px` } : undefined}
            maxLength={maxLength}
            {...props}
          />

          {showCount && maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-text-tertiary">
              {value ? String(value).length : 0}/{maxLength}
            </div>
          )}
        </div>

        {!hideError && error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
