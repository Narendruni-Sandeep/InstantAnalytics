import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';

interface HistoryEntry {
  status: string;
  new_lead_contacted: number;
  interested_lead: number;
  opportunity_won: number;
  update_date: string;
}

interface CampaignHistoryProps {
  history: HistoryEntry[];
}

export function CampaignHistory({ history }: CampaignHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <FileText className="w-8 h-8 mb-2" />
          <p>No history available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-display font-semibold text-foreground">
          Campaign History
        </h3>
      </div>

      <div className="p-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-border" />
          
          {/* Scrollable container */}
          <div className="relative max-h-[400px] overflow-y-auto">
            <div className="space-y-6">
              {history.map((entry, index) => (
                <motion.div
                  key={entry.update_date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-2 w-4 h-4 rounded-full border-2 border-primary bg-background" />
                  
                  <div className="p-4 rounded-lg bg-accent/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {format(new Date(entry.update_date), 'MMM d, yyyy')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        entry.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {entry.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">New Leads</p>
                        <p className="text-sm font-medium text-foreground">
                          {entry.new_lead_contacted}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interested</p>
                        <p className="text-sm font-medium text-foreground">
                          {entry.interested_lead}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Won</p>
                        <p className="text-sm font-medium text-foreground">
                          {entry.opportunity_won}
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