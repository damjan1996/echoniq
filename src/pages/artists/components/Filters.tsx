import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';

import { cn } from '@/lib/utils';

interface SortOption {
  value: string;
  label: string;
}

interface FiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
  sortOptions?: SortOption[];
  allowFeaturedFilter?: boolean;
  defaultSort?: string;
  showMobileFilters?: boolean;
}

export interface FilterState {
  sort: string;
  order: 'asc' | 'desc';
  featured: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  className,
  sortOptions = DEFAULT_SORT_OPTIONS,
  allowFeaturedFilter = true,
  defaultSort = 'name',
  showMobileFilters = true,
}) => {
  const router = useRouter();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);

  // Get filter values from query params or use defaults
  const [filters, setFilters] = React.useState<FilterState>({
    sort: (router.query.sort as string) || defaultSort,
    order: (router.query.order as 'asc' | 'desc') || 'asc',
    featured: router.query.featured === 'true',
  });

  // Update filters when URL changes
  React.useEffect(() => {
    setFilters({
      sort: (router.query.sort as string) || defaultSort,
      order: (router.query.order as 'asc' | 'desc') || 'asc',
      featured: router.query.featured === 'true',
    });
  }, [router.query, defaultSort]);

  // Apply filters
  const applyFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };

    // Update local state
    setFilters(updatedFilters);

    // Call the onChange handler if provided
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    } else {
      // Otherwise, update the URL
      const query = { ...router.query };

      // Update query params
      if (updatedFilters.sort !== defaultSort) {
        query.sort = updatedFilters.sort;
      } else {
        delete query.sort;
      }

      if (updatedFilters.order !== 'asc') {
        query.order = updatedFilters.order;
      } else {
        delete query.order;
      }

      if (updatedFilters.featured) {
        query.featured = 'true';
      } else {
        delete query.featured;
      }

      // Update the URL
      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { scroll: false }
      );
    }

    // Close mobile filters
    setIsMobileFiltersOpen(false);
  };

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3 },
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        opacity: { duration: 0.3 },
        height: { duration: 0.4 },
      },
    },
  };

  return (
    <div className={cn('mb-8', className)}>
      {/* Desktop filters */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Sort dropdown */}
          <div className="flex items-center">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => applyFilters({ sort: e.target.value })}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Order toggle */}
          <div className="flex items-center">
            <button
              onClick={() => applyFilters({ order: filters.order === 'asc' ? 'desc' : 'asc' })}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label={filters.order === 'asc' ? 'Sort descending' : 'Sort ascending'}
            >
              <span className="mr-1">Order:</span>
              {filters.order === 'asc' ? (
                <span className="flex items-center">
                  A-Z <span className="icon-arrow-up ml-1" aria-hidden="true" />
                </span>
              ) : (
                <span className="flex items-center">
                  Z-A <span className="icon-arrow-down ml-1" aria-hidden="true" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Featured filter */}
        {allowFeaturedFilter && (
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.featured}
                onChange={(e) => applyFilters({ featured: e.target.checked })}
                className="sr-only peer"
                id="featured-filter"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Featured only
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Mobile filters button */}
      {showMobileFilters && (
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300"
          >
            <span className="flex items-center">
              <span className="icon-filter mr-2" aria-hidden="true" />
              Filters
            </span>
            <span
              className={`icon-chevron-${isMobileFiltersOpen ? 'up' : 'down'}`}
              aria-hidden="true"
            />
          </button>

          {/* Mobile filters dropdown */}
          <motion.div
            initial="closed"
            animate={isMobileFiltersOpen ? 'open' : 'closed'}
            variants={mobileMenuVariants}
            className="mt-2 overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 space-y-4">
              {/* Sort dropdown */}
              <div>
                <label
                  htmlFor="mobile-sort"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Sort by
                </label>
                <select
                  id="mobile-sort"
                  value={filters.sort}
                  onChange={(e) => applyFilters({ sort: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-700 border-0 text-gray-900 dark:text-white text-sm rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order toggle */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="order-group"
                >
                  Order
                </label>
                <div
                  className="grid grid-cols-2 gap-2"
                  id="order-group"
                  role="group"
                  aria-label="Order direction"
                >
                  <button
                    onClick={() => applyFilters({ order: 'asc' })}
                    className={cn(
                      'py-2 px-3 text-sm rounded-md flex justify-center items-center',
                      filters.order === 'asc'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-medium'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    A-Z <span className="icon-arrow-up ml-1" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => applyFilters({ order: 'desc' })}
                    className={cn(
                      'py-2 px-3 text-sm rounded-md flex justify-center items-center',
                      filters.order === 'desc'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-medium'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    Z-A <span className="icon-arrow-down ml-1" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Featured filter */}
              {allowFeaturedFilter && (
                <div>
                  <label
                    className="inline-flex items-center cursor-pointer"
                    htmlFor="mobile-featured-filter"
                  >
                    <input
                      type="checkbox"
                      checked={filters.featured}
                      onChange={(e) => applyFilters({ featured: e.target.checked })}
                      className="sr-only peer"
                      id="mobile-featured-filter"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured only
                    </span>
                  </label>
                </div>
              )}

              {/* Apply button */}
              <div className="pt-2">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { value: 'name', label: 'Name' },
  { value: 'created_at', label: 'Newest' },
  { value: 'is_featured', label: 'Featured' },
];

export default Filters;
