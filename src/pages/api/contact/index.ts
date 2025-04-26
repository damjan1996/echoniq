// src/pages/api/contact/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { trackEvent } from '@/lib/analytics';
import { brevoClient } from '@/lib/brevo/client';
import { saveContactSubmission } from '@/lib/supabase/admin';
import { subscribeToNewsletter } from '@/lib/supabase/client';
import { contactFormSchema } from '@/lib/validation';

/**
 * Contact form API handler
 *
 * POST: Handles contact form submissions
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  try {
    // Validate form data
    const validationResult = contactFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.format(),
      });
    }

    const {
      name,
      email,
      message,
      subject,
      phone,
      subscribeToNewsletter: shouldSubscribe,
    } = validationResult.data;

    // Save to database
    const contactSubmission = await saveContactSubmission({
      name,
      email,
      message,
      subject: subject || 'Website Contact Form',
      phone: phone || undefined, // Geändert von null zu undefined
      source: 'website',
    });

    if (!contactSubmission) {
      return res.status(500).json({ error: 'Failed to save contact submission' });
    }

    // Send notification email
    try {
      await brevoClient.sendContactFormEmail(name, email, message, subject);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Continue even if email sending fails
    }

    // Handle newsletter subscription if requested
    if (shouldSubscribe) {
      try {
        await subscribeToNewsletter({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
        });
      } catch (subscribeError) {
        console.error('Failed to subscribe to newsletter:', subscribeError);
        // Continue even if subscription fails
      }
    }

    // Track event
    trackEvent('contact_form_submission', {
      category: 'form',
      label: subject || 'Website Contact Form',
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully',
      id: contactSubmission.id,
    });
  } catch (error) {
    console.error('Contact form API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Rate limiting middleware
 * Prevents abuse of the contact form
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
    // Optionally add rate limiting configuration if using a service like upstash/ratelimit
    // externalResolver: true,
  },
};
