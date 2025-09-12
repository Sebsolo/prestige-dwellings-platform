import { supabase } from '@/integrations/supabase/client';
import { Property, PropertyWithMedia, Media } from '@/types/index';

// Temporary type-safe wrapper until database schema is set up
const db = supabase as any;

interface PropertyFilters {
  transaction?: 'sale' | 'rental';
  city?: string;
  type?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  rooms?: number;
  featured?: boolean;
  status?: string;
}

export const propertiesApi = {
  async list(filters: PropertyFilters = {}): Promise<PropertyWithMedia[]> {
    let query = db
      .from('properties')
      .select(`
        *,
        media (*)
      `);

    // Apply status filter based on context
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    } else if (filters.status !== 'all' && filters.transaction) {
      // For public listings, only show published properties
      query = query.in('status', ['published', 'under_offer']);
    }

    if (filters.transaction) {
      query = query.eq('transaction', filters.transaction);
    }

    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.priceMin) {
      if (filters.transaction === 'rental') {
        query = query.gte('rent_cc', filters.priceMin);
      } else {
        query = query.gte('price', filters.priceMin);
      }
    }

    if (filters.priceMax) {
      if (filters.transaction === 'rental') {
        query = query.lte('rent_cc', filters.priceMax);
      } else {
        query = query.lte('price', filters.priceMax);
      }
    }

    if (filters.areaMin) {
      query = query.gte('area_m2', filters.areaMin);
    }

    if (filters.rooms) {
      query = query.eq('rooms', filters.rooms);
    }

    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<PropertyWithMedia | null> {
    const { data, error } = await db
      .from('properties')
      .select(`
        *,
        media (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getBySlug(slug: string): Promise<PropertyWithMedia | null> {
    // For now, we'll use ID as slug, but this could be extended
    return this.getById(slug);
  },

  async create(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>): Promise<Property> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await db
      .from('properties')
      .insert({
        ...property,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Property>): Promise<Property> {
    const { data, error } = await db
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await db
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImages(propertyId: string, files: File[]): Promise<Media[]> {
    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${index}.${fileExt}`;
      const filePath = `${propertyId}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      // Save media record
      const { data: mediaData, error: mediaError } = await db
        .from('media')
        .insert({
          property_id: propertyId,
          path: publicUrl,
          type: 'image',
          order_index: index,
        })
        .select()
        .single();

      if (mediaError) throw mediaError;
      return mediaData;
    });

    return Promise.all(uploadPromises);
  },

  async deleteMedia(mediaId: string): Promise<void> {
    // Get media info first to delete from storage
    const { data: media, error: fetchError } = await db
      .from('media')
      .select('path')
      .eq('id', mediaId)
      .single();

    if (fetchError) throw fetchError;
    if (!media) throw new Error('Media not found');

    // Extract file path from URL
    const urlParts = media.path.split('/');
    const filePath = urlParts.slice(-2).join('/'); // Get last two parts (propertyId/filename)

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('property-images')
      .remove([filePath]);

    if (storageError) throw storageError;

    // Delete media record
    const { error: deleteError } = await db
      .from('media')
      .delete()
      .eq('id', mediaId);

    if (deleteError) throw deleteError;
  },

  async getSimilar(propertyId: string, limit: number = 6): Promise<PropertyWithMedia[]> {
    // Get the current property first
    const currentProperty = await this.getById(propertyId);
    if (!currentProperty) return [];

    // Find similar properties based on type, transaction, and city
    const { data, error } = await db
      .from('properties')
      .select(`
        *,
        media (*)
      `)
      .eq('transaction', currentProperty.transaction)
      .eq('type', currentProperty.type)
      .eq('city', currentProperty.city)
      .eq('status', 'available')
      .neq('id', propertyId)
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};