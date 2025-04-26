import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { SEO } from '@/components/common/seo';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Container } from '@/components/ui/container';

import { Hero, Mission, TeamMembers, LabelHistory, Vision } from './components';

const UeberUnsPage: NextPage = () => {
  return (
    <>
      <SEO
        title="Über uns | echoniq"
        description="Lerne echoniq kennen - unser Team, unsere Geschichte, unsere Mission und Vision als innovatives Musiklabel und Studio."
      />
      <Header />
      <main className="bg-black text-white">
        <Hero />
        <Mission />
        <TeamMembers />
        <LabelHistory />
        <Vision />

        {/* FAQ Section */}
        <section className="py-20 bg-black">
          <Container>
            <div className="text-center mb-12">
              <span className="text-primary font-medium mb-2 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold">Häufig gestellte Fragen</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Wie kann ich mit echoniq zusammenarbeiten?
                </h3>
                <p className="text-gray-300">
                  Es gibt verschiedene Möglichkeiten: Als Künstler kannst du dich über unsere
                  Kontaktseite bewerben, unser Studio für Produktionen buchen oder als
                  Musikproduzent, Songwriter oder Session-Musiker mit unserem Team zusammenarbeiten.
                  Wir freuen uns immer über neue Talente und kreative Köpfe.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Welche Musikgenres werden bei echoniq veröffentlicht?
                </h3>
                <p className="text-gray-300">
                  Wir sind stilistisch offen und haben Künstler aus verschiedenen Genres unter
                  Vertrag – von elektronischer Musik über Latin-Pop bis hin zu experimentellen
                  Sounds. Wichtiger als das Genre ist uns die Qualität, Authentizität und
                  Innovationskraft der Musik.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Wie funktioniert der Signing-Prozess bei echoniq?
                </h3>
                <p className="text-gray-300">
                  Nachdem du uns deine Musik geschickt hast, hören wir uns diese sorgfältig an. Bei
                  Interesse laden wir dich zu einem persönlichen Gespräch ein, um deine Vision,
                  Ziele und Erwartungen kennenzulernen. Wir suchen nicht nur nach großartigem Sound,
                  sondern auch nach Künstlern, die zu unserer Philosophie und unserem Team passen.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Bietet echoniq auch Verlagsdienstleistungen an?
                </h3>
                <p className="text-gray-300">
                  Ja, für ausgewählte Künstler bieten wir auch Verlagsdienstleistungen an, darunter
                  die Verwaltung von Urheberrechten, Lizenzierung von Musik für Filme, Werbung und
                  andere Medien sowie Songwriting-Kooperationen. Sprich uns gerne darauf an, wenn du
                  mehr darüber erfahren möchtest.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Wie unterstützt echoniq seine Künstler über die Musikproduktion hinaus?
                </h3>
                <p className="text-gray-300">
                  Wir verstehen uns als ganzheitlicher Partner für unsere Künstler. Neben der
                  Musikproduktion bieten wir Unterstützung in den Bereichen Marketing, Promotion,
                  Social Media, Booking, Karriereplanung und Entwicklung einer persönlichen
                  künstlerischen Identität. Unser Ziel ist es, langfristige Karrieren aufzubauen,
                  nicht nur einzelne Releases zu veröffentlichen.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <Container>
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Werde Teil der echoniq-Familie
              </h2>
              <p className="text-gray-300 mb-8">
                Ob als Künstler, Musikproduzent oder Fan – wir freuen uns darauf, mit dir die
                Zukunft der Musik zu gestalten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Kontakt aufnehmen
                </Link>
                <Link
                  href="/music"
                  className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Musik entdecken
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UeberUnsPage;
