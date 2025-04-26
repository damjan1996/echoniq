import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';

import { mainNavigation, quickActions } from '@/config/menu';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useScroll } from '@/hooks/use-scroll';

import { Logo } from './logo';
import { MegaMenu } from './mega-menu';
import { MobileNavigation } from './mobile-navigation';
import { Navigation } from './navigation';

export const Header: React.FC = () => {
  const router = useRouter();
  const { scroll } = useScroll();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close mega menu when mobile menu is toggled
    if (activeMegaMenu) setActiveMegaMenu(null);
  };

  // Toggle mega menu
  const toggleMegaMenu = (id: string) => {
    if (isMobile) return;

    if (activeMegaMenu === id) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(id);
    }
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mega-menu') && !target.closest('.nav-item')) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setActiveMegaMenu(null);
      setSearchOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  // Handle scroll position to fix header
  useEffect(() => {
    let scrollPosition = 0;

    if (scroll && typeof scroll === 'object' && 'y' in scroll) {
      scrollPosition = Number(scroll.y);
    } else if (typeof scroll === 'number') {
      scrollPosition = scroll;
    }

    setIsHeaderFixed(scrollPosition > 50);
  }, [scroll]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      // Small delay to ensure the element is in the DOM
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
  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const searchVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.header
        className={`py-4 w-full z-50 transition-all duration-300 ${
          isHeaderFixed
            ? 'fixed top-0 bg-background-primary/90 backdrop-blur-md shadow-md'
            : 'absolute'
        }`}
        initial="initial"
        animate="animate"
        variants={headerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo variant="header" />
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:block">
              <Navigation
                items={mainNavigation}
                activeMegaMenu={activeMegaMenu}
                toggleMegaMenu={toggleMegaMenu}
              />
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search trigger */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="Suche öffnen"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Quick actions (desktop) */}
              {!isMobile &&
                quickActions.map((action) => (
                  <a
                    key={action.id}
                    href={action.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      action.highlight
                        ? 'bg-accent-500 hover:bg-accent-600 text-text-inverted'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-text-primary'
                    } transition-colors`}
                  >
                    {action.label}
                  </a>
                ))}

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-text-tertiary hover:text-text-primary transition-colors"
                aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                  className="container mx-auto p-4 bg-background-secondary rounded-lg shadow-lg"
                >
                  <div className="flex items-center">
                    <Search className="w-5 h-5 text-text-tertiary mr-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Künstler, Musik oder Blog durchsuchen..."
                      className="flex-1 bg-transparent border-none text-text-primary placeholder-text-tertiary focus:outline-none"
                      ref={searchInputRef}
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                      aria-label="Suche schließen"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile navigation */}
      <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Mega menu for desktop */}
      <MegaMenu activeMenuId={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />

      {/* Spacer for fixed header */}
      {isHeaderFixed && <div className="h-20" />}
    </>
  );
};

export default Header;
