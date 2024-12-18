import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Mail, Globe, FileText, AtSign,
  Activity, Zap
} from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  delay?: number;
  color?: string;
  bgColor?: string;
}

function StatsCard({ 
  icon, 
  label, 
  value, 
  delay = 0,
  color = 'text-primary',
  bgColor = 'bg-primary/10'
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <div className={color}>{icon}</div>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            <AnimatedNumber value={value} delay={delay} />
          </h2>
          <p className="text-muted-foreground">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface EmailProviderCardProps {
  providers: Array<{ provider: string; count: number }>;
  delay?: number;
}

function EmailProviderCard({ providers, delay = 0 }: EmailProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="col-span-full p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <AtSign className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-lg font-display font-semibold text-foreground">
          Email Providers
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.provider}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.1 }}
            className="p-4 rounded-lg bg-accent/50"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {provider.provider}
              </span>
              <span className="text-sm text-muted-foreground">
                {provider.count}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

interface DashboardStatsProps {
  totalClients: number;
  totalEmails: number;
  totalDomains: number;
  totalCampaigns: number;
  connectedEmails: number;
  disconnectedEmails: number;
  warmupActive: number;
  warmupInactive: number;
  emailProviders: Array<{ provider: string; count: number }>;
  isLoading?: boolean;
}

export function DashboardStats({
  totalClients,
  totalEmails,
  totalDomains,
  totalCampaigns,
  connectedEmails,
  disconnectedEmails,
  warmupActive,
  warmupInactive,
  emailProviders,
  isLoading
}: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`h-[120px] rounded-xl bg-card/50 animate-pulse ${
            i === 8 ? 'col-span-full' : ''
          }`} />
        ))}
      </div>
    );
  }

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Total Clients',
      value: totalClients,
      delay: 0.1
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Total Unique Emails',
      value: totalEmails,
      delay: 0.2
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: 'Total Domains',
      value: totalDomains,
      delay: 0.3
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: 'Total Campaigns',
      value: totalCampaigns,
      delay: 0.4
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: 'Connected Emails',
      value: connectedEmails,
      delay: 0.5,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: 'Disconnected Emails',
      value: disconnectedEmails,
      delay: 0.6,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Warmup Active',
      value: warmupActive,
      delay: 0.7,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Warmup Inactive',
      value: warmupInactive,
      delay: 0.8,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatsCard key={stat.label} {...stat} />
      ))}
      
      <EmailProviderCard providers={emailProviders} delay={0.9} />
    </div>
  );
}