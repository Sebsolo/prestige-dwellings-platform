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
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="font-semibold mb-2">Version du 13/09/2025</p>
            <p className="mb-4">
              La présente politique décrit comment <strong>Sébastien Pons Immobilier — Sébastien Pons (EI)</strong>, 
              <strong>RSAC Versailles n° 912 212 073</strong>, collecte et traite vos données personnelles dans le cadre du site <strong>yvelines-immo.fr</strong>.
            </p>
            
            <div className="space-y-2">
              <p><strong>Éditeur / Responsable de traitement</strong></p>
              <p>Sébastien Pons Immobilier — Sébastien Pons (EI)</p>
              <p>8 rue des Amandiers, 78450 Chavenay — France</p>
              <p>Tél. : 06 01 77 10 11 — Email : <a href="mailto:sebastien@yvelines-immo.fr" className="text-primary hover:underline"><strong>sebastien@yvelines-immo.fr</strong></a></p>
              
              <p className="mt-4">
                Les activités de transaction sont réalisées sous le couvert de la carte professionnelle "Transaction sur immeubles et fonds de commerce" 
                <strong>CPI 3402 2020 000 045 086</strong>, détenue par <strong>eXp Global France SAS</strong>, 266 place Ernest Granier, 34000 Montpellier (absence de garantie financière).
              </p>
              
              <p><strong>Hébergeur :</strong> o2switch, Chemin des Pardiaux, 63000 Clermont-Ferrand, France.</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1) Données que nous collectons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Formulaires de contact / estimation / prise de RDV / acheteur :</strong> identité (nom, prénom), coordonnées (email, téléphone), contenu du message, critères de recherche, adresse du bien, budget, etc.</li>
                <li><strong>Espace "Rejoindre eXp" (recrutement de mandataires) :</strong> identité, coordonnées, éléments de parcours/expérience transmis.</li>
                <li><strong>Gestion de dossiers clients (vendeurs, acquéreurs, locataires) :</strong> informations nécessaires à l'étude, à la commercialisation et au suivi de la transaction (ex. : adresse du bien, pièces justificatives transmises).</li>
                <li><strong>Journal technique :</strong> données de navigation et de sécurité (horodatage, adresse IP, user-agent) à des fins de sécurité/maintenance.</li>
                <li><strong>Cookies & mesure d'audience :</strong> selon votre choix dans le bandeau cookies (voir Politique Cookies).</li>
              </ul>
              
              <p className="mt-4">
                Nous ne collectons <strong>pas</strong> de catégories particulières de données (dites "sensibles") via le site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2) Finalités et bases légales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Finalité</th>
                      <th className="border border-border p-3 text-left">Exemples</th>
                      <th className="border border-border p-3 text-left">Base légale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Réponse aux demandes (contact, estimation, recherche)</td>
                      <td className="border border-border p-3">Prise de RDV, envoi d'informations sur un bien</td>
                      <td className="border border-border p-3"><strong>Mesures précontractuelles</strong> ou <strong>intérêt légitime</strong> à répondre</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Exécution et suivi des mandats / transactions</td>
                      <td className="border border-border p-3">Diffusion d'annonce, visites, négociation, signatures</td>
                      <td className="border border-border p-3"><strong>Exécution d'un contrat</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Prospection et actualités</td>
                      <td className="border border-border p-3">Envoi ponctuel d'informations utiles sur l'activité/bien</td>
                      <td className="border border-border p-3"><strong>Consentement</strong> (email/SMS) ; retrait possible à tout moment</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Recrutement de mandataires ("Rejoindre eXp")</td>
                      <td className="border border-border p-3">Étude de candidatures et prises de contact</td>
                      <td className="border border-border p-3"><strong>Intérêt légitime</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Sécurité du site, prévention de la fraude</td>
                      <td className="border border-border p-3">Logs techniques, prévention d'abus</td>
                      <td className="border border-border p-3"><strong>Intérêt légitime</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Obligations légales et comptables</td>
                      <td className="border border-border p-3">Facturation, prescriptions légales, LCB-FT le cas échéant</td>
                      <td className="border border-border p-3"><strong>Obligation légale</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3) Destinataires et sous-traitants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p><strong>Interne :</strong> l'éditeur du site (Sébastien Pons) et, le cas échéant, ses partenaires intervenant dans le cadre d'un mandat.</p>
              </div>
              
              <div>
                <p><strong>Sous-traitants techniques :</strong></p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li><strong>Hébergeur :</strong> o2switch (hébergement et sécurité).</li>
                  <li>Outils de messagerie / prise de RDV / formulaires et, si activé, <strong>mesure d'audience</strong> (uniquement après consentement).</li>
                </ul>
              </div>
              
              <div>
                <p><strong>Partenaires transaction :</strong> dans le cadre d'un mandat, informations strictement nécessaires (photographes, diagnostiqueurs, notaires, etc.).</p>
              </div>
              
              <div>
                <p><strong>Autorités :</strong> administrations et autorités légalement habilitées.</p>
              </div>
              
              <p>
                Aucun transfert hors UE n'est effectué <strong>sauf</strong> si un outil choisi par vos soins héberge des données hors UE ; dans ce cas, nous privilégions des prestataires offrant des garanties appropriées (clauses contractuelles types, hébergement UE, etc.).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4) Durées de conservation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Catégorie</th>
                      <th className="border border-border p-3 text-left">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3"><strong>Prospects / demandes de contact</strong></td>
                      <td className="border border-border p-3">3 ans après le dernier contact entrant de votre part</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3"><strong>Dossiers clients et pièces contractuelles</strong></td>
                      <td className="border border-border p-3">Durée du mandat et de la transaction, puis durée légale de prescription (en principe 5 ans) ; pièces comptables : 10 ans</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3"><strong>Candidatures "Rejoindre eXp"</strong></td>
                      <td className="border border-border p-3">2 ans après le dernier contact si non retenu(e)</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3"><strong>Logs techniques</strong></td>
                      <td className="border border-border p-3">Jusqu'à 12 mois à des fins de sécurité</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3"><strong>Cookies</strong></td>
                      <td className="border border-border p-3">Selon type et consentement (voir Politique Cookies)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5) Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Vous disposez des droits <strong>d'accès</strong>, <strong>rectification</strong>, <strong>effacement</strong>, <strong>limitation</strong>, <strong>opposition</strong>, <strong>portabilité</strong>, et du droit de <strong>retirer votre consentement</strong> à tout moment (pour la prospection notamment).
              </p>
              <p>
                Pour exercer vos droits : <a href="mailto:sebastien@yvelines-immo.fr" className="text-primary hover:underline"><strong>sebastien@yvelines-immo.fr</strong></a> ou courrier postal à l'adresse figurant ci-dessus, en joignant un justificatif d'identité si nécessaire.
              </p>
              <p>
                Vous pouvez également introduire une réclamation auprès de la <strong>CNIL</strong> (cnil.fr).
              </p>
              <p className="italic">
                Délégué à la protection des données (DPO) : non désigné, au regard de l'activité exercée.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6) Prospection et démarchage téléphonique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Emails/SMS :</strong> uniquement avec votre <strong>consentement</strong> préalable (ou clients pour des services analogues). Vous pouvez vous désinscrire à tout moment.</li>
                <li><strong>Téléphone :</strong> opposition possible via la liste <strong>BLOCTEL</strong> (bloctel.gouv.fr).</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7) Sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles adaptées (hébergement sécurisé, mises à jour, gestion des accès, sauvegardes raisonnables). Aucun système n'étant infaillible, nous vous invitons à limiter les informations transmises aux seules données strictement nécessaires.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8) Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Le site utilise des cookies techniques nécessaires au fonctionnement et, <strong>avec votre consentement</strong>, des cookies de mesure d'audience et/ou de services tiers.
              </p>
              <p className="mt-2">
                → Voir la <strong>[Politique Cookies]</strong> (bandeau de consentement, finalités détaillées, durées et partenaires).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9) Mineurs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Le site ne s'adresse pas intentionnellement aux mineurs. Si des données de mineur nous étaient transmises, le représentant légal peut demander leur suppression via <a href="mailto:sebastien@yvelines-immo.fr" className="text-primary hover:underline"><strong>sebastien@yvelines-immo.fr</strong></a>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10) Évolution de la politique</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous pouvons modifier la présente politique pour refléter des évolutions légales ou techniques. La version applicable est celle publiée sur cette page à la date de votre visite.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;