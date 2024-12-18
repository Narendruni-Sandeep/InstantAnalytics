import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  status: string;
  warmup_status: string;
}

export function useClientEmails(
  clientId: string,
  startDate: Date,
  endDate: Date
) {
  const [data, setData] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
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

        // Get latest status for each email in date range
        const { data: emailData, error: emailError } = await supabase
          .from('instantly_email')
          .select('email, first_name, last_name, status, warmup_status, update_date')
          .eq('client', client.name)
          .gte('update_date', startDate.toISOString().split('T')[0])
          .lte('update_date', endDate.toISOString().split('T')[0])
          .order('update_date', { ascending: false });

        if (emailError) throw emailError;

        // Process data to get unique emails with latest status
        const emailMap = new Map<string, Email>();
        
        emailData?.forEach(record => {
          // Only process if we haven't seen this email yet (first occurrence is latest due to ordering)
          if (!emailMap.has(record.email)) {
            emailMap.set(record.email, {
              email: record.email,
              first_name: record.first_name,
              last_name: record.last_name,
              status: record.status,
              warmup_status: record.warmup_status
            });
          }
        });

        setData(Array.from(emailMap.values()));
      } catch (err: any) {
        console.error('Error fetching client emails:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [clientId, startDate, endDate]);

  return { data, isLoading, error };
}