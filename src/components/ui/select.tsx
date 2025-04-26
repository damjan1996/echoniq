import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const triggerVariants = cva(
  'flex items-center justify-between w-full px-4 py-2 text-left rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-background-tertiary border-neutral-700 text-text-primary hover:border-neutral-600 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500',
        outline:
          'bg-transparent border-neutral-700 text-text-primary hover:border-neutral-600 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500',
        ghost:
          'bg-transparent border-transparent text-text-primary hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none',
        error:
          'bg-background-tertiary border-red-500 text-text-primary hover:border-red-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
      contentPosition: {
        left: 'pl-10',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      contentPosition: 'none',
    },
  }
);

const optionsVariants = cva(
  'absolute z-50 w-full mt-1 overflow-auto rounded-md border border-neutral-700 bg-background-secondary shadow-lg',
  {
    variants: {
      size: {
        sm: 'max-h-48',
        md: 'max-h-60',
        lg: 'max-h-72',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface SelectProps extends VariantProps<typeof triggerVariants> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
  name?: string;
  id?: string;
  fullWidth?: boolean;
  noOptionsMessage?: string;
  onBlur?: () => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  error,
  clearable = false,
  searchable = false,
  multiple = false,
  leftIcon,
  className = '',
  variant = 'default',
  size = 'md',
  name,
  id,
  fullWidth = true,
  noOptionsMessage = 'No options available',
  onBlur,
  contentPosition,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Set initial selected option/options based on value
  useEffect(() => {
    if (value && !multiple) {
      const option = options.find((opt) => opt.value === value) || null;
      setSelectedOption(option);
    } else if (value && multiple && Array.isArray(value)) {
      const selected = options.filter((opt) => value.includes(opt.value));
      setSelectedOptions(selected);
    } else if (!value) {
      setSelectedOption(null);
      setSelectedOptions([]);
    }
  }, [value, options, multiple]);

  // Determine content position based on left icon
  const resolvedContentPosition = contentPosition || (leftIcon ? 'left' : 'none');

  // Filter options based on search term
  const filteredOptions = searchTerm
    ? options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur]);

  // Handle option selection
  const handleSelectOption = (option: SelectOption) => {
    if (option.disabled) return;

    if (multiple) {
      // Toggle option for multiple select
      const isSelected = selectedOptions.some((opt) => opt.value === option.value);
      const newSelectedOptions = isSelected
        ? selectedOptions.filter((opt) => opt.value !== option.value)
        : [...selectedOptions, option];

      setSelectedOptions(newSelectedOptions);

      if (onChange) {
        onChange(newSelectedOptions.map((opt) => opt.value).join(','));
      }
    } else {
      // Set option for single select
      setSelectedOption(option);
      setIsOpen(false);

      if (onChange) {
        onChange(option.value);
      }
    }

    // Clear search term after selection
    setSearchTerm('');
  };

  // Handle clear button click
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setSelectedOptions([]);

    if (onChange) {
      onChange(multiple ? '' : '');
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      // Focus search input when opening
      if (!isOpen && searchable) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
    }
  };

  // Handle keyboard interaction for list item
  const handleItemKeyDown = (event: React.KeyboardEvent, option: SelectOption) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectOption(option);
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${fullWidth ? 'w-full' : 'inline-block'} ${className}`}
    >
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        id={id}
        value={
          multiple ? selectedOptions.map((opt) => opt.value).join(',') : selectedOption?.value || ''
        }
        required={required}
        disabled={disabled}
        ref={inputRef}
      />

      {/* Select trigger button */}
      <button
        type="button"
        className={triggerVariants({
          variant: error ? 'error' : variant,
          size,
          contentPosition: resolvedContentPosition,
        })}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        {leftIcon && <span className="absolute left-3 text-text-tertiary">{leftIcon}</span>}

        <span className="flex-1 text-left truncate">
          {multiple ? (
            selectedOptions.length > 0 ? (
              <span className="flex flex-wrap gap-1">
                {selectedOptions.length === 1
                  ? selectedOptions[0].label
                  : `${selectedOptions.length} selected`}
              </span>
            ) : (
              <span className="text-text-tertiary">{placeholder}</span>
            )
          ) : selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon && <span>{selectedOption.icon}</span>}
              {selectedOption.label}
            </span>
          ) : (
            <span className="text-text-tertiary">{placeholder}</span>
          )}
        </span>

        <span className="flex items-center gap-1 ml-2">
          {clearable && (selectedOption || selectedOptions.length > 0) && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-text-tertiary hover:text-text-primary rounded-full hover:bg-neutral-800 transition-colors"
              aria-label="Clear selection"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}

          <span className="text-text-tertiary">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </span>
      </button>

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Dropdown options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={optionsVariants({ size })}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {searchable && (
              <div className="p-2 border-b border-neutral-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full py-1.5 pl-9 pr-3 bg-background-tertiary border border-neutral-700 rounded-md text-sm text-text-primary focus:outline-none focus:border-accent-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            <ul className="py-1" role="listbox">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={
                      multiple
                        ? selectedOptions.some((opt) => opt.value === option.value)
                        : selectedOption?.value === option.value
                    }
                    aria-disabled={option.disabled}
                    tabIndex={option.disabled ? -1 : 0}
                    className={`
                      px-3 py-2 cursor-pointer flex items-center justify-between
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800'}
                      ${
                        multiple
                          ? selectedOptions.some((opt) => opt.value === option.value)
                            ? 'bg-accent-500/10 text-accent-500'
                            : ''
                          : selectedOption?.value === option.value
                            ? 'bg-accent-500/10 text-accent-500'
                            : ''
                      }
                    `}
                    onClick={() => !option.disabled && handleSelectOption(option)}
                    onKeyDown={(e) => !option.disabled && handleItemKeyDown(e, option)}
                  >
                    <div className="flex items-center">
                      {option.icon && <span className="mr-2">{option.icon}</span>}
                      <div>
                        <div className="text-sm font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-text-tertiary">{option.description}</div>
                        )}
                      </div>
                    </div>

                    {multiple
                      ? selectedOptions.some((opt) => opt.value === option.value) && (
                          <Check className="h-4 w-4 text-accent-500" />
                        )
                      : selectedOption?.value === option.value && (
                          <Check className="h-4 w-4 text-accent-500" />
                        )}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-text-tertiary text-sm">{noOptionsMessage}</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
