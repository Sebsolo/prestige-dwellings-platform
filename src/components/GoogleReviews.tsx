import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId?: string;
  maxReviews?: number;
  className?: string;
}

const GoogleReviews = ({ placeId, maxReviews = 3, className = "" }: GoogleReviewsProps) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [googleBusinessUrl, setGoogleBusinessUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Prioritized reviews data
  const mockReviews: GoogleReview[] = [
    {
      id: '1',
      author_name: 'Remi Destang',
      rating: 5,
      relative_time_description: 'il y a 2 semaines',
      text: 'Service exceptionnel ! Sebastien a su nous accompagner avec professionnalisme dans notre projet d\'achat. Très à l\'écoute et de bons conseils.',
      time: Date.now() - 1209600000,
      profile_photo_url: '/placeholder.svg'
    },
    {
      id: '2',
      author_name: 'Julien Pelloile',
      rating: 5,
      relative_time_description: 'il y a 1 mois',
      text: 'Agent immobilier de confiance, très professionnel. La vente de notre maison s\'est déroulée sans encombre grâce à son expertise.',
      time: Date.now() - 2419200000,
      profile_photo_url: '/placeholder.svg'
    },
    {
      id: '3',
      author_name: 'Floriane Chatelain',
      rating: 5,
      relative_time_description: 'il y a 3 semaines',
      text: 'Excellent accompagnement pour notre premier achat immobilier. Sebastien a pris le temps de nous expliquer chaque étape.',
      time: Date.now() - 1814400000,
      profile_photo_url: '/placeholder.svg'
    }
  ];

  useEffect(() => {
    // Defer Google Reviews to reduce critical path
    const timer = setTimeout(() => {
      const fetchReviews = async () => {
        try {
          setLoading(true);
          
          // Try to get settings from localStorage first (fallback)
          const fallbackBusinessUrl = 'https://share.google/LOxi7WwOzlRaYUVJj';
          setGoogleBusinessUrl(fallbackBusinessUrl);
          
          // Try to get settings from database
          try {
            const { data: settings } = await supabase
              .from('site_settings')
              .select('google_business_url, google_place_id')
              .single();
            
            if (settings?.google_business_url) {
              setGoogleBusinessUrl(settings.google_business_url);
            }
            
            const settingsPlaceId = settings?.google_place_id || placeId;
            
            if (!settingsPlaceId) {
              // Use mock data if no Place ID configured
              setReviews(mockReviews);
              setError(null);
              return;
            }

            // Call Supabase edge function to fetch Google reviews
            const { data, error: functionError } = await supabase.functions.invoke('fetchGoogleReviews', {
              body: { placeId: settingsPlaceId }
            });

            if (functionError) {
              console.error('Error calling fetchGoogleReviews function:', functionError);
              setReviews(mockReviews);
              setError(null);
              return;
            }

            // Filter for priority reviewers first, then others, limited to 3
            const priorityNames = ['Remi Destang', 'Julien Pelloile', 'Floriane Chatelain'];
            const priorityReviews = data.reviews.filter((review: GoogleReview) => 
              priorityNames.includes(review.author_name)
            );
            const otherReviews = data.reviews.filter((review: GoogleReview) => 
              !priorityNames.includes(review.author_name)
            );
            
            const finalReviews = [...priorityReviews, ...otherReviews].slice(0, 3);
            setReviews(finalReviews);
            setError(null);
          } catch (dbError) {
            console.log('Database not yet configured, using mock data:', dbError);
            setReviews(mockReviews);
            setError(null);
          }
          
        } catch (err) {
          console.error('Error fetching reviews:', err);
          setError('Erreur lors du chargement des avis');
          setReviews(mockReviews); // Fallback to mock data
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }, 200); // Defer by 200ms to prioritize critical content

    return () => clearTimeout(timer);
  }, [placeId, maxReviews]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-background rounded-2xl p-6 shadow-card animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-background rounded-2xl p-6 shadow-card hover:shadow-luxury transition-shadow duration-300"
          >
            <div className="flex items-start space-x-3 mb-4">
              <img
                src={review.profile_photo_url || '/placeholder.svg'}
                alt={review.author_name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate">{review.author_name}</h3>
                  {renderStars(review.rating)}
                </div>
                <p className="text-xs text-muted-foreground">{review.relative_time_description}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {truncateText(review.text)}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button 
          variant="outline" 
          className="group"
          onClick={() => window.open(googleBusinessUrl || 'https://share.google/LOxi7WwOzlRaYUVJj', '_blank')}
        >
          Voir tous les avis Google
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default GoogleReviews;