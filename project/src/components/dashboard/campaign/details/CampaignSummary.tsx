import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Send, Reply, AlertTriangle,
  ThumbsUp, Trophy, UserPlus
} from 'lucide-react';
import { AnimatedNumber } from '../../AnimatedNumber';
import type { CampaignSummary as CampaignSummaryType } from '../../../../types/campaign';

interface CampaignSummaryProps {
  campaign: CampaignSummaryType;
}

export function CampaignSummary({ campaign }: CampaignSummaryProps) {
  const stats = [
    {
      icon: Send,
      label: 'Total Sent',
      value: campaign.sent_count,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Reply,
      label: 'Total Replies',
      value: campaign.reply_count,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: AlertTriangle,
      label: 'Total Bounces',
      value: campaign.bounce_count,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: ThumbsUp,
      label: 'Interested Leads',
      value: campaign.interested_lead,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Trophy,
      label: 'Opportunities Won',
      value: campaign.opportunity_won,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: UserPlus,
      label: 'New Leads',
      value: campaign.new_lead_contacted,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {campaign.name}
          </h1>
          <p className="text-muted-foreground">
            Status: {campaign.status}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex flex-col gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor} w-fit`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className={`text-lg font-medium ${stat.color}`}>
                  <AnimatedNumber value={stat.value || 0} />
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}