import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Container } from '@/components/ui/container';

// Timeline events
const timelineEvents = [
  {
    year: '2019',
    title: 'Die Idee entsteht',
    description:
      'Alex Grey gründet echoniq zunächst als kleines Heimstudio-Projekt mit dem Ziel, elektronische Musik zu produzieren und aufstrebenden Künstlern eine Plattform zu bieten.',
    image: '/images/ueber-uns/history-2019.jpg',
  },
  {
    year: '2020',
    title: 'Erste Veröffentlichungen',
    description:
      'Die ersten Releases unter dem echoniq Label erscheinen. Mit einer Mischung aus Electronic, Ambient und experimentellen Sounds beginnt das Label, Aufmerksamkeit zu erregen.',
    image: '/images/ueber-uns/history-2020.jpg',
  },
  {
    year: '2021',
    title: 'Das Team wächst',
    description:
      "Eduardo 'EDU' García stößt zum Label hinzu und bringt lateinamerikanische Einflüsse mit. Das Repertoire wird vielfältiger und echoniq beginnt, sich als vielseitiges Label zu etablieren.",
    image: '/images/ueber-uns/history-2021.jpg',
  },
  {
    year: '2022',
    title: 'Das Studio expandiert',
    description:
      'Mit wachsendem Erfolg zieht echoniq in größere Räumlichkeiten und eröffnet ein professionelles Tonstudio, das auch externen Künstlern zur Verfügung steht.',
    image: '/images/ueber-uns/history-2022.jpg',
  },
  {
    year: '2023',
    title: 'Internationale Künstler',
    description:
      'Das Label gewinnt internationale Aufmerksamkeit und nimmt Künstler aus verschiedenen Ländern unter Vertrag. Die Community rund um echoniq wächst stetig.',
    image: '/images/ueber-uns/history-2023.jpg',
  },
  {
    year: '2024',
    title: 'Neue Horizonte',
    description:
      'Heute ist echoniq mehr als nur ein Label – es ist eine kreative Gemeinschaft für Künstler, Produzenten und Musikliebhaber, die gemeinsam die Grenzen der Musik verschieben wollen.',
    image: '/images/ueber-uns/history-2024.jpg',
  },
];

// Timeline event component
type TimelineEventProps = {
  event: (typeof timelineEvents)[0];
  index: number;
  isLast: boolean;
};

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, index, isLast }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={`relative ${isLast ? '' : 'pb-16'}`}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute top-16 bottom-0 left-12 md:left-1/2 w-px bg-gradient-to-b from-primary/80 to-primary/20 ml-3 md:ml-0 md:-translate-x-px"></div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Content */}
        <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-black rounded-full font-bold text-sm mr-4 shrink-0 z-10">
              {index + 1}
            </div>
            <div>
              <span className="text-primary font-medium text-lg">{event.year}</span>
              <h3 className="text-2xl font-bold">{event.title}</h3>
            </div>
          </div>
          <p className="text-gray-300 ml-12">{event.description}</p>
        </div>

        {/* Image */}
        <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform hover:scale-105 duration-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const LabelHistory: React.FC = () => {
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
    <section id="history" className="py-20 bg-black text-white">
      <Container>
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Unsere Geschichte</span>
          <h2 className="text-3xl md:text-4xl font-bold">Der Weg von echoniq</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Von bescheidenen Anfängen bis heute – erfahre mehr über die Entstehung und Entwicklung
            unseres Labels und die wichtigsten Meilensteine auf unserem Weg.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-0 px-4">
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isLast={index === timelineEvents.length - 1}
            />
          ))}
        </div>

        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Die Geschichte geht weiter</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Die Reise von echoniq ist noch lange nicht zu Ende. Mit jedem neuen Künstler, jedem
            neuen Release und jeder neuen Idee schreiben wir weiter an unserer Geschichte – und wir
            laden dich ein, Teil davon zu werden.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default LabelHistory;
