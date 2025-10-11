import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import PropertyCard from '@/components/PropertyCard';
import PropertyFiltersComponent, { PropertyFiltersType } from '@/components/PropertyFilters';
import PropertyMap from '@/components/PropertyMap';
import { propertiesApi } from '@/services/propertiesApi';
import { PropertyWithMedia } from '@/types/index';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, Map } from 'lucide-react';

const Sales = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<PropertyWithMedia[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyWithMedia[]>([]);
  const [filters, setFilters] = useState<PropertyFiltersType>({});
  const [selectedProperty, setSelectedProperty] = useState<PropertyWithMedia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertiesApi.list({ transaction: 'sale' });
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties.filter(property => {
      if (filters.city && !property.city?.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
      if (filters.priceMin && (!property.price || property.price < filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && (!property.price || property.price > filters.priceMax)) {
        return false;
      }
      if (filters.areaMin && (!property.area_m2 || property.area_m2 < filters.areaMin)) {
        return false;
      }
      if (filters.rooms && property.rooms !== filters.rooms) {
        return false;
      }
      if (filters.type && property.type !== filters.type) {
        return false;
      }
      if (filters.dpe && property.dpe_letter !== filters.dpe) {
        return false;
      }
      return true;
    });

    // Sort so non-sold properties appear first
    filtered.sort((a, b) => {
      // Properties with status 'sold' should come after others
      const aIsSold = a.status === 'sold';
      const bIsSold = b.status === 'sold';
      
      if (aIsSold && !bIsSold) return 1;
      if (!aIsSold && bIsSold) return -1;
      return 0;
    });

    setFilteredProperties(filtered);
  }, [properties, filters]);

  if (loading) {
    return (
      <Layout title={t('sales.title')} description="Properties for sale">
        <div className="min-h-screen bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={t('sales.title')} description="Properties for sale">
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              {t('sales.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t(filteredProperties.length === 1 ? 'sales.count' : 'sales.count_plural', { count: filteredProperties.length })}
            </p>
          </div>

          <div className="mb-6">
            <PropertyFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              transaction="sale"
            />
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                {t('sales.grid_view')}
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                {t('sales.map_view')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    {t('sales.no_results')}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="map">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className={`cursor-pointer transition-all ${
                        selectedProperty?.id === property.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
                
                <PropertyMap
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={setSelectedProperty}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;