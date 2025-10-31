import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Star, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GoogleReview {
  id?: number;
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
  author_url?: string;
  sort_order?: number;
  active?: boolean;
}

const AdminTestimonials = () => {
  const [availableReviews, setAvailableReviews] = useState<GoogleReview[]>([]);
  const [selectedReviews, setSelectedReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingFromGoogle, setFetchingFromGoogle] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const { data: dbReviews, error } = await (supabase as any)
        .from('google_reviews_display')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      
      const mappedReviews = (dbReviews || []).map((r: any) => ({
        id: r.id,
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
        relative_time_description: r.relative_time_description,
        profile_photo_url: r.profile_photo_url,
        author_url: r.author_url,
        sort_order: r.sort_order,
        active: r.active
      }));
      
      setSelectedReviews(mappedReviews);
      
      await fetchFromGoogle();
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const fetchFromGoogle = async () => {
    try {
      setFetchingFromGoogle(true);
      
      const { data: settings } = await supabase
        .from('site_settings')
        .select('google_place_id')
        .single();

      if (!settings?.google_place_id) {
        toast.error('Place ID Google non configuré');
        return;
      }

      const { data, error } = await supabase.functions.invoke('fetchGoogleReviews', {
        body: { 
          placeId: settings.google_place_id
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data?.reviews) {
        setAvailableReviews(data.reviews);
        toast.success(`${data.reviews.length} avis chargés depuis Google Places`);
      } else {
        setAvailableReviews([]);
      }
    } catch (error) {
      console.error('Error fetching from Google:', error);
      toast.error('Erreur lors de la récupération des avis Google');
    } finally {
      setFetchingFromGoogle(false);
    }
  };

  const toggleReviewSelection = async (review: GoogleReview) => {
    try {
      const isSelected = selectedReviews.some(r => r.author_name === review.author_name);

      if (isSelected) {
        const { error } = await (supabase as any)
          .from('google_reviews_display')
          .delete()
          .eq('author_name', review.author_name);

        if (error) throw error;

        setSelectedReviews(prev => prev.filter(r => r.author_name !== review.author_name));
        toast.success('Avis retiré de la page d\'accueil');
      } else {
        const { data, error } = await (supabase as any)
          .from('google_reviews_display')
          .insert({
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time,
            relative_time_description: review.relative_time_description,
            profile_photo_url: review.profile_photo_url,
            author_url: review.author_url,
            sort_order: selectedReviews.length,
            active: true
          })
          .select()
          .single();

        if (error) throw error;

        const newReview: GoogleReview = {
          id: data.id,
          author_name: data.author_name,
          rating: data.rating,
          text: data.text,
          time: data.time,
          relative_time_description: data.relative_time_description,
          profile_photo_url: data.profile_photo_url,
          author_url: data.author_url,
          sort_order: data.sort_order,
          active: data.active
        };

        setSelectedReviews(prev => [...prev, newReview]);
        toast.success('Avis ajouté à la page d\'accueil');
      }
    } catch (error) {
      console.error('Error toggling review:', error);
      toast.error('Erreur lors de la modification');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const isReviewSelected = (review: GoogleReview) => {
    return selectedReviews.some(r => r.author_name === review.author_name);
  };

  console.log('Rendering AdminTestimonials:', { 
    availableReviewsCount: availableReviews.length, 
    selectedReviewsCount: selectedReviews.length,
    loading,
    fetchingFromGoogle 
  });

  return (
    <AdminLayout title="Gestion des avis Google" description="Sélectionnez les avis à afficher sur la page d'accueil">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Avis Google</h2>
            <p className="text-muted-foreground mt-1">
              {selectedReviews.length} avis sélectionnés pour la page d'accueil
            </p>
            <p className="text-sm text-muted-foreground">
              {availableReviews.length} avis disponibles depuis Google
            </p>
          </div>
          <Button onClick={fetchFromGoogle} disabled={fetchingFromGoogle}>
            <RefreshCw className={`mr-2 h-4 w-4 ${fetchingFromGoogle ? 'animate-spin' : ''}`} />
            Actualiser depuis Google Places
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableReviews.map((review, index) => {
              const selected = isReviewSelected(review);
              return (
                <Card key={index} className={selected ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{review.author_name}</CardTitle>
                        <CardDescription>{review.relative_time_description}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        {selected && (
                          <Badge variant="secondary" className="text-xs">
                            Affiché
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {review.text}
                    </p>
                    <Button
                      onClick={() => toggleReviewSelection(review)}
                      variant={selected ? 'destructive' : 'default'}
                      size="sm"
                      className="w-full"
                    >
                      {selected ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Retirer de la page d'accueil
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Afficher sur la page d'accueil
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && availableReviews.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Aucun avis trouvé</p>
              <Button onClick={fetchFromGoogle} disabled={fetchingFromGoogle} className="mt-4">
                <RefreshCw className={`mr-2 h-4 w-4 ${fetchingFromGoogle ? 'animate-spin' : ''}`} />
                Actualiser depuis Google Places
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;