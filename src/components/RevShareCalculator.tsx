import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Lock } from 'lucide-react';
import { LevelPercents, APQLThresholds, BonusSettings } from '@/contexts/RevShareSettingsContext';
import { useTranslation } from 'react-i18next';
interface RevShareCalculatorProps {
  initialPercents?: LevelPercents;
  apqlThresholds?: APQLThresholds;
  bonusSettings?: BonusSettings;
}
const RevShareCalculator = ({
  initialPercents,
  apqlThresholds,
  bonusSettings
}: RevShareCalculatorProps) => {
  const { t } = useTranslation();
  const [apql, setApql] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);

  // Update bonus when bonusSettings changes
  useEffect(() => {
    if (bonusSettings?.defaultValue !== undefined) {
      setBonus(bonusSettings.defaultValue);
    }
  }, [bonusSettings?.defaultValue]);

  // Number of agents per level
  const [agentCounts, setAgentCounts] = useState<Record<keyof LevelPercents, number>>({
    l1y1: 0,
    l1y2: 0,
    l2: 0,
    l3: 0,
    l4: 0,
    l5: 0,
    l6: 0,
    l7: 0
  });

  // Average revenue per agent per level
  const [avgRevenues, setAvgRevenues] = useState<Record<keyof LevelPercents, number>>({
    l1y1: 5000,
    l1y2: 5000,
    l2: 3000,
    l3: 2000,
    l4: 1500,
    l5: 1000,
    l6: 1500,
    l7: 2000
  });
  const percents = initialPercents || {
    l1y1: 5.0,
    l1y2: 3.5,
    l2: 4.0,
    l3: 2.5,
    l4: 1.5,
    l5: 1.0,
    l6: 2.5,
    l7: 5.0
  };
  const thresholds = apqlThresholds || {
    l4: 5,
    l5: 10,
    l6: 15,
    l7: 30
  };
  const isLevelActive = (level: keyof LevelPercents): boolean => {
    if (level === 'l1y1' || level === 'l1y2' || level === 'l2' || level === 'l3') return true;
    if (level === 'l4') return apql >= thresholds.l4;
    if (level === 'l5') return apql >= thresholds.l5;
    if (level === 'l6') return apql >= thresholds.l6;
    if (level === 'l7') return apql >= thresholds.l7;
    return false;
  };
  const calculateRevShare = (level: keyof LevelPercents): number => {
    const totalLevelRevenue = agentCounts[level] * avgRevenues[level];
    return totalLevelRevenue * percents[level] / 100;
  };
  const calculateActiveRevShare = (level: keyof LevelPercents): number => {
    if (!isLevelActive(level)) return 0;
    return calculateRevShare(level);
  };
  const levels = [{
    key: 'l1y1',
    label: t('joinExp.revshare_calculator.levels.l1y1'),
    description: t('joinExp.revshare_calculator.level_descriptions.l1y1')
  }, {
    key: 'l1y2',
    label: t('joinExp.revshare_calculator.levels.l1y2'),
    description: t('joinExp.revshare_calculator.level_descriptions.l1y2')
  }, {
    key: 'l2',
    label: t('joinExp.revshare_calculator.levels.l2'),
    description: t('joinExp.revshare_calculator.level_descriptions.l2')
  }, {
    key: 'l3',
    label: t('joinExp.revshare_calculator.levels.l3'),
    description: t('joinExp.revshare_calculator.level_descriptions.l3')
  }, {
    key: 'l4',
    label: t('joinExp.revshare_calculator.levels.l4'),
    description: t('joinExp.revshare_calculator.level_descriptions.l4')
  }, {
    key: 'l5',
    label: t('joinExp.revshare_calculator.levels.l5'),
    description: t('joinExp.revshare_calculator.level_descriptions.l5')
  }, {
    key: 'l6',
    label: t('joinExp.revshare_calculator.levels.l6'),
    description: t('joinExp.revshare_calculator.level_descriptions.l6')
  }, {
    key: 'l7',
    label: t('joinExp.revshare_calculator.levels.l7'),
    description: t('joinExp.revshare_calculator.level_descriptions.l7')
  }] as const;
  const baseRevShare = levels.reduce((total, level) => {
    return total + calculateActiveRevShare(level.key);
  }, 0);
  const bonusAmount = bonusSettings?.enabled ? baseRevShare * bonus / 100 : 0;
  const totalRevShare = baseRevShare + bonusAmount;
  const getRequiredApql = (level: keyof LevelPercents): number => {
    if (level === 'l4') return thresholds.l4;
    if (level === 'l5') return thresholds.l5;
    if (level === 'l6') return thresholds.l6;
    if (level === 'l7') return thresholds.l7;
    return 0;
  };
  return <section id="revshare-calculator" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 mx-auto">
            <Calculator className="h-8 w-8" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            {t('joinExp.revshare_calculator.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('joinExp.revshare_calculator.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <Card className="border-0 shadow-elegant rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('joinExp.revshare_calculator.calculation_params')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-4 block">
                  {t('joinExp.revshare_calculator.level_configuration')}
                </Label>
                <div className="space-y-4">
                  {levels.map(level => {
                  const isActive = isLevelActive(level.key);
                  const requiredApql = getRequiredApql(level.key);
                  return <div key={level.key} className="p-3 rounded-xl border border-primary/20 bg-primary/5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="min-w-0 flex-shrink-0">
                            <div className="font-medium text-sm">
                              {level.label} ({percents[level.key]}%)
                            </div>
                            {requiredApql > 0 && <div className={`text-xs ${isActive ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                {t('joinExp.revshare_calculator.required_apql', { count: requiredApql })}
                              </div>}
                          </div>
                          
                          <div className="flex gap-2 sm:gap-3">
                            <div className="w-24 sm:w-28">
                              <Label htmlFor={`agents-${level.key}`} className="text-xs font-medium block mb-1">
                                {t('joinExp.revshare_calculator.agent_count')}
                              </Label>
                              <Input id={`agents-${level.key}`} type="number" value={agentCounts[level.key]} onChange={e => setAgentCounts(prev => ({
                            ...prev,
                            [level.key]: Math.max(0, Number(e.target.value) || 0)
                          }))} className="h-8 text-sm" min={0} />
                            </div>
                            
                            <div className="w-28 sm:w-32">
                              <Label htmlFor={`revenue-${level.key}`} className="text-xs font-medium block mb-1">
                                {t('joinExp.revshare_calculator.avg_revenue')}
                              </Label>
                              <Input id={`revenue-${level.key}`} type="number" value={avgRevenues[level.key]} onChange={e => setAvgRevenues(prev => ({
                            ...prev,
                            [level.key]: Math.max(0, Number(e.target.value) || 0)
                          }))} className="h-8 text-sm" min={0} step={500} />
                            </div>
                          </div>
                        </div>
                      </div>;
                })}
                </div>
              </div>

              <div>
                <Label htmlFor="apql" className="text-sm font-medium">
                  {t('joinExp.revshare_calculator.apql_label')}
                </Label>
                <Input id="apql" type="number" value={apql} onChange={e => setApql(Number(e.target.value) || 0)} className="mt-2 text-lg" min={0} step={1} />
                <p className="text-sm text-muted-foreground mt-1">{t('joinExp.revshare_calculator.apql_description')}</p>
              </div>

              {bonusSettings?.enabled && <div>
                  <Label htmlFor="bonus" className="text-sm font-medium">
                    {t('joinExp.revshare_calculator.bonus_label')}
                  </Label>
                  <Input id="bonus" type="number" value={bonus} onChange={e => setBonus(Math.min(100, Number(e.target.value) || 0))} className="mt-2 text-lg" min={0} max={100} step={1} />
                  <p className="text-sm text-muted-foreground mt-1">{t('joinExp.revshare_calculator.bonus_description')}</p>
                </div>}

              <div className="p-4 bg-primary/5 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">{t('joinExp.revshare_calculator.how_it_works')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('joinExp.revshare_calculator.how_it_works_desc')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 shadow-elegant rounded-2xl">
            <CardHeader>
              <CardTitle>{t('joinExp.revshare_calculator.estimated_revenue')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                 {levels.map(level => {
                const isActive = isLevelActive(level.key);
                const requiredApql = getRequiredApql(level.key);
                const revenue = calculateRevShare(level.key);
                const activeRevenue = calculateActiveRevShare(level.key);
                return <div key={level.key} className={`flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? 'bg-muted/30' : 'bg-muted/10 opacity-60'}`}>
                      <div className="flex items-center gap-2">
                        {!isActive && requiredApql > 0 && <Lock className="h-4 w-4 text-muted-foreground" />}
                        <div>
                          <div className={`font-medium ${isActive ? '' : 'text-muted-foreground'}`}>
                            {level.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {agentCounts[level.key]} agents × {avgRevenues[level.key].toLocaleString('fr-FR')}€ × {percents[level.key]}%
                            {requiredApql > 0 && <div className={`${isActive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                • {t('joinExp.revshare_calculator.required_apql', { count: requiredApql })}
                              </div>}
                          </div>
                        </div>
                      </div>
                       <Badge variant={isActive ? "secondary" : "outline"} className={`text-sm font-semibold ${!isActive ? 'opacity-50' : ''}`}>
                         {revenue.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}
                         {!isActive && revenue > 0 && <span className="text-xs ml-1">{t('joinExp.revshare_calculator.not_counted')}</span>}
                       </Badge>
                    </div>;
              })}
              </div>

              {bonusSettings?.enabled && bonusAmount > 0 && <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-green-800 dark:text-green-200">
                        {t('joinExp.revshare_calculator.bonus_revshare')} ({bonus}%)
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        {t('joinExp.revshare_calculator.applied_to_base')}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-green-800 dark:text-green-200">
                      +{bonusAmount.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                    </div>
                  </div>
                </div>}

              <div className="mt-6 p-4 bg-gradient-primary rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{t('joinExp.revshare_calculator.total_monthly')}</div>
                    <div className="text-xs text-white/80">{t('joinExp.revshare_calculator.passive_income')}</div>
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
                  <strong>Disclaimer:</strong> {t('joinExp.revshare_calculator.disclaimer')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default RevShareCalculator;