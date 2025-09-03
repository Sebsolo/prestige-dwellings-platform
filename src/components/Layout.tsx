import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout = ({ children, title, description, keywords }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title={title} description={description} keywords={keywords} />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;