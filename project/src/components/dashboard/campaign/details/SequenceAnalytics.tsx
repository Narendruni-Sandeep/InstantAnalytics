import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { AnimatedNumber } from '../../AnimatedNumber';

interface CombinationMetrics {
  combination: string;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
}

interface SequenceAnalyticsProps {
  emailMetrics: Array<{
    sequence: string;
    variant: string;
    sent_count: number;
    reply_count: number;
    bounce_count: number;
  }>;
}

export function SequenceAnalytics({ emailMetrics }: SequenceAnalyticsProps) {
  // Aggregate metrics by sequence-variant combination
  const aggregatedMetrics = useMemo(() => {
    const metricsMap = new Map<string, CombinationMetrics>();

    emailMetrics.forEach(metric => {
      // Parse sequence and variant as numbers
      const seq = parseInt(metric.sequence) + 1; // Add 1 to the numeric value
      const var_ = parseInt(metric.variant) + 1; // Add 1 to the numeric value
      
      if (isNaN(seq) || isNaN(var_)) return; // Skip if not valid numbers

      const combination = `Sequence ${seq} - Variant ${var_}`;

      const existing = metricsMap.get(combination) || {
        combination,
        sent_count: 0,
        reply_count: 0,
        bounce_count: 0
      };

      metricsMap.set(combination, {
        ...existing,
        sent_count: (existing.sent_count || 0) + (metric.sent_count || 0),
        reply_count: (existing.reply_count || 0) + (metric.reply_count || 0),
        bounce_count: (existing.bounce_count || 0) + (metric.bounce_count || 0)
      });
    });

    return Array.from(metricsMap.values())
      .sort((a, b) => {
        // Extract sequence and variant numbers for sorting
        const [seqA, varA] = a.combination.match(/\d+/g)?.map(Number) || [0, 0];
        const [seqB, varB] = b.combination.match(/\d+/g)?.map(Number) || [0, 0];
        
        // Sort by sequence first, then variant
        if (seqA !== seqB) return seqA - seqB;
        return varA - varB;
      });
  }, [emailMetrics]);

  if (aggregatedMetrics.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <BarChart2 className="w-8 h-8 mb-2" />
          <p>No sequence data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <h3 className="text-lg font-display font-semibold text-foreground mb-6">
        Sequence-Variant Combination Analytics
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Combination</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Sent</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Replies</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Reply Rate</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bounces</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {aggregatedMetrics.map((metric, index) => {
              const replyRate = metric.sent_count ? ((metric.reply_count / metric.sent_count) * 100).toFixed(1) : '0.0';
              const bounceRate = metric.sent_count ? ((metric.bounce_count / metric.sent_count) * 100).toFixed(1) : '0.0';

              return (
                <motion.tr
                  key={metric.combination}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{metric.combination}</td>
                  <td className="py-3 px-4 text-right">
                    <AnimatedNumber value={metric.sent_count} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <AnimatedNumber value={metric.reply_count} />
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-500">
                    {replyRate}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <AnimatedNumber value={metric.bounce_count} />
                  </td>
                  <td className="py-3 px-4 text-right text-red-500">
                    {bounceRate}%
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}