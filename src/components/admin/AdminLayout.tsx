import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import SEO from '@/components/SEO';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={title ? `${title} - Administration` : 'Administration'} 
        description={description || 'Espace d\'administration Sebastien Pons Immobilier'} 
      />
      
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-14 flex items-center border-b bg-card px-4">
              <SidebarTrigger />
              <div className="ml-4">
                <h1 className="text-lg font-semibold text-foreground">
                  {title || 'Administration'}
                </h1>
              </div>
            </header>

            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;