import { useRouter } from 'next/router';
import React from 'react';

/**
 * Schützt Komponenten vor der Ausführung als eigenständige Seite im Pages-Verzeichnis
 */
interface ComponentsGuardProps {
  children: React.ReactNode;
}

const ComponentsGuard: React.FC<ComponentsGuardProps> = ({ children }) => {
  const router = useRouter();

  // Überprüfen, ob die Route eine direkte Komponenten-Route ist
  const isDirectComponentRoute =
    (router.pathname.includes('/components') && !router.pathname.includes('[')) ||
    router.pathname.includes('/editors') ||
    router.pathname.includes('/post/PostSidebar');

  // Wenn die Komponente direkt als Seite aufgerufen wird, zeige ein Fallback
  if (isDirectComponentRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Komponente</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Diese URL ist eine Komponente und keine eigenständige Seite.
          </p>
        </div>
      </div>
    );
  }

  // Ansonsten normales Rendering
  return <>{children}</>;
};

export default ComponentsGuard;
