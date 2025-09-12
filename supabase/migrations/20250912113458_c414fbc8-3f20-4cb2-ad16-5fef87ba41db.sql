-- Fix infinite recursion in profiles RLS and enforce a single designated admin
-- 1) Helper functions to safely check current user role without recursive policies
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (public.get_current_user_role() = 'admin');
$$;

-- 2) Replace recursive policy on profiles with function-based policy
DROP POLICY IF EXISTS "admin profiles full" ON public.profiles;
CREATE POLICY "admin profiles full"
ON public.profiles
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 3) Enforce that there is at most one admin overall
DO $$
BEGIN
  -- If more than one admin currently exists, demote all to agent first
  IF (SELECT count(*) FROM public.profiles WHERE role = 'admin') > 1 THEN
    UPDATE public.profiles SET role = 'agent' WHERE role = 'admin';
  END IF;
END $$;

-- 4) Promote the designated owner to admin (by email), and ensure only they can ever be admin
DO $$
DECLARE
  owner_id uuid;
BEGIN
  SELECT id INTO owner_id FROM auth.users WHERE email = 'pons.sebastien@gmail.com' LIMIT 1;
  IF owner_id IS NOT NULL THEN
    -- Demote any other existing admins (if any)
    UPDATE public.profiles SET role = 'agent' WHERE role = 'admin' AND id <> owner_id;
    -- Promote the owner to admin
    UPDATE public.profiles SET role = 'admin' WHERE id = owner_id;
  END IF;
END $$;

-- 5) Unique partial index to enforce a single admin row
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'one_admin_only'
  ) THEN
    CREATE UNIQUE INDEX one_admin_only ON public.profiles ((role)) WHERE role = 'admin';
  END IF;
END $$;

-- 6) Trigger to ensure only the designated owner can ever have role='admin'
CREATE OR REPLACE FUNCTION public.enforce_single_named_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  owner_id uuid;
BEGIN
  SELECT id INTO owner_id FROM auth.users WHERE email = 'pons.sebastien@gmail.com' LIMIT 1;
  IF NEW.role = 'admin' THEN
    IF owner_id IS NULL OR NEW.id <> owner_id THEN
      RAISE EXCEPTION 'Only the designated admin account may have role=admin';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_single_named_admin ON public.profiles;
CREATE TRIGGER trg_enforce_single_named_admin
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.enforce_single_named_admin();