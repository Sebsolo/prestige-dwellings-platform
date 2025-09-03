import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Calculator, FileText } from 'lucide-react';

const Valuation = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Home className="h-6 w-6" />,
      title: 'Informations du bien',
      description: 'Renseignez les caractéristiques de votre propriété'
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: 'Estimation automatique',
      description: 'Notre algorithme calcule une première estimation'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Rapport détaillé',
      description: 'Recevez votre estimation personnalisée'
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
            <span>100% gratuit</span>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Sans engagement</span>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Résultat immédiat</span>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Estimer mon bien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('valuation.property_type')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Maison', 'Appartement', 'Villa', 'Terrain'].map((type) => (
                    <button
                      key={type}
                      className="p-3 border rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('valuation.property_address')}
                </label>
                <input 
                  type="text" 
                  placeholder="Saisissez l'adresse complète"
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Surface (m²)</label>
                  <input 
                    type="number" 
                    placeholder="120"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de pièces</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Sélectionner</option>
                    <option>1 pièce</option>
                    <option>2 pièces</option>
                    <option>3 pièces</option>
                    <option>4 pièces</option>
                    <option>5+ pièces</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Chambres</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Sélectionner</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">État du bien</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Sélectionner</option>
                    <option>Neuf</option>
                    <option>Excellent</option>
                    <option>Bon</option>
                    <option>À rénover</option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Vos coordonnées</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder={t('common.name')}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input 
                    type="email" 
                    placeholder={t('common.email')}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <input 
                  type="tel" 
                  placeholder={t('common.phone')}
                  className="w-full p-3 border rounded-lg mt-4"
                />
              </div>

              <Button className="w-full bg-gradient-primary shadow-luxury">
                Obtenir mon estimation gratuite
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe 
                concernant votre projet d'estimation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Valuation;