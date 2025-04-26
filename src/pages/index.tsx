import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// Replace the import with a local implementation
// import { SEO } from '@/components/common';

// Interface for SEO component props
interface SEOProps {
  title: string;
  description: string;
  noIndex?: boolean;
}

// Simple SEO component implementation
const SEO: React.FC<SEOProps> = ({ title, description, noIndex = false }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
};

// This component serves as a redirect to the home page
const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after the animation completes
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <>
      <SEO
        title="echoniq | Innovative Musikproduktion & Label"
        description="echoniq ist ein modernes Musiklabel mit Fokus auf elektronische Musik, Künstlerentwicklung und professioneller Studioproduktion."
      />
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <AnimatePresence>
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.6, 0.01, -0.05, 0.95],
              }}
              className="relative"
            >
              {/* Logo SVG */}
              <svg
                width="200"
                height="80"
                viewBox="0 0 200 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M32.654 20C38.95 20 43.308 24.48 43.308 30.24C43.308 36 38.95 40.48 32.654 40.48H26.23V50H20V20H32.654ZM32.192 35.36C35.308 35.36 37.462 33.2 37.462 30.24C37.462 27.28 35.308 25.12 32.192 25.12H26.23V35.36H32.192Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
                <motion.path
                  d="M63.123 30C70.699 30 75.981 35.52 75.981 40.48C75.981 45.44 70.699 50.96 63.123 50.96C55.547 50.96 50.265 45.44 50.265 40.48C50.265 35.52 55.547 30 63.123 30ZM63.123 45.6C67.507 45.6 70.135 42.88 70.135 40.48C70.135 38.08 67.507 35.36 63.123 35.36C58.739 35.36 56.111 38.08 56.111 40.48C56.111 42.88 58.739 45.6 63.123 45.6Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                />
                <motion.path
                  d="M78.0654 30.96H83.9114V50H78.0654V30.96ZM77.7494 25.6C77.7494 23.76 79.2974 22.32 81.0304 22.32C82.7634 22.32 84.3114 23.76 84.3114 25.6C84.3114 27.44 82.7634 28.88 81.0304 28.88C79.2974 28.88 77.7494 27.44 77.7494 25.6Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
                <motion.path
                  d="M101.227 30C107.765 30 111.867 34.96 111.867 40.48C111.867 46 107.765 50.96 101.227 50.96C94.6894 50.96 90.5874 46 90.5874 40.48C90.5874 34.96 94.6894 30 101.227 30ZM101.227 45.84C104.343 45.84 106.021 43.44 106.021 40.48C106.021 37.52 104.343 35.12 101.227 35.12C98.1114 35.12 96.4334 37.52 96.4334 40.48C96.4334 43.44 98.1114 45.84 101.227 45.84Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                />
                <motion.path
                  d="M113.954 30.96H119.8V33.12C121.22 31.36 123.838 30.48 126.562 30.48V35.92C126.178 35.84 125.794 35.84 125.41 35.84C122.678 35.84 119.8 37.28 119.8 41.92V50H113.954V30.96Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                />
                <motion.path
                  d="M128.568 40.48C128.568 34.96 133.072 30 139.224 30C145.248 30 149.624 34.8 149.624 41.12V42.64H134.414C135.028 44.88 137.028 46.08 139.608 46.08C141.608 46.08 143.376 45.44 144.872 44.08L148.072 47.68C145.8 49.76 142.684 51.04 139.032 51.04C132.568 51.04 128.568 46.08 128.568 40.48ZM134.414 38.8H144.184C143.8 36.56 141.928 35.04 139.224 35.04C136.52 35.04 134.8 36.48 134.414 38.8Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                />
                <motion.path
                  d="M153.423 20H159.269V50H153.423V20Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.4 }}
                />
                <motion.path
                  d="M164.111 20H169.957V50H164.111V20Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.6 }}
                />
                <motion.path
                  d="M174.8 40.48C174.8 34.96 179.376 30 185.4 30C191.424 30 196 34.96 196 40.48C196 46 191.424 50.96 185.4 50.96C179.376 50.96 174.8 46 174.8 40.48ZM190.16 40.48C190.16 37.52 188.16 35.12 185.4 35.12C182.64 35.12 180.64 37.52 180.64 40.48C180.64 43.44 182.64 45.84 185.4 45.84C188.16 45.84 190.16 43.44 190.16 40.48Z"
                  fill="white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.8 }}
                />
              </svg>
            </motion.div>

            {/* Audio wave animation */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <svg
                width="100"
                height="40"
                viewBox="0 0 100 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  x="5"
                  y="15"
                  width="4"
                  height="10"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [10, 30, 10],
                    y: [15, 5, 15],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1,
                    ease: 'easeInOut',
                  }}
                />
                <motion.rect
                  x="15"
                  y="12"
                  width="4"
                  height="16"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [16, 36, 16],
                    y: [12, 2, 12],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1.3,
                    ease: 'easeInOut',
                    delay: 0.1,
                  }}
                />
                <motion.rect
                  x="25"
                  y="8"
                  width="4"
                  height="24"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [24, 34, 24],
                    y: [8, 3, 8],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 0.9,
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                />
                <motion.rect
                  x="35"
                  y="5"
                  width="4"
                  height="30"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [30, 35, 30],
                    y: [5, 2, 5],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1.1,
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                />
                <motion.rect
                  x="45"
                  y="10"
                  width="4"
                  height="20"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [20, 30, 20],
                    y: [10, 5, 10],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1.4,
                    ease: 'easeInOut',
                    delay: 0.4,
                  }}
                />
                <motion.rect
                  x="55"
                  y="8"
                  width="4"
                  height="24"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [24, 34, 24],
                    y: [8, 3, 8],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1.2,
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                />
                <motion.rect
                  x="65"
                  y="5"
                  width="4"
                  height="30"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [30, 38, 30],
                    y: [5, 1, 5],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />
                <motion.rect
                  x="75"
                  y="8"
                  width="4"
                  height="24"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [24, 32, 24],
                    y: [8, 4, 8],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 0.8,
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                />
                <motion.rect
                  x="85"
                  y="12"
                  width="4"
                  height="16"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [16, 28, 16],
                    y: [12, 6, 12],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1.1,
                    ease: 'easeInOut',
                    delay: 0.6,
                  }}
                />
                <motion.rect
                  x="95"
                  y="15"
                  width="4"
                  height="10"
                  rx="2"
                  fill="#ec4899"
                  animate={{
                    height: [10, 24, 10],
                    y: [15, 8, 15],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 0.9,
                    ease: 'easeInOut',
                    delay: 0.7,
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default IndexPage;
