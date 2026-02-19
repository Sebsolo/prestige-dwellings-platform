import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Gift, Download, UserCheck, Banknote, ExternalLink, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const YUCCAN_URL = 'https://www.yuccanlead.com/w/sebastien-pons-immobilier';

const rewards = [
  { amount: 475, label: 'Vente < 200 000 €', labelEn: 'Sale < €200,000' },
  { amount: 740, label: 'Vente entre 200 001 et 400 000 €', labelEn: 'Sale between €200,001 and €400,000' },
  { amount: 1100, label: 'Vente entre 400 001 et 1 000 000 €', labelEn: 'Sale between €400,001 and €1,000,000' },
  { amount: 1500, label: 'Vente > 1 000 000 €', labelEn: 'Sale > €1,000,000' },
];

const Referral = () => {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  return (
    <Layout
      title={isFr ? 'Parrainage — Gagnez de l\'argent en recommandant' : 'Referral — Earn money by recommending'}
      description={isFr ? 'Recommandez un acheteur ou un vendeur et recevez jusqu\'à 1 500 € de récompense grâce au programme de parrainage Yuccan Lead.' : 'Recommend a buyer or seller and earn up to €1,500 in rewards through the Yuccan Lead referral program.'}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Gift className="h-4 w-4" />
            {isFr ? 'Programme de parrainage' : 'Referral program'}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            {isFr ? (
              <>Vous nous recommandez,<br /><span className="text-primary">nous vous récompensons.</span></>
            ) : (
              <>You recommend us,<br /><span className="text-primary">we reward you.</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {isFr
              ? 'Vous appréciez nos services ? Gagnez de l\'argent à chaque recommandation qui aboutit à une vente !'
              : 'Do you appreciate our services? Earn money with every recommendation that leads to a sale!'}
          </p>
          <Button size="lg" className="text-base px-8" asChild>
            <a href={YUCCAN_URL} target="_blank" rel="noopener noreferrer">
              {isFr ? 'Parrainer maintenant' : 'Refer now'}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Rewards Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
            {isFr ? 'Vos récompenses' : 'Your rewards'}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            {isFr
              ? 'Un barème clair, versé par virement bancaire après signature de l\'acte authentique.'
              : 'A clear scale, paid by bank transfer after the deed is signed.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((r) => (
              <Card key={r.amount} className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6 px-4 flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Euro className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-primary">{r.amount.toLocaleString('fr-FR')} €</span>
                  <span className="text-sm text-muted-foreground">{isFr ? r.label : r.labelEn}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6">
            {isFr
              ? '* Barème en vigueur depuis le 27 novembre 2025. Modalités inaltérables garantissant votre récompense en cas de succès.'
              : '* Schedule effective since November 27, 2025. Unalterable terms guaranteeing your reward upon success.'}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            {isFr ? 'Comment ça marche ?' : 'How does it work?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Download,
                step: 1,
                title: isFr ? 'Téléchargez l\'appli Yuccan' : 'Download the Yuccan app',
                desc: isFr ? 'C\'est gratuit et rapide. Vous en aurez besoin pour suivre vos mises en relation.' : 'It\'s free and fast. You\'ll need it to track your referrals.',
              },
              {
                icon: UserCheck,
                step: 2,
                title: isFr ? 'Connectez-vous' : 'Log in',
                desc: isFr ? 'Pas besoin de vous inscrire, un numéro de téléphone ou email suffit.' : 'No need to sign up, a phone number or email is enough.',
              },
              {
                icon: Banknote,
                step: 3,
                title: isFr ? 'Parrainez & encaissez' : 'Refer & earn',
                desc: isFr ? 'Ajoutez votre compte bancaire et parrainez en quelques clics. Récompense versée après la vente.' : 'Add your bank account and refer in a few clicks. Reward paid after the sale.',
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isFr ? 'Vous connaissez quelqu\'un qui veut vendre ou acheter ?' : 'Know someone who wants to buy or sell?'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isFr
              ? 'Parrainez-le en quelques clics et recevez votre récompense une fois la vente conclue.'
              : 'Refer them in a few clicks and receive your reward once the sale is complete.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8" asChild>
              <a href={YUCCAN_URL} target="_blank" rel="noopener noreferrer">
                {isFr ? 'Parrainer maintenant' : 'Refer now'}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <a href="/contact">
                {isFr ? 'Me contacter' : 'Contact me'}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Referral;
