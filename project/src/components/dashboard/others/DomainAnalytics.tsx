import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Send, Reply, AlertTriangle } from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';

interface DomainMetrics {
  domain: string;
  total_emails: number;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  reply_rate: number;
  bounce_rate: number;
}

interface DomainAnalyticsProps {
  data: DomainMetrics[];
  isLoading: boolean;
}

export function DomainAnalytics({ data, isLoading }: DomainAnalyticsProps) {
  // Sort domains by reply rate descending
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => b.reply_rate - a.reply_rate);
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-[400px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Globe className="w-8 h-8 mb-2" />
          <p>No domain data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Domain</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total Emails</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Sent</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Replies</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Reply Rate</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bounces</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((domain, index) => (
              <motion.tr
                key={domain.domain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-accent/50 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{domain.domain}</td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={domain.total_emails} />
                </td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={domain.sent_count} />
                </td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={domain.reply_count} />
                </td>
                <td className="py-3 px-4 text-right text-emerald-500">
                  {domain.reply_rate.toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={domain.bounce_count} />
                </td>
                <td className="py-3 px-4 text-right text-red-500">
                  {domain.bounce_rate.toFixed(1)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}