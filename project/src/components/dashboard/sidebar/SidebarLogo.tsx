import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../../Logo';

interface SidebarLogoProps {
  isExpanded: boolean;
}

export function SidebarLogo({ isExpanded }: SidebarLogoProps) {
  return (
    <div className="h-16 flex items-center px-4 border-b border-border">
      <motion.div
        className="flex items-center gap-3"
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 0 }}
      >
        <Logo />
      </motion.div>
    </div>
  );
}