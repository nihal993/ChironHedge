import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Bandiera USA - versione molto semplificata
  const USFlag = () => (
    <svg viewBox="0 0 100 67" className="w-full h-full">
      {/* Sfondo bianco */}
      <rect width="100" height="67" fill="white" />
      
      {/* Strisce rosse */}
      <rect y="0" width="100" height="6" fill="#B22234" />
      <rect y="10" width="100" height="6" fill="#B22234" />
      <rect y="20" width="100" height="6" fill="#B22234" />
      <rect y="30" width="100" height="6" fill="#B22234" />
      <rect y="40" width="100" height="6" fill="#B22234" />
      <rect y="50" width="100" height="6" fill="#B22234" />
      <rect y="60" width="100" height="7" fill="#B22234" />
      
      {/* Area blu */}
      <rect width="40" height="35" fill="#3C3B6E" />
      
      {/* Stella semplice al centro */}
      <circle cx="20" cy="17.5" r="5" fill="white" />
    </svg>
  );

  // Bandiera Italiana - versione SVG
  const ItalianFlag = () => (
    <svg viewBox="0 0 100 67" className="w-full h-full">
      <rect width="33.33" height="67" fill="#008C45" x="0" y="0" />
      <rect width="33.33" height="67" fill="#F4F5F0" x="33.33" y="0" />
      <rect width="33.33" height="67" fill="#CD212A" x="66.66" y="0" />
    </svg>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-6 border shadow-sm overflow-hidden transition-all hover:scale-105"
        title={language === 'en' ? 'Change language' : 'Cambia lingua'}
        aria-label="Language switcher"
      >
        {language === 'en' ? <USFlag /> : <ItalianFlag />}
      </button>
      
      {isOpen && (
        <div className="fixed right-4 top-16 w-32 bg-white shadow-lg rounded-sm z-50 border border-gray-200 overflow-hidden">
          <div className="py-1">
            <button 
              className={cn(
                "w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 transition-colors",
                language === 'en' && "bg-gray-50 font-medium"
              )}
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
            >
              <div className="w-6 h-4 overflow-hidden">
                <USFlag />
              </div>
              <span>English</span>
            </button>
            
            <button 
              className={cn(
                "w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 transition-colors",
                language === 'it' && "bg-gray-50 font-medium"
              )}
              onClick={() => {
                setLanguage('it');
                setIsOpen(false);
              }}
            >
              <div className="w-6 h-4 overflow-hidden">
                <ItalianFlag />
              </div>
              <span>Italiano</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;