import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdBreadcrumbProps {
  customBreadcrumbs?: BreadcrumbItem[];
}

const JsonLdBreadcrumb = ({ customBreadcrumbs }: JsonLdBreadcrumbProps) => {
  const location = useLocation();
  const siteUrl = window.location.origin;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) return customBreadcrumbs;

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Accueil', url: siteUrl }
    ];

    const routeNames: Record<string, string> = {
      'ventes': 'Ventes',
      'locations': 'Locations',
      'blog': 'Blog',
      'estimation': 'Estimation',
      'rejoindre-exp': 'Rejoindre l\'expérience',
      'contact': 'Contact',
      'mentions-legales': 'Mentions légales',
      'rgpd': 'RGPD',
      'cookies': 'Cookies',
      'bien': 'Propriété',
      'admin': 'Administration'
    };

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const name = routeNames[segment] || segment;
      breadcrumbs.push({
        name,
        url: `${siteUrl}${currentPath}`
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
    </Helmet>
  );
};

export default JsonLdBreadcrumb;