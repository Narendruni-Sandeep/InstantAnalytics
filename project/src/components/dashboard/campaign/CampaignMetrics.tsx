import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Reply, AlertTriangle,
  ThumbsUp, Trophy, UserPlus,
  Percent
} from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';

interface CampaignMetricsProps {
  metrics: {
    sent_count: number;
    reply_count: number;
    bounce_count: number;
    new_lead_contacted: number;
    interested_lead: number;
    opportunity_won: number;
  };
  delay?: number;
}

export function CampaignMetrics({ metrics, delay = 0 }: CampaignMetricsProps) {
  // Calculate percentages
  const replyPercentage = metrics.sent_count > 0 
    ? ((metrics.reply_count / metrics.sent_count) * 100).toFixed(1)
    : '0.0';

  const bouncePercentage = metrics.sent_count > 0
    ? ((metrics.bounce_count / metrics.sent_count) * 100).toFixed(1)
    : '0.0';

  const stats = [
    {
      icon: Send,
      label: 'Total Sent',
      value: metrics.sent_count,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Reply,
      label: 'Replies',
      value: metrics.reply_count,
      subValue: `${replyPercentage}%`,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: AlertTriangle,
      label: 'Bounces',
      value: metrics.bounce_count,
      subValue: `${bouncePercentage}%`,
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
      <AnimatePresence mode="wait">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: delay + index * 0.1 
            }}
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
                <div className="flex items-baseline gap-2">
                  <p className={`text-lg font-medium ${stat.color}`}>
                    <AnimatedNumber 
                      value={stat.value} 
                      duration={0.8}
                      delay={delay + index * 0.1}
                    />
                  </p>
                  {stat.subValue && (
                    <motion.div 
                      className={`flex items-center text-xs ${stat.color}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: delay + index * 0.1 + 0.2 }}
                    >
                      <Percent className="w-3 h-3 mr-0.5" />
                      {stat.subValue}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}