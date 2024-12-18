import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface EmailDetails {
  email: string;
  first_name: string;
  last_name: string | null;
  domain: string | null;
  email_provider: string | null;
  status: string;
  warmup_status: string;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  history: Array<{
    status: string;
    warmup_status: string;
    sent_count: number;
    bounce_count: number;
    reply_count: number;
    update_date: string;
  }>;
  campaigns: Array<{
    campaign_id: string;
    campaign_name: string;
    sent_count: number;
    reply_count: number;
    bounce_count: number;
    update_date: string;
  }>;
}

export function useEmailDetails(email: string | undefined) {
  const { user } = useAuth();
  const [data, setData] = useState<EmailDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user?.id || !email) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get basic email info from unique_email
        const { data: uniqueEmail, error: uniqueError } = await supabase
          .from('instantly_unique_email')
          .select(`
            email,
            first_name,
            last_name,
            domain,
            email_provider
          `)
          .eq('email', email)
          .eq('user', user.id)
          .single();

        if (uniqueError) throw uniqueError;

        // Get latest status
        const { data: latestStatus, error: statusError } = await supabase
          .from('instantly_email')
          .select(`
            status,
            warmup_status
          `)
          .eq('email', email)
          .eq('user_id', user.id)
          .order('update_date', { ascending: false })
          .limit(1)
          .single();

        if (statusError) throw statusError;

        // Get email history
        const { data: history, error: historyError } = await supabase
          .from('instantly_email')
          .select(`
            status,
            warmup_status,
            sent_count,
            bounce_count,
            reply_count,
            update_date
          `)
          .eq('email', email)
          .eq('user_id', user.id)
          .order('update_date', { ascending: false });

        if (historyError) throw historyError;

        // Get connected campaigns with metrics
        const { data: campaignData, error: campaignError } = await supabase
          .from('instantly_campaign_email')
          .select(`
            campaign_id,
            sent_count,
            reply_count,
            bounce_count,
            update_date
          `)
          .eq('email', email)
          .eq('user_id', user.id)
          .order('update_date', { ascending: false });

        if (campaignError) throw campaignError;

        // Get campaign names from instantly_campaign
        const campaignIds = [...new Set(campaignData?.map(c => c.campaign_id) || [])];
        const { data: campaignNames, error: namesError } = await supabase
          .from('instantly_campaign')
          .select('campaign_id, name')
          .in('campaign_id', campaignIds)
          .order('update_date', { ascending: false });

        if (namesError) throw namesError;

        // Create a map of campaign names
        const nameMap = new Map(campaignNames?.map(c => [c.campaign_id, c.name]));

        // Calculate total metrics
        const totals = history?.reduce((acc, curr) => ({
          sent_count: (acc.sent_count || 0) + (curr.sent_count || 0),
          reply_count: (acc.reply_count || 0) + (curr.reply_count ? parseInt(curr.reply_count.toString(), 10) : 0),
          bounce_count: (acc.bounce_count || 0) + (curr.bounce_count || 0)
        }), {
          sent_count: 0,
          reply_count: 0,
          bounce_count: 0
        });

        // Clean and format history data
        const cleanHistory = history?.map(entry => ({
          ...entry,
          sent_count: entry.sent_count || 0,
          reply_count: entry.reply_count ? parseInt(entry.reply_count.toString(), 10) : 0,
          bounce_count: entry.bounce_count || 0
        }));

        // Clean and format campaign data
        const cleanCampaigns = campaignData?.map(campaign => ({
          campaign_id: campaign.campaign_id,
          campaign_name: nameMap.get(campaign.campaign_id) || 'Unknown Campaign',
          sent_count: campaign.sent_count || 0,
          reply_count: campaign.reply_count ? parseInt(campaign.reply_count.toString(), 10) : 0,
          bounce_count: campaign.bounce_count || 0,
          update_date: campaign.update_date
        }));

        setData({
          ...uniqueEmail,
          ...latestStatus,
          ...totals,
          history: cleanHistory || [],
          campaigns: cleanCampaigns || []
        });
      } catch (err: any) {
        console.error('Error fetching email details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user?.id, email]);

  return { data, isLoading, error };
}