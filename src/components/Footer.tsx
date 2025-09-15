import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.svg';
import expLogo from '@/assets/exp-logo.webp';
const Footer = () => {
  const {
    t
  } = useTranslation();
  return <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block space-y-4 -my-4 md:col-span-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img 
                src={logo} 
                alt="Sebastien Pons Immobilier" 
                className="h-48 md:h-64 w-auto"
              />
              <img 
                src={expLogo} 
                alt="eXp Realty" 
                className="h-16 md:h-20 w-auto"
              />
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

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Services
            </h4>
            <div className="space-y-2">
              <Link to="/ventes" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Ventes
              </Link>
              <Link to="/locations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Locations
              </Link>
              <Link to="/estimation" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Estimations
              </Link>
              <Link to="/rejoindre-exp" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Rejoindre eXp
              </Link>
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

          {/* Company Info - Mobile only, shown after menu */}
          <div className="md:hidden space-y-4 -my-4 col-span-full">
            <div className="flex flex-col items-center gap-4">
              <img 
                src={logo} 
                alt="Sebastien Pons Immobilier" 
                className="h-48 w-auto"
              />
              <img 
                src={expLogo} 
                alt="eXp Realty" 
                className="h-16 w-auto"
              />
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