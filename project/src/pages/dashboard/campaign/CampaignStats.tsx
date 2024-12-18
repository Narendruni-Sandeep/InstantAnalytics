import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { SearchBar } from '../../../components/dashboard/email/SearchBar';
import { CampaignStatsCard } from '../../../components/dashboard/campaign/CampaignStatsCard';
import { useCampaignStats } from '../../../hooks/useCampaignStats';

export function CampaignStats() {
  const { stats, isLoading, error } = useCampaignStats();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter stats based on search term
  const filteredStats = React.useMemo(() => {
    if (!searchTerm) return stats;
    
    const term = searchTerm.toLowerCase();
    return stats.filter(stat => 
      stat.client.toLowerCase().includes(term)
    );
  }, [stats, searchTerm]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Campaign Stats
          </h1>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search clients..."
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="h-[100px] rounded-xl bg-card/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredStats.map((clientStats, index) => (
              <CampaignStatsCard
                key={clientStats.client}
                stats={clientStats}
                delay={index * 0.1}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}