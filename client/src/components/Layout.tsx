import React, { ReactNode, useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import NewsTicker from "./NewsTicker";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Controlla quando mostrare il pulsante "torna in alto"
  useEffect(() => {
    const handleScroll = () => {
      // Mostra il pulsante quando si scorre oltre i 300px
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Funzione per tornare in alto
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
        <NewsTicker />
      </div>
      <motion.main 
        className="flex-grow w-full max-w-[1200px] mx-auto px-4 pt-[120px]" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
      
      {/* Pulsante per tornare in alto */}
      <motion.button
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 focus:outline-none z-40"
        onClick={scrollToTop}
        aria-label="Torna in alto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2 }}
      >
        <ChevronUp size={20} />
      </motion.button>
    </div>
  );
};

export default Layout;
