import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { propertiesApi } from '@/services/propertiesApi';
import { PropertyWithMedia } from '@/types/index';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const AdminProperties = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [properties, setProperties] = useState<PropertyWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sale');

  useEffect(() => {
    loadProperties();
  }, [activeTab]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      // Admin should see all properties regardless of status
      const data = await propertiesApi.list({ 
        transaction: activeTab as 'sale' | 'rental',
        status: 'all' // Show all properties for admin
      });
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
      toast.error('Erreur lors du chargement des biens');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) return;
    
    try {
      await propertiesApi.delete(id);
      toast.success('Bien supprimé avec succès');
      loadProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const canEdit = (property: PropertyWithMedia) => {
    if (profile?.role === 'admin' || profile?.role === 'editor') return true;
    return property.created_by === profile?.id;
  };

  const canDelete = (property: PropertyWithMedia) => {
    if (profile?.role === 'admin') return true;
    return false;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      draft: 'outline',
      published: 'default',
      under_offer: 'secondary',
      sold: 'destructive',
      rented: 'destructive'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <AdminLayout title="Gestion des Biens">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Biens Immobiliers</h2>
          <Button onClick={() => navigate('/admin/properties/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Bien
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="sale">Vente</TabsTrigger>
            <TabsTrigger value="rental">Location</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : (
              <div className="grid gap-4">
                {properties.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">
                        Aucun bien trouvé pour {activeTab === 'sale' ? 'la vente' : 'la location'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  properties.map((property) => (
                    <Card key={property.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {property.title_fr || 'Titre non défini'}
                            </CardTitle>
                            <CardDescription>
                              {property.city} • {property.type} • {property.area_m2}m²
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(property.status)}
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {canEdit(property) && (
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              {canDelete(property) && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleDelete(property.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Prix:</span>
                            <p>
                              {activeTab === 'sale' 
                                ? `${property.price?.toLocaleString()}€` 
                                : `${property.rent_cc?.toLocaleString()}€/mois`
                              }
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Pièces:</span>
                            <p>{property.rooms || 'Non défini'}</p>
                          </div>
                          <div>
                            <span className="font-medium">Réf:</span>
                            <p>{property.ref || property.id.slice(0, 8)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Images:</span>
                            <p>{property.media?.length || 0}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;