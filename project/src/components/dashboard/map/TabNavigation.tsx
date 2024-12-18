import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  count: number;
  showIncrement?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            <AnimatePresence mode="wait">
              {typeof tab.count === 'number' && (
                <motion.div
                  key={`${tab.id}-${tab.count}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                    {tab.count}
                  </span>
                  {tab.showIncrement && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: -20 }}
                      exit={{ opacity: 0 }}
                      className="absolute -right-2 -top-1 text-xs font-medium text-primary"
                    >
                      +1
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}