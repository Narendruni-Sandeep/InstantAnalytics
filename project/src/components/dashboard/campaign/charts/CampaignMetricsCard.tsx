import React from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Reply, AlertTriangle,
  ThumbsUp, Trophy, UserPlus
} from 'lucide-react';
import { AnimatedNumber } from '../../AnimatedNumber';
import type { CampaignMetrics } from '../../../../types/campaign';

interface CampaignMetricsCardProps {
  metrics: CampaignMetrics;
  isLoading: boolean;
}

export function CampaignMetricsCard({ metrics, isLoading }: CampaignMetricsCardProps) {
  if (isLoading) {
    return (
      <div className="h-[120px] rounded-xl bg-card/50 animate-pulse" />
    );
  }

  const stats = [
    {
      icon: Send,
      label: 'Total Sent',
      value: metrics.total_sent,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Reply,
      label: 'Total Replies',
      value: metrics.leads_replied,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: AlertTriangle,
      label: 'Total Bounces',
      value: metrics.bounce_lead,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: ThumbsUp,
      label: 'Interested Leads',
      value: metrics.interested_lead,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Trophy,
      label: 'Opportunities Won',
      value: metrics.opportunity_won,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: UserPlus,
      label: 'New Leads',
      value: metrics.new_lead_contacted,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  return (
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
                <AnimatedNumber value={stat.value} />
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}