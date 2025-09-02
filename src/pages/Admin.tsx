import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Admin = () => {
  const { profile, signOut } = useAuth();

  return (
    <Layout 
      title="Administration - Sebastien Pons Immobilier"
      description="Espace d'administration Sebastien Pons Immobilier"
    >
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground">
              Administration
            </h1>
            <Button onClick={signOut} variant="outline">
              Déconnexion
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Profil Utilisateur</CardTitle>
                <CardDescription>Informations de votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Email:</strong> {profile?.email}</p>
                  <p><strong>Nom:</strong> {profile?.full_name || 'Non défini'}</p>
                  <p><strong>Rôle:</strong> {profile?.role}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Propriétés</CardTitle>
                <CardDescription>Gestion des biens immobiliers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Gérer les propriétés</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
                <CardDescription>Gestion des prospects</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Voir les leads</Button>
              </CardContent>
            </Card>

            {(profile?.role === 'admin' || profile?.role === 'editor') && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Blog</CardTitle>
                    <CardDescription>Gestion des articles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Gérer le blog</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Témoignages</CardTitle>
                    <CardDescription>Gestion des avis clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Gérer les témoignages</Button>
                  </CardContent>
                </Card>
              </>
            )}

            {profile?.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle>Utilisateurs</CardTitle>
                  <CardDescription>Gestion des comptes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Gérer les utilisateurs</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;