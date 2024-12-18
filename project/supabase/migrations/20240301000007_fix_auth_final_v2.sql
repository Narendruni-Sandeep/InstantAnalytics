-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for signup" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable read access for users" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable update for users" ON public.instantly_user;

-- Create a trigger function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.instantly_user (
    id,
    email,
    first_name,
    last_name,
    verified,
    "Plan",
    credit,
    total_client
  ) VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    false,
    'free',
    0,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create simplified policies
CREATE POLICY "Enable all operations for users on their own records"
ON public.instantly_user
USING (auth.uid() = id OR auth.role() = 'service_role')
WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;