import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../../ThemeToggle';

interface ThemeToggleSectionProps {
  isExpanded: boolean;
}

export function ThemeToggleSection({ isExpanded }: ThemeToggleSectionProps) {
  return (
    <div className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
      isExpanded ? 'flex items-center gap-3' : 'flex justify-center'
    }`}>
      <ThemeToggle />
      {isExpanded && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-muted-foreground"
        >
          Theme
        </motion.span>
      )}
    </div>
  );
}