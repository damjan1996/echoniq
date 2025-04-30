'use client';

import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, Music } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const footerVariants = {
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
    { icon: <Youtube className="h-5 w-5" />, href: '#', label: 'YouTube' },
    { icon: <Music className="h-5 w-5" />, href: '#', label: 'Spotify' },
  ];

  const footerLinks = [
    {
      title: 'Unternehmen',
      links: [
        { label: 'Über uns', href: '/about' },
        { label: 'Team', href: '/team' },
        { label: 'Karriere', href: '/careers' },
        { label: 'Kontakt', href: '/contact' },
      ],
    },
    {
      title: 'Musik',
      links: [
        { label: 'Künstler', href: '/artists' },
        { label: 'Releases', href: '/releases' },
        { label: 'Events', href: '/events' },
        { label: 'Playlists', href: '/playlists' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Studio', href: '/studio' },
        { label: 'Produktion', href: '/production' },
        { label: 'Mastering', href: '/mastering' },
        { label: 'Distribution', href: '/distribution' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0E0F0F] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              echoniq
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Ein Musiklabel, das Kreativität fördert, Künstler unterstützt und innovative
              Klangwelten erschafft.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((section, i) => (
            <motion.div key={i} variants={itemVariants}>
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-[#2A2A2A] pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} echoniq. Alle Rechte vorbehalten.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 text-sm hover:text-white transition-colors"
              >
                Datenschutz
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 text-sm hover:text-white transition-colors"
              >
                AGB
              </Link>
              <Link
                href="/imprint"
                className="text-gray-500 text-sm hover:text-white transition-colors"
              >
                Impressum
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
