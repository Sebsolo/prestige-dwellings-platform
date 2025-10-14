import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        sales: 'Ventes',
        rentals: 'Locations',
        about: 'Qui suis-je ?',
        joinExp: 'Rejoindre eXp',
        blog: 'Blog',
        valuation: 'Estimation',
        contact: 'Contact'
      },
      about: {
        title: 'Qui suis-je ?',
        h1: 'Qui suis-je ?',
        meta_title: 'Qui suis-je — Sébastien Pons Immobilier (Chavenay & Ouest Parisien)',
        meta_description: 'Présentation de Sébastien Pons, conseiller immobilier à Chavenay depuis 2017. Transparence, rigueur, réactivité et accompagnement complet.',
        nav: {
          hero: 'Introduction',
          intro: 'Présentation',
          parcours: 'Mon parcours',
          methode: 'Ma méthode',
          ancrage: 'Ancrage local',
          reseau: 'Mon réseau',
          motivation: 'Motivation',
          resume: 'En résumé',
          contact: 'Contact'
        },
        hero: {
          lead: 'Bonjour, je suis Sébastien Pons.',
          cta_primary: 'Demander une estimation',
          cta_secondary: 'Me contacter'
        },
        intro: {
          p1: 'J\'habite à Chavenay depuis 2017, et j\'y exerce mon activité d\'agent immobilier. J\'ai choisi ce village pour sa tranquillité, sa qualité de vie et sa proximité avec les grands pôles de l\'Ouest parisien. C\'est un lieu à taille humaine, où il est encore possible de prendre le temps d\'échanger, d\'écouter et de comprendre les projets de chacun.'
        },
        parcours: {
          title: 'Mon parcours',
          p1: 'Avant de me tourner vers l\'immobilier, j\'ai travaillé plusieurs années dans des environnements où la rigueur, la clarté et la fiabilité étaient essentielles. Ces expériences m\'ont appris à être précis, à bien préparer chaque dossier et à anticiper les imprévus. Ce sont ces compétences que j\'applique aujourd\'hui dans mon métier, au service de mes clients.',
          international: {
            title: 'Une expérience internationale utile',
            text: 'J\'ai également vécu en Espagne et aux États-Unis. Cette exposition à d\'autres cultures et façons de communiquer m\'aide à travailler sereinement avec des profils variés (expatriés, investisseurs, familles en mobilité), à anticiper les attentes et à faciliter des échanges clairs, parfois en bilingue.'
          },
          p2: 'J\'ai choisi l\'immobilier par goût du contact et par intérêt réel pour les lieux de vie. Derrière chaque projet, il y a une histoire, une transition, une envie d\'évolution. Mon rôle est d\'accompagner cette étape avec méthode, transparence et bienveillance.'
        },
        methode: {
          title: 'Ma façon de travailler',
          item1: 'Écouter avant de proposer. Je prends le temps de comprendre la situation, le rythme et les attentes de mes clients avant d\'agir.',
          item2: 'Dire les choses simplement. Je décris les biens avec réalisme, sans exagération, et j\'explique les points techniques de manière accessible.',
          item3: 'Être réactif et constant. Un message mérite une réponse claire et rapide. La disponibilité fait partie intégrante de mon travail.',
          item4: 'Accompagner jusqu\'au bout. Je reste présent à chaque étape : estimation, stratégie, visites, négociation, signature et remise des clés.',
          conclusion: 'Mon approche se veut à la fois professionnelle et humaine : l\'objectif n\'est pas seulement de vendre ou d\'acheter, mais de faire aboutir un projet dans les meilleures conditions possibles.'
        },
        ancrage: {
          title: 'Mon ancrage local',
          p1: 'Basé à Chavenay, j\'interviens sur un large secteur qui couvre l\'ouest des Yvelines et les communes voisines. De Saint-Germain-en-Laye à Montfort-l\'Amaury, de Feucherolles à Villennes-sur-Seine, je connais les spécificités de chaque environnement : les écoles, les transports, les quartiers calmes ou les zones plus dynamiques.',
          p2: 'Vivre et travailler ici me permet d\'avoir un regard concret sur l\'évolution du marché, les opportunités réelles et les attentes des acheteurs. Je m\'appuie sur cette connaissance du terrain pour proposer des estimations justes et des conseils adaptés. Je suis également engagé dans la vie locale : partenaire du club de tennis de Chavenay depuis 2024, je soutiens la vie associative du village.'
        },
        reseau: {
          title: 'Mon réseau : eXp',
          p1: 'Être acteur local n\'empêche pas de s\'appuyer sur des ressources d\'envergure. Au quotidien, je bénéficie de la plateforme eXp (diffusion internationale, données marché, marketing avancé) tout en préservant un suivi personnalisé avec un interlocuteur unique : moi. Je fais également partie de la team ',
          p2: ', un environnement qui stimule la veille, le partage d\'expérience et l\'exigence opérationnelle — pour des missions menées avec méthode, transparence et réactivité.'
        },
        motivation: {
          title: 'Ce qui me motive',
          p1: 'Chaque mission est différente, mais le fil conducteur reste le même : créer une relation de confiance. Je veux que mes clients se sentent accompagnés avec sérieux, qu\'ils comprennent chaque étape du processus, et qu\'ils aient la certitude d\'avancer dans la bonne direction.',
          p2: 'La satisfaction de voir un projet se concrétiser, souvent après des semaines d\'échanges et de préparation, reste ce qui me motive le plus.'
        },
        resume: {
          title: 'En résumé',
          item: 'Je privilégie la transparence, la rigueur, la réactivité et le suivi personnalisé.',
          conclusion: 'Mon objectif : que chaque client se sente écouté, compris et soutenu — du premier échange jusqu\'à la remise des clés.'
        },
        cta: {
          title: 'Et si on faisait connaissance ?',
          text: 'Que vous souhaitiez vendre, acheter ou simplement faire estimer un bien, je suis disponible pour en discuter. Un café, une visite ou un simple échange téléphonique permettent souvent d\'y voir plus clair.',
          cta_primary: 'Demander une estimation',
          cta_secondary: 'Me contacter'
        }
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
        article_preview_description: 'Découvrez les tendances du marché immobilier...',
        presentation: {
          title: 'Proximité terrain, portée globale',
          subtitle: 'Un suivi exigeant sur l\'Ouest parisien, une audience élargie grâce au réseau eXp',
          local_title: 'Acteur local, adossé à un groupe international',
          local_description: 'Installé dans les Yvelines (78), j\'interviens au plus près de vos projets sur Chavenay, Saint-Nom-la-Bretèche et Feucherolles, tout en me déplaçant à Paris et dans les Hauts-de-Seine (92). Cette proximité terrain assure des conseils précis et une mise en valeur adaptée à chaque micro-marché.',
          network_title: 'La force d\'un réseau mondial pour amplifier vos résultats',
          network_description: 'Je m\'appuie sur eXp, un groupe international "cloud-based" présent dans plus de 25 pays et réunissant plus de 80 000 conseillers (données 2025). Concrètement : diffusion étendue des annonces, accès à des acheteurs en mobilité (France & international) et recommandations croisées entre professionnels pour accélérer les mises en relation qualifiées.',
          benefits_title: 'Ce que cela change pour vous',
          benefit1_title: 'Audience élargie',
          benefit1_description: 'Visibilité France + international via le réseau eXp, tout en gardant un pilotage local de votre dossier.',
          benefit2_title: 'Réactivité & coordination',
          benefit2_description: 'Un interlocuteur unique qui orchestre estimation, stratégie de commercialisation, home staging et négociation, jusqu\'à la signature.',
          benefit3_title: 'Qualité de présentation',
          benefit3_description: 'Photos dédiées, textes soignés et parcours digital fluide pour défendre le prix et accélérer la transaction.',
          commitment_title: 'Un accompagnement clair et exigeant',
          commitment_description: 'Vente, achat ou location : je privilégie des échanges directs, des informations utiles et des décisions rapides. Votre projet bénéficie à la fois de l\'ancrage local et de la puissance d\'un réseau international — sans lourdeurs ni intermédiaires superflus.',
        }
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
        similar_property: 'Villa similaire',
        type: {
          apartment: 'Appartement',
          house: 'Maison',
          commercial: 'Commercial',
          land: 'Terrain',
          garage: 'Garage / Parking',
          other: 'Autre',
        },
        transaction: {
          sale: 'Vente',
          rent: 'Location',
        },
        status: {
          sold: 'Vendu',
          under_offer: 'Sous offre',
          rented: 'Loué',
        },
        card: {
          rooms: 'pièces',
          land: 'terrain',
          garage: 'garage',
          perMonth: '/mois CC',
          seeDetails: 'Voir le détail',
        }
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
        key_conditions: {
          commission: 'Commission dès votre première vente',
          cap: 'Après 80 000€ HT de CA (cap)',
          revshare: 'Programme de partage des revenus (revshare)',
          shares: 'en actions — Récompense ICON (sous conditions)'
        },
        why_title: 'Pourquoi eXp ?',
        advantages: {
          tools: {
            title: 'Outils & marketing',
            description: 'CRM, e-signature, diffusion, estimation, kit marketing.'
          },
          training: {
            title: 'Formation continue',
            description: 'Sessions régulières + Loi ALUR, mentoring, masterclasses.'
          },
          network: {
            title: 'Réseau & co-mandats',
            description: 'Synergies locales et internationales (plus de 20 pays).'
          },
          freedom: {
            title: 'Liberté d\'entreprendre',
            description: 'Marque locale, agenda et style propres.'
          },
          equity: {
            title: 'Équité (actions)',
            description: 'Actions à des jalons clés + award ICON.'
          },
          workspace: {
            title: 'Espaces de travail',
            description: 'Accès Regus + plateforme collaborative cloud.'
          }
        },
        steps_title: 'Démarrer en 4 étapes',
        steps: {
          discovery: {
            title: 'Échange découverte',
            description: '20–30 min'
          },
          audit: {
            title: 'Audit & projection',
            description: 'Marges, visibilité, pipeline'
          },
          onboarding: {
            title: 'Onboarding 30 jours',
            description: 'Outils, templates, routines'
          },
          launch: {
            title: 'Lancement',
            description: 'Rituels commerciaux & suivi'
          }
        },
        calculator_title: 'Calculez votre potentiel de revenus eXp',
        calculator_subtitle: 'Ajustez les hypothèses et visualisez un ordre de grandeur (à titre indicatif).',
        revshare_calculator: {
          title: 'Calculateur RevShare',
          subtitle: 'Estimez vos revenus passifs avec le système de partage des revenus eXp sur 7 niveaux',
          calculation_params: 'Paramètres de calcul',
          level_configuration: 'Configuration par niveau',
          agent_count: 'Nombre d\'agents',
          avg_revenue: 'CA moyen/agent (€)',
          apql_label: 'APQL (Agents Partenaires Qualifiés Licenciés)',
          apql_description: 'Nombre d\'agents qualifiés L1 dans votre organisation (débloque les niveaux)',
          bonus_label: 'Bonus RevShare (%)',
          bonus_description: 'Bonus supplémentaire conditionnel appliqué au total (0-100%). En moyenne de 40 %',
          how_it_works: '💡 Comment ça marche ?',
          how_it_works_desc: 'Le RevShare eXp calcule vos revenus basés sur le nombre d\'agents et leur CA moyen par niveau. Les niveaux 4-7 nécessitent un certain nombre d\'APQL pour être débloqués.',
          estimated_revenue: 'Revenus estimés par niveau',
          bonus_revshare: 'Bonus RevShare',
          applied_to_base: 'Appliqué sur le total de base',
          total_monthly: 'Total RevShare mensuel',
          passive_income: 'Revenus passifs estimés',
          disclaimer: 'Ces calculs sont indicatifs et basés sur les pourcentages actuels. Les revenus réels dépendent de l\'activité de votre organisation, du nombre d\'APQL et des conditions eXp en vigueur.',
          required_apql: '{{count}} APQL requis',
          not_counted: '(non compté)',
          levels: {
            l1y1: 'L1 Année 1',
            l1y2: 'L1 Année 2+',
            l2: 'L2',
            l3: 'L3',
            l4: 'L4',
            l5: 'L5',
            l6: 'L6',
            l7: 'L7'
          },
          level_descriptions: {
            l1y1: 'Première ligne, première année',
            l1y2: 'Première ligne, années suivantes',
            l2: 'Deuxième ligne',
            l3: 'Troisième ligne',
            l4: 'Quatrième ligne',
            l5: 'Cinquième ligne',
            l6: 'Sixième ligne',
            l7: 'Septième ligne'
          }
        },
        faq_title: 'Questions fréquentes',
        faqs: {
          independence: {
            question: 'Suis-je vraiment indépendant ?',
            answer: 'Oui : vous pilotez marque, prospection et organisation avec l\'appui du réseau.'
          },
          cap: {
            question: 'Quel est le cap ?',
            answer: '80 000€ HT de CA ; au-delà vous êtes à 100% (voir conditions).'
          },
          revshare: {
            question: 'C\'est quoi le revshare ?',
            answer: 'Partage des revenus à 7 niveaux, indexé sur le CA généré par votre organisation (selon politique en vigueur).'
          },
          shares: {
            question: 'Quid des actions / ICON ?',
            answer: 'Des actions peuvent être attribuées à des jalons et via l\'award ICON (sous conditions).'
          },
          fees: {
            question: 'Y a-t-il des frais ?',
            answer: 'Les frais évoluent ; détail remis lors du RDV et dans la doc officielle la plus récente.'
          }
        },
        buttons: {
          see_if_exp_for_me: 'Voir si eXp est pour moi',
          plan_appointment: 'Planifier mon rendez-vous'
        },
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
        about: 'About me',
        joinExp: 'Join eXp',
        blog: 'Blog',
        valuation: 'Valuation',
        contact: 'Contact'
      },
      about: {
        title: 'About me',
        h1: 'About me',
        meta_title: 'About me — Sébastien Pons Real Estate (Chavenay & Western Paris)',
        meta_description: 'Meet Sébastien Pons, real estate advisor in Chavenay since 2017. Transparency, rigor, responsiveness and comprehensive support.',
        nav: {
          hero: 'Introduction',
          intro: 'Presentation',
          parcours: 'My background',
          methode: 'My method',
          ancrage: 'Local presence',
          motivation: 'Motivation',
          resume: 'In summary',
          contact: 'Contact'
        },
        hero: {
          lead: 'Hello, I am Sébastien Pons.',
          cta_primary: 'Request a valuation',
          cta_secondary: 'Contact me'
        },
        intro: {
          p1: 'I have lived in Chavenay since 2017, where I work as a real estate agent. I chose this village for its tranquility, quality of life, and proximity to major hubs in Western Paris. It is a human-scale place where it is still possible to take time to discuss, listen, and understand everyone\'s projects.'
        },
        parcours: {
          title: 'My background',
          p1: 'Before turning to real estate, I worked for several years in environments where rigor, clarity, and reliability were essential. These experiences taught me to be precise, to prepare each file properly, and to anticipate unexpected events. These are the skills I apply today in my profession, serving my clients.',
          international: {
            title: 'Useful international experience',
            text: 'I have also lived in Spain and the United States. This exposure to other cultures and ways of communicating helps me work smoothly with diverse profiles (expatriates, investors, families in mobility), anticipate expectations, and facilitate clear exchanges, sometimes bilingual.'
          },
          p2: 'I chose real estate out of a love for contact and a genuine interest in living spaces. Behind every project, there is a story, a transition, a desire for evolution. My role is to accompany this step with method, transparency, and kindness.'
        },
        methode: {
          title: 'How I work',
          item1: 'Listen before proposing. I take the time to understand the situation, pace, and expectations of my clients before acting.',
          item2: 'Say things simply. I describe properties with realism, without exaggeration, and I explain technical points in an accessible way.',
          item3: 'Be responsive and consistent. A message deserves a clear and quick response. Availability is an integral part of my work.',
          item4: 'Support until the end. I remain present at every step: valuation, strategy, visits, negotiation, signing, and key handover.',
          conclusion: 'My approach aims to be both professional and human: the goal is not just to sell or buy, but to bring a project to fruition in the best possible conditions.'
        },
        ancrage: {
          title: 'My local presence',
          p1: 'Based in Chavenay, I work in a large area covering western Yvelines and neighboring municipalities. From Saint-Germain-en-Laye to Montfort-l\'Amaury, from Feucherolles to Villennes-sur-Seine, I know the specificities of each environment: schools, transport, quiet neighborhoods, or more dynamic areas.',
          p2: 'Living and working here allows me to have a concrete view of market trends, real opportunities, and buyer expectations. I rely on this field knowledge to offer fair valuations and appropriate advice.'
        },
        motivation: {
          title: 'What motivates me',
          p1: 'Each mission is different, but the common thread remains the same: creating a relationship of trust. I want my clients to feel seriously supported, to understand each step of the process, and to have the certainty of moving in the right direction.',
          p2: 'The satisfaction of seeing a project come to fruition, often after weeks of exchanges and preparation, is what motivates me the most.'
        },
        resume: {
          title: 'In summary',
          item: 'I prioritize transparency, rigor, responsiveness, and personalized follow-up.',
          conclusion: 'My goal: for each client to feel heard, understood, and supported — from the first exchange to the key handover.'
        },
        cta: {
          title: 'How about getting to know each other?',
          text: 'Whether you want to sell, buy, or simply get a property valued, I am available to discuss it. A coffee, a visit, or a simple phone call often helps to clarify things.',
          cta_primary: 'Request a valuation',
          cta_secondary: 'Contact me'
        }
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
        article_preview_description: 'Discover real estate market trends...',
        presentation: {
          title: 'Local Proximity, Global Reach',
          subtitle: 'Rigorous follow-up in West Paris, expanded audience thanks to the eXp network',
          local_title: 'Local Player, Backed by an International Group',
          local_description: 'Based in Yvelines (78), I operate close to your projects in Chavenay, Saint-Nom-la-Bretèche and Feucherolles, while also traveling to Paris and Hauts-de-Seine (92). This local presence ensures precise advice and showcasing adapted to each micro-market.',
          network_title: 'The Power of a Global Network to Amplify Your Results',
          network_description: 'I rely on eXp, a cloud-based international group present in over 25 countries and bringing together more than 80,000 advisors (2025 data). Concretely: extensive listing distribution, access to mobile buyers (France & international) and cross-referrals between professionals to accelerate qualified connections.',
          benefits_title: 'What This Changes for You',
          benefit1_title: 'Expanded Audience',
          benefit1_description: 'France + international visibility through the eXp network, while maintaining local management of your file.',
          benefit2_title: 'Responsiveness & Coordination',
          benefit2_description: 'A single point of contact who orchestrates valuation, marketing strategy, home staging and negotiation, right through to signing.',
          benefit3_title: 'Presentation Quality',
          benefit3_description: 'Dedicated photos, polished texts and smooth digital journey to defend the price and accelerate the transaction.',
          commitment_title: 'Clear and Demanding Support',
          commitment_description: 'Sale, purchase or rental: I favor direct exchanges, useful information and quick decisions. Your project benefits from both local anchoring and the power of an international network — without unnecessary complexity or intermediaries.',
        }
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
        similar_property: 'Similar villa',
        type: {
          apartment: 'Apartment',
          house: 'House',
          commercial: 'Commercial',
          land: 'Land',
          garage: 'Garage / Parking',
          other: 'Other',
        },
        transaction: {
          sale: 'Sale',
          rent: 'Rental',
        },
        status: {
          sold: 'Sold',
          under_offer: 'Under Offer',
          rented: 'Rented',
        },
        card: {
          rooms: 'rooms',
          land: 'land',
          garage: 'garage',
          perMonth: '/month incl.',
          seeDetails: 'See details',
        }
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
        key_conditions: {
          commission: 'Commission from your first sale',
          cap: 'After €80,000 excl. VAT turnover (cap)',
          revshare: '7-level revenue sharing program (revshare)',
          shares: 'in shares — ICON Reward (subject to conditions)'
        },
        why_title: 'Why eXp?',
        advantages: {
          tools: {
            title: 'Tools & marketing',
            description: 'CRM, e-signature, distribution, estimation, marketing kit.'
          },
          training: {
            title: 'Ongoing training',
            description: 'Regular sessions + ALUR Law, mentoring, masterclasses.'
          },
          network: {
            title: 'Network & co-mandates',
            description: 'Local and international synergies (over 20 countries).'
          },
          freedom: {
            title: 'Freedom to enterprise',
            description: 'Local brand, own schedule and style.'
          },
          equity: {
            title: 'Equity (shares)',
            description: 'Shares at key milestones + ICON award.'
          },
          workspace: {
            title: 'Workspaces',
            description: 'Regus access + cloud collaborative platform.'
          }
        },
        steps_title: 'Get started in 4 steps',
        steps: {
          discovery: {
            title: 'Discovery exchange',
            description: '20–30 min'
          },
          audit: {
            title: 'Audit & projection',
            description: 'Margins, visibility, pipeline'
          },
          onboarding: {
            title: '30-day onboarding',
            description: 'Tools, templates, routines'
          },
          launch: {
            title: 'Launch',
            description: 'Commercial rituals & follow-up'
          }
        },
        calculator_title: 'Calculate your eXp revenue potential',
        calculator_subtitle: 'Adjust assumptions and visualize an order of magnitude (for information only).',
        revshare_calculator: {
          title: 'RevShare Calculator',
          subtitle: 'Estimate your passive income with the eXp 7-level revenue sharing system',
          calculation_params: 'Calculation Parameters',
          level_configuration: 'Level Configuration',
          agent_count: 'Number of agents',
          avg_revenue: 'Avg revenue/agent (€)',
          apql_label: 'APQL (Licensed Qualified Partner Agents)',
          apql_description: 'Number of qualified L1 agents in your organization (unlocks levels)',
          bonus_label: 'RevShare Bonus (%)',
          bonus_description: 'Additional conditional bonus applied to total (0-100%). Average of 40%',
          how_it_works: '💡 How it works?',
          how_it_works_desc: 'eXp RevShare calculates your income based on the number of agents and their average revenue per level. Levels 4-7 require a certain number of APQL to be unlocked.',
          estimated_revenue: 'Estimated revenue by level',
          bonus_revshare: 'RevShare Bonus',
          applied_to_base: 'Applied to base total',
          total_monthly: 'Total Monthly RevShare',
          passive_income: 'Estimated passive income',
          disclaimer: 'These calculations are indicative and based on current percentages. Actual income depends on your organization\'s activity, number of APQL and current eXp conditions.',
          required_apql: '{{count}} APQL required',
          not_counted: '(not counted)',
          levels: {
            l1y1: 'L1 Year 1',
            l1y2: 'L1 Year 2+',
            l2: 'L2',
            l3: 'L3',
            l4: 'L4',
            l5: 'L5',
            l6: 'L6',
            l7: 'L7'
          },
          level_descriptions: {
            l1y1: 'First line, first year',
            l1y2: 'First line, following years',
            l2: 'Second line',
            l3: 'Third line',
            l4: 'Fourth line',
            l5: 'Fifth line',
            l6: 'Sixth line',
            l7: 'Seventh line'
          }
        },
        faq_title: 'Frequently Asked Questions',
        faqs: {
          independence: {
            question: 'Am I really independent?',
            answer: 'Yes: you manage brand, prospecting and organization with network support.'
          },
          cap: {
            question: 'What is the cap?',
            answer: '€80,000 excl. VAT turnover; beyond that you are at 100% (see conditions).'
          },
          revshare: {
            question: 'What is revshare?',
            answer: '7-level revenue sharing, indexed to the turnover generated by your organization (according to current policy).'
          },
          shares: {
            question: 'About shares / ICON?',
            answer: 'Shares can be awarded at milestones and via the ICON award (subject to conditions).'
          },
          fees: {
            question: 'Are there fees?',
            answer: 'Fees evolve; details provided during the appointment and in the latest official documentation.'
          }
        },
        buttons: {
          see_if_exp_for_me: 'See if eXp is for me',
          plan_appointment: 'Schedule my appointment'
        },
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