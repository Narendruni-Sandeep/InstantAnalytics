import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Globe } from 'lucide-react';
import { AnimatedNumber } from '../../AnimatedNumber';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  delay?: number;
}

function StatsCard({ icon, label, value, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-xl bg-card border border-border"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-display font-bold text-foreground">
            <AnimatedNumber value={value} delay={delay} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface ClientStatsProps {
  uniqueEmails: number;
  uniqueCampaigns: number;
  uniqueDomains: number;
}

export function ClientStats({ uniqueEmails, uniqueCampaigns, uniqueDomains }: ClientStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        icon={<Mail className="w-6 h-6 text-primary" />}
        label="Unique Mailbox Accounts"
        value={uniqueEmails}
        delay={0.1}
      />
      <StatsCard
        icon={<FileText className="w-6 h-6 text-primary" />}
        label="Unique Campaigns"
        value={uniqueCampaigns}
        delay={0.2}
      />
      <StatsCard
        icon={<Globe className="w-6 h-6 text-primary" />}
        label="Unique Domains"
        value={uniqueDomains}
        delay={0.3}
      />
    </div>
  );
}