import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-3">
      <button 
        onClick={() => setLanguage('it')}
        className={cn(
          "flex items-center justify-center w-8 h-6 border shadow-sm overflow-hidden transition-all hover:scale-110",
          language === 'it' ? 'border-secondary ring-1 ring-secondary scale-110' : 'border-gray-300 opacity-90 hover:opacity-100'
        )}
        title="Passa all'italiano"
        aria-label="Seleziona lingua italiana"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute inset-y-0 left-0 w-1/3 bg-green-600"></div>
          <div className="absolute inset-y-0 left-1/3 w-1/3 bg-white"></div>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-red-600"></div>
        </div>
      </button>
      
      <button 
        onClick={() => setLanguage('en')}
        className={cn(
          "flex items-center justify-center w-8 h-6 border shadow-sm overflow-hidden transition-all hover:scale-110",
          language === 'en' ? 'border-secondary ring-1 ring-secondary scale-110' : 'border-gray-300 opacity-90 hover:opacity-100'
        )}
        title="Switch to English"
        aria-label="Select English language"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-blue-900"></div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-white"></div>
          <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-red-600"></div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-white"></div>
          <div className="absolute inset-x-0 h-0.5 bg-white" style={{ top: '20%' }}></div>
          <div className="absolute inset-x-0 h-0.5 bg-white" style={{ top: '40%' }}></div>
          <div className="absolute inset-x-0 h-0.5 bg-white" style={{ top: '60%' }}></div>
          <div className="absolute inset-x-0 h-0.5 bg-white" style={{ top: '80%' }}></div>
          <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: '30%' }}></div>
        </div>
      </button>
    </div>
  );
};

export default LanguageSwitcher;