export interface Property {
  id: string;
  ref?: string;
  title_fr: string;
  title_en?: string;
  description_fr: string;
  description_en?: string;
  price?: number;
  rent_cc?: number;
  area_m2?: number;
  land_m2?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  type: 'apartment' | 'house' | 'commercial' | 'land' | 'other';
  transaction: 'sale' | 'rent';
  city: string;
  address?: string;
  postal_code?: string;
  lat?: number;
  lng?: number;
  dpe_letter?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  dpe_value?: number;
  youtube_url?: string;
  year_built?: number;
  floor?: number;
  total_floors?: number;
  garage?: boolean;
  garden?: boolean;
  terrace?: boolean;
  elevator?: boolean;
  furnished?: boolean;
  status: 'draft' | 'published' | 'under_offer' | 'sold' | 'rented';
  featured: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  property_id: string;
  path: string;
  type: 'image' | 'video' | 'document';
  title?: string;
  description?: string;
  order_index: number;
  created_at: string;
}

export interface PropertyWithMedia extends Property {
  media?: Media[];
}

export interface Post {
  id: string;
  title_fr: string;
  title_en?: string;
  slug: string;
  excerpt_fr: string;
  excerpt_en?: string;
  content_fr: string;
  content_en?: string;
  featured_image?: string;
  status: 'draft' | 'published';
  published_at?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message?: string;
  source: 'contact' | 'valuation' | 'visit_request' | 'recruitment';
  property_id?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  role: 'admin' | 'agent' | 'user';
  created_at: string;
  updated_at: string;
}