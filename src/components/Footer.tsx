import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '@/assets/new-logo.webp';
import ctcLogo from '@/assets/logo-ctc.avif';
const Footer = () => {
  const {
    t
  } = useTranslation();
  return <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info - Hidden on mobile and tablet, shown on desktop only */}
          <div className="hidden lg:block space-y-4 lg:col-span-2" style={{ marginTop: '-3.4px', marginBottom: '-3.4px' }}>
            <Link to="/">
              <img 
                src={logo} 
                alt="Sebastien Pons Immobilier - eXp Realty" 
                className="h-60 w-auto"
              />
            </Link>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Services
            </h4>
            <div className="space-y-2">
              <Link to="/ventes" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.sales')}
              </Link>
              <Link to="/locations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.rentals')}
              </Link>
              <Link to="/qui-suis-je" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/estimation" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.valuation')}
              </Link>
              <Link to="/rejoindre-exp" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.joinExp')}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Légal
            </h4>
            <div className="space-y-2">
              <Link to="/mentions-legales" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.legalNotice')}
              </Link>
              <Link to="/rgpd" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacy')}
              </Link>
              <a href="https://www.expfrance.fr/fr/mentions-legales/honoraires" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>+33 6 01 77 10 11</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>sebastien@yvelines-immo.fr</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>Chavenay, France</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 col-span-full">
            <div className="flex justify-center space-x-4">
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
            
            {/* CTC Partnership */}
            <div className="flex flex-col items-center space-y-3 mt-6">
              <img 
                src={ctcLogo} 
                alt="Club de Tennis de Chavenay" 
                className="h-20 w-auto"
              />
              <p className="text-sm text-muted-foreground text-center">
                Fier d'être partenaire du Club de Tennis de Chavenay depuis 2024
              </p>
            </div>
          </div>

          {/* Company Info - Mobile and tablet, shown after menu */}
          <div className="lg:hidden space-y-4 col-span-full" style={{ marginTop: '-3.4px', marginBottom: '-3.4px' }}>
            <div className="flex justify-center">
              <Link to="/">
                <img 
                  src={logo} 
                  alt="Sebastien Pons Immobilier - eXp Realty" 
                  className="h-50 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sebastien Pons Immobilier. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0">
              
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;