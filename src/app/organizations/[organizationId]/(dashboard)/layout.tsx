import { SidebarProvider } from "@dentist/components/ui/sidebar";
import DashboardNavbar from "@dentist/module/dashboard/ui/components/dashboard-navbar";
import DashboardSidebar from "@dentist/module/dashboard/ui/components/dashboard-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children } : LayoutProps) => (
  <SidebarProvider>
    <DashboardSidebar />
    <main className="flex flex-col h-screen w-screen bg-muted">
      <DashboardNavbar />
      <div className="p-4">
        {children}
      </div>
    </main>
  </SidebarProvider>
);
 
export default DashboardLayout;
