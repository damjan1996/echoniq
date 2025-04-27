import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

// Pricing tiers data
const pricingTiers = [
  {
    name: 'Basic',
    price: '60',
    duration: 'pro Stunde',
    description: 'Die perfekte Option für einfache Aufnahmen und Mix-Sessions.',
    features: [
      'Nutzung des Aufnahmeraums',
      'Audio-Engineer (1 Person)',
      'Mixing der aufgenommenen Tracks',
      'Basis-Equipment inkludiert',
      'Digitales Master (MP3, WAV)',
      'Bis zu 8 Spuren gleichzeitig',
    ],
    color: 'from-blue-600/20 to-blue-400/20',
    popular: false,
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '400',
    duration: 'pro Tag (8h)',
    description: 'Umfassende Produktion für Künstler und Bands mit professionellen Ansprüchen.',
    features: [
      'Exklusivnutzung des Hauptstudios',
      'Erfahrener Produzent & Engineer',
      'Komplettes Equipment (Mics, Instrumente)',
      'Professionelles Mixing & Mastering',
      'Unbegrenzte Anzahl von Spuren',
      'Physische & digitale Master',
      'Kleine Snacks & Getränke inklusive',
    ],
    color: 'from-primary/30 to-purple-600/30',
    popular: true,
    buttonVariant: 'primary' as const,
  },
  {
    name: 'Premium',
    price: '1.500',
    duration: 'Projektbasiert',
    description: 'Das Komplettpaket für dein Album oder EP mit allem, was deine Musik verdient.',
    features: [
      'Alles aus dem Pro-Paket',
      'Mehrere Aufnahmetage (bis zu 5)',
      'Executive Producer Support',
      'Arrangement & Musikproduktion',
      'Session-Musiker (nach Bedarf)',
      'Distribution auf allen Plattformen',
      'Promo-Material (Cover, Pressefotos)',
      'Langfristige Speicherung der Projektdateien',
    ],
    color: 'from-amber-600/20 to-amber-400/20',
    popular: false,
    buttonVariant: 'outline' as const,
  },
];

// Pricing card component
type PricingCardProps = {
  tier: (typeof pricingTiers)[0];
  index: number;
};

const PricingCard: React.FC<PricingCardProps> = ({ tier, index }) => {
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
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={`flex flex-col rounded-xl p-1 ${tier.popular ? 'bg-gradient-to-br from-primary to-purple-600' : ''}`}
    >
      <div
        className={`flex flex-col h-full p-6 md:p-8 bg-gray-900 rounded-lg ${tier.popular ? '' : 'border border-gray-800'}`}
      >
        {tier.popular && (
          <div className="px-3 py-1 text-xs font-medium bg-primary text-black rounded-full self-start mb-4">
            Beliebt
          </div>
        )}

        <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
        <div className="mb-4">
          <span className="text-3xl md:text-4xl font-bold">{tier.price}€</span>
          <span className="text-gray-400 ml-2">{tier.duration}</span>
        </div>
        <p className="text-gray-300 mb-6">{tier.description}</p>

        <ul className="mb-8 space-y-3 flex-grow">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start">
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
              <span className="ml-3 text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button href="#booking" variant={tier.buttonVariant} size="lg" className="w-full">
          Buchen
        </Button>
      </div>
    </motion.div>
  );
};

export const Pricing: React.FC = () => {
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
    <section id="pricing" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <Container>
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium mb-2 block">Preise</span>
          <h2 className="text-3xl md:text-4xl font-bold">Finde dein passendes Paket</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Wir bieten flexible Pakete für unterschiedliche Bedürfnisse und Budgets – von einzelnen
            Aufnahmestunden bis hin zu kompletten Albumproduktionen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>

        <div className="mt-12 bg-gray-900/60 backdrop-blur-sm rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Individuelle Anforderungen?</h3>
              <p className="text-gray-300 mb-6">
                Jedes Projekt ist einzigartig und benötigt möglicherweise eine maßgeschneiderte
                Lösung. Wir erstellen gerne ein individuelles Angebot, das deinen spezifischen
                Anforderungen entspricht.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
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
                  <span className="ml-3 text-gray-300">
                    Mischung aus Studio- und Remote-Produktion
                  </span>
                </li>
                <li className="flex items-start">
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
                  <span className="ml-3 text-gray-300">
                    Langfristige Zusammenarbeit für mehrere Projekte
                  </span>
                </li>
                <li className="flex items-start">
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
                  <span className="ml-3 text-gray-300">
                    Spezielle Anforderungen an Equipment oder Personal
                  </span>
                </li>
              </ul>
            </div>
            {/* Let's simplify by removing the ServiceCTA component entirely and replacing it with our own direct implementation */}
            <div className="bg-gradient-to-br from-purple-900/40 to-primary/40 rounded-lg p-6 md:p-8">
              <h4 className="text-xl font-bold mb-3">Individuelles Angebot anfordern</h4>
              <p className="text-gray-300 mb-6">
                Erzähle uns von deinem Projekt und wir erstellen dir ein maßgeschneidertes Angebot.
              </p>
              <Button href="/kontakt" variant="primary" size="lg" className="w-full">
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
