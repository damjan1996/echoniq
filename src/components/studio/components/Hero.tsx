import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
// Replace the import with local implementations
// import { Container, Button } from '@/components/ui';

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

// Interface for Button props
interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
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
  href,
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
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const classes = `
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
    `;

  // If href is provided, render an anchor tag
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  // Otherwise render a button
  return (
    <button type={type} disabled={disabled} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export const Hero: React.FC = () => {
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
    <section className="relative min-h-[90vh] py-20 flex items-center bg-black text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/studio/studio-hero-bg.jpg"
          alt="echoniq Recording Studio"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls}>
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-6">
                echoniq Studio
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Wo <span className="text-primary">Kreativität</span> auf{' '}
              <span className="text-primary">Technik</span> trifft
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
            >
              Unser professionelles Tonstudio im Herzen der Stadt bietet dir alles, was du für deine
              Musikproduktion brauchst – von State-of-the-Art Equipment bis hin zu erfahrenen
              Produzenten.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" href="#booking">
                Studio buchen
              </Button>
              <Button size="lg" variant="outline" href="#services">
                Unsere Services
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 left-0 w-4/5 h-4/5 z-20">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/images/studio/mixing-console.jpg"
                    alt="Studio Mixing Console"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 z-10">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/images/studio/recording-booth.jpg"
                    alt="Recording Booth"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl -z-10"></div>
              <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-blue-600/10 blur-3xl -z-10"></div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 py-8 border-t border-b border-gray-800"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+</div>
            <p className="text-gray-400">Jahre Erfahrung</p>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
            <p className="text-gray-400">Projekte abgeschlossen</p>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3</div>
            <p className="text-gray-400">Aufnahmeräume</p>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
            <p className="text-gray-400">Kundenzufriedenheit</p>
          </div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Mehr entdecken</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
