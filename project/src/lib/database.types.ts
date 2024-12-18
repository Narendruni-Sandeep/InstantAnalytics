export interface Database {
  public: {
    Tables: {
      instantly_user: {
        Row: {
          id: string;
          email: string | null;
          created_at: string;
          first_name: string | null;
          last_name: string | null;
          verified: boolean | null;
          instantly_user: string | null;
          instantly_password: string | null;
          instantly_api_key: string | null;
          instantly_token: string | null;
          credit: number | null;
          Plan: string | null;
          updated_date: string | null;
          total_client: number | null;
          org_id: string | null;
          org_token: string | null;
        };
        Insert: {
          id: string;
          email?: string | null;
          created_at?: string;
          first_name?: string | null;
          last_name?: string | null;
          verified?: boolean | null;
          instantly_user?: string | null;
          instantly_password?: string | null;
          instantly_api_key?: string | null;
          instantly_token?: string | null;
          credit?: number | null;
          Plan?: string | null;
          updated_date?: string | null;
          total_client?: number | null;
          org_id?: string | null;
          org_token?: string | null;
        };
        Update: {
          id?: string;
          email?: string | null;
          created_at?: string;
          first_name?: string | null;
          last_name?: string | null;
          verified?: boolean | null;
          instantly_user?: string | null;
          instantly_password?: string | null;
          instantly_api_key?: string | null;
          instantly_token?: string | null;
          credit?: number | null;
          Plan?: string | null;
          updated_date?: string | null;
          total_client?: number | null;
          org_id?: string | null;
          org_token?: string | null;
        };
      };
    };
  };
}