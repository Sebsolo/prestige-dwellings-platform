import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface Lead {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  meta?: any;
  created_at: string;
}

interface Property {
  id: number;
  title_fr: string;
  ref?: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load leads
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (leadsError) throw leadsError;

        // Load properties for reference
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('id, title_fr, ref')
          .eq('status', 'published');

        if (propertiesError) throw propertiesError;

        setLeads(leadsData || []);
        setProperties(propertiesData || []);
      } catch (error) {
        console.error('Error loading leads:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      new: 'outline',
      contacted: 'secondary',
      qualified: 'default',
      converted: 'default',
      lost: 'destructive'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      contact: 'Contact',
      valuation: 'Estimation',
      visit_request: 'Demande de visite',
      recruitment: 'Recrutement'
    };
    return labels[source] || source;
  };

  const getPropertyTitle = (propertyId?: string) => {
    if (!propertyId) return '-';
    const property = properties.find(p => p.id.toString() === propertyId);
    return property ? `${property.ref ? `${property.ref} - ` : ''}${property.title_fr}` : `Bien ${propertyId}`;
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesSource;
  });

  const exportToCsv = () => {
    // TODO: Implement CSV export
    console.log('Export CSV');
  };

  return (
    <AdminLayout title="Gestion des Leads">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Leads et Prospects</h2>
          <Button onClick={exportToCsv}>
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="new">Nouveau</SelectItem>
                  <SelectItem value="contacted">Contacté</SelectItem>
                  <SelectItem value="qualified">Qualifié</SelectItem>
                  <SelectItem value="converted">Converti</SelectItem>
                  <SelectItem value="lost">Perdu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sources</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                  <SelectItem value="valuation">Estimation</SelectItem>
                  <SelectItem value="visit_request">Demande de visite</SelectItem>
                  <SelectItem value="recruitment">Recrutement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Bien</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-muted-foreground">
                          {loading ? 'Chargement...' : 'Aucun lead trouvé'}
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          {lead.firstname} {lead.lastname}
                        </TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {getSourceLabel(lead.source)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {getPropertyTitle(lead.meta?.property_id)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;