import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import type { Release } from '@/types';

import { Hero, Genres, Filters, ReleaseList } from '../../components/music/components';

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
      <Head>
        <title>Musik | echoniq</title>
        <meta
          name="description"
          content="Entdecke die neuesten Releases, Alben und Singles von echoniq. Von Electronic über Latin bis hin zu Synthwave - finde deinen Sound."
        />
      </Head>
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

export default MusicPage;