import { motion, useAnimation } from 'framer-motion';
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

type GenreItemProps = {
  name: string;
  count: number;
  color: string;
  icon: React.ReactNode;
  index: number;
  onClick: (genre: string) => void;
};

const GenreItem: React.FC<GenreItemProps> = ({ name, count, color, icon, index, onClick }) => {
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

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.button
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex flex-col items-center justify-center p-6 rounded-lg overflow-hidden group ${color} cursor-pointer`}
      onClick={() => onClick(name)}
    >
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-lg font-bold text-center mb-1">{name}</h3>
        <p className="text-sm text-gray-300">{count} Releases</p>
      </div>
    </motion.button>
  );
};

type GenresProps = {
  onGenreSelect: (genre: string) => void;
};

export const Genres: React.FC<GenresProps> = ({ onGenreSelect }) => {
  // Sample genre data - in a real app, this would come from an API or CMS
  const genres = [
    {
      name: 'Electronic',
      count: 12,
      color: 'bg-gradient-to-br from-blue-600/20 to-purple-600/20',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 17H2M22 12H2M22 7H2M6 17V12M12 17V7M18 17V12M6 7H6.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Ambient',
      count: 8,
      color: 'bg-gradient-to-br from-teal-600/20 to-blue-600/20',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10L4 16M12 8L8 12M14 6L6 14M16 12L12 16M18 10L16 12M21 3L16 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Pop',
      count: 7,
      color: 'bg-gradient-to-br from-pink-600/20 to-red-600/20',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8V12M12 16V12M12 12H16M12 12H8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Latin',
      count: 5,
      color: 'bg-gradient-to-br from-orange-600/20 to-yellow-600/20',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6L21 6M3 10H21M3 14H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Synthwave',
      count: 4,
      color: 'bg-gradient-to-br from-purple-600/20 to-pink-600/20',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 17H4C3.44772 17 3 16.5523 3 16V8C3 7.44772 3.44772 7 4 7H5M12 17H13C13.5523 17 14 16.5523 14 16V8C14 7.44772 13.5523 7 13 7H12M19 17H20C20.5523 17 21 16.5523 21 16V8C21 7.44772 20.5523 7 20 7H19M5 7V17M12 7V17M19 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Electro',
      count: 3,
      color: 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 3L13 10M13 10L16 7M13 10L10 7M7 13L7 17M17 13L17 17M11 21L7 17M7 17L3 13M7 17L11 13M21 13L17 17M17 17L13 21M17 17L13 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <Container>
        <div className="text-center mb-10">
          <span className="text-primary font-medium mb-2 block">Entdecken</span>
          <h2 className="text-3xl md:text-4xl font-bold">Erkunde unsere Genres</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Die echoniq Künstler bewegen sich in verschiedenen Musikgenres. Entdecke die Vielfalt
            unserer Releases und finde deinen persönlichen Sound.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {genres.map((genre, index) => (
            <GenreItem
              key={genre.name}
              name={genre.name}
              count={genre.count}
              color={genre.color}
              icon={genre.icon}
              index={index}
              onClick={onGenreSelect}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Genres;
