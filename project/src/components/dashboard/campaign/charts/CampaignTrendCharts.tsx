import React from 'react';
import { motion } from 'framer-motion';
import { SingleMetricChart } from './SingleMetricChart';
import type { CampaignData } from '../../../../types/campaign';

interface CampaignTrendChartsProps {
  data: CampaignData[];
  isLoading: boolean;
  error: string | null;
}

export function CampaignTrendCharts({ data, isLoading, error }: CampaignTrendChartsProps) {
  // Group and aggregate data by date
  const aggregatedData = React.useMemo(() => {
    const dateMap = new Map<string, {
      sent: number;
      replies: number;
      bounces: number;
      newLeads: number;
      interested: number;
    }>();

    data.forEach(item => {
      const existing = dateMap.get(item.update_date) || {
        sent: 0,
        replies: 0,
        bounces: 0,
        newLeads: 0,
        interested: 0
      };

      dateMap.set(item.update_date, {
        sent: existing.sent + (item.sent_count || 0),
        replies: existing.replies + (item.reply_count || 0),
        bounces: existing.bounces + (item.bounce_count || 0),
        newLeads: existing.newLeads + (item.new_lead_contacted || 0),
        interested: existing.interested + (item.interested_lead || 0)
      });
    });

    return Array.from(dateMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, metrics]) => ({
        date,
        ...metrics
      }));
  }, [data]);

  const metrics = [
    {
      title: 'Sent Emails',
      data: aggregatedData.map(d => d.sent),
      color: '#3b82f6'
    },
    {
      title: 'Replies',
      data: aggregatedData.map(d => d.replies),
      color: '#22c55e'
    },
    {
      title: 'Bounces',
      data: aggregatedData.map(d => d.bounces),
      color: '#ef4444'
    },
    {
      title: 'New Leads',
      data: aggregatedData.map(d => d.newLeads),
      color: '#8b5cf6'
    },
    {
      title: 'Interested Leads',
      data: aggregatedData.map(d => d.interested),
      color: '#f59e0b'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-display font-semibold text-foreground">
            {metric.title} Over Time
          </h3>
          <SingleMetricChart
            dates={aggregatedData.map(d => d.date)}
            data={metric.data}
            color={metric.color}
            isLoading={isLoading}
            error={error}
          />
        </motion.div>
      ))}
    </div>
  );
}