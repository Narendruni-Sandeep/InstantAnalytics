-- Enable Row Level Security
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Policy for inserting new users (only authenticated users can insert their own record)
CREATE POLICY "Users can insert their own record"
ON instantly_user
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Policy for selecting user records (users can only see their own record)
CREATE POLICY "Users can view own record"
ON instantly_user
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy for updating user records (users can only update their own record)
CREATE POLICY "Users can update own record"
ON instantly_user
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Policy for deleting user records (users can only delete their own record)
CREATE POLICY "Users can delete own record"
ON instantly_user
FOR DELETE
TO authenticated
USING (auth.uid() = id);