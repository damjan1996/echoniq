import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, X, Instagram, Youtube, Music2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { mobileNavigation, socialLinks, quickActions } from '@/config/menu';

import { Logo } from './logo';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Check if the given route is active
  const isActive = (href: string) => {
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  // Toggle expanded state for menu items with children
  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Handle link click
  const handleLinkClick = () => {
    // Close the mobile menu after a short delay to allow for animation
    setTimeout(onClose, 300);
  };

  // Helper function to render social icons
  const renderSocialIcon = (id: string) => {
    switch (id) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'spotify':
        // Use Music2 as a replacement for Spotify
        return <Music2 className="h-5 w-5 text-green-500" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      case 'soundcloud':
        return <Music2 className="h-5 w-5" />;
      default:
        return <ChevronRight className="h-5 w-5" />;
    }
  };

  // Animation variants
  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Sidebar menu */}
          <motion.div
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-background-primary z-50 lg:hidden overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="flex flex-col h-full">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <Logo variant="header" animate={false} />
                <button
                  onClick={onClose}
                  className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                  aria-label="Menü schließen"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 py-6">
                <ul className="space-y-1">
                  {mobileNavigation.map((item) => (
                    <motion.li key={item.id} variants={itemVariants}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className={`flex items-center justify-between w-full px-6 py-3 text-left ${
                              isActive(item.href)
                                ? 'text-accent-500'
                                : 'text-text-primary hover:bg-neutral-800/50'
                            } transition-colors`}
                            aria-expanded={expandedItem === item.id}
                          >
                            <span className="text-lg font-medium">{item.label}</span>
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${
                                expandedItem === item.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {expandedItem === item.id && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-background-secondary overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <motion.li key={child.id} variants={itemVariants}>
                                    <Link
                                      href={child.href}
                                      className={`block px-10 py-2 ${
                                        isActive(child.href)
                                          ? 'text-accent-500'
                                          : 'text-text-secondary hover:text-text-primary'
                                      } transition-colors ${child.highlight ? 'font-medium' : ''}`}
                                      onClick={handleLinkClick}
                                    >
                                      {child.label}
                                    </Link>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block px-6 py-3 ${
                            isActive(item.href)
                              ? 'text-accent-500'
                              : 'text-text-primary hover:bg-neutral-800/50'
                          } transition-colors`}
                          onClick={handleLinkClick}
                        >
                          <span className="text-lg font-medium">{item.label}</span>
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Quick actions */}
              <motion.div variants={itemVariants} className="px-6 py-4 border-t border-neutral-800">
                {quickActions.map((action) => (
                  <Link
                    key={action.id}
                    href={action.href}
                    className={`block w-full py-3 px-4 my-3 text-center rounded-full text-sm font-medium ${
                      action.highlight
                        ? 'bg-accent-500 hover:bg-accent-600 text-text-inverted'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-text-primary'
                    } transition-colors`}
                    onClick={handleLinkClick}
                  >
                    {action.label}
                  </Link>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-4 py-6 border-t border-neutral-800"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-text-tertiary hover:text-accent-500 transition-colors"
                    aria-label={link.label}
                  >
                    {renderSocialIcon(link.id)}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
