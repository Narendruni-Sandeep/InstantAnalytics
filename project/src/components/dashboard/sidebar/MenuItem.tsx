import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubMenuItem } from './SubMenuItem';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isExpanded: boolean;
  isActive: boolean;
  submenu?: Array<{ label: string; path: string }>;
  expandedSubmenu: string | null;
  onSubmenuClick: (path: string) => void;
}

export function MenuItem({
  icon: Icon,
  label,
  path,
  isExpanded,
  isActive,
  submenu,
  expandedSubmenu,
  onSubmenuClick,
}: MenuItemProps) {
  if (submenu) {
    return (
      <div>
        <button
          onClick={() => onSubmenuClick(path)}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-lg
            transition-colors duration-200
            ${isActive
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'}
          `}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 flex items-center justify-between"
              >
                <span>{label}</span>
                <motion.div
                  animate={{ rotate: expandedSubmenu === path ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <AnimatePresence>
          {isExpanded && expandedSubmenu === path && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 mt-2 space-y-2"
            >
              {submenu.map((item) => (
                <SubMenuItem key={item.path} {...item} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) => `
        flex items-center gap-3 px-3 py-2 rounded-lg
        transition-colors duration-200
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'}
      `}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
}