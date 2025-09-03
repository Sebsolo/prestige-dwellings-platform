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
        retry: 'Réessayer',
        price: 'Prix',
        area: 'Surface',
        rooms: 'Pièces',
        bedrooms: 'Chambres',
        city: 'Ville',
        type: 'Type',
        filters: 'Filtres',
        search: 'Rechercher',
        reset: 'Réinitialiser',
        submit: 'Envoyer',
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        message: 'Message'
      },
      home: {
        title: 'Sebastien Pons Immobilier – France & International',
        subtitle: 'Votre expert en immobilier de prestige',
        hero_cta1: 'Estimation gratuite',
        hero_cta2: 'Rejoindre eXp',
        featured_title: 'Biens Vedettes',
        featured_subtitle: 'Une sélection exclusive de nos plus belles propriétés',
        testimonials_title: 'Ils nous font confiance',
        blog_title: 'Actualités Immobilières'
      },
      property: {
        visit_request: 'Demander une visite',
        similar_properties: 'Biens similaires',
        key_info: 'Informations clés',
        energy_performance: 'Performance énergétique',
        location: 'Localisation'
      },
      contact: {
        title: 'Nous contacter',
        subtitle: 'Une question ? Un projet ? Contactez-nous',
        form_sent: 'Votre message a été envoyé avec succès'
      },
      valuation: {
        title: 'Estimation gratuite',
        subtitle: 'Obtenez une estimation de votre bien en quelques minutes',
        property_type: 'Type de bien',
        property_address: 'Adresse du bien'
      },
      joinExp: {
        title: 'Rejoindre eXp Realty',
        subtitle: 'Développez votre carrière dans l\'immobilier',
        why_title: 'Pourquoi rejoindre eXp ?',
        faq_title: 'Questions fréquentes'
      },
      blog: {
        title: 'Blog Immobilier',
        subtitle: 'Conseils, actualités et tendances du marché immobilier',
        read_more: 'Lire la suite'
      },
      footer: {
        legalNotice: 'Mentions légales',
        privacy: 'RGPD',
        cookies: 'Cookies',
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
        retry: 'Retry',
        price: 'Price',
        area: 'Area',
        rooms: 'Rooms',
        bedrooms: 'Bedrooms',
        city: 'City',
        type: 'Type',
        filters: 'Filters',
        search: 'Search',
        reset: 'Reset',
        submit: 'Submit',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message'
      },
      home: {
        title: 'Sebastien Pons Real Estate – France & International',
        subtitle: 'Your luxury real estate expert',
        hero_cta1: 'Free valuation',
        hero_cta2: 'Join eXp',
        featured_title: 'Featured Properties',
        featured_subtitle: 'An exclusive selection of our finest properties',
        testimonials_title: 'They trust us',
        blog_title: 'Real Estate News'
      },
      property: {
        visit_request: 'Request a visit',
        similar_properties: 'Similar properties',
        key_info: 'Key information',
        energy_performance: 'Energy performance',
        location: 'Location'
      },
      contact: {
        title: 'Contact us',
        subtitle: 'A question? A project? Contact us',
        form_sent: 'Your message has been sent successfully'
      },
      valuation: {
        title: 'Free valuation',
        subtitle: 'Get a valuation of your property in minutes',
        property_type: 'Property type',
        property_address: 'Property address'
      },
      joinExp: {
        title: 'Join eXp Realty',
        subtitle: 'Develop your real estate career',
        why_title: 'Why join eXp?',
        faq_title: 'Frequently Asked Questions'
      },
      blog: {
        title: 'Real Estate Blog',
        subtitle: 'Tips, news and market trends',
        read_more: 'Read more'
      },
      footer: {
        legalNotice: 'Legal Notice',
        privacy: 'GDPR',
        cookies: 'Cookies',
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