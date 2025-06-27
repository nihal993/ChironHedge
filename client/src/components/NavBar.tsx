import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import React from "react";


import logoImage from "@/assets/logo.png";

const navLinks = [
  { key: "home", name: "Home", href: "/", id: "hero" },
  { key: "navbar.marketsInsight", name: "Markets Insight", href: "/markets-insight", id: "markets-insight" },
  { key: "navbar.research", name: "Our Research", href: "/research", id: "our-research" },
  { key: "navbar.strategies", name: "Portfolio Strategies", href: "/quantitative-strategies", id: "quantitative-strategies" }
];

const searchPhrasesEN = [
  "Machine Learning use cases in finance",
  "LLM and AI agent in market analysis",
  "Quantitative risk modeling strategies",
  "Alternative data in portfolio construction",
  "Deep learning for credit scoring",
  "NLP for financial sentiment analysis"
];

const searchPhrasesIT = [
  "Machine Learning applicato alla finanza",
  "LLM e AI agent nell'analisi di mercato",
  "Strategie quantitative di risk modeling",
  "Dati alternativi nella costruzione di portafogli",
  "Deep learning per credit scoring",
  "NLP per analisi sentiment finanziario"
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const { language, t } = useLanguage();

  // Get search phrases based on current language
  const searchPhrases = language === 'it' ? searchPhrasesIT : searchPhrasesEN;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Separate effect for section detection using Intersection Observer
  useEffect(() => {
    if (location !== "/") return;

    const sections = ["hero", "markets-insight", "our-research", "quantitative-strategies"];
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px', // Section is active when 20% into viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            console.log('Section in view:', sectionId); // Debug log
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location]);

  // Auto-rotate search phrases with typing effect
  useEffect(() => {
    if (!searchFocused && !searchQuery) {
      const interval = setInterval(() => {
        setCurrentPhrase((prev) => (prev + 1) % searchPhrases.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [searchFocused, searchQuery, searchPhrases.length]);

  // Reset phrase index when language changes
  useEffect(() => {
    setCurrentPhrase(0);
  }, [language]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    if (location === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <header className={cn(
      "w-full transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/" className="flex items-center py-4">
            <div className="h-10 w-10 mr-1 flex items-center justify-center">
              <img src={logoImage} alt="Chiron Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary">
              Chiron<span className="text-secondary">Hedge</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full">
          {navLinks.map((link) => {
            const isActive = location === "/" ? activeSection === link.id : location === link.href;
            
            // Special handling for Research dropdown
            if (link.key === "navbar.research") {
              return (
                <div 
                  key={link.href} 
                  className="relative h-full"
                  onMouseEnter={() => setResearchDropdownOpen(true)}
                  onMouseLeave={() => setResearchDropdownOpen(false)}
                >
                  <button
                    className={cn(
                      "nav-link font-medium text-primary hover:text-secondary transition-colors h-full px-4 py-5 flex items-center",
                      (location.startsWith('/research') || (location === "/" && activeSection === link.id)) ? "text-secondary" : ""
                    )}
                  >
                    {t(link.key)}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${researchDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {researchDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-48 bg-white shadow-lg border border-gray-200 rounded-md z-50"
                      >
                        <div className="py-2">
                          <Link
                            href="/research"
                            className="block px-4 py-2 text-sm text-primary hover:bg-gray-50 hover:text-secondary transition-colors"
                          >
                            Overview
                          </Link>
                          <Link
                            href="/research/data-science"
                            className="block px-4 py-2 text-sm text-primary hover:bg-gray-50 hover:text-secondary transition-colors"
                          >
                            Data Science
                          </Link>
                          <Link
                            href="/research/engineering"
                            className="block px-4 py-2 text-sm text-primary hover:bg-gray-50 hover:text-secondary transition-colors"
                          >
                            Engineering
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            
            return (
              <div key={link.href} className="relative">
                {location === "/" ? (
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "nav-link font-medium text-primary hover:text-secondary transition-colors h-full px-4 py-5 relative",
                      isActive ? "text-secondary" : ""
                    )}
                  >
                    {link.key === "home" ? link.name : t(link.key)}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link font-medium text-primary hover:text-secondary transition-colors h-full px-4 py-5 border-b-2",
                      location === link.href ? "border-secondary" : "border-transparent"
                    )}
                  >
                    {link.key === "home" ? link.name : t(link.key)}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors bg-white"
                placeholder={searchFocused || searchQuery ? (language === 'it' ? "Cerca argomenti di ricerca..." : "Search research topics...") : ""}
              />
              {!searchFocused && !searchQuery && (
                <div className="absolute left-10 right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 pointer-events-none overflow-hidden whitespace-nowrap">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhrase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="truncate"
                    >
                      {searchPhrases[currentPhrase]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </form>
        </div>
        
        <div className="hidden lg:flex items-center space-x-5">
          <Link href="/contact" className="px-5 py-2.5 text-sm font-medium text-white bg-secondary hover:bg-secondary/90 rounded-none transition-all">
            {t('contact')}
          </Link>
          
          <Link href="/login" className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/80 rounded-none transition-colors">
            {t('login')}
          </Link>
          
          {/* Language Switcher - posizionata dopo login nella versione desktop */}
          <div className="relative h-9 flex items-center">
            <LanguageSwitcher />
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            className="text-primary p-2"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden bg-white w-full py-4 px-4 shadow-lg animate-fade-in absolute top-full left-0"
        >
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium text-primary hover:text-secondary py-3 px-2 border-b border-gray-100",
                  location === link.href ? "text-secondary" : ""
                )}
                onClick={closeMenu}
              >
                {link.key === "home" ? link.name : t(link.key)}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 mt-2">
              <Link
                href="/contact"
                className="w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-secondary hover:bg-secondary/90 rounded-none transition-all"
                onClick={closeMenu}
              >
                {t('contact')}
              </Link>
              <Link
                href="/login"
                className="w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-primary hover:bg-primary/80 rounded-none transition-colors"
                onClick={closeMenu}
              >
                {t('login')}
              </Link>
              
              {/* Language Switcher nel menu mobile */}
              <div className="flex justify-center py-3 border-t border-gray-100 mt-2">
                <LanguageSwitcher onLanguageChange={() => closeMenu()} />
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default NavBar;
