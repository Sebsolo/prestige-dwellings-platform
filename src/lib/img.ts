// Utilitaire: construit une URL publique Supabase avec transform (taille/qualité/format)
import { supabase } from '@/integrations/supabase/client';

type ImgOpts = { 
  w?: number; 
  h?: number; 
  q?: number; 
  format?: 'avif' | 'webp' | 'png' | 'jpg' 
}

export function sbImg(bucket: string, key: string, opts: ImgOpts = {}) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(key, {
    transform: {
      width: opts.w,
      height: opts.h,
      quality: opts.q ?? 70,
      format: opts.format as any ?? 'avif'
    }
  });
  return data.publicUrl;
}