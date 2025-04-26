import { motion } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

import { CTAButton } from '@/components/common/cta-button';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  isPopular?: boolean;
  features: {
    included: string[];
    excluded: string[];
  };
}

interface PricingTableProps {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
  scrollToBookingId?: string;
  className?: string;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  tiers,
  title = 'Unsere Studio-Pakete',
  subtitle = 'Wähle das passende Paket für dein Projekt',
  scrollToBookingId,
  className = '',
}) => {
  const [showAllFeatures, setShowAllFeatures] = useState<Record<string, boolean>>({});

  // Toggle show all features for a specific tier
  const toggleShowAllFeatures = (tierId: string) => {
    setShowAllFeatures((prev) => ({
      ...prev,
      [tierId]: !prev[tierId],
    }));
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      className={`py-16 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{title}</h2>
          <p className="text-text-secondary">{subtitle}</p>
        </motion.div>

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover="hover"
              className={`relative rounded-2xl overflow-hidden
                ${
                  tier.isPopular
                    ? 'bg-accent-500/10 border border-accent-500/30'
                    : 'bg-background-secondary border border-neutral-800'
                }
              `}
              transition={{ delay: index * 0.1 }}
            >
              {/* Popular badge */}
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-accent-500 text-white py-1 px-4 text-sm font-medium rounded-bl-lg">
                  Beliebt
                </div>
              )}

              {/* Tier header */}
              <div className="p-6 border-b border-neutral-800">
                <h3
                  className={`text-xl font-bold mb-2 ${tier.isPopular ? 'text-accent-500' : 'text-text-primary'}`}
                >
                  {tier.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{tier.description}</p>

                <div className="flex items-baseline mb-1">
                  <span className="text-3xl font-bold text-text-primary">{tier.price}</span>
                  {tier.duration && (
                    <span className="ml-2 text-text-tertiary">/{tier.duration}</span>
                  )}
                </div>
              </div>

              {/* Features list */}
              <div className="p-6">
                <h4 className="font-medium text-text-primary mb-4">Im Paket enthalten:</h4>

                <ul className="space-y-3 mb-6">
                  {/* Always show included features, or limit to 4 if not expanded */}
                  {tier.features.included
                    .slice(0, showAllFeatures[tier.id] ? undefined : 4)
                    .map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                </ul>

                {/* Excluded features (only show if expanded) */}
                {showAllFeatures[tier.id] && tier.features.excluded.length > 0 && (
                  <>
                    <h4 className="font-medium text-text-primary mb-4">Nicht enthalten:</h4>
                    <ul className="space-y-3 mb-6">
                      {tier.features.excluded.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-text-tertiary text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Show more/less toggle */}
                {(tier.features.included.length > 4 || tier.features.excluded.length > 0) && (
                  <button
                    onClick={() => toggleShowAllFeatures(tier.id)}
                    className="flex items-center text-sm text-accent-500 hover:text-accent-400 transition-colors mb-6"
                  >
                    <span>{showAllFeatures[tier.id] ? 'Weniger anzeigen' : 'Mehr anzeigen'}</span>
                    {showAllFeatures[tier.id] ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </button>
                )}

                {/* CTA Button */}
                <CTAButton
                  href={scrollToBookingId ? `#${scrollToBookingId}` : '/studio#booking'}
                  variant={tier.isPopular ? 'primary' : 'outline'}
                  size="md"
                  fullWidth
                  icon="arrow"
                >
                  {tier.isPopular ? 'Jetzt buchen' : 'Auswählen'}
                </CTAButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-text-tertiary text-sm">
            Alle Preise zzgl. MwSt. Individuelle Anfragen und spezielle Pakete auf Anfrage möglich.
          </p>
          <p className="text-text-tertiary text-sm mt-1">
            Für weitere Informationen kontaktiere uns unter{' '}
            <a
              href="mailto:studio@echoniq.de"
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              studio@echoniq.de
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingTable;
