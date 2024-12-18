import React from 'react';
import { motion } from 'framer-motion';
import { Globe, AtSign } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'domains' | 'providers';
  onTabChange: (tab: 'domains' | 'providers') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    {
      id: 'domains',
      label: 'Domain Analytics',
      icon: Globe
    },
    {
      id: 'providers',
      label: 'Provider Analytics',
      icon: AtSign
    }
  ];

  return (
    <div className="flex border-b border-border">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as 'domains' | 'providers')}
            className={`px-6 py-3 text-sm font-medium transition-colors relative flex items-center gap-2 ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}