export async function validateInstantlyCredentials(credentials: {
  username: string;
  password: string;
}): Promise<{ valid: boolean; token?: string }> {
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

export async function getInstantlyOrganizations(sessionToken: string) {
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

    return data[0].data;
  } catch (error: any) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
}

export async function getOrganizationToken(sessionToken: string, orgId: string) {
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

    return Array.isArray(data) && !!data[0]?.workspace_name;
  } catch (error: any) {
    console.error('Error validating API key:', error);
    throw error;
  }
}