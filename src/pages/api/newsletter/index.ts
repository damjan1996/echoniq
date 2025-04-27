import type { NextApiRequest, NextApiResponse } from 'next';

import apiClient from '@/lib/api-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if subscriber already exists
    const queryResult = await apiClient
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .execute();

    // Vereinfachtes Error-Handling ohne auf Objekt-Eigenschaften zuzugreifen
    if (queryResult.error) {
      throw new Error('Failed to query database');
    }

    const existingSubscriber =
      queryResult.data && queryResult.data.length > 0 ? queryResult.data[0] : null;

    if (existingSubscriber) {
      // Subscriber already exists, update if needed
      if (!existingSubscriber.is_active) {
        // Verwende eine separate Update-Operation ohne Verkettung von .eq()
        const updateResult = await apiClient.from('newsletter_subscribers').update({
          is_active: true,
          name: name || existingSubscriber.name,
          id: existingSubscriber.id, // Füge ID direkt in den Update-Daten hinzu
        });

        if (updateResult.error) {
          throw new Error('Failed to update subscriber');
        }

        return res.status(200).json({
          success: true,
          message: 'Your subscription has been reactivated',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter',
      });
    }

    // Add new subscriber
    const insertResult = await apiClient.from('newsletter_subscribers').insert([
      {
        email,
        name: name || null,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertResult.error) {
      throw new Error('Failed to insert subscriber');
    }

    // In a real app, this would integrate with an email service like Brevo/Sendinblue

    return res.status(200).json({
      success: true,
      message: 'You have been successfully subscribed to our newsletter',
    });
  } catch (error) {
    console.error('Error in newsletter API:', error);
    return res.status(500).json({
      error: 'Failed to subscribe to newsletter',
    });
  }
}
