import { motion } from 'framer-motion';
import { Instagram, Youtube, Music2, Facebook, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { footerNavigation, socialLinks } from '@/config/menu';

import { Logo } from './logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Helper function to render social icons
  const renderSocialIcon = (id: string, size = 20) => {
    switch (id) {
      case 'instagram':
        return <Instagram size={size} />;
      case 'spotify':
        // Use Music2 as a replacement for Spotify
        return <Music2 size={size} className="text-green-500" />;
      case 'youtube':
        return <Youtube size={size} />;
      case 'soundcloud':
        return <Music2 size={size} />;
      case 'facebook':
        return <Facebook size={size} />;
      default:
        return <ExternalLink size={size} />;
    }
  };

  // Open cookie settings modal
  const openCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <footer className="bg-background-secondary border-t border-neutral-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo and description */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Logo variant="footer" className="mb-6" />
            <p className="text-text-secondary text-sm mb-6 max-w-md">
              echoniq ist ein unabhängiges Musiklabal und Tonstudio in Berlin, das aufstrebenden
              Künstlern eine kreative Plattform bietet. Wir unterstützen Musiker bei ihrer
              künstlerischen Entwicklung mit professioneller Produktion, Distribution und Promotion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-tertiary hover:text-accent-500 transition-colors duration-300"
                  aria-label={link.label}
                >
                  {renderSocialIcon(link.id)}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation sections */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              {footerNavigation.label.title}
            </h3>
            <ul className="space-y-3">
              {footerNavigation.label.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-text-tertiary hover:text-accent-500 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              {footerNavigation.studio.title}
            </h3>
            <ul className="space-y-3">
              {footerNavigation.studio.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-text-tertiary hover:text-accent-500 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              {footerNavigation.contact.title}
            </h3>
            <ul className="space-y-3">
              {footerNavigation.contact.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-text-tertiary hover:text-accent-500 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mt-8 mb-4">
              {footerNavigation.legal.title}
            </h3>
            <ul className="space-y-3">
              {footerNavigation.legal.items.map((item) => (
                <li key={item.id}>
                  {item.id === 'cookies' ? (
                    <button
                      onClick={openCookieSettings}
                      className="text-text-tertiary hover:text-accent-500 transition-colors text-sm cursor-pointer"
                      type="button"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-text-tertiary hover:text-accent-500 transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-tertiary"
        >
          <p className="mb-4 md:mb-0">© {currentYear} echoniq. Alle Rechte vorbehalten.</p>
          <div className="flex items-center">
            <span className="ml-1 hidden sm:inline">Crafted with</span>
            <span className="mx-1 text-red-500">♥</span>
            <span>in Berlin</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
