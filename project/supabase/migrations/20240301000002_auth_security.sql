-- Create rate limiting table
CREATE TABLE IF NOT EXISTS auth_rate_limit (
    ip_address text NOT NULL,
    attempt_count integer DEFAULT 1,
    last_attempt timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ip_address)
);

-- Function to check and update rate limit
CREATE OR REPLACE FUNCTION check_rate_limit(client_ip text, max_attempts integer, window_minutes integer)
RETURNS boolean AS $$
DECLARE
    current_count integer;
    last_try timestamp with time zone;
BEGIN
    -- Get current values
    SELECT attempt_count, last_attempt INTO current_count, last_try
    FROM auth_rate_limit
    WHERE ip_address = client_ip;
    
    -- If no record exists, create one and allow
    IF NOT FOUND THEN
        INSERT INTO auth_rate_limit (ip_address) VALUES (client_ip);
        RETURN true;
    END IF;
    
    -- Check if window has expired
    IF (CURRENT_TIMESTAMP - last_try) > (window_minutes || ' minutes')::interval THEN
        -- Reset counter
        UPDATE auth_rate_limit 
        SET attempt_count = 1, last_attempt = CURRENT_TIMESTAMP
        WHERE ip_address = client_ip;
        RETURN true;
    END IF;
    
    -- Increment counter
    UPDATE auth_rate_limit 
    SET attempt_count = attempt_count + 1, last_attempt = CURRENT_TIMESTAMP
    WHERE ip_address = client_ip;
    
    -- Check if limit exceeded
    RETURN current_count < max_attempts;
END;
$$ LANGUAGE plpgsql;