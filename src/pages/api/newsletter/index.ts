// src/pages/api/newsletter/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { lists } from '@/config/brevo';
import { trackEvent } from '@/lib/analytics';
import { brevoClient } from '@/lib/brevo/client';
import { saveNewsletterSubscription } from '@/lib/supabase/admin';
import { newsletterSchema } from '@/lib/validation';

// Get the newsletter list ID from the configuration
const BREVO_NEWSLETTER_LIST_ID = lists?.generalNewsletter?.id || 1; // Fallback to list ID 1

/**
 * Newsletter subscription API handler
 *
 * POST: Handles newsletter subscription requests
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
    // Validate subscription data
    const validationResult = newsletterSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.format(),
      });
    }

    const { email, firstName, lastName } = validationResult.data;
    const source = req.body.source || 'website';

    // Save subscription to database
    const subscription = await saveNewsletterSubscription({
      email,
      firstName,
      lastName,
      source,
    });

    if (!subscription) {
      return res.status(500).json({ error: 'Failed to save newsletter subscription' });
    }

    // Add to email marketing platform (Brevo)
    try {
      await brevoClient.subscribeToNewsletter({
        email,
        firstName,
        lastName,
        listId: BREVO_NEWSLETTER_LIST_ID,
        source,
        attributes: {
          SUBSCRIPTION_DATE: new Date().toISOString(),
          SOURCE: source,
        },
      });
    } catch (brevoError) {
      console.error('Failed to add subscriber to Brevo:', brevoError);
      // Continue even if Brevo subscription fails
      // The user is already saved in our database
    }

    // Track subscription event
    trackEvent('newsletter_subscription', {
      category: 'engagement',
      label: source,
    });

    // Send confirmation response
    return res.status(200).json({
      success: true,
      message: 'You have been successfully subscribed to our newsletter',
      id: subscription.id,
    });
  } catch (error) {
    // Handle specific errors
    if (typeof error === 'object' && error !== null) {
      // Database constraint error (email already exists)
      if ('code' in error && error.code === '23505') {
        return res.status(409).json({
          error: 'This email is already subscribed to our newsletter',
          alreadySubscribed: true,
        });
      }
    }

    console.error('Newsletter API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Rate limiting configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100kb',
    },
    // Optional rate limiting configuration
    // externalResolver: true,
  },
};
