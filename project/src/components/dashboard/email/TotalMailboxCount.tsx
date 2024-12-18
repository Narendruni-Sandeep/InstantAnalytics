import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';

interface TotalMailboxCountProps {
  count: number;
  isLoading?: boolean;
  clientName?: string;
}

export function TotalMailboxCount({ count, isLoading, clientName }: TotalMailboxCountProps) {
  if (isLoading) {
    return (
      <div className="h-[100px] rounded-xl bg-card/50 animate-pulse" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            <AnimatedNumber value={count} />
          </h2>
          <p className="text-muted-foreground">
            {clientName ? `Total Mailboxes for ${clientName}` : 'Total Unique Mailbox Accounts'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}