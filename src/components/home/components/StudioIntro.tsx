import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

// Interface for Container props
interface ContainerProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown; // Better typing than 'any'
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
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown; // Better typing than 'any'
}

// Simple Button component implementation
const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
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

  return (
    <button
      type={type}
      disabled={disabled}
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

export const StudioIntro: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Studio Images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 rounded-lg overflow-hidden aspect-[4/3]"
            >
              <Image
                src="/images/studio/main-studio.jpg"
                alt="echoniq Tonstudio"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-20 -left-10 w-2/3 h-48 rounded-lg overflow-hidden z-20 shadow-xl"
            >
              <Image
                src="/images/studio/studio-detail.jpg"
                alt="Studio Equipment"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </div>

          {/* Studio Content */}
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls}>
            <motion.span variants={itemVariants} className="text-primary font-medium mb-2 block">
              Unser Tonstudio
            </motion.span>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Wo Kreativität auf Technik trifft
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-300 mb-6">
              Im Herzen unseres Labels befindet sich ein professionell ausgestattetes Tonstudio, das
              für höchste Aufnahmequalität und kreativen Komfort konzipiert wurde. Hier verbinden
              wir Spitzentechnologie mit inspirierender Atmosphäre.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-md text-primary mt-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">State-of-the-Art Equipment</h4>
                  <p className="text-sm text-gray-400">
                    Modernste Aufnahme- und Produktionstechnik
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-md text-primary mt-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Professionelle Akustik</h4>
                  <p className="text-sm text-gray-400">
                    Optimierte Raumakustik für präzise Aufnahmen
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-md text-primary mt-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Erfahrene Produzenten</h4>
                  <p className="text-sm text-gray-400">Unterstützung durch unser erfahrenes Team</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-md text-primary mt-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Flexible Buchungszeiten</h4>
                  <p className="text-sm text-gray-400">Anpassung an deinen Zeitplan</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/studio">
                <Button variant="primary" size="lg">
                  Mehr über unser Studio
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default StudioIntro;
