import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Container } from '@/components/ui/container';

// Interface definieren für SEO-Komponente
interface IntrinsicSEOProps {
  title: string;
  description: string;
  noIndex?: boolean;
}

// SEO-Komponente mit korrekter Typisierung, ohne unbenutzte Parameter
const SEO: React.FC<IntrinsicSEOProps> = () => (
  <>
    {/* In einer echten Implementierung würde dies Meta-Tags zum Dokumentkopf hinzufügen */}
    {/* Für jetzt ist dies nur ein Platzhalter */}
    <></>
  </>
);

// Button component props interface
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: unknown;
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
    primary: 'bg-primary hover:bg-primary-600 text-white focus:ring-primary',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400',
    outline:
      'bg-transparent border border-gray-300 hover:bg-gray-100 text-white focus:ring-gray-400',
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

const NotFoundPage: NextPage = () => {
  return (
    <>
      <SEO
        title="404 - Seite nicht gefunden | echoniq"
        description="Die gesuchte Seite konnte nicht gefunden werden."
        noIndex={true}
      />
      <Header />
      <main className="bg-black text-white py-20 min-h-[70vh] flex items-center">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Animated SVG */}
            <div className="relative">
              <svg
                width="280"
                height="200"
                viewBox="0 0 280 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                {/* 4 */}
                <motion.path
                  d="M40 40V80H90V140H70V100H40V140H20V40H40Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />

                {/* 0 */}
                <motion.path
                  d="M110 60C110 48.9543 118.954 40 130 40H150C161.046 40 170 48.9543 170 60V120C170 131.046 161.046 140 150 140H130C118.954 140 110 131.046 110 120V60Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: 0.4,
                    ease: 'easeInOut',
                  }}
                />
                <motion.path
                  d="M130 60H150V120H130V60Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8,
                    ease: 'easeInOut',
                  }}
                />

                {/* 4 */}
                <motion.path
                  d="M190 40V80H240V140H220V100H190V140H170V40H190Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: 1.2,
                    ease: 'easeInOut',
                  }}
                />

                {/* Page icon */}
                <motion.rect
                  x="100"
                  y="160"
                  width="80"
                  height="30"
                  rx="2"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                />
                <motion.path
                  d="M110 165H170"
                  stroke="#ec4899"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                />
                <motion.path
                  d="M110 175H150"
                  stroke="#ec4899"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.4 }}
                />
                <motion.path
                  d="M110 185H160"
                  stroke="#ec4899"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.6 }}
                />

                {/* Missing connection lines */}
                <motion.path
                  d="M50 170 H90"
                  stroke="#ec4899"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <motion.path
                  d="M190 170 H230"
                  stroke="#ec4899"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 3.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </svg>
            </div>

            {/* Error text */}
            <div className="text-center lg:text-left max-w-md">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Seite nicht gefunden
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="text-gray-300 mb-8"
              >
                Die von dir gesuchte Seite existiert leider nicht oder wurde verschoben. Bitte
                überprüfe die URL oder kehre zur Startseite zurück.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.4 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link href="/">
                  <Button variant="primary" size="lg">
                    Zur Startseite
                  </Button>
                </Link>

                <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                  Zurück
                </Button>
              </motion.div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
