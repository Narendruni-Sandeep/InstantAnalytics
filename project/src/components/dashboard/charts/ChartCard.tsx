import React from 'react';
import { motion } from 'framer-motion';

interface ChartCardProps {
  children: React.ReactNode;
}

export function ChartCard({ children }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-card border border-border backdrop-blur-xl"
    >
      {children}
    </motion.div>
  );
}