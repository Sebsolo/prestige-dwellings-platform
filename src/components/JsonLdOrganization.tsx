import { Helmet } from 'react-helmet-async';

const JsonLdOrganization = () => {
  const siteUrl = window.location.origin;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Sebastien Pons Immobilier',
    description: 'Expert en immobilier de prestige, spécialisé dans la vente et location de propriétés d\'exception.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: '+33 1 XX XX XX XX',
    email: 'contact@sebastien-pons-immobilier.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adresse à définir',
      addressLocality: 'Ville',
      postalCode: 'Code postal',
      addressCountry: 'FR'
    },
    sameAs: [
      'https://www.facebook.com/sebastien-pons-immobilier',
      'https://www.instagram.com/sebastien-pons-immobilier',
      'https://www.linkedin.com/company/sebastien-pons-immobilier'
    ],
    serviceArea: {
      '@type': 'Place',
      name: 'France'
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Vente immobilière',
          description: 'Service de vente de biens immobiliers de prestige'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Location immobilière',
          description: 'Service de location de biens immobiliers de prestige'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Estimation immobilière',
          description: 'Service d\'estimation gratuite de biens immobiliers'
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
    </Helmet>
  );
};

export default JsonLdOrganization;