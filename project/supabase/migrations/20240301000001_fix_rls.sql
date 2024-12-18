-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Users can insert own record" ON instantly_user;
DROP POLICY IF EXISTS "Users can view own record" ON instantly_user;
DROP POLICY IF EXISTS "Users can update own record" ON instantly_user;

-- Create new policies with proper authentication checks
CREATE POLICY "Enable insert for authenticated users only"
ON instantly_user FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable read access for users to their own record"
ON instantly_user FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Enable update for users to their own record"
ON instantly_user FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow service role to bypass RLS
ALTER TABLE instantly_user FORCE ROW LEVEL SECURITY;
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON instantly_user TO authenticated;
GRANT ALL ON instantly_user TO service_role;