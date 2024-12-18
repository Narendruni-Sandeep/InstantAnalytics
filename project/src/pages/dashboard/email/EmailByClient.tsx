import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { ClientSelect } from '../../../components/dashboard/email/ClientSelect';
import { DateRangePicker } from '../../../components/dashboard/email/DateRangePicker';
import { EmailCharts } from '../../../components/dashboard/email/EmailCharts';
import { ConnectionStatusCharts } from '../../../components/dashboard/email/ConnectionStatusCharts';
import { DisconnectedList } from '../../../components/dashboard/email/DisconnectedList';
import { EmailList } from '../../../components/dashboard/email/EmailList';
import { useClients } from '../../../hooks/useClients';
import { useEmailTrend } from '../../../hooks/useEmailTrend';
import { useWarmupStatus } from '../../../hooks/useWarmupStatus';
import { useConnectionStatus } from '../../../hooks/useConnectionStatus';
import { useDisconnectedEmails } from '../../../hooks/useDisconnectedEmails';
import { useClientEmails } from '../../../hooks/useClientEmails';

export function EmailByClient() {
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

  // Get trend data
  const { 
    data: trendData, 
    isLoading: trendLoading, 
    error: trendError 
  } = useEmailTrend(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  // Get warmup data
  const {
    data: warmupData,
    isLoading: warmupLoading,
    error: warmupError
  } = useWarmupStatus(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  // Get connection data
  const {
    data: connectionData,
    isLoading: connectionLoading,
    error: connectionError
  } = useConnectionStatus(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  // Get disconnected emails
  const {
    data: disconnectedEmails,
    isLoading: disconnectedLoading,
    error: disconnectedError
  } = useDisconnectedEmails(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate,
    'connection'
  );

  // Get warmup disconnected emails
  const {
    data: warmupDisconnectedEmails,
    isLoading: warmupDisconnectedLoading,
    error: warmupDisconnectedError
  } = useDisconnectedEmails(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate,
    'warmup'
  );

  // Get all emails for selected client
  const {
    data: allEmails,
    isLoading: emailsLoading,
    error: emailsError
  } = useClientEmails(
    filters.clientId,
    filters.dateRange.startDate,
    filters.dateRange.endDate
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Email by Client
          </h1>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DisconnectedList
            title="Disconnected Mailbox Accounts"
            emails={disconnectedEmails}
            isLoading={disconnectedLoading}
            error={disconnectedError}
          />

          <DisconnectedList
            title="Warmup Disconnected Accounts"
            emails={warmupDisconnectedEmails}
            isLoading={warmupDisconnectedLoading}
            error={warmupDisconnectedError}
          />
        </div>

        <EmailList
          title="All Mailbox Accounts"
          emails={allEmails}
          isLoading={emailsLoading}
          error={emailsError}
        />
      </div>
    </DashboardLayout>
  );
}