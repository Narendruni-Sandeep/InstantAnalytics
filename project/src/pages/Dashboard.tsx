import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardStats } from '../components/dashboard/stats/DashboardStats';
import { NavigationGrid } from '../components/dashboard/navigation/NavigationGrid';
import { useAuth } from '../hooks/useAuth';
import { useDashboardStats } from '../hooks/useDashboardStats';

function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
}

export function Dashboard() {
  const { user } = useAuth();
  const { stats, isLoading, error } = useDashboardStats();
  const firstName = user?.user_metadata?.first_name || 'User';
  const greeting = getGreeting();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-display font-bold mb-4">
            {greeting}, <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{firstName}</span>!
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome to your analytics dashboard
          </p>
        </motion.div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <DashboardStats
          totalClients={stats.totalClients}
          totalEmails={stats.totalEmails}
          totalDomains={stats.totalDomains}
          totalCampaigns={stats.totalCampaigns}
          connectedEmails={stats.connectedEmails}
          disconnectedEmails={stats.disconnectedEmails}
          warmupActive={stats.warmupActive}
          warmupInactive={stats.warmupInactive}
          campaignActive={stats.campaignActive}
          campaignPaused={stats.campaignPaused}
          campaignCompleted={stats.campaignCompleted}
          emailProviders={stats.emailProviders}
          isLoading={isLoading}
        />

        <div className="pt-8">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
            Quick Navigation
          </h2>
          <NavigationGrid />
        </div>
      </div>
    </DashboardLayout>
  );
}