import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { CampaignData } from '../types/campaign';

export function useCampaignData(
  clientId: string,
  startDate: Date,
  endDate: Date
) {
  const { user } = useAuth();
  const [data, setData] = useState<CampaignData[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user?.id || !clientId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get client name
        const { data: client, error: clientError } = await supabase
          .from('instantly_client')
          .select('name')
          .eq('id', clientId)
          .single();

        if (clientError) throw clientError;

        // Format dates for query
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        // Get campaign data
        const { data: campaignData, error: campaignError } = await supabase
          .from('instantly_campaign')
          .select(`
            id,
            name,
            status,
            update_date,
            new_lead_contacted,
            interested_lead,
            opportunity_won
          `)
          .eq('client', client.name)
          .gte('update_date', formattedStartDate)
          .lte('update_date', formattedEndDate);

        if (campaignError) throw campaignError;

        // Get email metrics
        const { data: emailMetrics, error: emailError } = await supabase
          .from('instantly_campaign_email')
          .select(`
            campaign_id,
            sent_count,
            reply_count,
            bounce_count,
            update_date
          `)
          .eq('client', client.name)
          .gte('update_date', formattedStartDate)
          .lte('update_date', formattedEndDate);

        if (emailError) throw emailError;

        // Combine data
        const combinedData = new Map<string, CampaignData>();

        // Add campaign data
        campaignData?.forEach(campaign => {
          combinedData.set(`${campaign.id}-${campaign.update_date}`, {
            id: campaign.id,
            name: campaign.name || '',
            status: campaign.status || '',
            update_date: campaign.update_date,
            sent_count: 0,
            reply_count: 0,
            bounce_count: 0,
            new_lead_contacted: campaign.new_lead_contacted || 0,
            interested_lead: campaign.interested_lead || 0,
            opportunity_won: campaign.opportunity_won || 0
          });
        });

        // Add email metrics
        emailMetrics?.forEach(metric => {
          const key = `${metric.campaign_id}-${metric.update_date}`;
          const existing = combinedData.get(key) || {
            id: metric.campaign_id,
            name: '',
            status: '',
            update_date: metric.update_date,
            sent_count: 0,
            reply_count: 0,
            bounce_count: 0,
            new_lead_contacted: 0,
            interested_lead: 0,
            opportunity_won: 0
          };

          combinedData.set(key, {
            ...existing,
            sent_count: (existing.sent_count || 0) + (metric.sent_count || 0),
            reply_count: (existing.reply_count || 0) + (metric.reply_count || 0),
            bounce_count: (existing.bounce_count || 0) + (metric.bounce_count || 0)
          });
        });

        // Calculate total metrics
        const totalMetrics = {
          sent_count: 0,
          reply_count: 0,
          bounce_count: 0,
          new_lead_contacted: 0,
          interested_lead: 0,
          opportunity_won: 0
        };

        combinedData.forEach(data => {
          totalMetrics.sent_count += data.sent_count || 0;
          totalMetrics.reply_count += data.reply_count || 0;
          totalMetrics.bounce_count += data.bounce_count || 0;
          totalMetrics.new_lead_contacted += data.new_lead_contacted || 0;
          totalMetrics.interested_lead += data.interested_lead || 0;
          totalMetrics.opportunity_won += data.opportunity_won || 0;
        });

        setData(Array.from(combinedData.values()));
        setMetrics(totalMetrics);
      } catch (err: any) {
        console.error('Error fetching campaign data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user?.id, clientId, startDate, endDate]);

  return { data, metrics, isLoading, error };
}