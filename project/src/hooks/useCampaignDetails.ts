import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { CampaignDetails, EmailMetrics } from '../types/campaign';

export function useCampaignDetails(campaignId: string | undefined) {
  const { user } = useAuth();
  const [data, setData] = useState<CampaignDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user?.id || !campaignId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get campaign summary
        const { data: campaignData, error: campaignError } = await supabase
          .from('instantly_campaign')
          .select(`
            id,
            name,
            status,
            update_date
          `)
          .eq('campaign_id', campaignId)
          .order('update_date', { ascending: false })
          .limit(1)
          .single();

        if (campaignError) throw campaignError;

        // Get email metrics
        const { data: emailMetrics, error: emailError } = await supabase
          .from('instantly_campaign_email')
          .select(`
            email,
            domain,
            email_provider,
            sent_count,
            reply_count,
            bounce_count,
            sequence,
            variant,
            update_date
          `)
          .eq('campaign_id', campaignId);

        if (emailError) throw emailError;

        // Aggregate email metrics
        const aggregatedEmailMetrics = emailMetrics?.reduce((acc: EmailMetrics, curr) => {
          // Convert reply_count to number, handling null/undefined/string cases
          const replyCount = curr.reply_count ? Number(curr.reply_count) : 0;
          
          return {
            sent_count: (acc.sent_count || 0) + (curr.sent_count || 0),
            reply_count: (acc.reply_count || 0) + (isNaN(replyCount) ? 0 : replyCount),
            bounce_count: (acc.bounce_count || 0) + (curr.bounce_count || 0)
          };
        }, {
          sent_count: 0,
          reply_count: 0,
          bounce_count: 0
        });

        // Get campaign history
        const { data: history, error: historyError } = await supabase
          .from('instantly_campaign')
          .select(`
            status,
            new_lead_contacted,
            interested_lead,
            opportunity_won,
            update_date
          `)
          .eq('campaign_id', campaignId)
          .order('update_date', { ascending: false });

        if (historyError) throw historyError;

        // Aggregate lead metrics
        const aggregatedLeadMetrics = history?.reduce((acc, curr) => ({
          new_lead_contacted: (acc.new_lead_contacted || 0) + (curr.new_lead_contacted || 0),
          interested_lead: (acc.interested_lead || 0) + (curr.interested_lead || 0),
          opportunity_won: (acc.opportunity_won || 0) + (curr.opportunity_won || 0)
        }), {
          new_lead_contacted: 0,
          interested_lead: 0,
          opportunity_won: 0
        });

        // Clean email metrics data
        const cleanedEmails = emailMetrics?.map(email => ({
          ...email,
          sent_count: email.sent_count || 0,
          reply_count: email.reply_count ? Number(email.reply_count) : 0,
          bounce_count: email.bounce_count || 0
        }));

        setData({
          summary: {
            ...campaignData,
            ...aggregatedEmailMetrics,
            ...aggregatedLeadMetrics
          },
          emails: cleanedEmails || [],
          history: history || []
        });
      } catch (err: any) {
        console.error('Error fetching campaign details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user?.id, campaignId]);

  return { data, isLoading, error };
}