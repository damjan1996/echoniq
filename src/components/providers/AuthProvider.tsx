// src/components/providers/AuthProvider.tsx
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

import apiClient from '@/lib/api-client';

// Types
interface User {
  id: string;
  email: string;
  role?: string;
  name?: string;
}

interface AuthError {
  message: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  isArtist: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = Boolean(user?.role === 'admin');
  const isArtist = Boolean(user?.role === 'artist' || user?.role === 'admin');

  // Hilfsfunction zum sicheren Umwandeln der API-User-Antwort in unser User-Interface
  const convertToUser = (apiUser: any): User | null => {
    if (!apiUser) return null;

    return {
      id: String(apiUser.id || ''),
      email: String(apiUser.email || ''),
      role: apiUser.role ? String(apiUser.role) : undefined,
      name: apiUser.name ? String(apiUser.name) : undefined,
    };
  };

  // Check for existing session on mount
  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);

      try {
        const { data, error } = await apiClient.auth.getUser();

        if (error) {
          console.error('Error getting user:', error);
          setUser(null);
        } else {
          setUser(convertToUser(data.user));
        }
      } catch (error) {
        console.error('Auth error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  // Auth methods
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user: apiUser, error } = await apiClient.auth.signIn({ email, password });

      if (!error && apiUser) {
        setUser(convertToUser(apiUser));
      }

      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'Failed to sign in' } };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      const { user: apiUser, error } = await apiClient.auth.signUp({ email, password });

      if (!error && apiUser) {
        // Update user name if provided
        const convertedUser = convertToUser(apiUser);
        if (convertedUser && name) {
          // In a real app, you would update the user profile here
          // This is just a mock implementation
          setUser({ ...convertedUser, name });
        } else {
          setUser(convertedUser);
        }
      }

      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: { message: 'Failed to sign up' } };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await apiClient.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (_email: string) => {
    // This would be implemented in a real app
    // Mock implementation for now
    return { error: null };
  };

  const value = {
    user,
    isLoading,
    isAdmin,
    isArtist,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default useAuth;
