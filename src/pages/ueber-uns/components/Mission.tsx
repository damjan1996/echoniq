import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Container } from '@/components/ui/container';

// Mission values
const missionValues = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3H8M16 3C16.5523 3 17 3.44772 17 4V20C17 20.5523 16.5523 21 16 21H8C7.44772 21 7 20.5523 7 20V4C7 3.44772 7.44772 3 8 3M16 3L12 7L8 3M11 14H13M11 11H13M11 17H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Künstlerische Integrität',
    description:
      'Wir unterstützen unsere Künstler dabei, ihrer kreativen Vision treu zu bleiben und fördern deren künstlerische Entwicklung ohne kommerziellen Druck.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2 3.4C15.2 4.32843 14.4284 5.1 13.5 5.1C12.5716 5.1 11.8 4.32843 11.8 3.4C11.8 2.47157 12.5716 1.7 13.5 1.7C14.4284 1.7 15.2 2.47157 15.2 3.4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.7 7.12222C17.7 8.65366 16.4646 9.9 14.9444 9.9H12.0556C10.5354 9.9 9.3 8.65366 9.3 7.12222C9.3 5.59078 10.5354 4.34444 12.0556 4.34444H14.9444C16.4646 4.34444 17.7 5.59078 17.7 7.12222Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6667 9.9V13.4889C14.6667 13.8142 14.5384 14.1261 14.3101 14.3543C14.0819 14.5826 13.77 14.7111 13.4444 14.7111H7.52222C7.19665 14.7111 6.8848 14.5826 6.65647 14.3543C6.42815 14.1261 6.3 13.8142 6.3 13.4889V8.67778"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.3 18.5778V17.1556C6.3 16.8302 6.42815 16.5183 6.65647 16.2901C6.8848 16.0617 7.19665 15.9333 7.52222 15.9333H16.4778C16.8033 15.9333 17.1152 16.0617 17.3435 16.2901C17.5719 16.5183 17.7 16.8302 17.7 17.1556V18.5778"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.52222 22.3H16.4778"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.66667 15.9333V18.5778"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.3333 15.9333V18.5778"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.7889 18.5778V22.3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2111 18.5778V22.3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Musikalische Vielfalt',
    description:
      'Wir schätzen die Vielfalt musikalischer Ausdrucksformen und bringen Künstler verschiedener Genres, Hintergründe und Stile zusammen.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 4H4V11H11V4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 4H13V11H20V4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 13H4V20H11V13Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 13H13V20H20V13Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Innovative Technologie',
    description:
      'Wir nutzen moderne Technologie und Produktionsmethoden, um Musik auf höchstem Niveau zu produzieren und zu verbreiten.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 20H7C5.89543 20 5 19.1046 5 18V8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V18C19 19.1046 18.1046 20 17 20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 10V16M9 13H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 3V6M15 3V6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Gemeinschaft & Zusammenarbeit',
    description:
      'Wir glauben an die Kraft der Zusammenarbeit und schaffen ein Umfeld, in dem Künstler voneinander lernen und gemeinsam wachsen können.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12H6M6 12C6 13.0609 6.42143 14.0783 7.17157 14.8284C7.92172 15.5786 8.93913 16 10 16C11.0609 16 12.0783 15.5786 12.8284 14.8284C13.5786 14.0783 14 13.0609 14 12C14 10.9391 13.5786 9.92172 12.8284 9.17157C12.0783 8.42143 11.0609 8 10 8C8.93913 8 7.92172 8.42143 7.17157 9.17157C6.42143 9.92172 6 10.9391 6 12ZM14 12H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Langfristige Beziehungen',
    description:
      'Wir streben dauerhafte, faire Partnerschaften mit unseren Künstlern an, um gemeinsam langfristige musikalische Erfolge zu erzielen.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8L10 13L21 7M3 8V16L10 21V13M3 8L10 3L21 7M10 21L21 15V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Globale Perspektive',
    description:
      'Wir denken und handeln global, um Musik und Künstler über geographische und kulturelle Grenzen hinweg zu verbinden und zu fördern.',
  },
];

export const Mission: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="mission" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission statement */}
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls}>
            <motion.span variants={itemVariants} className="text-primary font-medium mb-2 block">
              Unsere Mission
            </motion.span>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Musik, die Grenzen überschreitet
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-300 mb-6">
              Bei echoniq verstehen wir uns als mehr als nur ein Musiklabel. Unsere Mission ist es,
              eine Plattform zu schaffen, die Künstlern die Freiheit gibt, ihre kreative Vision zu
              verwirklichen und dabei die höchsten Qualitätsstandards zu wahren.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300 mb-6">
              Wir setzen auf langfristige Beziehungen mit unseren Künstlern und glauben daran, dass
              der Schlüssel zum Erfolg in der Kombination aus künstlerischer Freiheit, technischer
              Exzellenz und strategischer Unterstützung liegt.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300">
              Unsere Leidenschaft gilt der Entdeckung und Förderung einzigartiger musikalischer
              Stimmen, die die Kraft haben, zu bewegen, zu inspirieren und zu verbinden – über alle
              Genres und Grenzen hinweg.
            </motion.p>
          </motion.div>

          {/* Mission image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/ueber-uns/mission.jpg"
                alt="echoniq Studio Session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-60"></div>

              {/* Sound wave overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="60%" height="40%" viewBox="0 0 200 60" fill="none">
                  <motion.path
                    d="M0,30 C10,10 20,50 30,30 C40,10 50,50 60,30 C70,10 80,50 90,30 C100,10 110,50 120,30 C130,10 140,50 150,30 C160,10 170,50 180,30 C190,10 200,50 200,30"
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                    fill="none"
                    animate={{
                      d: [
                        'M0,30 C10,10 20,50 30,30 C40,10 50,50 60,30 C70,10 80,50 90,30 C100,10 110,50 120,30 C130,10 140,50 150,30 C160,10 170,50 180,30 C190,10 200,50 200,30',
                        'M0,30 C10,50 20,10 30,30 C40,50 50,10 60,30 C70,50 80,10 90,30 C100,50 110,10 120,30 C130,50 140,10 150,30 C160,50 170,10 180,30 C190,50 200,10 200,30',
                        'M0,30 C10,10 20,50 30,30 C40,10 50,50 60,30 C70,10 80,50 90,30 C100,10 110,50 120,30 C130,10 140,50 150,30 C160,10 170,50 180,30 C190,10 200,50 200,30',
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: 'linear',
                    }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission values */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold mb-4">Unsere Werte</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Diese Grundprinzipien leiten unser Handeln und prägen die Kultur von echoniq:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {missionValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg"
              >
                <div className="p-3 bg-gray-800 rounded-md text-primary mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Mission;
