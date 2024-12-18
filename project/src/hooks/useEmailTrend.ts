import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { EmailTrendData } from '../types/email';

export function useEmailTrend(clientId: string, startDate: Date, endDate: Date) {
  const [data, setData] = useState<EmailTrendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendData() {
      if (!clientId) return;
      
      try {
        setIsLoading(true);
        setError(null);

        const { data: client } = await supabase
          .from('instantly_client')
          .select('name')
          .eq('id', clientId)
          .single();

        if (!client) throw new Error('Client not found');

        // Include both start and end dates in the query
        const { data: trendData, error: trendError } = await supabase
          .from('instantly_email')
          .select('update_date, email')
          .eq('client', client.name)
          .gte('update_date', startDate.toISOString().split('T')[0])
          .lte('update_date', endDate.toISOString().split('T')[0])
          .order('update_date', { ascending: true });

        if (trendError) throw trendError;

        // Group by date and count unique emails
        const groupedData = trendData?.reduce((acc: Record<string, number>, curr) => {
          const date = curr.update_date.split('T')[0];
          if (!acc[date]) {
            acc[date] = new Set();
          }
          acc[date].add(curr.email);
          return acc;
        }, {});

        // Convert to array format with unique email counts
        const formattedData: EmailTrendData[] = Object.entries(groupedData || {}).map(([date, emails]) => ({
          update_date: date,
          total_count: (emails as Set<string>).size
        }));

        setData(formattedData);
      } catch (err: any) {
        console.error('Error fetching trend data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendData();
  }, [clientId, startDate, endDate]);

  return { data, isLoading, error };
}