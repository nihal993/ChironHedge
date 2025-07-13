'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    research: 'Research',
    markets: 'Markets',
    strategies: 'Strategies',
    about: 'About',
    login: 'Login',
    logout: 'Logout',
    news: 'News',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    // Add more translations as needed
  },
  it: {
    home: 'Home',
    research: 'Ricerca',
    markets: 'Mercati', 
    strategies: 'Strategie',
    about: 'Chi Siamo',
    login: 'Accedi',
    logout: 'Esci',
    news: 'Notizie',
    contact: 'Contatti',
    privacy: 'Privacy Policy',
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'it')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}