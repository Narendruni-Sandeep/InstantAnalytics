-- Drop existing constraints
ALTER TABLE instantly_user DROP CONSTRAINT IF EXISTS unique_workspace;
ALTER TABLE instantly_user DROP CONSTRAINT IF EXISTS unique_email_per_credentials;

-- Add new composite unique constraints
ALTER TABLE instantly_user ADD CONSTRAINT unique_workspace
  UNIQUE (instantly_user, instantly_password, org_id)
  WHERE instantly_user IS NOT NULL 
  AND instantly_password IS NOT NULL 
  AND org_id IS NOT NULL;

-- Add constraint for unique email per Instantly credentials
ALTER TABLE instantly_user ADD CONSTRAINT unique_email_per_credentials
  UNIQUE (email, instantly_user, instantly_password)
  WHERE instantly_user IS NOT NULL 
  AND instantly_password IS NOT NULL;

-- Create trigger function to validate workspace uniqueness
CREATE OR REPLACE FUNCTION check_workspace_constraints()
RETURNS TRIGGER AS $$
BEGIN
  -- Only perform checks if all required fields are present
  IF NEW.instantly_user IS NOT NULL AND NEW.instantly_password IS NOT NULL THEN
    -- Check if email is already used with these Instantly credentials
    IF EXISTS (
      SELECT 1 FROM instantly_user
      WHERE email = NEW.email
      AND instantly_user = NEW.instantly_user
      AND instantly_password = NEW.instantly_password
      AND id != NEW.id
    ) THEN
      RAISE EXCEPTION 'This email is already used with these Instantly credentials';
    END IF;

    -- Check workspace uniqueness only if org_id is present
    IF NEW.org_id IS NOT NULL THEN
      IF EXISTS (
        SELECT 1 FROM instantly_user
        WHERE instantly_user = NEW.instantly_user
        AND instantly_password = NEW.instantly_password
        AND org_id = NEW.org_id
        AND id != NEW.id
      ) THEN
        RAISE EXCEPTION 'This workspace is already connected to another account';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS check_workspace_constraints_trigger ON instantly_user;
CREATE TRIGGER check_workspace_constraints_trigger
  BEFORE INSERT OR UPDATE ON instantly_user
  FOR EACH ROW
  EXECUTE FUNCTION check_workspace_constraints();