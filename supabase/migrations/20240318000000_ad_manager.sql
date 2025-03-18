-- Create enum for ad platforms
CREATE TYPE ad_platform AS ENUM ('meta', 'google');

-- Create enum for suggestion types
CREATE TYPE suggestion_type AS ENUM ('targeting', 'creative', 'budget', 'general');

-- Create enum for suggestion priorities
CREATE TYPE suggestion_priority AS ENUM ('high', 'medium', 'low');

-- Table for connected ad accounts
CREATE TABLE connected_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform ad_platform NOT NULL,
  account_data JSONB NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, platform)
);

-- Table for business profiles
CREATE TABLE business_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  industry TEXT,
  target_audience TEXT,
  goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for media assets
CREATE TABLE media_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_profile_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for ad campaigns
CREATE TABLE ad_campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform ad_platform NOT NULL,
  account_id TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  budget DECIMAL(10,2),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  targeting JSONB,
  metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for AI suggestions
CREATE TABLE ai_suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES ad_campaigns(id) ON DELETE CASCADE,
  type suggestion_type NOT NULL,
  suggestion TEXT NOT NULL,
  reasoning TEXT,
  confidence DECIMAL(4,3) CHECK (confidence >= 0 AND confidence <= 1),
  priority suggestion_priority NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own connected accounts"
  ON connected_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own connected accounts"
  ON connected_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own connected accounts"
  ON connected_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own connected accounts"
  ON connected_accounts FOR DELETE
  USING (auth.uid() = user_id);

-- Repeat similar policies for other tables
CREATE POLICY "Users can view their own business profiles"
  ON business_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own business profiles"
  ON business_profiles FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own media assets"
  ON media_assets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own media assets"
  ON media_assets FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own campaigns"
  ON ad_campaigns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own campaigns"
  ON ad_campaigns FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own suggestions"
  ON ai_suggestions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own suggestions"
  ON ai_suggestions FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_connected_accounts_user_id ON connected_accounts(user_id);
CREATE INDEX idx_business_profiles_user_id ON business_profiles(user_id);
CREATE INDEX idx_media_assets_user_id ON media_assets(user_id);
CREATE INDEX idx_media_assets_business_profile_id ON media_assets(business_profile_id);
CREATE INDEX idx_ad_campaigns_user_id ON ad_campaigns(user_id);
CREATE INDEX idx_ai_suggestions_user_id ON ai_suggestions(user_id);
CREATE INDEX idx_ai_suggestions_campaign_id ON ai_suggestions(campaign_id); 