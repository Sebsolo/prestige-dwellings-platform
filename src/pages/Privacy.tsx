import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <Layout 
      title={t('footer.privacy')}
      description="Politique de confidentialité et protection des données personnelles"
      keywords="RGPD confidentialité données personnelles"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif font-bold mb-8">
          Politique de confidentialité (RGPD)
        </h1>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Responsable du traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Sebastien Pons Immobilier, en qualité de responsable du traitement, 
                s'engage à protéger vos données personnelles conformément au Règlement 
                Général sur la Protection des Données (RGPD).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Données collectées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Données d'identification :</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
              </ul>
              
              <p><strong>Données de navigation :</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Adresse IP</li>
                <li>Données de connexion</li>
                <li>Informations sur le navigateur</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Finalités du traitement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Vos données personnelles sont traitées pour les finalités suivantes :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Réponse à vos demandes de contact</li>
                <li>Estimation de votre bien immobilier</li>
                <li>Gestion de votre candidature (recrutement)</li>
                <li>Envoi de notre newsletter (avec votre consentement)</li>
                <li>Amélioration de nos services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Base légale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Le traitement de vos données repose sur :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Intérêt légitime :</strong> pour la prospection commerciale</li>
                <li><strong>Consentement :</strong> pour l'envoi de newsletters</li>
                <li><strong>Exécution contractuelle :</strong> pour la réalisation de prestations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Vos données sont conservées pendant :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Prospects :</strong> 3 ans à compter du dernier contact</li>
                <li><strong>Clients :</strong> 5 ans après la fin de la relation commerciale</li>
                <li><strong>Candidatures :</strong> 2 ans à compter de la candidature</li>
                <li><strong>Newsletter :</strong> jusqu'à votre désinscription</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Droit d'accès :</strong> connaître les données vous concernant</li>
                <li><strong>Droit de rectification :</strong> corriger vos données</li>
                <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
              </ul>
              
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : 
                <a href="mailto:contact@sebastienpons-immobilier.fr" className="text-primary hover:underline ml-1">
                  contact@sebastienpons-immobilier.fr
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles 
                appropriées pour protéger vos données personnelles contre la destruction, 
                la perte, l'altération, la divulgation ou l'accès non autorisé.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Réclamation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Si vous considérez que le traitement de vos données personnelles constitue 
                une violation du RGPD, vous avez le droit d'introduire une réclamation 
                auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mise à jour</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Cette politique de confidentialité peut être mise à jour. 
                La date de dernière modification est indiquée en bas de cette page.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Dernière mise à jour : Janvier 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;