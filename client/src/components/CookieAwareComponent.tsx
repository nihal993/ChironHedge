import { useEffect, useState } from 'react';
import { useCookies } from '@/hooks/use-cookies';
import { Eye, Target, Settings } from 'lucide-react';

// Esempio di componente che rispetta le preferenze dei cookie
export default function CookieAwareComponent() {
  const { canUseAnalytics, canUseMarketing, canUseFunctional } = useCookies();
  const [pageViews, setPageViews] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    theme: 'light',
    language: 'it'
  });

  useEffect(() => {
    // Analytics: traccia visualizzazioni pagina solo se consentito
    if (canUseAnalytics) {
      const views = parseInt(localStorage.getItem('page-views') || '0') + 1;
      localStorage.setItem('page-views', views.toString());
      setPageViews(views);
      
      // Simula invio dati a Google Analytics
      console.log('📊 Analytics: Page view tracked', { views });
    }
  }, [canUseAnalytics]);

  useEffect(() => {
    // Functional: carica preferenze utente solo se consentito
    if (canUseFunctional) {
      const savedTheme = localStorage.getItem('user-theme') || 'light';
      const savedLang = localStorage.getItem('user-language') || 'it';
      setUserPreferences({ theme: savedTheme, language: savedLang });
      
      console.log('⚙️ Functional: User preferences loaded', { theme: savedTheme, language: savedLang });
    }
  }, [canUseFunctional]);

  useEffect(() => {
    // Marketing: traccia comportamento utente solo se consentito
    if (canUseMarketing) {
      const sessionId = 'session_' + Date.now();
      sessionStorage.setItem('marketing-session', sessionId);
      
      // Simula pixel di tracking
      console.log('🎯 Marketing: User session tracked', { sessionId });
    }
  }, [canUseMarketing]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" />
        Cookie Policy in Azione
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Cookie Necessari</span>
          </div>
          <span className="text-xs text-green-700">Sempre attivi</span>
        </div>

        <div className={`flex items-center justify-between p-3 rounded-lg ${
          canUseAnalytics ? 'bg-blue-50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${
              canUseAnalytics ? 'bg-blue-500' : 'bg-gray-400'
            }`}></div>
            <Eye className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Analytics</span>
          </div>
          <span className={`text-xs ${
            canUseAnalytics ? 'text-blue-700' : 'text-gray-500'
          }`}>
            {canUseAnalytics ? `${pageViews} visualizzazioni` : 'Disabilitato'}
          </span>
        </div>

        <div className={`flex items-center justify-between p-3 rounded-lg ${
          canUseMarketing ? 'bg-purple-50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${
              canUseMarketing ? 'bg-purple-500' : 'bg-gray-400'
            }`}></div>
            <Target className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Marketing</span>
          </div>
          <span className={`text-xs ${
            canUseMarketing ? 'text-purple-700' : 'text-gray-500'
          }`}>
            {canUseMarketing ? 'Tracciamento attivo' : 'Disabilitato'}
          </span>
        </div>

        <div className={`flex items-center justify-between p-3 rounded-lg ${
          canUseFunctional ? 'bg-orange-50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${
              canUseFunctional ? 'bg-orange-500' : 'bg-gray-400'
            }`}></div>
            <Settings className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Funzionali</span>
          </div>
          <span className={`text-xs ${
            canUseFunctional ? 'text-orange-700' : 'text-gray-500'
          }`}>
            {canUseFunctional ? `Tema: ${userPreferences.theme}` : 'Disabilitato'}
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          Questo componente dimostra come i cookie vengono utilizzati rispettando le tue preferenze. 
          Apri la console per vedere i log delle attività.
        </p>
      </div>
    </div>
  );
}