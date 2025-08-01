import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex items-center ${className}`}>
      <span className={`text-2xl font-bold ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        R
      </span>
      <span className={`ml-1 text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent`}>
        oammate
      </span>
    </div>
  );
};

export default Logo;
