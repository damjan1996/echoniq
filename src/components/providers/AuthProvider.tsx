import { User, Session, AuthTokenResponsePassword, AuthResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { LoadingSpinner } from '@/components/common/loading-spinner';
import supabase from '@/lib/supabase/client';

// Define user roles
export type UserRole = 'admin' | 'artist' | 'user';

// Define extended user type with profile data
export interface UserProfile extends User {
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  artistId?: string;
}

// Define interface for profile updates, including password
interface ProfileUpdates extends Partial<UserProfile> {
  password?: string;
}

// Define type for database operations
interface DbOperations {
  from: (table: string) => {
    select: (cols: string) => {
      eq: (
        col: string,
        val: string
      ) => {
        single: () => Promise<{ data: Record<string, unknown>; error: Error | null }>;
      };
    };
    update: (data: Record<string, unknown>) => {
      eq: (col: string, val: string) => Promise<{ error: Error | null }>;
    };
  };
}

// Create a no-op function for default async methods
const noop = async () => {
  // Intentionally empty implementation
};

// Mock functions for default context values
const mockAuthTokenResponse = () => {
  return Promise.resolve({
    data: {
      user: null,
      session: null,
    },
    error: null,
  } as unknown as AuthTokenResponsePassword);
};

const mockAuthResponse = () => {
  return Promise.resolve({
    data: {
      user: null,
      session: null,
    },
    error: null,
  } as unknown as AuthResponse);
};

// Context type definition
interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isArtist: boolean;
  signIn: (email: string, password: string) => Promise<AuthTokenResponsePassword>;
  signInWithMagicLink: (email: string, redirectTo?: string) => Promise<AuthResponse>;
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, unknown>
  ) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  updateProfile: (updates: ProfileUpdates) => Promise<{
    error: Error | null;
    data: UserProfile | null;
  }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  isArtist: false,
  signIn: mockAuthTokenResponse,
  signInWithMagicLink: mockAuthResponse,
  signUp: mockAuthResponse,
  signOut: noop,
  updateProfile: async () => ({ error: null, data: null }),
  resetPassword: async () => ({ error: null }),
});

// Context hook
export const useAuth = () => useContext(AuthContext);

// Provider props
interface AuthProviderProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
  artistOnly?: boolean;
  redirectTo?: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  requireAuth = false,
  adminOnly = false,
  artistOnly = false,
  redirectTo = '/login',
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check if the current user is an admin
  const isAdmin = user?.role === 'admin';

  // Check if the current user is an artist
  const isArtist = user?.role === 'artist' || user?.role === 'admin';

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      // Set user if session exists
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }

      // Listen for auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session);

        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'USER_UPDATED' && session?.user) {
          await fetchUserProfile(session.user.id);
        }
      });

      setIsLoading(false);

      // Clean up subscription
      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      // Use proper typing for the database operations
      const db = supabase as unknown as DbOperations;
      const { data, error } = await db.from('users').select('*').eq('id', userId).single();

      if (error) {
        throw error;
      }

      // Merge auth user with profile data
      const authUser = (await supabase.auth.getUser()).data.user;

      if (authUser) {
        setUser({
          ...authUser,
          role: (data?.role as UserRole) || 'user',
          firstName: data?.first_name as string,
          lastName: data?.last_name as string,
          avatarUrl: data?.avatar_url as string,
          artistId: data?.artist_id as string,
        });
      }
    } catch (error) {
      // Handle error silently but still set the basic user
      const authUser = (await supabase.auth.getUser()).data.user;
      if (authUser) {
        setUser(authUser as UserProfile);
      }
    }
  };

  // Handle authentication requirements
  useEffect(() => {
    if (isLoading) return;

    const handleAuthRequirements = async () => {
      // If auth is required and no user, redirect to login
      if (requireAuth && !user) {
        await router.push(`${redirectTo}?redirectTo=${encodeURIComponent(router.asPath)}`);
        return;
      }

      // If admin access is required but user is not admin, redirect
      if (adminOnly && !isAdmin) {
        await router.push('/');
        return;
      }

      // If artist access is required but user is not artist, redirect
      if (artistOnly && !isArtist) {
        await router.push('/');
        return;
      }
    };

    handleAuthRequirements();
  }, [isLoading, user, requireAuth, adminOnly, artistOnly, isAdmin, isArtist, router, redirectTo]);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  // Sign in with magic link
  const signInWithMagicLink = async (email: string, redirectTo?: string) => {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    router.push('/');
  };

  // Update user profile
  const updateProfile = async (updates: ProfileUpdates) => {
    if (!user) {
      return { error: new Error('User not authenticated'), data: null };
    }

    try {
      // Split updates into auth updates and profile updates
      const { email, password, ...profileUpdates } = updates;

      // Update auth data if email or password provided
      if (email || password) {
        const authUpdates: Record<string, string> = {};
        if (email) authUpdates.email = email;
        if (password) authUpdates.password = password;

        const { error } = await supabase.auth.updateUser(authUpdates);
        if (error) throw error;
      }

      // Format profile updates for the database
      const dbUpdates: Record<string, unknown> = {};
      if (profileUpdates.firstName) dbUpdates.first_name = profileUpdates.firstName;
      if (profileUpdates.lastName) dbUpdates.last_name = profileUpdates.lastName;
      if (profileUpdates.avatarUrl) dbUpdates.avatar_url = profileUpdates.avatarUrl;
      if (profileUpdates.role) dbUpdates.role = profileUpdates.role;

      // Only update profile if there are changes
      if (Object.keys(dbUpdates).length > 0) {
        const db = supabase as unknown as DbOperations;
        const { error } = await db.from('users').update(dbUpdates).eq('id', user.id);

        if (error) throw error;
      }

      // Refresh user profile
      await fetchUserProfile(user.id);

      return { error: null, data: user };
    } catch (error) {
      // Handle error properly
      return {
        error: error instanceof Error ? error : new Error('Unknown error'),
        data: null,
      };
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      // Handle error properly
      return {
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  };

  // Create context value
  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAdmin,
    isArtist,
    signIn,
    signInWithMagicLink,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
  };

  // Show loading spinner when loading and auth is required
  if (isLoading && requireAuth) {
    return <LoadingSpinner fullScreen label="Authentifizierung..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
