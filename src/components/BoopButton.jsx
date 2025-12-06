// src/components/BoopButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BoopButton = ({ children, onClick, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.85, rotate: -2 }} // 按下时缩小并稍微旋转
      onClick={onClick}
      className={`${className} transition-colors`}
    >
      {children}
    </motion.button>
  );
};

export default BoopButton;