import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: Language) => void;
}

const LanguageSwitcher = ({ onLanguageChange }: LanguageSwitcherProps) => {
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

  // Bandiera UK - Union Jack semplificata
  const UKFlag = () => (
    <svg viewBox="0 0 60 36" className="w-full h-full">
      {/* Sfondo blu */}
      <rect width="60" height="36" fill="#012169" />
      
      {/* Croce bianca di Sant'Andrea (diagonali) */}
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="white" strokeWidth="4" />
      
      {/* Bordi bianchi per la croce di San Giorgio */}
      <rect x="24" y="0" width="12" height="36" fill="white" />
      <rect x="0" y="12" width="60" height="12" fill="white" />
      
      {/* Croce rossa di San Giorgio (verticale e orizzontale) */}
      <rect x="27" y="0" width="6" height="36" fill="#C8102E" />
      <rect x="0" y="15" width="60" height="6" fill="#C8102E" />
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
        className={cn(
          "flex items-center justify-center w-8 h-6 rounded overflow-hidden border border-gray-200",
          isOpen ? "ring-2 ring-blue-500" : "hover:border-gray-300"
        )}
        aria-label="Change language"
      >
        {language === 'en' ? <UKFlag /> : <ItalianFlag />}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10 w-40">
          <button
            className={cn(
              "flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-50",
              language === 'en' ? "bg-blue-50" : ""
            )}
            onClick={() => {
              setLanguage('en');
              setIsOpen(false);
              onLanguageChange?.('en');
            }}
          >
            <div className="w-6 h-4">
              <UKFlag />
            </div>
            <span>English</span>
          </button>
          
          <button
            className={cn(
              "flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-50",
              language === 'it' ? "bg-blue-50" : ""
            )}
            onClick={() => {
              setLanguage('it');
              setIsOpen(false);
              onLanguageChange?.('it');
            }}
          >
            <div className="w-6 h-4">
              <ItalianFlag />
            </div>
            <span>Italiano</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;