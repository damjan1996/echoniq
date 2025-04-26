import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';

import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categorySlug: string) => void;
  className?: string;
  variant?: 'pills' | 'tabs' | 'links';
}

export const Categories: React.FC<CategoriesProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
  variant = 'pills',
}) => {
  const router = useRouter();

  // If no selectedCategory is provided, try to get it from the URL
  const activeCategory = selectedCategory || (router.query.category as string);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Handle category selection
  const handleCategoryClick = (categorySlug: string) => {
    if (onCategoryChange) {
      onCategoryChange(categorySlug);
    } else {
      // If no handler is provided, update the URL
      const query = { ...router.query };

      if (categorySlug === 'all') {
        // Remove category filter if 'all' is selected
        delete query.category;
      } else {
        // Add or update category filter
        query.category = categorySlug;
      }

      // Always reset to page 1 when changing category
      delete query.page;

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { scroll: false }
      );
    }
  };

  // Style variants
  const getItemStyles = (isActive: boolean) => {
    switch (variant) {
      case 'tabs':
        return cn(
          'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
          isActive
            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
            : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        );
      case 'links':
        return cn(
          'text-sm font-medium transition-colors',
          isActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        );
      case 'pills':
      default:
        return cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          isActive
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        );
    }
  };

  // Container styles based on variant
  const containerStyles = cn(
    variant === 'tabs'
      ? 'border-b border-gray-200 dark:border-gray-700 space-x-5'
      : variant === 'links'
        ? 'space-x-5'
        : 'flex flex-wrap gap-2 md:gap-3',
    className
  );

  return (
    <div className="mb-8">
      <motion.div
        className={containerStyles}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* "All" category */}
        <motion.div
          variants={itemVariants}
          className={variant === 'tabs' || variant === 'links' ? 'inline-block' : undefined}
        >
          <button
            onClick={() => handleCategoryClick('all')}
            className={getItemStyles(!activeCategory)}
          >
            All
          </button>
        </motion.div>

        {/* Category items */}
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            className={variant === 'tabs' || variant === 'links' ? 'inline-block' : undefined}
          >
            <button
              onClick={() => handleCategoryClick(category.slug)}
              className={getItemStyles(activeCategory === category.slug)}
            >
              {category.name}
              {category.count !== undefined && (
                <span className="ml-1 text-xs opacity-70">({category.count})</span>
              )}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Alternative scrolling categories component for mobile-friendly UI
export const ScrollingCategories: React.FC<CategoriesProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
  variant = 'pills',
}) => {
  const router = useRouter();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // If no selectedCategory is provided, try to get it from the URL
  const activeCategory = selectedCategory || (router.query.category as string);

  // Handle scrolling for mobile
  React.useEffect(() => {
    if (scrollRef.current && activeCategory) {
      const activeElement = scrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeElement) {
        // Scroll the active category into view
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeCategory]);

  // Handle category selection
  const handleCategoryClick = (categorySlug: string) => {
    if (onCategoryChange) {
      onCategoryChange(categorySlug);
    } else {
      // If no handler is provided, update the URL
      const query = { ...router.query };

      if (categorySlug === 'all') {
        // Remove category filter if 'all' is selected
        delete query.category;
      } else {
        // Add or update category filter
        query.category = categorySlug;
      }

      // Always reset to page 1 when changing category
      delete query.page;

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { scroll: false }
      );
    }
  };

  // Style variants
  const getItemStyles = (isActive: boolean) => {
    switch (variant) {
      case 'tabs':
        return cn(
          'px-4 py-2 text-sm font-medium whitespace-nowrap',
          isActive
            ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
            : 'border-b-2 border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        );
      case 'links':
        return cn(
          'px-2 text-sm font-medium whitespace-nowrap',
          isActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        );
      case 'pills':
      default:
        return cn(
          'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
          isActive
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        );
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Fade indicators for horizontal scrolling */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-gray-900 z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-gray-900 z-10 pointer-events-none" />

      {/* Scrollable container */}
      <div ref={scrollRef} className="flex overflow-x-auto py-2 scrollbar-hide -mx-4 px-4">
        <div className={cn('flex', variant === 'pills' ? 'space-x-2' : 'space-x-6')}>
          {/* "All" category */}
          <button
            onClick={() => handleCategoryClick('all')}
            data-category="all"
            className={getItemStyles(!activeCategory)}
          >
            All
          </button>

          {/* Category items */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              data-category={category.slug}
              className={getItemStyles(activeCategory === category.slug)}
            >
              {category.name}
              {category.count !== undefined && (
                <span className="ml-1 text-xs opacity-70">({category.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
