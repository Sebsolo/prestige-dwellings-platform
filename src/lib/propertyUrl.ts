import { Property, PropertyWithMedia } from '@/types';

// Generate a slug from city and property type
export const generatePropertySlug = (property: Property | PropertyWithMedia): string => {
  const city = property.city?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'ville';
  const type = property.type === 'apartment' ? 'appartement' : 
               property.type === 'house' ? 'maison' : 
               property.type === 'commercial' ? 'commercial' : 
               property.type === 'land' ? 'terrain' : 'bien';
  const id = property.id;
  
  return `${type}-${city}-${id}`;
};

// Generate the full URL path for a property
export const getPropertyUrl = (property: Property | PropertyWithMedia): string => {
  const transactionPath = property.transaction === 'sale' ? 'vente' : 'location';
  const slug = generatePropertySlug(property);
  
  return `/${transactionPath}/${slug}`;
};

// Parse property ID from URL slug
export const parsePropertyIdFromSlug = (slug: string): string | null => {
  // Extract the numeric ID from the end of the slug
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
};
