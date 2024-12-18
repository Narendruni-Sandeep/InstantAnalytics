import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getCampaignStats } from '../services/campaignService';
import type { CampaignStats } from '../types/campaign';

export function useCampaignStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<CampaignStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        const { data, error: statsError } = await getCampaignStats(user.id);

        if (statsError) {
          throw new Error(statsError);
        }

        setStats(data || []);
      } catch (err: any) {
        console.error('Error loading campaign stats:', err);
        setError(err.message || 'Failed to load campaign stats');
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, [user?.id]);

  return { stats, isLoading, error };
}