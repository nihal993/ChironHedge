import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'it' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-secondary transition-colors"
      title={language === 'en' ? 'Switch to Italian' : 'Passa all\'inglese'}
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'IT' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;