import { useLanguage } from "@/contexts/LanguageContext";
import { useCookies } from "@/hooks/use-cookies";
import { CookieService } from "@/lib/cookie-service";
import { useState } from "react";
import { Cookie, Settings, Eye, Shield, Target, Cog } from "lucide-react";
import CookieAwareComponent from "@/components/CookieAwareComponent";

export default function Privacy() {
  const { t } = useLanguage();
  const { preferences, hasConsent, updatePreferences, consentDate } = useCookies();
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(preferences || {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  const handleUpdatePreferences = () => {
    updatePreferences(localPreferences);
    setShowCookieSettings(false);
  };

  const togglePreference = (key: keyof typeof localPreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('privacy_policy') || 'Privacy Policy & Cookie Settings'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('privacy_subtitle') || 'Trasparenza sui dati e controllo delle tue preferenze di privacy'}
          </p>
        </div>

        {/* Cookie Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t('cookie_status') || 'Stato Cookie'}
              </h2>
              <p className="text-gray-600">
                {hasConsent 
                  ? `${t('consent_given') || 'Consenso fornito'} ${consentDate ? `il ${consentDate.toLocaleDateString()}` : ''}`
                  : t('no_consent') || 'Nessun consenso fornito'
                }
              </p>
            </div>
          </div>

          {hasConsent && preferences && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Cookie Necessari</span>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Cookie di Analisi</span>
                </div>
                <div className={`h-2 w-2 rounded-full ${preferences.analytics ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Cookie di Marketing</span>
                </div>
                <div className={`h-2 w-2 rounded-full ${preferences.marketing ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Cog className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Cookie Funzionali</span>
                </div>
                <div className={`h-2 w-2 rounded-full ${preferences.functional ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowCookieSettings(!showCookieSettings)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Settings className="h-5 w-5" />
            {t('manage_cookies') || 'Gestisci Cookie'}
          </button>
        </div>

        {/* Cookie Settings Panel */}
        {showCookieSettings && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('cookie_preferences') || 'Preferenze Cookie'}
            </h3>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {t('cookie_necessary') || 'Cookie Necessari'}
                  </h4>
                  <p className="text-green-700 text-sm">
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
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('cookie_analytics') || 'Cookie di Analisi'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {t('cookie_analytics_desc') || 'Ci aiutano a capire come i visitatori interagiscono con il sito web.'}
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`ml-4 w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    localPreferences.analytics ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('cookie_functional') || 'Cookie Funzionali'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {t('cookie_functional_desc') || 'Consentono funzionalità avanzate e personalizzazione.'}
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('functional')}
                  className={`ml-4 w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    localPreferences.functional ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('cookie_marketing') || 'Cookie di Marketing'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {t('cookie_marketing_desc') || 'Utilizzati per tracciare i visitatori sui siti web.'}
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={`ml-4 w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    localPreferences.marketing ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleUpdatePreferences}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('save_preferences') || 'Salva Preferenze'}
              </button>
              <button
                onClick={() => setShowCookieSettings(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('cancel') || 'Annulla'}
              </button>
            </div>
          </div>
        )}

        {/* Cookie Demo Component */}
        {hasConsent && (
          <div className="mb-8">
            <CookieAwareComponent />
          </div>
        )}

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('privacy_policy_full') || 'Informativa sulla Privacy'}
          </h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('data_collection') || 'Raccolta dei Dati'}
              </h3>
              <p>
                ChironHedge raccoglie informazioni per fornire e migliorare i nostri servizi di ricerca finanziaria. 
                Raccogliamo solo i dati necessari per il funzionamento del sito e, con il tuo consenso, 
                dati per analisi e miglioramento dell'esperienza utente.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('cookies_use') || 'Utilizzo dei Cookie'}
              </h3>
              <p>
                Utilizziamo quattro categorie di cookie:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Necessari:</strong> Essenziali per il funzionamento del sito</li>
                <li><strong>Analitici:</strong> Per comprendere l'utilizzo del sito</li>
                <li><strong>Funzionali:</strong> Per ricordare le tue preferenze</li>
                <li><strong>Marketing:</strong> Per annunci personalizzati (se abilitati)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('data_protection') || 'Protezione dei Dati'}
              </h3>
              <p>
                I tuoi dati sono protetti con misure di sicurezza avanzate. Non vendiamo né condividiamo 
                le tue informazioni personali con terze parti senza il tuo consenso esplicito, 
                eccetto quando richiesto dalla legge.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('your_rights') || 'I Tuoi Diritti'}
              </h3>
              <p>
                Hai il diritto di accedere, correggere, cancellare i tuoi dati personali e 
                modificare le tue preferenze sui cookie in qualsiasi momento utilizzando 
                i controlli disponibili in questa pagina.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}