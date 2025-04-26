import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Components
import { ArtistBio } from '@/components/artists/ArtistBio';
import { ArtistReleases, ReleaseWithTracks } from '@/components/artists/ArtistReleases';
import CTA from '@/components/common/cta-button';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { SectionTitle } from '@/components/common/section-title';
// Lib and utils
import { trackArtistView } from '@/lib/analytics';
import { generateArtistOpenGraphMetadata } from '@/lib/social/meta';
import { getArtistShareMetadata, getShareButtons } from '@/lib/social/share';
import { getServerArtistBySlug, getServerArtists } from '@/lib/supabase/server';
import type { ArtistWithReleases } from '@/lib/supabase/types';
import { cn } from '@/lib/utils';

interface ArtistDetailPageProps {
  artist: ArtistWithReleases;
}

// Inline-Definition der StreamingLinks-Komponente für Künstlerdetailseite
interface SimpleStreamingLinksProps {
  spotify: string | null;
  appleMusic: string | null;
  soundcloud: string | null;
  bandcamp: string | null;
  beatport: string | null;
  youtube: string | null;
  className?: string;
}

const SimpleStreamingLinks: React.FC<SimpleStreamingLinksProps> = ({
  spotify,
  appleMusic,
  soundcloud,
  bandcamp,
  beatport,
  youtube,
  className,
}) => {
  // Define links in an array for easier mapping
  const links = [
    {
      name: 'Spotify',
      url: spotify,
      color: '#1DB954',
      icon: 'spotify',
    },
    {
      name: 'Apple Music',
      url: appleMusic,
      color: '#FB233B',
      icon: 'apple-music',
    },
    {
      name: 'SoundCloud',
      url: soundcloud,
      color: '#FF5500',
      icon: 'soundcloud',
    },
    {
      name: 'Bandcamp',
      url: bandcamp,
      color: '#629aa9',
      icon: 'bandcamp',
    },
    {
      name: 'Beatport',
      url: beatport,
      color: '#01FF95',
      icon: 'beatport',
    },
    {
      name: 'YouTube',
      url: youtube,
      color: '#FF0000',
      icon: 'youtube',
    },
  ].filter((link) => link.url); // Filter out null/undefined links

  // If no links are available
  if (links.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={cn('flex flex-wrap gap-3', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-full hover:shadow-md transition-all duration-300"
          style={{
            backgroundColor: `${link.color}20`, // 20% opacity of the color
            color: link.color,
          }}
          variants={itemVariants}
          whileHover={{
            backgroundColor: `${link.color}30`, // 30% opacity on hover
            y: -3,
            transition: { duration: 0.2 },
          }}
        >
          <span className={`icon-${link.icon} text-lg`} aria-hidden="true" />
          <span className="ml-2 text-sm font-medium">{link.name}</span>
          <ExternalLink className="ml-1 h-3 w-3" />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default function ArtistDetailPage({ artist }: ArtistDetailPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (artist) {
      trackArtistView({
        name: artist.name,
        genre: artist.genre || undefined,
      });
    }
  }, [artist]);

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const socialLinks = [
    { name: 'Instagram', url: artist.instagram, icon: 'instagram' },
    { name: 'Facebook', url: artist.facebook, icon: 'facebook' },
    { name: 'Twitter', url: artist.twitter, icon: 'twitter' },
    { name: 'SoundCloud', url: artist.soundcloud, icon: 'soundcloud' },
    { name: 'Spotify', url: artist.spotify, icon: 'spotify' },
    { name: 'Bandcamp', url: artist.bandcamp, icon: 'bandcamp' },
    { name: 'YouTube', url: artist.youtube, icon: 'youtube' },
  ].filter((link) => link.url);

  const openGraph = generateArtistOpenGraphMetadata({
    name: artist.name,
    bio: artist.bio || undefined,
    profileImage: artist.profile_image || undefined,
    slug: artist.slug,
  });

  const shareData = getArtistShareMetadata({
    name: artist.name,
    bio: artist.bio || undefined,
    profileImage: artist.profile_image || undefined,
    slug: artist.slug,
  });

  const shareButtons = getShareButtons(shareData).filter(
    (button): button is NonNullable<typeof button> => button !== null && button !== undefined
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInDelayed = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <Head>
        <title>{`${artist.name} | echoniq`}</title>
        <meta
          name="description"
          content={
            artist.bio ||
            `Check out ${artist.name} on echoniq - Electronic music producer and artist`
          }
        />
        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />
        <meta property="og:image" content={openGraph.image} />
        <meta property="og:url" content={openGraph.url} />
        <meta property="og:type" content={openGraph.type} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="bg-black text-white">
        {/* Hero Banner */}
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          {artist.cover_image ? (
            <Image
              src={artist.cover_image}
              alt={artist.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
          )}

          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 md:p-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="container mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{artist.name}</h1>
              {artist.genre && (
                <p className="text-lg md:text-xl text-gray-300 mb-6">{artist.genre}</p>
              )}
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Profile & Social Links */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="col-span-1">
              <div className="mb-8 relative aspect-square max-w-xs mx-auto lg:mx-0">
                {artist.profile_image ? (
                  <Image
                    src={artist.profile_image}
                    alt={artist.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-600">
                      {artist.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Follow</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
                        aria-label={`Follow on ${link.name}`}
                      >
                        <span className={`icon-${link.icon}`} aria-hidden="true"></span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Share</h3>
                <div className="flex flex-wrap gap-3">
                  {shareButtons.map((button) => (
                    <a
                      key={button.name}
                      href={button.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
                      style={{ backgroundColor: button.color }}
                      aria-label={`Share on ${button.name}`}
                    >
                      <span className={`icon-${button.icon}`} aria-hidden="true"></span>
                    </a>
                  ))}
                </div>
              </div>

              {artist.email && (
                <div className="mb-8">
                  <CTA href={`mailto:${artist.email}`} size="md" variant="outline" fullWidth>
                    Contact Artist
                  </CTA>
                </div>
              )}
            </motion.div>

            {/* Right Column: Bio & Releases */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInDelayed}
              className="col-span-1 lg:col-span-2"
            >
              {/* Bio */}
              <div className="mb-12">
                <SectionTitle title="Biography" />
                <ArtistBio
                  bio={artist.bio || ''}
                  className="prose prose-lg prose-invert max-w-none"
                />
              </div>

              {artist.releases && artist.releases.length > 0 && (
                <div className="mb-12">
                  <SectionTitle title="Latest Releases" />
                  {/*
                   * Expliziter Typ-Cast zu ReleaseWithTracks[], da wir wissen, dass die Releases
                   * vom Supabase API kommen und dem ReleaseWithTracks-Format entsprechen
                   */}
                  <ArtistReleases
                    artistName={artist.name}
                    releases={artist.releases as ReleaseWithTracks[]}
                  />
                </div>
              )}

              {(artist.spotify || artist.soundcloud) && (
                <div className="mb-12">
                  <SectionTitle title="Listen On" />
                  <SimpleStreamingLinks
                    spotify={artist.spotify}
                    appleMusic={null}
                    soundcloud={artist.soundcloud}
                    bandcamp={artist.bandcamp}
                    beatport={null}
                    youtube={artist.youtube}
                  />
                </div>
              )}
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/artists"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <span className="icon-arrow-left mr-2" aria-hidden="true"></span>
              Back to Artists
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await getServerArtists();
  const paths = artists.map((artist) => ({ params: { slug: artist.slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<ArtistDetailPageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const artist = await getServerArtistBySlug(slug);
    if (!artist || !artist.is_published) return { notFound: true };
    return { props: { artist }, revalidate: 3600 };
  } catch (error) {
    console.error(`Error fetching artist with slug ${slug}:`, error);
    return { notFound: true };
  }
};
