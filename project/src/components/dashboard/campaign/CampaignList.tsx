import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Reply, AlertTriangle, ThumbsUp, Trophy, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CampaignData } from '../../../types/campaign';

interface CampaignListProps {
  campaigns: CampaignData[];
  isLoading: boolean;
  error: string | null;
}

export function CampaignList({ campaigns, isLoading, error }: CampaignListProps) {
  const navigate = useNavigate();
  
  // Group campaigns by date for better organization
  const groupedCampaigns = React.useMemo(() => {
    const groups = new Map<string, CampaignData[]>();
    
    campaigns.forEach(campaign => {
      const date = campaign.update_date;
      if (!groups.has(date)) {
        groups.set(date, []);
      }
      groups.get(date)?.push(campaign);
    });

    return new Map([...groups.entries()].sort((a, b) => b[0].localeCompare(a[0])));
  }, [campaigns]);

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/dashboard/campaign/${campaignId}`);
  };

  if (isLoading) {
    return (
      <div className="h-[400px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <FileText className="w-8 h-8 mb-2" />
          <p>No campaigns found for the selected period</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-display font-semibold text-foreground">
          Campaign Details
        </h3>
      </div>

      <div className="p-4">
        <div className="space-y-6 max-h-[600px] overflow-y-auto">
          {Array.from(groupedCampaigns.entries()).map(([date, dateCampaigns]) => (
            <div key={date} className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h4>

              <div className="space-y-4">
                {dateCampaigns.map((campaign, index) => (
                  <motion.div
                    key={`${campaign.id}-${date}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleCampaignClick(campaign.id)}
                    className="p-4 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">
                              {campaign.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Status: {campaign.status}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">
                            Sent: {campaign.sent_count || 0}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Reply className="w-4 h-4 text-green-500" />
                          <span className="text-sm">
                            Replies: {campaign.reply_count || 0}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm">
                            Bounces: {campaign.bounce_count || 0}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">
                            Interested: {campaign.interested_lead || 0}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">
                            Won: {campaign.opportunity_won || 0}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4 text-indigo-500" />
                          <span className="text-sm">
                            New: {campaign.new_lead_contacted || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}