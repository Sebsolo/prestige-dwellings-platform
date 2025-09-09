import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Users, TrendingUp, Award } from 'lucide-react';

const JoinExp = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Revenus illimités',
      description: 'Aucun plafond sur vos commissions et revenus'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Réseau international',
      description: 'Accès à un réseau mondial d\'agents immobiliers'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Formation continue',
      description: 'Programmes de formation et développement personnel'
    }
  ];

  const faqs = [
    {
      question: 'Quels sont les frais d\'adhésion ?',
      answer: 'Les frais d\'adhésion sont compétitifs et transparents. Contactez-nous pour plus de détails.'
    },
    {
      question: 'Quelle formation est proposée ?',
      answer: 'eXp propose une formation complète incluant les techniques de vente, le marketing digital et le développement personnel.'
    },
    {
      question: 'Comment fonctionne le système de commissions ?',
      answer: 'Vous gardez un pourcentage élevé de vos commissions avec des plafonds avantageux.'
    }
  ];

  return (
    <Layout 
      title={t('joinExp.title')}
      description={t('joinExp.subtitle')}
      keywords="rejoindre exp realty immobilier agent commercial"
    >
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {t('joinExp.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('joinExp.subtitle')}
          </p>
          <Button size="lg" className="bg-gradient-primary shadow-luxury">
            Candidater maintenant
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              {t('joinExp.why_title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              {t('joinExp.faq_title')}
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Prêt à rejoindre l'équipe ?
              </h3>
              <p className="text-white/90 mb-6">
                Remplissez notre formulaire de candidature et commencez votre nouvelle carrière dès aujourd'hui.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                <input 
                  type="text" 
                  placeholder={t('common.name')}
                  className="p-3 rounded-lg text-foreground"
                />
                <input 
                  type="email" 
                  placeholder={t('common.email')}
                  className="p-3 rounded-lg text-foreground"
                />
                <input 
                  type="tel" 
                  placeholder={t('common.phone')}
                  className="p-3 rounded-lg text-foreground"
                />
                <select className="p-3 rounded-lg text-foreground">
                  <option>Expérience en immobilier</option>
                  <option>Débutant</option>
                  <option>1-3 ans</option>
                  <option>3-5 ans</option>
                  <option>5+ ans</option>
                </select>
              </div>
              <textarea 
                placeholder="Parlez-nous de votre motivation"
                rows={4}
                className="w-full p-3 rounded-lg text-foreground mb-6"
              />
              
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                Envoyer ma candidature
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default JoinExp;