import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  domain: string | null;
  email_provider: string | null;
  client: string | null;
}

interface MailboxListProps {
  emails: Email[];
  clients: { id: string; name: string }[];
  isLoading: boolean;
  onMapToClient: (email: string, clientName: string) => void;
}

export function MailboxList({ 
  emails, 
  clients, 
  isLoading, 
  onMapToClient
}: MailboxListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-xl bg-card border border-border"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          No Mailbox Accounts Found
        </h3>
        <p className="text-muted-foreground max-w-md">
          No mailbox accounts are available in this category.
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
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {email.email}
                  </h3>
                  {(email.first_name || email.last_name) && (
                    <p className="text-sm text-muted-foreground">
                      {[email.first_name, email.last_name].filter(Boolean).join(' ')}
                    </p>
                  )}
                </div>
              </div>
              {(email.domain || email.email_provider) && (
                <div className="flex gap-2 text-sm">
                  {email.domain && (
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                      {email.domain}
                    </span>
                  )}
                  {email.email_provider && (
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                      {email.email_provider}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <select
                onChange={(e) => onMapToClient(email.email, e.target.value)}
                value={email.client || ""}
                className="px-4 py-2 rounded-lg bg-card text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>Select Client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}