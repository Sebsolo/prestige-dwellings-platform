import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  city: string;
  quote: string;
  note: number;
  published: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Load testimonials from API
    setLoading(false);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <AdminLayout title="Gestion des Témoignages">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Témoignages Clients</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Témoignage
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {testimonials.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Aucun témoignage trouvé. Ajoutez votre premier témoignage !
                  </p>
                </CardContent>
              </Card>
            ) : (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {testimonial.author}
                          <div className="flex">
                            {renderStars(testimonial.note)}
                          </div>
                        </CardTitle>
                        <CardDescription>
                          {testimonial.city}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={testimonial.published ? 'default' : 'secondary'}>
                          {testimonial.published ? 'Publié' : 'Brouillon'}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4 line-clamp-3">
                      "{testimonial.quote}"
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Créé le {new Date(testimonial.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;