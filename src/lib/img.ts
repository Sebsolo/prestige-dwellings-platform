// Utilitaire: construit une URL publique Supabase avec transform (taille/qualité/format)
import { supabase } from '@/integrations/supabase/client';

type ImgOpts = { 
  w?: number; 
  h?: number; 
  q?: number; 
  format?: 'avif' | 'webp' | 'png' | 'jpg' 
}

export function sbImg(bucket: string, key: string, opts: ImgOpts = {}) {
  if (!key) {
    console.warn('sbImg: key is undefined or empty');
    return '';
  }
  
  try {
    const hasTransform = opts.w != null || opts.h != null || opts.q != null || opts.format != null;

    const { data } = hasTransform
      ? supabase.storage.from(bucket).getPublicUrl(key, {
          transform: {
            width: opts.w,
            height: opts.h,
            quality: opts.q,
            format: opts.format as any,
          },
        })
      : supabase.storage.from(bucket).getPublicUrl(key);

    return data.publicUrl;
  } catch (error) {
    console.error('sbImg error:', error);
    return '';
  }
}