import React from 'react';
import { sbImg } from '@/lib/img';

type Props = {
  bucket: string;
  imagePath: string;
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
  imagePath, 
  slotWidth, 
  alt = '', 
  className, 
  aspect = 1.33,
  fetchPriority = 'auto',
  loading = 'lazy'
}: Props) {
  // Add validation for required props
  if (!imagePath || !bucket) {
    console.warn('ResponsiveImage: missing required props', { imagePath, bucket });
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Image unavailable</span>
      </div>
    );
  }

  // Use direct public URL without transformations for now (transforms not enabled)
  const imageUrl = sbImg(bucket, imagePath);

  // If image URL failed to generate, fall back to error state
  if (!imageUrl) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      width={slotWidth}
      height={Math.round(slotWidth / aspect)}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={className}
    />
  );
}