-- Create the update_updated_at_column function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create site_settings table for dynamic configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'Sebastien Pons Immobilier',
  site_description TEXT DEFAULT 'Agence immobilière spécialisée en France et International',
  booking_url TEXT,
  google_place_id TEXT,
  google_business_url TEXT DEFAULT 'https://share.google/LOxi7WwOzlRaYUVJj',
  meta_title TEXT DEFAULT 'Sebastien Pons Immobilier - France & International',
  meta_description TEXT DEFAULT 'Découvrez notre sélection de biens immobiliers en France et à l''international avec Sebastien Pons Immobilier.',
  meta_keywords TEXT DEFAULT 'immobilier, vente, location, france, international, sebastien pons',
  primary_color TEXT DEFAULT '#007bff',
  secondary_color TEXT DEFAULT '#6c757d',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for site_settings
CREATE POLICY "Site settings are viewable by everyone" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can update site settings" 
ON public.site_settings 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Only admins can insert site settings" 
ON public.site_settings 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Insert default settings if none exist
INSERT INTO public.site_settings (
  site_name,
  booking_url,
  google_business_url
) 
SELECT 
  'Sebastien Pons Immobilier',
  '',
  'https://share.google/LOxi7WwOzlRaYUVJj'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();