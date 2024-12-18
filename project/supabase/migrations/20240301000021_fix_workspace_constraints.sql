-- Drop existing constraints and triggers
DROP TRIGGER IF EXISTS check_workspace_constraints_trigger ON instantly_user;
DROP FUNCTION IF EXISTS check_workspace_constraints();
ALTER TABLE instantly_user DROP CONSTRAINT IF EXISTS unique_workspace;
ALTER TABLE instantly_user DROP CONSTRAINT IF EXISTS unique_email_per_credentials;

-- Create function to validate workspace constraints
CREATE OR REPLACE FUNCTION check_workspace_constraints()
RETURNS TRIGGER AS $$
BEGIN
  -- Only perform checks if Instantly credentials are being set/updated
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

    -- Check workspace uniqueness if org_id is also present
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

-- Create trigger for the constraints
CREATE TRIGGER check_workspace_constraints_trigger
  BEFORE INSERT OR UPDATE ON instantly_user
  FOR EACH ROW
  EXECUTE FUNCTION check_workspace_constraints();

-- Create partial unique indexes instead of constraints
CREATE UNIQUE INDEX unique_workspace_idx ON instantly_user 
  (instantly_user, instantly_password, org_id)
  WHERE instantly_user IS NOT NULL 
  AND instantly_password IS NOT NULL 
  AND org_id IS NOT NULL;

CREATE UNIQUE INDEX unique_email_credentials_idx ON instantly_user 
  (email, instantly_user, instantly_password)
  WHERE instantly_user IS NOT NULL 
  AND instantly_password IS NOT NULL;