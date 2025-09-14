import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Star, Users, BookOpen, Target, Maximize2, ExternalLink, Play, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import JsonLdFAQ from '@/components/JsonLdFAQ';
import { supabase } from '@/integrations/supabase/client';

const JoinExp = () => {
  const [appointmentUrl, setAppointmentUrl] = useState('/rendez-vous');
  const [canvaShareUrl, setCanvaShareUrl] = useState('');
  const [legalFooter, setLegalFooter] = useState('');
  const [autoplay, setAutoplay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data: settings } = await supabase
          .from('site_settings')
          .select('appointment_url, canva_share_url, legal_footer')
          .single();
        
        if (settings) {
          setAppointmentUrl(settings.appointment_url || '/rendez-vous');
          setCanvaShareUrl(settings.canva_share_url || 'https://www.canva.com/design/DAGeyLDzKMU/ejBonHFtrwLk9wCZA3ThTA/view?utm_content=DAGeyLDzKMU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h91a9dd08af');
          setLegalFooter(settings.legal_footer || 'EI eu RSAC 912212073 Versailles — Ne pas jeter sur la voie publique');
        }
      } catch (error) {
        console.log('Settings not configured, using defaults');
      }
    };

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const canvaParam = urlParams.get('canva');
    const ctaParam = urlParams.get('cta');
    
    if (canvaParam) {
      setCanvaShareUrl(canvaParam);
    }
    if (ctaParam) {
      setAppointmentUrl(ctaParam);
    }

    if (!canvaParam && !ctaParam) {
      fetchSettings();
    }
  }, []);

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "100% cloud + outils modernes",
      description: "Collaboration, CRM, visio, marketing - tout en un"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Formation continue",
      description: "Par des top agents + replays disponibles"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Communauté internationale",
      description: "Entraide et networking mondial"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Modèle financier aligné",
      description: "Production et mentoring récompensés"
    }
  ];

  const faqs = [
    {
      question: "C'est quoi le modèle cloud eXp ?",
      answer: "eXp fonctionne entièrement en ligne avec des bureaux virtuels, des outils collaboratifs intégrés et une plateforme unique pour tous vos besoins immobiliers."
    },
    {
      question: "Quelles formations sont proposées ?",
      answer: "Formation continue par des top agents, webinaires live, replays disponibles 24/7, certification professionnelle et accompagnement personnalisé."
    },
    {
      question: "Comment fonctionne l'accompagnement/mentorat ?",
      answer: "Chaque agent bénéficie d'un parrain expérimenté, de sessions de coaching régulières et d'un accès direct à une communauté d'experts."
    },
    {
      question: "Quels sont les coûts et la rémunération ?",
      answer: "Modèle transparent avec commissions évolutives selon votre production, possibilité de revenus sur le mentoring et participation aux résultats de l'entreprise."
    }
  ];

  const getCanvaEmbedUrl = (url: string, autoplay: boolean) => {
    if (!url) return '';
    
    // Transform the share URL to an embeddable URL
    const baseUrl = url.split('?')[0];
    const mode = autoplay ? 'watch' : 'view';
    return `${baseUrl}/${mode}?embed`;
  };

  const handleCtaClick = () => {
    if (appointmentUrl.startsWith('http')) {
      window.open(appointmentUrl, '_blank');
    } else {
      window.location.href = appointmentUrl;
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleOpenInNewTab = () => {
    window.open(canvaShareUrl, '_blank');
  };

  const scrollToPresentation = () => {
    document.getElementById('presentation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout 
      title="Rejoindre eXp — Modèle cloud, formation & croissance"
      description="Découvrez eXp : modèle cloud, formation continue, entraide internationale, et nouvelles sources de revenus. Réservez un rendez-vous."
      keywords="exp realty, rejoindre exp, immobilier cloud, formation agent immobilier, commission immobilier"
    >
      <JsonLdFAQ faqs={faqs} />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Rejoignez eXp
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Modèle cloud, accompagnement, formation continue et revenus évolutifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="min-w-[200px] rounded-2xl shadow-elegant hover:shadow-luxury transition-all duration-300"
                onClick={handleCtaClick}
              >
                Prendre rendez-vous
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="min-w-[200px] rounded-2xl border-2"
                onClick={scrollToPresentation}
              >
                <Eye className="h-5 w-5 mr-2" />
                Voir la présentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pourquoi choisir eXp ?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-elegant rounded-2xl hover:shadow-luxury transition-all duration-300 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Canva Presentation Section */}
      <section id="presentation" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Découvrez le modèle eXp en détail
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Une présentation complète pour comprendre l'opportunité eXp
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-muted/30 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Switch
                  id="autoplay"
                  checked={autoplay}
                  onCheckedChange={setAutoplay}
                />
                <Label htmlFor="autoplay" className="text-sm font-medium">
                  Lecture auto
                </Label>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFullscreen}
                  className="rounded-xl"
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  {isFullscreen ? 'Réduire' : 'Plein écran'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenInNewTab}
                  className="rounded-xl"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Nouvel onglet
                </Button>
              </div>
            </div>

            {/* Embed Container */}
            <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black/95 p-8' : ''}`}>
              <div className={`relative ${isFullscreen ? 'w-full h-full' : 'aspect-video'} bg-muted rounded-2xl border overflow-hidden shadow-luxury`}>
                {canvaShareUrl ? (
                  <iframe
                    src={getCanvaEmbedUrl(canvaShareUrl, autoplay)}
                    className="w-full h-full"
                    allowFullScreen
                    title="Présentation eXp"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Présentation en cours de chargement...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {isFullscreen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFullscreen}
                  className="absolute top-4 right-4 bg-black/50 text-white border-white/20 hover:bg-black/70"
                >
                  ✕ Fermer
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              💡 Astuce : activez 'Lecture auto' pour le défilement automatique.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / About Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Pourquoi me rejoindre chez eXp
          </h2>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              Bénéficiez d'un accompagnement personnalisé pour votre transition vers eXp, 
              avec un accès privilégié aux outils de pointe et à une formation continue adaptée à vos besoins.
            </p>
            <p>
              Rejoignez une communauté bienveillante où l'entraide locale et internationale 
              vous permettra de développer votre activité et d'atteindre vos objectifs plus rapidement.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions fréquentes
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-background rounded-2xl border-0 shadow-elegant px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à franchir le pas ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Réservez votre démonstration personnalisée et découvrez comment eXp peut transformer votre carrière immobilière.
          </p>
          <Button 
            size="lg" 
            className="min-w-[250px] rounded-2xl shadow-elegant hover:shadow-luxury transition-all duration-300"
            onClick={handleCtaClick}
          >
            Réserver un rendez-vous
          </Button>
        </div>
      </section>

      {/* Legal Footer */}
      {legalFooter && (
        <section className="py-8 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground">
              {legalFooter}
            </p>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default JoinExp;