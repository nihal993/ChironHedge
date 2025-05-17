import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import React from "react";


import logoImage from "@/assets/logo.png";

const navLinks = [
  { key: "home", name: "Home", href: "/" },
  { key: "navbar.quantitativeModel", name: "Quantitative Model", href: "/quantitative-model" },
  { key: "navbar.marketsInsight", name: "Markets Insight", href: "/markets-insight" },
  { key: "navbar.research", name: "Our Research", href: "/our-research" },
  { key: "navbar.strategies", name: "Quantitative Strategies", href: "/quantitative-strategies" }
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
              Chiron<span className="text-secondary">Edge</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link font-medium text-primary hover:text-secondary transition-colors h-full px-4 py-5 border-b-2",
                location === link.href ? "border-secondary" : "border-transparent"
              )}
            >
              {link.key === "home" ? link.name : t(link.key)}
            </Link>
          ))}
        </nav>
        
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
