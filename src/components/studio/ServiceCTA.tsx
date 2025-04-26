import { motion } from 'framer-motion';
import { Headphones, Mic, Music, Disc } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { CTAButton } from '@/components/common/cta-button';
import { SectionTitle } from '@/components/common/section-title';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'recording' | 'mixing' | 'mastering' | 'production';
}

interface ServiceCTAProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  services: Service[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = 'Professionelle Studioproduktion',
  subtitle = 'Wir bieten dir alle Services für deine Musikproduktion aus einer Hand',
  backgroundImage = '/images/studio/studio-background.jpg',
  services,
  primaryButtonText = 'Studio buchen',
  primaryButtonLink = '/studio#booking',
  secondaryButtonText = 'Alle Services',
  secondaryButtonLink = '/studio#services',
  className = '',
}) => {
  // Helper function to render the appropriate icon
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'recording':
        return <Mic className="h-8 w-8 text-accent-500" />;
      case 'mixing':
        return <Music className="h-8 w-8 text-accent-500" />;
      case 'mastering':
        return <Disc className="h-8 w-8 text-accent-500" />;
      case 'production':
        return <Headphones className="h-8 w-8 text-accent-500" />;
      default:
        return <Music className="h-8 w-8 text-accent-500" />;
    }
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

  return (
    <motion.section
      className={`relative py-20 overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Studio background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background-primary/80 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
          <SectionTitle
            title={title}
            subtitle={subtitle}
            align="center"
            size="lg"
            withAccent={true}
            accentText="echoniq Studio"
          />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-background-secondary/90 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="mb-4">{renderIcon(service.icon)}</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{service.title}</h3>
              <p className="text-text-secondary text-sm">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <CTAButton href={primaryButtonLink} variant="primary" size="lg" icon="arrow">
            {primaryButtonText}
          </CTAButton>
          <CTAButton href={secondaryButtonLink} variant="outline" size="lg" icon="none">
            {secondaryButtonText}
          </CTAButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServiceCTA;
