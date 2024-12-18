import React from 'react';
import { motion } from 'framer-motion';

type Tab = 'emails' | 'campaigns' | 'domains';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabLabels = {
    emails: 'Mailbox Accounts',
    campaigns: 'Campaigns',
    domains: 'Domains'
  };

  return (
    <div className="flex border-b border-border">
      {(['emails', 'campaigns', 'domains'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tabLabels[tab]}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      ))}
    </div>
  );
}