/*
  # Banking Application Database Schema

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `accounts` - Bank accounts
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `account_type` (text: checking, savings, investment, credit)
      - `account_name` (text)
      - `account_number` (text, unique)
      - `balance` (decimal)
      - `credit_limit` (decimal, nullable)
      - `interest_rate` (decimal)
      - `status` (text: active, inactive, frozen)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `transactions` - Transaction history
      - `id` (uuid, primary key)
      - `account_id` (uuid, references accounts)
      - `transaction_type` (text: debit, credit, transfer)
      - `amount` (decimal)
      - `description` (text)
      - `reference_number` (text, unique)
      - `status` (text: pending, completed, failed)
      - `created_at` (timestamp)
    
    - `transfers` - Money transfers
      - `id` (uuid, primary key)
      - `from_account_id` (uuid, references accounts)
      - `to_account_id` (uuid, references accounts, nullable)
      - `transfer_type` (text: internal, external, wire)
      - `amount` (decimal)
      - `description` (text)
      - `recipient_name` (text, nullable)
      - `recipient_email` (text, nullable)
      - `status` (text: pending, completed, failed)
      - `created_at` (timestamp)
      - `completed_at` (timestamp, nullable)
    
    - `security_alerts` - Security monitoring
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `alert_type` (text: login, transaction, security)
      - `severity` (text: low, medium, high, critical)
      - `title` (text)
      - `description` (text)
      - `ip_address` (text, nullable)
      - `user_agent` (text, nullable)
      - `resolved` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for secure data operations

  3. Functions
    - Generate account numbers
    - Process transfers
    - Create security alerts
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  account_type text NOT NULL CHECK (account_type IN ('checking', 'savings', 'investment', 'credit')),
  account_name text NOT NULL,
  account_number text UNIQUE NOT NULL,
  balance decimal(15,2) DEFAULT 0.00,
  credit_limit decimal(15,2),
  interest_rate decimal(5,4) DEFAULT 0.0000,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'frozen')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('debit', 'credit', 'transfer')),
  amount decimal(15,2) NOT NULL,
  description text NOT NULL,
  reference_number text UNIQUE NOT NULL,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Create transfers table
CREATE TABLE IF NOT EXISTS transfers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  to_account_id uuid REFERENCES accounts(id) ON DELETE SET NULL,
  transfer_type text NOT NULL CHECK (transfer_type IN ('internal', 'external', 'wire')),
  amount decimal(15,2) NOT NULL,
  description text,
  recipient_name text,
  recipient_email text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Create security_alerts table
CREATE TABLE IF NOT EXISTS security_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  alert_type text NOT NULL CHECK (alert_type IN ('login', 'transaction', 'security', 'system')),
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title text NOT NULL,
  description text NOT NULL,
  ip_address text,
  user_agent text,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Accounts policies
CREATE POLICY "Users can read own accounts"
  ON accounts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own accounts"
  ON accounts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own accounts"
  ON accounts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Transactions policies
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (
    account_id IN (
      SELECT id FROM accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    account_id IN (
      SELECT id FROM accounts WHERE user_id = auth.uid()
    )
  );

-- Transfers policies
CREATE POLICY "Users can read own transfers"
  ON transfers
  FOR SELECT
  TO authenticated
  USING (
    from_account_id IN (
      SELECT id FROM accounts WHERE user_id = auth.uid()
    )
    OR
    to_account_id IN (
      SELECT id FROM accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own transfers"
  ON transfers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    from_account_id IN (
      SELECT id FROM accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own transfers"
  ON transfers
  FOR UPDATE
  TO authenticated
  USING (
    from_account_id IN (
      SELECT id FROM accounts WHERE user_id = auth.uid()
    )
  );

-- Security alerts policies
CREATE POLICY "Users can read own security alerts"
  ON security_alerts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own security alerts"
  ON security_alerts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Function to generate account numbers
CREATE OR REPLACE FUNCTION generate_account_number()
RETURNS text AS $$
DECLARE
  account_num text;
  exists_check boolean;
BEGIN
  LOOP
    -- Generate a random 10-digit account number
    account_num := LPAD(FLOOR(RANDOM() * 10000000000)::text, 10, '0');
    
    -- Check if it already exists
    SELECT EXISTS(SELECT 1 FROM accounts WHERE account_number = account_num) INTO exists_check;
    
    -- If it doesn't exist, we can use it
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN account_num;
END;
$$ LANGUAGE plpgsql;

-- Function to generate reference numbers for transactions
CREATE OR REPLACE FUNCTION generate_reference_number()
RETURNS text AS $$
DECLARE
  ref_num text;
  exists_check boolean;
BEGIN
  LOOP
    -- Generate a reference number with format: TXN-YYYYMMDD-XXXXXXXX
    ref_num := 'TXN-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::text) FROM 1 FOR 8));
    
    -- Check if it already exists
    SELECT EXISTS(SELECT 1 FROM transactions WHERE reference_number = ref_num) INTO exists_check;
    
    -- If it doesn't exist, we can use it
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN ref_num;
END;
$$ LANGUAGE plpgsql;

-- Function to create security alert
CREATE OR REPLACE FUNCTION create_security_alert(
  p_user_id uuid,
  p_alert_type text,
  p_severity text,
  p_title text,
  p_description text,
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  alert_id uuid;
BEGIN
  INSERT INTO security_alerts (
    user_id,
    alert_type,
    severity,
    title,
    description,
    ip_address,
    user_agent
  ) VALUES (
    p_user_id,
    p_alert_type,
    p_severity,
    p_title,
    p_description,
    p_ip_address,
    p_user_agent
  ) RETURNING id INTO alert_id;
  
  RETURN alert_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_account_number ON accounts(account_number);
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transfers_from_account ON transfers(from_account_id);
CREATE INDEX IF NOT EXISTS idx_transfers_to_account ON transfers(to_account_id);
CREATE INDEX IF NOT EXISTS idx_security_alerts_user_id ON security_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_security_alerts_created_at ON security_alerts(created_at DESC);