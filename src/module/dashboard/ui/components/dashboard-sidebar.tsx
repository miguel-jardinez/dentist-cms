"use client";

import {
  BarChart,
  Bell,
  Calendar,
  FileText,
  FlaskConical,
  FolderOpen,
  Gift,
  Image,
  MessageCircle,
  Newspaper,
  Package,
  Pill,
  Receipt,
  Settings,
  ShieldCheck,
  Star,
  Stethoscope,
  Users } from "lucide-react";
import Link from "next/link";

import { Sidebar, SidebarContent, SidebarHeader } from "@dentist/components/ui/sidebar";

export const groupedRoutes = [
  {
    label: "Análisis",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: BarChart },
      { label: "Reviews", href: "/reviews", icon: Star }
    ]
  },
  {
    label: "Gestión Clínica",
    items: [
      { label: "Appointments", href: "/appointments", icon: Calendar },
      { label: "Patients", href: "/patients", icon: Stethoscope },
      { label: "Forms", href: "/forms", icon: FileText },
      { label: "Treatments", href: "/treatments", icon: FlaskConical },
      { label: "Medical Records", href: "/medical-records", icon: FolderOpen },
      { label: "Prescriptions", href: "/prescriptions", icon: Pill },
      { label: "Clinical Images", href: "/images", icon: Image }
    ]
  },
  {
    label: "Administración",
    items: [
      { label: "Invoices", href: "/invoices", icon: Receipt },
      { label: "Collaborators", href: "/collaborators", icon: Users },
      { label: "Inventory", href: "/inventory", icon: Package }
    ]
  },
  {
    label: "Comunicación",
    items: [
      { label: "Messages", href: "/messages", icon: MessageCircle },
      { label: "Notifications", href: "/notifications", icon: Bell }
    ]
  },
  {
    label: "Marketing",
    items: [
      { label: "Blog", href: "/blog", icon: Newspaper },
      { label: "Promotions", href: "/promotions", icon: Gift }
    ]
  },
  {
    label: "Configuración",
    items: [
      { label: "Roles & Permissions", href: "/roles", icon: ShieldCheck },
      { label: "Settings", href: "/settings", icon: Settings }
    ]
  }
];

const DashboardSidebar = () => (
  <Sidebar>
    <SidebarHeader>
      <Link href="">
        Dentist
      </Link>
    </SidebarHeader>
    <SidebarContent>

    </SidebarContent>
  </Sidebar>
);
 
export default DashboardSidebar;
