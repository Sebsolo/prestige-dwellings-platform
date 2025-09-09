import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

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
              <Button size="lg" className="bg-gradient-primary shadow-luxury">
                {t('home.hero_cta1')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                {t('home.hero_cta2')}
              </Button>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow-card overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="h-64 bg-muted overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 group-hover:scale-105 transition-transform"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Villa de prestige #{i}</h3>
                  <p className="text-muted-foreground mb-4">Une propriété d'exception avec vue mer</p>
                  <p className="text-2xl font-bold text-primary">€ {(2500000 + i * 100000).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {t('home.hero_cta1')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Obtenez une estimation gratuite de votre bien en quelques minutes
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
            Demander une estimation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.testimonials_title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background rounded-lg p-6 shadow-card">
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Service exceptionnel et accompagnement personnalisé. 
                  Sebastien a su nous trouver la propriété de nos rêves."
                </p>
                <div className="font-semibold">Client satisfait #{i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.blog_title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow-card overflow-hidden">
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Article #{i}</h3>
                  <p className="text-muted-foreground mb-4">
                    Découvrez les tendances du marché immobilier...
                  </p>
                  <span className="text-primary font-medium">Lire la suite →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;