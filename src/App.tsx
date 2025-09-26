import { useEffect, lazy, Suspense, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { loadGTM, pushPageView } from "./lib/gtm";
import { bindCMPToGTM } from "./lib/cmp-bridge";
import RequireRole from "./components/RequireRole";
import { ThemeProvider } from "./components/ThemeProvider";
import { RevShareSettingsProvider } from "./contexts/RevShareSettingsContext";
import { supabase } from "@/integrations/supabase/client";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Rentals from "./pages/Rentals";
import PropertyDetail from "./pages/PropertyDetail";
import JoinExp from "./pages/JoinExp";
import Valuation from "./pages/Valuation";
import Contact from "./pages/Contact";
import LegalNotice from "./pages/LegalNotice";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Login from "./pages/Login";

// Lazy load non-critical components
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminProperties = lazy(() => import("./pages/admin/AdminProperties"));
const AdminPropertyForm = lazy(() => import("./pages/admin/AdminPropertyForm"));
const AdminPropertyEdit = lazy(() => import("./pages/admin/AdminPropertyEdit"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminBlogForm = lazy(() => import("./pages/admin/AdminBlogForm"));
const AdminBlogEdit = lazy(() => import("./pages/admin/AdminBlogEdit"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminRevShare = lazy(() => import("./pages/admin/AdminRevShare"));
const AdminCarousel = lazy(() => import("./pages/admin/AdminCarousel"));
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";

const queryClient = new QueryClient();

const GTMTracker = () => {
  const location = useLocation();

  useEffect(() => {
    loadGTM();
    
    // Initialize CMP integration after a short delay to ensure Axeptio loads
    const timer = setTimeout(() => {
      bindCMPToGTM();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    pushPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => {
  const [themeSettings, setThemeSettings] = useState<any>(null);

  useEffect(() => {
    // Fetch theme settings early for global application
    const fetchThemeSettings = async () => {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('primary_color, secondary_color')
          .single();
        
        if (data) {
          setThemeSettings(data);
        }
      } catch (error) {
        console.log('No theme settings found, using defaults');
      }
    };

    // Defer theme fetch to not block critical path
    setTimeout(fetchThemeSettings, 100);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider bootstrapSettings={themeSettings}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <GTMTracker />
                <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ventes" element={<Sales />} />
              <Route path="/locations" element={<Rentals />} />
              <Route path="/bien/:idOrSlug" element={<PropertyDetail />} />
              <Route path="/rejoindre-exp" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RevShareSettingsProvider>
                    <JoinExp />
                  </RevShareSettingsProvider>
                </Suspense>
              } />
              <Route path="/blog" element={<Suspense fallback={null}><Blog /></Suspense>} />
              <Route path="/blog/:slug" element={<Suspense fallback={null}><BlogPost /></Suspense>} />
              <Route path="/estimation" element={<Valuation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<LegalNotice />} />
              <Route path="/rgpd" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor', 'agent']}>
                    <Suspense fallback={null}>
                      <Admin />
                    </Suspense>
                  </RequireRole>
                } 
              />
              <Route 
                path="/admin/properties" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor', 'agent']}>
                    <Suspense fallback={null}><AdminProperties /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/properties/new" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor', 'agent']}>
                    <Suspense fallback={null}><AdminPropertyForm /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/properties/edit/:id" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor', 'agent']}>
                    <Suspense fallback={null}><AdminPropertyEdit /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/blog"
                element={
                  <RequireRole allowedRoles={['admin', 'editor']}>
                    <Suspense fallback={null}><AdminBlog /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/blog/new" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor']}>
                    <Suspense fallback={null}><AdminBlogForm /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/blog/edit/:id" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor']}>
                    <Suspense fallback={null}><AdminBlogEdit /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/testimonials" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor']}>
                    <Suspense fallback={null}><AdminTestimonials /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/leads" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor', 'agent']}>
                    <Suspense fallback={null}><AdminLeads /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/settings" 
                element={
                  <RequireRole allowedRoles={['admin']}>
                    <Suspense fallback={null}><AdminSettings /></Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/revshare" 
                element={
                  <RequireRole allowedRoles={['admin']}>
                    <Suspense fallback={null}>
                      <RevShareSettingsProvider>
                        <AdminRevShare />
                      </RevShareSettingsProvider>
                    </Suspense>
                  </RequireRole>
                }
              />
              <Route 
                path="/admin/carousel" 
                element={
                  <RequireRole allowedRoles={['admin', 'editor']}>
                    <Suspense fallback={null}><AdminCarousel /></Suspense>
                  </RequireRole>
                }
              />
              {/* Sitemap route */}
              <Route path="/sitemap.xml" element={<Sitemap />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
