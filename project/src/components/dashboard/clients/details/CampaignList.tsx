import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface Campaign {
  id: string;
  campaign_name: string;
  combination: string | null;
}

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function CampaignList({ campaigns, isLoading }: CampaignListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[200px] text-center p-8 rounded-xl bg-card border border-border"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          No Unique Campaigns
        </h3>
        <p className="text-muted-foreground max-w-md">
          No unique campaigns have been added for this client yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <motion.div
          key={`${campaign.id}-${campaign.campaign_name}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-foreground font-medium">
                  {campaign.campaign_name}
                </span>
                {campaign.combination && (
                  <p className="text-sm text-muted-foreground">
                    {campaign.combination}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}