import { motion } from 'framer-motion';
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  withAccent?: boolean;
  accentText?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  size = 'md',
  withAccent = true,
  accentText,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}) => {
  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  // Title size classes
  const titleSizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
  };

  // Subtitle size classes
  const subtitleSizeClasses = {
    sm: 'text-sm md:text-base',
    md: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`max-w-3xl mb-12 ${alignClasses[align]} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {withAccent && (
        <motion.div variants={itemVariants} className="mb-3">
          <span className="inline-block px-4 py-1 rounded-full bg-accent-500/10 text-accent-500 text-sm font-medium">
            {accentText || 'echoniq'}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={itemVariants}
        className={`font-bold text-text-primary ${titleSizeClasses[size]} ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`mt-4 text-text-secondary max-w-3xl ${subtitleSizeClasses[size]} ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
