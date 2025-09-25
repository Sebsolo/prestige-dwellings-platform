import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sbImg } from '@/lib/img';
import IKResponsiveImage from '@/components/IKResponsiveImage';

interface CarouselImage {
  id: number;
  title: string;
  alt_text: string | null;
  image_path: string;
  sort_order: number;
}

const HomeCarousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('home_carousel_images')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        console.log('Fetched carousel images:', data);
        setImages(data || []);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const getImageUrl = (path: string) => {
    // Generate direct Supabase public URL for ImageKit to proxy
    const { data } = supabase.storage.from('home-carousel').getPublicUrl(path);
    console.log('Generated Supabase URL for ImageKit:', data.publicUrl, 'for path:', path);
    return data.publicUrl;
  };

  if (isLoading || images.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-50' : 'opacity-0'
          }`}
        >
          <IKResponsiveImage
            src={getImageUrl(image.image_path)}
            slotWidth={1400}
            aspect={1400/700}
            alt={image.alt_text || image.title}
            className="w-full h-full object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
            onClick={prevSlide}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
            onClick={nextSlide}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeCarousel;