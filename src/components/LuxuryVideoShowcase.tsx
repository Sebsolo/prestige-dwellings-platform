import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { ShowcaseItemWithUrls, LuxuryVideoShowcaseProps } from '@/types/showcase';

export const LuxuryVideoShowcase: React.FC<LuxuryVideoShowcaseProps> = ({
  groupSlug = 'default',
  autoAdvanceInterval = 6000,
  autoplay = true,
  showProgressBars = true,
  useSignedUrls = true,
  className = '',
}) => {
  const [items, setItems] = useState<ShowcaseItemWithUrls[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const startTimeRef = useRef<number>(0);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fetchShowcaseItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('getShowcaseItems', {
        body: JSON.stringify({ group_slug: groupSlug }),
      });

      if (error) throw error;

      setItems(data || []);
    } catch (err) {
      console.error('Error fetching showcase items:', err);
      setError('Failed to load showcase items');
    } finally {
      setLoading(false);
    }
  }, [groupSlug]);

  useEffect(() => {
    fetchShowcaseItems();
  }, [fetchShowcaseItems]);

  const updateProgress = useCallback(() => {
    if (!isPlaying || prefersReducedMotion) return;
    
    const elapsed = Date.now() - startTimeRef.current;
    const newProgress = (elapsed / autoAdvanceInterval) * 100;
    
    if (newProgress >= 100) {
      goToNext();
    } else {
      setProgress(newProgress);
    }
  }, [isPlaying, autoAdvanceInterval, prefersReducedMotion]);

  const startAutoAdvance = useCallback(() => {
    if (prefersReducedMotion || !autoplay) return;
    
    startTimeRef.current = Date.now();
    setProgress(0);
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    progressIntervalRef.current = setInterval(updateProgress, 50);
  }, [updateProgress, prefersReducedMotion, autoplay]);

  const stopAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    if (isPlaying) startAutoAdvance();
  }, [items.length, isPlaying, startAutoAdvance]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    if (isPlaying) startAutoAdvance();
  }, [items.length, isPlaying, startAutoAdvance]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      startAutoAdvance();
    } else {
      stopAutoAdvance();
    }
  }, [isPlaying, startAutoAdvance, stopAutoAdvance]);

  const handleVideoHover = useCallback((index: number, isHovering: boolean) => {
    if (prefersReducedMotion) return;
    
    const video = videoRefs.current[index];
    if (!video) return;

    if (isHovering) {
      setHoveredIndex(index);
      // Pause other videos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
        }
      });
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    } else {
      setHoveredIndex(null);
      video.pause();
    }
  }, [prefersReducedMotion]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    } else if (event.key === ' ') {
      event.preventDefault();
      togglePlayPause();
    }
  }, [goToPrevious, goToNext, togglePlayPause]);

  useEffect(() => {
    if (items.length > 0 && isPlaying && !prefersReducedMotion) {
      startAutoAdvance();
    }
    return stopAutoAdvance;
  }, [items.length, isPlaying, startAutoAdvance, stopAutoAdvance, prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading luxury properties...</div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-muted-foreground">
          {error || 'No properties available in this showcase.'}
        </div>
      </div>
    );
  }

  const visibleItems = items.slice(currentIndex, currentIndex + 4).concat(
    items.slice(0, Math.max(0, 4 - (items.length - currentIndex)))
  );

  return (
    <section className={`relative w-full ${className}`} role="region" aria-label="Luxury Property Showcase">
      {/* Main Carousel */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleItems.map((item, index) => {
            const actualIndex = (currentIndex + index) % items.length;
            return (
              <div
                key={item.id}
                className="group relative bg-card rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                onMouseEnter={() => handleVideoHover(actualIndex, true)}
                onMouseLeave={() => handleVideoHover(actualIndex, false)}
              >
                {/* Media Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* Poster Image */}
                  <img
                    src={item.poster_url || '/placeholder.svg'}
                    alt={`Luxury property in ${item.location_label}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Video Overlay */}
                  {(item.video_mp4_url || item.video_webm_url) && (
                    <video
                      ref={(el) => { videoRefs.current[actualIndex] = el; }}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`Video tour of ${item.location_label}`}
                    >
                      {item.video_mp4_url && <source src={item.video_mp4_url} type="video/mp4" />}
                      {item.video_webm_url && <source src={item.video_webm_url} type="video/webm" />}
                    </video>
                  )}

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <a
                      href={item.detail_url}
                      className="group/link flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                      aria-label={`View details for ${item.location_label}`}
                    >
                      <MapPin className="w-4 h-4" />
                      {item.location_label}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                    <div className="text-lg font-bold mt-1">
                      {item.price_label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          aria-label="Previous property"
          className="rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {!prefersReducedMotion && (
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="rounded-full"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          aria-label="Next property"
          className="rounded-full"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress Bars */}
      {showProgressBars && !prefersReducedMotion && (
        <div className="flex gap-2 mt-4 justify-center">
          {items.map((_, index) => (
            <div
              key={index}
              className="h-1 bg-muted rounded-full flex-1 max-w-16 overflow-hidden"
            >
              <div
                className="h-full bg-primary transition-transform duration-75 ease-linear origin-left"
                style={{
                  transform: `scaleX(${index === currentIndex ? progress / 100 : index < currentIndex ? 1 : 0})`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Live Region for Screen Readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Showing property {currentIndex + 1} of {items.length}: {items[currentIndex]?.location_label}
      </div>
    </section>
  );
};