import Layout from '@/components/Layout';
import SmartForm from '@/components/SmartForm';
import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <Layout title="Contact | Sebastien Pons Immobilier" description="Contactez Sebastien Pons, agent immobilier eXp. Téléphone, email et formulaire de contact disponibles.">
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
                Contactez-moi
              </h1>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Téléphone</p>
                    <a href="tel:0601771011" className="text-muted-foreground hover:text-primary transition-colors">
                      06 01 77 10 11
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a 
                      href="mailto:sebastien.pons@expfrance.fr" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      sebastien.pons@expfrance.fr
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <p className="font-medium text-foreground mb-4">Suivez-moi sur les réseaux</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/sebpons.immo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-secondary-foreground" />
                  </a>
                  <a 
                    href="https://www.instagram.com/sebpons_immo/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-secondary-foreground" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/sebastienpons88/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-secondary-foreground" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@SebastienPonsImmobilier" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5 text-secondary-foreground" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                Envoyez-moi un message
              </h2>
              
              <SmartForm 
                source="contact-page"
                title="Nouveau message depuis la page contact"
                description="Un visiteur a envoyé un message depuis la page de contact"
                className="space-y-6"
                onSuccess={() => {
                  // Form success is handled by SmartForm internally
                }}
              />
              
              <div className="mt-6 flex items-start space-x-3">
                <Checkbox id="privacy-policy" className="mt-1" />
                <Label htmlFor="privacy-policy" className="text-sm text-muted-foreground leading-relaxed">
                  J'ai lu et j'accepte la{' '}
                  <Link 
                    to="/mentions-legales" 
                    className="text-primary hover:underline"
                  >
                    politique de confidentialité
                  </Link>
                  {' '}de ce site
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;