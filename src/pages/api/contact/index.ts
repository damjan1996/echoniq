import type { NextApiRequest, NextApiResponse } from 'next';

import { ContactFormData } from '@/types/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body as ContactFormData;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate name (at least 2 characters)
    if (name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    // Validate message (at least 10 characters)
    if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }

    // In a real application, this would send an email or store in a database
    // For now, we'll just log the form data and return success
    console.log('Contact form submission:', { name, email, subject, message });

    // Simulate a delay for the "sending" process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contact API:', error);
    return res.status(500).json({
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
