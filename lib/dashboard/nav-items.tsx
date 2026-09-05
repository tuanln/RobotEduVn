import { LayoutDashboard, Users, Settings } from "lucide-react";
import type { UserRole } from "@/lib/types/auth";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    label: "Tổng quan",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    roles: ["admin", "teacher", "parent", "student"],
  },
  {
    label: "Học sinh",
    href: "/dashboard/students",
    icon: <Users className="h-4 w-4" />,
    roles: ["admin", "teacher"],
  },
  {
    label: "Cài đặt",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
    roles: ["admin", "teacher", "parent", "student"],
  },
];
