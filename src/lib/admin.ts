// src/lib/admin.ts
// Admin API client for authenticated operations (replacement for Supabase admin)

import apiClient from './api-client';

// This is just a wrapper around the regular API client
// In a real application, this would have admin-specific functionality
// and proper authentication checks
const adminClient = apiClient;

export default adminClient;
