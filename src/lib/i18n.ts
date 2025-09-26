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
        message: 'Message',
        readMore: 'Lire la suite',
        seeAll: 'Voir tous les articles',
        comingSoon: 'Bientôt disponible',
        noResults: 'Aucun résultat trouvé',
        close: 'Fermer',
        viewDetails: 'Voir le détail'
      },
      home: {
        title: 'Sebastien Pons Immobilier',
        subtitle: 'Votre expert en immobilier de prestige',
        hero_cta1: 'Estimation gratuite',
        hero_cta2: 'Rejoindre eXp',
        featured_title: 'Biens Vedettes',
        featured_subtitle: 'Une sélection exclusive de nos plus belles propriétés',
        services: {
          title: 'Mes services',
          subtitle: 'Mon rôle : maximiser la valeur de votre bien, communiquer clairement à chaque étape et rester disponible quand vous en avez besoin.',
          card1: {
            title: 'Mise en valeur du bien',
            bullet1: 'Photos professionnelles & plans clairs',
            bullet2: 'Présentation du bien en video',
            bullet3: 'Diffusion ciblée (portails + réseaux + acheteurs qualifiés)'
          },
          card2: {
            title: 'Échange & transparence',
            bullet1: 'Un brief clair dès le départ (prix, délais, stratégie)',
            bullet2: 'Compte-rendu régulier des visites & retours',
            bullet3: 'Conseils actionnables jusqu\'à la signature'
          },
          card3: {
            title: 'Disponibilité & réactivité',
            bullet1: 'Réponses rapides, créneaux de visite élargis',
            bullet2: 'Coordination artisans/diagnostics si besoin',
            bullet3: 'Suivi administratif jusqu\'à l\'acte'
          },
          cta_primary: 'Demander une estimation',
          cta_secondary: 'Me contacter'
        },
        testimonials_title: 'Ils nous font confiance',
        testimonials_subtitle: 'Découvrez les avis de nos clients sur Google Business',
        blog_title: 'Actualités Immobilières',
        blog_subtitle: 'Découvrez nos dernières analyses et conseils sur le marché immobilier',
        valuation_cta_title: 'Estimation gratuite',
        valuation_cta_subtitle: 'Obtenez une estimation gratuite de votre bien en quelques minutes',
        valuation_cta_button: 'Demander une estimation',
        no_featured_properties: 'Aucun bien vedette disponible pour le moment',
        article_preview: 'Article à venir #{{number}}',
        article_preview_description: 'Découvrez les tendances du marché immobilier...'
      },
      contact: {
        title: 'Contactez-moi',
        form_title: 'Envoyez-moi un message',
        form_description: 'Remplissez le formulaire ci-dessous et je vous répondrai rapidement.',
        phone_label: 'Téléphone',
        email_label: 'Email',
        social_follow: 'Suivez-moi sur les réseaux',
        form_sent: 'Votre message a été envoyé avec succès'
      },
      valuation: {
        title: 'Estimation gratuite',
        subtitle: 'Obtenez une estimation de votre bien en quelques minutes',
        property_type: 'Type de bien',
        property_address: 'Adresse du bien',
        free_tag: '100% gratuit',
        no_commitment: 'Sans engagement',
        personalized_expertise: 'Expertise personnalisée',
        steps: {
          step1_title: 'Informations du bien',
          step1_desc: 'Renseignez les caractéristiques de votre propriété',
          step2_title: 'Analyse personnalisée',
          step2_desc: 'Notre agent analyse votre bien en détail',
          step3_title: 'Rapport d\'estimation',
          step3_desc: 'Recevez votre estimation par notre expert'
        },
        form_title: 'Demande d\'estimation',
        form_description: 'Remplissez ce formulaire pour recevoir une estimation personnalisée de votre bien par notre expert.'
      },
      property: {
        visit_request: 'Demander une visite',
        similar_properties: 'Biens similaires',
        key_info: 'Informations clés',
        energy_performance: 'Performance énergétique',
        location: 'Localisation',
        loading: 'Chargement...',
        not_found: 'Bien immobilier non trouvé',
        not_found_desc: 'Le bien que vous recherchez n\'existe pas ou n\'est plus disponible.',
        no_images: 'Aucune image disponible',
        per_month: ' / mois',
        price_on_request: 'Prix sur demande',
        bedrooms: 'chambres',
        rooms: 'pièces',
        description: 'Description',
        no_description: 'Aucune description disponible.',
        virtual_tour: 'Visite virtuelle',
        enlarge: 'Agrandir',
        visit_form_title: 'Demande de visite',
        visit_form_desc: 'Remplissez le formulaire pour demander une visite de ce bien.',
        similar_property: 'Villa similaire'
      },
      joinExp: {
        hero_badge: 'Indépendant, mais jamais seul',
        hero_title: 'Rejoindre eXp : libérez votre potentiel d\'agent immobilier',
        hero_subtitle: 'Un modèle clair, des outils puissants et un réseau international — tout en restant 100% entrepreneur.',
        hero_cta1: 'Réserver un rendez-vous',
        hero_cta2: 'Parler à Sébastien',
        dashboard_title: 'Tableau de bord agent',
        dashboard_subtitle: 'Outils de gestion intégrés',
        key_conditions_title: 'Les conditions clés en France',
        key_conditions_subtitle: 'Modèle transparent : split initial, 100% après cap, revenu partagé à 7 niveaux et opportunités en actions dont l\'award ICON.',
        why_title: 'Pourquoi eXp ?',
        steps_title: 'Démarrer en 4 étapes',
        calculator_title: 'Calculez votre potentiel de revenus eXp',
        calculator_subtitle: 'Ajustez les hypothèses et visualisez un ordre de grandeur (à titre indicatif).',
        faq_title: 'Questions fréquentes',
        legal_notice: 'Informations indicatives susceptibles d\'évolution. Détails, conditions et éligibilité selon la politique eXp France en vigueur.',
        sticky_cta: 'Prêt à en parler ?',
        sticky_cta_button: 'Réserver un rendez-vous'
      },
      blog: {
        title: 'Blog Immobilier',
        subtitle: 'Conseils, actualités et tendances du marché immobilier',
        read_more: 'Lire la suite'
      },
      sales: {
        title: 'Propriétés à Vendre',
        count: '{{count}} bien trouvé',
        count_plural: '{{count}} biens trouvés',
        no_results: 'Aucun bien ne correspond à vos critères',
        grid_view: 'Grille',
        map_view: 'Carte'
      },
      rentals: {
        title: 'Propriétés en Location',
        count: '{{count}} bien trouvé',
        count_plural: '{{count}} biens trouvés',
        no_results: 'Aucun bien ne correspond à vos critères',
        grid_view: 'Grille',
        map_view: 'Carte'
      },
      footer: {
        legalNotice: 'Mentions légales',
        privacy: 'RGPD',
        cookies: 'Cookies',
        terms: 'Honoraires'
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
        message: 'Message',
        readMore: 'Read more',
        seeAll: 'See all articles',
        comingSoon: 'Coming soon',
        noResults: 'No results found',
        close: 'Close',
        viewDetails: 'View details'
      },
      home: {
        title: 'Sebastien Pons Real Estate',
        subtitle: 'Your luxury real estate expert',
        hero_cta1: 'Free valuation',
        hero_cta2: 'Join eXp',
        featured_title: 'Featured Properties',
        featured_subtitle: 'An exclusive selection of our finest properties',
        services: {
          title: 'My services',
          subtitle: 'My role: maximize the value of your property, communicate clearly at each step and remain available when you need it.',
          card1: {
            title: 'Property enhancement',
            bullet1: 'Professional photos & clear plans',
            bullet2: 'Video property presentation',
            bullet3: 'Targeted distribution (portals + networks + qualified buyers)'
          },
          card2: {
            title: 'Exchange & transparency',
            bullet1: 'Clear brief from the start (price, timeline, strategy)',
            bullet2: 'Regular reports on visits & feedback',
            bullet3: 'Actionable advice until signing'
          },
          card3: {
            title: 'Availability & responsiveness',
            bullet1: 'Quick responses, extended visit slots',
            bullet2: 'Coordination of craftsmen/diagnostics if needed',
            bullet3: 'Administrative follow-up until the deed'
          },
          cta_primary: 'Request a valuation',
          cta_secondary: 'Contact me'
        },
        testimonials_title: 'They trust us',
        testimonials_subtitle: 'Discover our clients\' reviews on Google Business',
        blog_title: 'Real Estate News',
        blog_subtitle: 'Discover our latest analysis and advice on the real estate market',
        valuation_cta_title: 'Free valuation',
        valuation_cta_subtitle: 'Get a free valuation of your property in minutes',
        valuation_cta_button: 'Request a valuation',
        no_featured_properties: 'No featured properties available at the moment',
        article_preview: 'Upcoming article #{{number}}',
        article_preview_description: 'Discover real estate market trends...'
      },
      contact: {
        title: 'Contact me',
        form_title: 'Send me a message',
        form_description: 'Fill out the form below and I will reply quickly.',
        phone_label: 'Phone',
        email_label: 'Email',
        social_follow: 'Follow me on social media',
        form_sent: 'Your message has been sent successfully'
      },
      valuation: {
        title: 'Free valuation',
        subtitle: 'Get a valuation of your property in minutes',
        property_type: 'Property type',
        property_address: 'Property address',
        free_tag: '100% free',
        no_commitment: 'No commitment',
        personalized_expertise: 'Personalized expertise',
        steps: {
          step1_title: 'Property information',
          step1_desc: 'Provide your property characteristics',
          step2_title: 'Personalized analysis',
          step2_desc: 'Our agent analyzes your property in detail',
          step3_title: 'Valuation report',
          step3_desc: 'Receive your estimate from our expert'
        },
        form_title: 'Valuation request',
        form_description: 'Fill out this form to receive a personalized valuation of your property by our expert.'
      },
      property: {
        visit_request: 'Request a visit',
        similar_properties: 'Similar properties',
        key_info: 'Key information',
        energy_performance: 'Energy performance',
        location: 'Location',
        loading: 'Loading...',
        not_found: 'Property not found',
        not_found_desc: 'The property you are looking for does not exist or is no longer available.',
        no_images: 'No images available',
        per_month: ' / month',
        price_on_request: 'Price on request',
        bedrooms: 'bedrooms',
        rooms: 'rooms',
        description: 'Description',
        no_description: 'No description available.',
        virtual_tour: 'Virtual tour',
        enlarge: 'Enlarge',
        visit_form_title: 'Visit request',
        visit_form_desc: 'Fill out the form to request a visit for this property.',
        similar_property: 'Similar villa'
      },
      joinExp: {
        hero_badge: 'Independent, but never alone',
        hero_title: 'Join eXp: unleash your potential as a real estate agent',
        hero_subtitle: 'A clear model, powerful tools and an international network — while remaining 100% entrepreneur.',
        hero_cta1: 'Book an appointment',
        hero_cta2: 'Talk to Sebastien',
        dashboard_title: 'Agent dashboard',
        dashboard_subtitle: 'Integrated management tools',
        key_conditions_title: 'Key conditions in France',
        key_conditions_subtitle: 'Transparent model: initial split, 100% after cap, revenue shared over 7 levels and opportunities in shares including the ICON award.',
        why_title: 'Why eXp?',
        steps_title: 'Get started in 4 steps',
        calculator_title: 'Calculate your eXp revenue potential',
        calculator_subtitle: 'Adjust assumptions and visualize an order of magnitude (for information only).',
        faq_title: 'Frequently Asked Questions',
        legal_notice: 'Indicative information subject to change. Details, conditions and eligibility according to current eXp France policy.',
        sticky_cta: 'Ready to talk?',
        sticky_cta_button: 'Book an appointment'
      },
      blog: {
        title: 'Real Estate Blog',
        subtitle: 'Tips, news and market trends',
        read_more: 'Read more'
      },
      sales: {
        title: 'Properties for Sale',
        count: '{{count}} property found',
        count_plural: '{{count}} properties found',
        no_results: 'No properties match your criteria',
        grid_view: 'Grid',
        map_view: 'Map'
      },
      rentals: {
        title: 'Properties for Rent',
        count: '{{count}} property found',
        count_plural: '{{count}} properties found',
        no_results: 'No properties match your criteria',
        grid_view: 'Grid',
        map_view: 'Map'
      },
      footer: {
        legalNotice: 'Legal Notice',
        privacy: 'GDPR',
        cookies: 'Cookies',
        terms: 'Fees'
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