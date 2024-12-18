import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import type { CampaignEmail } from '../../../../types/campaign';

interface EmailListProps {
  emails: CampaignEmail[];
}

export function EmailList({ emails }: EmailListProps) {
  // Get unique emails with latest metrics
  const uniqueEmails = React.useMemo(() => {
    const emailMap = new Map<string, CampaignEmail>();
    
    // Sort by date descending to get latest first
    const sortedEmails = [...emails].sort((a, b) => 
      new Date(b.update_date).getTime() - new Date(a.update_date).getTime()
    );

    // Keep only the latest entry for each email
    sortedEmails.forEach(email => {
      if (!emailMap.has(email.email)) {
        emailMap.set(email.email, {
          ...email,
          sent_count: email.sent_count || 0,
          reply_count: parseInt(email.reply_count?.toString() || '0', 10),
          bounce_count: email.bounce_count || 0
        });
      }
    });

    return Array.from(emailMap.values());
  }, [emails]);

  if (uniqueEmails.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Mail className="w-8 h-8 mb-2" />
          <p>No email accounts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-display font-semibold text-foreground">
          Email Accounts ({uniqueEmails.length})
        </h3>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {uniqueEmails.map((email, index) => (
            <motion.div
              key={email.email}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {email.email}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Sent: {email.sent_count}</span>
                    <span>Replies: {email.reply_count}</span>
                    <span>Bounces: {email.bounce_count}</span>
                  </div>
                  {(email.domain || email.email_provider) && (
                    <div className="flex gap-2 mt-2">
                      {email.domain && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {email.domain}
                        </span>
                      )}
                      {email.email_provider && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {email.email_provider}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}