-- Drop existing functions
DROP FUNCTION IF EXISTS get_client_email_stats;
DROP FUNCTION IF EXISTS get_disconnected_emails;

-- Function to get client email stats with unique emails
CREATE OR REPLACE FUNCTION get_client_email_stats(p_user_id uuid, p_date date)
RETURNS TABLE (
  client text,
  total_emails bigint,
  active_emails bigint,
  inactive_emails bigint,
  domains bigint,
  warmup_active bigint,
  warmup_inactive bigint
) AS $$
BEGIN
  RETURN QUERY
  WITH latest_status AS (
    SELECT DISTINCT ON (e.email, e.client)
      e.email,
      e.client,
      e.status,
      e.warmup_status,
      e.domain
    FROM instantly_email e
    WHERE e.user_id = p_user_id
      AND date(e.update_date) = p_date
      AND e.client IS NOT NULL
    ORDER BY e.email, e.client, e.update_date DESC
  )
  SELECT 
    ls.client,
    COUNT(DISTINCT ls.email)::bigint as total_emails,
    COUNT(DISTINCT CASE WHEN ls.status = 'active' THEN ls.email END)::bigint as active_emails,
    COUNT(DISTINCT CASE WHEN ls.status = 'inactive' THEN ls.email END)::bigint as inactive_emails,
    COUNT(DISTINCT ls.domain)::bigint as domains,
    COUNT(DISTINCT CASE WHEN ls.warmup_status = 'active' THEN ls.email END)::bigint as warmup_active,
    COUNT(DISTINCT CASE WHEN ls.warmup_status = 'inactive' THEN ls.email END)::bigint as warmup_inactive
  FROM latest_status ls
  GROUP BY ls.client
  ORDER BY ls.client;
END;
$$ LANGUAGE plpgsql;

-- Function to get disconnected emails
CREATE OR REPLACE FUNCTION get_disconnected_emails(
  p_client text,
  p_start_date date,
  p_end_date date,
  p_status_type text
)
RETURNS TABLE (
  email text,
  first_name text,
  last_name text,
  domain text,
  email_provider text
) AS $$
BEGIN
  RETURN QUERY
  WITH latest_status AS (
    SELECT DISTINCT ON (e.email)
      e.email,
      e.first_name,
      e.last_name,
      e.domain,
      e.email_provider,
      CASE 
        WHEN p_status_type = 'connection' THEN e.status
        ELSE e.warmup_status
      END as current_status,
      e.update_date
    FROM instantly_email e
    WHERE e.client = p_client
      AND date(e.update_date) >= p_start_date
      AND date(e.update_date) <= p_end_date
    ORDER BY e.email, e.update_date DESC
  )
  SELECT 
    ls.email,
    ls.first_name,
    ls.last_name,
    ls.domain,
    ls.email_provider
  FROM latest_status ls
  WHERE ls.current_status = 'inactive'
  ORDER BY ls.email;
END;
$$ LANGUAGE plpgsql;