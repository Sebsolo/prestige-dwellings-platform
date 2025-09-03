import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import RequireRole from "./components/RequireRole";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Rentals from "./pages/Rentals";
import PropertyDetail from "./pages/PropertyDetail";
import JoinExp from "./pages/JoinExp";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Valuation from "./pages/Valuation";
import Contact from "./pages/Contact";
import LegalNotice from "./pages/LegalNotice";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ventes" element={<Sales />} />
              <Route path="/locations" element={<Rentals />} />
              <Route path="/bien/:idOrSlug" element={<PropertyDetail />} />
              <Route path="/rejoindre-exp" element={<JoinExp />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
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
                    <Admin />
                  </RequireRole>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
