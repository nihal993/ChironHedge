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
  { key: "navbar.research", name: "Our Research", href: "/research", id: "our-research" },
  { key: "navbar.marketsInsight", name: "Markets Insight", href: "/markets-insight", id: "markets-insight" },
  //{ key: "navbar.strategies", name: "Portfolio Strategies", href: "/quantitative-strategies", id: "quantitative-strategies" }
  { key: "financialNews", name: "Financial News", href: "/news-ai", id: "news-ai" },
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
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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

  // Simplified scroll detection with throttling
  useEffect(() => {
    if (location !== "/") return;

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ["hero", "markets-insight", "our-research", "quantitative-strategies"];
          const scrollPos = window.scrollY + 100;
          
          let currentSection = "hero";
          
          // Find the last section that we've scrolled past
          for (let i = 0; i < sections.length; i++) {
            const element = document.getElementById(sections[i]);
            if (element && element.offsetTop <= scrollPos) {
              currentSection = sections[i];
            }
          }
          
          // console.log('Active section:', currentSection); // Debug log
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  // Search functionality with debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const results = await response.json();
          setSearchResults(results);
          setShowSearchResults(true);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
        const navbarHeight = 80;
        const elementTop = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
        // Update active section immediately
        setActiveSection(sectionId);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      // Navigate to the first result
      const firstResult = searchResults[0];
      window.location.href = firstResult.url;
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result: any) => {
    setSearchQuery("");
    setShowSearchResults(false);
    window.location.href = result.url;
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => {
      setShowSearchResults(false);
      setSearchFocused(false);
    }, 150);
  };

  return (
    <header className={cn(
      "w-full transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white/80 backdrop-blur-sm"
    )}>
      <div className="w-full max-w-none px-6 lg:px-12 xl:px-20 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/" className="flex items-center py-4 xl:py-5">
            <div className="h-10 w-10 xl:h-12 xl:w-12 mr-2 xl:mr-3 flex items-center justify-center">
              <img src={logoImage} alt="Chiron Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl md:text-2xl xl:text-3xl font-bold text-primary">
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
                      "nav-link font-medium text-primary hover:text-secondary transition-colors h-full px-4 xl:px-6 py-5 xl:py-6 flex items-center text-sm xl:text-base",
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
                      "nav-link font-medium text-primary hover:text-secondary transition-colors h-full px-4 xl:px-6 py-5 xl:py-6 relative text-sm xl:text-base",
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
                      "nav-link font-medium text-primary hover:text-secondary transition-colors h-full px-4 xl:px-6 py-5 xl:py-6 border-b-2 text-sm xl:text-base",
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
        <div className="hidden lg:flex items-center flex-1 max-w-xl xl:max-w-2xl mx-8 xl:mx-16">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
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
            
            {/* Search Results Dropdown - Enhanced Professional Design */}
            {showSearchResults && (searchResults.length > 0 || isSearching) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[500px] overflow-y-auto w-[500px] max-w-[90vw]">
                {isSearching ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary mx-auto mb-4"></div>
                    <span className="text-base font-medium">Searching our research database...</span>
                  </div>
                ) : (
                  <div className="py-3">
                    <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-700">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                      </p>
                    </div>
                    {searchResults.map((result, index) => (
                      <div
                        key={result.id}
                        onClick={() => handleSearchResultClick(result)}
                        className="px-6 py-5 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-200 hover:shadow-sm"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">
                                {result.type === 'page' ? '📄' : 
                                 result.type === 'research' ? '📊' :
                                 result.type === 'strategy' ? '💼' : '📰'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900 truncate">
                                {result.title}
                              </h4>
                              <span className="flex-shrink-0 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                {result.type}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                              {result.summary}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium">
                                  {result.category}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">
                                  Relevance: {Math.round(result.relevance * 1)}%
                                </span>
                              </div>
                              <div className="flex items-center text-blue-600 text-sm font-medium">
                                <span className="mr-2">Open</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {searchQuery && searchResults.length === 0 && !isSearching && (
                      <div className="p-8 text-center text-gray-500">
                        <div className="mb-4">
                          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">No results found for "{searchQuery}"</p>
                        <p className="text-sm text-gray-500 mb-4">Try different keywords or browse our research sections</p>
                        <div className="text-left space-y-2 max-w-md mx-auto">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Suggested searches:</p>
                          <div className="flex flex-wrap gap-2">
                            {['Market Analysis', 'AI Research', 'Portfolio Strategy', 'ESG Investment'].map((suggestion) => (
                              <button
                                key={suggestion}
                                onClick={() => setSearchQuery(suggestion)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 rounded-full transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <Link href="/contact" className="px-5 xl:px-7 py-2.5 xl:py-3 text-sm xl:text-base font-medium text-white bg-secondary hover:bg-secondary/90 rounded-none transition-all">
            {t('contact')}
          </Link>
          
          <Link href="/login" className="px-5 xl:px-7 py-2.5 xl:py-3 text-sm xl:text-base font-medium text-white bg-primary hover:bg-primary/80 rounded-none transition-colors">
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
