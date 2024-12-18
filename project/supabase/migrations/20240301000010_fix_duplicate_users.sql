-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow service role full access" ON public.instantly_user;
DROP POLICY IF EXISTS "Allow users to read own data" ON public.instantly_user;
DROP POLICY IF EXISTS "Allow users to update own data" ON public.instantly_user;

-- Create unique constraint on email
ALTER TABLE instantly_user ADD CONSTRAINT unique_email UNIQUE (email);

-- Create new policies
CREATE POLICY "Enable insert for new users"
ON public.instantly_user
FOR INSERT
WITH CHECK (
  -- Allow insert if no user exists with this email
  NOT EXISTS (
    SELECT 1 FROM public.instantly_user 
    WHERE email = NEW.email
  )
  AND (auth.uid() = id OR auth.role() = 'service_role')
);

CREATE POLICY "Enable read for users"
ON public.instantly_user
FOR SELECT
USING (auth.uid() = id OR auth.role() = 'service_role');

CREATE POLICY "Enable update for users"
ON public.instantly_user
FOR UPDATE
USING (auth.uid() = id OR auth.role() = 'service_role')
WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;