-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies and triggers
DROP POLICY IF EXISTS "Enable all inserts" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable read access" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable update access" ON public.instantly_user;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_email_verified ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_email_verification();

-- Create simple policies
CREATE POLICY "Enable insert for signup"
ON public.instantly_user
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable read for users"
ON public.instantly_user
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Enable update for users"
ON public.instantly_user
FOR UPDATE
USING (auth.uid() = id);

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO anon;
GRANT ALL ON public.instantly_user TO service_role;