-- Create a SECURITY DEFINER helper to avoid RLS recursion when checking team roles
CREATE OR REPLACE FUNCTION public.is_team_member()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role = ANY (ARRAY['admin','editor','agent'])
  );
$$;

-- Strengthen INSERT policy to both verify role and bind created_by to the current user
DROP POLICY IF EXISTS "agents insert" ON public.properties;
CREATE POLICY "agents insert"
ON public.properties
FOR INSERT
WITH CHECK (
  public.is_team_member()
  AND created_by = auth.uid()
);
