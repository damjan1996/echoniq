"use client"

import { motion } from "framer-motion"
import type React from "react"

import { ArtistCard } from "@/components/artists/ArtistCard"

interface Artist {
  id: string
  name: string
  slug: string
  profile_image?: string | null
  genre?: string | null
  is_featured?: boolean
}

interface ArtistListProps {
  artists: Artist[]
  isLoading?: boolean
  error?: string | null
  emptyMessage?: string
}

export const ArtistList: React.FC<ArtistListProps> = ({
                                                        artists,
                                                        isLoading = false,
                                                        error = null,
                                                        emptyMessage = "No artists found",
                                                      }) => {
  // Animation variants for list container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="py-16 text-center">
        <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg inline-block">
          <p className="font-medium text-red-400">Error loading artists</p>
          <p className="text-sm mt-1 text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  // Handle empty state
  if (!artists || artists.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    )
  }

  // Render the artist grid
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {artists.map((artist, index) => (
        <motion.div key={artist.id} variants={itemVariants}>
          <ArtistCard
            id={artist.id}
            name={artist.name}
            slug={artist.slug}
            imageUrl={artist.profile_image || undefined}
            genre={artist.genre || undefined}
            isFeatured={artist.is_featured}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

// Alternative layout for featured artists (e.g., for homepage)
export const FeaturedArtistList: React.FC<ArtistListProps> = ({
                                                                artists,
                                                                isLoading = false,
                                                                error = null,
                                                                emptyMessage = "No featured artists",
                                                              }) => {
  // Only show featured artists
  const featuredArtists = artists.filter((artist) => artist.is_featured)

  // Animation settings for featured artists
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  // Handle empty state
  if (!featuredArtists || featuredArtists.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    )
  }

  // Render featured artists in a more prominent layout
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {featuredArtists.slice(0, 3).map((artist, index) => (
        <motion.div key={artist.id} variants={itemVariants}>
          <ArtistCard
            id={artist.id}
            name={artist.name}
            slug={artist.slug}
            imageUrl={artist.profile_image || undefined}
            genre={artist.genre || undefined}
            isFeatured={true}
            index={index}
            size="large"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ArtistList
