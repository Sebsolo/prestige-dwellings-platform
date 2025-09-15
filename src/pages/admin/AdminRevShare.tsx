import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Save, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';

interface RevSharePercents {
  l1y1: number;
  l1y2: number;
  l2: number;
  l3: number;
  l4: number;
  l5: number;
  l6: number;
  l7: number;
}

const AdminRevShare = () => {
  const [percents, setPercents] = useState<RevSharePercents>({
    l1y1: 5.0,
    l1y2: 3.5,
    l2: 4.0,
    l3: 2.5,
    l4: 1.5,
    l5: 1.0,
    l6: 2.5,
    l7: 5.0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  useEffect(() => {
    fetchRevShareSettings();
  }, []);

  const fetchRevShareSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('revshare_settings')
        .select('id, percents')
        .single();

      if (error) {
        console.error('Error fetching revshare settings:', error);
        toast.error('Erreur lors du chargement des paramètres');
        return;
      }

      if (data) {
        setSettingsId(data.id);
        if (data.percents) {
          setPercents(data.percents as unknown as RevSharePercents);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settingsId) {
      toast.error('ID des paramètres non trouvé');
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase
        .from('revshare_settings')
        .update({ percents: percents as any })
        .eq('id', settingsId);

      if (error) {
        console.error('Error saving revshare settings:', error);
        toast.error('Erreur lors de la sauvegarde');
        return;
      }

      toast.success('Paramètres sauvegardés avec succès');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const updatePercent = (key: keyof RevSharePercents, value: string) => {
    const numValue = parseFloat(value) || 0;
    setPercents(prev => ({
      ...prev,
      [key]: numValue
    }));
  };

  const levels = [
    { key: 'l1y1', label: 'L1 Année 1', description: 'Première ligne, première année' },
    { key: 'l1y2', label: 'L1 Année 2+', description: 'Première ligne, années suivantes' },
    { key: 'l2', label: 'L2', description: 'Deuxième ligne' },
    { key: 'l3', label: 'L3', description: 'Troisième ligne' },
    { key: 'l4', label: 'L4', description: 'Quatrième ligne' },
    { key: 'l5', label: 'L5', description: 'Cinquième ligne' },
    { key: 'l6', label: 'L6', description: 'Sixième ligne' },
    { key: 'l7', label: 'L7', description: 'Septième ligne' }
  ] as const;

  const totalPercent = Object.values(percents).reduce((sum, percent) => sum + percent, 0);

  if (loading) {
    return (
      <AdminLayout title="RevShare" description="Gestion des pourcentages RevShare">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="RevShare" description="Gestion des pourcentages RevShare">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Configuration RevShare</h1>
            <p className="text-muted-foreground">
              Gérez les pourcentages de partage des revenus pour chaque niveau
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={fetchRevShareSettings}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button 
              onClick={saveSettings}
              disabled={saving}
            >
              <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Pourcentages par niveau
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {levels.map((level) => (
                <div key={level.key} className="space-y-2">
                  <Label htmlFor={level.key}>
                    {level.label}
                    <span className="text-sm text-muted-foreground ml-2">
                      {level.description}
                    </span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={level.key}
                      type="number"
                      value={percents[level.key]}
                      onChange={(e) => updatePercent(level.key, e.target.value)}
                      step="0.1"
                      min="0"
                      max="100"
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total des pourcentages :</span>
                  <Badge variant={totalPercent > 50 ? "destructive" : "secondary"}>
                    {totalPercent.toFixed(1)}%
                  </Badge>
                </div>
                {totalPercent > 50 && (
                  <p className="text-sm text-destructive mt-1">
                    ⚠️ Le total dépasse 50%, cela peut être élevé
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Aperçu du calculateur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground mb-4">
                  Exemple avec 10 000€ de CA mensuel :
                </div>
                
                {levels.map((level) => {
                  const amount = (10000 * percents[level.key]) / 100;
                  return (
                    <div key={level.key} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div>
                        <div className="text-sm font-medium">{level.label}</div>
                        <div className="text-xs text-muted-foreground">{percents[level.key]}%</div>
                      </div>
                      <div className="text-sm font-semibold">
                        {amount.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: 0
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total mensuel :</span>
                    <span className="text-primary">
                      {((10000 * totalPercent) / 100).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Les pourcentages représentent la part des commissions reversée à chaque niveau</li>
              <li>• L1 Année 1 : pourcentage pour la première ligne la première année</li>
              <li>• L1 Année 2+ : pourcentage pour la première ligne à partir de la deuxième année</li>
              <li>• L2-L7 : pourcentages pour les lignes 2 à 7 de votre organisation</li>
              <li>• Ces paramètres sont utilisés dans le calculateur RevShare de la page publique</li>
              <li>• Attention : un total trop élevé peut impacter la rentabilité</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminRevShare;