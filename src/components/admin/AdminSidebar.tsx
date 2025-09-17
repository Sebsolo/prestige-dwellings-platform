import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Building2, FileText, MessageSquare, Users, Settings, ChevronLeft, LogOut, Calculator, Video } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const adminItems = [
  { title: 'Biens', url: '/admin/properties', icon: Building2, roles: ['admin', 'editor', 'agent'] },
  { title: 'Showcase', url: '/admin/showcase', icon: Video, roles: ['admin', 'editor'] },
  { title: 'Blog', url: '/admin/blog', icon: FileText, roles: ['admin', 'editor'] },
  { title: 'Témoignages', url: '/admin/testimonials', icon: MessageSquare, roles: ['admin', 'editor'] },
  { title: 'Leads', url: '/admin/leads', icon: Users, roles: ['admin', 'editor', 'agent'] },
  { title: 'RevShare', url: '/admin/revshare', icon: Calculator, roles: ['admin'] },
  { title: 'Paramètres', url: '/admin/settings', icon: Settings, roles: ['admin'] },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50';

  const filteredItems = adminItems.filter(item => 
    profile?.role && item.roles.includes(profile.role)
  );

  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-60'} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <div className="p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-foreground">Administration</h2>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t">
          <Button 
            onClick={signOut} 
            variant="outline" 
            size="sm"
            className="w-full"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Déconnexion</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}