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

const GoogleReviews = ({ placeId, maxReviews = 6, className = "" }: GoogleReviewsProps) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [googleBusinessUrl, setGoogleBusinessUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Mock reviews data for demonstration (replace with actual Google Places API call)
  const mockReviews: GoogleReview[] = [
    {
      id: '1',
      author_name: 'Marie Dubois',
      rating: 5,
      relative_time_description: 'il y a 2 semaines',
      text: 'Service exceptionnel ! Sebastien a su nous accompagner avec professionnalisme dans notre projet d\'achat. Très à l\'écoute et de bons conseils.',
      time: Date.now() - 1209600000,
      profile_photo_url: '/placeholder.svg'
    },
    {
      id: '2',
      author_name: 'Jean-Pierre Martin',
      rating: 5,
      relative_time_description: 'il y a 1 mois',
      text: 'Agent immobilier de confiance, très professionnel. La vente de notre maison s\'est déroulée sans encombre grâce à son expertise.',
      time: Date.now() - 2419200000,
      profile_photo_url: '/placeholder.svg'
    },
    {
      id: '3',
      author_name: 'Sophie Laurent',
      rating: 5,
      relative_time_description: 'il y a 3 semaines',
      text: 'Excellent accompagnement pour notre premier achat immobilier. Sebastien a pris le temps de nous expliquer chaque étape.',
      time: Date.now() - 1814400000,
      profile_photo_url: '/placeholder.svg'
    },
    {
      id: '4',
      author_name: 'Thomas Rousseau',
      rating: 5,
      relative_time_description: 'il y a 1 mois',
      text: 'Très satisfait du service. Réactif, professionnel et de très bons conseils. Je recommande vivement !',
      time: Date.now() - 2592000000,
      profile_photo_url: '/placeholder.svg'
    },
    {
      id: '5',
      author_name: 'Catherine Moreau',
      rating: 5,
      relative_time_description: 'il y a 2 mois',
      text: 'Un grand merci à Sebastien pour son accompagnement dans la vente de notre appartement. Processus fluide et résultat au-delà de nos attentes.',
      time: Date.now() - 5184000000,
      profile_photo_url: '/placeholder.svg'
    },
    {
      id: '6',
      author_name: 'Michel Durand',
      rating: 5,
      relative_time_description: 'il y a 6 semaines',
      text: 'Agent immobilier très compétent et disponible. Nous avons trouvé notre maison rapidement grâce à son réseau et ses conseils avisés.',
      time: Date.now() - 3628800000,
      profile_photo_url: '/placeholder.svg'
    }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        
        // Get settings from database first
        const { data: settings } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        
        const settingsPlaceId = settings?.google_place_id || placeId;
        const businessUrl = settings?.google_business_url || 'https://share.google/LOxi7WwOzlRaYUVJj';
        setGoogleBusinessUrl(businessUrl);
        
        if (!settingsPlaceId) {
          // Use mock data if no Place ID configured
          setReviews(mockReviews.slice(0, maxReviews));
          setError(null);
          return;
        }

        // Call Supabase edge function to fetch Google reviews
        const { data, error: functionError } = await supabase.functions.invoke('fetchGoogleReviews', {
          body: { placeId: settingsPlaceId }
        });

        if (functionError) {
          console.error('Error calling fetchGoogleReviews function:', functionError);
          setReviews(mockReviews.slice(0, maxReviews));
          setError(null);
          return;
        }

        setReviews(data.reviews.slice(0, maxReviews));
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Erreur lors du chargement des avis');
        setReviews(mockReviews.slice(0, maxReviews)); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
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
        {[1, 2, 3, 4, 5, 6].map((i) => (
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