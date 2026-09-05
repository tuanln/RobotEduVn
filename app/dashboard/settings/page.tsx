"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Email:</span> {user.email}
          </div>
          <div>
            <span className="text-muted-foreground">Tên:</span> {user.displayName}
          </div>
          <div>
            <span className="text-muted-foreground">Vai trò:</span> {user.role}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
