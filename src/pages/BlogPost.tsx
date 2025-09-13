import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        // Fetch the main post
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (postError) {
          if (postError.code === 'PGRST116') {
            setNotFound(true);
          }
          throw postError;
        }

        setPost(postData);

        // Fetch related posts (excluding current post)
        const { data: relatedData, error: relatedError } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .neq('id', postData.id)
          .order('published_at', { ascending: false })
          .limit(2);

        if (relatedError) throw relatedError;
        setRelatedPosts(relatedData || []);

      } catch (error) {
        console.error('Error fetching post:', error);
        if (!notFound) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, notFound]);

  const formatReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min`;
  };

  if (loading) {
    return (
      <Layout title="Chargement...">
        <div className="flex items-center justify-center py-20">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (notFound || !post) {
    return (
      <Layout title="Article non trouvé">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, l'article que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={post.title_fr}
      description={post.excerpt_fr || "Découvrez cet article sur l'immobilier"}
      keywords="immobilier blog article sebastien pons"
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
            <Badge variant="secondary">Article</Badge>
            <span className="text-sm text-muted-foreground">{formatReadTime(post.content_fr)}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {post.title_fr}
          </h1>
          
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Sebastien Pons</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.published_at).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        {post.cover_path && (
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <img 
              src={post.cover_path} 
              alt={post.title_fr}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12 prose-headings:font-serif prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content_fr }}
        />

        {/* Author Bio */}
        <div className="border-t pt-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-full"></div>
            <div>
              <h3 className="font-semibold">Sebastien Pons</h3>
              <p className="text-muted-foreground">
                Expert en immobilier de prestige depuis plus de 15 ans, 
                Sebastien accompagne ses clients dans leurs projets immobiliers les plus ambitieux.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t pt-8">
            <h3 className="text-2xl font-serif font-bold mb-6">Articles similaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="flex gap-4 group hover:bg-muted/50 p-4 rounded-lg transition-colors"
                >
                  <div className="w-24 h-20 bg-muted rounded flex-shrink-0 overflow-hidden">
                    {relatedPost.cover_path && (
                      <img 
                        src={relatedPost.cover_path} 
                        alt={relatedPost.title_fr}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedPost.title_fr}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(relatedPost.published_at).toLocaleDateString('fr-FR')} • {formatReadTime(relatedPost.content_fr)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;