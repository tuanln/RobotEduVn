"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

function NotConfigured() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Chưa cấu hình Firebase</CardTitle>
          <CardDescription>
            Khu vực quản trị cần Firebase Auth &amp; Firestore. Phần công khai
            của website vẫn hoạt động bình thường.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Thêm các biến <code className="text-foreground">NEXT_PUBLIC_FIREBASE_*</code>{" "}
            và <code className="text-foreground">FIREBASE_ADMIN_*</code> vào{" "}
            <code className="text-foreground">.env.local</code> (khi chạy máy) hoặc
            vào Environment Variables của Vercel (khi deploy), rồi khởi động lại.
          </p>
          <p>
            Các bước lấy khoá xem trong{" "}
            <code className="text-foreground">docs/SETUP_GUIDE.md</code>.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const configured = isFirebaseConfigured();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", credential.user.uid));

      if (!userDoc.exists()) {
        await signOut(auth);
        setError("Tài khoản chưa được cấu hình. Liên hệ admin.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Email hoặc mật khẩu không đúng.");
    } finally {
      setLoading(false);
    }
  }

  if (!configured) return <NotConfigured />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
              R
            </div>
            <span className="text-lg font-bold">
              Robot<span className="text-primary">.Edu</span>.VN
            </span>
          </Link>
          <CardTitle>Đăng Nhập</CardTitle>
          <CardDescription>
            Đăng nhập vào hệ thống quản lý
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Mật khẩu
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng Nhập"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
