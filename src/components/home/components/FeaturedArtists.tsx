import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

import type { Artist } from '@/types';

// Interface for Container props
interface ContainerProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown; // Better typing than 'any'
}

// Simple Container component implementation with TypeScript
const Container: React.FC<ContainerProps> = ({ children, className = '', ...props }) => (
  <div className={`container mx-auto px-4 ${className}`} {...props}>
    {children}
  </div>
);

// Sample artists data - in a real app, this would come from an API or CMS
const featuredArtists: Artist[] = [
  {
    id: '1',
    slug: 'alex-grey',
    name: 'Alex Grey',
    image: '/images/artists/alex-grey.jpg',
    genres: ['Electronic', 'Ambient'],
    bio: 'Musikproduzent und Gründer von echoniq, bekannt für atmosphärische Klanglandschaften und innovative Beats.',
    featured: true,
  },
  {
    id: '2',
    slug: 'edu',
    name: 'EDU',
    image: '/images/artists/edu.jpg',
    genres: ['Latin', 'Pop'],
    bio: 'Spanischsprachiger Künstler mit einer einzigartigen Mischung aus lateinamerikanischen Rhythmen und modernem Pop.',
    featured: true,
  },
  {
    id: '3',
    slug: 'nova-wave',
    name: 'Nova Wave',
    image: '/images/artists/nova-wave.jpg',
    genres: ['Synthwave', 'Electro'],
    bio: 'Duo, das retro-futuristische Klänge mit modernen Produktionstechniken verbindet.',
    featured: true,
  },
];

type ArtistCardProps = {
  artist: Artist;
  index: number;
};

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, index }) => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={controls} className="group">
      <Link href={`/artists/${artist.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

          <div className="absolute bottom-0 left-0 w-full p-6 z-10">
            <h3 className="text-2xl font-bold text-white mb-1">{artist.name}</h3>
            <div className="flex gap-2 mb-3">
              {artist.genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="text-xs text-gray-300 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">{artist.bio}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const FeaturedArtists: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <Container>
        <div className="text-center mb-12">
          <span className="text-primary font-medium mb-2 block">Unsere Künstler</span>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Artists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredArtists.map((artist, index) => (
            <ArtistCard key={artist.id} artist={artist} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/artists"
            className="group inline-flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white transition-colors"
          >
            Alle Künstler entdecken
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedArtists;
