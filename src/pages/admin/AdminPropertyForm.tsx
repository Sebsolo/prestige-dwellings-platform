import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

const propertySchema = z.object({
  transaction: z.enum(['sale', 'rental']),
  type: z.string().min(1, 'Le type est requis'),
  status: z.enum(['draft', 'published']),
  ref: z.string().optional(),
  title_fr: z.string().min(1, 'Le titre français est requis'),
  title_en: z.string().optional(),
  excerpt_fr: z.string().optional(),
  excerpt_en: z.string().optional(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  price: z.coerce.number().optional(),
  rent_hc: z.coerce.number().optional(),
  rent_cc: z.coerce.number().optional(),
  rooms: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  area_m2: z.coerce.number().optional(),
  area_useful_m2: z.coerce.number().optional(),
  land_m2: z.coerce.number().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  dpe_letter: z.string().optional(),
  ges_letter: z.string().optional(),
  availability_date: z.string().optional(),
  youtube_url: z.string().optional(),
  featured: z.boolean().default(false),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const AdminPropertyForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; preview: string; id: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      transaction: 'sale',
      type: 'apartment',
      status: 'draft',
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        const id = Math.random().toString(36).substr(2, 9);
        setUploadedImages(prev => [...prev, { file, preview, id }]);
      }
    });
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
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
      const user = await supabase.auth.getUser();
      
      const propertyData = {
        transaction: data.transaction,
        type: data.type,
        status: data.status,
        created_by: user.data.user?.id,
        ref: data.ref || null,
        title_fr: data.title_fr || null,
        title_en: data.title_en || null,
        excerpt_fr: data.excerpt_fr || null,
        excerpt_en: data.excerpt_en || null,
        description_fr: data.description_fr || null,
        description_en: data.description_en || null,
        price: data.price || null,
        rent_hc: data.rent_hc || null,
        rent_cc: data.rent_cc || null,
        rooms: data.rooms || null,
        bedrooms: data.bedrooms || null,
        area_m2: data.area_m2 || null,
        area_useful_m2: data.area_useful_m2 || null,
        land_m2: data.land_m2 || null,
        address: data.address || null,
        city: data.city || null,
        postal_code: data.postal_code || null,
        lat: data.lat || null,
        lng: data.lng || null,
        dpe_letter: data.dpe_letter || null,
        ges_letter: data.ges_letter || null,
        availability_date: data.availability_date || null,
        youtube_url: data.youtube_url || null,
      };

      const { data: property, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();

      if (error) throw error;

      // Upload images if any
      if (uploadedImages.length > 0) {
        setIsUploading(true);
        
        for (let i = 0; i < uploadedImages.length; i++) {
          const image = uploadedImages[i];
          const fileName = `${property.id}/${Date.now()}_${image.file.name}`;
          
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
              property_id: property.id,
              path: fileName,
              sort_order: i,
            });
        }
        
        setIsUploading(false);
      }

      toast.success('Bien créé avec succès');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Erreur lors de la création du bien');
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  return (
    <AdminLayout title="Nouveau Bien">
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
          <h2 className="text-2xl font-bold text-foreground">Créer un nouveau bien</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="location">Localisation</TabsTrigger>
                <TabsTrigger value="media">Photos & Vidéo</TabsTrigger>
                <TabsTrigger value="energy">Énergie</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="transaction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transaction</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Type de bien" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="apartment">Appartement</SelectItem>
                                <SelectItem value="house">Maison</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="studio">Studio</SelectItem>
                                <SelectItem value="loft">Loft</SelectItem>
                                <SelectItem value="office">Bureau</SelectItem>
                                <SelectItem value="shop">Commerce</SelectItem>
                                <SelectItem value="land">Terrain</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Statut" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Brouillon</SelectItem>
                                <SelectItem value="published">Publié</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="rent_hc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Loyer HC (€/mois)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="800" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                      </div>
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
                              <Input type="number" step="0.1" placeholder="75.5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="area_useful_m2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Surface utile (m²)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" placeholder="70" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="land_m2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Terrain (m²)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="availability_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date de disponibilité</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
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
                            <Input placeholder="123 Rue de la Paix" {...field} />
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Photos et vidéo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Photo Upload Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        <h3 className="font-medium">Photos du bien</h3>
                      </div>
                      
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="image-upload"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Cliquez pour ajouter des photos ou glissez-déposez
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Formats acceptés: JPG, PNG, WebP
                          </span>
                        </label>
                      </div>

                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {uploadedImages.map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.preview}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(image.id)}
                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* YouTube Video Section */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Vidéo YouTube (optionnel)</h3>
                      <FormField
                        control={form.control}
                        name="youtube_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL de la vidéo YouTube</FormLabel>
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="energy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance énergétique</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dpe_letter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Classe DPE</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
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

                      <FormField
                        control={form.control}
                        name="ges_letter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Classe GES</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
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
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading || isUploading}>
                {isLoading ? 'Création...' : isUploading ? 'Upload des photos...' : 'Créer le bien'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminPropertyForm;