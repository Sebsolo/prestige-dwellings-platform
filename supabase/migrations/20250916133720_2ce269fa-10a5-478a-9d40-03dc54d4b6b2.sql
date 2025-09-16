-- Create blog-covers storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-covers', 'blog-covers', true);

-- Create RLS policies for blog cover uploads
CREATE POLICY "Blog covers are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-covers');

CREATE POLICY "Admins can upload blog covers" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-covers' AND public.is_admin());

CREATE POLICY "Admins can update blog covers" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog-covers' AND public.is_admin());

CREATE POLICY "Admins can delete blog covers" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'blog-covers' AND public.is_admin());