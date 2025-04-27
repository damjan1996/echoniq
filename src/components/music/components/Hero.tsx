import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
// Replace the import with a local implementation
// import { Container } from '@/components/ui';

// Interface for Container props
interface ContainerProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown; // Changed from any to unknown
}

// Simple Container component implementation
const Container: React.FC<ContainerProps> = ({ children, className = '', ...props }) => (
  <div className={`container mx-auto px-4 ${className}`} {...props}>
    {children}
  </div>
);

type HeroProps = {
  onScrollToReleases: () => void;
};

export const Hero: React.FC<HeroProps> = ({ onScrollToReleases }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/music/music-hero.jpg"
          alt="echoniq Music Collection"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      </div>

      {/* Waveform animated overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-30 z-0">
        <svg width="100%" height="100%" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,0 C100,40 200,60 300,40 C400,20 500,40 600,60 C700,80 800,60 900,40 C1000,20 1100,40 1200,60 L1200,120 L0,120 Z"
            fill="url(#gradient)"
            animate={{
              d: [
                'M0,0 C100,40 200,60 300,40 C400,20 500,40 600,60 C700,80 800,60 900,40 C1000,20 1100,40 1200,60 L1200,120 L0,120 Z',
                'M0,0 C100,20 200,40 300,60 C400,80 500,60 600,40 C700,20 800,40 900,60 C1000,80 1100,60 1200,40 L1200,120 L0,120 Z',
                'M0,0 C100,40 200,60 300,40 C400,20 500,40 600,60 C700,80 800,60 900,40 C1000,20 1100,40 1200,60 L1200,120 L0,120 Z',
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'linear',
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-6">
              Musik
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Entdecke unsere <span className="text-primary">Releases</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
          >
            Von elektronischen Beats über latin-inspirierten Pop bis hin zu retro-futuristischem
            Synthwave – tauche ein in die vielfältige Klangwelt von echoniq.
          </motion.p>

          <motion.button
            variants={itemVariants}
            onClick={onScrollToReleases}
            className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors group"
          >
            <span className="font-medium">Alle Releases erkunden</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:translate-y-1"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </Container>

      {/* Vinyl record decoration */}
      <div className="hidden lg:block absolute -top-20 -right-20 w-80 h-80 z-0">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="relative w-full h-full opacity-60"
        >
          <Image
            src="/images/music/vinyl-record.png"
            alt="Vinyl Record"
            fill
            style={{ objectFit: 'contain' }}
          />
        </motion.div>
      </div>

      {/* Audio waves decoration */}
      <div className="absolute -left-10 top-1/3 w-40 h-40 opacity-30 z-0">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <motion.circle
            cx="80"
            cy="80"
            r="60"
            stroke="url(#pulseGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ r: 40 }}
            animate={{ r: [40, 60, 40] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="40"
            stroke="url(#pulseGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ r: 20 }}
            animate={{ r: [20, 40, 20] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="20"
            stroke="url(#pulseGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ r: 10 }}
            animate={{ r: [10, 20, 10] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <defs>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
