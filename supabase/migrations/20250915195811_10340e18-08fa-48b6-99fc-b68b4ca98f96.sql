-- Fix the leads source check constraint to include the correct values
ALTER TABLE public.leads 
DROP CONSTRAINT IF EXISTS leads_source_check;

-- Add the updated constraint with the correct source values
ALTER TABLE public.leads 
ADD CONSTRAINT leads_source_check 
CHECK (source = ANY (ARRAY['estimate'::text, 'contact'::text, 'visit'::text, 'visit_request'::text, 'recruitment'::text, 'newsletter'::text]));