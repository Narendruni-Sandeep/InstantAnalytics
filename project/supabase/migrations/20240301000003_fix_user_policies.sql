-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON instantly_user;
DROP POLICY IF EXISTS "Enable read access for users to their own record" ON instantly_user;
DROP POLICY IF EXISTS "Enable update for users to their own record" ON instantly_user;

-- Create new policies with proper checks
CREATE POLICY "Allow insert during signup"
ON instantly_user FOR INSERT
WITH CHECK (
  -- Allow insert if the user is authenticated and the id matches
  (auth.uid() = id) OR
  -- Or if the request comes from the service role
  (auth.role() = 'service_role')
);

CREATE POLICY "Enable read access for users to their own record"
ON instantly_user FOR SELECT
USING (
  -- Users can only read their own records
  auth.uid() = id OR
  -- Service role can read all records
  auth.role() = 'service_role'
);

CREATE POLICY "Enable update for users to their own record"
ON instantly_user FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT ALL ON instantly_user TO authenticated;
GRANT ALL ON instantly_user TO service_role;

-- Create trigger to automatically set email verified status
CREATE OR REPLACE FUNCTION public.handle_email_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE instantly_user
    SET verified = true
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_email_verified ON auth.users;
CREATE TRIGGER on_auth_user_email_verified
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_email_verification();