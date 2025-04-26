// src/lib/brevo/types.ts

/**
 * Contact data structure for Brevo API
 */
export interface ContactData {
  /** Email address of the contact */
  email: string;

  /** First name of the contact */
  firstName?: string;

  /** Last name of the contact */
  lastName?: string;

  /** Additional attributes for the contact */
  attributes?: Record<string, unknown>;

  /** List IDs to add the contact to */
  listIds?: number[];

  /** Whether to update the contact if it already exists */
  updateIfExists?: boolean;
}

/**
 * Newsletter subscription data
 */
export interface NewsletterSubscription {
  /** Email address for subscription */
  email: string;

  /** First name of the subscriber */
  firstName?: string;

  /** Last name of the subscriber */
  lastName?: string;

  /** Brevo list ID to subscribe to */
  listId: number;

  /** Source of the opt-in (e.g., 'website', 'event') */
  source?: string;

  /** Additional attributes to store */
  attributes?: Record<string, unknown>;
}

/**
 * Email template from Brevo
 */
export interface EmailTemplate {
  /** Template ID */
  id: number;

  /** Template name */
  name: string;

  /** Subject line */
  subject: string;

  /** Whether the template is active */
  isActive: boolean;

  /** Creation date */
  createdAt: string;

  /** Last modified date */
  modifiedAt: string;
}

/**
 * Contact form submission data
 */
export interface ContactFormData {
  /** Name of the person submitting the form */
  name: string;

  /** Email address of the person */
  email: string;

  /** Message content */
  message: string;

  /** Subject of the inquiry */
  subject?: string;

  /** Phone number (optional) */
  phone?: string;

  /** How they heard about the label (optional) */
  referralSource?: string;

  /** Whether to subscribe to newsletter */
  subscribeToNewsletter?: boolean;
}

/**
 * Studio booking data
 */
export interface StudioBookingData {
  /** Name of the person booking */
  name: string;

  /** Email address */
  email: string;

  /** Phone number */
  phone: string;

  /** Requested date(s) */
  date: string;

  /** Requested time(s) */
  time: string;

  /** Type of service requested */
  service: string;

  /** Number of people */
  numberOfPeople?: number;

  /** Additional information */
  additionalInfo?: string;

  /** Whether to subscribe to newsletter */
  subscribeToNewsletter?: boolean;
}

/**
 * Email sending result
 */
export interface EmailSendResult {
  /** Whether the email was sent successfully */
  success: boolean;

  /** Message ID if successful */
  messageId?: string;

  /** Error message if failed */
  error?: string;
}

/**
 * Newsletter lists configuration
 */
export interface NewsletterList {
  /** List ID in Brevo */
  id: number;

  /** Display name of the list */
  name: string;

  /** Description of the list purpose */
  description: string;

  /** Folder ID in Brevo */
  folderId?: number;
}

/**
 * Brevo API error response
 */
export interface BrevoApiError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** Additional error details */
  details?: Record<string, unknown>;
}
