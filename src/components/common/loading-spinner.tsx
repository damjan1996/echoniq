import { motion } from 'framer-motion';
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'accent',
  label = 'Lädt...',
  fullScreen = false,
  className = '',
}) => {
  // Size mapping
  const sizeMap = {
    sm: {
      container: 'w-5 h-5',
      circle: 20,
      thickness: 2,
    },
    md: {
      container: 'w-8 h-8',
      circle: 32,
      thickness: 3,
    },
    lg: {
      container: 'w-12 h-12',
      circle: 48,
      thickness: 4,
    },
  };

  // Color mapping
  const colorMap = {
    primary: 'text-neutral-300',
    accent: 'text-accent-500',
    white: 'text-white',
  };

  // SVG spinner animations
  const spinTransition = {
    repeat: Infinity,
    duration: 1.5,
    ease: 'easeInOut',
  };

  const containerStyles = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-background-primary/80 z-50'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={`${containerStyles} ${className}`}>
      <motion.div
        className={`relative ${sizeMap[size].container}`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      >
        <svg
          className={`w-full h-full ${colorMap[color]}`}
          viewBox={`0 0 ${sizeMap[size].circle} ${sizeMap[size].circle}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx={sizeMap[size].circle / 2}
            cy={sizeMap[size].circle / 2}
            r={(sizeMap[size].circle - sizeMap[size].thickness) / 2}
            stroke="currentColor"
            strokeWidth={sizeMap[size].thickness}
          />
          <path
            className="opacity-75"
            fill="none"
            strokeLinecap="round"
            stroke="currentColor"
            strokeWidth={sizeMap[size].thickness}
            d={`
              M ${sizeMap[size].circle / 2} ${sizeMap[size].thickness / 2}
              a ${(sizeMap[size].circle - sizeMap[size].thickness) / 2} ${(sizeMap[size].circle - sizeMap[size].thickness) / 2} 0 0 1 0 ${sizeMap[size].circle - sizeMap[size].thickness}
            `}
          />
        </svg>
      </motion.div>

      {label && (
        <span className={`mt-3 text-sm ${colorMap[color]}`} aria-live="polite">
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
