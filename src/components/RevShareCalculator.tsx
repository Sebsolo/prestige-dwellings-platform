import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

const RevShareCalculator = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(10000);
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

  useEffect(() => {
    fetchRevShareSettings();
  }, []);

  const fetchRevShareSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('revshare_settings')
        .select('percents')
        .single();

      if (error) {
        console.error('Error fetching revshare settings:', error);
        toast.error('Erreur lors du chargement des paramètres');
        return;
      }

      if (data?.percents) {
        setPercents(data.percents as unknown as RevSharePercents);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevShare = (level: keyof RevSharePercents): number => {
    return (monthlyRevenue * percents[level]) / 100;
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

  const totalRevShare = levels.reduce((total, level) => {
    return total + calculateRevShare(level.key);
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section id="revshare-calculator" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 mx-auto">
            <Calculator className="h-8 w-8" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            Calculateur RevShare
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimez vos revenus passifs avec le système de partage des revenus eXp sur 7 niveaux
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <Card className="border-0 shadow-elegant rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Paramètres de calcul
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="monthly-revenue" className="text-sm font-medium">
                  Chiffre d'affaires mensuel de votre équipe (€)
                </Label>
                <Input
                  id="monthly-revenue"
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="mt-2 text-lg"
                  min={0}
                  step={1000}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Basé sur les commissions générées par votre organisation
                </p>
              </div>

              <div className="p-4 bg-primary/5 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">💡 Comment ça marche ?</h4>
                <p className="text-sm text-muted-foreground">
                  Le RevShare eXp vous permet de percevoir un pourcentage sur les commissions 
                  générées par votre organisation sur 7 niveaux de profondeur.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 shadow-elegant rounded-2xl">
            <CardHeader>
              <CardTitle>Revenus estimés par niveau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {levels.map((level) => (
                  <div key={level.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{percents[level.key]}%</div>
                    </div>
                    <Badge variant="secondary" className="text-sm font-semibold">
                      {calculateRevShare(level.key).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-primary rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Total RevShare mensuel</div>
                    <div className="text-xs text-white/80">Revenus passifs estimés</div>
                  </div>
                  <div className="text-2xl font-bold">
                    {totalRevShare.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>Disclaimer :</strong> Ces calculs sont indicatifs et basés sur les pourcentages 
                  actuels. Les revenus réels dépendent de l'activité de votre organisation et des 
                  conditions eXp en vigueur.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RevShareCalculator;