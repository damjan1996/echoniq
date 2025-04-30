"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronRight } from "lucide-react"

import type { Artist } from "@/types"

// Sample data
const artists: Artist[] = [
  {
    id: "1",
    slug: "alex-grey",
    name: "Alex Grey",
    image: "/images/artists/alex-grey.jpg",
    genres: ["Electronic", "Ambient"],
    bio: "Musikproduzent und Gründer von echoniq, bekannt für atmosphärische Klanglandschaften und innovative Beats.",
    featured: true,
  },
  {
    id: "2",
    slug: "edu",
    name: "EDU",
    image: "/images/artists/edu.jpg",
    genres: ["Latin", "Pop"],
    bio: "Spanischsprachiger Künstler mit einer einzigartigen Mischung aus lateinamerikanischen Rhythmen und modernem Pop.",
    featured: true,
  },
  {
    id: "3",
    slug: "nova-wave",
    name: "Nova Wave",
    image: "/images/artists/nova-wave.jpg",
    genres: ["Synthwave", "Electro"],
    bio: "Duo, das retro-futuristische Klänge mit modernen Produktionstechniken verbindet.",
    featured: true,
  },
]

interface ArtistCardProps {
  artist: Artist
  index: number
}

function ArtistCard({ artist, index }: ArtistCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group"
    >
      <Link href={`/artists/${artist.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[3/4] transition-transform duration-500 hover:scale-[1.03]">
          <Image
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

          <div className="absolute bottom-0 left-0 w-full p-6 z-10">
            <h3 className="text-2xl font-bold text-white mb-1">{artist.name}</h3>
            <div className="flex gap-2 mb-3">
              {artist.genres.map((genre, idx) => (
                <span key={idx} className="text-xs text-gray-300 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">{artist.bio}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export const FeaturedArtists: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#0E0F0F]">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className="text-gray-400 font-medium mb-2 block">Unsere Künstler</span>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Artists</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {artists.map((artist, index) => (
            <ArtistCard key={artist.id} artist={artist} index={index} />
          ))}
        </div>

        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center mt-12"
        >
          <Link
            href="/artists"
            className="group inline-flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white transition-colors"
          >
            Alle Künstler entdecken
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedArtists
