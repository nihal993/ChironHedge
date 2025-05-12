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

  // Bandiera USA
  const USFlag = () => (
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
  );

  // Bandiera Italiana
  const ItalianFlag = () => (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-y-0 left-0 w-1/3 bg-green-600"></div>
      <div className="absolute inset-y-0 left-1/3 w-1/3 bg-white"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 bg-red-600"></div>
    </div>
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