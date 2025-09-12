import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const blogSchema = z.object({
  title_fr: z.string().min(1, 'Le titre français est requis'),
  title_en: z.string().optional(),
  content_fr: z.string().min(1, 'Le contenu français est requis'),
  content_en: z.string().optional(),
  slug: z.string().min(1, 'Le slug est requis'),
  status: z.enum(['draft', 'published']),
  cover_path: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const AdminBlogForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('french');

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      status: 'draft',
    },
  });

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

  const onSubmit = async (data: BlogFormData) => {
    setIsLoading(true);
    try {
      const insertData = {
        ...data,
        created_by: (await supabase.auth.getUser()).data.user?.id,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from('posts')
        .insert(insertData);

      if (error) throw error;

      toast.success('Article créé avec succès');
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Erreur lors de la création de l\'article');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Nouvel Article">
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
          <h2 className="text-2xl font-bold text-foreground">Créer un nouvel article</h2>
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
                  name="cover_path"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image de couverture (URL)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg" 
                          {...field} 
                        />
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
                              onChange={(e) => {
                                field.onChange(e);
                                // Auto-generate slug from French title if slug is empty
                                if (!form.getValues('slug') && e.target.value) {
                                  form.setValue('slug', generateSlug(e.target.value));
                                }
                              }}
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
                            <Textarea 
                              placeholder="Écrivez le contenu de votre article en français..."
                              className="min-h-[300px]"
                              {...field} 
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
                      name="content_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contenu</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write the content of your article in English..."
                              className="min-h-[300px]"
                              {...field} 
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
                {isLoading ? 'Création...' : 'Créer l\'article'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogForm;