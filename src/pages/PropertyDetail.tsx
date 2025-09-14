import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Ruler, BedDouble, Calendar, Loader, X, Maximize2 } from 'lucide-react';
import { propertiesApi } from '@/services/propertiesApi';
import { PropertyWithMedia } from '@/types/index';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BasicLeafletMap from '@/components/BasicLeafletMap';

const PropertyDetail = () => {
  const { idOrSlug } = useParams();
  const { t } = useTranslation();
  const [property, setProperty] = useState<PropertyWithMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  useEffect(() => {
    console.log('PropertyDetail mounted, idOrSlug:', idOrSlug);
    const fetchProperty = async () => {
      if (!idOrSlug) return;
      
      try {
        console.log('Fetching property with ID:', idOrSlug);
        setLoading(true);
        const propertyData = await propertiesApi.getById(idOrSlug);
        console.log('Property data received:', propertyData);
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
        console.log('Error details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [idOrSlug]);

  if (loading) {
    console.log('PropertyDetail loading state');
    return (
      <Layout title="Chargement...">
        <div className="flex justify-center items-center min-h-screen">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!property) {
    console.log('PropertyDetail no property found');
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

  console.log('PropertyDetail rendering with property:', property);
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
            <Carousel className="w-full">
              <CarouselContent>
                {imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group cursor-pointer">
                      <img 
                        src={url} 
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onClick={() => setFullscreenImage(url)}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => setFullscreenImage(url)}
                        >
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Agrandir
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Aucune image disponible</span>
            </div>
          )}
        </div>

        {/* YouTube Video */}
        {property.youtube_url && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Visite virtuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(property.youtube_url) || ''}
                    title="Visite virtuelle"
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
                <CardTitle>Informations clés</CardTitle>
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
            {(property.lat && property.lng) && (
              <Card>
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <BasicLeafletMap 
                    lat={Number(property.lat)}
                    lng={Number(property.lng)}
                    title={property.title_fr || property.title_en || undefined}
                    address={property.address || undefined}
                    city={property.city || undefined}
                    zoom={14}
                    radiusMeters={200}
                    className="rounded-lg overflow-hidden border"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Demande de visite</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nom"
                  className="w-full p-3 border rounded-lg"
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg"
                />
                <input 
                  type="tel" 
                  placeholder="Téléphone"
                  className="w-full p-3 border rounded-lg"
                />
                <textarea 
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 border rounded-lg"
                />
                <Button className="w-full">
                  Envoyer la demande
                </Button>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Biens similaires</CardTitle>
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

        {/* Fullscreen Image Dialog */}
        <Dialog open={!!fullscreenImage} onOpenChange={() => setFullscreenImage(null)}>
          <DialogContent className="max-w-7xl w-full h-full p-0 bg-black/95">
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={() => setFullscreenImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              {fullscreenImage && (
                <img
                  src={fullscreenImage}
                  alt="Vue agrandie"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default PropertyDetail;