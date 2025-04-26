import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
// Replace the imports with local implementations
// import { Header, Footer } from '@/components/layout';
// import { Container, Button } from '@/components/ui';
// import { SEO } from '@/components/common';

// Simple Header component implementation
const Header = () => {
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
              <Link href="/contact" className="hover:text-primary transition-colors">
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
const Footer = () => {
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
                <Link href="/about" className="hover:text-white transition-colors">
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
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
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

// SEO component props interface
interface SEOProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

// Simple SEO component implementation
const SEO: React.FC<SEOProps> = (_props) => {
  // In a real implementation, this would add meta tags to the document head
  // But for now, this is just a placeholder to fix the build
  return null;
};

// Container component props interface
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Simple Container component implementation
const Container: React.FC<ContainerProps> = ({ children, className = '', ...props }) => (
  <div className={`container mx-auto px-4 ${className}`} {...props}>
    {children}
  </div>
);

// Button component props interface
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: unknown;
}

// Simple Button component implementation
const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-600 text-white focus:ring-primary',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400',
    outline:
      'bg-transparent border border-gray-300 hover:bg-gray-100 text-white focus:ring-gray-400',
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

const ServerErrorPage: NextPage = () => {
  return (
    <>
      <SEO
        title="500 - Serverfehler | echoniq"
        description="Ein Serverfehler ist aufgetreten."
        noIndex={true}
      />
      <Header />
      <main className="bg-black text-white py-20 min-h-[70vh] flex items-center">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Animated SVG */}
            <div className="relative">
              <svg
                width="280"
                height="200"
                viewBox="0 0 280 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                {/* 5 */}
                <motion.path
                  d="M60 40H90V80H60V120H90C90 131.046 81.0457 140 70 140H60C48.9543 140 40 131.046 40 120V40H60Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />

                {/* 0 */}
                <motion.path
                  d="M110 60C110 48.9543 118.954 40 130 40H150C161.046 40 170 48.9543 170 60V120C170 131.046 161.046 140 150 140H130C118.954 140 110 131.046 110 120V60Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: 0.4,
                    ease: 'easeInOut',
                  }}
                />
                <motion.path
                  d="M130 60H150V120H130V60Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8,
                    ease: 'easeInOut',
                  }}
                />

                {/* 0 */}
                <motion.path
                  d="M190 60C190 48.9543 198.954 40 210 40H230C241.046 40 250 48.9543 250 60V120C250 131.046 241.046 140 230 140H210C198.954 140 190 131.046 190 120V60Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: 1.2,
                    ease: 'easeInOut',
                  }}
                />
                <motion.path
                  d="M210 60H230V120H210V60Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 1.6,
                    ease: 'easeInOut',
                  }}
                />

                {/* Server icon */}
                <motion.rect
                  x="100"
                  y="160"
                  width="80"
                  height="30"
                  rx="2"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                />
                <motion.rect
                  x="110"
                  y="170"
                  width="10"
                  height="4"
                  rx="1"
                  fill="#ec4899"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                />
                <motion.rect
                  x="130"
                  y="170"
                  width="10"
                  height="4"
                  rx="1"
                  fill="#ec4899"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.4 }}
                />
                <motion.rect
                  x="150"
                  y="170"
                  width="10"
                  height="4"
                  rx="1"
                  fill="#ec4899"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.6 }}
                />

                {/* Server connection lines */}
                <motion.path
                  d="M50 170 H90"
                  stroke="#ec4899"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <motion.path
                  d="M190 170 H230"
                  stroke="#ec4899"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 3.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </svg>
            </div>

            {/* Error text */}
            <div className="text-center lg:text-left max-w-md">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Serverfehler
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="text-gray-300 mb-8"
              >
                Es tut uns leid, aber es ist ein Fehler auf unserem Server aufgetreten. Unser Team
                wurde informiert und arbeitet an einer Lösung. Bitte versuche es später erneut.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.4 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link href="/">
                  <Button variant="primary" size="lg">
                    Zur Startseite
                  </Button>
                </Link>

                <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
                  Seite neu laden
                </Button>
              </motion.div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ServerErrorPage;
