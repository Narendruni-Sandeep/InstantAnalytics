-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for new users" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable read for users" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable update for users" ON public.instantly_user;

-- Create a more permissive policy for user creation
CREATE POLICY "Enable insert for signup"
ON public.instantly_user
FOR INSERT
WITH CHECK (
  -- Allow inserts during signup
  true
);

CREATE POLICY "Enable read for authenticated users"
ON public.instantly_user
FOR SELECT
USING (
  -- Users can only read their own records
  auth.uid() = id
);

CREATE POLICY "Enable update for authenticated users"
ON public.instantly_user
FOR UPDATE
USING (
  -- Users can only update their own records
  auth.uid() = id
);

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;