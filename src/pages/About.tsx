import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout
      title={t('about.meta_title')}
      description={t('about.meta_description')}
    >
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            {t('about.title')}
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>{t('about.content_placeholder')}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
