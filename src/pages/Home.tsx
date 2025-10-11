import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, User, Camera, MessageSquare, Clock } from 'lucide-react';
import GoogleReviews from '@/components/GoogleReviews';
import PropertyCard from '@/components/PropertyCard';
import HomeCarousel from '@/components/HomeCarousel';
import { propertiesApi } from '@/services/propertiesApi';
import { PropertyWithMedia } from '@/types/index';
import { supabase } from '@/integrations/supabase/client';
import IKResponsiveImage from '@/components/IKResponsiveImage';
import logo from '@/assets/new-logo.webp';

const Home = () => {
  const { t } = useTranslation();
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<PropertyWithMedia[]>([]);
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Use single bootstrap function to reduce critical requests
        const response = await supabase.functions.invoke('bootstrapHome');
        
        if (response.error) {
          console.error('Bootstrap error:', response.error);
          // Fallback to individual requests
          await fetchDataFallback();
          return;
        }

        const { settings, slides, properties, posts } = response.data;
        
        // Store all bootstrap data
        setHomeData(response.data);
        
        // Use React.startTransition for non-critical updates
        setFeaturedProperties(properties || []);
        setRecentPosts(posts || []);
        
        console.log('Home data loaded via bootstrap:', {
          properties: properties?.length,
          posts: posts?.length,
          slides: slides?.length
        });
        
      } catch (error) {
        console.error('Error fetching home data:', error);
        // Fallback to individual requests
        await fetchDataFallback();
      }
    };

    const fetchDataFallback = async () => {
      try {
        const [postsResponse, propertiesResponse] = await Promise.all([
          supabase
            .from('posts')
            .select('id, title_fr, title_en, slug, cover_path, published_at')
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .limit(3),
          
          propertiesApi.list({ featured: true })
        ]);

        if (!postsResponse.error) {
          setRecentPosts(postsResponse.data || []);
        }
        
        setFeaturedProperties((propertiesResponse || []).slice(0, 3));
        
      } catch (error) {
        console.error('Error in fallback fetch:', error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <Layout 
      title={t('home.title')} 
      description={t('home.subtitle')}
      keywords="immobilier prestige luxe sebastien pons"
    >
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <HomeCarousel slides={homeData?.slides} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <img 
                src={logo} 
                alt="Sebastien Pons Immobilier" 
                className="h-50 md:h-70 w-auto"
              />
            </div>
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
              Nos Coups de Cœur
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

      {/* Presentation Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.presentation.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
              {t('home.presentation.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Local expertise */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('home.presentation.local_title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('home.presentation.local_description')}
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('home.presentation.network_title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('home.presentation.network_description')}
                </p>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                {t('home.presentation.benefits_title')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('home.presentation.benefit1_title')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('home.presentation.benefit1_description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('home.presentation.benefit2_title')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('home.presentation.benefit2_description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('home.presentation.benefit3_title')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('home.presentation.benefit3_description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg shadow-card">
            <h3 className="text-2xl font-semibold mb-4 text-foreground text-center">
              {t('home.presentation.commitment_title')}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              {t('home.presentation.commitment_description')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="mes-services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.services.card1.title')}</h3>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• {t('home.services.card1.bullet1')}</li>
                  <li>• {t('home.services.card1.bullet2')}</li>
                  <li>• {t('home.services.card1.bullet3')}</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.services.card2.title')}</h3>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• {t('home.services.card2.bullet1')}</li>
                  <li>• {t('home.services.card2.bullet2')}</li>
                  <li>• {t('home.services.card2.bullet3')}</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.services.card3.title')}</h3>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• {t('home.services.card3.bullet1')}</li>
                  <li>• {t('home.services.card3.bullet2')}</li>
                  <li>• {t('home.services.card3.bullet3')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Link to="/contact">
              <Button size="lg" aria-label="Contacter Sebastien Pons">
                {t('home.services.cta_secondary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
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
      {recentPosts.length > 0 && (
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
              {recentPosts.map((post) => (
                 <div key={post.id} className="bg-card rounded-lg shadow-card overflow-hidden group hover:shadow-lg transition-shadow">
                   <div className="h-48 bg-muted overflow-hidden">
                     {post.cover_path && post.cover_path !== '/placeholder.svg' ? (
                       <IKResponsiveImage
                         src={post.cover_path}
                         slotWidth={400}
                         aspect={400/192}
                         alt={post.title_fr}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                       />
                     ) : (
                       <img 
                         src="/placeholder.svg" 
                         alt={post.title_fr}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                       />
                     )}
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
              ))}
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
      )}
    </Layout>
  );
};

export default Home;