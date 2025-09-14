-- Add new columns to site_settings for eXp page configuration
ALTER TABLE public.site_settings 
ADD COLUMN appointment_url text DEFAULT '/rendez-vous',
ADD COLUMN canva_share_url text DEFAULT 'https://www.canva.com/design/DAGeyLDzKMU/ejBonHFtrwLk9wCZA3ThTA/view?utm_content=DAGeyLDzKMU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h91a9dd08af',
ADD COLUMN legal_footer text DEFAULT 'EI eu RSAC 912212073 Versailles — Ne pas jeter sur la voie publique';