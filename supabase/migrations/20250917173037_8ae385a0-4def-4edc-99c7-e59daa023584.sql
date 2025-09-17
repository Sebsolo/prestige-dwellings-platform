-- Create table for homepage carousel images
CREATE TABLE public.home_carousel_images (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  alt_text text,
  image_path text NOT NULL,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.home_carousel_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read carousel images" 
ON public.home_carousel_images 
FOR SELECT 
USING (active = true);

CREATE POLICY "Team manage carousel images" 
ON public.home_carousel_images 
FOR ALL 
USING (is_team_member());

-- Create trigger for updated_at
CREATE TRIGGER update_home_carousel_images_updated_at
BEFORE UPDATE ON public.home_carousel_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for carousel images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('home-carousel', 'home-carousel', true);

-- Storage policies
CREATE POLICY "Public read carousel bucket" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'home-carousel');

CREATE POLICY "Team upload carousel images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'home-carousel' AND is_team_member());

CREATE POLICY "Team update carousel images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'home-carousel' AND is_team_member());

CREATE POLICY "Team delete carousel images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'home-carousel' AND is_team_member());