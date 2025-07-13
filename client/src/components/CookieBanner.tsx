import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CookieService, CookiePreferences } from "@/lib/cookie-service";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false
  });
  
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize cookie service
    CookieService.initialize();
    
    // Check if user has already made a choice
    if (!CookieService.hasConsent()) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load existing preferences
      const existingPrefs = CookieService.getPreferences();
      if (existingPrefs) {
        setPreferences(existingPrefs);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    CookieService.savePreferences(allAccepted);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    CookieService.savePreferences(preferences);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    CookieService.savePreferences(onlyNecessary);
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {!showSettings ? (
            // Main banner
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">
                    {t('cookie_title') || 'Utilizziamo i cookie per migliorare la tua esperienza'}
                  </p>
                  <p className="text-gray-600">
                    {t('cookie_description') || 'Utilizziamo cookie essenziali per il funzionamento del sito e cookie opzionali per analisi e marketing. Puoi scegliere quali accettare.'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  {t('cookie_settings') || 'Impostazioni'}
                </button>
                
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {t('cookie_reject') || 'Rifiuta tutti'}
                </button>
                
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                >
                  {t('cookie_accept_all') || 'Accetta tutti'}
                </button>
              </div>
            </div>
          ) : (
            // Settings panel
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('cookie_preferences') || 'Preferenze Cookie'}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {t('cookie_necessary') || 'Cookie Necessari'}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('cookie_necessary_desc') || 'Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati.'}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {t('cookie_analytics') || 'Cookie di Analisi'}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('cookie_analytics_desc') || 'Ci aiutano a capire come i visitatori interagiscono con il sito web raccogliendo e riportando informazioni anonime.'}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`ml-4 w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                      preferences.analytics ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {t('cookie_functional') || 'Cookie Funzionali'}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('cookie_functional_desc') || 'Consentono funzionalità avanzate e personalizzazione, come ricordare le tue preferenze.'}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('functional')}
                    className={`ml-4 w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                      preferences.functional ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {t('cookie_marketing') || 'Cookie di Marketing'}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('cookie_marketing_desc') || 'Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti e coinvolgenti.'}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className={`ml-4 w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                      preferences.marketing ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {t('cancel') || 'Annulla'}
                </button>
                
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {t('cookie_reject') || 'Rifiuta tutti'}
                </button>
                
                <button
                  onClick={handleAcceptSelected}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                >
                  {t('cookie_save_preferences') || 'Salva preferenze'}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}