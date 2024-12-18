import React, { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { MailboxList } from '../../../components/dashboard/map/MailboxList';
import { TabNavigation } from '../../../components/dashboard/map/TabNavigation';
import { SearchBar } from '../../../components/shared/SearchBar';
import { Toast } from '../../../components/Toast';
import { useAuth } from '../../../hooks/useAuth';
import { supabase } from '../../../lib/supabase';

interface Email {
  email: string;
  first_name: string;
  last_name: string | null;
  domain: string | null;
  email_provider: string | null;
  client: string | null;
}

export function MapMailbox() {
  const { user } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('unassigned');
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabCounts, setTabCounts] = useState<Record<string, number>>({});
  const [incrementingClient, setIncrementingClient] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadClients();
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id && clients.length > 0) {
      loadTabCounts();
    }
  }, [user?.id, clients]);

  useEffect(() => {
    if (user?.id) {
      loadEmails();
    }
  }, [user?.id, activeTab]);

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('instantly_client')
        .select('id, name')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (err) {
      console.error('Error loading clients:', err);
      setError('Failed to load clients');
    }
  };

  const loadTabCounts = async () => {
    if (!user?.id) return;

    try {
      // Get unassigned count
      const { count: unassignedCount } = await supabase
        .from('instantly_unique_email')
        .select('*', { count: 'exact', head: true })
        .eq('user', user.id)
        .is('client', null);

      // Get counts for each client
      const clientCounts: Record<string, number> = {};
      await Promise.all(
        clients.map(async (client) => {
          const { count } = await supabase
            .from('instantly_unique_email')
            .select('*', { count: 'exact', head: true })
            .eq('user', user.id)
            .eq('client', client.name);

          clientCounts[client.name] = count || 0;
        })
      );

      setTabCounts({
        unassigned: unassignedCount || 0,
        ...clientCounts
      });
    } catch (err) {
      console.error('Error loading tab counts:', err);
    }
  };

  const loadEmails = async () => {
    try {
      setIsLoading(true);
      setError('');

      let query = supabase
        .from('instantly_unique_email')
        .select('*')
        .eq('user', user?.id);

      if (activeTab === 'unassigned') {
        query = query.is('client', null);
      } else {
        query = query.eq('client', activeTab);
      }

      const { data, error } = await query;

      if (error) throw error;
      setEmails(data || []);
    } catch (err) {
      console.error('Error loading emails:', err);
      setError('Failed to load emails');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapToClient = async (email: string, clientName: string) => {
    if (!user?.id) return;

    try {
      // Update email mapping
      await Promise.all([
        supabase
          .from('instantly_unique_email')
          .update({ client: clientName })
          .eq('email', email)
          .eq('user', user.id),

        supabase
          .from('instantly_email')
          .update({ client: clientName })
          .eq('email', email)
          .eq('user_id', user.id)
      ]);

      // Show increment animation
      setIncrementingClient(clientName);
      setTimeout(() => setIncrementingClient(null), 2000);

      setShowToast(true);
      await Promise.all([loadEmails(), loadTabCounts()]);
    } catch (err: any) {
      console.error('Error mapping email:', err);
      setError(err.message || 'Failed to map email to client');
    }
  };

  // Filter emails based on search term
  const filteredEmails = useMemo(() => {
    if (!searchTerm) return emails;
    
    const term = searchTerm.toLowerCase();
    return emails.filter(email => 
      email.email.toLowerCase().includes(term) ||
      email.first_name?.toLowerCase().includes(term) ||
      email.last_name?.toLowerCase().includes(term) ||
      email.domain?.toLowerCase().includes(term) ||
      email.email_provider?.toLowerCase().includes(term)
    );
  }, [emails, searchTerm]);

  const tabs = [
    { 
      id: 'unassigned', 
      label: 'Unassigned', 
      count: tabCounts.unassigned,
      showIncrement: false
    },
    ...clients.map(client => ({
      id: client.name,
      label: client.name,
      count: tabCounts[client.name],
      showIncrement: incrementingClient === client.name
    }))
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Map Mailbox Accounts
          </h1>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search mailbox accounts..."
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <MailboxList
          emails={filteredEmails}
          clients={clients}
          isLoading={isLoading}
          onMapToClient={handleMapToClient}
        />

        <Toast
          message="Client mapping successful! Updates will be reflected in the results within 4 hours."
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </DashboardLayout>
  );
}