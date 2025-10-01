import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Convert hex to HSL
const hexToHsl = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  bootstrapSettings?: { primary_color?: string; secondary_color?: string } | null;
}

export const ThemeProvider = ({ children, bootstrapSettings }: ThemeProviderProps) => {
  const [settings, setSettings] = useState<any>(bootstrapSettings || null);

  // Only fetch if no bootstrap data provided
  useEffect(() => {
    if (!bootstrapSettings) {
      const fetchSettings = async () => {
        try {
          const { data } = await supabase
            .from('site_settings')
            .select('primary_color, secondary_color')
            .single();
          
          if (data) {
            setSettings(data);
          }
        } catch (error) {
          console.log('No theme settings found, using defaults');
        }
      };

      // Defer this fetch if no bootstrap data
      setTimeout(fetchSettings, 200);
    }
  }, [bootstrapSettings]);

  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      
      // Apply primary color
      if (settings.primary_color) {
        const primaryHsl = hexToHsl(settings.primary_color);
        root.style.setProperty('--primary', primaryHsl);
        root.style.setProperty('--accent', primaryHsl);
        root.style.setProperty('--ring', primaryHsl);
        
        // Update gradients with the new primary color
        root.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${primaryHsl}), hsl(${primaryHsl.replace(/\d+%/, (l) => `${Math.max(0, parseInt(l) - 7)}%`)}))`);
      }
      
      // Apply secondary color
      if (settings.secondary_color) {
        const secondaryHsl = hexToHsl(settings.secondary_color);
        root.style.setProperty('--muted-foreground', secondaryHsl);
      }
    }
  }, [settings]);

  return <>{children}</>;
};