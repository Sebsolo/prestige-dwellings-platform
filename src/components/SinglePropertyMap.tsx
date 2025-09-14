import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SinglePropertyMapProps {
  address?: string;
  city?: string;
  title?: string;
  lat?: number;
  lng?: number;
}

const MapUpdater = ({ position }: { position: [number, number] | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 14, { animate: true });
    }
  }, [map, position]);

  return null;
};

const SinglePropertyMap = ({ address, city, title, lat, lng }: SinglePropertyMapProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        setLoading(true);
        
        // If we have stored coordinates, use them directly
        if (lat && lng) {
          setPosition([lat, lng]);
          setLoading(false);
          return;
        }
        
        // Otherwise, geocode the address
        if (address) {
          const fullAddress = city ? `${address}, ${city}` : address;
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`
          );
          
          if (!response.ok) {
            throw new Error('Geocoding failed');
          }
          
          const data = await response.json();
          
          if (data && data.length > 0) {
            const geocodedLat = parseFloat(data[0].lat);
            const geocodedLng = parseFloat(data[0].lon);
            setPosition([geocodedLat, geocodedLng]);
          } else {
            setError('Adresse non trouvée');
          }
        } else {
          setError('Aucune adresse ou coordonnées disponibles');
        }
      } catch (err) {
        console.error('Map initialization error:', err);
        setError('Erreur lors de la géolocalisation');
      } finally {
        setLoading(false);
      }
    };

    initializeMap();
  }, [address, city, lat, lng]);

  if (loading) {
    return (
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Chargement de la carte...</span>
      </div>
    );
  }

  if (error || !position) {
    return (
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">{error || 'Impossible de localiser l\'adresse'}</span>
      </div>
    );
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden border">
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater position={position} />
        
        <CircleMarker
          center={position}
          radius={30}
          pathOptions={{
            color: 'hsl(var(--primary))',
            fillColor: 'hsl(var(--primary))',
            fillOpacity: 0.2,
            weight: 2
          }}
        >
          <Popup>
            <div className="text-center">
              <p className="font-semibold">{title || 'Propriété'}</p>
              <p className="text-sm text-muted-foreground">{address}</p>
              {city && <p className="text-sm text-muted-foreground">{city}</p>}
            </div>
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default SinglePropertyMap;