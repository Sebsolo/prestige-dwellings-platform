import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  // Mock blog post - replace with real API call
  const post = {
    id: 1,
    slug: 'marche-immobilier-2024',
    title: 'Tendances du marché immobilier 2024',
    content: `
      <p>Le marché immobilier français connaît des évolutions significatives en 2024. Voici les principales tendances à retenir...</p>
      
      <h2>1. Évolution des prix</h2>
      <p>Les prix de l'immobilier montrent des signes de stabilisation après plusieurs années de hausse continue...</p>
      
      <h2>2. Nouvelles attentes des acheteurs</h2>
      <p>Les critères de sélection évoluent, avec une importance croissante accordée à la performance énergétique...</p>
      
      <h2>3. Impact du télétravail</h2>
      <p>Le développement du télétravail continue d'influencer les choix résidentiels...</p>
    `,
    coverImage: '/placeholder.svg',
    publishedAt: '2024-01-15',
    author: 'Sebastien Pons',
    category: 'Marché',
    readTime: '5 min'
  };

  return (
    <Layout 
      title={post.title}
      description="Découvrez les principales tendances qui façonnent le marché immobilier cette année"
      keywords="marché immobilier 2024 tendances prix"
    >
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au blog
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio */}
        <div className="border-t pt-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-full"></div>
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <p className="text-muted-foreground">
                Expert en immobilier de prestige depuis plus de 15 ans, 
                Sebastien accompagne ses clients dans leurs projets immobiliers les plus ambitieux.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <section className="border-t pt-8">
          <h3 className="text-2xl font-serif font-bold mb-6">Articles similaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-24 h-20 bg-muted rounded flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1 line-clamp-2">
                    Article similaire #{i}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    15 janvier 2024 • 3 min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;