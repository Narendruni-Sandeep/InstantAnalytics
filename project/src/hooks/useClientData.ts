import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Client {
  id: string;
  name: string;
  campaign_name: string;
}

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  domain: string;
  email_provider: string | null;
}

interface Campaign {
  id: string;
  campaign_name: string;
  combination: string | null;
}

interface Domain {
  domain: string;
  count: number;
  provider: string | null;
}

export function useClientData(clientId: string | undefined) {
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id && clientId) {
      loadClientData();
    }
  }, [user?.id, clientId]);

  const loadClientData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Load client details
      const { data: clientData, error: clientError } = await supabase
        .from('instantly_client')
        .select('*')
        .eq('id', clientId)
        .eq('user_id', user?.id)
        .single();

      if (clientError) throw clientError;
      setClient(clientData);

      // Load emails
      const { data: emailData, error: emailError } = await supabase
        .from('instantly_unique_email')
        .select('*')
        .eq('client', clientData.name)
        .eq('user', user?.id);

      if (emailError) throw emailError;
      setEmails(emailData || []);

      // Load campaigns
      const { data: campaignData, error: campaignError } = await supabase
        .from('instantly_unique_campaign')
        .select('*')
        .eq('client', clientData.name)
        .eq('user_id', user?.id);

      if (campaignError) throw campaignError;
      setCampaigns(campaignData || []);

      // Calculate unique domains and counts
      const domainCounts = emailData?.reduce((acc: Record<string, Domain>, email) => {
        if (email.domain) {
          if (!acc[email.domain]) {
            acc[email.domain] = {
              domain: email.domain,
              count: 0,
              provider: email.domain_provider
            };
          }
          acc[email.domain].count++;
        }
        return acc;
      }, {});

      setDomains(Object.values(domainCounts || {}));
    } catch (err: any) {
      console.error('Error loading client data:', err);
      setError('Failed to load client data');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    client,
    emails,
    campaigns,
    domains,
    isLoading,
    error
  };
}