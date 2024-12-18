-- Enable RLS on all tables
ALTER TABLE instantly_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE instantly_unique_email ENABLE ROW LEVEL SECURITY;
ALTER TABLE instantly_unique_campaign ENABLE ROW LEVEL SECURITY;
ALTER TABLE instantly_email ENABLE ROW LEVEL SECURITY;
ALTER TABLE instantly_client ENABLE ROW LEVEL SECURITY;
ALTER TABLE instantly_campaign_email ENABLE ROW LEVEL SECURITY;
ALTER TABLE instantly_campaign ENABLE ROW LEVEL SECURITY;

-- Policies for instantly_user table
CREATE POLICY "Users can view own record" ON instantly_user
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own record" ON instantly_user
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own record" ON instantly_user
  FOR UPDATE USING (auth.uid() = id);

-- Policies for other tables (based on user_id foreign key)
CREATE POLICY "Users can view own data" ON instantly_unique_email
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own data" ON instantly_unique_email
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Repeat similar policies for other tables
-- instantly_unique_campaign
CREATE POLICY "Users can access own campaigns" ON instantly_unique_campaign
  FOR ALL USING (user_id = auth.uid());

-- instantly_email
CREATE POLICY "Users can access own emails" ON instantly_email
  FOR ALL USING (user_id = auth.uid());

-- instantly_client
CREATE POLICY "Users can access own clients" ON instantly_client
  FOR ALL USING (user_id = auth.uid());

-- instantly_campaign_email
CREATE POLICY "Users can access own campaign emails" ON instantly_campaign_email
  FOR ALL USING (user_id = auth.uid());

-- instantly_campaign
CREATE POLICY "Users can access own campaign data" ON instantly_campaign
  FOR ALL USING (user_id = auth.uid());