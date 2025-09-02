import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image,
  url 
}: SEOProps) => {
  const defaultTitle = 'Sebastien Pons Immobilier';
  const defaultDescription = 'Immobilier de prestige avec Sebastien Pons. Découvrez nos propriétés d\'exception en vente et location.';
  const defaultKeywords = 'immobilier, prestige, luxe, vente, location, propriété, maison, appartement';
  const defaultImage = '/og-image.jpg';
  const siteUrl = window.location.origin;

  const seoTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || window.location.href;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={`${siteUrl}${seoImage}`} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={`${siteUrl}${seoImage}`} />
      
      {/* Canonical */}
      <link rel="canonical" href={seoUrl} />
    </Helmet>
  );
};

export default SEO;