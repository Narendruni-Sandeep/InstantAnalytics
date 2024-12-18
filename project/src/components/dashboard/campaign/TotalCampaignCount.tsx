import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';

interface TotalCampaignCountProps {
  count: number;
  clientName: string;
}

export function TotalCampaignCount({ count, clientName }: TotalCampaignCountProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-card border border-border"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            <AnimatedNumber value={count} />
          </h2>
          <p className="text-muted-foreground">
            Total Campaigns for {clientName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}