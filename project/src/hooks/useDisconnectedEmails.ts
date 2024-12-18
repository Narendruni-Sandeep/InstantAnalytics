import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface DisconnectedEmail {
  email: string;
  first_name: string;
  last_name: string | null;
}

export function useDisconnectedEmails(
  clientId: string,
  startDate: Date,
  endDate: Date,
  type: 'connection' | 'warmup'
) {
  const [data, setData] = useState<DisconnectedEmail[]>([]);
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
        const emailMap = new Map<string, DisconnectedEmail>();
        
        emailData?.forEach(record => {
          // Only process if we haven't seen this email yet (first occurrence is latest due to ordering)
          if (!emailMap.has(record.email)) {
            const status = type === 'connection' ? record.status : record.warmup_status;
            
            // Only add if status is inactive
            if (status === 'inactive') {
              emailMap.set(record.email, {
                email: record.email,
                first_name: record.first_name,
                last_name: record.last_name
              });
            }
          }
        });

        setData(Array.from(emailMap.values()));
      } catch (err: any) {
        console.error('Error fetching disconnected emails:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [clientId, startDate, endDate, type]);

  return { data, isLoading, error };
}