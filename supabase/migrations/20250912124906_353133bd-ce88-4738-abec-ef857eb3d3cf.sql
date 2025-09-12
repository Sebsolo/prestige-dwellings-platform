-- Add a policy to allow agents to read their own properties and drafts
CREATE POLICY "agents read own and drafts" 
ON public.properties 
FOR SELECT 
USING (
  (created_by = auth.uid()) OR 
  (EXISTS (
    SELECT 1 FROM profiles p 
    WHERE p.id = auth.uid() AND p.role = ANY (ARRAY['admin'::text, 'editor'::text])
  ))
);