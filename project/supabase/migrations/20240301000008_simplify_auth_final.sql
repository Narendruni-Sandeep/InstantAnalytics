-- Disable RLS temporarily
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop existing policies and triggers
DROP POLICY IF EXISTS "Enable all operations for users on their own records" ON public.instantly_user;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a simplified user creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_user RECORD;
BEGIN
  -- Check if user already exists
  SELECT * INTO new_user FROM public.instantly_user WHERE id = NEW.id;
  
  IF new_user.id IS NULL THEN
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
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a single, simple policy for all operations
CREATE POLICY "Enable access for users"
ON public.instantly_user
USING (
  -- Users can access their own records
  auth.uid() = id
  -- Service role can access all records
  OR auth.role() = 'service_role'
);

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;