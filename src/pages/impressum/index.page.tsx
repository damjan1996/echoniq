import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
// Create local implementations of components instead of importing
// import { Footer, Header } from '@/components/layout';
// import { Container } from '@/components/ui';
// import { SEO } from '@/components/common';

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

// Simple Header component implementation
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-white font-bold text-xl">echoniq</div>
        <nav>
          <ul className="flex gap-6 text-white">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/artists" className="hover:text-primary transition-colors">
                Künstler
              </Link>
            </li>
            <li>
              <Link href="/music" className="hover:text-primary transition-colors">
                Musik
              </Link>
            </li>
            <li>
              <Link href="/studio" className="hover:text-primary transition-colors">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-primary transition-colors">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Simple Footer component implementation
const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">echoniq</h3>
            <p className="text-gray-400">
              Ein modernes Musiklabel mit Fokus auf elektronische Musik, Künstlerentwicklung und
              professioneller Studioproduktion.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/ueber-uns" className="hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-white transition-colors">
                  Künstler
                </Link>
              </li>
              <li>
                <Link href="/music" className="hover:text-white transition-colors">
                  Musik
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white transition-colors">
                  Studio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@echoniq.de</li>
              <li>+49 (0) 123 456789</li>
              <li>Musterstraße 123, 12345 Berlin</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Social Media</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/echoniq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://twitter.com/echoniq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="https://youtube.com/echoniq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} echoniq. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

// Interface for SEO props
interface SEOProps {
  title: string;
  description: string;
}

// Simple SEO component implementation
const SEO: React.FC<SEOProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

const ImpressumPage: NextPage = () => {
  return (
    <>
      <SEO
        title="Impressum | echoniq"
        description="Impressum der echoniq Musikproduktion und Tonstudio."
      />
      <Header />
      <main className="bg-black text-white py-20">
        <Container>
          <h1 className="text-4xl font-bold mb-10">Impressum</h1>

          <div className="prose prose-invert max-w-none mt-8">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              echoniq GmbH
              <br />
              Musterstraße 123
              <br />
              12345 Musterstadt
              <br />
              Deutschland
            </p>

            <h3>Kontakt</h3>
            <p>
              Telefon: +49 123 4567890
              <br />
              E-Mail: info@echoniq.de
            </p>

            <h3>Vertreten durch</h3>
            <p>
              Alex Müller (Geschäftsführer)
              <br />
              Eduardo García (Geschäftsführer)
            </p>

            <h3>Handelsregister</h3>
            <p>
              Registergericht: Amtsgericht Musterstadt
              <br />
              Registernummer: HRB 12345
            </p>

            <h3>Umsatzsteuer-ID</h3>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              DE123456789
            </p>

            <h2>Redaktionell verantwortlich</h2>
            <p>
              Alex Müller
              <br />
              Musterstraße 123
              <br />
              12345 Musterstadt
              <br />
              Deutschland
            </p>

            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2>Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
              entfernen.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
              der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
              und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
              dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
              werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>

            <p>
              Quelle:{' '}
              <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer">
                eRecht24
              </a>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ImpressumPage;
