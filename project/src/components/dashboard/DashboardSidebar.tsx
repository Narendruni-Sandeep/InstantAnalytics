import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { SidebarNav } from './sidebar/SidebarNav';
import { SidebarFooter } from './sidebar/SidebarFooter';

export function DashboardSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, signOut } = useAuth();

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 z-30 flex flex-col bg-card/50 backdrop-blur-xl border-r border-border"
      initial={false}
      animate={{ width: isExpanded ? 240 : 72 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarLogo isExpanded={isExpanded} />
      <SidebarNav isExpanded={isExpanded} />
      <SidebarFooter 
        isExpanded={isExpanded}
        user={user}
        onSignOut={signOut}
      />
    </motion.div>
  );
}