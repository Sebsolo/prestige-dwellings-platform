import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Ruler, BedDouble, Car, Calendar } from 'lucide-react';

const PropertyDetail = () => {
  const { idOrSlug } = useParams();
  const { t } = useTranslation();

  // Mock data - replace with real API call
  const property = {
    id: 1,
    title: 'Villa de Prestige avec Vue Mer',
    price: 2500000,
    area: 350,
    rooms: 8,
    bedrooms: 5,
    city: 'Cannes',
    address: '123 Boulevard de la Croisette, Cannes',
    description: 'Magnifique villa de prestige située sur la Croisette...',
    dpe_letter: 'C',
    images: ['/placeholder.svg'],
    lat: 43.5528,
    lng: 7.0174
  };

  return (
    <Layout 
      title={property.title}
      description={property.description}
      keywords={`immobilier ${property.city} villa prestige`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="aspect-video bg-muted rounded-lg mb-4">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.address}</span>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0
                }).format(property.price)}
              </div>
            </div>

            {/* Key Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('property.key_info')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{property.area} m²</span>
                  </div>
                  <div className="flex items-center">
                    <BedDouble className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{property.bedrooms} chambres</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{property.rooms} pièces</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="h-8">
                      DPE: {property.dpe_letter}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>{t('property.location')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Carte à intégrer</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('property.visit_request')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input 
                  type="text" 
                  placeholder={t('common.name')}
                  className="w-full p-3 border rounded-lg"
                />
                <input 
                  type="email" 
                  placeholder={t('common.email')}
                  className="w-full p-3 border rounded-lg"
                />
                <input 
                  type="tel" 
                  placeholder={t('common.phone')}
                  className="w-full p-3 border rounded-lg"
                />
                <textarea 
                  placeholder={t('common.message')}
                  rows={4}
                  className="w-full p-3 border rounded-lg"
                />
                <Button className="w-full">
                  {t('common.submit')}
                </Button>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>{t('property.similar_properties')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-20 h-16 bg-muted rounded"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Villa similaire</h4>
                        <p className="text-xs text-muted-foreground">Cannes</p>
                        <p className="text-sm font-semibold">€2,200,000</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;