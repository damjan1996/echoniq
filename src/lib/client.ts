// src/lib/client.ts
// Client-side API client (replacement for Supabase client)

import apiClient from './api-client';

// This is just a wrapper around the regular API client
// In a real app with different permissions, this would be configured differently
const client = apiClient;

export default client;
