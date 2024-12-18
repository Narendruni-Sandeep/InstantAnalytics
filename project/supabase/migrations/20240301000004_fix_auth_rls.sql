-- Drop existing policies
DROP POLICY IF EXISTS "Allow insert during signup" ON instantly_user;
DROP POLICY IF EXISTS "Enable read access for users to their own record" ON instantly_user;
DROP POLICY IF EXISTS "Enable update for users to their own record" ON instantly_user;

-- Create new RLS policies
CREATE POLICY "Enable insert for authentication" ON public.instantly_user
FOR INSERT WITH CHECK (
  auth.uid() = id
);

CREATE POLICY "Enable select for individual users" ON public.instantly_user
FOR SELECT USING (
  auth.uid() = id
);

CREATE POLICY "Enable update for individual users" ON public.instantly_user
FOR UPDATE USING (
  auth.uid() = id
);

-- Grant necessary permissions
GRANT ALL ON public.instantly_user TO authenticated;
GRANT ALL ON public.instantly_user TO service_role;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.instantly_user (id, email, first_name, last_name, verified, "Plan", credit, total_client)
  VALUES (
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

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();