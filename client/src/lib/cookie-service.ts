export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export class CookieService {
  private static readonly PREFERENCES_KEY = 'cookie-preferences';
  private static readonly CONSENT_DATE_KEY = 'cookie-consent-date';

  // Get current cookie preferences
  static getPreferences(): CookiePreferences | null {
    try {
      const prefs = localStorage.getItem(this.PREFERENCES_KEY);
      return prefs ? JSON.parse(prefs) : null;
    } catch {
      return null;
    }
  }

  // Save cookie preferences
  static savePreferences(preferences: CookiePreferences): void {
    localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
    localStorage.setItem(this.CONSENT_DATE_KEY, new Date().toISOString());
    
    // Apply preferences immediately
    this.applyPreferences(preferences);
  }

  // Check if user has given consent
  static hasConsent(): boolean {
    return this.getPreferences() !== null;
  }

  // Get consent date
  static getConsentDate(): Date | null {
    try {
      const date = localStorage.getItem(this.CONSENT_DATE_KEY);
      return date ? new Date(date) : null;
    } catch {
      return null;
    }
  }

  // Apply cookie preferences
  private static applyPreferences(preferences: CookiePreferences): void {
    // Analytics cookies (Google Analytics, etc.)
    if (preferences.analytics) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }

    // Marketing cookies (advertising, tracking)
    if (preferences.marketing) {
      this.enableMarketing();
    } else {
      this.disableMarketing();
    }

    // Functional cookies (user preferences, language, etc.)
    if (preferences.functional) {
      this.enableFunctional();
    } else {
      this.disableFunctional();
    }
  }

  // Initialize analytics (Google Analytics, etc.)
  private static enableAnalytics(): void {
    // Example: Initialize Google Analytics
    if (typeof window !== 'undefined') {
      // Set analytics cookie
      document.cookie = 'analytics_enabled=true; path=/; max-age=31536000; SameSite=Lax';
      
      // Initialize Google Analytics if gtag is available
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
      
      console.log('Analytics cookies enabled');
    }
  }

  private static disableAnalytics(): void {
    if (typeof window !== 'undefined') {
      // Remove analytics cookies
      document.cookie = 'analytics_enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Disable Google Analytics if gtag is available
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
      
      // Remove any existing analytics cookies
      this.removeCookiesByPattern(/^_ga/);
      this.removeCookiesByPattern(/^_gid/);
      
      console.log('Analytics cookies disabled');
    }
  }

  // Enable marketing cookies
  private static enableMarketing(): void {
    if (typeof window !== 'undefined') {
      document.cookie = 'marketing_enabled=true; path=/; max-age=31536000; SameSite=Lax';
      
      // Enable advertising cookies for Google
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted'
        });
      }
      
      console.log('Marketing cookies enabled');
    }
  }

  private static disableMarketing(): void {
    if (typeof window !== 'undefined') {
      document.cookie = 'marketing_enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Disable advertising cookies for Google
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
      
      // Remove marketing cookies
      this.removeCookiesByPattern(/^_gcl/);
      this.removeCookiesByPattern(/^_fbp/);
      this.removeCookiesByPattern(/^_fbc/);
      
      console.log('Marketing cookies disabled');
    }
  }

  // Enable functional cookies
  private static enableFunctional(): void {
    if (typeof window !== 'undefined') {
      document.cookie = 'functional_enabled=true; path=/; max-age=31536000; SameSite=Lax';
      console.log('Functional cookies enabled');
    }
  }

  private static disableFunctional(): void {
    if (typeof window !== 'undefined') {
      document.cookie = 'functional_enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Remove functional cookies (but keep essential ones like language preference)
      // We keep language and theme preferences as they're considered necessary
      console.log('Functional cookies disabled');
    }
  }

  // Remove cookies by pattern
  private static removeCookiesByPattern(pattern: RegExp): void {
    if (typeof document !== 'undefined') {
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        if (pattern.test(name)) {
          document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          document.cookie = `${name}=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      });
    }
  }

  // Check if specific cookie type is enabled
  static isAnalyticsEnabled(): boolean {
    const prefs = this.getPreferences();
    return prefs ? prefs.analytics : false;
  }

  static isMarketingEnabled(): boolean {
    const prefs = this.getPreferences();
    return prefs ? prefs.marketing : false;
  }

  static isFunctionalEnabled(): boolean {
    const prefs = this.getPreferences();
    return prefs ? prefs.functional : false;
  }

  // Initialize cookie service on page load
  static initialize(): void {
    const preferences = this.getPreferences();
    if (preferences) {
      this.applyPreferences(preferences);
    } else {
      // If no preferences set, deny all optional cookies by default
      if (window.gtag) {
        window.gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
    }
  }

  // Clear all cookie preferences (for testing)
  static clearPreferences(): void {
    localStorage.removeItem(this.PREFERENCES_KEY);
    localStorage.removeItem(this.CONSENT_DATE_KEY);
  }
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}