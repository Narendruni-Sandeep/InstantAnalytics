import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { AnimatedNumber } from '../AnimatedNumber';

interface ClientStatsProps {
  totalClients: number;
}

export function ClientStats({ totalClients }: ClientStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-fit p-4 rounded-xl bg-card border border-border"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Clients</p>
          <p className="text-xl font-display font-bold text-foreground">
            <AnimatedNumber value={totalClients} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}