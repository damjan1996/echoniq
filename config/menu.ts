/**
 * Menu configuration for echoniq Label website
 * This file defines the navigation structure for the website
 */

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
  isExternal?: boolean;
  highlight?: boolean;
}

// Main navigation items
export const mainNavigation: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'artists',
    label: 'Künstler',
    href: '/artists',
    children: [
      {
        id: 'all-artists',
        label: 'Alle Künstler',
        href: '/artists',
      },
      // Dynamic artist entries will be added programmatically
    ],
  },
  {
    id: 'music',
    label: 'Musik',
    href: '/music',
    children: [
      {
        id: 'all-releases',
        label: 'Alle Releases',
        href: '/music',
      },
      {
        id: 'latest-releases',
        label: 'Neueste Releases',
        href: '/music?filter=latest',
      },
      {
        id: 'featured',
        label: 'Featured',
        href: '/music?filter=featured',
      },
      // Additional categories can be added here
    ],
  },
  {
    id: 'studio',
    label: 'Studio',
    href: '/studio',
    children: [
      {
        id: 'services',
        label: 'Services',
        href: '/studio#services',
      },
      {
        id: 'equipment',
        label: 'Equipment',
        href: '/studio#equipment',
      },
      {
        id: 'pricing',
        label: 'Preise',
        href: '/studio#pricing',
      },
      {
        id: 'booking',
        label: 'Booking',
        href: '/studio#booking',
        highlight: true,
      },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
  },
  {
    id: 'about',
    label: 'Über uns',
    href: '/ueber-uns',
  },
  {
    id: 'contact',
    label: 'Kontakt',
    href: '/kontakt',
  },
];

// Footer navigation grouped by sections
export const footerNavigation = {
  label: {
    title: 'Label',
    items: [
      {
        id: 'about-us',
        label: 'Über uns',
        href: '/ueber-uns',
      },
      {
        id: 'artists-footer',
        label: 'Künstler',
        href: '/artists',
      },
      {
        id: 'releases',
        label: 'Releases',
        href: '/music',
      },
      {
        id: 'blog-footer',
        label: 'Blog',
        href: '/blog',
      },
    ],
  },
  studio: {
    title: 'Studio',
    items: [
      {
        id: 'services-footer',
        label: 'Services',
        href: '/studio#services',
      },
      {
        id: 'equipment-footer',
        label: 'Equipment',
        href: '/studio#equipment',
      },
      {
        id: 'pricing-footer',
        label: 'Preise',
        href: '/studio#pricing',
      },
      {
        id: 'booking-footer',
        label: 'Booking',
        href: '/studio#booking',
      },
    ],
  },
  legal: {
    title: 'Rechtliches',
    items: [
      {
        id: 'imprint',
        label: 'Impressum',
        href: '/impressum',
      },
      {
        id: 'privacy',
        label: 'Datenschutz',
        href: '/datenschutz',
      },
      {
        id: 'cookies',
        label: 'Cookie-Einstellungen',
        href: '#',
        // This will trigger the cookie consent manager
      },
    ],
  },
  contact: {
    title: 'Kontakt',
    items: [
      {
        id: 'contact-us',
        label: 'Kontaktformular',
        href: '/kontakt',
      },
      {
        id: 'email',
        label: 'info@echoniq.de',
        href: 'mailto:info@echoniq.de',
        isExternal: true,
      },
      {
        id: 'newsletter',
        label: 'Newsletter',
        href: '/kontakt#newsletter',
      },
    ],
  },
};

// Mobile navigation (can be a simplified version of mainNavigation)
export const mobileNavigation: MenuItem[] = mainNavigation;

// Social media links that appear in the header and/or footer
export const socialLinks = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/echoniq',
    icon: 'instagram',
    isExternal: true,
  },
  {
    id: 'spotify',
    label: 'Spotify',
    href: 'https://open.spotify.com/user/echoniq',
    icon: 'spotify',
    isExternal: true,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://youtube.com/c/echoniq',
    icon: 'youtube',
    isExternal: true,
  },
  {
    id: 'soundcloud',
    label: 'SoundCloud',
    href: 'https://soundcloud.com/echoniq',
    icon: 'soundcloud',
    isExternal: true,
  },
];

// Quick actions that might appear in the header, like booking buttons
export const quickActions: MenuItem[] = [
  {
    id: 'book-studio',
    label: 'Studio buchen',
    href: '/studio#booking',
    highlight: true,
  },
];

export default {
  mainNavigation,
  footerNavigation,
  mobileNavigation,
  socialLinks,
  quickActions,
};
