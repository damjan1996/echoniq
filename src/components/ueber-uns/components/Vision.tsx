import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Container } from '@/components/ui/container';

// Vision pillars
const visionPillars = [
  {
    id: 'digital',
    title: 'Digitale Innovation',
    description:
      'Wir wollen neue digitale Wege für Musikvertrieb, Künstlerpromotion und Fan-Engagement erschließen und damit die Art und Weise verändern, wie Menschen mit Musik interagieren.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9998 2L14.9998 5H19.9998V10L22.9998 13L19.9998 16V21H14.9998L11.9998 24L8.99976 21H3.99976V16L0.999756 13L3.99976 10V5H8.99976L11.9998 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8V18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 13H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'artists',
    title: 'Künstler-Empowerment',
    description:
      'Wir streben danach, ein Modell zu entwickeln, das Künstlern mehr Kontrolle, Transparenz und faire Vergütung bietet und sie befähigt, langfristig erfolgreiche Karrieren aufzubauen.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 2C14.1193 2 13 3.11929 13 4.5C13 5.88071 14.1193 7 15.5 7C16.8807 7 18 5.88071 18 4.5C18 3.11929 16.8807 2 15.5 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 22L19 22C21.2091 22.0003 23 20.2095 23 18.0004V12.0004"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 8L19.6097 8.104C17.1681 8.79046 15.6934 11.2679 16.3599 13.7096C16.5565 14.3899 16.9026 15.0158 17.3719 15.5358L21.2384 19.8737"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 2C9.88071 2 11 3.11929 11 4.5C11 5.88071 9.88071 7 8.5 7C7.11929 7 6 5.88071 6 4.5C6 3.11929 7.11929 2 8.5 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 22H10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 8L4.39033 8.104C6.83193 8.79046 8.30661 11.2679 7.64015 13.7096C7.44352 14.3899 7.09744 15.0158 6.62814 15.5358L2.76159 19.8737"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'global',
    title: 'Globale Musikbewegung',
    description:
      'Wir wollen Musik aus verschiedenen Kulturen und Traditionen zusammenbringen, um eine globale musikalische Konversation zu fördern, die kulturelle Barrieren überwindet und neue kreative Horizonte eröffnet.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'fusion',
    title: 'Genreverschmelzung',
    description:
      'Wir möchten die Grenzen zwischen musikalischen Genres auflösen und innovative Fusion-Sounds fördern, die neue Wege in der Musikproduktion und -komposition eröffnen.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 8.5L4 4M8.5 8.5L12.5 8.5M8.5 8.5L8.5 12.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 15.5L4 20M8.5 15.5L12.5 15.5M8.5 15.5L8.5 11.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 15.5L20 20M15.5 15.5L11.5 15.5M15.5 15.5L15.5 11.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 8.5L20 4M15.5 8.5L11.5 8.5M15.5 8.5L15.5 12.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const Vision: React.FC = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="vision" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <Container>
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Unsere Vision</span>
          <h2 className="text-3xl md:text-4xl font-bold">Die Zukunft von echoniq</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Wir blicken in eine Zukunft, in der Musik Grenzen überschreitet und Menschen auf neue
            Art und Weise verbindet. Dies ist unsere Vision für die kommenden Jahre.
          </p>
        </motion.div>

        {/* Main vision statement */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="bg-gray-900/60 backdrop-blur-sm border border-primary/20 rounded-lg p-8 mb-16 mx-auto max-w-3xl text-center"
        >
          <h3 className="text-2xl font-bold mb-6">
            "Wir wollen die Musikindustrie demokratisieren und eine nachhaltige, künstlerzentrierte
            Zukunft schaffen, in der musikalische Innovation und kultureller Austausch florieren."
          </h3>
          <p className="text-gray-300 italic">- Alex Grey, Gründer von echoniq</p>
        </motion.div>

        {/* Vision pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {visionPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              initial="hidden"
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                },
              }}
              className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 flex items-start gap-4"
            >
              <div className="p-3 bg-gray-800 rounded-md text-primary mt-1 shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-gray-300">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future plans */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay: 0.6,
            },
          }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Unsere Pläne für die Zukunft</h3>

          <div className="space-y-4">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold text-primary mb-2">2025: Expansion des Studios</h4>
              <p className="text-gray-300">
                Wir planen den Ausbau unserer Studiokapazitäten mit zusätzlichen Aufnahmeräumen und
                modernster Ausrüstung, um noch mehr Künstlern hochwertige Produktionsmöglichkeiten
                zu bieten.
              </p>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold text-primary mb-2">2026: Internationale Künstlerresidenz</h4>
              <p className="text-gray-300">
                Die Einführung eines Residenzprogramms für internationale Künstler, um kulturellen
                Austausch zu fördern und kollaborative Musik-Projekte zu ermöglichen.
              </p>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold text-primary mb-2">2027: Digitale Plattform</h4>
              <p className="text-gray-300">
                Entwicklung einer eigenen digitalen Plattform, die Künstlern direkte Verbindungen zu
                ihrem Publikum ermöglicht und innovative Monetarisierungsmodelle bietet.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.8,
              delay: 0.8,
            },
          }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-xl text-gray-300 italic">
            "Die Zukunft der Musik liegt nicht nur in der Technologie, sondern in der Art und Weise,
            wie wir Menschen durch Klang verbinden – über alle Grenzen hinweg."
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Vision;
