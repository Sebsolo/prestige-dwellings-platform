import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PropertyWithMedia } from '@/types/index';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Home, Bed, Square } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';
import { getPropertyUrl } from '@/lib/propertyUrl';

interface PropertyCardProps {
  property: PropertyWithMedia;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { t } = useTranslation();
  const mainImage = property.media?.find(media => media.sort_order === 0) || property.media?.[0];
  
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
        {mainImage?.path ? (
          <ResponsiveImage
            bucket="property-images"
            imagePath={mainImage.path}
            slotWidth={380}
            aspect={4/3}
            alt={mainImage?.title || property.title_fr || ''}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Home className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {property.transaction && (
            <Badge className="bg-primary text-primary-foreground">
              {property.transaction === 'sale' ? t('property.transaction.sale') : t('property.transaction.rent')}
            </Badge>
          )}
          {property.status === 'sold' && (
            <Badge variant="destructive">
              {t('property.status.sold')}
            </Badge>
          )}
          {property.status === 'under_offer' && (
            <Badge variant="secondary">
              {t('property.status.under_offer')}
            </Badge>
          )}
          {property.status === 'rented' && (
            <Badge variant="destructive">
              {t('property.status.rented')}
            </Badge>
          )}
        </div>
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
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {property.title_fr}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{property.city} • {
            property.type === 'apartment' ? t('property.type.apartment') : 
            property.type === 'house' ? t('property.type.house') : 
            property.type === 'commercial' ? t('property.type.commercial') : 
            property.type === 'land' ? t('property.type.land') : 
            property.type === 'garage' ? t('property.type.garage') : 
            t('property.type.other')
          }</span>
        </div>
        
          <div className="flex items-center gap-4 text-sm mb-4 bg-muted/30 p-2 rounded-md">
          {property.area_m2 && property.area_m2 > 0 && (
            <div className="flex items-center gap-1 font-medium">
              <Square className="h-4 w-4" />
              <span>{Number(property.area_m2)} m²</span>
            </div>
          )}
          {property.rooms && property.rooms > 0 && (
            <div className="flex items-center gap-1 font-medium">
              <Home className="h-4 w-4" />
              <span>{property.rooms} {t('property.card.rooms')}</span>
            </div>
          )}
          {property.land_m2 && property.land_m2 > 0 && (
            <div className="flex items-center gap-1 font-medium text-green-600">
              <Square className="h-4 w-4" />
              <span>{Number(property.land_m2)} m² {t('property.card.land')}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            {property.transaction === 'rent' && property.rent_cc ? (
              <>
                {formatPrice(property.rent_cc)}
                <span className="text-sm font-normal"> {t('property.card.perMonth')}</span>
              </>
            ) : property.price ? (
              formatPrice(property.price)
            ) : null}
          </div>
          
          <Button asChild size="sm">
            <Link to={getPropertyUrl(property)}>
              {t('property.card.seeDetails')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;