import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Activity, XCircle, Globe, Zap } from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';
import type { EmailStatsData } from '../../../types/email';

interface StatsCardProps {
  title: string;
  stats: EmailStatsData;
  lastUpdateDate: string;
  delay?: number;
}

export function StatsCard({ title, stats, lastUpdateDate, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-foreground">
          {title}
        </h3>
        <span className="text-sm text-muted-foreground">
          Last updated: {lastUpdateDate}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span className="text-sm">Total Mailboxes</span>
          </div>
          <p className="text-xl font-display font-bold">
            <AnimatedNumber value={stats.total_emails} delay={delay} />
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Connected Mailboxes</span>
          </div>
          <p className="text-xl font-display font-bold">
            <AnimatedNumber value={stats.active_emails} delay={delay + 0.1} />
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-500">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Disconnected Mailboxes</span>
          </div>
          <p className="text-xl font-display font-bold">
            <AnimatedNumber value={stats.inactive_emails} delay={delay + 0.2} />
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Unique Domains</span>
          </div>
          <p className="text-xl font-display font-bold">
            <AnimatedNumber value={stats.domains} delay={delay + 0.3} />
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Warmup Active</span>
          </div>
          <p className="text-xl font-display font-bold">
            <AnimatedNumber value={stats.warmup_active} delay={delay + 0.4} />
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-500">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Warmup Inactive</span>
          </div>
          <p className="text-xl font-display font-bold">
            <AnimatedNumber value={stats.warmup_inactive} delay={delay + 0.5} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}