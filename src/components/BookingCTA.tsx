import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface BookingCTAProps {
  label: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const BookingCTA = ({ label, variant = 'default', size = 'default', className }: BookingCTAProps) => {
  const [bookingUrl, setBookingUrl] = useState('#');

  useEffect(() => {
    // In a real implementation, this would fetch from admin settings
    // For now, we'll use a fallback
    const savedBookingUrl = localStorage.getItem('booking_url') || '#';
    setBookingUrl(savedBookingUrl);
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