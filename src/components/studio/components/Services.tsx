import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Container } from '@/components/ui/container';

// Service data
const services = [
  {
    id: 'recording',
    title: 'Recording & Aufnahme',
    description:
      'Hochwertige Aufnahmen in unseren professionell akustisch optimierten Räumen mit erstklassigem Equipment und erfahrenen Toningenieuren.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 14C19.5304 14 20.0391 13.7893 20.4142 13.4142C20.7893 13.0391 21 12.5304 21 12C21 11.4696 20.7893 10.9609 20.4142 10.5858C20.0391 10.2107 19.5304 10 19 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 14C4.46957 14 3.96086 13.7893 3.58579 13.4142C3.21071 13.0391 3 12.5304 3 12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 18C16 16.4087 15.3679 14.8826 14.2426 13.7574C13.1174 12.6321 11.5913 12 10 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 18C8 19.5913 8.63214 21.1174 9.75736 22.2426C10.8826 23.3679 12.4087 24 14 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 6C16 7.59133 15.3679 9.11742 14.2426 10.2426C13.1174 11.3679 11.5913 12 10 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 6C8 4.40867 8.63214 2.88258 9.75736 1.75736C10.8826 0.632141 12.4087 0 14 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: '/images/studio/services/recording.jpg',
    features: [
      'Mehrspuraufnahmen (48+ Kanäle)',
      'Vocals, Instrumente, Bands, Chöre',
      'Verschiedene Räume für unterschiedliche Akustik',
      'Remote-Recording-Möglichkeiten',
      'Hochwertiges Mikrofon-Arsenal',
      'Professionelle Toningenieure',
    ],
  },
  {
    id: 'mixing',
    title: 'Mixing & Mastering',
    description:
      'Vom Rohtrack zum fertigen Song: Unser erfahrenes Team verleiht deiner Musik Brillanz, Klarheit und die nötige Durchsetzungskraft für alle Wiedergabegeräte.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 16V3M7 3L10 6M7 3L4 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 8V21M17 21L20 18M17 21L14 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 12H7M21 12H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: '/images/studio/services/mixing.jpg',
    features: [
      'Stereomix für alle Plattformen',
      'Detailliertes, ausgewogenes Klangbild',
      'Professionelles Mastering',
      'Loudness-optimierte Masterdateien',
      'Verschiedene Formate und Auflösungen',
      'Spezialisierung auf diverse Genres',
    ],
  },
  {
    id: 'production',
    title: 'Musikproduktion',
    description:
      'Von der Idee zum fertigen Song: Wir unterstützen dich in allen Phasen des kreativen Prozesses, vom Songwriting über Arrangement bis hin zur finalen Produktion.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17V15M12 17V13M15 17V11M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L18.7071 6.70711C18.8946 6.89464 19 7.149 19 7.41421V19C19 20.1046 18.1046 21 17 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: '/images/studio/services/production.jpg',
    features: [
      'Songwriting & Komposition',
      'Arrangement & Bearbeitung',
      'Beatmaking & Instrumental',
      'Vocalproduktion & Editing',
      'Sound-Design & Synthesizer',
      'Produktionsberatung & Entwicklung',
    ],
  },
  {
    id: 'session',
    title: 'Session-Musiker',
    description:
      'Ein Netzwerk aus talentierten Musikern steht dir zur Verfügung, um deiner Musik die perfekte Note zu verleihen – von einzelnen Instrumentalparts bis hin zur kompletten Band.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H15M9 17V21M9 17H15M15 17V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: '/images/studio/services/session.jpg',
    features: [
      'Gitarre, Bass, Drums, Keyboards',
      'Streicher, Bläser, Percussion',
      'Backing Vocals & Chöre',
      'Klassische & elektronische Instrumente',
      'Erfahrene Profi-Musiker',
      'Remote-Session-Möglichkeiten',
    ],
  },
];

type ServiceItemProps = {
  service: (typeof services)[0];
  index: number;
  isEven: boolean;
};

const ServiceItem: React.FC<ServiceItemProps> = ({ service, isEven }) => {
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
      id={service.id}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <motion.div variants={itemVariants} className={`${isEven ? 'lg:order-2' : ''}`}>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants} className={`${isEven ? 'lg:order-1' : ''}`}>
        <div className="p-3 bg-gray-800 rounded-md text-primary inline-block mb-4">
          {service.icon}
        </div>

        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-gray-300 mb-6">{service.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <svg
                className="w-5 h-5 text-primary shrink-0 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
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

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-black text-white">
      <Container>
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Unser Angebot</span>
          <h2 className="text-3xl md:text-4xl font-bold">Unsere Studio-Services</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Von der ersten Idee bis zum fertigen Mastertrack bieten wir alle Services, die du für
            deine Musikproduktion benötigst – unter einem Dach und aus einer Hand.
          </p>
        </motion.div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={index}
              isEven={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Additional services note */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Du benötigst weitere Services wie Video-Produktion, Artwork-Design oder Promotion? Wir
            haben ein Netzwerk aus talentierten Partnern und vermitteln gerne den richtigen Kontakt.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Services;
