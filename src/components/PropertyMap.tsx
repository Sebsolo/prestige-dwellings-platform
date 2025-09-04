import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { PropertyWithMedia } from '@/types/index';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
  properties: PropertyWithMedia[];
  selectedProperty?: PropertyWithMedia | null;
  onPropertySelect?: (property: PropertyWithMedia) => void;
  center?: [number, number];
  zoom?: number;
}

const PropertyMap = ({ 
  properties, 
  selectedProperty, 
  onPropertySelect,
  center = [46.603354, 1.888334], // France center
  zoom = 6 
}: PropertyMapProps) => {
  const mapRef = useRef<L.Map>();

  const propertiesWithCoords = properties.filter(p => p.lat && p.lng);

  // Custom hook to update map when selectedProperty changes
  const MapUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      if (selectedProperty && selectedProperty.lat && selectedProperty.lng) {
        map.setView([selectedProperty.lat, selectedProperty.lng], 15, {
          animate: true,
        });
      }
    }, [map, selectedProperty]);

    return null;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (propertiesWithCoords.length === 0) {
    return (
      <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Aucune propriété avec coordonnées géographiques</p>
      </div>
    );
  }

  return (
    <div className="h-96 rounded-lg overflow-hidden border">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater />
        
        {propertiesWithCoords.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat!, property.lng!]}
            eventHandlers={{
              click: () => onPropertySelect?.(property),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                {property.media?.[0]?.path && (
                  <img
                    src={property.media[0].path}
                    alt={property.title_fr || ''}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h4 className="font-semibold mb-1">
                  {property.title_fr}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {property.city}
                </p>
                <p className="font-bold text-primary mb-2">
                  {property.price && formatPrice(property.price)}
                  {property.rent_cc && <span className="text-sm font-normal"> /mois</span>}
                </p>
                <Link
                  to={`/bien/${property.id}`}
                  className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90"
                >
                  Voir le détail
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;