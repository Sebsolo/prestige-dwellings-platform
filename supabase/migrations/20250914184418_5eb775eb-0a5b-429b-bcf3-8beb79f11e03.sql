-- Add featured column to properties table
ALTER TABLE public.properties 
ADD COLUMN featured boolean NOT NULL DEFAULT false;

-- Create index for better performance when filtering featured properties
CREATE INDEX idx_properties_featured ON public.properties(featured) WHERE featured = true;