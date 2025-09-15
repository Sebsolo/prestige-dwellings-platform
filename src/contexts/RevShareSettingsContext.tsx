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

interface RevShareSettingsContextType {
  percents: LevelPercents;
  loading: boolean;
  savePercents: (updatedPercents: LevelPercents) => Promise<void>;
}

const RevShareSettingsContext = createContext<RevShareSettingsContextType | undefined>(undefined);

interface RevShareSettingsProviderProps {
  children: ReactNode;
}

export const RevShareSettingsProvider: React.FC<RevShareSettingsProviderProps> = ({ children }) => {
  const [percents, setPercents] = useState<LevelPercents>(DEFAULT_PERCENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPercents();
  }, []);

  const fetchPercents = async () => {
    try {
      const { data, error } = await supabase
        .from('revshare_settings')
        .select('percents')
        .single();

      if (error) {
        console.warn('Failed to fetch revshare settings, using defaults:', error);
        setPercents(DEFAULT_PERCENTS);
      } else if (data?.percents) {
        setPercents(data.percents as LevelPercents);
      }
    } catch (error) {
      console.warn('Supabase error, using default percents:', error);
      setPercents(DEFAULT_PERCENTS);
    } finally {
      setLoading(false);
    }
  };

  const savePercents = async (updatedPercents: LevelPercents): Promise<void> => {
    try {
      const { error } = await supabase
        .from('revshare_settings')
        .update({ percents: updatedPercents })
        .eq('id', (await supabase.from('revshare_settings').select('id').single()).data?.id);

      if (error) {
        throw error;
      }

      setPercents(updatedPercents);
    } catch (error) {
      console.error('Failed to save revshare settings:', error);
      throw error;
    }
  };

  const value: RevShareSettingsContextType = {
    percents,
    loading,
    savePercents
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