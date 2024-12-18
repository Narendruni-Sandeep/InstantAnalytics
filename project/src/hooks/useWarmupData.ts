import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { WarmupData } from '../types/chart';

export function useWarmupData() {
  const { user } = useAuth();
  const [data, setData] = useState<WarmupData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWarmupData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: warmupData, error: warmupError } = await supabase
        .from('instantly_email')
        .select('update_date, warmup_status')
        .eq('user_id', user?.id)
        .order('update_date', { ascending: true });

      if (warmupError) throw warmupError;

      const aggregatedData = warmupData.reduce((acc: Record<string, { active: number; inactive: number }>, curr) => {
        const date = curr.update_date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { active: 0, inactive: 0 };
        }
        if (curr.warmup_status === 'active') {
          acc[date].active++;
        } else {
          acc[date].inactive++;
        }
        return acc;
      }, {});

      const formattedData = Object.entries(aggregatedData).map(([date, counts]) => ({
        update_date: date,
        active_count: counts.active,
        inactive_count: counts.inactive
      }));

      setData(formattedData);
    } catch (err) {
      console.error('Error loading warmup data:', err);
      setError('Failed to load warmup data');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      loadWarmupData();
    }
  }, [user?.id, loadWarmupData]);

  return { data, isLoading, error };
}