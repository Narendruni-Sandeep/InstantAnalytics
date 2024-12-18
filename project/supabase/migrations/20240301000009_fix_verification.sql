-- Disable RLS temporarily for the migration
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable access for users" ON public.instantly_user;

-- Create more specific policies
CREATE POLICY "Allow service role full access"
ON public.instantly_user
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow users to read own data"
ON public.instantly_user
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Allow users to update own data"
ON public.instantly_user
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create or replace the email verification handler
CREATE OR REPLACE FUNCTION public.handle_email_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE public.instantly_user
    SET verified = true
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for email verification
DROP TRIGGER IF EXISTS on_auth_user_email_verified ON auth.users;
CREATE TRIGGER on_auth_user_email_verified
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_email_verification();

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;