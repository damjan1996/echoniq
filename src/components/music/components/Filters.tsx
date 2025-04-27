import { motion } from 'framer-motion';
import React, { useState, ReactNode } from 'react';
// Replace the import with a local implementation
// import { Button } from '@/components/ui';

// Interface for Button props
interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown; // Changed from any to unknown
}

// Simple Button component implementation
const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400',
    outline:
      'bg-transparent border border-gray-300 hover:bg-gray-100 text-white focus:ring-gray-400',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white focus:ring-gray-400',
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
                ${baseClasses}
                ${variantClasses[variant] || variantClasses.primary}
                ${sizeClasses[size] || sizeClasses.md}
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                ${className}
            `}
      {...props}
    >
      {children}
    </button>
  );
};

type FiltersProps = {
  genres: string[];
  years: string[];
  onFilterChange: (filters: { genres: string[]; years: string[]; sortBy: string }) => void;
};

export const Filters: React.FC<FiltersProps> = ({ genres, years, onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [isOpen, setIsOpen] = useState(false);

  const handleGenreToggle = (genre: string) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(newSelectedGenres);
    onFilterChange({
      genres: newSelectedGenres,
      years: selectedYears,
      sortBy,
    });
  };

  const handleYearToggle = (year: string) => {
    const newSelectedYears = selectedYears.includes(year)
      ? selectedYears.filter((y) => y !== year)
      : [...selectedYears, year];

    setSelectedYears(newSelectedYears);
    onFilterChange({
      genres: selectedGenres,
      years: newSelectedYears,
      sortBy,
    });
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    onFilterChange({
      genres: selectedGenres,
      years: selectedYears,
      sortBy: newSortBy,
    });
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setSortBy('newest');
    onFilterChange({
      genres: [],
      years: [],
      sortBy: 'newest',
    });
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const getActiveFiltersCount = () => {
    return selectedGenres.length + selectedYears.length + (sortBy !== 'newest' ? 1 : 0);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFilters}
            className="flex items-center gap-2 text-white hover:text-primary transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-medium">Filter & Sortieren</span>
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-black text-xs font-medium rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <span className="text-sm text-gray-400 mr-2">Sortieren:</span>
          <Button
            variant={sortBy === 'newest' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleSortChange('newest')}
          >
            Neueste
          </Button>
          <Button
            variant={sortBy === 'oldest' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleSortChange('oldest')}
          >
            Älteste
          </Button>
          <Button
            variant={sortBy === 'title' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleSortChange('title')}
          >
            Titel A-Z
          </Button>
          <Button
            variant={sortBy === 'artist' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleSortChange('artist')}
          >
            Künstler A-Z
          </Button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Genre filters */}
            <div>
              <h3 className="text-lg font-medium mb-3">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenres.includes(genre) ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleGenreToggle(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            {/* Year filters */}
            <div>
              <h3 className="text-lg font-medium mb-3">Jahr</h3>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYears.includes(year) ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleYearToggle(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort options (mobile only) */}
            <div className="md:hidden">
              <h3 className="text-lg font-medium mb-3">Sortieren</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortBy === 'newest' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange('newest')}
                >
                  Neueste
                </Button>
                <Button
                  variant={sortBy === 'oldest' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange('oldest')}
                >
                  Älteste
                </Button>
                <Button
                  variant={sortBy === 'title' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange('title')}
                >
                  Titel A-Z
                </Button>
                <Button
                  variant={sortBy === 'artist' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange('artist')}
                >
                  Künstler A-Z
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="md:col-span-3 flex justify-end mt-4">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Filter zurücksetzen
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Filters;
