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
        delayChildren: 0.2,
        staggerChildren: 0.1,
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
          src="/images/kontakt/kontakt-hero.jpg"
          alt="echoniq Studio"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-2xl"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-6">
              Kontakt
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Lass uns <span className="text-primary">zusammen</span> arbeiten
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
          >
            Ob du ein Künstler, Produzent oder Musikliebhaber bist – wir freuen uns über deine
            Nachricht und dein Feedback.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-800 rounded-full">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C16 18 20 14.4183 20 9.5C20 4.80558 16.4183 1 12 1C7.58172 1 4 4.80558 4 9.5C4 14.4183 8 18 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Adresse</h3>
                <p className="text-gray-400">Musterstraße 123, 12345 Musterstadt</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-800 rounded-full">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 9L13.9558 11.5656C12.8649 12.4556 11.1351 12.4556 10.0442 11.5656L7 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-400">info@echoniq.de</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-800 rounded-full">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2C14 2 16.2 2.2 19 5C21.8 7.8 22 10 22 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.207 5.79302C14.207 5.79302 15.197 6.00002 16.697 7.50002C18.197 9.00002 18.404 9.99002 18.404 9.99002"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.03046 12.8365C0.329639 5.13565 1.82768 3.7566 2.33525 3.26817C2.85183 2.77065 6.96581 0.188615 7.77078 3.30692C12.5375 -1.41898 5.30392 7.11863 8.03046 12.8365Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.1573 15.9633C14.9833 18.6236 16.8418 14.5691 20.3798 17.5925C22.8693 19.7168 19.564 23.4326 19.0656 23.9176C18.5673 24.4026 17.0169 25.6399 10.3341 18.9571"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.1573 15.9634L8.03028 12.8364"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Telefon</h3>
                <p className="text-gray-400">+49 123 4567890</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative elements */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl z-0"></div>
    </section>
  );
};

export default Hero;
