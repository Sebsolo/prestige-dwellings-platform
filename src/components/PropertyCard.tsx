import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PropertyWithMedia } from '@/types/index';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Home, Bed, Square } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyWithMedia;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { t } = useTranslation();
  const mainImage = property.media?.length > 0 ? property.media[0]?.path : null;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] relative overflow-hidden">
        {mainImage ? (
          <img
            src={`https://gxzifrexmsouvfnriyym.supabase.co/storage/v1/object/public/property-images/${mainImage}`}
            alt={property.title_fr || ''}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Home className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {property.transaction && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {property.transaction === 'sale' ? 'Vente' : 'Location'}
          </Badge>
        )}
        {property.dpe_letter && (
          <Badge 
            variant="outline" 
            className="absolute top-3 right-3 bg-background/90"
          >
            DPE {property.dpe_letter}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span>{property.city}</span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {property.title_fr}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {property.excerpt_fr}
        </p>
        
        <div className="flex items-center gap-4 text-sm mb-4">
          {property.rooms && (
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{property.rooms} pièces</span>
            </div>
          )}
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} ch.</span>
            </div>
          )}
          {property.area_m2 && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.area_m2} m²</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            {property.price && formatPrice(property.price)}
            {property.rent_cc && (
              <span className="text-sm font-normal"> /mois CC</span>
            )}
          </div>
          
          <Button asChild size="sm">
            <Link to={`/bien/${property.id}`}>
              Voir le détail
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;