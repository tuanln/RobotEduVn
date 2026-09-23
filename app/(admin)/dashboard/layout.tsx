"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { AuthProviderWrapper } from "@/components/providers/auth-provider";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/dang-nhap");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProviderWrapper>
      <DashboardShell>{children}</DashboardShell>
    </AuthProviderWrapper>
  );
}
