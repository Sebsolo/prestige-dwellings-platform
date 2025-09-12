import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BookingCTAProps {
  label: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const BookingCTA = ({ label, variant = 'default', size = 'default', className }: BookingCTAProps) => {
  const [bookingUrl, setBookingUrl] = useState('#');

  useEffect(() => {
    const fetchBookingUrl = async () => {
      try {
        const { data: settings } = await supabase
          .from('site_settings')
          .select('booking_url')
          .single();
        
        if (settings?.booking_url) {
          setBookingUrl(settings.booking_url);
        } else {
          // Fallback to localStorage if database is not configured
          const savedBookingUrl = localStorage.getItem('booking_url') || '#';
          setBookingUrl(savedBookingUrl);
        }
      } catch (error) {
        console.log('Settings not yet configured, using localStorage fallback');
        const savedBookingUrl = localStorage.getItem('booking_url') || '#';
        setBookingUrl(savedBookingUrl);
      }
    };

    fetchBookingUrl();
  }, []);

  const handleClick = () => {
    if (bookingUrl && bookingUrl !== '#') {
      window.open(bookingUrl, '_blank');
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={handleClick}
      aria-label={`${label} - Ouvrir le lien de réservation`}
    >
      {label}
    </Button>
  );
};

export default BookingCTA;