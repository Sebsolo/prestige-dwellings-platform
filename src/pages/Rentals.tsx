import Layout from '@/components/Layout';

const Rentals = () => {
  return (
    <Layout title="Locations" description="Propriétés en location">
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
            Propriétés en Location
          </h1>
          <p className="text-lg text-muted-foreground">
            Page des locations en construction...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Rentals;