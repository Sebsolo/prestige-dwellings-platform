import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Ruler, BedDouble, Car, Calendar, Loader } from 'lucide-react';
import { propertiesApi } from '@/services/propertiesApi';
import { PropertyWithMedia } from '@/types/index';
import { supabase } from '@/integrations/supabase/client';

const PropertyDetail = () => {
  const { idOrSlug } = useParams();
  const { t } = useTranslation();
  const [property, setProperty] = useState<PropertyWithMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!idOrSlug) return;
      
      try {
        setLoading(true);
        const propertyData = await propertiesApi.getById(idOrSlug);
        setProperty(propertyData);

        // Get signed URLs for images
        if (propertyData?.media && propertyData.media.length > 0) {
          const urls = await Promise.all(
            propertyData.media.map(async (media) => {
              const { data } = await supabase.storage
                .from('property-images')
                .createSignedUrl(media.path, 3600);
              return data?.signedUrl || '';
            })
          );
          setImageUrls(urls.filter(url => url));
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [idOrSlug]);

  if (loading) {
    return (
      <Layout title="Chargement...">
        <div className="flex justify-center items-center min-h-screen">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout title="Bien non trouvé">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bien immobilier non trouvé</h1>
            <p className="text-muted-foreground">Le bien que vous recherchez n'existe pas ou n'est plus disponible.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={property.title_fr || property.title_en || 'Bien immobilier'}
      description={property.excerpt_fr || property.description_fr || ''}
      keywords={`immobilier ${property.city} ${property.type}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          {imageUrls.length > 0 ? (
            <>
              <div className="aspect-video bg-muted rounded-lg mb-4">
                <img 
                  src={imageUrls[0]} 
                  alt={property.title_fr || property.title_en || 'Bien immobilier'}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {imageUrls.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {imageUrls.slice(1, 5).map((url, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={url} 
                        alt={`Image ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Aucune image disponible</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold mb-2">
                {property.title_fr || property.title_en || 'Bien immobilier'}
              </h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.address || property.city}</span>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                {property.transaction === 'rental' && property.rent_cc ? (
                  `${new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(property.rent_cc)} / mois`
                ) : property.price ? (
                  new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(property.price)
                ) : 'Prix sur demande'}
              </div>
            </div>

            {/* Key Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('property.key_info')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.area_m2 && (
                    <div className="flex items-center">
                      <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{property.area_m2} m²</span>
                    </div>
                  )}
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{property.bedrooms} chambres</span>
                    </div>
                  )}
                  {property.rooms && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{property.rooms} pièces</span>
                    </div>
                  )}
                  {property.dpe_letter && (
                    <div className="flex items-center">
                      <Badge variant="outline" className="h-8">
                        DPE: {property.dpe_letter}
                      </Badge>
                    </div>
                  )}
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
                  {property.description_fr || property.description_en || 'Aucune description disponible.'}
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