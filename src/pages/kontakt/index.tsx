import { NextPage } from 'next';
import React from 'react';

import { SEO } from '@/components/common/seo';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Hero, ContactForm, StudioLocation } from '../../components/kontakt/components';

const KontaktPage: NextPage = () => {
  return (
    <>
      <SEO
        title="Kontakt | echoniq"
        description="Kontaktiere echoniq - dein Partner für Musikproduktion, Label und Studio in Berlin."
      />
      <Header />
      <main className="bg-black text-white pt-20">
        <Hero />

        <section className="py-16 bg-gray-900">
          <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactForm />
            <StudioLocation />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default KontaktPage;