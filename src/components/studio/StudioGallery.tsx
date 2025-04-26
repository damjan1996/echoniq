import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { SectionTitle } from '@/components/common/section-title';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

interface StudioGalleryProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  className?: string;
  variant?: 'grid' | 'carousel';
}

export const StudioGallery: React.FC<StudioGalleryProps> = ({
  title = 'Unser Studio',
  subtitle = 'Professionelle Ausstattung für deine Musik',
  images,
  className = '',
  variant = 'grid',
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);

  // Early return if no images
  if (!images || images.length === 0) {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  // Carousel navigation
  const goToNextCarouselImage = () => {
    setSlideDirection(1);
    setCurrentCarouselIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevCarouselImage = () => {
    setSlideDirection(-1);
    setCurrentCarouselIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Lightbox navigation
  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Open lightbox with specific image
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionTitle title={title} subtitle={subtitle} align="center" withAccent={false} />
        </motion.div>

        {/* Grid Layout */}
        {variant === 'grid' && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                variants={imageVariants}
                className="relative aspect-square overflow-hidden rounded-lg bg-neutral-900 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="text-white w-10 h-10" />
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm">{image.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Carousel Layout */}
        {variant === 'carousel' && (
          <div className="relative overflow-hidden rounded-lg aspect-video max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-neutral-900">
              <AnimatePresence initial={false} custom={slideDirection}>
                <motion.div
                  key={currentCarouselIndex}
                  custom={slideDirection}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentCarouselIndex].src}
                    alt={images[currentCarouselIndex].alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                    priority
                  />
                  {images[currentCarouselIndex].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                      <p>{images[currentCarouselIndex].caption}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors duration-300"
              onClick={goToPrevCarouselImage}
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors duration-300"
              onClick={goToNextCarouselImage}
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {currentCarouselIndex + 1} / {images.length}
            </div>

            {/* Expand Button */}
            <button
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors duration-300"
              onClick={() => openLightbox(currentCarouselIndex)}
              aria-label="Vollbild anzeigen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-screen-lg max-h-screen-90 p-4"
              onClick={(e) => e.stopPropagation()}
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-video lg:aspect-auto lg:h-[80vh]">
                <Image
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors duration-300"
                onClick={closeLightbox}
                aria-label="Schließen"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black transition-colors duration-300"
                onClick={goToPrevImage}
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black transition-colors duration-300"
                onClick={goToNextImage}
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
                <p className="text-sm text-white">
                  {currentImageIndex + 1} / {images.length}
                </p>
              </div>

              {images[currentImageIndex].caption && (
                <div className="absolute bottom-16 left-0 right-0 text-center">
                  <div className="inline-block bg-black/70 px-6 py-3 rounded-lg">
                    <p className="text-white">{images[currentImageIndex].caption}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StudioGallery;
