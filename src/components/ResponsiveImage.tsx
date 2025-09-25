import React from 'react';
import { sbImg } from '@/lib/img';

type Props = {
  bucket: string;
  key: string;
  // largeur affichée max du slot (en px) pour le layout courant
  slotWidth: number;
  alt?: string;
  className?: string;
  // ratio pour calculer la hauteur cible
  aspect?: number; // ex: 380/285 ≈ 1.333 → aspect = 1.333
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
}

export default function ResponsiveImage({ 
  bucket, 
  key, 
  slotWidth, 
  alt = '', 
  className, 
  aspect = 1.33,
  fetchPriority = 'auto',
  loading = 'lazy'
}: Props) {
  const w1 = Math.min(480, slotWidth);
  const w2 = Math.min(768, Math.round(slotWidth * 1.5));
  const w3 = Math.min(1200, Math.round(slotWidth * 2));
  const h = (w: number) => Math.round(w / aspect);
  
  // Génère 3 variantes AVIF (qualité 70)
  const s1 = sbImg(bucket, key, { w: w1, h: h(w1), q: 70, format: 'avif' });
  const s2 = sbImg(bucket, key, { w: w2, h: h(w2), q: 70, format: 'avif' });
  const s3 = sbImg(bucket, key, { w: w3, h: h(w3), q: 70, format: 'avif' });

  return (
    <img
      src={s2}
      srcSet={`${s1} ${w1}w, ${s2} ${w2}w, ${s3} ${w3}w`}
      sizes={`(max-width: 600px) 100vw, (max-width: 1024px) 70vw, ${slotWidth}px`}
      width={slotWidth}
      height={h(slotWidth)}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={className}
    />
  );
}