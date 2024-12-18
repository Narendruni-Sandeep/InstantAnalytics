import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { ClientSelect } from '../../../components/dashboard/email/ClientSelect';
import { DateRangePicker } from '../../../components/dashboard/email/DateRangePicker';
import { EmailCharts } from '../../../components/dashboard/email/EmailCharts';
import { ConnectionStatusCharts } from '../../../components/dashboard/email/ConnectionStatusCharts';
import { useClients } from '../../../hooks/useClients';
import { useEmailTrend } from '../../../hooks/useEmailTrend';
import { useWarmupStatus } from '../../../hooks/useWarmupStatus';
import { useConnectionStatus } from '../../../hooks/useConnectionStatus';
import type { EmailFiltersState } from '../../../types/email';

export function EmailList() {
  const { clients, isLoading: clientsLoading } = useClients();
  const [filters, setFilters] = useState<EmailFiltersState>({
    clientId: '',
    dateRange: {
      startDate: new Date(new Date().setDate(1)), // First day of current month
      endDate: new Date() // Today
    }
  });

  // Set first client as default when clients are loaded
  React.useEffect(() => {
    if (clients.length > 0 && !filters.clientId) {
      setFilters(prev => ({
        ...prev,
        clientId: clients[0].id
      }));
    }
  }, [clients]);

  const { 
    data: trendData, 
    isLoading: trendLoading, 
    error: trendError 
  } = useEmailTrend(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  const {
    data: warmupData,
    isLoading: warmupLoading,
    error: warmupError
  } = useWarmupStatus(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  const {
    data: connectionData,
    isLoading: connectionLoading,
    error: connectionError
  } = useConnectionStatus(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-64">
            <ClientSelect
              clients={clients}
              value={filters.clientId}
              onChange={(clientId) => setFilters(prev => ({ ...prev, clientId }))}
              isLoading={clientsLoading}
            />
          </div>

          <h1 className="text-2xl font-display font-semibold text-foreground order-first sm:order-none">
            Email by Client
          </h1>

          <DateRangePicker
            startDate={filters.dateRange.startDate}
            endDate={filters.dateRange.endDate}
            onChange={(dateRange) => setFilters(prev => ({ ...prev, dateRange }))}
          />
        </div>

        <EmailCharts
          trendData={trendData}
          warmupData={warmupData}
          isLoading={trendLoading || warmupLoading}
          error={trendError || warmupError}
        />

        <ConnectionStatusCharts
          data={connectionData}
          isLoading={connectionLoading}
          error={connectionError}
        />
      </div>
    </DashboardLayout>
  );
}