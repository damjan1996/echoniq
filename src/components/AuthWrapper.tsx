import { AlertCircle, LockIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { useAuth } from '@/hooks/use-auth'; // Annahme: Der richtige Import-Pfad

import { LoadingSpinner } from './common/loading-spinner';
import { Button } from './ui/button';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
  artistOnly?: boolean;
  redirectTo?: string;
  title?: string;
  description?: string;
  showLoginButton?: boolean;
}

/**
 * AuthWrapper component that restricts access to routes based on authentication and roles
 * Can be used to protect routes or sections of a page
 */
const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  requireAuth = true,
  adminOnly = false,
  artistOnly = false,
  redirectTo = '/login',
  title = 'Zugriff beschränkt',
  description = 'Du musst eingeloggt sein, um auf diesen Bereich zuzugreifen.',
  showLoginButton = true,
}) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Berechnen der Rollen-Flags basierend auf den Benutzerdaten
  const isAdmin = useMemo(() => {
    return user?.role === 'admin';
  }, [user]);

  const isArtist = useMemo(() => {
    return user?.role === 'artist' || user?.role === 'admin';
  }, [user]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen />;
  }

  // If authentication is required and user is not logged in
  if (requireAuth && !user) {
    // Create redirect URL with return path
    const returnPath = encodeURIComponent(router.asPath);
    const loginUrl = `${redirectTo}?redirectTo=${returnPath}`;

    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="bg-background-secondary rounded-lg p-8 max-w-md w-full shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="bg-neutral-800 p-4 rounded-full">
              <LockIcon className="h-10 w-10 text-accent-500" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-text-primary mb-3">{title}</h2>
          <p className="text-text-secondary mb-6">{description}</p>

          {showLoginButton && (
            <Link href={loginUrl}>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
              >
                Anmelden
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // If admin access is required but user is not admin
  if (adminOnly && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="bg-background-secondary rounded-lg p-8 max-w-md w-full shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="bg-red-500/10 p-4 rounded-full">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-text-primary mb-3">Zugriff verweigert</h2>
          <p className="text-text-secondary mb-6">
            Du hast nicht die erforderlichen Berechtigungen, um auf diesen Bereich zuzugreifen.
            Dieser Bereich ist nur für Administratoren zugänglich.
          </p>

          <Link href="/">
            <Button variant="outline" size="lg" className="w-full">
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // If artist access is required but user is not artist
  if (artistOnly && !isArtist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="bg-background-secondary rounded-lg p-8 max-w-md w-full shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="bg-amber-500/10 p-4 rounded-full">
              <AlertCircle className="h-10 w-10 text-amber-500" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-text-primary mb-3">Zugriff beschränkt</h2>
          <p className="text-text-secondary mb-6">
            Dieser Bereich ist nur für Künstler und Administratoren zugänglich. Falls du ein
            Künstler bist, wende dich bitte an das echoniq Team.
          </p>

          <Link href="/">
            <Button variant="outline" size="lg" className="w-full">
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // If all checks pass, render children
  return <>{children}</>;
};

export default AuthWrapper;
