import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        sales: 'Ventes',
        rentals: 'Locations',
        joinExp: 'Rejoindre eXp',
        blog: 'Blog',
        valuation: 'Estimation',
        contact: 'Contact'
      },
      common: {
        loading: 'Chargement...',
        error: 'Une erreur est survenue',
        retry: 'Réessayer'
      },
      home: {
        title: 'Immobilier de Prestige',
        subtitle: 'Découvrez nos propriétés d\'exception'
      },
      footer: {
        legalNotice: 'Mentions légales',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        sales: 'Sales',
        rentals: 'Rentals',
        joinExp: 'Join eXp',
        blog: 'Blog',
        valuation: 'Valuation',
        contact: 'Contact'
      },
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        retry: 'Retry'
      },
      home: {
        title: 'Luxury Real Estate',
        subtitle: 'Discover our exceptional properties'
      },
      footer: {
        legalNotice: 'Legal Notice',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;