import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface DashboardStats {
  totalClients: number;
  totalEmails: number;
  totalDomains: number;
  totalCampaigns: number;
  connectedEmails: number;
  disconnectedEmails: number;
  warmupActive: number;
  warmupInactive: number;
  emailProviders: Array<{ provider: string; count: number }>;
}

export function useDashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalEmails: 0,
    totalDomains: 0,
    totalCampaigns: 0,
    connectedEmails: 0,
    disconnectedEmails: 0,
    warmupActive: 0,
    warmupInactive: 0,
    emailProviders: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get latest date for email status
        const { data: latestDate } = await supabase
          .from('instantly_email')
          .select('update_date')
          .order('update_date', { ascending: false })
          .limit(1)
          .single();

        if (!latestDate) throw new Error('No data available');

        // Get total clients
        const { count: clientCount, error: clientError } = await supabase
          .from('instantly_client')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (clientError) throw clientError;

        // Get unique emails, domains, and providers
        const { data: uniqueEmailData, error: uniqueEmailError } = await supabase
          .from('instantly_unique_email')
          .select('email, domain, email_provider')
          .eq('user', user.id);

        if (uniqueEmailError) throw uniqueEmailError;

        // Get email status counts from latest date
        const { data: emailStatusData, error: emailStatusError } = await supabase
          .from('instantly_email')
          .select('email, status, warmup_status')
          .eq('user_id', user.id)
          .eq('update_date', latestDate.update_date);

        if (emailStatusError) throw emailStatusError;

        // Get campaign counts
        const { data: campaignData, error: campaignError } = await supabase
          .from('instantly_campaign')
          .select('campaign_id')
          .eq('user_id', user.id);

        if (campaignError) throw campaignError;

        // Process unique email data
        const uniqueEmails = new Set(uniqueEmailData?.map(e => e.email));
        const uniqueDomains = new Set(uniqueEmailData?.map(e => e.domain).filter(Boolean));

        // Process email status data
        const emailStatusMap = new Map<string, { status: string; warmup_status: string }>();
        emailStatusData?.forEach(record => {
          emailStatusMap.set(record.email, {
            status: record.status,
            warmup_status: record.warmup_status
          });
        });

        const emailStats = Array.from(emailStatusMap.values()).reduce((acc, curr) => ({
          connected: acc.connected + (curr.status === 'active' ? 1 : 0),
          disconnected: acc.disconnected + (curr.status === 'inactive' ? 1 : 0),
          warmupActive: acc.warmupActive + (curr.warmup_status === 'active' ? 1 : 0),
          warmupInactive: acc.warmupInactive + (curr.warmup_status === 'inactive' ? 1 : 0)
        }), { connected: 0, disconnected: 0, warmupActive: 0, warmupInactive: 0 });

        // Process unique campaigns
        const uniqueCampaigns = new Set(campaignData?.map(c => c.campaign_id));

        // Process email providers
        const providerCounts = uniqueEmailData?.reduce((acc: Record<string, number>, curr) => {
          if (curr.email_provider) {
            acc[curr.email_provider] = (acc[curr.email_provider] || 0) + 1;
          }
          return acc;
        }, {});

        const emailProviders = Object.entries(providerCounts || {})
          .map(([provider, count]) => ({ provider, count }))
          .sort((a, b) => b.count - a.count);

        setStats({
          totalClients: clientCount || 0,
          totalEmails: uniqueEmails.size,
          totalDomains: uniqueDomains.size,
          totalCampaigns: uniqueCampaigns.size,
          connectedEmails: emailStats.connected,
          disconnectedEmails: emailStats.disconnected,
          warmupActive: emailStats.warmupActive,
          warmupInactive: emailStats.warmupInactive,
          emailProviders
        });
      } catch (err: any) {
        console.error('Error loading dashboard stats:', err);
        setError(err.message || 'Failed to load dashboard stats');
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, [user?.id]);

  return { stats, isLoading, error };
}