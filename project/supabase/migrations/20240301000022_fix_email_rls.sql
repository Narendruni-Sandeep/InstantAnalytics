-- Disable RLS temporarily
ALTER TABLE instantly_unique_email DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable access for users" ON instantly_unique_email;

-- Create policies for instantly_unique_email table
CREATE POLICY "Enable all operations for users"
ON instantly_unique_email
FOR ALL
USING (
  -- Users can access records where they are the owner
  "user" = auth.uid()
  -- Or if they have service role access
  OR auth.role() = 'service_role'
)
WITH CHECK (
  -- Users can modify records where they are the owner
  "user" = auth.uid()
  -- Or if they have service role access
  OR auth.role() = 'service_role'
);

-- Re-enable RLS
ALTER TABLE instantly_unique_email ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON instantly_unique_email TO authenticated;
GRANT ALL ON instantly_unique_email TO service_role;