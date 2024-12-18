import { supabase } from '../lib/supabase';
import type { CampaignMetrics } from '../types/campaign';

export async function getCampaignMetrics(campaignIds: string[]): Promise<CampaignMetrics[]> {
  try {
    // Get email metrics (sent, replies, bounces) from instantly_campaign_email
    const { data: emailMetrics, error: emailError } = await supabase
      .from('instantly_campaign_email')
      .select(`
        campaign_id,
        sent_count,
        reply_count,
        bounce_count,
        new_lead_contacted,
        interested_lead,
        opportunity_won
      `)
      .in('campaign_id', campaignIds);

    if (emailError) throw emailError;

    // Create a map to aggregate metrics by campaign
    const metricsMap = emailMetrics.reduce((acc: Record<string, any>, metric) => {
      if (!acc[metric.campaign_id]) {
        acc[metric.campaign_id] = {
          total_sent: 0,
          leads_replied: 0,
          bounce_lead: 0,
          new_lead_contacted: 0,
          interested_lead: 0,
          opportunity_won: 0
        };
      }

      // Aggregate metrics
      acc[metric.campaign_id].total_sent += metric.sent_count || 0;
      acc[metric.campaign_id].leads_replied += metric.reply_count || 0;
      acc[metric.campaign_id].bounce_lead += metric.bounce_count || 0;
      acc[metric.campaign_id].new_lead_contacted += metric.new_lead_contacted || 0;
      acc[metric.campaign_id].interested_lead += metric.interested_lead || 0;
      acc[metric.campaign_id].opportunity_won += metric.opportunity_won || 0;

      return acc;
    }, {});

    // Convert map to array format
    return campaignIds.map(campaignId => ({
      campaign_id: campaignId,
      total_sent: metricsMap[campaignId]?.total_sent || 0,
      leads_replied: metricsMap[campaignId]?.leads_replied || 0,
      bounce_lead: metricsMap[campaignId]?.bounce_lead || 0,
      new_lead_contacted: metricsMap[campaignId]?.new_lead_contacted || 0,
      interested_lead: metricsMap[campaignId]?.interested_lead || 0,
      opportunity_won: metricsMap[campaignId]?.opportunity_won || 0
    }));
  } catch (error) {
    console.error('Error fetching campaign metrics:', error);
    return [];
  }
}