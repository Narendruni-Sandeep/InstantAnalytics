import { supabase } from '../lib/supabase';
import type { Client } from '../types/client';

export async function getClients(userId: string) {
  try {
    const { data, error } = await supabase
      .from('instantly_client')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error loading clients:', err);
    return { data: null, error: 'Failed to load clients' };
  }
}

export async function createClient(userId: string, clientData: Omit<Client, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('instantly_client')
      .insert([{ ...clientData, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error creating client:', err);
    return { data: null, error: 'Failed to create client' };
  }
}

export async function updateClient(userId: string, clientId: string, updates: Omit<Client, 'id'>, oldName: string) {
  try {
    // Update client record
    const { data: updatedClient, error: clientError } = await supabase
      .from('instantly_client')
      .update(updates)
      .eq('id', clientId)
      .eq('user_id', userId)
      .select()
      .single();

    if (clientError) throw clientError;

    // Update related records
    await Promise.all([
      updateRelatedTable('instantly_email', userId, oldName, updates.name),
      updateRelatedTable('instantly_unique_email', userId, oldName, updates.name, 'user'),
      updateRelatedTable('instantly_campaign', userId, oldName, updates.name),
      updateRelatedTable('instantly_campaign_email', userId, oldName, updates.name),
      updateRelatedTable('instantly_unique_campaign', userId, oldName, updates.name)
    ]);

    return { data: updatedClient, error: null };
  } catch (err) {
    console.error('Error updating client:', err);
    return { data: null, error: 'Failed to update client' };
  }
}

export async function deleteClient(userId: string, clientId: string) {
  try {
    const { error } = await supabase
      .from('instantly_client')
      .delete()
      .eq('id', clientId)
      .eq('user_id', userId);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('Error deleting client:', err);
    return { error: 'Failed to delete client' };
  }
}

async function updateRelatedTable(
  table: string,
  userId: string,
  oldName: string,
  newName: string,
  userField: string = 'user_id'
) {
  const { error } = await supabase
    .from(table)
    .update({ client: newName })
    .eq('client', oldName)
    .eq(userField, userId);

  if (error) throw error;
}