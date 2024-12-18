import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { SearchBar } from '../../../components/dashboard/email/SearchBar';
import { StatsCard } from '../../../components/dashboard/email/StatsCard';
import { useEmailStats } from '../../../hooks/useEmailStats';

export function MailboxStats() {
  const { stats, lastUpdateDate, isLoading, error } = useEmailStats();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter stats based on search term
  const filteredStats = useMemo(() => {
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
            Mailbox Stats
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
                className="h-[200px] rounded-xl bg-card/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredStats.map((clientStats, index) => (
              <StatsCard
                key={clientStats.client}
                title={clientStats.client}
                stats={clientStats}
                lastUpdateDate={lastUpdateDate}
                delay={index * 0.1}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}