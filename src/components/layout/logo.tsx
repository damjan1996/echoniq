import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer' | 'minimal';
  className?: string;
  animate?: boolean;
  isDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  className = '',
  animate = true,
  isDark = false,
}) => {
  // Determine logo dimensions based on variant
  const logoConfig = {
    header: {
      width: 140,
      height: 40,
    },
    footer: {
      width: 160,
      height: 45,
    },
    minimal: {
      width: 32,
      height: 32,
    },
  };

  // Logo source based on dark/light mode
  const logoSrc = isDark
    ? variant === 'minimal'
      ? '/images/logo/echoniq-icon-light.svg'
      : '/images/logo/echoniq-logo-light.svg'
    : variant === 'minimal'
      ? '/images/logo/echoniq-icon.svg'
      : '/images/logo/echoniq-logo.svg';

  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.95, y: -5 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  // Logo hover effect animation
  const wavePathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    hover: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: 'easeInOut' },
        opacity: { duration: 0.25 },
      },
    },
  };

  return (
    <Link href="/" className={className}>
      <motion.div
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        whileHover="hover"
        variants={logoVariants}
        className="relative"
      >
        {/* Main Logo */}
        <div className="relative">
          <Image
            src={logoSrc}
            alt="echoniq"
            width={logoConfig[variant].width}
            height={logoConfig[variant].height}
            priority
          />
        </div>

        {/* Animated sound wave for hover effect (only for header and footer variants) */}
        {variant !== 'minimal' && (
          <motion.svg
            className="absolute -bottom-3 left-0 right-0 w-full h-4 overflow-visible"
            viewBox="0 0 100 20"
            initial="initial"
            variants={{
              hover: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {/* First wave */}
            <motion.path
              d="M 0,10 Q 25,0 50,10 Q 75,20 100,10"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.5"
              variants={wavePathVariants}
            />

            {/* Second wave */}
            <motion.path
              d="M 0,10 Q 25,20 50,10 Q 75,0 100,10"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeDasharray="1 3"
              variants={wavePathVariants}
            />
          </motion.svg>
        )}
      </motion.div>
    </Link>
  );
};

export default Logo;
