-- First, disable RLS temporarily to clean up any existing data issues
ALTER TABLE instantly_user DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Enable insert for authentication" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable select for individual users" ON public.instantly_user;
DROP POLICY IF EXISTS "Enable update for individual users" ON public.instantly_user;
DROP POLICY IF EXISTS "Allow insert during signup" ON public.instantly_user;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a simplified user creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER SECURITY DEFINER
LANGUAGE plpgsql
AS $$
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
$$;

-- Re-create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Re-enable RLS
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "Enable full access for authenticated users to own records"
ON public.instantly_user
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;