import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Reply, AlertTriangle, ThumbsUp, Trophy, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function CampaignList({ campaigns, isLoading }: CampaignListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-[400px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <FileText className="w-8 h-8 mb-2" />
          <p>No campaigns found</p>
        </div>
      </div>
    );
  }

  // Ensure unique campaigns by filtering duplicates based on ID
  const uniqueCampaigns = campaigns.reduce((acc: Campaign[], curr) => {
    if (!acc.find(c => c.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div className="space-y-4">
      {uniqueCampaigns.map((campaign) => (
        <motion.div
          key={`campaign-${campaign.id}`} // Make key more unique
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate(`/dashboard/campaign/${campaign.id}`)}
          className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-colors"
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
  );
}