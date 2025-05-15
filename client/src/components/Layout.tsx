import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import NewsTicker from "./NewsTicker";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
    </div>
  );
};

export default Layout;
