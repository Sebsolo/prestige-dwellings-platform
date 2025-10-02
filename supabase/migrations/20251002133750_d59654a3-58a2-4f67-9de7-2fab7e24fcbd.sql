-- Add new property characteristics columns
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS bathrooms smallint,
ADD COLUMN IF NOT EXISTS toilets smallint,
ADD COLUMN IF NOT EXISTS floor_level text,
ADD COLUMN IF NOT EXISTS year_built integer,
ADD COLUMN IF NOT EXISTS interior_condition text,
ADD COLUMN IF NOT EXISTS heating text,
ADD COLUMN IF NOT EXISTS kitchen text,
ADD COLUMN IF NOT EXISTS furnishing text,
ADD COLUMN IF NOT EXISTS exposure text,
ADD COLUMN IF NOT EXISTS indoor_parking smallint,
ADD COLUMN IF NOT EXISTS cellar boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS pool boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS total_floors smallint,
ADD COLUMN IF NOT EXISTS monthly_charges numeric;