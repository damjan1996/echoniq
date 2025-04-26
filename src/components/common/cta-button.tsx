import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: 'arrow' | 'external' | 'none';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isExternal?: boolean;
  ariaLabel?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  href,
  onClick,
  size = 'md',
  variant = 'primary',
  icon = 'arrow',
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  isExternal = false,
  ariaLabel,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-accent-500 hover:bg-accent-600 text-text-inverted shadow-sm',
    secondary: 'bg-neutral-800 hover:bg-neutral-700 text-text-primary',
    outline: 'bg-transparent border border-accent-500 text-accent-500 hover:bg-accent-500/10',
    ghost: 'bg-transparent hover:bg-neutral-800 text-text-primary',
  };

  // Common classes for all buttons
  const buttonCommonClasses = `
    inline-flex items-center justify-center
    rounded-full font-medium 
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `;

  // Animation variants for the icons
  const iconVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror' as const,
        duration: 0.7,
      },
    },
  };

  // Render the appropriate icon
  const renderIcon = () => {
    if (icon === 'none') return null;

    return (
      <motion.span
        className="ml-2 flex-shrink-0"
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
      >
        {icon === 'arrow' ? (
          <ArrowRight className="h-5 w-5" />
        ) : (
          <ExternalLink className="h-5 w-5" />
        )}
      </motion.span>
    );
  };

  // If we have an href, render a link, otherwise render a button
  if (href) {
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
      <Link href={href} className={buttonCommonClasses} aria-label={ariaLabel} {...linkProps}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonCommonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
};

export default CTAButton;
