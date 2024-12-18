import { supabase } from './supabase';

export async function createDefaultClient(userId: string, firstName: string) {
  try {
    const { error } = await supabase
      .from('instantly_client')
      .insert([{
        user_id: userId,
        name: firstName,
        campaign_name: firstName.slice(0, 5).toUpperCase()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating default client:', error);
    throw error;
  }
}