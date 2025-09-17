import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import GoogleReviews from '@/components/GoogleReviews';
import PropertyCard from '@/components/PropertyCard';
import { propertiesApi } from '@/services/propertiesApi';
import { PropertyWithMedia } from '@/types/index';
import { supabase } from '@/integrations/supabase/client';

const Home = () => {
  const { t } = useTranslation();
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<PropertyWithMedia[]>([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setRecentPosts(data || []);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    const fetchFeaturedProperties = async () => {
      try {
        const properties = await propertiesApi.list({ 
          featured: true, 
          status: 'published' 
        });
        // Limit to 3 featured properties
        setFeaturedProperties(properties.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      }
    };

    fetchRecentPosts();
    fetchFeaturedProperties();
  }, []);

  return (
    <Layout 
      title={t('home.title')} 
      description={t('home.subtitle')}
      keywords="immobilier prestige luxe sebastien pons"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-subtle min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimation">
                <Button size="lg" className="bg-gradient-primary shadow-luxury">
                  {t('home.hero_cta1')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rejoindre-exp">
                <Button variant="outline" size="lg">
                  {t('home.hero_cta2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.featured_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.featured_subtitle')}
            </p>
          </div>
          
          <div className={`grid gap-8 ${
            featuredProperties.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : featuredProperties.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {featuredProperties.length > 0 ? (
              featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              // Fallback content when no featured properties
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {t('home.no_featured_properties')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {t('home.valuation_cta_title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('home.valuation_cta_subtitle')}
          </p>
          <Link to="/estimation">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              {t('home.valuation_cta_button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.testimonials_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.testimonials_subtitle')}
            </p>
          </div>
          
          <GoogleReviews maxReviews={6} />
        </div>
      </section>

      {/* Blog Preview - Actualités Immobilières */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.blog_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.blog_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="bg-card rounded-lg shadow-card overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-muted overflow-hidden">
                    <img 
                      src={post.cover_path || '/placeholder.svg'} 
                      alt={post.title_fr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title_fr}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt_fr}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Sebastien Pons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.published_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      {t('common.readMore')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg shadow-card overflow-hidden">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{t('home.article_preview', { number: i })}</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('home.article_preview_description')}
                    </p>
                    <span className="text-primary font-medium">{t('common.comingSoon')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                {t('common.seeAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;