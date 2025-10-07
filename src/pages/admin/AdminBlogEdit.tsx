import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUpload, FilePreview } from '@/components/ui/file-upload';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Loader } from 'lucide-react';

const blogSchema = z.object({
  title_fr: z.string().min(1, 'Le titre français est requis'),
  title_en: z.string().optional(),
  content_fr: z.string().min(1, 'Le contenu français est requis'),
  content_en: z.string().optional(),
  excerpt_fr: z.string().optional(),
  excerpt_en: z.string().optional(),
  slug: z.string().min(1, 'Le slug est requis'),
  status: z.enum(['draft', 'published']),
  cover_path: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const AdminBlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [activeTab, setActiveTab] = useState('french');
  const [coverImage, setCoverImage] = useState<Array<{ file?: File; preview: string; id: string; title?: string }>>([]);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      status: 'draft',
    },
  });

  // Load existing post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', parseInt(id))
          .single();

        if (error) throw error;

        if (data) {
          form.reset({
            title_fr: data.title_fr || '',
            title_en: data.title_en || '',
            content_fr: data.content_fr || '',
            content_en: data.content_en || '',
            excerpt_fr: '', // Will be auto-generated from content if empty
            excerpt_en: '', // Will be auto-generated from content if empty
            slug: data.slug || '',
            status: data.status as 'draft' | 'published',
            cover_path: data.cover_path || '',
          });

          // Set cover image if exists
          if (data.cover_path) {
            setCoverImage([{
              preview: data.cover_path,
              id: 'existing-cover',
              title: 'Image de couverture'
            }]);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Erreur lors du chargement de l\'article');
        navigate('/admin/blog');
      } finally {
        setIsLoadingPost(false);
      }
    };

    fetchPost();
  }, [id, form, navigate]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-+/g, '-') // Replace multiple dashes with single dash
      .trim();
  };

  // Generate excerpt from content
  const generateExcerpt = (content: string) => {
    const cleanContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return cleanContent.substring(0, 200) + (cleanContent.length > 200 ? '...' : '');
  };

  // Handle file upload for cover image
  const handleCoverImageUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const fileName = `blog-covers/${Date.now()}-${file.name}`;

    try {
      const { data, error } = await supabase.storage
        .from('blog-covers')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-covers')
        .getPublicUrl(fileName);

      setCoverImage([{
        file,
        preview: publicUrl,
        id: 'new-cover',
        title: file.name
      }]);

      form.setValue('cover_path', publicUrl);
      toast.success('Image de couverture uploadée avec succès');
    } catch (error) {
      console.error('Error uploading cover image:', error);
      toast.error('Erreur lors de l\'upload de l\'image');
    }
  };

  const handleRemoveCoverImage = (id: string) => {
    setCoverImage([]);
    form.setValue('cover_path', '');
  };

  const onSubmit = async (data: BlogFormData) => {
    if (!id) return;

    setIsLoading(true);
    try {
      const updateData = {
        title_fr: data.title_fr,
        title_en: data.title_en || null,
        content_fr: data.content_fr,
        content_en: data.content_en || null,
        slug: data.slug,
        status: data.status,
        cover_path: data.cover_path || null,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', parseInt(id));

      if (error) throw error;

      toast.success('Article mis à jour avec succès');
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Erreur lors de la mise à jour de l\'article');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingPost) {
    return (
      <AdminLayout title="Modification d'article">
        <div className="flex items-center justify-center py-20">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Modifier l'article">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/blog')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h2 className="text-2xl font-bold text-foreground">Modifier l'article</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug (URL) *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="mon-article-de-blog" 
                            {...field}
                            onChange={(e) => {
                              const value = generateSlug(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
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
                        <Select onValueChange={field.onChange} value={field.value}>
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
                  name="cover_path"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image de couverture</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <FileUpload
                            onFileSelect={handleCoverImageUpload}
                            accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
                            maxFiles={1}
                          />
                          <FilePreview
                            files={coverImage}
                            onRemove={handleRemoveCoverImage}
                          />
                          <Input 
                            placeholder="ou collez une URL d'image..." 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (e.target.value && !coverImage.length) {
                                setCoverImage([{
                                  preview: e.target.value,
                                  id: 'url-cover',
                                  title: 'Image depuis URL'
                                }]);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="french">Français</TabsTrigger>
                <TabsTrigger value="english">Anglais</TabsTrigger>
              </TabsList>

              <TabsContent value="french" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenu en français</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title_fr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Titre de votre article..." 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt_fr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Extrait (optionnel)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Court résumé de l'article..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content_fr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contenu *</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Écrivez votre article ici..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="english" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenu en anglais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Title of your article..." 
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
                          <FormLabel>Extrait (optionnel)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Short summary of the article..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Write your article here..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/blog')}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Mise à jour...' : 'Mettre à jour l\'article'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEdit;