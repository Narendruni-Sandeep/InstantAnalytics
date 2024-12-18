import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { TabNavigation } from '../../components/dashboard/others/TabNavigation';
import { DomainAnalytics } from '../../components/dashboard/others/DomainAnalytics';
import { ProviderAnalytics } from '../../components/dashboard/others/ProviderAnalytics';
import { useOthersData } from '../../hooks/useOthersData';

export function Others() {
  const [activeTab, setActiveTab] = useState<'domains' | 'providers'>('domains');
  const { data, isLoading, error } = useOthersData();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Analytics
        </h1>

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {activeTab === 'domains' ? (
          <DomainAnalytics
            data={data?.domains || []}
            isLoading={isLoading}
          />
        ) : (
          <ProviderAnalytics
            data={data?.providers || []}
            isLoading={isLoading}
          />
        )}
      </div>
    </DashboardLayout>
  );
}