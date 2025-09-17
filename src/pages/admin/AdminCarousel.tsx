import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Search, Image, Edit, Trash2, GripVertical } from 'lucide-react';
import { FileUpload, FilePreview } from '@/components/ui/file-upload';

interface CarouselImage {
  id: number;
  title: string;
  alt_text: string | null;
  image_path: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}

const AdminCarousel = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; preview: string; id: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAltText, setNewAltText] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('home_carousel_images')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Erreur lors du chargement des images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (files: File[]) => {
    files.forEach(file => {
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

  const handleUpload = async () => {
    if (uploadedImages.length === 0 || !newTitle.trim()) {
      toast.error('Veuillez ajouter un titre et au moins une image');
      return;
    }

    setIsUploading(true);
    try {
      for (const image of uploadedImages) {
        const fileName = `${Date.now()}_${image.file.name}`;
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('home-carousel')
          .upload(fileName, image.file);

        if (uploadError) throw uploadError;

        // Get the next sort order
        const maxSortOrder = images.length > 0 ? Math.max(...images.map(img => img.sort_order)) : 0;

        // Save to database
        const { error: dbError } = await supabase
          .from('home_carousel_images')
          .insert({
            title: newTitle,
            alt_text: newAltText || null,
            image_path: fileName,
            sort_order: maxSortOrder + 1,
            active: true
          });

        if (dbError) throw dbError;
      }

      toast.success('Images ajoutées avec succès');
      setUploadedImages([]);
      setNewTitle('');
      setNewAltText('');
      setShowUpload(false);
      fetchImages();
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Erreur lors de l\'ajout des images');
    } finally {
      setIsUploading(false);
    }
  };

  const toggleActive = async (id: number, active: boolean) => {
    try {
      const { error } = await supabase
        .from('home_carousel_images')
        .update({ active })
        .eq('id', id);

      if (error) throw error;
      
      setImages(prev => prev.map(img => 
        img.id === id ? { ...img, active } : img
      ));
      
      toast.success(active ? 'Image activée' : 'Image désactivée');
    } catch (error) {
      console.error('Error updating image status:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteImage = async (id: number, imagePath: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      // Delete from storage
      await supabase.storage
        .from('home-carousel')
        .remove([imagePath]);

      // Delete from database
      const { error } = await supabase
        .from('home_carousel_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setImages(prev => prev.filter(img => img.id !== id));
      toast.success('Image supprimée');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const getImageUrl = (path: string) => {
    const { data } = supabase.storage.from('home-carousel').getPublicUrl(path);
    return data.publicUrl;
  };

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Carrousel d'accueil">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Gestion du carrousel</h2>
          <Button onClick={() => setShowUpload(!showUpload)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter des images
          </Button>
        </div>

        {showUpload && (
          <Card>
            <CardHeader>
              <CardTitle>Ajouter de nouvelles images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Titre *</label>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Titre de l'image"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Texte alternatif</label>
                  <Input
                    value={newAltText}
                    onChange={(e) => setNewAltText(e.target.value)}
                    placeholder="Description pour l'accessibilité"
                  />
                </div>
              </div>

              <FileUpload
                onFileSelect={handleImageUpload}
                multiple={true}
                maxFiles={6}
                accept="image/png,image/jpeg,image/jpg,image/webp"
              />

              {uploadedImages.length > 0 && (
                <FilePreview
                  files={uploadedImages}
                  onRemove={removeImage}
                />
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={handleUpload} 
                  disabled={isUploading || uploadedImages.length === 0 || !newTitle.trim()}
                >
                  {isUploading ? 'Ajout en cours...' : 'Ajouter les images'}
                </Button>
                <Button variant="outline" onClick={() => setShowUpload(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par titre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? 'Aucune image trouvée' : 'Aucune image dans le carrousel'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <div key={image.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={getImageUrl(image.image_path)}
                        alt={image.alt_text || image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 w-8 p-0"
                          onClick={() => deleteImage(image.id, image.image_path)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold truncate">{image.title}</h3>
                      {image.alt_text && (
                        <p className="text-sm text-muted-foreground truncate">
                          {image.alt_text}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={image.active}
                            onCheckedChange={(checked) => toggleActive(image.id, checked)}
                          />
                          <span className="text-sm">
                            {image.active ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Ordre: {image.sort_order}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCarousel;