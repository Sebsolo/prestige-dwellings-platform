-- Allow 'garage' as a valid property type
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_type_check;

ALTER TABLE properties 
ADD CONSTRAINT properties_type_check 
CHECK (type IN ('apartment', 'house', 'commercial', 'land', 'garage', 'other'));