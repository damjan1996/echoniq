/**
 * SEO configuration for echoniq Label website
 * This file contains default settings for metadata, OpenGraph and structured data
 */

// Default SEO settings
export const defaultSeo = {
  // Basic metadata
  title: 'echoniq | Musiklabal & Studio',
  titleTemplate: '%s | echoniq',
  description:
    'echoniq ist ein unabhängiges Musiklabal und Tonstudio mit Sitz in Berlin. Wir bieten Künstlern eine Plattform für kreatives Schaffen und professionelle Musikproduktion.',

  // Canonical URL
  canonical: 'https://echoniq.de',

  // Language settings
  language: 'de',
  locale: 'de_DE',
  localeAlternates: ['en_US'],

  // Robots directives
  robotsProps: {
    nosnippet: false,
    notranslate: false,
    noimageindex: false,
    noarchive: false,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
};

// Open Graph (Facebook, etc.) metadata
export const openGraph = {
  type: 'website',
  siteName: 'echoniq',
  title: 'echoniq | Musiklabal & Studio',
  description:
    'Dein Partner für kreative Musikproduktion. Entdecke unsere Künstler, Releases und Studioangebote.',

  // Default images
  images: [
    {
      url: 'https://echoniq.de/images/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'echoniq Musiklabal & Studio',
    },
  ],
};

// Twitter card metadata
export const twitter = {
  handle: '@echoniq',
  site: '@echoniq',
  cardType: 'summary_large_image',
};

// Structured data (JSON-LD) for organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'echoniq',
  url: 'https://echoniq.de',
  logo: 'https://echoniq.de/images/logo.png',
  sameAs: [
    'https://instagram.com/echoniq',
    'https://open.spotify.com/user/echoniq',
    'https://youtube.com/c/echoniq',
    'https://soundcloud.com/echoniq',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-XXX-XXXXXXX',
    contactType: 'customer service',
    email: 'info@echoniq.de',
    availableLanguage: ['German', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Musterstraße 123',
    addressLocality: 'Berlin',
    postalCode: '10115',
    addressCountry: 'DE',
  },
};

// Page-specific SEO configurations
export const pageSeo = {
  home: {
    title: 'echoniq | Musiklabal & Tonstudio Berlin',
    description:
      'echoniq ist ein unabhängiges Musiklabal und Tonstudio in Berlin, das aufstrebenden Künstlern eine kreative Plattform bietet.',
    ogImage: '/images/og-home.jpg',
  },
  artists: {
    title: 'Unsere Künstler',
    description:
      'Entdecke die Künstler des echoniq Musiklabals - von aufstrebenden Newcomern bis zu etablierten Acts.',
    ogImage: '/images/og-artists.jpg',
  },
  music: {
    title: 'Musik & Releases',
    description: 'Höre dir die neuesten Releases, Singles und Alben der echoniq Künstler an.',
    ogImage: '/images/og-music.jpg',
  },
  studio: {
    title: 'Tonstudio',
    description:
      'Professionelle Aufnahme, Mixing und Mastering im echoniq Studio. Entdecke unsere Services und buche jetzt deinen Termin.',
    ogImage: '/images/og-studio.jpg',
  },
  blog: {
    title: 'Blog & News',
    description:
      'Neuigkeiten, Hintergrundberichte und Interviews aus dem echoniq Musiklabal und Studio.',
    ogImage: '/images/og-blog.jpg',
  },
  contact: {
    title: 'Kontakt',
    description: 'Nimm Kontakt mit dem echoniq Team auf. Wir freuen uns auf deine Nachricht!',
    ogImage: '/images/og-contact.jpg',
  },
  about: {
    title: 'Über uns',
    description:
      'Die Geschichte und Vision hinter dem echoniq Musiklabal. Lerne unser Team kennen.',
    ogImage: '/images/og-about.jpg',
  },
};

// Meta tags for verification with search engines and services
export const metaVerification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
  yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
};

export default {
  defaultSeo,
  openGraph,
  twitter,
  organizationSchema,
  pageSeo,
  metaVerification,
};
