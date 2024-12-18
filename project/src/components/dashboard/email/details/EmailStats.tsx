import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Send,
  Reply,
  AlertTriangle,
  Mail,
  Globe,
  AtSign
} from 'lucide-react';
import { AnimatedNumber } from '../../AnimatedNumber';

interface EmailStatsProps {
  emailData: {
    email: string;
    first_name: string;
    last_name: string | null;
    domain: string | null;
    email_provider: string | null;
    status: string;
    warmup_status: string;
    sent_count: number;
    reply_count: number;
    bounce_count: number;
    history: Array<{
      status: string;
      warmup_status: string;
      sent_count: number;
      bounce_count: number;
      reply_count: number;
      update_date: string;
    }>;
  };
}

export function EmailStats({ emailData }: EmailStatsProps) {
  // Calculate rates
  const rates = useMemo(() => {
    const history = emailData.history || [];
    const totalSent = history.reduce((acc, curr) => acc + (curr.sent_count || 0), 0);
    
    return {
      replyRate: totalSent ? ((emailData.reply_count / totalSent) * 100).toFixed(1) : '0.0',
      bounceRate: totalSent ? ((emailData.bounce_count / totalSent) * 100).toFixed(1) : '0.0'
    };
  }, [emailData]);

  return (
    <div className="space-y-6">
      {/* Email Info Section */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg bg-primary/10">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              {emailData.email}
            </h2>
            {(emailData.first_name || emailData.last_name) && (
              <p className="text-muted-foreground">
                {[emailData.first_name, emailData.last_name].filter(Boolean).join(' ')}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emailData.domain && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Globe className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Domain</p>
                <p className="text-sm font-medium">{emailData.domain}</p>
              </div>
            </div>
          )}

          {emailData.email_provider && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <AtSign className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Provider</p>
                <p className="text-sm font-medium">{emailData.email_provider}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              emailData.status === 'active' ? 'bg-emerald-500/10' : 'bg-destructive/10'
            }`}>
              <Activity className={`w-4 h-4 ${
                emailData.status === 'active' ? 'text-emerald-500' : 'text-destructive'
              }`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Connection Status</p>
              <p className={`text-sm font-medium ${
                emailData.status === 'active' ? 'text-emerald-500' : 'text-destructive'
              }`}>
                {emailData.status === 'active' ? 'Connected' : 'Disconnected'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              emailData.warmup_status === 'active' ? 'bg-emerald-500/10' : 'bg-destructive/10'
            }`}>
              <Zap className={`w-4 h-4 ${
                emailData.warmup_status === 'active' ? 'text-emerald-500' : 'text-destructive'
              }`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warmup Status</p>
              <p className={`text-sm font-medium ${
                emailData.warmup_status === 'active' ? 'text-emerald-500' : 'text-destructive'
              }`}>
                {emailData.warmup_status === 'active' ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Send className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground">Total Sent</p>
          </div>
          <p className="text-2xl font-display font-bold text-blue-500">
            <AnimatedNumber value={emailData.sent_count} />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Reply className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-sm text-muted-foreground">Total Replies</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-display font-bold text-emerald-500">
              <AnimatedNumber value={emailData.reply_count} />
            </p>
            <span className="text-sm text-emerald-500">
              {rates.replyRate}%
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground">Total Bounces</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-display font-bold text-destructive">
              <AnimatedNumber value={emailData.bounce_count} />
            </p>
            <span className="text-sm text-destructive">
              {rates.bounceRate}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}