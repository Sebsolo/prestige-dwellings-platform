import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { ShowcaseItem } from '@/types/showcase';

export default function AdminShowcaseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    group_slug: 'default',
    location_label: '',
    price_label: '',
    detail_url: '',
    poster_bucket: 'showcase-posters',
    poster_path: '',
    video_bucket: 'showcase-videos',
    video_mp4_path: '',
    video_webm_path: '',
    published: false,
    sort_order: 0,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchItem();
    }
  }, [id, isEdit]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('showcase_items')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (error) throw error;
      setFormData(data);
    } catch (error) {
      console.error('Error fetching item:', error);
      toast({
        title: 'Error',
        description: 'Failed to load showcase item',
        variant: 'destructive',
      });
      navigate('/admin/showcase');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File, bucket: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;
    return filePath;
  };

  const handleFileUpload = async (file: File, type: 'poster' | 'video_mp4' | 'video_webm') => {
    try {
      setUploading(true);
      
      const bucket = type === 'poster' ? 'showcase-posters' : 'showcase-videos';
      const filePath = await uploadFile(file, bucket);
      
      if (type === 'poster') {
        handleInputChange('poster_path', filePath);
      } else if (type === 'video_mp4') {
        handleInputChange('video_mp4_path', filePath);
      } else if (type === 'video_webm') {
        handleInputChange('video_webm_path', filePath);
      }

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.location_label || !formData.price_label || !formData.detail_url || !formData.poster_path) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        const { error } = await supabase
          .from('showcase_items')
          .update(formData)
          .eq('id', parseInt(id));

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('showcase_items')
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Showcase item ${isEdit ? 'updated' : 'created'} successfully`,
      });

      navigate('/admin/showcase');
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: 'Error',
        description: `Failed to ${isEdit ? 'update' : 'create'} showcase item`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/admin/showcase')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">
          {isEdit ? 'Edit Showcase Item' : 'Add Showcase Item'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="group_slug">Group Slug *</Label>
                <Input
                  id="group_slug"
                  value={formData.group_slug}
                  onChange={(e) => handleInputChange('group_slug', e.target.value)}
                  placeholder="default"
                  required
                />
              </div>
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location_label">Location *</Label>
              <Input
                id="location_label"
                value={formData.location_label}
                onChange={(e) => handleInputChange('location_label', e.target.value)}
                placeholder="Portimão, Portugal"
                required
              />
            </div>

            <div>
              <Label htmlFor="price_label">Price *</Label>
              <Input
                id="price_label"
                value={formData.price_label}
                onChange={(e) => handleInputChange('price_label', e.target.value)}
                placeholder="4 900 000 € or Prix sur demande"
                required
              />
            </div>

            <div>
              <Label htmlFor="detail_url">Detail URL *</Label>
              <Input
                id="detail_url"
                value={formData.detail_url}
                onChange={(e) => handleInputChange('detail_url', e.target.value)}
                placeholder="/properties/portimao-portugal"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => handleInputChange('published', checked)}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Poster Upload */}
            <div>
              <Label>Poster Image *</Label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'poster');
                  }}
                  className="hidden"
                  id="poster-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('poster-upload')?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Poster
                </Button>
                {formData.poster_path && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">✓ Uploaded</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInputChange('poster_path', '')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              {formData.poster_path && (
                <div className="mt-2">
                  <img
                    src={`https://gxzifrexmsouvfnriyym.supabase.co/storage/v1/object/public/${formData.poster_bucket}/${formData.poster_path}`}
                    alt="Preview"
                    className="w-32 h-40 object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Video MP4 Upload */}
            <div>
              <Label>Video MP4 (Optional)</Label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'video_mp4');
                  }}
                  className="hidden"
                  id="video-mp4-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('video-mp4-upload')?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload MP4
                </Button>
                {formData.video_mp4_path && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">✓ Uploaded</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInputChange('video_mp4_path', '')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Video WebM Upload */}
            <div>
              <Label>Video WebM (Optional)</Label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="file"
                  accept="video/webm"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'video_webm');
                  }}
                  className="hidden"
                  id="video-webm-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('video-webm-upload')?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload WebM
                </Button>
                {formData.video_webm_path && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">✓ Uploaded</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInputChange('video_webm_path', '')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading || uploading} className="flex-1">
            {loading ? 'Saving...' : isEdit ? 'Update Item' : 'Create Item'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/showcase')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}