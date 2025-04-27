import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

// Components
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { SectionTitle } from '@/components/common/section-title';
// Lib and utils
import { trackFilter } from '@/lib/analytics';
import { SITE_URL } from '@/lib/constants';
import { getServerArtists, getServerMusicGenres } from '@/lib/server';
import { Artist, MusicGenre } from '@/types/database';

import {
  ArtistList,
  Categories,
  Filters,
  FilterState,
  Hero,
} from '../../components/artists/components';

interface ArtistsPageProps {
  initialArtists: Artist[];
  genres: MusicGenre[];
}

export default function ArtistsPage({ initialArtists, genres }: ArtistsPageProps) {
  const router = useRouter();
  const [artists, setArtists] = React.useState<Artist[]>(initialArtists);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Get filter values from query params
  const genreSlug = router.query.genre as string | undefined;
  const sort = router.query.sort as string | undefined;
  const order = router.query.order as 'asc' | 'desc' | undefined;
  const featuredOnly = router.query.featured === 'true';

  // Fetch artists based on filters
  React.useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Client-side API call to fetch filtered artists
        const queryParams = new URLSearchParams();

        if (genreSlug) {
          queryParams.append('genre', genreSlug);
        }

        if (sort) {
          queryParams.append('orderBy', sort);
        }

        if (order) {
          queryParams.append('ascending', order === 'asc' ? 'true' : 'false');
        }

        if (featuredOnly) {
          queryParams.append('featured', 'true');
        }

        const response = await fetch(`/api/artists?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }

        const data = await response.json();
        setArtists(data);

        // Track filter usage
        if (genreSlug || sort || featuredOnly) {
          trackFilter(
            'artists',
            [
              genreSlug ? `genre:${genreSlug}` : '',
              sort ? `sort:${sort}` : '',
              order ? `order:${order}` : '',
              featuredOnly ? 'featured:true' : '',
            ]
              .filter(Boolean)
              .join(',')
          );
        }
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Failed to load artists. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we're on the client side
    if (typeof window !== 'undefined') {
      fetchArtists();
    }
  }, [genreSlug, sort, order, featuredOnly]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    const query = { ...router.query };

    // Update query params
    if (newFilters.sort !== 'name') {
      query.sort = newFilters.sort;
    } else {
      delete query.sort;
    }

    if (newFilters.order !== 'asc') {
      query.order = newFilters.order;
    } else {
      delete query.order;
    }

    if (newFilters.featured) {
      query.featured = 'true';
    } else {
      delete query.featured;
    }

    // Update the URL
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { scroll: false }
    );
  };

  // Get the active genre
  const activeGenre = genres.find((g) => g.slug === genreSlug);

  // Page title and description based on filters
  let pageTitle = 'Our Artists | echoniq';
  let pageDescription =
    'Discover the talented electronic music artists and producers on echoniq label.';

  if (activeGenre) {
    pageTitle = `${activeGenre.name} Artists | echoniq`;
    pageDescription = `Explore our ${activeGenre.name} artists and their music on echoniq label.`;
  }

  if (featuredOnly) {
    pageTitle = 'Featured Artists | echoniq';
    pageDescription =
      'Discover our featured electronic music artists and producers on echoniq label.';
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SITE_URL}/artists`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${SITE_URL}/artists`} />
      </Head>

      <main>
        {/* Hero Section */}
        <Hero
          title="Our Artists"
          subtitle="Discover the talented musicians and producers behind echoniq"
          backgroundImage="/images/artists/hero-background.jpg"
          height="medium"
        />

        <div className="container mx-auto px-4 py-12">
          {/* Filters */}
          <div className="mb-8">
            {/* Categories */}
            <Categories categories={genres} selectedCategory={genreSlug} className="mb-6" />

            {/* Sorting and Featured Filters */}
            <Filters
              onFilterChange={handleFilterChange}
              allowFeaturedFilter={true}
              sortOptions={[
                { value: 'name', label: 'Name' },
                { value: 'created_at', label: 'Newest' },
                { value: 'updated_at', label: 'Recently Updated' },
              ]}
            />
          </div>

          {/* Section Title */}
          <div className="mb-8">
            <SectionTitle
              title={
                activeGenre
                  ? `${activeGenre.name} Artists`
                  : featuredOnly
                    ? 'Featured Artists'
                    : 'All Artists'
              }
            />
            {isLoading ? (
              <div className="mt-2 text-gray-500 dark:text-gray-400 text-center">
                <LoadingSpinner size="sm" className="inline mr-2" />
                Loading artists...
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Showing {artists.length} {artists.length === 1 ? 'artist' : 'artists'}
              </p>
            )}
          </div>

          {/* Artist Grid */}
          <ArtistList
            artists={artists}
            isLoading={isLoading}
            error={error}
            emptyMessage={
              activeGenre
                ? `No artists found in the ${activeGenre.name} category`
                : featuredOnly
                  ? 'No featured artists found'
                  : 'No artists found'
            }
          />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<ArtistsPageProps> = async () => {
  try {
    // Fetch initial artists
    const artists = await getServerArtists({
      orderBy: 'name',
      ascending: true,
    });

    // Fetch genres
    const genres = await getServerMusicGenres();

    return {
      props: {
        initialArtists: artists,
        genres,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps for Artists page:', error);

    // Return empty data in case of error
    return {
      props: {
        initialArtists: [],
        genres: [],
      },
      revalidate: 60, // Try again more quickly if there was an error
    };
  }
};
