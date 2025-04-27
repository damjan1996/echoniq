// src/pages/blog/components/Search.tsx
import { useRouter } from 'next/router';
import React, { useState, useCallback, useRef, useEffect } from 'react';

export interface SearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outline' | 'solid' | 'minimal';
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = 'Search...',
  size = 'medium',
  variant = 'outline',
  className = '',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Get initial query from URL
  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q as string);
    }
  }, [router.query.q]);

  // Debounce search
  const debouncedSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (onSearch) {
          onSearch(value);
        } else {
          // Default behavior: update URL with search query
          const newQuery = { ...router.query };

          if (value) {
            newQuery.q = value;
          } else {
            delete newQuery.q;
          }

          router.push(
            {
              pathname: router.pathname,
              query: newQuery,
            },
            undefined,
            { shallow: true, scroll: false }
          );
        }
      }, 400);
    },
    [onSearch, router]
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(query);
    } else {
      // Default behavior: navigate to search page
      const newQuery = { ...router.query };

      if (query) {
        newQuery.q = query;
      } else {
        delete newQuery.q;
      }

      router.push({
        pathname: router.pathname,
        query: newQuery,
      });
    }
  };

  // Determine classes based on size and variant
  const sizeClasses = {
    small: 'text-sm h-8 px-3',
    medium: 'text-base h-10 px-4',
    large: 'text-lg h-12 px-5',
  };

  const variantClasses = {
    outline:
      'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400',
    solid:
      'bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
    minimal:
      'bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 px-0 rounded-none',
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-md text-gray-900 dark:text-white ${sizeClasses[size]} ${variantClasses[variant]} outline-none transition-colors duration-200`}
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-6 h-6' : 'w-5 h-5'}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  );
};

export default Search;
