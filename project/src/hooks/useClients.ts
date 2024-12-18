import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import * as clientService from '../services/clientService';
import type { Client } from '../types/client';

export function useClients() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadClients();
    }
  }, [user?.id]);

  const loadClients = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    setError(null);
    
    const { data, error } = await clientService.getClients(user.id);
    
    if (error) {
      setError(error);
    } else {
      setClients(data || []);
    }
    
    setIsLoading(false);
  };

  const addClient = async (clientData: Omit<Client, 'id'>) => {
    if (!user?.id) return { error: 'User not authenticated' };

    const { data, error } = await clientService.createClient(user.id, clientData);
    
    if (error) {
      return { error };
    }

    setClients([data!, ...clients]);
    return { data };
  };

  const updateClient = async (clientId: string, updates: Omit<Client, 'id'>, oldName: string) => {
    if (!user?.id) return { error: 'User not authenticated' };

    const { data, error } = await clientService.updateClient(user.id, clientId, updates, oldName);
    
    if (error) {
      return { error };
    }

    setClients(clients.map(client => client.id === clientId ? data! : client));
    return { data };
  };

  const deleteClient = async (clientId: string) => {
    if (!user?.id) return { error: 'User not authenticated' };

    const { error } = await clientService.deleteClient(user.id, clientId);
    
    if (error) {
      return { error };
    }

    setClients(clients.filter(c => c.id !== clientId));
    return { error: null };
  };

  return {
    clients,
    isLoading,
    error,
    addClient,
    updateClient,
    deleteClient,
    refresh: loadClients
  };
}