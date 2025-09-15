import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calculator, Save, Settings, Users, Gift } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import { useRevShareSettings, LevelPercents, APQLThresholds, BonusSettings } from '@/contexts/RevShareSettingsContext';

const AdminRevShare = () => {
  const { percents: contextPercents, apqlThresholds: contextThresholds, bonusSettings: contextBonus, loading, saveSettings } = useRevShareSettings();
  const [percents, setPercents] = useState<LevelPercents>(contextPercents);
  const [apqlThresholds, setApqlThresholds] = useState<APQLThresholds>(contextThresholds);
  const [bonusSettings, setBonusSettings] = useState<BonusSettings>(contextBonus);
  const [saving, setSaving] = useState(false);

  // Update local state when context changes
  React.useEffect(() => {
    setPercents(contextPercents);
    setApqlThresholds(contextThresholds);
    setBonusSettings(contextBonus);
  }, [contextPercents, contextThresholds, contextBonus]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveSettings({ percents, apqlThresholds, bonusSettings });
      toast.success('Paramètres sauvegardés avec succès');
    } catch (error) {
      console.error('Error saving revshare settings:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const updatePercent = (key: keyof LevelPercents, value: string) => {
    const numValue = parseFloat(value) || 0;
    setPercents(prev => ({
      ...prev,
      [key]: numValue
    }));
  };

  const updateThreshold = (key: keyof APQLThresholds, value: string) => {
    const numValue = parseInt(value) || 0;
    setApqlThresholds(prev => ({
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
              Gérez les pourcentages, seuils APQL et bonus du système de partage des revenus
            </p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={saving}
          >
            <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
            Sauvegarder
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pourcentages Section */}
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
                  <Label htmlFor={level.key} className="text-sm">
                    {level.label}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={level.key}
                      type="number"
                      value={percents[level.key]}
                      onChange={(e) => updatePercent(level.key, e.target.value)}
                      step="0.1"
                      min="0"
                      max="10"
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-6">%</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total :</span>
                  <Badge variant={totalPercent > 30 ? "destructive" : "secondary"}>
                    {totalPercent.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* APQL Thresholds Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Seuils APQL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Nombre d'agents requis pour débloquer chaque niveau
              </p>
              
              {(['l4', 'l5', 'l6', 'l7'] as const).map((level) => (
                <div key={level} className="space-y-2">
                  <Label htmlFor={`threshold-${level}`} className="text-sm">
                    Niveau {level.slice(1)} 
                    <span className="text-muted-foreground ml-1">
                      (actuellement {apqlThresholds[level]})
                    </span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`threshold-${level}`}
                      type="number"
                      value={apqlThresholds[level]}
                      onChange={(e) => updateThreshold(level, e.target.value)}
                      min="0"
                      max="100"
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-12">APQL</span>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Niveaux 1-3 : Toujours actifs</p>
                  <p>• Niveaux 4-7 : Selon seuils APQL</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonus Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Configuration Bonus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Activer le bonus</Label>
                  <p className="text-xs text-muted-foreground">
                    Permet aux utilisateurs d'ajouter un bonus
                  </p>
                </div>
                <Switch
                  checked={bonusSettings.enabled}
                  onCheckedChange={(checked) => 
                    setBonusSettings(prev => ({ ...prev, enabled: checked }))
                  }
                />
              </div>

              {bonusSettings.enabled && (
                <div className="space-y-2">
                  <Label htmlFor="bonus-default" className="text-sm">
                    Valeur par défaut (%)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="bonus-default"
                      type="number"
                      value={bonusSettings.defaultValue}
                      onChange={(e) => 
                        setBonusSettings(prev => ({ 
                          ...prev, 
                          defaultValue: Math.min(100, Number(e.target.value) || 0) 
                        }))
                      }
                      min="0"
                      max="100"
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-6">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Bonus appliqué sur le total de base (0-100%)
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Le bonus s'applique au total RevShare</p>
                  <p>• Peut être désactivé pour simplifier</p>
                  <p>• Valeur modifiable par l'utilisateur</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Aperçu du calculateur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              Exemple avec 10 000€ de CA mensuel et 10 APQL :
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {levels.map((level) => {
                  const isActive = level.key === 'l1y1' || level.key === 'l1y2' || level.key === 'l2' || level.key === 'l3' ||
                                   (level.key === 'l4' && 10 >= apqlThresholds.l4) ||
                                   (level.key === 'l5' && 10 >= apqlThresholds.l5) ||
                                   (level.key === 'l6' && 10 >= apqlThresholds.l6) ||
                                   (level.key === 'l7' && 10 >= apqlThresholds.l7);
                  
                  const amount = isActive ? (10000 * percents[level.key]) / 100 : 0;
                  
                  return (
                    <div 
                      key={level.key} 
                      className={`flex items-center justify-between p-2 rounded ${
                        isActive ? 'bg-muted/30' : 'bg-muted/10 opacity-50'
                      }`}
                    >
                      <div>
                        <div className={`text-sm font-medium ${isActive ? '' : 'text-muted-foreground'}`}>
                          {level.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {percents[level.key]}% {!isActive && '(verrouillé)'}
                        </div>
                      </div>
                      <div className={`text-sm font-semibold ${isActive ? '' : 'text-muted-foreground'}`}>
                        {amount.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: 0
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded">
                  <div className="flex justify-between">
                    <span className="text-sm">Total de base :</span>
                    <span className="font-semibold">
                      {levels.reduce((total, level) => {
                        const isActive = level.key === 'l1y1' || level.key === 'l1y2' || level.key === 'l2' || level.key === 'l3' ||
                                         (level.key === 'l4' && 10 >= apqlThresholds.l4) ||
                                         (level.key === 'l5' && 10 >= apqlThresholds.l5) ||
                                         (level.key === 'l6' && 10 >= apqlThresholds.l6) ||
                                         (level.key === 'l7' && 10 >= apqlThresholds.l7);
                        return total + (isActive ? (10000 * percents[level.key]) / 100 : 0);
                      }, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {bonusSettings.enabled && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-800 dark:text-green-200">
                        Bonus ({bonusSettings.defaultValue}%) :
                      </span>
                      <span className="font-semibold text-green-800 dark:text-green-200">
                        +{(levels.reduce((total, level) => {
                          const isActive = level.key === 'l1y1' || level.key === 'l1y2' || level.key === 'l2' || level.key === 'l3' ||
                                           (level.key === 'l4' && 10 >= apqlThresholds.l4) ||
                                           (level.key === 'l5' && 10 >= apqlThresholds.l5) ||
                                           (level.key === 'l6' && 10 >= apqlThresholds.l6) ||
                                           (level.key === 'l7' && 10 >= apqlThresholds.l7);
                          return total + (isActive ? (10000 * percents[level.key]) / 100 : 0);
                        }, 0) * bonusSettings.defaultValue / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-primary/10 rounded">
                  <div className="flex justify-between">
                    <span className="font-semibold text-primary">Total final :</span>
                    <span className="font-bold text-primary">
                      {(() => {
                        const base = levels.reduce((total, level) => {
                          const isActive = level.key === 'l1y1' || level.key === 'l1y2' || level.key === 'l2' || level.key === 'l3' ||
                                           (level.key === 'l4' && 10 >= apqlThresholds.l4) ||
                                           (level.key === 'l5' && 10 >= apqlThresholds.l5) ||
                                           (level.key === 'l6' && 10 >= apqlThresholds.l6) ||
                                           (level.key === 'l7' && 10 >= apqlThresholds.l7);
                          return total + (isActive ? (10000 * percents[level.key]) / 100 : 0);
                        }, 0);
                        const bonus = bonusSettings.enabled ? (base * bonusSettings.defaultValue / 100) : 0;
                        return (base + bonus).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 });
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminRevShare;