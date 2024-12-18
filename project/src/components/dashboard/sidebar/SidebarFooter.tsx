import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { ThemeToggleSection } from './ThemeToggleSection';
import { UserSection } from './UserSection';

interface SidebarFooterProps {
  isExpanded: boolean;
  user: User | null;
  onSignOut: () => void;
}

export function SidebarFooter({ isExpanded, user, onSignOut }: SidebarFooterProps) {
  const firstName = user?.user_metadata?.first_name || 'User';
  const lastName = user?.user_metadata?.last_name || '';

  return (
    <div className="border-t border-border p-2 space-y-2">
      <ThemeToggleSection isExpanded={isExpanded} />
      
      <UserSection
        isExpanded={isExpanded}
        firstName={firstName}
        lastName={lastName}
      />

      <button
        onClick={onSignOut}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
          text-destructive hover:text-destructive/90 hover:bg-destructive/10
          transition-colors duration-200"
      >
        <LogOut className="w-5 h-5 shrink-0" />
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              Sign Out
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}