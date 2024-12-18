import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Reply, AlertTriangle, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  domain: string | null;
  email_provider: string | null;
  status: string;
  warmup_status: string;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  client: string | null;
}

interface EmailListProps {
  emails: Email[];
  isLoading: boolean;
}

export function EmailList({ emails, isLoading }: EmailListProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailClick = (email: string) => {
    navigate(`/dashboard/email/${encodeURIComponent(email)}`, {
      state: { from: location.pathname }
    });
  };

  if (isLoading) {
    return (
      <div className="h-[400px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Mail className="w-8 h-8 mb-2" />
          <p>No mailbox accounts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <motion.div
          key={email.email}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => handleEmailClick(email.email)}
          className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-colors"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  email.status === 'active' ? 'bg-emerald-500/10' : 'bg-destructive/10'
                }`}>
                  <Mail className={`w-4 h-4 ${
                    email.status === 'active' ? 'text-emerald-500' : 'text-destructive'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    {email.email}
                  </h4>
                  {(email.first_name || email.last_name) && (
                    <p className="text-sm text-muted-foreground">
                      {[email.first_name, email.last_name].filter(Boolean).join(' ')}
                    </p>
                  )}
                </div>
              </div>

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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-500" />
                <span className="text-sm">
                  Sent: {email.sent_count}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Reply className="w-4 h-4 text-green-500" />
                <span className="text-sm">
                  Replies: {email.reply_count}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm">
                  Bounces: {email.bounce_count}
                </span>
              </div>

              {email.client && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">
                    Client: {email.client}
                  </span>
                </div>
              )}
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
        </motion.div>
      ))}
    </div>
  );
}