import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Send, Reply, AlertTriangle,
  ThumbsUp, Trophy, UserPlus
} from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';
import type { CampaignStats } from '../../../types/campaign';

interface CampaignStatsCardProps {
  stats: CampaignStats;
  delay?: number;
}

export function CampaignStatsCard({ stats, delay = 0 }: CampaignStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-foreground">
              {stats.client}
            </h3>
            <p className="text-sm text-muted-foreground">
              Total Campaigns: {stats.total_campaigns}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Send className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sent</p>
              <p className="text-base font-medium">
                {stats.total_sent}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Reply className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Replies</p>
              <p className="text-base font-medium">
                {stats.total_replies}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bounces</p>
              <p className="text-base font-medium">
                {stats.total_bounces}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <ThumbsUp className="w-4 h-4 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interested</p>
              <p className="text-base font-medium">
                {stats.interested_lead}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Trophy className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Won</p>
              <p className="text-base font-medium">
                {stats.opportunity_won}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <UserPlus className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New Leads</p>
              <p className="text-base font-medium">
                {stats.new_lead_contacted}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}