-- Create subscription status enum
CREATE TYPE subscription_status AS ENUM (
  'trial',
  'active',
  'past_due',
  'cancelled',
  'expired'
);

-- Create payment provider enum
CREATE TYPE payment_provider AS ENUM (
  'stripe',
  'razorpay'
);

-- Add subscription fields to instantly_user table
ALTER TABLE instantly_user 
  ADD COLUMN IF NOT EXISTS subscription_status subscription_status DEFAULT 'trial',
  ADD COLUMN IF NOT EXISTS subscription_id text,
  ADD COLUMN IF NOT EXISTS subscription_provider payment_provider,
  ADD COLUMN IF NOT EXISTS provider_customer_id text,
  ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz,
  ADD COLUMN IF NOT EXISTS current_period_start timestamptz,
  ADD COLUMN IF NOT EXISTS current_period_end timestamptz,
  ADD COLUMN IF NOT EXISTS is_vip boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS vip_reason text,
  ADD COLUMN IF NOT EXISTS billing_email text,
  ADD COLUMN IF NOT EXISTS billing_name text,
  ADD COLUMN IF NOT EXISTS billing_address jsonb,
  ADD COLUMN IF NOT EXISTS subscription_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancel_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancelled_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_provider payment_provider;

-- Create subscription history table
CREATE TABLE IF NOT EXISTS instantly_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES instantly_user(id),
  status text NOT NULL,
  provider text,
  subscription_id text,
  amount numeric,
  currency text DEFAULT 'USD',
  period_start timestamptz,
  period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

-- Add constraints
ALTER TABLE instantly_user
  ADD CONSTRAINT valid_subscription_status 
  CHECK (subscription_status IN ('trial', 'active', 'past_due', 'cancelled', 'expired'));

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_subscription_status 
  ON instantly_user(subscription_status);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id 
  ON instantly_subscriptions(user_id);