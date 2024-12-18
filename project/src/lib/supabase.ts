import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Update redirectTo to use instantanalytic.com
    redirectTo: 'https://instantanalytic.com/auth/callback'
  }
});

// Helper function to manually verify a user (for development/testing)
export async function manuallyVerifyUser(userId: string) {
  const { error } = await supabase
    .from('instantly_user')
    .update({ verified: true })
    .eq('id', userId);

  if (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
}