import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Types
interface FeaturedArtistProps {
  id?: string; // Made optional since it's not used
  name: string;
  slug: string;
  imageUrl: string;
  bio: string;
  latestRelease?: {
    title: string;
    slug: string;
    coverImage: string;
    releaseDate: string;
    type: 'album' | 'ep' | 'single';
  };
}

export const FeaturedArtist: React.FC<FeaturedArtistProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id, // Add eslint disable comment to suppress the warning
  name,
  slug,
  imageUrl,
  bio,
  latestRelease,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Extract a shorter bio for the preview
  const shortBio = bio.length > 180 ? bio.substring(0, 180).trim() + '...' : bio;

  return (
    <section className="py-20 bg-background-secondary overflow-hidden">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent-500/10 text-accent-500 rounded-full text-sm font-medium mb-4">
            Featured Artist
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">{name}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 aspect-square overflow-hidden rounded-xl relative"
          >
            <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-105">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col">
            <div className="prose prose-invert max-w-none mb-8">
              <p>{shortBio}</p>
            </div>

            <Link
              href={`/artists/${slug}`}
              className="group inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors duration-300 font-medium mb-10"
            >
              <span>Mehr über {name}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {latestRelease && (
              <div className="mt-auto">
                <h3 className="text-sm uppercase font-medium text-text-tertiary mb-4">
                  Neueste Veröffentlichung
                </h3>
                <Link href={`/music/${latestRelease.slug}`} className="block">
                  <div className="bg-background-tertiary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 aspect-square relative">
                        <Image
                          src={latestRelease.coverImage}
                          alt={latestRelease.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                        <div>
                          <span className="uppercase text-xs font-medium text-text-tertiary block mb-1">
                            {latestRelease.type} •{' '}
                            {new Date(latestRelease.releaseDate).getFullYear()}
                          </span>
                          <h4 className="text-xl font-bold text-text-primary mb-2">
                            {latestRelease.title}
                          </h4>
                        </div>

                        <div className="inline-flex items-center text-accent-500 group-hover:text-accent-400 transition-colors duration-300 font-medium mt-4">
                          <span>Release ansehen</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedArtist;
