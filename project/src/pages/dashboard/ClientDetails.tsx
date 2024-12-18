import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ClientStats } from '../../components/dashboard/clients/details/ClientStats';
import { EmailList } from '../../components/dashboard/clients/details/EmailList';
import { CampaignList } from '../../components/dashboard/clients/details/CampaignList';
import { DomainList } from '../../components/dashboard/clients/details/DomainList';
import { ClientHeader } from '../../components/dashboard/clients/details/ClientHeader';
import { TabNavigation } from '../../components/dashboard/clients/details/TabNavigation';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useClientData } from '../../hooks/useClientData';

type Tab = 'emails' | 'campaigns' | 'domains';

export function ClientDetails() {
  const { clientId } = useParams();
  const { user } = useAuth();
  const { client, emails, campaigns, domains, isLoading, error } = useClientData(clientId);
  const [activeTab, setActiveTab] = useState<Tab>('emails');

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!client) {
    return (
      <DashboardLayout>
        <div className="text-center p-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Client Not Found
          </h2>
          <p className="text-muted-foreground">
            The requested client could not be found.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <ClientHeader client={client} />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <ClientStats
          uniqueEmails={emails.length}
          uniqueCampaigns={campaigns.length}
          uniqueDomains={domains.length}
        />

        <div className="space-y-6">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="min-h-[400px]">
            {activeTab === 'emails' && (
              <EmailList emails={emails} isLoading={isLoading} />
            )}
            {activeTab === 'campaigns' && (
              <CampaignList campaigns={campaigns} isLoading={isLoading} />
            )}
            {activeTab === 'domains' && (
              <DomainList
                domains={domains}
                emails={emails}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}