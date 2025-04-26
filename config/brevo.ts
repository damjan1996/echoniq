/**
 * Brevo Email Marketing configuration for echoniq Label website
 * This file contains settings for newsletter, transactional emails and marketing campaigns
 */

// API key and connection settings
export const apiSettings = {
  apiKey: process.env.BREVO_API_KEY || '',
  enabled: !!process.env.BREVO_API_KEY,
  baseUrl: 'https://api.brevo.com/v3',
};

// List IDs for different subscriber groups
export const lists = {
  // Main newsletter for all subscribers
  generalNewsletter: {
    id: parseInt(process.env.BREVO_GENERAL_LIST_ID || '0', 10),
    name: 'echoniq Newsletter',
  },
  // Artist-specific updates (for fans of specific artists)
  artistUpdates: {
    id: parseInt(process.env.BREVO_ARTIST_LIST_ID || '0', 10),
    name: 'Künstler-Updates',
  },
  // New releases announcements
  newReleases: {
    id: parseInt(process.env.BREVO_RELEASES_LIST_ID || '0', 10),
    name: 'Neue Releases',
  },
  // Studio booking and events
  studioNews: {
    id: parseInt(process.env.BREVO_STUDIO_LIST_ID || '0', 10),
    name: 'Studio News',
  },
};

// Email templates for transactional emails
export const templates = {
  // Welcome email for new subscribers
  welcomeEmail: {
    id: parseInt(process.env.BREVO_WELCOME_TEMPLATE_ID || '0', 10),
    name: 'Willkommen bei echoniq',
  },
  // Contact form confirmation
  contactFormConfirmation: {
    id: parseInt(process.env.BREVO_CONTACT_TEMPLATE_ID || '0', 10),
    name: 'Kontaktformular Bestätigung',
  },
  // Studio booking confirmation
  studioBookingConfirmation: {
    id: parseInt(process.env.BREVO_BOOKING_TEMPLATE_ID || '0', 10),
    name: 'Studiobuchung Bestätigung',
  },
  // New release notification
  newReleaseNotification: {
    id: parseInt(process.env.BREVO_RELEASE_TEMPLATE_ID || '0', 10),
    name: 'Neue Release Benachrichtigung',
  },
};

// Newsletter subscription default settings
export const subscriptionDefaults = {
  // Default lists to subscribe users to
  defaultLists: [lists.generalNewsletter.id],

  // Double opt-in settings
  doubleOptIn: {
    enabled: true,
    redirectionUrl: 'https://echoniq.de/newsletter/bestaetigt',
    templateId: parseInt(process.env.BREVO_DOUBLE_OPTIN_TEMPLATE_ID || '0', 10),
  },

  // GDPR compliant consent settings
  consentText:
    'Ich stimme zu, regelmäßig Updates über neue Musik, Events und Angebote zu erhalten. Ich kann mich jederzeit abmelden.',
};

// Sender information
export const senderInfo = {
  default: {
    name: 'echoniq Label',
    email: 'info@echoniq.de',
  },
  newsletter: {
    name: 'echoniq Newsletter',
    email: 'newsletter@echoniq.de',
  },
  booking: {
    name: 'echoniq Studio',
    email: 'studio@echoniq.de',
  },
};

export default {
  apiSettings,
  lists,
  templates,
  subscriptionDefaults,
  senderInfo,
};
