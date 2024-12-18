import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail } from 'lucide-react';
import { SlidingPanel } from '../../../SlidingPanel';

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  domain: string;
  email_provider: string | null;
}

interface Domain {
  domain: string;
  count: number;
  provider: string | null;
  emails?: Email[];
}

interface DomainListProps {
  domains: Domain[];
  isLoading: boolean;
  emails: Email[];
}

export function DomainList({ domains, isLoading, emails }: DomainListProps) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const handleDomainClick = (domain: Domain) => {
    const domainEmails = emails.filter(email => email.domain === domain.domain);
    setSelectedDomain({ ...domain, emails: domainEmails });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (domains.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[200px] text-center p-8 rounded-xl bg-card border border-border"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          No Domains Found
        </h3>
        <p className="text-muted-foreground max-w-md">
          No domains have been found for this client yet.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {domains.map((domain) => (
          <motion.div
            key={domain.domain}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <span className="text-foreground font-medium">
                    {domain.domain}
                  </span>
                  {domain.provider && (
                    <p className="text-sm text-muted-foreground">
                      Provider: {domain.provider}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDomainClick(domain)}
                className="text-sm px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {domain.count} {domain.count === 1 ? 'mailbox account' : 'mailbox accounts'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <SlidingPanel
        isOpen={!!selectedDomain}
        onClose={() => setSelectedDomain(null)}
        title={`Mailbox Accounts for ${selectedDomain?.domain}`}
      >
        <div className="space-y-4">
          {selectedDomain?.emails?.map((email) => (
            <motion.div
              key={email.email}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-card border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <span className="text-foreground font-medium">
                    {email.email}
                  </span>
                  {(email.first_name || email.last_name) && (
                    <p className="text-sm text-muted-foreground">
                      {[email.first_name, email.last_name].filter(Boolean).join(' ')}
                    </p>
                  )}
                  {email.email_provider && (
                    <span className="inline-block text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {email.email_provider}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SlidingPanel>
    </>
  );
}