import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const StudioLocation: React.FC = () => {
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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden"
    >
      {/* Map container */}
      <div className="relative w-full h-72">
        {/* Replace this with an actual map integration (e.g., Google Maps) */}
        <Image
          src="/images/kontakt/studio-map.jpg"
          alt="Studio Standort Karte"
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

        {/* Location pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-primary"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
                fill="currentColor"
              />
              <path
                d="M12 22C16 18 20 14.4183 20 9.5C20 4.80558 16.4183 1 12 1C7.58172 1 4 4.80558 4 9.5C4 14.4183 8 18 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Location info */}
      <div className="p-6">
        <motion.h3 variants={itemVariants} className="text-xl font-bold mb-4">
          Unser Studio finden
        </motion.h3>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-primary font-medium mb-2">Adresse</h4>
            <p className="text-gray-300 mb-1">echoniq Studios</p>
            <p className="text-gray-300 mb-1">Musterstraße 123</p>
            <p className="text-gray-300 mb-3">12345 Musterstadt</p>

            <h4 className="text-primary font-medium mb-2">Öffnungszeiten</h4>
            <p className="text-gray-300 mb-1">Mo - Fr: 10:00 - 22:00 Uhr</p>
            <p className="text-gray-300 mb-1">Sa: 12:00 - 20:00 Uhr</p>
            <p className="text-gray-300">So: Nach Vereinbarung</p>
          </div>

          <div>
            <h4 className="text-primary font-medium mb-2">Anfahrt</h4>
            <p className="text-gray-300 mb-4">
              Unser Studio ist sowohl mit öffentlichen Verkehrsmitteln als auch mit dem Auto gut zu
              erreichen.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="p-1 bg-gray-800 rounded-md mt-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 10H21M7 15H8M16 15H17M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-300">
                  U-Bahn: Linie U2, Station Musterplatz (5 Min. Fußweg)
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 bg-gray-800 rounded-md mt-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 19V16M10 19V16M14 19V16M18 19V16M21 2L16 7M21 7L16 2M8 2V10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10V2M3 10H21V14C21 16.7614 18.7614 19 16 19H8C5.23858 19 3 16.7614 3 14V10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-300">
                  Bus: Linien 123, 456, Haltestelle Musterstraße
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 bg-gray-800 rounded-md mt-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 3H8M18 9H6M20 15H4M14 21H10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-300">
                  Auto: Parkhaus Musterplatz in direkter Nähe (Tagespauschale 8€)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-gray-700">
          <h4 className="text-primary font-medium mb-2">Tipp</h4>
          <p className="text-sm text-gray-300">
            Bitte vereinbare vor deinem Besuch einen Termin, damit wir uns ausreichend Zeit für dich
            nehmen können. Du kannst gerne anrufen oder das Kontaktformular nutzen.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudioLocation;
