import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Sebastien Pons Immobilier',
    siteDescription: 'Agence immobilière spécialisée en France et International',
    logo: '',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    metaTitle: 'Sebastien Pons Immobilier - France & International',
    metaDescription: 'Découvrez notre sélection de biens immobiliers en France et à l\'international avec Sebastien Pons Immobilier.',
    metaKeywords: 'immobilier, vente, location, france, international, sebastien pons',
    booking_url: '',
    googlePlaceId: '',
    googleBusinessUrl: 'https://share.google/LOxi7WwOzlRaYUVJj'
  });

  const handleSave = async () => {
    try {
      // TODO: Save settings to API
      toast.success('Paramètres sauvegardés avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Upload logo file
      console.log('Upload logo:', file);
    }
  };

  return (
    <AdminLayout title="Paramètres">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Paramètres du Site</h2>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations Générales</CardTitle>
              <CardDescription>
                Configuration de base du site web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('logo')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Télécharger Logo
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Description du site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Couleurs du Thème</CardTitle>
              <CardDescription>
                Personnalisez les couleurs de votre site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Couleur Primaire</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Couleur Secondaire</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO et Métadonnées</CardTitle>
              <CardDescription>
                Optimisation pour les moteurs de recherche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Titre Meta</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Description Meta</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Mots-clés Meta</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
                  placeholder="mot-clé1, mot-clé2, mot-clé3"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
              <CardDescription>
                Configuration des services externes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="booking_url">URL de Réservation</Label>
                <Input
                  id="booking_url"
                  value={settings.booking_url}
                  onChange={(e) => setSettings({...settings, booking_url: e.target.value})}
                  placeholder="https://calendly.com/sebastien-pons"
                />
                <p className="text-sm text-muted-foreground">
                  URL utilisée par tous les boutons de prise de rendez-vous
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="googlePlaceId">Google Place ID</Label>
                <Input
                  id="googlePlaceId"
                  value={settings.googlePlaceId}
                  onChange={(e) => setSettings({...settings, googlePlaceId: e.target.value})}
                  placeholder="ChIJxxxxxxxxxxxxxxx"
                />
                <p className="text-sm text-muted-foreground">
                  ID de votre fiche Google Business pour récupérer les avis automatiquement
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleBusinessUrl">URL Google Business</Label>
                <Input
                  id="googleBusinessUrl"
                  value={settings.googleBusinessUrl}
                  onChange={(e) => setSettings({...settings, googleBusinessUrl: e.target.value})}
                  placeholder="https://share.google/..."
                />
                <p className="text-sm text-muted-foreground">
                  Lien vers votre page Google Business
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;