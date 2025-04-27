import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { getPageNumbers, cn } from '@/lib/utils';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  className?: string;
  showTotal?: boolean;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  className,
  showTotal = false,
  maxVisiblePages = 5,
}) => {
  const router = useRouter();

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  // If only one page, don't show pagination
  if (totalPages <= 1) return null;

  // Generate array of page numbers to display
  const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisiblePages);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    if (onPageChange) {
      onPageChange(page);
    } else {
      // Update URL query params
      const query = { ...router.query };
      query.page = page.toString();

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { scroll: true }
      );
    }
  };

  return (
    <nav className={cn('flex justify-center', className)} aria-label="Pagination">
      <div className="flex flex-col items-center space-y-3">
        {/* Page information */}
        {showTotal && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-medium">
              {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
            </span>{' '}
            to <span className="font-medium">{Math.min(currentPage * pageSize, totalItems)}</span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </div>
        )}

        {/* Page buttons */}
        <div className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              'relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium',
              currentPage === 1
                ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <span className="sr-only">Previous</span>
            <span className="icon-chevron-left h-5 w-5" aria-hidden="true" />
          </button>

          {/* Page numbers */}
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === null ? (
              // Ellipsis
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300"
              >
                ...
              </span>
            ) : (
              // Page number button
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                className={cn(
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium',
                  pageNumber === currentPage
                    ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {pageNumber}
              </button>
            )
          )}

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              'relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-medium',
              currentPage === totalPages
                ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <span className="sr-only">Next</span>
            <span className="icon-chevron-right h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Simple pagination with just previous/next links
export const SimplePagination: React.FC<{
  prevHref?: string | null;
  nextHref?: string | null;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}> = ({ prevHref, nextHref, prevLabel = 'Previous', nextLabel = 'Next', className }) => {
  if (!prevHref && !nextHref) return null;

  return (
    <nav className={cn('flex justify-between', className)}>
      {prevHref ? (
        <Link
          href={prevHref}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <span className="icon-arrow-left mr-1" aria-hidden="true" />
          {prevLabel}
        </Link>
      ) : (
        <div></div> // Empty div to maintain flex layout
      )}

      {nextHref && (
        <Link
          href={nextHref}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          {nextLabel}
          <span className="icon-arrow-right ml-1" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
