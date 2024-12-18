import React from 'react';
import { motion } from 'framer-motion';
import { AtSign, Send, Reply, AlertTriangle } from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';

interface ProviderMetrics {
  provider: string;
  total_emails: number;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  reply_rate: number;
  bounce_rate: number;
}

interface ProviderAnalyticsProps {
  data: ProviderMetrics[];
  isLoading: boolean;
}

export function ProviderAnalytics({ data, isLoading }: ProviderAnalyticsProps) {
  // Sort providers by reply rate descending
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
          <AtSign className="w-8 h-8 mb-2" />
          <p>No provider data available</p>
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
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Provider</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total Emails</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Sent</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Replies</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Reply Rate</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bounces</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((provider, index) => (
              <motion.tr
                key={provider.provider}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-accent/50 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{provider.provider}</td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={provider.total_emails} />
                </td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={provider.sent_count} />
                </td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={provider.reply_count} />
                </td>
                <td className="py-3 px-4 text-right text-emerald-500">
                  {provider.reply_rate.toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-right">
                  <AnimatedNumber value={provider.bounce_count} />
                </td>
                <td className="py-3 px-4 text-right text-red-500">
                  {provider.bounce_rate.toFixed(1)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}