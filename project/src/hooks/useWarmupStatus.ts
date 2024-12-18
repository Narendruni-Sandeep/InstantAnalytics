import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { WarmupStatusData } from '../types/email';

export function useWarmupStatus(clientId: string, startDate: Date, endDate: Date) {
  const [data, setData] = useState<WarmupStatusData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWarmupData() {
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
        const { data: warmupData, error: warmupError } = await supabase
          .from('instantly_email')
          .select('update_date, warmup_status, email')
          .eq('client', client.name)
          .gte('update_date', startDate.toISOString().split('T')[0])
          .lte('update_date', endDate.toISOString().split('T')[0])
          .order('update_date', { ascending: true });

        if (warmupError) throw warmupError;

        // Group by date and count unique emails by status
        const groupedData = warmupData?.reduce((acc: Record<string, { active: Set<string>; inactive: Set<string> }>, curr) => {
          const date = curr.update_date.split('T')[0];
          if (!acc[date]) {
            acc[date] = { active: new Set(), inactive: new Set() };
          }
          if (curr.warmup_status === 'active') {
            acc[date].active.add(curr.email);
          } else {
            acc[date].inactive.add(curr.email);
          }
          return acc;
        }, {});

        // Convert to array format with unique email counts
        const formattedData: WarmupStatusData[] = Object.entries(groupedData || {}).map(([date, counts]) => ({
          update_date: date,
          active_count: counts.active.size,
          inactive_count: counts.inactive.size
        }));

        setData(formattedData);
      } catch (err: any) {
        console.error('Error fetching warmup data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWarmupData();
  }, [clientId, startDate, endDate]);

  return { data, isLoading, error };
}