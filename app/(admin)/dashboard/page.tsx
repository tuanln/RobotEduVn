"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, LayoutDashboard, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Xin chào, {user.displayName}!</h1>
        <p className="text-muted-foreground">Tổng quan hệ thống Robot.Edu.VN</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vai trò</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user.role}</div>
          </CardContent>
        </Card>

        {(user.role === "admin" || user.role === "teacher") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Học sinh</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.linkedStudentIds.length}</div>
              <p className="text-xs text-muted-foreground">đã liên kết</p>
            </CardContent>
          </Card>
        )}

        {user.role === "parent" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Con em</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.linkedStudentIds.length}</div>
              <p className="text-xs text-muted-foreground">học sinh liên kết</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
