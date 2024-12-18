import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

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

export function useAllEmails() {
  const { user } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmails() {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get latest date first
        const { data: latestDate } = await supabase
          .from('instantly_email')
          .select('update_date')
          .order('update_date', { ascending: false })
          .limit(1)
          .single();

        if (!latestDate) throw new Error('No email data found');

        // Get unique emails first
        const { data: uniqueEmails, error: uniqueError } = await supabase
          .from('instantly_unique_email')
          .select(`
            email,
            first_name,
            last_name,
            domain,
            email_provider,
            client
          `)
          .eq('user', user.id);

        if (uniqueError) throw uniqueError;

        // Get latest status for each email
        const { data: statusData, error: statusError } = await supabase
          .from('instantly_email')
          .select(`
            email,
            status,
            warmup_status
          `)
          .eq('user_id', user.id)
          .eq('update_date', latestDate.update_date);

        if (statusError) throw statusError;

        // Get aggregated metrics for each email
        const { data: metricsData, error: metricsError } = await supabase
          .from('instantly_email')
          .select(`
            email,
            sent_count,
            reply_count,
            bounce_count
          `)
          .eq('user_id', user.id);

        if (metricsError) throw metricsError;

        // Aggregate metrics by email
        const emailMetrics = metricsData.reduce((acc: Record<string, any>, curr) => {
          if (!acc[curr.email]) {
            acc[curr.email] = {
              sent_count: 0,
              reply_count: 0,
              bounce_count: 0
            };
          }

          // Handle sent count
          acc[curr.email].sent_count += curr.sent_count || 0;

          // Handle reply count - convert to number and handle null/undefined
          const replyCount = curr.reply_count ? parseInt(curr.reply_count.toString(), 10) : 0;
          acc[curr.email].reply_count += isNaN(replyCount) ? 0 : replyCount;

          // Handle bounce count
          acc[curr.email].bounce_count += curr.bounce_count || 0;

          return acc;
        }, {});

        // Combine all data
        const combinedEmails = uniqueEmails?.map(uniqueEmail => {
          const status = statusData?.find(s => s.email === uniqueEmail.email) || {
            status: 'inactive',
            warmup_status: 'inactive'
          };
          const metrics = emailMetrics[uniqueEmail.email] || {
            sent_count: 0,
            reply_count: 0,
            bounce_count: 0
          };

          return {
            ...uniqueEmail,
            ...status,
            sent_count: metrics.sent_count,
            reply_count: metrics.reply_count,
            bounce_count: metrics.bounce_count
          };
        });

        setEmails(combinedEmails || []);
      } catch (err: any) {
        console.error('Error fetching emails:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmails();
  }, [user?.id]);

  return { emails, isLoading, error };
}