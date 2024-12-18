export interface InstantlyCredentials {
  username: string;
  password: string;
}

export interface Organization {
  id: string;
  name: string;
  owner: string;
  org_logo_url: string | null;
  org_client_domain: string | null;
}

export interface UserInstantlyData {
  instantly_user: string;
  instantly_password: string;
  instantly_token: string;
  org_id: string;
  org_token: string;
  instantly_api_key?: string;
}