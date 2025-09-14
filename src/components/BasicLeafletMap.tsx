import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon paths for Leaflet markers (even if we don't use them now)
// This avoids runtime warnings when adding markers later.
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface BasicLeafletMapProps {
  lat: number;
  lng: number;
  title?: string;
  address?: string;
  city?: string;
  zoom?: number;
  radiusMeters?: number;
  className?: string;
}

const BasicLeafletMap = ({
  lat,
  lng,
  title,
  address,
  city,
  zoom = 14,
  radiusMeters = 500,
  className,
}: BasicLeafletMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const [primaryHsl, setPrimaryHsl] = useState<string>('222 47% 11%');

  // Read themed color from CSS variables
  useEffect(() => {
    try {
      const root = document.documentElement;
      const val = getComputedStyle(root).getPropertyValue('--primary').trim();
      if (val) setPrimaryHsl(val);
    } catch {}
  }, []);

  // Initialize the map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const circle = L.circle([lat, lng], {
      radius: radiusMeters,
      color: `hsl(${primaryHsl})`,
      fillColor: `hsl(${primaryHsl})`,
      fillOpacity: 0.2,
      weight: 2,
    }).addTo(map);
    circleRef.current = circle;

    const lines = [title, address, city].filter(Boolean) as string[];
    if (lines.length) {
      circle.bindPopup(lines.join(' • '));
    }

    return () => {
      map.remove();
      mapRef.current = null;
      circleRef.current = null;
    };
  }, [lat, lng, zoom, radiusMeters, primaryHsl, title, address, city]);

  // Update view and circle when coordinates change
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView([lat, lng], zoom);
    if (circleRef.current) {
      circleRef.current.setLatLng([lat, lng]);
      circleRef.current.setRadius(radiusMeters);
    }
  }, [lat, lng, zoom, radiusMeters]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: '16rem', width: '100%' }}
      aria-label="Carte de localisation du bien"
    />
  );
};

export default BasicLeafletMap;
