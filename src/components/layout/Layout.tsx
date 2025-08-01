import React from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();

  const pageVariants = {
    initial: { opacity: 0, x: 0, y: 20 },
    in: { opacity: 1, x: 0, y: 0 },
    out: { opacity: 0, x: 0, y: -20 }
  };

  const pageTransition: Transition = {
    type: "spring",
    damping: 25,
    stiffness: 300,
    duration: 0.3
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 via-white to-amber-50 text-gray-900'
    }`}>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="flex-1 pt-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;