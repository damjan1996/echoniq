import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { MenuItem } from '@/config/menu';

interface NavigationProps {
  items: MenuItem[];
  activeMegaMenu: string | null;
  toggleMegaMenu: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  activeMegaMenu,
  toggleMegaMenu,
}) => {
  const router = useRouter();

  // Check if the given route is active
  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="mx-4">
      <ul className="flex space-x-1">
        {items.map((item) => (
          <li key={item.id} className="relative nav-item">
            {item.children ? (
              // Menu item with dropdown/mega menu
              <button
                onClick={() => toggleMegaMenu(item.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-accent-500'
                    : 'text-text-primary hover:text-text-secondary'
                }`}
                aria-expanded={activeMegaMenu === item.id}
              >
                <span className="font-medium">{item.label}</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    activeMegaMenu === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              // Simple menu item
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-accent-500'
                    : 'text-text-primary hover:text-text-secondary'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            )}

            {/* Highlight indicator for active item */}
            {isActive(item.href) && (
              <motion.div
                layoutId="navigation-indicator"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-accent-500 rounded-full"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
