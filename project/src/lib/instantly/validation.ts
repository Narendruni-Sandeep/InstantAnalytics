import { supabase } from '../supabase';

export async function checkWorkspaceExists(
  username: string,
  password: string,
  orgId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('instantly_user')
      .select('id')
      .eq('instantly_user', username)
      .eq('instantly_password', password)
      .eq('org_id', orgId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return false;
      }
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking workspace:', error);
    return false;
  }
}

export async function checkEmailInUse(
  email: string,
  username: string,
  password: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('instantly_user')
      .select('id')
      .eq('email', email)
      .eq('instantly_user', username)
      .eq('instantly_password', password)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return false;
      }
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}