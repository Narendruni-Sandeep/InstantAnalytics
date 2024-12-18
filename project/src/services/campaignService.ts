import { supabase } from '../lib/supabase';
import type { CampaignStats } from '../types/campaign';

export async function getCampaignStats(userId: string) {
  try {
    // Get unique campaign counts per client
    const { data: uniqueCampaigns, error: uniqueError } = await supabase
      .from('instantly_unique_campaign')
      .select('client, id')
      .eq('user_id', userId)
      .not('client', 'is', null)
      .not('client', 'eq', '');

    if (uniqueError) throw uniqueError;

    // Get email metrics
    const { data: emailMetrics, error: emailError } = await supabase
      .from('instantly_campaign_email')
      .select(`
        client,
        sent_count,
        reply_count,
        bounce_count
      `)
      .eq('user_id', userId)
      .not('client', 'is', null)
      .not('client', 'eq', '');

    if (emailError) throw emailError;

    // Get campaign metrics
    const { data: campaignMetrics, error: campaignError } = await supabase
      .from('instantly_campaign')
      .select(`
        client,
        new_lead_contacted,
        interested_lead,
        opportunity_won
      `)
      .eq('user_id', userId)
      .not('client', 'is', null)
      .not('client', 'eq', '');

    if (campaignError) throw campaignError;

    // Aggregate stats by client
    const clientStats = new Map<string, CampaignStats>();

    // Initialize with campaign counts
    uniqueCampaigns?.forEach(campaign => {
      if (!campaign.client) return;
      
      if (!clientStats.has(campaign.client)) {
        clientStats.set(campaign.client, {
          client: campaign.client,
          total_campaigns: 0,
          total_sent: 0,
          total_replies: 0,
          total_bounces: 0,
          new_lead_contacted: 0,
          interested_lead: 0,
          opportunity_won: 0
        });
      }

      const stats = clientStats.get(campaign.client)!;
      stats.total_campaigns++;
    });

    // Add email metrics
    emailMetrics?.forEach(metric => {
      if (!metric.client) return;

      const stats = clientStats.get(metric.client);
      if (stats) {
        stats.total_sent += metric.sent_count || 0;
        stats.total_replies += metric.reply_count || 0;
        stats.total_bounces += metric.bounce_count || 0;
      }
    });

    // Add campaign metrics
    campaignMetrics?.forEach(metric => {
      if (!metric.client) return;

      const stats = clientStats.get(metric.client);
      if (stats) {
        stats.new_lead_contacted += metric.new_lead_contacted || 0;
        stats.interested_lead += metric.interested_lead || 0;
        stats.opportunity_won += metric.opportunity_won || 0;
      }
    });

    // Convert to array and ensure all values are numbers
    const finalStats = Array.from(clientStats.values()).map(stat => ({
      ...stat,
      total_campaigns: Number(stat.total_campaigns) || 0,
      total_sent: Number(stat.total_sent) || 0,
      total_replies: Number(stat.total_replies) || 0,
      total_bounces: Number(stat.total_bounces) || 0,
      new_lead_contacted: Number(stat.new_lead_contacted) || 0,
      interested_lead: Number(stat.interested_lead) || 0,
      opportunity_won: Number(stat.opportunity_won) || 0
    }));

    return { 
      data: finalStats.sort((a, b) => b.total_campaigns - a.total_campaigns),
      error: null 
    };
  } catch (error: any) {
    console.error('Error fetching campaign stats:', error);
    return { 
      data: null, 
      error: error.message || 'Failed to fetch campaign stats' 
    };
  }
}