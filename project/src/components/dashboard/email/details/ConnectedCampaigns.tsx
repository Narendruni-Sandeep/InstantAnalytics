import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Reply, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedNumber } from '../../AnimatedNumber';

interface Campaign {
  campaign_id: string;
  campaign_name: string;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  update_date: string;
}

interface ConnectedCampaignsProps {
  campaigns: Campaign[];
}

export function ConnectedCampaigns({ campaigns }: ConnectedCampaignsProps) {
  const navigate = useNavigate();

  // Deduplicate campaigns by keeping only the latest entry for each campaign_id
  const uniqueCampaigns = React.useMemo(() => {
    const campaignMap = new Map<string, Campaign>();
    
    // Sort campaigns by date descending to get latest first
    const sortedCampaigns = [...campaigns].sort((a, b) => 
      new Date(b.update_date).getTime() - new Date(a.update_date).getTime()
    );

    // Keep only the latest entry for each campaign_id
    sortedCampaigns.forEach(campaign => {
      if (!campaignMap.has(campaign.campaign_id)) {
        campaignMap.set(campaign.campaign_id, campaign);
      }
    });

    return Array.from(campaignMap.values());
  }, [campaigns]);

  if (uniqueCampaigns.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <FileText className="w-8 h-8 mb-2" />
          <p>No connected campaigns found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-display font-semibold text-foreground">
          Connected Campaigns ({uniqueCampaigns.length})
        </h3>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {uniqueCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.campaign_id} // Use only campaign_id as key since we've deduplicated
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/dashboard/campaign/${campaign.campaign_id}`)}
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
                        {campaign.campaign_name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {new Date(campaign.update_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">
                      Sent: <AnimatedNumber value={campaign.sent_count || 0} />
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Reply className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      Replies: <AnimatedNumber value={campaign.reply_count || 0} />
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">
                      Bounces: <AnimatedNumber value={campaign.bounce_count || 0} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}