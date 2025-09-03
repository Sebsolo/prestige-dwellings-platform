import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Ruler, BedDouble, Filter, Map, Grid } from 'lucide-react';

const Sales = () => {
  const { t } = useTranslation();

  const properties = [
    {
      id: 1,
      title: 'Villa contemporaine vue mer',
      price: 3500000,
      area: 450,
      rooms: 8,
      bedrooms: 5,
      city: 'Cannes',
      address: 'Boulevard de la Croisette',
      image: '/placeholder.svg',
      dpe_letter: 'C'
    }
  ];

  return (
    <Layout 
      title={t('nav.sales')}
      description="Découvrez nos propriétés à vendre"
      keywords="vente immobilier prestige villa appartement"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold mb-4">{t('nav.sales')}</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <Input placeholder={t('common.city')} />
              <Input placeholder="Prix min" type="number" />
              <Input placeholder="Prix max" type="number" />
              <Button className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                {t('common.search')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="group hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}, {property.city}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0
                      }).format(property.price)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-0">
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Carte Leaflet à intégrer</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;