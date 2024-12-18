export interface EmailMetrics {
  sent_count: number;
  reply_count: number;
  bounce_count: number;
}

export interface CampaignSummary extends EmailMetrics {
  id: string;
  name: string;
  status: string;
  new_lead_contacted: number;
  interested_lead: number;
  opportunity_won: number;
  update_date: string;
}

export interface CampaignEmail {
  email: string;
  domain: string | null;
  email_provider: string | null;
  sent_count: number;
  reply_count: number;
  bounce_count: number;
  update_date: string;
}

export interface CampaignHistory {
  status: string;
  new_lead_contacted: number;
  interested_lead: number;
  opportunity_won: number;
  update_date: string;
}

export interface CampaignDetails {
  summary: CampaignSummary;
  emails: CampaignEmail[];
  history: CampaignHistory[];
}

// ... rest of the existing types remain the same