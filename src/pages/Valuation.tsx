import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { CheckCircle, Home, Calculator, FileText } from 'lucide-react';
import SmartForm from '@/components/SmartForm';

const Valuation = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Home className="h-6 w-6" />,
      title: t('valuation.steps.step1_title'),
      description: t('valuation.steps.step1_desc')
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: t('valuation.steps.step2_title'),
      description: t('valuation.steps.step2_desc')
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t('valuation.steps.step3_title'),
      description: t('valuation.steps.step3_desc')
    }
  ];

  return (
    <Layout 
      title={t('valuation.title')}
      description={t('valuation.subtitle')}
      keywords="estimation gratuite immobilier prix maison appartement"
    >
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {t('valuation.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('valuation.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{t('valuation.free_tag')}</span>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{t('valuation.no_commitment')}</span>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{t('valuation.personalized_expertise')}</span>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SmartForm
            source="estimate"
            title={t('valuation.form_title')}
            description={t('valuation.form_description')}
            className="bg-card shadow-lg rounded-2xl"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Valuation;