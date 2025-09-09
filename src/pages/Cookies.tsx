import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Cookies = () => {
  const { t } = useTranslation();

  return (
    <Layout 
      title={t('footer.cookies')}
      description="Politique d'utilisation des cookies"
      keywords="cookies politique confidentialité"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif font-bold mb-8">
          Politique des cookies
        </h1>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Qu'est-ce qu'un cookie ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal 
                (ordinateur, tablette, smartphone) lors de la visite d'un site web. 
                Il permet de reconnaître votre navigateur et de mémoriser certaines 
                informations vous concernant.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types de cookies utilisés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Cookies techniques (nécessaires)</h4>
                <p className="text-muted-foreground mb-2">
                  Ces cookies sont indispensables au fonctionnement du site.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>Gestion de session</li>
                  <li>Préférences de langue</li>
                  <li>Sécurité du site</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cookies de performance</h4>
                <p className="text-muted-foreground mb-2">
                  Ces cookies nous aident à comprendre comment vous utilisez notre site.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>Google Analytics</li>
                  <li>Mesure d'audience</li>
                  <li>Optimisation du site</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cookies fonctionnels</h4>
                <p className="text-muted-foreground mb-2">
                  Ces cookies améliorent votre expérience utilisateur.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>Mémorisation de vos préférences</li>
                  <li>Personnalisation du contenu</li>
                  <li>Chat en direct</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cookies publicitaires</h4>
                <p className="text-muted-foreground mb-2">
                  Ces cookies permettent d'afficher des publicités pertinentes.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>Google Ads</li>
                  <li>Facebook Pixel</li>
                  <li>Remarketing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Les cookies ont différentes durées de vie :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                <li><strong>Cookies persistants :</strong> conservés jusqu'à 13 mois maximum</li>
                <li><strong>Cookies tiers :</strong> gérés selon les politiques des prestataires</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Vous pouvez contrôler l'utilisation des cookies de plusieurs façons :</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Via notre bandeau de consentement</h4>
                  <Button variant="outline" size="sm">
                    Gérer mes préférences
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Via votre navigateur</h4>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez configurer votre navigateur pour refuser les cookies ou 
                    être alerté avant leur installation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Liens utiles</h4>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    <li>
                      <a href="https://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer" 
                         className="text-primary hover:underline">
                        Google Ads : Gérer la personnalisation des annonces
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer"
                         className="text-primary hover:underline">
                        Facebook : Paramètres publicitaires
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impact du refus des cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Le refus des cookies peut impacter votre expérience de navigation :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                <li>Impossibilité de mémoriser vos préférences</li>
                <li>Fonctionnalités limitées</li>
                <li>Nécessité de ressaisir vos informations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Pour toute question concernant notre politique de cookies, 
                contactez-nous à : 
                <a href="mailto:contact@sebastienpons-immobilier.fr" className="text-primary hover:underline ml-1">
                  contact@sebastienpons-immobilier.fr
                </a>
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

export default Cookies;