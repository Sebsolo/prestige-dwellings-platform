import { Image } from '@imagekit/react';

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
  
  // On demande AVIF qualité 70; ajuste si besoin
  const common = (w: number) => [{ width: Math.round(w), height: height(w), quality: 70, format: 'avif' }] as const;
  
  const imgSourceProps = path ? { path } : src ? { src } : null;
  if (!imgSourceProps) {
    console.warn('IKResponsiveImage: missing src or path');
    return null;
  }
  
  return (
    <Image
      {...(imgSourceProps as any)}
      alt={alt}
      width={slotWidth}
      height={height(slotWidth)}
      loading={priority ? 'eager' : 'lazy'}
      // fetchpriority améliore le LCP quand priority=true
      fetchPriority={priority ? 'high' : ('low' as any)}
      decoding="async"
      transformation={common(sizes[1]) as any}
      // Le SDK génère automatiquement un srcset responsive
      sizes={`(max-width: 600px) 100vw, (max-width: 1024px) 70vw, ${slotWidth}px`}
      className={className}
    />
  );
}