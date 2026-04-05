"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, LayoutDashboard, Users, Settings } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import type { UserRole } from "@/lib/types/auth";

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  teacher: "Giáo viên",
  parent: "Phụ huynh",
  student: "Học sinh",
};

const NAV_ITEMS = [
  {
    label: "Tổng quan",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    roles: ["admin", "teacher", "parent", "student"] as UserRole[],
  },
  {
    label: "Học sinh",
    href: "/dashboard/students",
    icon: <Users className="h-4 w-4" />,
    roles: ["admin", "teacher"] as UserRole[],
  },
  {
    label: "Cài đặt",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
    roles: ["admin", "teacher", "parent", "student"] as UserRole[],
  },
];

export function Topbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const filteredItems = NAV_ITEMS.filter((item) => item.roles.includes(user.role));

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-56">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex items-center gap-2 pb-4 pt-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              R
            </div>
            <span className="text-sm font-bold">
              Robot<span className="text-primary">.Edu</span>.VN
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            {filteredItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{user.displayName}</p>
          <Badge variant="secondary" className="text-xs">
            {ROLE_LABELS[user.role]}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={signOut} title="Đăng xuất">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
