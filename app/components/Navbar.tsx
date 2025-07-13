'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../providers/LanguageProvider';
import { Menu, X, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ChironHedge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/research" className="text-gray-600 hover:text-primary transition-colors">
              {t('research')}
            </Link>
            <Link href="/markets" className="text-gray-600 hover:text-primary transition-colors">
              {t('markets')}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
              {t('contact')}
            </Link>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
            
            <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              {t('login')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              href="/research" 
              className="block text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('research')}
            </Link>
            <Link 
              href="/markets" 
              className="block text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('markets')}
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('contact')}
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <Link 
                href="/login" 
                className="block w-full bg-primary text-white text-center px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('login')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}