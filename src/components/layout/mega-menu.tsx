import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Music, Users, Headphones } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { mainNavigation } from '@/config/menu';

// Additional data for mega menu features
interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface MegaMenuProps {
  activeMenuId: string | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeMenuId, onClose }) => {
  const [featuredArtist, setFeaturedArtist] = useState<FeaturedItem | null>(null);
  const [featuredRelease, setFeaturedRelease] = useState<FeaturedItem | null>(null);
  const [featuredService, setFeaturedService] = useState<FeaturedItem | null>(null);

  // Find the active menu item
  const activeMenuItem = mainNavigation.find((item) => item.id === activeMenuId);

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    // This would typically be an API call to get featured items
    setFeaturedArtist({
      id: 'artist-1',
      title: 'Grey',
      description:
        'Produzent und Künstler mit Fokus auf elektronische Musik und innovative Sounddesigns.',
      image: '/images/artists/grey.jpg',
      link: '/artists/grey',
    });

    setFeaturedRelease({
      id: 'release-1',
      title: 'Nightfall EP',
      description: 'Die neueste EP von Grey erkundet die Grenzen zwischen Ambient und Techno.',
      image: '/images/releases/nightfall-ep.jpg',
      link: '/music/nightfall-ep',
    });

    setFeaturedService({
      id: 'service-1',
      title: 'Mixing & Mastering',
      description: 'Professionelles Mixing und Mastering für deinen perfekten Sound.',
      image: '/images/studio/mixing-service.jpg',
      link: '/studio#services',
    });
  }, []);

  // If no menu is active, don't render anything
  if (!activeMenuId || !activeMenuItem) return null;

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Render appropriate featured content based on active menu
  const renderFeaturedContent = () => {
    switch (activeMenuId) {
      case 'artists':
        return featuredArtist ? (
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold uppercase text-text-tertiary mb-3">
              Featured Artist
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-background-tertiary rounded-lg overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={featuredArtist.image}
                    alt={featuredArtist.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-text-primary">{featuredArtist.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{featuredArtist.description}</p>
                  <Link
                    href={featuredArtist.link}
                    className="inline-flex items-center mt-3 text-sm text-accent-500 hover:text-accent-400 transition-colors"
                  >
                    <span>Profil ansehen</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null;

      case 'music':
        return featuredRelease ? (
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold uppercase text-text-tertiary mb-3">
              Neueste Release
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-background-tertiary rounded-lg overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={featuredRelease.image}
                    alt={featuredRelease.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-text-primary">{featuredRelease.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{featuredRelease.description}</p>
                  <Link
                    href={featuredRelease.link}
                    className="inline-flex items-center mt-3 text-sm text-accent-500 hover:text-accent-400 transition-colors"
                  >
                    <span>Release anhören</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null;

      case 'studio':
        return featuredService ? (
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold uppercase text-text-tertiary mb-3">
              Service Highlight
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-background-tertiary rounded-lg overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={featuredService.image}
                    alt={featuredService.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-text-primary">{featuredService.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{featuredService.description}</p>
                  <Link
                    href={featuredService.link}
                    className="inline-flex items-center mt-3 text-sm text-accent-500 hover:text-accent-400 transition-colors"
                  >
                    <span>Service entdecken</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  // Get appropriate icon for menu category
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'artists':
        return <Users className="w-5 h-5 mr-3 text-accent-500" />;
      case 'music':
        return <Music className="w-5 h-5 mr-3 text-accent-500" />;
      case 'studio':
        return <Headphones className="w-5 h-5 mr-3 text-accent-500" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {activeMenuId && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Mega menu panel */}
          <motion.div
            className="absolute left-0 right-0 mt-0 bg-background-secondary border-t border-b border-neutral-800 shadow-xl z-40 mega-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Menu items */}
                <div className="md:col-span-2 lg:col-span-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Menu header */}
                    <div className="sm:col-span-2 lg:col-span-3">
                      <div className="flex items-center">
                        {getCategoryIcon(activeMenuId)}
                        <h2 className="text-xl font-bold text-text-primary">
                          {activeMenuItem.label}
                        </h2>
                      </div>
                      <div className="w-16 h-1 bg-accent-500 mt-3 mb-6"></div>
                    </div>

                    {/* Submenu items */}
                    {activeMenuItem.children &&
                      activeMenuItem.children.map((subItem) => (
                        <div key={subItem.id} className="mb-6">
                          <Link href={subItem.href} className="group" onClick={onClose}>
                            <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-500 transition-colors">
                              {subItem.label}
                            </h3>
                          </Link>

                          {/* Add any child items here if needed in future */}
                        </div>
                      ))}

                    {/* If not enough menu items, add a prompt */}
                    {(!activeMenuItem.children || activeMenuItem.children.length <= 2) && (
                      <div className="bg-background-tertiary rounded-lg p-4">
                        <h4 className="font-semibold text-text-primary">
                          {activeMenuId === 'artists'
                            ? 'Künstler werden?'
                            : activeMenuId === 'music'
                              ? 'Release planen?'
                              : 'Studio buchen?'}
                        </h4>
                        <p className="text-sm text-text-secondary mt-2">
                          {activeMenuId === 'artists'
                            ? 'Wir sind immer auf der Suche nach Talent. Kontaktiere uns!'
                            : activeMenuId === 'music'
                              ? 'Lass uns über deine nächste Veröffentlichung sprechen.'
                              : 'Plane deine Session in unserem professionellen Studio.'}
                        </p>
                        <Link
                          href="/kontakt"
                          className="inline-flex items-center mt-3 text-sm text-accent-500 hover:text-accent-400 transition-colors"
                          onClick={onClose}
                        >
                          <span>Kontakt aufnehmen</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Featured content */}
                <div className="md:col-span-1 lg:col-span-1">{renderFeaturedContent()}</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
