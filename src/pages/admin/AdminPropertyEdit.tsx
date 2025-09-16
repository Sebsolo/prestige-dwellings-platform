import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Upload, X, Camera } from 'lucide-react';
import { propertiesApi } from '@/services/propertiesApi';

const propertySchema = z.object({
  transaction: z.enum(['sale', 'rent']),
  type: z.enum(['apartment', 'house', 'commercial', 'land', 'other']),
  status: z.enum(['draft', 'published', 'under_offer', 'sold', 'rented']),
  ref: z.string().optional(),
  title_fr: z.string().min(1, 'Le titre français est requis'),
  title_en: z.string().optional(),
  excerpt_fr: z.string().optional(),
  excerpt_en: z.string().optional(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  price: z.coerce.number().optional(),
  rent_cc: z.coerce.number().optional(),
  rooms: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  area_m2: z.coerce.number().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  dpe_letter: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']).optional(),
  youtube_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const AdminPropertyEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; preview: string; id: string }>>([]);
  const [existingImages, setExistingImages] = useState<Array<{ id: string; path: string; preview: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [propertyLoading, setPropertyLoading] = useState(true);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      transaction: 'sale',
      type: 'apartment',
      status: 'draft',
    },
  });

  useEffect(() => {
    if (id) {
      loadProperty();
    }
  }, [id]);

  const loadProperty = async () => {
    try {
      setPropertyLoading(true);
      const property = await propertiesApi.getById(id!);
      
      if (!property) {
        toast.error('Bien non trouvé');
        navigate('/admin/properties');
        return;
      }

      // Set form values
      form.reset({
        transaction: property.transaction,
        type: property.type,
        status: property.status || 'draft',
        ref: property.ref || '',
        title_fr: property.title_fr || '',
        title_en: property.title_en || '',
        excerpt_fr: property.excerpt_fr || '',
        excerpt_en: property.excerpt_en || '',
        description_fr: property.description_fr || '',
        description_en: property.description_en || '',
        price: property.price || undefined,
        rent_cc: property.rent_cc || undefined,
        rooms: property.rooms || undefined,
        bedrooms: property.bedrooms || undefined,
        area_m2: property.area_m2 ? Number(property.area_m2) : undefined,
        address: property.address || '',
        city: property.city || '',
        postal_code: property.postal_code || '',
        lat: property.lat ? Number(property.lat) : undefined,
        lng: property.lng ? Number(property.lng) : undefined,
        dpe_letter: property.dpe_letter || undefined,
        youtube_url: property.youtube_url || '',
      });

      // Load existing images
      if (property.media && property.media.length > 0) {
        const images = await Promise.all(
          property.media.map(async (media) => {
            const { data } = await supabase.storage
              .from('property-images')
              .createSignedUrl(media.path, 3600);
            
            return {
              id: String(media.id),
              path: media.path,
              preview: data?.signedUrl || ''
            };
          })
        );
        setExistingImages(images);
      }
    } catch (error) {
      console.error('Error loading property:', error);
      toast.error('Erreur lors du chargement du bien');
    } finally {
      setPropertyLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        const newId = Math.random().toString(36).substr(2, 9);
        setUploadedImages(prev => [...prev, { file, preview, id: newId }]);
      }
    });
  };

  const removeNewImage = (imageId: string) => {
    setUploadedImages(prev => {
      const imageToRemove = prev.find(img => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const removeExistingImage = async (mediaId: string) => {
    try {
      await propertiesApi.deleteMedia(mediaId);
      setExistingImages(prev => prev.filter(img => img.id !== mediaId));
      toast.success('Image supprimée');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Erreur lors de la suppression de l\'image');
    }
  };

  const geocodeAddress = useCallback(async () => {
    const address = form.getValues('address');
    const city = form.getValues('city');
    const postalCode = form.getValues('postal_code');
    
    if (!address || !city) {
      toast.error('Veuillez renseigner l\'adresse et la ville');
      return;
    }
    
    try {
      setGeocoding(true);
      const addressParts = [address, postalCode, city].filter(Boolean);
      const fullAddress = addressParts.join(', ');
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        
        form.setValue('lat', lat);
        form.setValue('lng', lng);
        
        toast.success(`Coordonnées mises à jour: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      } else {
        toast.error('Adresse non trouvée');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast.error('Erreur lors du géocodage');
    } finally {
      setGeocoding(false);
    }
  }, [form]);

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true);
    try {
      const propertyData = {
        transaction: data.transaction,
        type: data.type,
        status: data.status,
        ref: data.ref || null,
        title_fr: data.title_fr || null,
        title_en: data.title_en || null,
        excerpt_fr: data.excerpt_fr || null,
        excerpt_en: data.excerpt_en || null,
        description_fr: data.description_fr || null,
        description_en: data.description_en || null,
        price: data.price || null,
        rent_cc: data.rent_cc || null,
        rooms: data.rooms || null,
        bedrooms: data.bedrooms || null,
        area_m2: data.area_m2 || null,
        address: data.address || null,
        city: data.city || null,
        postal_code: data.postal_code || null,
        lat: data.lat || null,
        lng: data.lng || null,
        dpe_letter: data.dpe_letter || null,
        youtube_url: data.youtube_url || null,
      };

      await propertiesApi.update(id!, propertyData);

      // Upload new images if any
      if (uploadedImages.length > 0) {
        setIsUploading(true);
        
        for (let i = 0; i < uploadedImages.length; i++) {
          const image = uploadedImages[i];
          const fileName = `${id}/${Date.now()}_${image.file.name}`;
          
          // Upload to storage
          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, image.file);

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            continue;
          }

          // Save media record
          await supabase
            .from('media')
            .insert({
              property_id: Number(id),
              path: fileName,
              sort_order: existingImages.length + i,
            });
        }
        
        setIsUploading(false);
      }

      toast.success('Bien modifié avec succès');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Erreur lors de la modification du bien');
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  if (propertyLoading) {
    return (
      <AdminLayout title="Modification du bien">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Modification du bien">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/properties')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h2 className="text-2xl font-bold text-foreground">Modifier le bien</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="location">Localisation</TabsTrigger>
                <TabsTrigger value="media">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Statut" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Brouillon</SelectItem>
                                <SelectItem value="published">Publié</SelectItem>
                                <SelectItem value="under_offer">Sous offre</SelectItem>
                                <SelectItem value="sold">Vendu</SelectItem>
                                <SelectItem value="rented">Loué</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Bien vedette
                            </FormLabel>
                            <FormDescription>
                              Afficher ce bien dans la section "Biens Vedettes" de la page d'accueil
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                      <FormField
                        control={form.control}
                        name="ref"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Référence (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="REF-2024-001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="transaction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transaction</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Type de transaction" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sale">Vente</SelectItem>
                                <SelectItem value="rental">Location</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de bien</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Type de bien" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="apartment">Appartement</SelectItem>
                                <SelectItem value="house">Maison</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="land">Terrain</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    </div>


                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre (Français) *</FormLabel>
                            <FormControl>
                              <Input placeholder="Bel appartement 3 pièces..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="title_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre (Anglais)</FormLabel>
                            <FormControl>
                              <Input placeholder="Beautiful 3-room apartment..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="excerpt_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Résumé (Français)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Court résumé du bien..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Résumé (Anglais)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Short summary of the property..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="description_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Français)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Description détaillée du bien..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Anglais)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Detailed description of the property..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Prix et caractéristiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {form.watch('transaction') === 'sale' ? (
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prix de vente (€)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="350000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="rent_cc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loyer CC (€/mois)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="850" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="rooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre de pièces</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chambres</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="area_m2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Surface (m²)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="75" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="dpe_letter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DPE</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Classe énergétique" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                              <SelectItem value="E">E</SelectItem>
                              <SelectItem value="F">F</SelectItem>
                              <SelectItem value="G">G</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Localisation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="123 rue de la République" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postal_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal</FormLabel>
                            <FormControl>
                              <Input placeholder="75001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="lat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input type="number" step="any" placeholder="48.8566" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lng"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input type="number" step="any" placeholder="2.3522" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={geocodeAddress}
                        disabled={geocoding}
                      >
                        {geocoding ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-l-current"></div>
                            Géocodage...
                          </>
                        ) : (
                          'Géocoder l\'adresse'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vidéo YouTube</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="youtube_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL YouTube (optionnel)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://www.youtube.com/watch?v=..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Photos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Images existantes</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {existingImages.map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.preview}
                                alt="Property"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeExistingImage(image.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* New Images */}
                    {uploadedImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Nouvelles images</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {uploadedImages.map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.preview}
                                alt="Property"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeNewImage(image.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload Input */}
                    <div className="border-2 border-dashed border-muted rounded-lg p-6">
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Ajoutez des photos du bien
                        </p>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Choisir des fichiers
                            </span>
                          </Button>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/properties')}
                disabled={isLoading || isUploading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading || isUploading}>
                {isLoading || isUploading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminPropertyEdit;
