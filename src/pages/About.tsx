import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const About = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('qui-hero');

  const sections = [
    { id: 'qui-hero', label: t('about.nav.hero') },
    { id: 'ancrage-intro', label: t('about.nav.intro') },
    { id: 'mon-parcours', label: t('about.nav.parcours') },
    { id: 'ma-facon-de-travailler', label: t('about.nav.methode') },
    { id: 'ancrage-marche', label: t('about.nav.ancrage') },
    { id: 'mon-reseau-exp-entrepreneur', label: t('about.nav.reseau') },
    { id: 'ce-qui-me-motive', label: t('about.nav.motivation') },
    { id: 'en-resume', label: t('about.nav.resume') },
    { id: 'cta-contact', label: t('about.nav.contact') }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{t('about.meta_title')}</title>
        <meta name="description" content={t('about.meta_description')} />
        <link rel="canonical" href="https://yvelines-immo.fr/qui-suis-je" />
      </Helmet>
      <Navbar />
      
      <main className="flex-1">
        <div className="relative">
          {/* Sticky navigation - desktop only */}
          <aside className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-10 max-w-[200px]">
            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block text-sm transition-colors text-left w-full py-1 px-3 rounded-md ${
                    activeSection === id
                      ? 'text-primary font-medium bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            {/* Hero Section */}
            <section id="qui-hero" className="mb-16 lg:mb-24">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                {t('about.h1')}
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                {t('about.hero.lead')}
              </p>
            </section>

            {/* Intro */}
            <section id="ancrage-intro" className="mb-16 lg:mb-24">
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg leading-relaxed">{t('about.intro.p1')}</p>
              </div>
            </section>

            {/* Mon parcours */}
            <section id="mon-parcours" className="mb-16 lg:mb-24">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t('about.parcours.title')}
              </h2>
              <div className="prose prose-lg max-w-none text-foreground space-y-4">
                <p className="text-lg leading-relaxed">{t('about.parcours.p1')}</p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">
                  {t('about.parcours.international.title')}
                </h3>
                <p className="text-lg leading-relaxed">{t('about.parcours.international.text')}</p>
                
                <p className="text-lg leading-relaxed">{t('about.parcours.p2')}</p>
              </div>
            </section>

            {/* Ma façon de travailler */}
            <section id="ma-facon-de-travailler" className="mb-16 lg:mb-24">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t('about.methode.title')}
              </h2>
              <ul className="space-y-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex gap-3 text-lg leading-relaxed">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span className="text-foreground">{t(`about.methode.item${i}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg leading-relaxed">{t('about.methode.conclusion')}</p>
              </div>
            </section>

            {/* Mon ancrage local */}
            <section id="ancrage-marche" className="mb-16 lg:mb-24">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t('about.ancrage.title')}
              </h2>
              <div className="prose prose-lg max-w-none text-foreground space-y-4">
                <p className="text-lg leading-relaxed">{t('about.ancrage.p1')}</p>
                <p className="text-lg leading-relaxed">{t('about.ancrage.p2')}</p>
              </div>
            </section>

            {/* Mon réseau : eXp & Entrepreneur */}
            <section id="mon-reseau-exp-entrepreneur" className="mb-16 lg:mb-24">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t('about.reseau.title')}
              </h2>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg leading-relaxed">{t('about.reseau.p1')}</p>
              </div>
            </section>

            {/* Ce qui me motive */}
            <section id="ce-qui-me-motive" className="mb-16 lg:mb-24">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t('about.motivation.title')}
              </h2>
              <div className="prose prose-lg max-w-none text-foreground space-y-4">
                <p className="text-lg leading-relaxed">{t('about.motivation.p1')}</p>
                <p className="text-lg leading-relaxed">{t('about.motivation.p2')}</p>
              </div>
            </section>

            {/* En résumé */}
            <section id="en-resume" className="mb-16 lg:mb-24">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t('about.resume.title')}
              </h2>
              <ul className="mb-6">
                <li className="flex gap-3 text-lg leading-relaxed">
                  <span className="text-primary mt-1.5 shrink-0">•</span>
                  <span className="text-foreground">{t('about.resume.item')}</span>
                </li>
              </ul>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg leading-relaxed">{t('about.resume.conclusion')}</p>
              </div>
            </section>

            {/* CTA Contact */}
            <section id="cta-contact" className="mb-16">
              <div className="bg-muted/50 rounded-lg p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  {t('about.cta.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-foreground mb-8">
                  <p className="text-lg leading-relaxed">{t('about.cta.text')}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link to="/estimation">{t('about.cta.cta_primary')}</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link to="/contact">{t('about.cta.cta_secondary')}</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
