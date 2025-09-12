-- Add YouTube video URL field to properties table
ALTER TABLE public.properties 
ADD COLUMN youtube_url TEXT;