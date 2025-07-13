import { useState, useEffect } from 'react';
import { CookieService, CookiePreferences } from '@/lib/cookie-service';

export function useCookies() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Load initial preferences
    const currentPrefs = CookieService.getPreferences();
    setPreferences(currentPrefs);
    setHasConsent(CookieService.hasConsent());

    // Listen for storage changes (when preferences are updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-preferences') {
        const newPrefs = CookieService.getPreferences();
        setPreferences(newPrefs);
        setHasConsent(CookieService.hasConsent());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    CookieService.savePreferences(newPreferences);
    setPreferences(newPreferences);
    setHasConsent(true);
  };

  const clearPreferences = () => {
    CookieService.clearPreferences();
    setPreferences(null);
    setHasConsent(false);
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    clearPreferences,
    // Helper functions for checking specific cookie types
    canUseAnalytics: preferences?.analytics ?? false,
    canUseMarketing: preferences?.marketing ?? false,
    canUseFunctional: preferences?.functional ?? false,
    // Service functions
    isAnalyticsEnabled: CookieService.isAnalyticsEnabled(),
    isMarketingEnabled: CookieService.isMarketingEnabled(),
    isFunctionalEnabled: CookieService.isFunctionalEnabled(),
    consentDate: CookieService.getConsentDate(),
  };
}