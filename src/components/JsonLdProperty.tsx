import { Helmet } from 'react-helmet-async';
import { Property } from '@/types/index';

interface JsonLdPropertyProps {
  property: Property;
}

const JsonLdProperty = ({ property }: JsonLdPropertyProps) => {
  const siteUrl = window.location.origin;
  
  const propertyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title_fr || property.title_en || `Propriété ${property.id}`,
    description: property.description_fr || property.description_en || '',
    url: `${siteUrl}/bien/${property.ref || property.id}`,
    image: [], // Images will be handled separately when media integration is complete
    datePosted: property.created_at,
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: property.price,
        priceCurrency: 'EUR'
      }
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city,
      postalCode: '',
      addressCountry: 'FR'
    },
    geo: property.lat && property.lng ? {
      '@type': 'GeoCoordinates',
      latitude: property.lat,
      longitude: property.lng
    } : undefined,
    floorSize: property.area_m2 ? {
      '@type': 'QuantitativeValue',
      value: property.area_m2,
      unitCode: 'MTK'
    } : undefined,
    numberOfRooms: property.rooms,
    numberOfBathroomsTotal: property.bathrooms,
    numberOfBedrooms: property.bedrooms,
    yearBuilt: property.year_built,
    hasEnergyPerformanceCertificate: property.dpe_letter ? {
      '@type': 'EnergyPerformanceCertificate',
      energyEfficiencyClass: property.dpe_letter
    } : undefined
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(propertyJsonLd)}
      </script>
    </Helmet>
  );
};

export default JsonLdProperty;