import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface DomainMetrics {
  domain: string;
  total_emails: number;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  reply_rate: number;
  bounce_rate: number;
}

interface ProviderMetrics {
  provider: string;
  total_emails: number;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  reply_rate: number;
  bounce_rate: number;
}

interface OthersData {
  domains: DomainMetrics[];
  providers: ProviderMetrics[];
}

export function useOthersData() {
  const { user } = useAuth();
  const [data, setData] = useState<OthersData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get unique emails with their domains and providers
        const { data: uniqueEmails, error: uniqueError } = await supabase
          .from('instantly_unique_email')
          .select('email, domain, email_provider')
          .eq('user', user.id);

        if (uniqueError) throw uniqueError;

        // Get email metrics
        const { data: emailMetrics, error: metricsError } = await supabase
          .from('instantly_campaign_email')
          .select('email, sent_count, reply_count, bounce_count')
          .eq('user_id', user.id);

        if (metricsError) throw metricsError;

        // Process domain metrics
        const domainMap = new Map<string, DomainMetrics>();
        const providerMap = new Map<string, ProviderMetrics>();

        // Initialize maps with email counts
        uniqueEmails?.forEach(email => {
          if (email.domain) {
            const existing = domainMap.get(email.domain) || {
              domain: email.domain,
              total_emails: 0,
              sent_count: 0,
              reply_count: 0,
              bounce_count: 0,
              reply_rate: 0,
              bounce_rate: 0
            };
            existing.total_emails++;
            domainMap.set(email.domain, existing);
          }

          if (email.email_provider) {
            const existing = providerMap.get(email.email_provider) || {
              provider: email.email_provider,
              total_emails: 0,
              sent_count: 0,
              reply_count: 0,
              bounce_count: 0,
              reply_rate: 0,
              bounce_rate: 0
            };
            existing.total_emails++;
            providerMap.set(email.email_provider, existing);
          }
        });

        // Add metrics
        emailMetrics?.forEach(metric => {
          const email = uniqueEmails?.find(e => e.email === metric.email);
          if (!email) return;

          if (email.domain) {
            const domainMetrics = domainMap.get(email.domain);
            if (domainMetrics) {
              domainMetrics.sent_count += metric.sent_count || 0;
              domainMetrics.reply_count += metric.reply_count ? parseInt(metric.reply_count.toString(), 10) : 0;
              domainMetrics.bounce_count += metric.bounce_count || 0;
            }
          }

          if (email.email_provider) {
            const providerMetrics = providerMap.get(email.email_provider);
            if (providerMetrics) {
              providerMetrics.sent_count += metric.sent_count || 0;
              providerMetrics.reply_count += metric.reply_count ? parseInt(metric.reply_count.toString(), 10) : 0;
              providerMetrics.bounce_count += metric.bounce_count || 0;
            }
          }
        });

        // Calculate rates
        domainMap.forEach(metrics => {
          if (metrics.sent_count > 0) {
            metrics.reply_rate = (metrics.reply_count / metrics.sent_count) * 100;
            metrics.bounce_rate = (metrics.bounce_count / metrics.sent_count) * 100;
          }
        });

        providerMap.forEach(metrics => {
          if (metrics.sent_count > 0) {
            metrics.reply_rate = (metrics.reply_count / metrics.sent_count) * 100;
            metrics.bounce_rate = (metrics.bounce_count / metrics.sent_count) * 100;
          }
        });

        setData({
          domains: Array.from(domainMap.values()),
          providers: Array.from(providerMap.values())
        });
      } catch (err: any) {
        console.error('Error fetching analytics data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user?.id]);

  return { data, isLoading, error };
}