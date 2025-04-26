import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ChevronDown, ChevronUp, Check } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { consentCategories } from '@/config/analytics';

interface CookiePreference {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreference>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  // Check if consent has been previously given
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedConsent = localStorage.getItem('cookieConsent');
      if (!storedConsent) {
        // Show banner if no consent has been stored
        setShowBanner(true);
      } else {
        // Parse stored preferences
        try {
          const parsedPreferences = JSON.parse(storedConsent);
          setPreferences(parsedPreferences);
        } catch (e) {
          // If parsing fails, show banner again
          setShowBanner(true);
        }
      }
    }
  }, []);

  // Save preferences to localStorage and fire relevant events
  const savePreferences = (prefs: CookiePreference) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setShowBanner(false);

    // Dispatch custom event for other components to react to consent changes
    window.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: prefs }));

    // If analytics is accepted, initialize analytics
    if (prefs.analytics) {
      // Check if dataLayer exists and push consent info
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'cookie_consent_update',
          analytics_consent: prefs.analytics,
          marketing_consent: prefs.marketing,
        });
      }
    }
  };

  // Accept all cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  // Accept only necessary cookies
  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
  };

  // Save current preferences
  const saveCurrentPreferences = () => {
    savePreferences(preferences);
  };

  // Toggle individual preference
  const togglePreference = (key: keyof CookiePreference) => {
    // Necessary cookies cannot be disabled
    if (key === 'necessary') return;

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Open cookie settings from external triggers
  useEffect(() => {
    const handleOpenCookieSettings = () => {
      setShowBanner(true);
      setShowDetails(true);
    };

    window.addEventListener('openCookieSettings', handleOpenCookieSettings);

    return () => {
      window.removeEventListener('openCookieSettings', handleOpenCookieSettings);
    };
  }, []);

  // Animation variants
  const bannerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 100, opacity: 0, transition: { duration: 0.3 } },
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background-secondary border-t border-neutral-800 shadow-lg"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bannerVariants}
        >
          <div className="container mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Cookie className="w-5 h-5 mr-2 text-accent-500" />
                  <h3 className="text-lg font-semibold text-text-primary">Cookie-Einstellungen</h3>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="p-1 text-text-tertiary hover:text-text-primary transition-colors"
                  aria-label="Cookie-Banner schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-text-secondary text-sm">
                Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten.
                Einige Cookies sind notwendig für den Betrieb der Website, während andere uns
                helfen, die Nutzererfahrung zu verbessern und zu analysieren.
              </p>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    className="space-y-4 overflow-hidden"
                    variants={detailsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="space-y-3">
                      {/* Necessary cookies */}
                      <div className="flex items-start justify-between p-3 bg-neutral-800/50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium text-text-primary">
                              {consentCategories.necessary.label}
                            </span>
                            <span className="ml-2 px-2 py-0.5 text-xs bg-neutral-700 text-text-tertiary rounded-full">
                              Erforderlich
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-text-tertiary">
                            {consentCategories.necessary.description}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            className="w-6 h-6 flex items-center justify-center bg-accent-500 text-white rounded-full cursor-default"
                            disabled
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Analytics cookies */}
                      <div className="flex items-start justify-between p-3 bg-neutral-800/50 rounded-lg">
                        <div className="flex-1">
                          <span className="font-medium text-text-primary">
                            {consentCategories.analytics.label}
                          </span>
                          <p className="mt-1 text-sm text-text-tertiary">
                            {consentCategories.analytics.description}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            onClick={() => togglePreference('analytics')}
                            className={`w-6 h-6 flex items-center justify-center rounded-full ${
                              preferences.analytics
                                ? 'bg-accent-500 text-white'
                                : 'bg-neutral-700 text-text-tertiary'
                            }`}
                            aria-pressed={preferences.analytics}
                          >
                            {preferences.analytics && <Check className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Marketing cookies */}
                      <div className="flex items-start justify-between p-3 bg-neutral-800/50 rounded-lg">
                        <div className="flex-1">
                          <span className="font-medium text-text-primary">
                            {consentCategories.marketing.label}
                          </span>
                          <p className="mt-1 text-sm text-text-tertiary">
                            {consentCategories.marketing.description}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            onClick={() => togglePreference('marketing')}
                            className={`w-6 h-6 flex items-center justify-center rounded-full ${
                              preferences.marketing
                                ? 'bg-accent-500 text-white'
                                : 'bg-neutral-700 text-text-tertiary'
                            }`}
                            aria-pressed={preferences.marketing}
                          >
                            {preferences.marketing && <Check className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap gap-3 justify-between items-center">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center text-sm text-accent-500 hover:text-accent-400 transition-colors"
                >
                  {showDetails ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      <span>Details ausblenden</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      <span>Details anzeigen</span>
                    </>
                  )}
                </button>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={acceptNecessary}
                    className="px-4 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors"
                  >
                    Nur Notwendige
                  </button>
                  {showDetails && (
                    <button
                      onClick={saveCurrentPreferences}
                      className="px-4 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors"
                    >
                      Auswahl speichern
                    </button>
                  )}
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 text-sm bg-accent-500 hover:bg-accent-600 text-white rounded-full transition-colors"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
