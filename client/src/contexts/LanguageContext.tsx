import { createContext, useState, useContext, ReactNode } from 'react';
import { Language, translations, t as translate } from '@/lib/i18n';

// Re-export Language type for easy import
export type { Language } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultState: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: () => ''
};

const LanguageContext = createContext<LanguageContextType>(defaultState);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => translate(key, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}