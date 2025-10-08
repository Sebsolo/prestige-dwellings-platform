-- Add SEO meta fields to posts table
ALTER TABLE public.posts
ADD COLUMN meta_title_fr TEXT,
ADD COLUMN meta_title_en TEXT,
ADD COLUMN meta_description_fr TEXT,
ADD COLUMN meta_description_en TEXT;