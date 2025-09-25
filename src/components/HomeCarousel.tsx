import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import IKResponsiveImage from "@/components/IKResponsiveImage";

interface CarouselImage {
  id: number;
  title: string;
  alt_text: string | null;
  image_path: string;
  sort_order: number;
}

const SLIDE_INTERVAL_MS = 5000;
const SLOT_W = 1400;
const ASPECT = 1400 / 700;

export default function HomeCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // “Hydrated” = après le 1er paint : on évite de rendre plus d’une image avant l’hydratation
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // Fetch images (actives, triées)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("home_carousel_images")
          .select("id,title,alt_text,image_path,sort_order")
          .eq("active", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        if (!cancelled) setImages(data ?? []);
      } catch (e) {
        console.error("Error fetching carousel images:", e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-rotation (si >1 image)
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  // Encapsule la construction d’URL Supabase (publique) → ImageKit (proxy) sera utilisé par IKResponsiveImage
  const getImageUrl = (path: string) => {
    const { data } = supabase.storage.from("home-carousel").getPublicUrl(path);
    return data.publicUrl;
  };

  // Calcule courante / suivante (toujours au plus 2 images dans le DOM)
  const current = images[currentIndex];
  const next = images.length > 1 ? images[(currentIndex + 1) % images.length] : undefined;

  // Précharge “silencieusement” la prochaine image (hors DOM)
  useEffect(() => {
    if (!next) return;
    const url = getImageUrl(next.image_path);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }, [next]);

  const goNext = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  const goPrev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  if (isLoading || images.length === 0) {
    return <div className="absolute inset-0 bg-gradient-subtle opacity-50" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* SLIDE COURANTE — unique LCP au premier paint */}
      <div className="absolute inset-0">
        <IKResponsiveImage
          src={getImageUrl(current.image_path)}
          slotWidth={SLOT_W}
          aspect={ASPECT}
          alt={current.alt_text || current.title}
          className="w-full h-full object-cover transition-opacity duration-700"
          // LCP uniquement au T0 (avant hydration) et pour l’index 0
          priority={!hydrated && currentIndex === 0}
        />
      </div>

      {/* SLIDE SUIVANTE (optionnel pour crossfade) — jamais candidate LCP */}
      {hydrated && next && (
        <div
          key={next.id}
          // on la garde invisible ; si tu veux un vrai crossfade, anime l’opacité quand currentIndex change
          className="absolute inset-0 opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <IKResponsiveImage
            src={getImageUrl(next.image_path)}
            slotWidth={SLOT_W}
            aspect={ASPECT}
            alt=""
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Contrôles */}
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
            onClick={goPrev}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
            onClick={goNext}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Aller à l'image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
