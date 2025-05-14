import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { key: "home", name: "Home", href: "/" },
  { key: "navbar.quantitativeModel", name: "Quantitative Model", href: "/quantitative-model" },
  { key: "navbar.marketsInsight", name: "Markets Insight", href: "/markets-insight" },
  { key: "navbar.research", name: "Our Research", href: "/our-research" },
  { key: "navbar.macroReport", name: "Macro Report", href: "/macro-report" },
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
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <div className="mr-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              {/* Centaur body (horse part) */}
              <path 
                d="M20 16C20 16 18 20 14 20C10 20 8 16 8 16L8 13L9 12L10 11L12 10L14 10.5L16 11L18 13L20 16Z" 
                fill="currentColor" 
                opacity="0.8"
              />
              {/* Legs */}
              <path 
                d="M10 18L11 22M14 18L13 22" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
              {/* Human torso */}
              <path 
                d="M12 10C14 10 15 8 15 6C15 4 14 2 12 2C10 2 9 4 9 6C9 8 10 10 12 10Z" 
                fill="currentColor"
              />
              {/* Arm with bow */}
              <path 
                d="M8 7C7 7 6 8 6 9C6 10 7 11 7 11" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
              {/* Bow string */}
              <path 
                d="M7 6L7 12" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                strokeLinecap="round"
              />
              {/* Arrow */}
              <path 
                d="M7 9H3" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
              {/* Arrow tip */}
              <path 
                d="M3 9L4 8M3 9L4 10" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
              {/* Star - wisdom symbol */}
              <circle cx="12" cy="5" r="0.7" fill="#3B82F6" />
            </svg>
          </div>
          <Link href="/" className="py-4">
            <span className="text-xl md:text-2xl font-bold text-primary">
              Chiron<span className="text-secondary">Research</span>
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
          <Link href="/contact" className="px-5 py-2.5 text-sm font-medium text-primary blue-gradient hover:brightness-105 rounded-none transition-all">
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
                className="w-full px-5 py-2.5 text-center text-sm font-medium text-primary blue-gradient hover:brightness-105 rounded-none transition-all"
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
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default NavBar;
