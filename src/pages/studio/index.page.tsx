import { NextPage } from 'next';
import React, { useRef } from 'react';

import { SEO } from '@/components/common/seo';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { BookingForm } from '@/components/studio/BookingForm';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

import { Hero, Services, Equipment, Pricing } from '../../components/studio/components';

const StudioPage: NextPage = () => {
  const bookingRef = useRef<HTMLDivElement>(null);

  // Removed unused function scrollToBooking and replaced with inline usage where needed

  return (
    <>
      <SEO
        title="Tonstudio | echoniq"
        description="Professionelles Tonstudio für Recording, Mixing, Mastering und Musikproduktion. State-of-the-Art Equipment und erfahrene Produzenten für deinen Sound."
      />
      <Header />
      <main className="bg-black text-white">
        <Hero />
        <Services />
        <Equipment />
        <Pricing />

        {/* Booking Section */}
        <section id="booking" ref={bookingRef} className="py-20 bg-black">
          <Container>
            <div className="text-center mb-12">
              <span className="text-primary font-medium mb-2 block">Buche jetzt</span>
              <h2 className="text-3xl md:text-4xl font-bold">Studiotermin anfragen</h2>
              <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                Fülle das folgende Formular aus, um einen Termin in unserem Studio anzufragen. Wir
                melden uns innerhalb von 24 Stunden bei dir, um die Details zu besprechen.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <BookingForm
                services={[
                  {
                    id: 'recording',
                    name: 'Recording & Aufnahme',
                    price: '60',
                    duration: 'pro Stunde',
                  },
                  { id: 'mixing', name: 'Mixing & Mastering', price: '80', duration: 'pro Stunde' },
                  { id: 'production', name: 'Musikproduktion', price: '400', duration: 'pro Tag' },
                  { id: 'session', name: 'Session-Musiker', price: '300', duration: 'pro Tag' },
                ]}
              />
            </div>
          </Container>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <Container>
            <div className="text-center mb-12">
              <span className="text-primary font-medium mb-2 block">Erfahrungen</span>
              <h2 className="text-3xl md:text-4xl font-bold">Was unsere Kunden sagen</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-300 italic mb-4">
                  "Die Zusammenarbeit mit echoniq war eine der besten Entscheidungen für meine
                  Musik. Das Team hat ein unglaubliches Gespür für Sound und hat meinen Songs genau
                  den Feinschliff gegeben, den sie brauchten."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div>
                    <p className="font-medium">Laura K.</p>
                    <p className="text-sm text-gray-400">Singer-Songwriter</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-300 italic mb-4">
                  "Als Band waren wir auf der Suche nach dem perfekten Sound für unser Album. Bei
                  echoniq haben wir nicht nur Top-Equipment und Expertise gefunden, sondern auch
                  eine kreative Atmosphäre, die uns inspiriert hat."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-medium">Soundwave Collective</p>
                    <p className="text-sm text-gray-400">Indie-Rock Band</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-300 italic mb-4">
                  "Als Produzent habe ich schon in vielen Studios gearbeitet, aber echoniq bietet
                  einen besonderen Mix aus technischer Präzision und kreativem Freiraum. Das Team
                  versteht es, jeden Künstler individuell zu betreuen."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-medium">Max D.</p>
                    <p className="text-sm text-gray-400">Produzent & DJ</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

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
                  Wie lange im Voraus sollte ich einen Termin buchen?
                </h3>
                <p className="text-gray-300">
                  Wir empfehlen, mindestens 2-3 Wochen im Voraus zu buchen, besonders für längere
                  Sessions oder wenn du an Wochenenden aufnehmen möchtest. Für kurzfristige Anfragen
                  kannst du uns gerne kontaktieren – manchmal haben wir auch spontan freie Termine.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Muss ich eigene Instrumente mitbringen?</h3>
                <p className="text-gray-300">
                  Nein, das ist nicht zwingend erforderlich. Wir verfügen über eine umfangreiche
                  Sammlung an hochwertigen Instrumenten, die du nutzen kannst. Natürlich kannst du
                  auch deine eigenen Instrumente mitbringen, wenn du mit diesen vertraut bist.
                  Informiere uns einfach im Voraus über deine Bedürfnisse.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Wie läuft der Mixing- und Mastering-Prozess ab?
                </h3>
                <p className="text-gray-300">
                  Nach den Aufnahmen erstellen wir einen ersten Mix, den wir dir zur Durchsicht
                  zusenden. Du hast dann die Möglichkeit, Feedback zu geben und Änderungswünsche
                  mitzuteilen. Nach Abschluss des Mixing-Prozesses folgt das Mastering, bei dem der
                  Song seinen finalen Schliff erhält. Auch hier hast du die Möglichkeit für Feedback
                  und Anpassungen.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Bietet ihr auch Remote-Sessions an?</h3>
                <p className="text-gray-300">
                  Ja, wir bieten auch Remote-Sessions an. Du kannst deine Tracks von überall auf der
                  Welt einsenden, und wir kümmern uns um Mixing, Mastering oder zusätzliche
                  Produktionsarbeiten. Die Kommunikation erfolgt dabei über Video-Calls, und wir
                  senden dir regelmäßige Updates zu deinem Projekt.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Was passiert mit meinen Aufnahmen nach der Session?
                </h3>
                <p className="text-gray-300">
                  Nach Abschluss des Projekts erhältst du alle fertigen Dateien in den vereinbarten
                  Formaten. Die Rohdaten deiner Aufnahmen werden für mindestens sechs Monate bei uns
                  gesichert, falls du später Änderungen vornehmen möchtest. Auf Wunsch können wir
                  sie auch länger archivieren.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-300 mb-6">
                Hast du weitere Fragen oder möchtest du mehr über unsere Services erfahren?
              </p>
              <Button variant="primary" size="lg" href="/kontakt">
                Kontaktiere uns
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StudioPage;
