-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for signup" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable read for users" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable update for users" ON public.instantly_user;

-- Create a single policy for all operations
CREATE POLICY "users_full_access"
ON public.instantly_user
FOR ALL
USING (
  -- Allow service role full access
  auth.role() = 'service_role'
  -- Allow users to access their own records
  OR auth.uid() = id
  -- Allow new user creation during signup
  OR (
    CURRENT_OPERATION = 'INSERT'
    AND NEW.id = auth.uid()
  )
)
WITH CHECK (
  -- Allow service role full access
  auth.role() = 'service_role'
  -- Allow users to modify their own records
  OR auth.uid() = id
  -- Allow new user creation during signup
  OR (
    CURRENT_OPERATION = 'INSERT'
    AND NEW.id = auth.uid()
  )
);

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO anon;
GRANT ALL ON public.instantly_user TO service_role;