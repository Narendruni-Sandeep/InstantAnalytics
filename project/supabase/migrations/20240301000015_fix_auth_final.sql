-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "users_full_access" ON public.instantly_user;

-- Create separate policies for different operations
CREATE POLICY "enable_insert_for_signup"
ON public.instantly_user
FOR INSERT
WITH CHECK (
  -- Allow service role full access
  auth.role() = 'service_role'
  -- Allow new user creation during signup
  OR id = auth.uid()
);

CREATE POLICY "enable_select_for_users"
ON public.instantly_user
FOR SELECT
USING (
  -- Allow service role full access
  auth.role() = 'service_role'
  -- Allow users to read their own records
  OR id = auth.uid()
);

CREATE POLICY "enable_update_for_users"
ON public.instantly_user
FOR UPDATE
USING (
  -- Allow service role full access
  auth.role() = 'service_role'
  -- Allow users to modify their own records
  OR id = auth.uid()
);

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO anon;
GRANT ALL ON public.instantly_user TO service_role;