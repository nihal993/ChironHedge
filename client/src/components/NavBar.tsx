import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "News AI", href: "/news-ai" },
  { name: "Quantitative Model", href: "/quantitative-model" },
  { name: "Markets Insight", href: "/markets-insight" },
  { name: "Our Research", href: "/our-research" },
  { name: "Macro Report", href: "/macro-report" },
  { name: "Quantitative Strategies", href: "/quantitative-strategies" },
  { name: "Get in Touch", href: "/contact" }
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

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
        <Link href="/" className="flex items-center py-4">
          <span className="text-xl md:text-2xl font-bold text-primary">
            Quantum<span className="text-secondary">Finance</span>
          </span>
        </Link>
        
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
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden lg:flex items-center">
          <Link href="/login" className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/80 rounded-none transition-colors mr-3">
            Accedi
          </Link>
          <Link href="/contact" className="px-5 py-2.5 text-sm font-medium text-primary gold-gradient hover:brightness-105 rounded-none transition-all">
            Contattaci
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-primary p-2"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 mt-2">
              <Link
                href="/login"
                className="w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-primary hover:bg-primary/80 rounded-none transition-colors"
                onClick={closeMenu}
              >
                Accedi
              </Link>
              <Link
                href="/contact"
                className="w-full px-5 py-2.5 text-center text-sm font-medium text-primary gold-gradient hover:brightness-105 rounded-none transition-all"
                onClick={closeMenu}
              >
                Contattaci
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default NavBar;
