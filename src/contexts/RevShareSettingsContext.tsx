import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type LevelPercents = {
  l1y1: number;
  l1y2: number;
  l2: number;
  l3: number;
  l4: number;
  l5: number;
  l6: number;
  l7: number;
};

export type APQLThresholds = {
  l4: number;
  l5: number;
  l6: number;
  l7: number;
};

export type BonusSettings = {
  enabled: boolean;
  defaultValue: number;
};

const DEFAULT_PERCENTS: LevelPercents = {
  l1y1: 5.0,
  l1y2: 3.5,
  l2: 4.0,
  l3: 2.5,
  l4: 1.5,
  l5: 1.0,
  l6: 2.5,
  l7: 5.0
};

const DEFAULT_APQL_THRESHOLDS: APQLThresholds = {
  l4: 5,
  l5: 10,
  l6: 15,
  l7: 30
};

const DEFAULT_BONUS_SETTINGS: BonusSettings = {
  enabled: true,
  defaultValue: 0
};

interface RevShareSettingsContextType {
  percents: LevelPercents;
  apqlThresholds: APQLThresholds;
  bonusSettings: BonusSettings;
  loading: boolean;
  saveSettings: (updates: {
    percents?: LevelPercents;
    apqlThresholds?: APQLThresholds;
    bonusSettings?: BonusSettings;
  }) => Promise<void>;
}

const RevShareSettingsContext = createContext<RevShareSettingsContextType | undefined>(undefined);

interface RevShareSettingsProviderProps {
  children: ReactNode;
}

export const RevShareSettingsProvider: React.FC<RevShareSettingsProviderProps> = ({ children }) => {
  const [percents, setPercents] = useState<LevelPercents>(DEFAULT_PERCENTS);
  const [apqlThresholds, setApqlThresholds] = useState<APQLThresholds>(DEFAULT_APQL_THRESHOLDS);
  const [bonusSettings, setBonusSettings] = useState<BonusSettings>(DEFAULT_BONUS_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('revshare_settings')
        .select('percents, apql_thresholds, bonus_settings')
        .single();

      if (error) {
        console.warn('Failed to fetch revshare settings, using defaults:', error);
        setPercents(DEFAULT_PERCENTS);
        setApqlThresholds(DEFAULT_APQL_THRESHOLDS);
        setBonusSettings(DEFAULT_BONUS_SETTINGS);
      } else if (data) {
        if (data.percents) setPercents(data.percents as LevelPercents);
        if (data.apql_thresholds) setApqlThresholds(data.apql_thresholds as APQLThresholds);
        if (data.bonus_settings) setBonusSettings(data.bonus_settings as BonusSettings);
      }
    } catch (error) {
      console.warn('Supabase error, using defaults:', error);
      setPercents(DEFAULT_PERCENTS);
      setApqlThresholds(DEFAULT_APQL_THRESHOLDS);
      setBonusSettings(DEFAULT_BONUS_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (updates: {
    percents?: LevelPercents;
    apqlThresholds?: APQLThresholds;
    bonusSettings?: BonusSettings;
  }): Promise<void> => {
    try {
      const updateData: any = {};
      if (updates.percents) updateData.percents = updates.percents;
      if (updates.apqlThresholds) updateData.apql_thresholds = updates.apqlThresholds;
      if (updates.bonusSettings) updateData.bonus_settings = updates.bonusSettings;

      const { error } = await supabase
        .from('revshare_settings')
        .update(updateData)
        .eq('id', (await supabase.from('revshare_settings').select('id').single()).data?.id);

      if (error) {
        throw error;
      }

      if (updates.percents) setPercents(updates.percents);
      if (updates.apqlThresholds) setApqlThresholds(updates.apqlThresholds);
      if (updates.bonusSettings) setBonusSettings(updates.bonusSettings);
    } catch (error) {
      console.error('Failed to save revshare settings:', error);
      throw error;
    }
  };

  const value: RevShareSettingsContextType = {
    percents,
    apqlThresholds,
    bonusSettings,
    loading,
    saveSettings
  };

  return (
    <RevShareSettingsContext.Provider value={value}>
      {children}
    </RevShareSettingsContext.Provider>
  );
};

export const useRevShareSettings = (): RevShareSettingsContextType => {
  const context = useContext(RevShareSettingsContext);
  if (context === undefined) {
    throw new Error('useRevShareSettings must be used within a RevShareSettingsProvider');
  }
  return context;
};