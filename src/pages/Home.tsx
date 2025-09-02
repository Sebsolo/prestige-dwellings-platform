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
                Découvrir nos propriétés
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Estimation gratuite
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Propriétés d'Exception
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection exclusive de nos plus belles propriétés
            </p>
          </div>
          
          {/* Properties grid will be added later */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow-card overflow-hidden">
                <div className="h-64 bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Villa de prestige</h3>
                  <p className="text-muted-foreground mb-4">Une propriété d'exception</p>
                  <p className="text-2xl font-bold text-primary">€ 2,500,000</p>
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