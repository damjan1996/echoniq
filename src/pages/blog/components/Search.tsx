import { useRouter } from 'next/router';
import React from 'react';

import { trackSearch } from '@/lib/analytics';
import { debounce, cn } from '@/lib/utils';

interface SearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
  autoSearch?: boolean;
  debounceTime?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal' | 'solid';
}

export const Search: React.FC<SearchProps> = ({
  className,
  placeholder = 'Search blog posts...',
  onSearch,
  initialValue = '',
  autoSearch = true,
  debounceTime = 300,
  size = 'medium',
  variant = 'default',
}) => {
  const router = useRouter();
  const [query, setQuery] = React.useState(initialValue || (router.query.q as string) || '');

  // Update query state when URL changes
  React.useEffect(() => {
    setQuery((router.query.q as string) || '');
  }, [router.query.q]);

  // Create debounced search function
  const debouncedSearch = React.useCallback(
    (value: string) => {
      // Define the handler function first without debounce
      const searchHandler = function (searchValue: string) {
        if (onSearch) {
          onSearch(searchValue);
        } else if (autoSearch) {
          // Update URL query params
          const query = { ...router.query };

          if (searchValue) {
            query.q = searchValue;
            // Reset to page 1 when searching
            delete query.page;
          } else {
            delete query.q;
          }

          router.push(
            {
              pathname: router.pathname,
              query,
            },
            undefined,
            { scroll: false }
          );

          // Track search event
          if (searchValue) {
            trackSearch(searchValue);
          }
        }
      };

      // Create a debounced version of the handler and use as-is
      const handler = debounce(searchHandler, debounceTime);
      handler(value);
    },
    [onSearch, autoSearch, router, debounceTime]
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    debouncedSearch(newValue);
  };

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(query);
    } else if (autoSearch) {
      // Update URL query params
      const queryParams = { ...router.query };

      if (query) {
        queryParams.q = query;
        // Reset to page 1 when searching
        delete queryParams.page;
      } else {
        delete queryParams.q;
      }

      router.push({
        pathname: router.pathname,
        query: queryParams,
      });

      // Track search event
      if (query) {
        trackSearch(query);
      }
    }
  };

  // Handle clearing search
  const handleClear = () => {
    setQuery('');

    if (onSearch) {
      onSearch('');
    } else if (autoSearch) {
      // Update URL query params
      const queryParams = { ...router.query };
      delete queryParams.q;

      router.push(
        {
          pathname: router.pathname,
          query: queryParams,
        },
        undefined,
        { scroll: false }
      );
    }
  };

  // Determine size classes
  const sizeClasses = {
    small: 'h-8 text-sm',
    medium: 'h-10',
    large: 'h-12 text-lg',
  };

  // Determine variant classes
  const variantClasses = {
    default:
      'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500',
    minimal:
      'bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-400',
    solid:
      'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus-within:bg-white dark:focus-within:bg-gray-900',
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative flex items-center w-full', className)}>
      {/* Search icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      {/* Search input */}
      <input
        type="search"
        value={query}
        onChange={handleChange}
        className={cn(
          'block w-full pl-10 pr-10 py-2 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none',
          sizeClasses[size],
          variantClasses[variant],
          'transition-all duration-200'
        )}
        placeholder={placeholder}
        aria-label="Search"
      />

      {/* Clear button (only show when there's a query) */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-10 flex items-center pr-3 cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="sr-only">Clear search</span>
        </button>
      )}

      {/* Submit button */}
      <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="w-4 h-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 1L3 9l4 4 8-8-4-4z"
          />
        </svg>
        <span className="sr-only">Submit search</span>
      </button>
    </form>
  );
};

// Simple search input with expandable design
export const ExpandableSearch: React.FC<Omit<SearchProps, 'size' | 'variant'>> = ({
  className,
  placeholder = 'Search...',
  onSearch,
  initialValue = '',
  autoSearch = true,
  debounceTime = 300,
}) => {
  const router = useRouter();
  const [query, setQuery] = React.useState(initialValue || (router.query.q as string) || '');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Create debounced search function
  const debouncedSearch = React.useCallback(
    (value: string) => {
      // Define the handler function first without debounce
      const searchHandler = function (searchValue: string) {
        if (onSearch) {
          onSearch(searchValue);
        } else if (autoSearch && searchValue) {
          // Update URL query params
          const query = { ...router.query };
          query.q = searchValue;
          delete query.page;

          router.push(
            {
              pathname: router.pathname,
              query,
            },
            undefined,
            { scroll: false }
          );

          // Track search event
          trackSearch(searchValue);
        }
      };

      // Create a debounced version of the handler and use as-is
      const handler = debounce(searchHandler, debounceTime);
      handler(value);
    },
    [onSearch, autoSearch, router, debounceTime]
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    debouncedSearch(newValue);
  };

  // Handle toggling expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);

    // Focus input when expanding
    if (!isExpanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      if (onSearch) {
        onSearch(query);
      } else if (autoSearch) {
        // Update URL query params
        const queryParams = { ...router.query };
        queryParams.q = query;
        delete queryParams.page;

        router.push({
          pathname: router.pathname,
          query: queryParams,
        });

        // Track search event
        trackSearch(query);
      }
    }

    // Collapse on submit
    setIsExpanded(false);
  };

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          className={cn(
            'bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
            isExpanded ? 'w-64' : 'w-0 px-0 opacity-0'
          )}
          placeholder={placeholder}
          aria-label="Search"
        />

        <button
          type="button"
          onClick={toggleExpanded}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full transition-colors',
            isExpanded
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
          aria-label={isExpanded ? 'Close search' : 'Open search'}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isExpanded ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            )}
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;
