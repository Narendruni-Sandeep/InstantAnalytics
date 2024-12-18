import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Campaign {
  id: string;
  name: string;
  status: string;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  new_lead_contacted: number;
  interested_lead: number;
  opportunity_won: number;
  update_date: string;
}

export function useAllCampaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get unique campaigns first
        const { data: uniqueCampaigns, error: uniqueError } = await supabase
          .from('instantly_unique_campaign')
          .select('id, campaign_name')
          .eq('user_id', user.id);

        if (uniqueError) throw uniqueError;

        // Get campaign metrics for each unique campaign
        const campaignData = await Promise.all(
          uniqueCampaigns.map(async (campaign) => {
            // Get latest campaign status
            const { data: statusData } = await supabase
              .from('instantly_campaign')
              .select('status, new_lead_contacted, interested_lead, opportunity_won')
              .eq('campaign_id', campaign.id)
              .order('update_date', { ascending: false })
              .limit(1)
              .single();

            // Get email metrics
            const { data: emailMetrics } = await supabase
              .from('instantly_campaign_email')
              .select('sent_count, reply_count, bounce_count')
              .eq('campaign_id', campaign.id);

            // Aggregate email metrics
            const metrics = emailMetrics?.reduce((acc, curr) => ({
              sent_count: (acc.sent_count || 0) + (curr.sent_count || 0),
              reply_count: (acc.reply_count || 0) + (curr.reply_count || 0),
              bounce_count: (acc.bounce_count || 0) + (curr.bounce_count || 0)
            }), {
              sent_count: 0,
              reply_count: 0,
              bounce_count: 0
            });

            return {
              id: campaign.id,
              name: campaign.campaign_name,
              status: statusData?.status || 'unknown',
              sent_count: metrics.sent_count,
              reply_count: metrics.reply_count,
              bounce_count: metrics.bounce_count,
              new_lead_contacted: statusData?.new_lead_contacted || 0,
              interested_lead: statusData?.interested_lead || 0,
              opportunity_won: statusData?.opportunity_won || 0,
              update_date: new Date().toISOString()
            };
          })
        );

        setCampaigns(campaignData);
      } catch (err: any) {
        console.error('Error fetching campaigns:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCampaigns();
  }, [user?.id]);

  return { campaigns, isLoading, error };
}