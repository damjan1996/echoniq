'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

// Navigation Links
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/artists', label: 'Künstler' },
  { href: '/releases', label: 'Releases' },
  { href: '/studio', label: 'Studio' },
  { href: '/about', label: 'Über uns' },
  { href: '/contact', label: 'Kontakt' },
];

export function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
      setSearchOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const searchVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            echoniq
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.div key={link.href} custom={i} variants={linkVariants}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    router.pathname === link.href ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Suche öffnen"
            >
              <Search className="w-5 h-5" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-5 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Anmelden
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-white focus:outline-none"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="absolute left-0 right-0 top-full mt-2 px-4"
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="container mx-auto p-4 bg-[#0E0F0F] rounded-lg shadow-lg"
              >
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Künstler, Musik oder Blog durchsuchen..."
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                    ref={searchInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Suche schließen"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-50 bg-black flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="text-2xl font-bold tracking-tighter">
                echoniq
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 mt-10">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={mobileLinkVariants}>
                  <Link
                    href={link.href}
                    className={`text-xl font-medium transition-colors ${
                      router.pathname === link.href
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.button
              variants={mobileLinkVariants}
              custom={navLinks.length}
              className="mt-auto mb-10 px-5 py-3 border border-white/20 rounded-full text-base font-medium hover:bg-white/10 transition-colors"
            >
              Anmelden
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      {isScrolled && <div className="h-20" />}
    </>
  );
}

export default Header;
