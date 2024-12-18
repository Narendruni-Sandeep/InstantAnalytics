import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  domain: string | null;
  email_provider: string | null;
}

interface EmailListProps {
  emails: Email[];
  isLoading: boolean;
}

export function EmailList({ emails, isLoading }: EmailListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[200px] text-center p-8 rounded-xl bg-card border border-border"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          No Unique Mailbox Accounts
        </h3>
        <p className="text-muted-foreground max-w-md">
          No unique mailbox accounts have been added for this client yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <motion.div
          key={email.email}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-medium">{email.email}</span>
                  {email.email_provider && (
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {email.email_provider}
                    </span>
                  )}
                </div>
                {(email.first_name || email.last_name) && (
                  <p className="text-sm text-muted-foreground">
                    {[email.first_name, email.last_name].filter(Boolean).join(' ')}
                  </p>
                )}
              </div>
            </div>
            {email.domain && (
              <span className="text-sm text-muted-foreground">
                {email.domain}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}