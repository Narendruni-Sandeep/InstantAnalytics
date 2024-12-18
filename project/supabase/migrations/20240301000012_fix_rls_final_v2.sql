-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for signup" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.instantly_user;

-- Create a completely permissive insert policy
CREATE POLICY "Enable all inserts"
ON public.instantly_user
FOR INSERT
WITH CHECK (true);

-- Create policies for read and update
CREATE POLICY "Enable read access"
ON public.instantly_user
FOR SELECT
USING (
  auth.uid() = id OR 
  auth.role() = 'service_role'
);

CREATE POLICY "Enable update access"
ON public.instantly_user
FOR UPDATE
USING (
  auth.uid() = id OR 
  auth.role() = 'service_role'
);

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;
GRANT ALL ON public.instantly_user TO anon;