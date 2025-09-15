import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Link } from 'react-router-dom';

// Create Supabase client directly to avoid type issues
const supabase = createClient(
  'https://gxzifrexmsouvfnriyym.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4emlmcmV4bXNvdXZmbnJpeXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODQxMjgsImV4cCI6MjA3MjQ2MDEyOH0.dzskAdKcCovaserGT3oS31FcnamAByfvnzTSEKLfAWU'
);

interface SmartFormProps {
  source?: string;
  propertyId?: string;
  title?: string;
  description?: string;
  className?: string;
  onSuccess?: () => void;
}

// Validation schema with Zod
const formSchema = z.object({
  firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(1, 'Le téléphone est obligatoire').refine(val => /^(?:\+33|0)[1-9](?:[0-9]{8})$/.test(val.replace(/\s/g, '')), 'Format de téléphone invalide (ex: 01 23 45 67 89)'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  privacyAccepted: z.boolean().refine(val => val === true, 'Vous devez accepter la politique de confidentialité'),
  honeypot: z.string().max(0, 'Spam détecté'), // Hidden field, should remain empty
});

type FormData = z.infer<typeof formSchema>;

const SmartForm = ({
  source = 'contact',
  propertyId,
  title = 'Contactez-nous',
  description = 'Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.',
  className,
  onSuccess
}: SmartFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
    privacyAccepted: false,
    honeypot: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const lastSubmitTime = useRef<number>(0);
  const { toast } = useToast();

  // Rate limiting - 1 submission per 30 seconds
  const RATE_LIMIT_MS = 30 * 1000;

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime.current;
    
    if (timeSinceLastSubmit < RATE_LIMIT_MS) {
      const remainingTime = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmit) / 1000);
      setIsRateLimited(true);
      toast({
        title: "Trop de tentatives",
        description: `Veuillez attendre ${remainingTime} secondes avant de renvoyer le formulaire.`,
        variant: "destructive"
      });
      
      // Reset rate limit after remaining time
      setTimeout(() => setIsRateLimited(false), remainingTime * 1000);
      return false;
    }
    
    return true;
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const insertLead = async () => {
    const leadData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      source,
      meta: {
        property_id: propertyId,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        referrer: document.referrer
      }
    };

    const { error } = await supabase
      .from('leads')
      .insert([leadData]);

    if (error) {
      console.error('Error inserting lead:', error);
      throw error;
    }
  };

  const sendEmail = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('sendEmail', {
        body: {
          type: 'lead_notification',
          lead: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            source,
            propertyId
          }
        }
      });

      if (error) {
        console.warn('Email sending failed:', error);
        // Don't throw error, email is optional
      } else {
        console.log('Email sent successfully:', data);
      }
    } catch (error) {
      console.warn('Email function not available or failed:', error);
      // Email sending is optional, continue with form submission
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit()) {
      return;
    }

    // Honeypot check
    if (formData.honeypot !== '') {
      console.warn('Honeypot triggered - potential spam');
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
      return;
    }

    // Validation
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    lastSubmitTime.current = Date.now();

    try {
      // Always insert lead in database first
      await insertLead();

      // Try to send email notification (optional)
      await sendEmail();

      toast({
        title: "Message envoyé !",
        description: "Votre message a bien été envoyé. Nous vous répondrons rapidement.",
        variant: "default"
      });

      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',
        privacyAccepted: false,
        honeypot: ''
      });

      onSuccess?.();

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className={cn('bg-card p-6 rounded-lg shadow-card', className)}>
      <div className="mb-6">
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <div className="hidden">
          <Label htmlFor="website">Website (do not fill)</Label>
          <Input
            id="website"
            name="website"
            type="text"
            value={formData.honeypot}
            onChange={(e) => handleInputChange('honeypot', e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstname">Prénom *</Label>
            <Input
              id="firstname"
              type="text"
              value={formData.firstname}
              onChange={(e) => handleInputChange('firstname', e.target.value)}
              className={errors.firstname ? 'border-destructive' : ''}
              disabled={isLoading}
              required
            />
            {errors.firstname && (
              <p className="text-sm text-destructive mt-1">{errors.firstname}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastname">Nom *</Label>
            <Input
              id="lastname"
              type="text"
              value={formData.lastname}
              onChange={(e) => handleInputChange('lastname', e.target.value)}
              className={errors.lastname ? 'border-destructive' : ''}
              disabled={isLoading}
              required
            />
            {errors.lastname && (
              <p className="text-sm text-destructive mt-1">{errors.lastname}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-destructive' : ''}
            disabled={isLoading}
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'border-destructive' : ''}
            disabled={isLoading}
            required
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={errors.message ? 'border-destructive' : ''}
            disabled={isLoading}
            required
          />
          {errors.message && (
            <p className="text-sm text-destructive mt-1">{errors.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="privacy-policy" 
              checked={formData.privacyAccepted}
              onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked as boolean)}
              disabled={isLoading}
              className="mt-1" 
            />
            <Label htmlFor="privacy-policy" className="text-sm text-muted-foreground leading-relaxed">
              J'ai lu et j'accepte la{' '}
              <Link 
                to="/mentions-legales" 
                className="text-primary hover:underline"
              >
                politique de confidentialité
              </Link>
              {' '}de ce site *
            </Label>
          </div>
          {errors.privacyAccepted && (
            <p className="text-sm text-destructive">{errors.privacyAccepted}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || isRateLimited || !formData.privacyAccepted}
          className="w-full"
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
        </Button>

        <p className="text-xs text-muted-foreground">
          * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées.
        </p>
      </form>
    </div>
  );
};

export default SmartForm;