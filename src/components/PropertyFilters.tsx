import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export interface PropertyFiltersType {
  city?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  rooms?: number;
  type?: string;
  dpe?: string;
}

interface PropertyFiltersProps {
  filters: PropertyFiltersType;
  onFiltersChange: (filters: PropertyFiltersType) => void;
  transaction: 'sale' | 'rent';
}

const PropertyFiltersComponent = ({ filters, onFiltersChange, transaction }: PropertyFiltersProps) => {
  const { t } = useTranslation();

  const handleFilterChange = (key: keyof PropertyFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({});
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="city">{t('common.city')}</Label>
            <Input
              id="city"
              placeholder="Ville..."
              value={filters.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="type">{t('common.type')}</Label>
            <Select value={filters.type || 'all'} onValueChange={(value) => handleFilterChange('type', value === 'all' ? undefined : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type de bien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="apartment">Appartement</SelectItem>
                <SelectItem value="house">Maison</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Terrain</SelectItem>
                <SelectItem value="garage">Garage / Parking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priceMin">Prix min</Label>
            <Input
              id="priceMin"
              type="number"
              placeholder={transaction === 'sale' ? '€' : '€/mois'}
              value={filters.priceMin || ''}
              onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="priceMax">Prix max</Label>
            <Input
              id="priceMax"
              type="number"
              placeholder={transaction === 'sale' ? '€' : '€/mois'}
              value={filters.priceMax || ''}
              onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="areaMin">Surface min</Label>
            <Input
              id="areaMin"
              type="number"
              placeholder="m²"
              value={filters.areaMin || ''}
              onChange={(e) => handleFilterChange('areaMin', parseInt(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="rooms">{t('common.rooms')}</Label>
            <Select value={filters.rooms?.toString() || 'all'} onValueChange={(value) => handleFilterChange('rooms', value === 'all' ? undefined : parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pièces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="1">1 pièce</SelectItem>
                <SelectItem value="2">2 pièces</SelectItem>
                <SelectItem value="3">3 pièces</SelectItem>
                <SelectItem value="4">4 pièces</SelectItem>
                <SelectItem value="5">5+ pièces</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dpe">DPE</Label>
            <Select value={filters.dpe || 'all'} onValueChange={(value) => handleFilterChange('dpe', value === 'all' ? undefined : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Classe DPE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes classes</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="F">F</SelectItem>
                <SelectItem value="G">G</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" onClick={resetFilters} className="w-full">
              {t('common.reset')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFiltersComponent;