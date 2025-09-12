import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/ventes', label: t('nav.sales') },
    { href: '/locations', label: t('nav.rentals') },
    { href: '/rejoindre-exp', label: t('nav.joinExp') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/estimation', label: t('nav.valuation') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-36 md:h-44">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mt-2 md:mt-4">
            <img 
              src="/lovable-uploads/logo_sebimmo.webp" 
              alt="Sebastien Pons Immobilier" 
              className="h-48 md:h-64 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Switcher & Login & Mobile menu button */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            
            {/* Login Button */}
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Admin
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border bg-card">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'block px-3 py-2 text-base font-medium transition-colors hover:text-primary',
                    isActive(item.href)
                      ? 'text-primary bg-muted'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile Login Button */}
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
