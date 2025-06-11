import { SidebarProvider } from "@dentist/components/ui/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children } : LayoutProps) => (
  <SidebarProvider>
    {children}
  </SidebarProvider>
);
 
export default DashboardLayout;
