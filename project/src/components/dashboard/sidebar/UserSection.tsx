import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

interface UserSectionProps {
  isExpanded: boolean;
  firstName: string;
  lastName: string;
}

export function UserSection({ isExpanded, firstName, lastName }: UserSectionProps) {
  return (
    <NavLink
      to="/dashboard/profile"
      className={({ isActive }) => `
        flex items-center gap-3 px-3 py-2 rounded-lg
        transition-colors duration-200
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'}
      `}
    >
      <User className="w-5 h-5 shrink-0" />
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex-1 min-w-0"
          >
            <div className="truncate">
              {firstName} {lastName}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              View Profile
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavLink>
  );
}