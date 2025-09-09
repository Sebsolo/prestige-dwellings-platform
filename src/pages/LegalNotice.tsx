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

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Éditeur du site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Raison sociale :</strong> Sebastien Pons Immobilier</p>
              <p><strong>Forme juridique :</strong> [À compléter]</p>
              <p><strong>Adresse :</strong> [À compléter]</p>
              <p><strong>Téléphone :</strong> [À compléter]</p>
              <p><strong>Email :</strong> contact@sebastienpons-immobilier.fr</p>
              <p><strong>Numéro SIRET :</strong> [À compléter]</p>
              <p><strong>Carte professionnelle :</strong> [À compléter]</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Ce site est hébergé par Lovable</p>
              <p>Plus d'informations sur : https://lovable.dev</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                L'ensemble de ce site relève de la législation française et internationale 
                sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
                reproduction sont réservés, y compris pour les documents téléchargeables 
                et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique 
                quel qu'il soit est formellement interdite sauf autorisation expresse du 
                directeur de la publication.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Les informations contenues sur ce site sont aussi précises que possible 
                et le site remis à jour à différentes périodes de l'année, mais peut 
                toutefois contenir des inexactitudes ou des omissions.
              </p>
              <p>
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                merci de bien vouloir le signaler par email, à l'adresse 
                contact@sebastienpons-immobilier.fr, en décrivant le problème de la façon 
                la plus précise possible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Données personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Aucune information personnelle n'est collectée à votre insu. Aucune 
                information personnelle n'est cédée à des tiers. Pour plus d'informations 
                sur le traitement de vos données personnelles, consultez notre 
                <a href="/rgpd" className="text-primary hover:underline ml-1">
                  politique de confidentialité
                </a>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liens hypertextes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site web 
                en direction d'autres ressources présentes sur le réseau Internet ne 
                sauraient engager la responsabilité de Sebastien Pons Immobilier.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNotice;