import { supabase } from './supabase';

interface InstantlyCredentials {
  username: string;
  password: string;
}

interface Organization {
  id: string;
  name: string;
}

export async function validateInstantlyCredentials(credentials: InstantlyCredentials): Promise<{ valid: boolean; token?: string }> {
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

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid credentials');
      }
      throw new Error('Failed to validate credentials');
    }
    
    if (!data.cookie) {
      throw new Error('Invalid response from server');
    }

    return { valid: true, token: data.cookie };
  } catch (error: any) {
    console.error('Error validating credentials:', error);
    throw error;
  }
}

export async function validateInstantlyApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://n8n.chillreach.in/webhook/instantly-api-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        api_key: apiKey,
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid API key');
      }
      throw new Error('Failed to validate API key');
    }
    
    if (!Array.isArray(data) || !data[0]?.workspace_name) {
      throw new Error('Invalid API key format');
    }

    return true;
  } catch (error: any) {
    console.error('Error validating API key:', error);
    throw error;
  }
}

export async function getInstantlyOrganizations(sessionToken: string): Promise<Organization[]> {
  try {
    const response = await fetch('https://n8n.chillreach.in/webhook/instantly-organization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        cookie: sessionToken,
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.result || 'Failed to fetch organizations');
      }
      throw new Error('Failed to fetch organizations');
    }

    if (!Array.isArray(data?.[0]?.data)) {
      throw new Error('No organizations found');
    }

    const organizations = data[0].data;
    
    if (organizations.length === 0) {
      throw new Error('No organizations found');
    }

    return organizations;
  } catch (error: any) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
}

export async function getOrganizationToken(sessionToken: string, orgId: string): Promise<string> {
  try {
    const response = await fetch('https://n8n.chillreach.in/webhook/instantly-org-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        cookie: sessionToken,
        orgID: orgId,
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.result || 'Failed to get organization token');
      }
      throw new Error('Failed to get organization token');
    }
    
    if (!Array.isArray(data) || !data[0]?.org_access) {
      throw new Error('Invalid organization token response');
    }

    return data[0].org_access;
  } catch (error: any) {
    console.error('Error getting organization token:', error);
    throw error;
  }
}

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

    if (error) {
      if (error.code === '23505') {
        throw new Error('This workspace is already connected to another account');
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error updating user data:', error);
    throw error;
  }
}