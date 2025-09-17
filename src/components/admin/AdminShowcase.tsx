import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, EyeOff, GripVertical, Image, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { ShowcaseItem } from '@/types/showcase';

export default function AdminShowcase() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ShowcaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('showcase_items')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching showcase items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load showcase items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.location_label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price_label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (groupFilter) {
      filtered = filtered.filter(item => item.group_slug === groupFilter);
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, groupFilter]);

  const togglePublished = async (id: number, published: boolean) => {
    try {
      const { error } = await supabase
        .from('showcase_items')
        .update({ published })
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, published } : item
      ));

      toast({
        title: 'Success',
        description: `Item ${published ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: 'Error',
        description: 'Failed to update item',
        variant: 'destructive',
      });
    }
  };

  const addDemoData = async () => {
    const demoItems = [
      {
        group_slug: 'default',
        location_label: 'Portimão, Portugal',
        price_label: '4 900 000 €',
        detail_url: '/properties/portimao-portugal',
        poster_bucket: 'showcase-posters',
        poster_path: 'demo/portimao.jpg',
        published: true,
        sort_order: 1,
      },
      {
        group_slug: 'default',
        location_label: 'Côte d\'Azur, France',
        price_label: '49 500 000 €',
        detail_url: '/properties/cote-azur-france',
        poster_bucket: 'showcase-posters',
        poster_path: 'demo/cote-azur.jpg',
        published: true,
        sort_order: 2,
      },
      {
        group_slug: 'default',
        location_label: 'Paros, Greece',
        price_label: '6 400 000 €',
        detail_url: '/properties/paros-greece',
        poster_bucket: 'showcase-posters',
        poster_path: 'demo/paros.jpg',
        published: true,
        sort_order: 3,
      },
      {
        group_slug: 'default',
        location_label: 'Porto Cervo, Sardinia',
        price_label: 'Prix sur demande',
        detail_url: '/properties/porto-cervo-sardinia',
        poster_bucket: 'showcase-posters',
        poster_path: 'demo/porto-cervo.jpg',
        published: true,
        sort_order: 4,
      },
    ];

    try {
      const { error } = await supabase
        .from('showcase_items')
        .insert(demoItems);

      if (error) throw error;

      await fetchItems();
      toast({
        title: 'Success',
        description: 'Demo data added successfully',
      });
    } catch (error) {
      console.error('Error adding demo data:', error);
      toast({
        title: 'Error',
        description: 'Failed to add demo data',
        variant: 'destructive',
      });
    }
  };

  const uniqueGroups = [...new Set(items.map(item => item.group_slug))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading showcase items...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Luxury Video Showcase</h1>
        <div className="flex gap-2">
          <Button onClick={addDemoData} variant="outline">
            Add Demo Data
          </Button>
          <Button asChild>
            <Link to="/admin/showcase/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Showcase Item
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by location or price..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-48">
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">All Groups</option>
                {uniqueGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      <div className="grid gap-4">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No showcase items found</p>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="group">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Poster Preview */}
                  <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                    {item.poster_path ? (
                      <img
                        src={`https://gxzifrexmsouvfnriyym.supabase.co/storage/v1/object/public/${item.poster_bucket}/${item.poster_path}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold truncate">{item.location_label}</h3>
                      <Badge variant="secondary">{item.group_slug}</Badge>
                      {(item.video_mp4_path || item.video_webm_path) && (
                        <Badge variant="outline">
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.price_label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sort: {item.sort_order} | Created: {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={item.published}
                        onCheckedChange={(checked) => togglePublished(item.id, checked)}
                      />
                      <span className="text-sm">
                        {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </span>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/admin/showcase/edit/${item.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}