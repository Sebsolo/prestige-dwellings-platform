import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LegalNotice = () => {
  const { t } = useTranslation();

  return (
    <Layout 
      title={t('footer.legalNotice')}
      description="Mentions légales du site Sebastien Pons Immobilier"
      keywords="mentions légales"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif font-bold mb-8">
          {t('footer.legalNotice')}
        </h1>

        <div className="prose max-w-none space-y-8">
          <p className="text-muted-foreground">
            Conformément à la loi pour la confiance dans l'économie numérique (LCEN) du 21 juin 2004, 
            les informations ci-dessous permettent d'identifier l'éditeur, l'hébergeur et le cadre juridique du site.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>1) Éditeur du site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Site :</strong> yvelines-immo.fr</p>
              <p><strong>Éditeur :</strong> <strong>Sébastien Pons Immobilier — Sébastien Pons</strong></p>
              <p><strong>Statut :</strong> Entrepreneur individuel (EI) — <strong>Agent commercial en immobilier</strong> (mandataire)</p>
              <p><strong>Immatriculation :</strong> <strong>RSAC Versailles n° 912 212 073</strong></p>
              <p><strong>Adresse postale :</strong> <strong>8 rue des Amandiers, 78450 Chavenay</strong></p>
              <p><strong>Téléphone :</strong> <strong>06 01 77 10 11</strong></p>
              <p><strong>E-mail :</strong> <strong><a href="mailto:sebastien@yvelines-immo.fr" className="text-primary hover:underline">sebastien@yvelines-immo.fr</a></strong></p>
              <p><strong>Directeur de la publication :</strong> <strong>Sébastien Pons</strong></p>
              <p className="mt-4">
                Les activités de transaction sont effectuées <strong>sous le couvert de la carte professionnelle</strong> "Transaction sur immeubles et fonds de commerce" <strong>CPI 3402 2020 000 045 086</strong>, délivrée par la CCI de l'Hérault, <strong>détenue par eXp Global France S.A.S., 266 place Ernest Granier, 34000 Montpellier</strong>. <strong>Absence de garantie financière — eXp Global France ne détient ni fonds, ni effet, ni valeur.</strong>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2) Hébergeur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>o2switch (SAS au capital de 100 000 €)</strong></p>
              <p><strong>SIRET :</strong> 510 909 807 00032 — RCS Clermont-Ferrand</p>
              <p><strong>Adresse :</strong> Chemin des Pardiaux, <strong>63000 Clermont-Ferrand</strong>, France</p>
              <p><strong>Site :</strong> o2switch.fr</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3) Médiation de la consommation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Conformément aux articles L.612-1 et suivants du Code de la consommation, le Client peut recourir gratuitement à un médiateur de la consommation. <strong>[À compléter : nom et coordonnées de l'entité de médiation compétente]</strong>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4) Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                L'ensemble du site (structure, textes, images, vidéos, graphismes, logos, icônes, code) est protégé par le droit d'auteur et/ou la propriété industrielle. <strong>Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable de l'Éditeur est interdite.</strong> Les marques et logos cités appartiennent à leurs titulaires respectifs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5) Responsabilité – Contenus & informations immobilières</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Les informations et visuels des annonces sont fournis <strong>à titre indicatif</strong> et <strong>sans caractère contractuel</strong>. Malgré les soins apportés à leur exactitude, des erreurs ou omissions peuvent subsister. L'Éditeur se réserve le droit de corriger à tout moment. L'utilisateur demeure responsable de l'usage des informations consultées.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6) Liens hypertextes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Le site peut contenir des liens vers des sites tiers. L'Éditeur n'exerce aucun contrôle sur ces ressources et <strong>décline toute responsabilité</strong> quant à leur disponibilité, leur contenu et leurs pratiques. Toute création de lien vers le site est soumise à autorisation préalable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7) Données personnelles (RGPD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Les données collectées via les formulaires ont pour finalité la gestion des demandes (contact, estimation, acheteurs, etc.). <strong>Base légale :</strong> intérêt légitime et/ou exécution de mesures précontractuelles. Les données sont conservées pour la durée strictement nécessaire au traitement puis archivées/effacées.
              </p>
              <p>
                <strong>Droits des personnes :</strong> accès, rectification, effacement, limitation, opposition, portabilité. Demandes à adresser à <strong><a href="mailto:sebastien@yvelines-immo.fr" className="text-primary hover:underline">sebastien@yvelines-immo.fr</a></strong>. En cas de difficulté, vous pouvez saisir la <strong>CNIL</strong>. Une <strong>Politique de confidentialité</strong> détaillée est disponible sur la page dédiée du site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8) Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Le site peut déposer des cookies techniques et de mesure d'audience. Vous pouvez configurer vos préférences depuis le bandeau cookies et/ou votre navigateur. Voir la <strong>Politique cookies</strong> du site pour le détail des finalités, durées de conservation et partenaires.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9) Accessibilité & disponibilité</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Le site est en principe accessible 24/7, sous réserve d'opérations de maintenance ou de cas de force majeure. L'Éditeur et/ou l'hébergeur ne sauraient être tenus responsables des interruptions de service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10) Droit applicable – Litiges</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Les présentes mentions sont soumises au <strong>droit français</strong>. À défaut de résolution amiable (et, le cas échéant, après médiation), <strong>les tribunaux français compétents</strong> seront saisis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNotice;