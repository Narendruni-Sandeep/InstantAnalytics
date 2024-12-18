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
    SELECT DISTINCT ON (email, client)
      email,
      client,
      status,
      warmup_status,
      domain
    FROM instantly_email
    WHERE user_id = p_user_id
      AND update_date = p_date
    ORDER BY email, client, update_date DESC
  )
  SELECT 
    ls.client,
    COUNT(DISTINCT ls.email) as total_emails,
    COUNT(DISTINCT CASE WHEN ls.status = 'active' THEN ls.email END) as active_emails,
    COUNT(DISTINCT CASE WHEN ls.status = 'inactive' THEN ls.email END) as inactive_emails,
    COUNT(DISTINCT ls.domain) as domains,
    COUNT(DISTINCT CASE WHEN ls.warmup_status = 'active' THEN ls.email END) as warmup_active,
    COUNT(DISTINCT CASE WHEN ls.warmup_status = 'inactive' THEN ls.email END) as warmup_inactive
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
    SELECT DISTINCT ON (email)
      email,
      first_name,
      last_name,
      domain,
      email_provider,
      CASE 
        WHEN p_status_type = 'connection' THEN status
        ELSE warmup_status
      END as current_status,
      update_date
    FROM instantly_email
    WHERE client = p_client
      AND update_date >= p_start_date
      AND update_date <= p_end_date
    ORDER BY email, update_date DESC
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