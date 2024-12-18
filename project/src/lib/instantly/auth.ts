import { InstantlyCredentials } from './types';

export async function validateInstantlyCredentials(
  credentials: InstantlyCredentials
): Promise<{ valid: boolean; token?: string }> {
  try {
    const response = await fetch('https://n8n.chillreach.in/webhook/instantly_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: credentials.username,
        password: credentials.password,
      }).toString(),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const errorMessage = data?.message || response.statusText;
      throw new Error(`Authentication failed: ${errorMessage}`);
    }

    const data = await response.json();
    
    if (!data?.cookie) {
      throw new Error('Invalid authentication response');
    }

    return { valid: true, token: data.cookie };
  } catch (error: any) {
    console.error('Error validating credentials:', error);
    throw new Error(error.message || 'Failed to validate credentials');
  }
}