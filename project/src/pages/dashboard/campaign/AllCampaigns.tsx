import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { CampaignList } from '../../../components/dashboard/campaign/all/CampaignList';
import { CampaignFilters } from '../../../components/dashboard/campaign/all/CampaignFilters';
import { useAllCampaigns } from '../../../hooks/useAllCampaigns';

export function AllCampaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { campaigns, isLoading, error } = useAllCampaigns();

  // Filter campaigns based on search term and status
  const filteredCampaigns = React.useMemo(() => {
    if (!campaigns) return [];
    
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchTerm, statusFilter]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-foreground">
            All Campaigns
          </h1>
        </div>

        <CampaignFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <CampaignList
          campaigns={filteredCampaigns}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
}