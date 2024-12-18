import { supabase } from '../supabase';
import { checkWorkspaceExists, checkEmailInUse } from './validation';

export async function updateUserInstantlyData(
  userId: string,
  data: {
    instantly_user: string;
    instantly_password: string;
    instantly_token: string;
    org_id: string;
    org_token: string;
    instantly_api_key?: string;
  }
): Promise<void> {
  try {
    // Get user's email
    const { data: userData, error: userError } = await supabase
      .from('instantly_user')
      .select('email')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    // Check if workspace already exists
    const workspaceExists = await checkWorkspaceExists(
      data.instantly_user,
      data.instantly_password,
      data.org_id
    );

    if (workspaceExists) {
      throw new Error('This workspace is already connected to another account');
    }

    // Check if email is already used with these credentials
    if (userData?.email) {
      const emailInUse = await checkEmailInUse(
        userData.email,
        data.instantly_user,
        data.instantly_password
      );

      if (emailInUse) {
        throw new Error('This email is already used with these Instantly credentials');
      }
    }

    const { error } = await supabase
      .from('instantly_user')
      .update({
        instantly_user: data.instantly_user,
        instantly_password: data.instantly_password,
        instantly_token: data.instantly_token,
        org_id: data.org_id,
        org_token: data.org_token,
        instantly_api_key: data.instantly_api_key,
        verified: data.instantly_api_key ? true : false,
      })
      .eq('id', userId);

    if (error) throw error;
  } catch (error: any) {
    console.error('Error updating user data:', error);
    throw error;
  }
}