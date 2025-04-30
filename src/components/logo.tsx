'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';

interface LogoProps {
  variant?: 'default' | 'header' | 'footer' | 'minimal';
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  className = '',
  animated = true,
  size = 'md',
  onClick,
}) => {
  // Size classes based on the size prop
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-12',
  };

  // Determine text color based on variant
  const textColorClass = variant === 'minimal' ? 'text-white' : 'text-white';

  // Animation variants for the logo
  const logoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: animated
      ? {
          scale: 1.03,
          transition: { duration: 0.3 },
        }
      : {},
  };

  // Animation variants for the sound waves
  const waveVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scaleY: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
    hover: (i: number) => ({
      scaleY: [1, 1.5, 1],
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    }),
  };

  // Render the logo
  return (
    <motion.div
      className={`inline-flex items-center ${className}`}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
    >
      <Link href="/" className="flex items-center">
        {/* Logo Icon */}
        <div className="relative mr-2">
          <svg
            className={`${sizeClasses[size]} text-white`}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circle background */}
            <circle cx="20" cy="20" r="20" fill="currentColor" fillOpacity="0.1" />

            {/* Sound waves */}
            <motion.rect
              custom={0}
              variants={waveVariants}
              x="10"
              y="15"
              width="2"
              height="10"
              rx="1"
              fill="currentColor"
              transform-origin="center center"
            />
            <motion.rect
              custom={1}
              variants={waveVariants}
              x="15"
              y="12"
              width="2"
              height="16"
              rx="1"
              fill="currentColor"
              transform-origin="center center"
            />
            <motion.rect
              custom={2}
              variants={waveVariants}
              x="20"
              y="10"
              width="2"
              height="20"
              rx="1"
              fill="currentColor"
              transform-origin="center center"
            />
            <motion.rect
              custom={3}
              variants={waveVariants}
              x="25"
              y="12"
              width="2"
              height="16"
              rx="1"
              fill="currentColor"
              transform-origin="center center"
            />
            <motion.rect
              custom={4}
              variants={waveVariants}
              x="30"
              y="15"
              width="2"
              height="10"
              rx="1"
              fill="currentColor"
              transform-origin="center center"
            />
          </svg>
        </div>

        {/* Logo Text */}
        {variant !== 'minimal' && (
          <div className={`font-bold tracking-tight ${textColorClass}`}>
            <span className="text-2xl">echo</span>
            <span className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              niq
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default Logo;
