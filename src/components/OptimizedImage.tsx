import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  objectFit = 'cover'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate srcSet with different sizes
  const generateSrcSet = (baseSrc: string) => {
    const ext = baseSrc.split('.').pop()?.toLowerCase();
    const baseUrl = baseSrc.replace(/\.[^/.]+$/, '');
    
    // For external URLs or if no width specified, return original
    if (baseSrc.startsWith('http') || !width) {
      return undefined;
    }

    const sizes = [480, 768, 1024, 1280, 1920];
    return sizes
      .filter(size => size <= (width || 1920))
      .map(size => `${baseUrl}-${size}w.${ext} ${size}w`)
      .join(', ');
  };

  // Try WebP format first if supported
  const getWebPSrc = (src: string) => {
    if (src.startsWith('http')) return src;
    const ext = src.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      return src.replace(/\.[^/.]+$/, '.webp');
    }
    return src;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-muted flex items-center justify-center text-muted-foreground',
          className
        )}
        style={{ width, height }}
      >
        Image non disponible
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ width, height }}
        />
      )}
      
      <picture>
        {/* WebP version if available */}
        <source 
          srcSet={generateSrcSet(getWebPSrc(src))}
          sizes={sizes}
          type="image/webp"
        />
        
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down',
            'w-full h-full'
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;