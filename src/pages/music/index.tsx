import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useRef, useEffect, ReactNode } from 'react';

// Replace imports with local implementations
// import { Header, Footer } from '@/components/layout';
// import { Container } from '@/components/ui';
// import { SEO } from '@/components/common';
import type { Release } from '@/types';

import { Hero, Genres, Filters, ReleaseList } from './components';

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

// Simple Header component implementation
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-white font-bold text-xl">echoniq</div>
        <nav>
          <ul className="flex gap-6 text-white">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/artists" className="hover:text-primary transition-colors">
                Künstler
              </Link>
            </li>
            <li>
              <Link href="/music" className="hover:text-primary transition-colors">
                Musik
              </Link>
            </li>
            <li>
              <Link href="/studio" className="hover:text-primary transition-colors">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-primary transition-colors">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Simple Footer component implementation
const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">echoniq</h3>
            <p className="text-gray-400">
              Ein modernes Musiklabel mit Fokus auf elektronische Musik, Künstlerentwicklung und
              professioneller Studioproduktion.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/ueber-uns" className="hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-white transition-colors">
                  Künstler
                </Link>
              </li>
              <li>
                <Link href="/music" className="hover:text-white transition-colors">
                  Musik
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white transition-colors">
                  Studio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@echoniq.de</li>
              <li>+49 (0) 123 456789</li>
              <li>Musterstraße 123, 12345 Berlin</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Social Media</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} echoniq. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

// Interface for SEO props
interface SEOProps {
  title: string;
  description: string;
}

// Simple SEO component implementation
const SEO: React.FC<SEOProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

// Sample releases data - in a real app, this would come from an API or CMS
const releases: Release[] = [
  {
    id: '1',
    slug: 'nova-horizon',
    title: 'Nova Horizon',
    artistName: 'Alex Grey',
    artistSlug: 'alex-grey',
    cover: '/images/releases/nova-horizon.jpg',
    releaseDate: '2024-03-15',
    genres: ['Electronic', 'Ambient'],
    description: 'Eine Reise durch atmosphärische Klanglandschaften und innovative Beats.',
    tracks: [
      {
        id: '1-1',
        title: 'Dawn',
        duration: 215, // in seconds
        previewUrl: '/audio/alex-grey-dawn-preview.mp3',
      },
      {
        id: '1-2',
        title: 'Horizon',
        duration: 184,
        previewUrl: '/audio/alex-grey-horizon-preview.mp3',
      },
    ],
  },
  {
    id: '2',
    slug: 'ritmo-de-vida',
    title: 'Ritmo de Vida',
    artistName: 'EDU',
    artistSlug: 'edu',
    cover: '/images/releases/ritmo-de-vida.jpg',
    releaseDate: '2024-02-10',
    genres: ['Latin', 'Pop'],
    description: 'Eine lebendige Mischung aus lateinamerikanischen Rhythmen und modernem Pop.',
    tracks: [
      {
        id: '2-1',
        title: 'Corazón',
        duration: 198,
        previewUrl: '/audio/edu-corazon-preview.mp3',
      },
      {
        id: '2-2',
        title: 'Vida Nueva',
        duration: 212,
        previewUrl: '/audio/edu-vida-nueva-preview.mp3',
      },
    ],
  },
  {
    id: '3',
    slug: 'retro-future',
    title: 'Retro Future',
    artistName: 'Nova Wave',
    artistSlug: 'nova-wave',
    cover: '/images/releases/retro-future.jpg',
    releaseDate: '2024-01-20',
    genres: ['Synthwave', 'Electro'],
    description: 'Retro-futuristische Klänge mit modernen Produktionstechniken.',
    tracks: [
      {
        id: '3-1',
        title: 'Neon Dreams',
        duration: 226,
        previewUrl: '/audio/nova-wave-neon-dreams-preview.mp3',
      },
      {
        id: '3-2',
        title: 'Digital Love',
        duration: 195,
        previewUrl: '/audio/nova-wave-digital-love-preview.mp3',
      },
    ],
  },
  {
    id: '4',
    slug: 'deep-space',
    title: 'Deep Space',
    artistName: 'Alex Grey',
    artistSlug: 'alex-grey',
    cover: '/images/releases/deep-space.jpg',
    releaseDate: '2023-11-05',
    genres: ['Ambient', 'Electronic'],
    description: 'Eine tiefe Reise durch kosmische Klanglandschaften und meditative Rhythmen.',
    tracks: [
      {
        id: '4-1',
        title: 'Cosmos',
        duration: 256,
        previewUrl: '/audio/alex-grey-cosmos-preview.mp3',
      },
      {
        id: '4-2',
        title: 'Nebula',
        duration: 204,
        previewUrl: '/audio/alex-grey-nebula-preview.mp3',
      },
    ],
  },
  {
    id: '5',
    slug: 'viva-la-vida',
    title: 'Viva La Vida',
    artistName: 'EDU',
    artistSlug: 'edu',
    cover: '/images/releases/viva-la-vida.jpg',
    releaseDate: '2023-09-22',
    genres: ['Latin', 'Pop'],
    description:
      'Eine Feier des Lebens mit mitreißenden lateinamerikanischen Rhythmen und fröhlichen Melodien.',
    tracks: [
      {
        id: '5-1',
        title: 'Viva',
        duration: 187,
        previewUrl: '/audio/edu-viva-preview.mp3',
      },
      {
        id: '5-2',
        title: 'Fiesta',
        duration: 193,
        previewUrl: '/audio/edu-fiesta-preview.mp3',
      },
    ],
  },
  {
    id: '6',
    slug: 'cyberpunk-dreams',
    title: 'Cyberpunk Dreams',
    artistName: 'Nova Wave',
    artistSlug: 'nova-wave',
    cover: '/images/releases/cyberpunk-dreams.jpg',
    releaseDate: '2023-07-14',
    genres: ['Synthwave', 'Electro'],
    description:
      'Eine futuristische Klangwelt, inspiriert von Cyberpunk-Ästhetik und dystopischen Visionen.',
    tracks: [
      {
        id: '6-1',
        title: 'Neon City',
        duration: 214,
        previewUrl: '/audio/nova-wave-neon-city-preview.mp3',
      },
      {
        id: '6-2',
        title: 'Hologram',
        duration: 201,
        previewUrl: '/audio/nova-wave-hologram-preview.mp3',
      },
    ],
  },
];

const MusicPage: NextPage = () => {
  const releasesRef = useRef<HTMLDivElement>(null);

  const [filteredReleases, setFilteredReleases] = useState<Release[]>(releases);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Extract unique years from releases
  const years = [
    ...new Set(releases.map((release) => new Date(release.releaseDate).getFullYear().toString())),
  ];

  // Extract unique genres from releases
  const genres = [...new Set(releases.flatMap((release) => release.genres))];

  const handleScrollToReleases = () => {
    releasesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);

    if (releasesRef.current) {
      setTimeout(() => {
        releasesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleFilterChange = React.useCallback(
    (filters: { genres: string[]; years: string[]; sortBy: string }) => {
      let filtered = [...releases];

      // Filter by selected genre from the Genres component
      if (selectedGenre) {
        filtered = filtered.filter((release) => release.genres.includes(selectedGenre));
      }

      // Apply filters from the Filters component
      if (filters.genres.length > 0) {
        filtered = filtered.filter((release) =>
          release.genres.some((genre) => filters.genres.includes(genre))
        );
      }

      if (filters.years.length > 0) {
        filtered = filtered.filter((release) => {
          const releaseYear = new Date(release.releaseDate).getFullYear().toString();
          return filters.years.includes(releaseYear);
        });
      }

      // Apply sorting
      if (filters.sortBy === 'newest') {
        filtered.sort(
          (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      } else if (filters.sortBy === 'oldest') {
        filtered.sort(
          (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      } else if (filters.sortBy === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filters.sortBy === 'artist') {
        filtered.sort((a, b) => a.artistName.localeCompare(b.artistName));
      }

      setFilteredReleases(filtered);
    },
    [selectedGenre]
  );

  // Reset selected genre when navigating to the page
  useEffect(() => {
    setSelectedGenre(null);
    setFilteredReleases(releases);
  }, []);

  // Update filters when selectedGenre changes
  useEffect(() => {
    handleFilterChange({
      genres: selectedGenre ? [selectedGenre] : [],
      years: [],
      sortBy: 'newest',
    });
  }, [selectedGenre, handleFilterChange]);

  return (
    <>
      <SEO
        title="Musik | echoniq"
        description="Entdecke die neuesten Releases, Alben und Singles von echoniq. Von Electronic über Latin bis hin zu Synthwave - finde deinen Sound."
      />
      <Header />
      <main className="bg-black text-white">
        <Hero onScrollToReleases={handleScrollToReleases} />
        <Genres onGenreSelect={handleGenreSelect} />

        <section className="py-16" ref={releasesRef}>
          <Container>
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4">
                {selectedGenre ? `${selectedGenre} Releases` : 'Alle Releases'}
              </h2>
              {selectedGenre && (
                <button
                  onClick={() => setSelectedGenre(null)}
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 12H5M5 12L12 19M5 12L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Alle Genres anzeigen</span>
                </button>
              )}
            </div>

            <Filters genres={genres} years={years} onFilterChange={handleFilterChange} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReleaseList releases={filteredReleases} />
            </motion.div>

            {filteredReleases.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-gray-400">
                  Zeige {filteredReleases.length} von {releases.length} Releases
                </p>
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MusicPage;
