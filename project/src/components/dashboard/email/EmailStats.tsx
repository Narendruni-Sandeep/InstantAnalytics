import React from 'react';
import { StatsCard } from './StatsCard';
import { StatsGrid } from './StatsGrid';
import { TotalMailboxCount } from './TotalMailboxCount';
import type { EmailStatsData } from '../../../types/email';

interface EmailStatsProps {
  stats: EmailStatsData[];
  lastUpdateDate: string;
  isLoading: boolean;
}

export function EmailStats({ stats, lastUpdateDate, isLoading }: EmailStatsProps) {
  const totalMailboxes = stats.reduce((acc, curr) => acc + curr.total_emails, 0);

  if (isLoading) {
    return <StatsGrid />;
  }

  return (
    <div className="space-y-6">
      <TotalMailboxCount count={totalMailboxes} />
      
      <div className="space-y-4">
        {stats.map((clientStats, index) => (
          <StatsCard
            key={clientStats.client}
            title={clientStats.client}
            stats={clientStats}
            lastUpdateDate={lastUpdateDate}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}