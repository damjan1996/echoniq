// src/lib/brevo/client.ts
import { apiSettings } from '@/config/brevo';

import { ContactData, NewsletterSubscription, EmailTemplate, EmailSendResult } from './types';

// Get API key from config
const BREVO_API_KEY = apiSettings?.apiKey;

/**
 * Base API client for Brevo (formerly Sendinblue)
 */
class BrevoClient {
  private apiKey: string;
  private baseUrl: string = 'https://api.brevo.com/v3';

  constructor(apiKey = BREVO_API_KEY) {
    this.apiKey = apiKey;
  }

  /**
   * Make a request to the Brevo API
   */
  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      'api-key': this.apiKey,
      Accept: 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Brevo API error: ${response.status} ${response.statusText} - ${JSON.stringify(
            errorData
          )}`
        );
      }

      // For DELETE requests or others that might not return content
      if (response.status === 204 || method === 'DELETE') {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('Error in Brevo API request:', error);
      throw error;
    }
  }

  /**
   * Add a contact to Brevo
   */
  async createContact(contactData: ContactData): Promise<Record<string, unknown>> {
    return this.request('/contacts', 'POST', {
      email: contactData.email,
      attributes: {
        FIRSTNAME: contactData.firstName,
        LASTNAME: contactData.lastName,
        ...(contactData.attributes || {}),
      },
      listIds: contactData.listIds || [],
      updateEnabled: contactData.updateIfExists ?? true,
    });
  }

  /**
   * Subscribe email to a newsletter list
   */
  async subscribeToNewsletter(data: NewsletterSubscription): Promise<Record<string, unknown>> {
    return this.createContact({
      email: data.email,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      listIds: [data.listId],
      attributes: {
        OPTIN_SOURCE: data.source || 'website',
        OPTIN_DATE: new Date().toISOString(),
        ...data.attributes,
      },
      updateIfExists: true,
    });
  }

  /**
   * Send a transactional email
   */
  async sendTransactionalEmail(params: {
    to: Array<{ email: string; name?: string }>;
    templateId: number;
    params?: Record<string, unknown>;
    subject?: string;
    cc?: Array<{ email: string; name?: string }>;
    bcc?: Array<{ email: string; name?: string }>;
    replyTo?: { email: string; name?: string };
    attachment?: Array<{ url: string; name: string }>;
    tags?: string[];
  }): Promise<EmailSendResult> {
    return this.request('/smtp/email', 'POST', {
      to: params.to,
      templateId: params.templateId,
      params: params.params || {},
      subject: params.subject,
      cc: params.cc,
      bcc: params.bcc,
      replyTo: params.replyTo,
      attachment: params.attachment,
      tags: params.tags,
    });
  }

  /**
   * Get email templates
   */
  async getEmailTemplates(): Promise<EmailTemplate[]> {
    const response = await this.request<{ templates: EmailTemplate[] }>('/smtp/templates');
    return response.templates;
  }

  /**
   * Get contact details
   */
  async getContact(email: string): Promise<Record<string, unknown>> {
    return this.request(`/contacts/${encodeURIComponent(email)}`);
  }

  /**
   * Delete a contact
   */
  async deleteContact(email: string): Promise<void> {
    return this.request(`/contacts/${encodeURIComponent(email)}`, 'DELETE');
  }

  /**
   * Send an email to contact form inquiries
   */
  async sendContactFormEmail(
    name: string,
    email: string,
    message: string,
    subject?: string,
    templateId?: number
  ): Promise<EmailSendResult> {
    // Use either the specified template or a default contact form template
    const template = templateId || 1; // Replace with your actual template ID

    return this.sendTransactionalEmail({
      to: [{ email: process.env.CONTACT_EMAIL || 'contact@echoniq.com' }],
      templateId: template,
      params: {
        name: name,
        email: email,
        message: message,
        subject: subject || 'New Contact Form Submission',
        date: new Date().toLocaleDateString(),
      },
      subject: subject || 'New Contact Form Submission',
      replyTo: { email: email, name: name },
      tags: ['contact_form', 'website'],
    });
  }

  /**
   * Send a studio booking confirmation email
   */
  async sendStudioBookingConfirmation(
    name: string,
    email: string,
    date: string,
    time: string,
    service: string,
    additionalInfo?: string,
    templateId?: number
  ): Promise<EmailSendResult> {
    // Use either the specified template or a default booking template
    const template = templateId || 2; // Replace with your actual template ID

    return this.sendTransactionalEmail({
      to: [{ email: email, name: name }],
      templateId: template,
      params: {
        name: name,
        date: date,
        time: time,
        service: service,
        additionalInfo: additionalInfo || 'No additional information provided.',
        bookingDate: new Date().toLocaleDateString(),
      },
      subject: 'Your echoniq Studio Booking Confirmation',
      tags: ['studio_booking', 'confirmation'],
    });
  }
}

// Create and export a singleton instance
export const brevoClient = new BrevoClient();

// Export the class as well for testing or custom instances
export default BrevoClient;
