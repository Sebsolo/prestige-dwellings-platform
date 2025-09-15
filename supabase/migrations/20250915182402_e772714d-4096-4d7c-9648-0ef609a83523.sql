-- Create revshare_settings table
CREATE TABLE public.revshare_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  percents JSONB NOT NULL DEFAULT '{
    "l1y1": 5.0,
    "l1y2": 3.5,
    "l2": 4.0,
    "l3": 2.5,
    "l4": 1.5,
    "l5": 1.0,
    "l6": 2.5,
    "l7": 5.0
  }'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.revshare_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "revshare_settings are viewable by everyone" 
ON public.revshare_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can update revshare settings" 
ON public.revshare_settings 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Only admins can insert revshare settings" 
ON public.revshare_settings 
FOR INSERT 
WITH CHECK (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_revshare_settings_updated_at
BEFORE UPDATE ON public.revshare_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default row with default percentages
INSERT INTO public.revshare_settings (percents) 
VALUES ('{
  "l1y1": 5.0,
  "l1y2": 3.5,
  "l2": 4.0,
  "l3": 2.5,
  "l4": 1.5,
  "l5": 1.0,
  "l6": 2.5,
  "l7": 5.0
}'::jsonb);