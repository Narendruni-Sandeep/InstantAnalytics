import { Organization } from './types';

export async function getInstantlyOrganizations(sessionToken: string): Promise<Organization[]> {
  try {
    if (!sessionToken?.trim()) {
      throw new Error('Valid session token is required');
    }

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
        throw new Error(data.result);
      }
      throw new Error('Failed to fetch organizations. Please try again.');
    }

    if (!Array.isArray(data?.[0]?.data)) {
      throw new Error('No organizations found. Please create an organization in Instantly first.');
    }

    const organizations = data[0].data;
    
    if (organizations.length === 0) {
      throw new Error('No organizations found. Please create an organization in Instantly first.');
    }

    const validOrganizations = organizations.filter(org => 
      org?.id && 
      org?.name && 
      typeof org.id === 'string' && 
      typeof org.name === 'string'
    );

    if (validOrganizations.length === 0) {
      throw new Error('No valid organizations found. Please check your Instantly account.');
    }

    return validOrganizations;
  } catch (error: any) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
}

export async function getOrganizationToken(sessionToken: string, orgId: string): Promise<string> {
  try {
    if (!sessionToken?.trim() || !orgId?.trim()) {
      throw new Error('Valid session token and organization ID are required');
    }

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
        throw new Error(data.result);
      }
      throw new Error('Failed to get organization token. Please try again.');
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