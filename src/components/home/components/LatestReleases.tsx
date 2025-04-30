"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Play, Pause, ChevronRight } from "lucide-react"

// Sample data
const releases = [
  {
    id: "1",
    title: "Nova Horizon",
    artist: "Alex Grey",
    cover: "/images/releases/nova-horizon.jpg",
    genres: ["Electronic", "Ambient"],
    description: "Eine Reise durch atmosphärische Klanglandschaften und innovative Beats.",
  },
  {
    id: "2",
    title: "Ritmo de Vida",
    artist: "EDU",
    cover: "/images/releases/ritmo-de-vida.jpg",
    genres: ["Latin", "Pop"],
    description: "Eine lebendige Mischung aus lateinamerikanischen Rhythmen und modernem Pop.",
  },
  {
    id: "3",
    title: "Retro Future",
    artist: "Nova Wave",
    cover: "/images/releases/retro-future.jpg",
    genres: ["Synthwave", "Electro"],
    description: "Retro-futuristische Klänge mit modernen Produktionstechniken.",
  },
]

interface ReleaseCardProps {
  release: (typeof releases)[0]
  index: number
}

function ReleaseCard({ release, index }: ReleaseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
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
      <div className="bg-[#0E0F0F] rounded-lg overflow-hidden transition-transform duration-500 hover:scale-[1.03]">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={release.cover || "/placeholder.svg"}
            alt={`${release.title} by ${release.artist}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
            >
              {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white ml-1" />}
            </motion.button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">{release.title}</h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{release.artist}</p>

          <div className="flex gap-2 mt-3 mb-4">
            {release.genres.map((genre, idx) => (
              <span key={idx} className="text-xs text-gray-400 bg-[#1A1A1A] px-2 py-1 rounded-full">
                {genre}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-300 line-clamp-2">{release.description}</p>

          {isPlaying && (
            <div className="mt-4 bg-[#1A1A1A] rounded-md p-3 flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Preview</div>
                <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 30, ease: "linear" }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsPlaying(false)}
                className="ml-3 p-1 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Pause className="h-4 w-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export const LatestReleases: React.FC = () => {
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
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className="text-gray-400 font-medium mb-2 block">Neue Musik</span>
          <h2 className="text-3xl md:text-4xl font-bold">Aktuelle Veröffentlichungen</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {releases.map((release, index) => (
            <ReleaseCard key={release.id} release={release} index={index} />
          ))}
        </div>

        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center mt-12"
        >
          <Link
            href="/releases"
            className="group inline-flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white transition-colors"
          >
            Alle Releases entdecken
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default LatestReleases
