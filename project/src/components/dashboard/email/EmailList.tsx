import React from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  status: string;
  warmup_status: string;
}

interface EmailListProps {
  title?: string;
  emails: Email[];
  isLoading: boolean;
  error: string | null;
}

export function EmailList({ title = "All Mailbox Accounts", emails, isLoading, error }: EmailListProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailClick = (email: string) => {
    navigate(`/dashboard/email/${encodeURIComponent(email)}`, {
      state: { from: location.pathname }
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="h-[400px] flex flex-col items-center justify-center text-destructive gap-2">
          <AlertCircle className="w-8 h-8" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-foreground">
            {title}
          </h3>
          <span className="text-sm text-muted-foreground">
            {emails.length} {emails.length === 1 ? 'account' : 'accounts'}
          </span>
        </div>
      </div>

      <div className="p-4">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Mail className="w-8 h-8 mb-2" />
            <p>No mailbox accounts found</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {emails.map((email, index) => (
              <motion.div
                key={email.email}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleEmailClick(email.email)}
                className="p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    email.status === 'active' ? 'bg-emerald-500/10' : 'bg-destructive/10'
                  }`}>
                    <Mail className={`w-4 h-4 ${
                      email.status === 'active' ? 'text-emerald-500' : 'text-destructive'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">
                        {email.email}
                      </p>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          email.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {email.status === 'active' ? 'Connected' : 'Disconnected'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          email.warmup_status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          Warmup {email.warmup_status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    {(email.first_name || email.last_name) && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {[email.first_name, email.last_name].filter(Boolean).join(' ')}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}