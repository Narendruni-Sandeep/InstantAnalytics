-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies and start fresh
DROP POLICY IF EXISTS "Enable full access for authenticated users to own records" ON public.instantly_user;

-- Create a more permissive policy for the auth flow
CREATE POLICY "Enable insert for signup"
ON public.instantly_user
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable read access for users"
ON public.instantly_user
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Enable update for users"
ON public.instantly_user
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;