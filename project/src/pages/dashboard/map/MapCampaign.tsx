import React, { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { CampaignList } from '../../../components/dashboard/map/CampaignList';
import { TabNavigation } from '../../../components/dashboard/map/TabNavigation';
import { SearchBar } from '../../../components/shared/SearchBar';
import { Toast } from '../../../components/Toast';
import { useAuth } from '../../../hooks/useAuth';
import { supabase } from '../../../lib/supabase';

interface Campaign {
  id: string;
  campaign_name: string;
  combination: string | null;
  client: string | null;
}

export function MapCampaign() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('unassigned');
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabCounts, setTabCounts] = useState<Record<string, number>>({});
  const [incrementingClient, setIncrementingClient] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadClients();
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id && clients.length > 0) {
      loadTabCounts();
    }
  }, [user?.id, clients]);

  useEffect(() => {
    if (user?.id) {
      loadCampaigns();
    }
  }, [user?.id, activeTab]);

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('instantly_client')
        .select('id, name')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (err) {
      console.error('Error loading clients:', err);
      setError('Failed to load clients');
    }
  };

  const loadTabCounts = async () => {
    if (!user?.id) return;

    try {
      // Get unassigned count
      const { count: unassignedCount } = await supabase
        .from('instantly_unique_campaign')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .is('client', null);

      // Get counts for each client
      const clientCounts: Record<string, number> = {};
      await Promise.all(
        clients.map(async (client) => {
          const { count } = await supabase
            .from('instantly_unique_campaign')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('client', client.name);

          clientCounts[client.name] = count || 0;
        })
      );

      setTabCounts({
        unassigned: unassignedCount || 0,
        ...clientCounts
      });
    } catch (err) {
      console.error('Error loading tab counts:', err);
    }
  };

  const loadCampaigns = async () => {
    try {
      setIsLoading(true);
      setError('');

      let query = supabase
        .from('instantly_unique_campaign')
        .select('*')
        .eq('user_id', user?.id);

      if (activeTab === 'unassigned') {
        query = query.is('client', null);
      } else {
        query = query.eq('client', activeTab);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCampaigns(data || []);
    } catch (err) {
      console.error('Error loading campaigns:', err);
      setError('Failed to load campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapToClient = async (campaignId: string, clientName: string) => {
    if (!user?.id) return;

    try {
      // Update all related tables
      await Promise.all([
        // Update unique campaign
        supabase
          .from('instantly_unique_campaign')
          .update({ client: clientName })
          .eq('id', campaignId)
          .eq('user_id', user.id),

        // Update campaign
        supabase
          .from('instantly_campaign')
          .update({ client: clientName })
          .eq('campaign_id', campaignId)
          .eq('user_id', user.id),

        // Update campaign emails
        supabase
          .from('instantly_campaign_email')
          .update({ client: clientName })
          .eq('campaign_id', campaignId)
          .eq('user_id', user.id)
      ]);

      // Show increment animation
      setIncrementingClient(clientName);
      setTimeout(() => setIncrementingClient(null), 2000);

      setShowToast(true);
      await Promise.all([loadCampaigns(), loadTabCounts()]);
    } catch (err: any) {
      console.error('Error mapping campaign:', err);
      setError(err.message || 'Failed to map campaign to client');
    }
  };

  // Filter campaigns based on search term
  const filteredCampaigns = useMemo(() => {
    if (!searchTerm) return campaigns;
    
    const term = searchTerm.toLowerCase();
    return campaigns.filter(campaign => 
      campaign.campaign_name.toLowerCase().includes(term) ||
      campaign.combination?.toLowerCase().includes(term)
    );
  }, [campaigns, searchTerm]);

  const tabs = [
    { 
      id: 'unassigned', 
      label: 'Unassigned', 
      count: tabCounts.unassigned,
      showIncrement: false
    },
    ...clients.map(client => ({
      id: client.name,
      label: client.name,
      count: tabCounts[client.name],
      showIncrement: incrementingClient === client.name
    }))
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Map Campaigns
          </h1>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search campaigns..."
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <CampaignList
          campaigns={filteredCampaigns}
          clients={clients}
          isLoading={isLoading}
          onMapToClient={handleMapToClient}
        />

        <Toast
          message="Client mapping successful! Updates will be reflected in the results within 4 hours."
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </DashboardLayout>
  );
}