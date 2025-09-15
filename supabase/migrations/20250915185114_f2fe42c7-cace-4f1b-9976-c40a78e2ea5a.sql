-- Add APQL thresholds and bonus settings to revshare_settings table
ALTER TABLE public.revshare_settings 
ADD COLUMN apql_thresholds jsonb NOT NULL DEFAULT '{"l4": 5, "l5": 10, "l6": 15, "l7": 30}'::jsonb,
ADD COLUMN bonus_settings jsonb NOT NULL DEFAULT '{"enabled": true, "defaultValue": 0}'::jsonb;