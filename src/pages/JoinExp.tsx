import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, Star, Globe, Zap, BookOpen, Building, Target, CheckCircle } from 'lucide-react';
import BookingCTA from '@/components/BookingCTA';
import JsonLdFAQ from '@/components/JsonLdFAQ';
import StickyFooterCTA from '@/components/StickyFooterCTA';
import RevShareCalculator from '@/components/RevShareCalculator';
import { useRevShareSettings } from '@/contexts/RevShareSettingsContext';

const JoinExp = () => {
  const { t } = useTranslation();
  const { percents } = useRevShareSettings();

  const keyConditions = [
    {
      number: '75%',
      label: 'Commission dès votre première vente'
    },
    {
      number: '100%',
      label: 'Après 80 000€ HT de CA (cap)'
    },
    {
      number: '7 niveaux',
      label: 'Programme de partage des revenus (revshare)'
    },
    {
      number: '20 000€',
      label: 'en actions — Récompense ICON (sous conditions)'
    }
  ];

  const advantages = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Outils & marketing',
      description: 'CRM, e-signature, diffusion, estimation, kit marketing.'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Formation continue',
      description: 'Sessions régulières + Loi ALUR, mentoring, masterclasses.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Réseau & co-mandats',
      description: 'Synergies locales et internationales (plus de 20 pays).'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Liberté d\'entreprendre',
      description: 'Marque locale, agenda et style propres.'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Équité (actions)',
      description: 'Actions à des jalons clés + award ICON.'
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: 'Espaces de travail',
      description: 'Accès Regus + plateforme collaborative cloud.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Échange découverte',
      description: '20–30 min'
    },
    {
      number: '02',
      title: 'Audit & projection',
      description: 'Marges, visibilité, pipeline'
    },
    {
      number: '03',
      title: 'Onboarding 30 jours',
      description: 'Outils, templates, routines'
    },
    {
      number: '04',
      title: 'Lancement',
      description: 'Rituels commerciaux & suivi'
    }
  ];

  const faqs = [
    {
      question: 'Suis-je vraiment indépendant ?',
      answer: 'Oui : vous pilotez marque, prospection et organisation avec l\'appui du réseau.'
    },
    {
      question: 'Quel est le cap ?',
      answer: '80 000€ HT de CA ; au-delà vous êtes à 100% (voir conditions).'
    },
    {
      question: 'C\'est quoi le revshare ?',
      answer: 'Partage des revenus à 7 niveaux, indexé sur le CA généré par votre organisation (selon politique en vigueur).'
    },
    {
      question: 'Quid des actions / ICON ?',
      answer: 'Des actions peuvent être attribuées à des jalons et via l\'award ICON (sous conditions).'
    },
    {
      question: 'Y a-t-il des frais ?',
      answer: 'Les frais évoluent ; détail remis lors du RDV et dans la doc officielle la plus récente.'
    }
  ];

  return (
    <Layout 
      title="Rejoindre eXp | Modèle, avantages & prise de RDV"
      description="eXp France : 75% dès la 1re vente, 100% après 80 000€ HT de CA (cap), revshare à 7 niveaux, actions (ICON). Outils, formation, réseau international."
      keywords="rejoindre exp realty immobilier agent commercial commission revshare"
    >
      <JsonLdFAQ faqs={faqs} />
      <StickyFooterCTA />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6 border-primary/20 text-primary">
                Indépendant, mais jamais seul
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Rejoindre eXp : libérez votre potentiel d'agent immobilier
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Un modèle clair, des outils puissants et un réseau international — tout en restant 100% entrepreneur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookingCTA label="Réserver un rendez-vous" size="lg" />
                <BookingCTA label="Parler à Sébastien" variant="outline" size="lg" />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-primary rounded-2xl shadow-luxury flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tableau de bord agent</h3>
                  <p className="text-white/80">Outils de gestion intégrés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Conditions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Les conditions clés en France
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modèle transparent : split initial, 100% après cap, revenu partagé à 7 niveaux et opportunités en actions dont l'award ICON.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {keyConditions.map((condition, index) => (
              <Card key={index} className="text-center border-0 shadow-elegant rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-2">
                    {condition.number}
                  </div>
                  <p className="text-muted-foreground font-medium">{condition.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <BookingCTA label="Voir si eXp est pour moi" />
          </div>
        </div>
      </section>

      {/* Why eXp Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Pourquoi eXp ?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-0 shadow-elegant rounded-2xl hover:shadow-luxury transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    {advantage.icon}
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Démarrer en 4 étapes
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center space-y-4">
            <BookingCTA label="Planifier mon rendez-vous" size="lg" />
            <div>
              <BookingCTA label="Échanger sur votre projet" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* RevShare Calculator Section */}
      <section id="revshare-calculator" className="mt-16 border-t border-muted pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Calculez votre potentiel de revenus eXp
          </h2>
          <p className="text-muted-foreground mb-6">
            Ajustez les hypothèses et visualisez un ordre de grandeur (à titre indicatif).
          </p>
        </div>
        <RevShareCalculator initialPercents={percents} />
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Questions fréquentes
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-2xl border-0 shadow-elegant px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Informations indicatives susceptibles d'évolution. Détails, conditions et éligibilité selon la politique eXp France en vigueur.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default JoinExp;