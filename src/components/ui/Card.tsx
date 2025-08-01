import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  clickable = false,
  onClick
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
        clickable ? 'cursor-pointer' : ''
      } ${className}`}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;