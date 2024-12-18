import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { ClientSelect } from '../../../components/dashboard/email/ClientSelect';
import { DateRangePicker } from '../../../components/dashboard/email/DateRangePicker';
import { CampaignList } from '../../../components/dashboard/campaign/CampaignList';
import { CampaignMetrics } from '../../../components/dashboard/campaign/CampaignMetrics';
import { CampaignTrendCharts } from '../../../components/dashboard/campaign/charts/CampaignTrendCharts';
import { useClients } from '../../../hooks/useClients';
import { useCampaignData } from '../../../hooks/useCampaignData';

export function CampaignByClient() {
  const { clients, isLoading: clientsLoading } = useClients();
  const [filters, setFilters] = useState({
    clientId: '',
    dateRange: {
      startDate: new Date(new Date().setDate(1)), // First day of current month
      endDate: new Date() // Today
    }
  });

  // Set first client as default when clients are loaded
  useEffect(() => {
    if (clients.length > 0 && !filters.clientId) {
      setFilters(prev => ({
        ...prev,
        clientId: clients[0].id
      }));
    }
  }, [clients]);

  const { data: campaignData, metrics, isLoading, error } = useCampaignData(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-64">
            <ClientSelect
              clients={clients}
              value={filters.clientId}
              onChange={(clientId) => setFilters(prev => ({ ...prev, clientId }))}
              isLoading={clientsLoading}
            />
          </div>

          <DateRangePicker
            startDate={filters.dateRange.startDate}
            endDate={filters.dateRange.endDate}
            onChange={(dateRange) => setFilters(prev => ({ ...prev, dateRange }))}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {metrics && (
          <CampaignMetrics metrics={metrics} />
        )}

        <CampaignTrendCharts
          data={campaignData}
          isLoading={isLoading}
          error={error}
        />

        <CampaignList
          campaigns={campaignData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DashboardLayout>
  );
}