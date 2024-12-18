import React from 'react';
import { BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BarChart2 className="w-7 h-7 text-primary" />
      <div className="flex items-center font-display">
        <span className="text-foreground">Instant</span>
        <span className="text-primary">Analytics</span>
      </div>
    </motion.div>
  );
}