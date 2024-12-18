import { supabase } from '../lib/supabase';

interface EmailUpdateResult {
  success: boolean;
  error?: string;
}

export async function updateEmailClientMapping(
  email: string,
  clientName: string | null,
  userId: string
): Promise<EmailUpdateResult> {
  try {
    // Start a Supabase transaction
    const { data: uniqueEmail, error: uniqueError } = await supabase
      .from('instantly_unique_email')
      .update({ client: clientName })
      .eq('email', email)
      .eq('user', userId); // Changed from user_id to user

    if (uniqueError) throw uniqueError;

    // Update all entries in instantly_email table
    const { error: emailError } = await supabase
      .from('instantly_email')
      .update({ client: clientName })
      .eq('email', email)
      .eq('user_id', userId);

    if (emailError) throw emailError;

    return { success: true };
  } catch (error: any) {
    console.error('Error updating email client mapping:', error);
    return {
      success: false,
      error: error.message || 'Failed to update email mapping'
    };
  }
}

export async function bulkUpdateEmailClientMapping(
  emails: string[],
  clientName: string | null,
  userId: string
): Promise<EmailUpdateResult> {
  try {
    // Update instantly_unique_email table
    const { error: uniqueError } = await supabase
      .from('instantly_unique_email')
      .update({ client: clientName })
      .in('email', emails)
      .eq('user', userId); // Changed from user_id to user

    if (uniqueError) throw uniqueError;

    // Update instantly_email table
    const { error: emailError } = await supabase
      .from('instantly_email')
      .update({ client: clientName })
      .in('email', emails)
      .eq('user_id', userId);

    if (emailError) throw emailError;

    return { success: true };
  } catch (error: any) {
    console.error('Error bulk updating email client mapping:', error);
    return {
      success: false,
      error: error.message || 'Failed to update email mappings'
    };
  }
}

export async function getEmailCounts(userId: string) {
  try {
    // Get unassigned count (both null and empty string)
    const { count: nullCount, error: nullError } = await supabase
      .from('instantly_unique_email')
      .select('*', { count: 'exact', head: true })
      .eq('user', userId) // Changed from user_id to user
      .is('client', null);

    if (nullError) throw nullError;

    const { count: emptyCount, error: emptyError } = await supabase
      .from('instantly_unique_email')
      .select('*', { count: 'exact', head: true })
      .eq('user', userId) // Changed from user_id to user
      .eq('client', '');

    if (emptyError) throw emptyError;

    return { 
      unassignedCount: (nullCount || 0) + (emptyCount || 0)
    };
  } catch (error: any) {
    console.error('Error getting email counts:', error);
    return { unassignedCount: 0 }; // Return safe default instead of throwing
  }
}

export async function getClientEmailCounts(userId: string, clients: { id: string; name: string }[]) {
  try {
    const clientCounts: Record<string, number> = {};
    
    for (const client of clients) {
      const { count, error } = await supabase
        .from('instantly_unique_email')
        .select('*', { count: 'exact', head: true })
        .eq('user', userId) // Changed from user_id to user
        .eq('client', client.name);

      if (error) throw error;
      clientCounts[client.name] = count || 0;
    }

    return clientCounts;
  } catch (error: any) {
    console.error('Error getting client email counts:', error);
    return {}; // Return safe default instead of throwing
  }
}