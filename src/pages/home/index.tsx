import { NextPage } from 'next';
import React from 'react';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Benefits,
  CTAForm,
  FeaturedArtists,
  Hero,
  LatestReleases,
  StudioIntro,
} from '../../components/home/components';

// Interface for SEO component props
interface SEOProps {
  title: string;
  description: string;
}

// Simple SEO component implementation
const SEO: React.FC<SEOProps> = () => {
  // In a real implementation, this would add meta tags to the document head
  // For now, this is just a placeholder to fix the type errors
  return null;
};

const HomePage: NextPage = () => {
  return (
    <>
      <SEO
        title="echoniq | Innovative Musikproduktion & Label"
        description="echoniq ist ein modernes Musiklabel mit Fokus auf elektronische Musik, Künstlerentwicklung und professioneller Studioproduktion."
      />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <FeaturedArtists />
        <LatestReleases />
        <StudioIntro />
        <CTAForm />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;