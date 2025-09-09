import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { t } = useTranslation();

  // Mock blog posts - replace with real API call
  const posts = [
    {
      id: 1,
      slug: 'marche-immobilier-2024',
      title: 'Tendances du marché immobilier 2024',
      excerpt: 'Découvrez les principales tendances qui façonnent le marché immobilier cette année...',
      coverImage: '/placeholder.svg',
      publishedAt: '2024-01-15',
      author: 'Sebastien Pons',
      category: 'Marché',
      readTime: '5 min'
    },
    {
      id: 2,
      slug: 'investir-immobilier-prestige',
      title: 'Pourquoi investir dans l\'immobilier de prestige ?',
      excerpt: 'L\'immobilier de prestige représente une opportunité d\'investissement unique...',
      coverImage: '/placeholder.svg',
      publishedAt: '2024-01-12',
      author: 'Sebastien Pons',
      category: 'Investissement',
      readTime: '7 min'
    },
    {
      id: 3,
      slug: 'conseils-achat-premiere-residence',
      title: 'Conseils pour acheter sa première résidence',
      excerpt: 'Guide complet pour les primo-accédants : financement, négociation, juridique...',
      coverImage: '/placeholder.svg',
      publishedAt: '2024-01-10',
      author: 'Sebastien Pons',
      category: 'Conseils',
      readTime: '10 min'
    }
  ];

  const categories = ['Tous', 'Marché', 'Investissement', 'Conseils', 'Actualités'];

  return (
    <Layout 
      title={t('blog.title')}
      description={t('blog.subtitle')}
      keywords="blog immobilier conseils actualités marché"
    >
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    {t('blog.read_more')}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;