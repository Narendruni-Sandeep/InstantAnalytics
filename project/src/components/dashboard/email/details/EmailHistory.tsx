import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface EmailHistoryProps {
  history: Array<{
    update_date: string;
    status: string;
    warmup_status: string;
    sent_count: number | null;
    bounce_count: number | null;
    reply_count: string | null;
  }>;
}

export function EmailHistory({ history }: EmailHistoryProps) {
  return (
    <div className="rounded-xl bg-card border border-border">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-display font-semibold text-foreground">
          Email History
        </h2>
      </div>

      <div className="p-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-border" />
          
          {/* Scrollable container with fixed height */}
          <div className="relative max-h-[400px] overflow-y-auto pr-2">
            <div className="space-y-6">
              {history.map((entry, index) => (
                <motion.div
                  key={entry.update_date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: Math.min(index * 0.1, 1), // Cap animation delay at 1s
                    duration: 0.3 
                  }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-2 w-4 h-4 rounded-full border-2 border-primary bg-background" />
                  
                  <div className="p-4 rounded-lg bg-accent/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {format(new Date(entry.update_date), 'MMM d, yyyy')}
                      </span>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          entry.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {entry.status === 'active' ? 'Connected' : 'Disconnected'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          entry.warmup_status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          Warmup {entry.warmup_status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Sent Count</p>
                        <p className="text-sm font-medium text-foreground">
                          {entry.sent_count || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bounce Count</p>
                        <p className="text-sm font-medium text-foreground">
                          {entry.bounce_count || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reply Count</p>
                        <p className="text-sm font-medium text-foreground">
                          {entry.reply_count || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}