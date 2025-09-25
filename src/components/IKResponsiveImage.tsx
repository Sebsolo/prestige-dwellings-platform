import React from 'react';

type Props = {
  src?: string;           // Absolute URL (e.g., Supabase public URL)
  path?: string;          // ImageKit path relative to configured origin
  slotWidth: number;      // largeur max du conteneur (px)
  aspect?: number;        // ratio W/H (ex: 380/285)
  alt?: string;
  className?: string;
  priority?: boolean;     // true pour LCP/hero
};

export default function IKResponsiveImage({
  src, path, slotWidth, aspect = 1.33, alt = '', className = '', priority = false
}: Props) {
  const sizes = [Math.min(480, slotWidth), Math.min(768, Math.round(slotWidth * 1.5)), Math.min(1200, slotWidth * 2)];
  const height = (w: number) => Math.round(w / aspect);
  
  // For now, let's fall back to a regular img element with the ImageKit URL manually constructed
  const imageUrl = path 
    ? `https://ik.imagekit.io/hqhxxhjdvy${path}?tr=w-${slotWidth},h-${height(slotWidth)},q-70,f-avif`
    : src
    ? `https://ik.imagekit.io/hqhxxhjdvy/${encodeURIComponent(src)}?tr=w-${slotWidth},h-${height(slotWidth)},q-70,f-avif`
    : '';

  console.log('IKResponsiveImage URL:', imageUrl);

  if (!imageUrl) {
    console.warn('IKResponsiveImage: missing src or path');
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Image unavailable</span>
      </div>
    );
  }
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      width={slotWidth}
      height={height(slotWidth)}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      style={{ objectFit: 'cover' }}
    />
  );
}