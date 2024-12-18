import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { EmailStatsData } from '../types/email';

export function useEmailStats(clientId?: string) {
  const { user } = useAuth();
  const [stats, setStats] = useState<EmailStatsData[]>([]);
  const [lastUpdateDate, setLastUpdateDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadEmailStats();
    }
  }, [user?.id, clientId]);

  const loadEmailStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get latest date
      const { data: latestDate } = await supabase
        .from('instantly_email')
        .select('update_date')
        .order('update_date', { ascending: false })
        .limit(1)
        .single();

      if (!latestDate) throw new Error('No data available');

      // Format date for display
      const date = new Date(latestDate.update_date);
      setLastUpdateDate(date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }));

      // Build query for emails
      let query = supabase
        .from('instantly_email')
        .select('email, client, status, warmup_status')
        .eq('user_id', user.id)
        .eq('update_date', latestDate.update_date)
        .not('client', 'is', null);

      // Add client filter if specified
      if (clientId) {
        const { data: client } = await supabase
          .from('instantly_client')
          .select('name')
          .eq('id', clientId)
          .single();

        if (client) {
          query = query.eq('client', client.name);
        }
      }

      const { data: emailData, error: emailError } = await query;

      if (emailError) throw emailError;

      // Process stats by client
      const clientStats = new Map<string, EmailStatsData>();

      emailData?.forEach(record => {
        if (!record.client) return;

        const current = clientStats.get(record.client) || {
          client: record.client,
          total_emails: 0,
          active_emails: 0,
          inactive_emails: 0,
          domains: 0,
          warmup_active: 0,
          warmup_inactive: 0
        };

        current.total_emails++;
        
        if (record.status === 'active') {
          current.active_emails++;
        } else {
          current.inactive_emails++;
        }

        if (record.warmup_status === 'active') {
          current.warmup_active++;
        } else {
          current.warmup_inactive++;
        }

        clientStats.set(record.client, current);
      });

      setStats(Array.from(clientStats.values()));
    } catch (err: any) {
      console.error('Error loading email stats:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { stats, lastUpdateDate, isLoading, error };
}