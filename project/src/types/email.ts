export interface EmailStatsData {
  client: string;
  total_emails: number;
  active_emails: number;
  inactive_emails: number;
  domains: number;
  warmup_active: number;
  warmup_inactive: number;
}

export interface EmailTrendData {
  update_date: string;
  total_count: number;
}

export interface WarmupStatusData {
  update_date: string;
  active_count: number;
  inactive_count: number;
}

export interface ConnectionStatusData {
  update_date: string;
  active_count: number;
  inactive_count: number;
}

export interface EmailFiltersState {
  clientId: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
}