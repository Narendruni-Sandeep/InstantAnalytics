-- Drop existing constraints
ALTER TABLE instantly_user DROP CONSTRAINT IF EXISTS unique_workspace;
ALTER TABLE instantly_user DROP CONSTRAINT IF EXISTS unique_email_per_account;

-- Add new composite unique constraints
ALTER TABLE instantly_user ADD CONSTRAINT unique_workspace
  UNIQUE (instantly_user, instantly_password, org_id);

-- Add constraint for unique email per Instantly credentials
ALTER TABLE instantly_user ADD CONSTRAINT unique_email_per_credentials
  UNIQUE (email, instantly_user, instantly_password);

-- Create trigger function to validate workspace uniqueness
CREATE OR REPLACE FUNCTION check_workspace_constraints()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this workspace combination already exists
  IF EXISTS (
    SELECT 1 FROM instantly_user
    WHERE instantly_user = NEW.instantly_user
    AND instantly_password = NEW.instantly_password
    AND org_id = NEW.org_id
    AND id != NEW.id
  ) THEN
    RAISE EXCEPTION 'This workspace is already connected to another account';
  END IF;

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

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS check_workspace_constraints_trigger ON instantly_user;
CREATE TRIGGER check_workspace_constraints_trigger
  BEFORE INSERT OR UPDATE ON instantly_user
  FOR EACH ROW
  EXECUTE FUNCTION check_workspace_constraints();