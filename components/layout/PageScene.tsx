'use client';

import { motion } from 'framer-motion';

export function PageScene({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="page-scene"
      initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
