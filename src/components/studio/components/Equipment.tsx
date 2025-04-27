import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
// Replace the import with local implementations
// import { Container, Tabs } from '@/components/ui';

// Interface for Container props
interface ContainerProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown; // Changed from any to unknown
}

// Simple Container component implementation
const Container: React.FC<ContainerProps> = ({ children, className = '', ...props }) => (
  <div className={`container mx-auto px-4 ${className}`} {...props}>
    {children}
  </div>
);

// Types for Tabs component
interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId: string;
  className?: string;
  tabContentClassName?: string;
  children: ReactNode;
}

// Simple Tabs component implementation
const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  className = '',
  tabContentClassName = '',
  children,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabId);

  // Filter children to only show content for active tab
  const activeContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.id === activeTab
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary -mb-px'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={tabContentClassName}>{activeContent}</div>
    </div>
  );
};

// Equipment categories and items
const equipmentData = [
  {
    id: 'recording',
    label: 'Recording-Gear',
    items: [
      {
        name: 'Universal Audio Apollo x8p',
        description: 'High-End Audio-Interface mit 8 Mic-Preamps und DSP-Prozessor.',
        image: '/images/studio/equipment/apollo-x8p.jpg',
      },
      {
        name: 'Neumann U87 AI',
        description: 'Legendäres Großmembran-Kondensatormikrofon für Gesang und Instrumente.',
        image: '/images/studio/equipment/neumann-u87.jpg',
      },
      {
        name: 'Shure SM7B',
        description: 'Dynamisches Mikrofon, ideal für Gesang, Broadcast und Instrumente.',
        image: '/images/studio/equipment/shure-sm7b.jpg',
      },
      {
        name: 'SSL Fusion',
        description: 'Analoger Stereo-Outboard-Prozessor für Färbung, Sättigung und Kompression.',
        image: '/images/studio/equipment/ssl-fusion.jpg',
      },
      {
        name: 'Avalon VT-737SP',
        description: 'Röhren-Channel-Strip mit Preamp, EQ und Kompressor.',
        image: '/images/studio/equipment/avalon-vt737.jpg',
      },
      {
        name: 'Adam Audio S3H',
        description: 'Hochauflösende Studiomonitore für präzises Abhören.',
        image: '/images/studio/equipment/adam-s3h.jpg',
      },
    ],
  },
  {
    id: 'instruments',
    label: 'Instrumente',
    items: [
      {
        name: 'Fender Stratocaster',
        description: 'Klassische E-Gitarre mit vielseitigem Sound.',
        image: '/images/studio/equipment/fender-strat.jpg',
      },
      {
        name: 'Gibson Les Paul Standard',
        description: 'Kraftvolle E-Gitarre mit reichem, sustainreichen Ton.',
        image: '/images/studio/equipment/gibson-lespaul.jpg',
      },
      {
        name: 'Fender Jazz Bass',
        description: 'Vielseitiger E-Bass mit klarem, definiertem Sound.',
        image: '/images/studio/equipment/fender-jazz.jpg',
      },
      {
        name: 'Nord Stage 3',
        description: 'Premium-Keyboard mit erstklassigen Piano-, Orgel- und Synth-Sounds.',
        image: '/images/studio/equipment/nord-stage.jpg',
      },
      {
        name: 'Roland TD-50',
        description: 'Hochwertiges elektronisches Drumset mit authentischem Spielgefühl.',
        image: '/images/studio/equipment/roland-td50.jpg',
      },
      {
        name: 'Moog Subsequent 37',
        description: 'Analoger Synthesizer mit kraftvollem, warmen Sound.',
        image: '/images/studio/equipment/moog-sub37.jpg',
      },
    ],
  },
  {
    id: 'software',
    label: 'Software & Plugins',
    items: [
      {
        name: 'Ableton Live 11 Suite',
        description: 'Kreative DAW für Musikproduktion, Live-Performance und Sound-Design.',
        image: '/images/studio/equipment/ableton-live.jpg',
      },
      {
        name: 'Pro Tools Ultimate',
        description: 'Industrie-Standard DAW für professionelles Recording und Mixing.',
        image: '/images/studio/equipment/pro-tools.jpg',
      },
      {
        name: 'Logic Pro X',
        description: 'Leistungsstarke DAW mit umfangreicher Sound-Bibliothek und Instrumenten.',
        image: '/images/studio/equipment/logic-pro.jpg',
      },
      {
        name: 'Fabfilter Pro Bundle',
        description: 'Hochwertige Mixing- und Mastering-Plugins für EQ, Kompression und mehr.',
        image: '/images/studio/equipment/fabfilter.jpg',
      },
      {
        name: 'Native Instruments Komplete 14',
        description: 'Umfassende Sammlung von Instrumenten und Effekten.',
        image: '/images/studio/equipment/ni-komplete.jpg',
      },
      {
        name: 'Waves Complete Bundle',
        description: 'Über 200 Audio-Plugins für Mixing, Mastering und Sound-Design.',
        image: '/images/studio/equipment/waves-bundle.jpg',
      },
    ],
  },
  {
    id: 'outboard',
    label: 'Outboard & Effekte',
    items: [
      {
        name: 'Universal Audio 1176LN',
        description: 'Klassischer FET-Kompressor für druckvolle, charakterstarke Kompression.',
        image: '/images/studio/equipment/ua-1176.jpg',
      },
      {
        name: 'Lexicon PCM96',
        description: 'Hochwertiger digitaler Hall-Prozessor mit vielseitigen Presets.',
        image: '/images/studio/equipment/lexicon-pcm96.jpg',
      },
      {
        name: 'Empirical Labs Distressor',
        description: 'Vielseitiger Kompressor mit einzigartigem Charakter.',
        image: '/images/studio/equipment/distressor.jpg',
      },
      {
        name: 'Manley Massive Passive',
        description: 'Röhren-EQ mit musikalischem, analogem Klangcharakter.',
        image: '/images/studio/equipment/manley-passive.jpg',
      },
      {
        name: 'SPL Tube Vitalizer MK2-T',
        description: 'Harmonischer Enhancer für mehr Brillanz und Tiefe im Mix.',
        image: '/images/studio/equipment/spl-vitalizer.jpg',
      },
      {
        name: 'Eventide H9000',
        description: 'Flaggschiff-Multi-Effektprozessor mit unzähligen Algorithmen.',
        image: '/images/studio/equipment/eventide-h9000.jpg',
      },
    ],
  },
];

// Equipment item component
type EquipmentItemProps = {
  name: string;
  description: string;
  image: string;
  index: number;
};

const EquipmentItem: React.FC<EquipmentItemProps> = ({ name, description, image, index }) => {
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

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="flex flex-col bg-gray-900/60 backdrop-blur-sm rounded-lg overflow-hidden"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform hover:scale-105 duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export const Equipment: React.FC = () => {
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
    <section id="equipment" className="py-20 bg-black text-white">
      <Container>
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium mb-2 block">State-of-the-Art</span>
          <h2 className="text-3xl md:text-4xl font-bold">Unser Equipment</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Das echoniq Studio ist mit hochwertigem, professionellem Equipment ausgestattet, um
            deinem Sound die bestmögliche Qualität zu verleihen.
          </p>
        </motion.div>

        <Tabs
          tabs={equipmentData.map((category) => ({
            id: category.id,
            label: category.label,
          }))}
          defaultTabId="recording"
          className="mb-8"
          tabContentClassName="pt-8"
        >
          {equipmentData.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {category.items.map((item, index) => (
                <EquipmentItem
                  key={`${category.id}-${index}`}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  index={index}
                />
              ))}
            </div>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            * Dies ist nur eine Auswahl unseres Equipments. Für spezielle Anfragen oder eine
            vollständige Liste, kontaktiere uns bitte direkt.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Equipment;
