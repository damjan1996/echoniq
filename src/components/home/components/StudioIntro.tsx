"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check } from "lucide-react"

export const StudioIntro: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7 },
    },
  }

  const features = [
    {
      title: "State-of-the-Art Equipment",
      description: "Modernste Aufnahme- und Produktionstechnik",
    },
    {
      title: "Professionelle Akustik",
      description: "Optimierte Raumakustik für präzise Aufnahmen",
    },
    {
      title: "Erfahrene Produzenten",
      description: "Unterstützung durch unser erfahrenes Team",
    },
    {
      title: "Flexible Buchungszeiten",
      description: "Anpassung an deinen Zeitplan",
    },
  ]

  return (
    <section className="py-20 bg-[#0E0F0F]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Studio Images */}
          <div className="relative">
            <motion.div
              ref={ref}
              variants={imageVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative z-10 rounded-lg overflow-hidden aspect-[4/3]"
            >
              <Image src="/images/studio/main-studio.jpg" alt="echoniq Tonstudio" fill className="object-cover" />
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-20 -left-10 w-2/3 h-48 rounded-lg overflow-hidden z-20 shadow-xl hidden md:block"
            >
              <Image src="/images/studio/studio-detail.jpg" alt="Studio Equipment" fill className="object-cover" />
            </motion.div>
          </div>

          {/* Studio Content */}
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <motion.span variants={itemVariants} className="text-gray-400 font-medium mb-2 block">
              Unser Tonstudio
            </motion.span>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Wo Kreativität auf Technik trifft
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-300 mb-6">
              Im Herzen unseres Labels befindet sich ein professionell ausgestattetes Tonstudio, das für höchste
              Aufnahmequalität und kreativen Komfort konzipiert wurde. Hier verbinden wir Spitzentechnologie mit
              inspirierender Atmosphäre.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#1A1A1A] rounded-md text-white mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/studio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                >
                  Mehr über unser Studio
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StudioIntro
