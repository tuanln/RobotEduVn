# Phase 2A: Firebase + Auth + Student CRUD + Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Firebase backend, authentication with 4 roles, student CRUD, and a shared dashboard layout to robot.edu.vn

**Architecture:** Hybrid dashboard routing — shared layout with sidebar at `/dashboard`, feature-based pages (`/dashboard/students`, `/dashboard/settings`), role-based menu filtering via AuthProvider context. Public pages keep existing `(public)` layout with Header/Footer. Firebase client SDK for auth, Admin SDK for server-side API routes.

**Tech Stack:** Next.js 16, TypeScript, Firebase 11 (client), firebase-admin 13, Firestore, Firebase Auth (email/password), Tailwind CSS 4, shadcn/ui components

---

## File Structure

```
lib/
  firebase/
    config.ts              — Firebase client SDK singleton (browser)
    admin.ts               — Firebase Admin SDK singleton (server-only)
    auth-context.tsx       — AuthProvider React context + useAuth hook
  firestore/
    students.ts            — Student CRUD functions (server-side, Admin SDK)
    users.ts               — User doc CRUD (server-side)
  types/
    auth.ts                — UserRole, AuthUser, UserDoc types
    student.ts             — Student, StudentFormData types

app/
  (public)/
    layout.tsx             — Wraps children with Header + Footer
    page.tsx               — Move existing homepage here
  (auth)/
    dang-nhap/page.tsx     — Login page (email/password)
  dashboard/
    layout.tsx             — Auth guard + sidebar + topbar
    page.tsx               — Redirect based on role
    students/
      page.tsx             — Student list with search/filter (admin, teacher)
      new/page.tsx         — Create new student form
      [id]/page.tsx        — Student detail + edit
    settings/
      page.tsx             — Placeholder settings page

components/
  dashboard/
    sidebar.tsx            — Role-filtered sidebar navigation
    topbar.tsx             — User info + logout button
  providers/
    auth-provider.tsx      — Client component wrapping AuthProvider

app/api/
  auth/
    me/route.ts            — GET current user info (verify token)
  students/
    route.ts               — GET list, POST create
    [id]/route.ts          — GET detail, PUT update, DELETE soft-delete
    counter/route.ts       — Internal: get next Paper ID
```

---

### Task 1: Install Firebase dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install firebase and firebase-admin**

```bash
cd /Users/tuanln/Ai-Code/RobotEduVn/robot-edu-vn
npm install firebase firebase-admin
```

- [ ] **Step 2: Update .env.example with Firebase variables**

Add to `.env.example`:

```env
# Firebase Client (public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (server-side only)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Device auth (NEO One)
DEVICE_SHARED_SECRET=your_shared_secret
```

- [ ] **Step 3: Update .env.local with Firebase variables**

Add same variables to `.env.local` with placeholder values (user will fill in real values from Firebase console).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "feat: add firebase and firebase-admin dependencies"
```

---

### Task 2: Firebase client and admin SDK setup

**Files:**
- Create: `lib/firebase/config.ts`
- Create: `lib/firebase/admin.ts`

- [ ] **Step 1: Create Firebase client config**

Create `lib/firebase/config.ts`:

```typescript
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
```

- [ ] **Step 2: Create Firebase Admin SDK config**

Create `lib/firebase/admin.ts`:

```typescript
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds (Firebase modules are tree-shaken, no runtime errors without env vars in build).

- [ ] **Step 4: Commit**

```bash
git add lib/firebase/
git commit -m "feat: add Firebase client and admin SDK configuration"
```

---

### Task 3: Auth types and user types

**Files:**
- Create: `lib/types/auth.ts`
- Create: `lib/types/student.ts`

- [ ] **Step 1: Create auth types**

Create `lib/types/auth.ts`:

```typescript
export type UserRole = "admin" | "teacher" | "parent" | "student";

export interface UserDoc {
  email: string;
  displayName: string;
  role: UserRole;
  linkedStudentIds: string[];
  makerHubId?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  linkedStudentIds: string[];
  makerHubId?: string;
}
```

- [ ] **Step 2: Create student types**

Create `lib/types/student.ts`:

```typescript
import type { LearningStage } from "../types";

export interface Student {
  id: string;
  paperId: string;
  rfidUid?: string;
  fullName: string;
  nickname: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  grade?: number;
  school?: string;
  parentPhone?: string;
  parentEmail?: string;
  parentName?: string;
  currentStage: LearningStage;
  totalStars: number;
  badges: string[];
  streak: number;
  makerHubId: string;
  mentorId?: string;
  status: "active" | "inactive" | "graduated";
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentFormData {
  fullName: string;
  nickname: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  grade?: number;
  school?: string;
  parentPhone?: string;
  parentEmail?: string;
  parentName?: string;
  currentStage: LearningStage;
  makerHubId: string;
  mentorId?: string;
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/types/
git commit -m "feat: add auth and student type definitions"
```

---

### Task 4: AuthProvider context

**Files:**
- Create: `lib/firebase/auth-context.tsx`
- Create: `components/providers/auth-provider.tsx`

- [ ] **Step 1: Create auth context with Firebase onAuthStateChanged**

Create `lib/firebase/auth-context.tsx`:

```typescript
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import type { AuthUser, UserRole } from "../types/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: data.displayName || firebaseUser.displayName || "",
            role: data.role as UserRole,
            linkedStudentIds: data.linkedStudentIds || [],
            makerHubId: data.makerHubId,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

- [ ] **Step 2: Create auth provider wrapper component**

Create `components/providers/auth-provider.tsx`:

```typescript
"use client";

import { AuthProvider } from "@/lib/firebase/auth-context";

export function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/firebase/auth-context.tsx components/providers/
git commit -m "feat: add AuthProvider context with Firebase auth state"
```

---

### Task 5: Reorganize routes — public group layout

**Files:**
- Create: `app/(public)/layout.tsx`
- Move: `app/page.tsx` → `app/(public)/page.tsx`
- Move: `app/hanh-trinh/` → `app/(public)/hanh-trinh/`
- Move: `app/video-hub/` → `app/(public)/video-hub/`
- Move: `app/cong-dong/` → `app/(public)/cong-dong/`
- Move: `app/gioi-thieu/` → `app/(public)/gioi-thieu/`
- Move: `app/triet-ly/` → `app/(public)/triet-ly/`
- Move: `app/cho-mentor/` → `app/(public)/cho-mentor/`
- Move: `app/cong-cu/` → `app/(public)/cong-cu/`
- Modify: `app/layout.tsx` — remove Header/Footer (moved to public layout)

- [ ] **Step 1: Create public group layout**

Create `app/(public)/layout.tsx`:

```typescript
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
```

- [ ] **Step 2: Move all public pages into (public) group**

```bash
cd /Users/tuanln/Ai-Code/RobotEduVn/robot-edu-vn
mkdir -p "app/(public)"
mv app/page.tsx "app/(public)/page.tsx"
mv app/hanh-trinh "app/(public)/hanh-trinh"
mv app/video-hub "app/(public)/video-hub"
mv app/cong-dong "app/(public)/cong-dong"
mv app/gioi-thieu "app/(public)/gioi-thieu"
mv app/triet-ly "app/(public)/triet-ly"
mv app/cho-mentor "app/(public)/cho-mentor"
mv app/cong-cu "app/(public)/cong-cu"
mv app/admin "app/(public)/admin"
```

- [ ] **Step 3: Update root layout — remove Header/Footer**

Modify `app/layout.tsx` to remove Header, Footer, ChatWidget imports and usage. Keep only the html/body wrapper:

```typescript
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Robot.Edu.VN — Giao Duc STEM & Robot Mo",
    template: "%s | Robot.Edu.VN",
  },
  description:
    "Nen tang giao duc STEM & Robot mo cho tre em Viet Nam. Hoc di doi voi Lam — tu Kham pha den Chia se. Muc tieu 1 trieu tre em tiep can STEM trong 5 nam.",
  keywords: [
    "STEM", "Robot", "giao duc", "tre em", "Viet Nam",
    "MakerViet", "OpenSTEM", "lap trinh", "ThingBot",
  ],
  authors: [{ name: "OpenSTEM Foundation" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://robot.edu.vn",
    siteName: "Robot.Edu.VN",
    title: "Robot.Edu.VN — Giao Duc STEM & Robot Mo",
    description:
      "Nen tang giao duc STEM & Robot mo cho tre em Viet Nam. Muc tieu 1 trieu tre em tiep can STEM trong 5 nam.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build and all public pages still work**

```bash
npm run build
```

Expected: Build succeeds, all existing routes still work under `(public)` group.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: reorganize routes into (public) group layout"
```

---

### Task 6: Login page

**Files:**
- Create: `app/(auth)/dang-nhap/page.tsx`

- [ ] **Step 1: Create login page**

Create `app/(auth)/dang-nhap/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", credential.user.uid));

      if (!userDoc.exists()) {
        setError("Tai khoan chua duoc cau hinh. Lien he admin.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Email hoac mat khau khong dung.");
    } finally {
      setLoading(false);
    }
  }

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
          <CardTitle>Dang Nhap</CardTitle>
          <CardDescription>
            Dang nhap vao he thong quan ly
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
                Mat khau
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
              {loading ? "Dang xu ly..." : "Dang Nhap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(auth)/"
git commit -m "feat: add login page with Firebase Auth"
```

---

### Task 7: Dashboard layout with sidebar and topbar

**Files:**
- Create: `components/dashboard/sidebar.tsx`
- Create: `components/dashboard/topbar.tsx`
- Create: `app/dashboard/layout.tsx`
- Create: `app/dashboard/page.tsx`

- [ ] **Step 1: Create sidebar component**

Create `components/dashboard/sidebar.tsx`:

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types/auth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Tong quan",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    roles: ["admin", "teacher", "parent", "student"],
  },
  {
    label: "Hoc sinh",
    href: "/dashboard/students",
    icon: <Users className="h-4 w-4" />,
    roles: ["admin", "teacher"],
  },
  {
    label: "Cai dat",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
    roles: ["admin", "teacher", "parent", "student"],
  },
];

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const filteredItems = NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-muted/30 lg:block">
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            R
          </div>
          <span className="text-sm font-bold">
            Robot<span className="text-primary">.Edu</span>.VN
          </span>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {filteredItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
```

- [ ] **Step 2: Create topbar component**

Create `components/dashboard/topbar.tsx`:

```typescript
"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types/auth";
import { useState } from "react";

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  teacher: "Giao vien",
  parent: "Phu huynh",
  student: "Hoc sinh",
};

const NAV_ITEMS = [
  {
    label: "Tong quan",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    roles: ["admin", "teacher", "parent", "student"] as UserRole[],
  },
  {
    label: "Hoc sinh",
    href: "/dashboard/students",
    icon: <Users className="h-4 w-4" />,
    roles: ["admin", "teacher"] as UserRole[],
  },
  {
    label: "Cai dat",
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

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4">
      {/* Mobile menu */}
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

      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{user.displayName}</p>
          <Badge variant="secondary" className="text-xs">
            {ROLE_LABELS[user.role]}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={signOut} title="Dang xuat">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create dashboard layout with auth guard**

Create `app/dashboard/layout.tsx`:

```typescript
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
        <p className="text-muted-foreground">Dang tai...</p>
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
```

- [ ] **Step 4: Create dashboard index page (redirect by role)**

Create `app/dashboard/page.tsx`:

```typescript
"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, LayoutDashboard, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Xin chao, {user.displayName}!
        </h1>
        <p className="text-muted-foreground">
          Tong quan he thong Robot.Edu.VN
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Vai tro
            </CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user.role}</div>
          </CardContent>
        </Card>

        {(user.role === "admin" || user.role === "teacher") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Hoc sinh
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.linkedStudentIds.length}
              </div>
              <p className="text-xs text-muted-foreground">
                da lien ket
              </p>
            </CardContent>
          </Card>
        )}

        {user.role === "parent" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Con em
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.linkedStudentIds.length}
              </div>
              <p className="text-xs text-muted-foreground">
                hoc sinh lien ket
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add app/dashboard/ components/dashboard/
git commit -m "feat: add dashboard layout with sidebar, topbar, and auth guard"
```

---

### Task 8: Auth API route (verify token, get user info)

**Files:**
- Create: `app/api/auth/me/route.ts`
- Create: `lib/firestore/users.ts`

- [ ] **Step 1: Create users Firestore helper**

Create `lib/firestore/users.ts`:

```typescript
import { adminDb } from "@/lib/firebase/admin";
import type { UserDoc } from "@/lib/types/auth";

export async function getUserDoc(uid: string): Promise<UserDoc | null> {
  const snap = await adminDb.collection("users").doc(uid).get();
  if (!snap.exists) return null;
  return { ...snap.data() } as UserDoc;
}

export async function createUserDoc(
  uid: string,
  data: Omit<UserDoc, "createdAt" | "updatedAt">
): Promise<void> {
  const now = new Date();
  await adminDb
    .collection("users")
    .doc(uid)
    .set({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
}
```

- [ ] **Step 2: Create /api/auth/me route**

Create `app/api/auth/me/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { getUserDoc } from "@/lib/firestore/users";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const userDoc = await getUserDoc(decoded.uid);

    if (!userDoc) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email,
      displayName: userDoc.displayName,
      role: userDoc.role,
      linkedStudentIds: userDoc.linkedStudentIds,
      makerHubId: userDoc.makerHubId,
    });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/auth/ lib/firestore/users.ts
git commit -m "feat: add /api/auth/me route and users Firestore helper"
```

---

### Task 9: Student CRUD — Firestore helpers

**Files:**
- Create: `lib/firestore/students.ts`

- [ ] **Step 1: Create student CRUD functions**

Create `lib/firestore/students.ts`:

```typescript
import { adminDb } from "@/lib/firebase/admin";
import type { Student, StudentFormData } from "@/lib/types/student";
import { FieldValue } from "firebase-admin/firestore";

const STUDENTS = "students";
const COUNTERS = "counters";

async function getNextPaperId(): Promise<string> {
  const counterRef = adminDb.collection(COUNTERS).doc("students");
  const result = await adminDb.runTransaction(async (tx) => {
    const counterDoc = await tx.get(counterRef);
    const current = counterDoc.exists ? (counterDoc.data()?.lastNumber || 0) : 0;
    const next = current + 1;
    tx.set(counterRef, { lastNumber: next }, { merge: true });
    return next;
  });
  const year = new Date().getFullYear();
  return `STU-${year}-${String(result).padStart(4, "0")}`;
}

export async function listStudents(filters?: {
  makerHubId?: string;
  mentorId?: string;
  status?: string;
  search?: string;
}): Promise<Student[]> {
  let query: FirebaseFirestore.Query = adminDb.collection(STUDENTS);

  if (filters?.makerHubId) {
    query = query.where("makerHubId", "==", filters.makerHubId);
  }
  if (filters?.mentorId) {
    query = query.where("mentorId", "==", filters.mentorId);
  }
  if (filters?.status) {
    query = query.where("status", "==", filters.status);
  }

  query = query.orderBy("createdAt", "desc").limit(100);

  const snap = await query.get();
  let students = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Student[];

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    students = students.filter(
      (s) =>
        s.fullName.toLowerCase().includes(searchLower) ||
        s.paperId.toLowerCase().includes(searchLower) ||
        s.nickname.toLowerCase().includes(searchLower)
    );
  }

  return students;
}

export async function getStudent(id: string): Promise<Student | null> {
  const snap = await adminDb.collection(STUDENTS).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Student;
}

export async function createStudent(
  data: StudentFormData
): Promise<Student> {
  const paperId = await getNextPaperId();
  const now = new Date();

  const studentData = {
    ...data,
    paperId,
    rfidUid: "",
    totalStars: 0,
    badges: [],
    streak: 0,
    status: "active" as const,
    createdAt: now,
    updatedAt: now,
  };

  const ref = await adminDb.collection(STUDENTS).add(studentData);
  return { id: ref.id, ...studentData };
}

export async function updateStudent(
  id: string,
  data: Partial<StudentFormData>
): Promise<void> {
  await adminDb
    .collection(STUDENTS)
    .doc(id)
    .update({
      ...data,
      updatedAt: new Date(),
    });
}

export async function deleteStudent(id: string): Promise<void> {
  await adminDb.collection(STUDENTS).doc(id).update({
    status: "inactive",
    updatedAt: new Date(),
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/firestore/students.ts
git commit -m "feat: add student CRUD Firestore helpers with auto Paper ID"
```

---

### Task 10: Student API routes

**Files:**
- Create: `app/api/students/route.ts`
- Create: `app/api/students/[id]/route.ts`

- [ ] **Step 1: Create /api/students route (GET list, POST create)**

Create `app/api/students/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { getUserDoc } from "@/lib/firestore/users";
import { listStudents, createStudent } from "@/lib/firestore/students";
import type { StudentFormData } from "@/lib/types/student";

async function verifyAuthAndRole(request: NextRequest, allowedRoles: string[]) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const userDoc = await getUserDoc(decoded.uid);

    if (!userDoc || !allowedRoles.includes(userDoc.role)) {
      return { error: "Forbidden", status: 403 };
    }

    return { uid: decoded.uid, userDoc };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

export async function GET(request: NextRequest) {
  const authResult = await verifyAuthAndRole(request, [
    "admin",
    "teacher",
  ]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const { searchParams } = new URL(request.url);

  const students = await listStudents({
    makerHubId: searchParams.get("makerHubId") || undefined,
    mentorId: searchParams.get("mentorId") || undefined,
    status: searchParams.get("status") || undefined,
    search: searchParams.get("search") || undefined,
  });

  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  const authResult = await verifyAuthAndRole(request, [
    "admin",
    "teacher",
  ]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const body = (await request.json()) as StudentFormData;

  if (!body.fullName || !body.nickname || !body.makerHubId) {
    return NextResponse.json(
      { error: "fullName, nickname, makerHubId are required" },
      { status: 400 }
    );
  }

  const student = await createStudent(body);
  return NextResponse.json(student, { status: 201 });
}
```

- [ ] **Step 2: Create /api/students/[id] route (GET, PUT, DELETE)**

Create `app/api/students/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { getUserDoc } from "@/lib/firestore/users";
import {
  getStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/firestore/students";

async function verifyAuthAndRole(request: NextRequest, allowedRoles: string[]) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const userDoc = await getUserDoc(decoded.uid);

    if (!userDoc || !allowedRoles.includes(userDoc.role)) {
      return { error: "Forbidden", status: 403 };
    }

    return { uid: decoded.uid, userDoc };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await verifyAuthAndRole(request, [
    "admin",
    "teacher",
    "parent",
  ]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const student = await getStudent(id);
  if (!student) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await verifyAuthAndRole(request, [
    "admin",
    "teacher",
  ]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const body = await request.json();
  await updateStudent(id, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await verifyAuthAndRole(request, ["admin"]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  await deleteStudent(id);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/students/
git commit -m "feat: add student API routes (list, create, get, update, delete)"
```

---

### Task 11: Student list page

**Files:**
- Create: `app/dashboard/students/page.tsx`

- [ ] **Step 1: Create student list page with search and table**

Create `app/dashboard/students/page.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import type { Student } from "@/lib/types/student";

export default function StudentsPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents(searchQuery?: string) {
    setLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/students?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setStudents(await res.json());
      }
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    loadStudents(search);
  }

  if (!user || (user.role !== "admin" && user.role !== "teacher")) {
    return (
      <p className="text-muted-foreground">
        Ban khong co quyen truy cap trang nay.
      </p>
    );
  }

  const STATUS_COLORS: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    graduated: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quan ly hoc sinh</h1>
          <p className="text-muted-foreground">
            {students.length} hoc sinh
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/students/new">
            <Plus className="mr-2 h-4 w-4" />
            Them hoc sinh
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tim theo ten, Paper ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="secondary">
          Tim
        </Button>
      </form>

      {loading ? (
        <p className="text-muted-foreground">Dang tai...</p>
      ) : students.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Chua co hoc sinh nao. Bam "Them hoc sinh" de bat dau.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">
                      Paper ID
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Ho ten
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Giai doan
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Trang thai
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Sao
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b transition-colors hover:bg-muted/30"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/dashboard/students/${student.id}`}
                          className="font-mono text-primary hover:underline"
                        >
                          {student.paperId}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/dashboard/students/${student.id}`}
                          className="font-medium hover:underline"
                        >
                          {student.fullName}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {student.nickname}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">
                          {student.currentStage}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            STATUS_COLORS[student.status] || ""
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{student.totalStars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/dashboard/students/page.tsx
git commit -m "feat: add student list page with search and table"
```

---

### Task 12: Create student page

**Files:**
- Create: `app/dashboard/students/new/page.tsx`

- [ ] **Step 1: Create new student form page**

Create `app/dashboard/students/new/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { LearningStage } from "@/lib/types";

const STAGES: { value: LearningStage; label: string }[] = [
  { value: "kham-pha", label: "Kham Pha (4-12)" },
  { value: "tu-duy", label: "Tu Duy (8-12)" },
  { value: "lap-trinh", label: "Lap Trinh (9-12)" },
  { value: "iot-robot", label: "IoT & Robot (10-15)" },
  { value: "chia-se", label: "Chia Se (15-18)" },
];

export default function NewStudentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<string>("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [currentStage, setCurrentStage] = useState<LearningStage>("kham-pha");
  const [makerHubId, setMakerHubId] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          nickname: nickname || fullName.split(" ").pop() || fullName,
          dateOfBirth: dateOfBirth || undefined,
          gender: gender || undefined,
          grade: grade ? parseInt(grade) : undefined,
          school: school || undefined,
          parentName: parentName || undefined,
          parentPhone: parentPhone || undefined,
          parentEmail: parentEmail || undefined,
          currentStage,
          makerHubId: makerHubId || user?.makerHubId || "default",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Loi khi tao hoc sinh");
        return;
      }

      const student = await res.json();
      router.push(`/dashboard/students/${student.id}`);
    } catch {
      setError("Loi ket noi. Thu lai sau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Them hoc sinh moi</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thong tin ca nhan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Ho va ten *
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyen Van An"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Ten goi (nickname)
              </label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="An"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Ngay sinh
                </label>
                <Input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Gioi tinh
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">-- Chon --</option>
                  <option value="male">Nam</option>
                  <option value="female">Nu</option>
                  <option value="other">Khac</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Lop
                </label>
                <Input
                  type="number"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="4"
                  min={1}
                  max={12}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Truong
                </label>
                <Input
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="TH Le Van Tam"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thong tin phu huynh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Ten phu huynh
              </label>
              <Input
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Nguyen Van Binh"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  So dien thoai
                </label>
                <Input
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="0901234567"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <Input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="phuhuynh@gmail.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hoc tap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Giai doan hien tai *
              </label>
              <select
                value={currentStage}
                onChange={(e) =>
                  setCurrentStage(e.target.value as LearningStage)
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {STAGES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Maker Hub ID *
              </label>
              <Input
                value={makerHubId}
                onChange={(e) => setMakerHubId(e.target.value)}
                placeholder="hub-hcm-01"
                required
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Dang tao..." : "Tao hoc sinh"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/students">Huy</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/dashboard/students/new/
git commit -m "feat: add create student form page"
```

---

### Task 13: Student detail + edit page

**Files:**
- Create: `app/dashboard/students/[id]/page.tsx`

- [ ] **Step 1: Create student detail page with edit capability**

Create `app/dashboard/students/[id]/page.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pencil, Save, Trash2, X } from "lucide-react";
import Link from "next/link";
import type { Student } from "@/lib/types/student";
import type { LearningStage } from "@/lib/types";

const STAGES: { value: LearningStage; label: string }[] = [
  { value: "kham-pha", label: "Kham Pha" },
  { value: "tu-duy", label: "Tu Duy" },
  { value: "lap-trinh", label: "Lap Trinh" },
  { value: "iot-robot", label: "IoT & Robot" },
  { value: "chia-se", label: "Chia Se" },
];

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Edit form state
  const [editData, setEditData] = useState<Partial<Student>>({});

  useEffect(() => {
    loadStudent();
  }, [params.id]);

  async function loadStudent() {
    setLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/students/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setStudent(data);
        setEditData(data);
      }
    } catch (err) {
      console.error("Failed to load student:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/students/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: editData.fullName,
          nickname: editData.nickname,
          dateOfBirth: editData.dateOfBirth,
          gender: editData.gender,
          grade: editData.grade,
          school: editData.school,
          parentName: editData.parentName,
          parentPhone: editData.parentPhone,
          parentEmail: editData.parentEmail,
          currentStage: editData.currentStage,
          makerHubId: editData.makerHubId,
        }),
      });

      if (res.ok) {
        setEditing(false);
        loadStudent();
      } else {
        setError("Loi khi cap nhat.");
      }
    } catch {
      setError("Loi ket noi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Ban co chac muon vo hieu hoa hoc sinh nay?")) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      await fetch(`/api/students/${params.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dashboard/students");
    } catch {
      setError("Loi khi xoa.");
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Dang tai...</p>;
  }

  if (!student) {
    return <p className="text-destructive">Khong tim thay hoc sinh.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/students">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{student.fullName}</h1>
            <p className="font-mono text-sm text-muted-foreground">
              {student.paperId}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!editing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
              >
                <Pencil className="mr-1 h-3 w-3" />
                Sua
              </Button>
              {user?.role === "admin" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Vo hieu hoa
                </Button>
              )}
            </>
          ) : (
            <>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Save className="mr-1 h-3 w-3" />
                {saving ? "Dang luu..." : "Luu"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditing(false);
                  setEditData(student);
                }}
              >
                <X className="mr-1 h-3 w-3" />
                Huy
              </Button>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold">{student.totalStars}</div>
            <p className="text-xs text-muted-foreground">Sao</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold">{student.streak}</div>
            <p className="text-xs text-muted-foreground">Chuoi ngay</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold">{student.badges.length}</div>
            <p className="text-xs text-muted-foreground">Huy hieu</p>
          </CardContent>
        </Card>
      </div>

      {/* Info card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thong tin ca nhan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {editing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Ho ten
                  </label>
                  <Input
                    value={editData.fullName || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, fullName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Nickname
                  </label>
                  <Input
                    value={editData.nickname || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, nickname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Giai doan
                  </label>
                  <select
                    value={editData.currentStage || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        currentStage: e.target.value as LearningStage,
                      })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {STAGES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Maker Hub
                  </label>
                  <Input
                    value={editData.makerHubId || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, makerHubId: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Nickname:</span>{" "}
                {student.nickname}
              </div>
              <div>
                <span className="text-muted-foreground">Gioi tinh:</span>{" "}
                {student.gender || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Ngay sinh:</span>{" "}
                {student.dateOfBirth || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Lop:</span>{" "}
                {student.grade || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Truong:</span>{" "}
                {student.school || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Giai doan:</span>{" "}
                <Badge variant="outline">{student.currentStage}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Maker Hub:</span>{" "}
                {student.makerHubId}
              </div>
              <div>
                <span className="text-muted-foreground">Trang thai:</span>{" "}
                <Badge
                  variant={
                    student.status === "active" ? "default" : "secondary"
                  }
                >
                  {student.status}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">RFID:</span>{" "}
                <span className="font-mono">
                  {student.rfidUid || "Chua lien ket"}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parent info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Phu huynh</CardTitle>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Ten phu huynh
                </label>
                <Input
                  value={editData.parentName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, parentName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Dien thoai
                  </label>
                  <Input
                    value={editData.parentPhone || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, parentPhone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    value={editData.parentEmail || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, parentEmail: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Ten:</span>{" "}
                {student.parentName || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">SĐT:</span>{" "}
                {student.parentPhone || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>{" "}
                {student.parentEmail || "—"}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/dashboard/students/\[id\]/
git commit -m "feat: add student detail page with inline editing"
```

---

### Task 14: Settings placeholder page

**Files:**
- Create: `app/dashboard/settings/page.tsx`

- [ ] **Step 1: Create placeholder settings page**

Create `app/dashboard/settings/page.tsx`:

```typescript
"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Cai dat</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thong tin tai khoan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Email:</span> {user.email}
          </div>
          <div>
            <span className="text-muted-foreground">Ten:</span>{" "}
            {user.displayName}
          </div>
          <div>
            <span className="text-muted-foreground">Vai tro:</span> {user.role}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/dashboard/settings/
git commit -m "feat: add settings placeholder page"
```

---

### Task 15: Add seed script for first admin user

**Files:**
- Create: `scripts/seed-admin.ts`

- [ ] **Step 1: Create seed admin script**

Create `scripts/seed-admin.ts`:

```typescript
/**
 * Seed script: Create the first admin user in Firebase.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 *
 * Requires .env.local with FIREBASE_ADMIN_* variables set.
 *
 * This creates a Firebase Auth user + Firestore /users/{uid} doc with role "admin".
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "dotenv";

config({ path: ".env.local" });

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const adminAuth = getAuth(app);
const adminDb = getFirestore(app);

async function seedAdmin() {
  const email = "admin@robot.edu.vn";
  const password = "openstem2026";
  const displayName = "Admin";

  try {
    // Create Firebase Auth user
    let user;
    try {
      user = await adminAuth.getUserByEmail(email);
      console.log(`User ${email} already exists: ${user.uid}`);
    } catch {
      user = await adminAuth.createUser({
        email,
        password,
        displayName,
      });
      console.log(`Created user: ${user.uid}`);
    }

    // Create Firestore user doc
    await adminDb
      .collection("users")
      .doc(user.uid)
      .set(
        {
          email,
          displayName,
          role: "admin",
          linkedStudentIds: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { merge: true }
      );

    console.log(`User doc created/updated for ${email} with role=admin`);
    console.log(`\nLogin: ${email} / ${password}`);
  } catch (err) {
    console.error("Error:", err);
  }

  process.exit(0);
}

seedAdmin();
```

- [ ] **Step 2: Install tsx dev dependency for running scripts**

```bash
npm install -D tsx
```

- [ ] **Step 3: Commit**

```bash
git add scripts/ package.json package-lock.json
git commit -m "feat: add seed-admin script for first admin user setup"
```

---

### Task 16: Final build verification and move robots/sitemap

**Files:**
- Move: `app/robots.ts` → `app/(public)/robots.ts` (or keep in app/ if needed at root)
- Move: `app/sitemap.ts` → `app/(public)/sitemap.ts` (or keep in app/ if needed at root)

- [ ] **Step 1: Verify robots.ts and sitemap.ts placement**

`robots.ts` and `sitemap.ts` must stay in `app/` root (Next.js convention for root metadata routes). Do NOT move them.

- [ ] **Step 2: Run full build**

```bash
cd /Users/tuanln/Ai-Code/RobotEduVn/robot-edu-vn
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Test locally**

```bash
npm run dev
```

Verify:
- `http://localhost:3000` — public homepage works (Header + Footer visible)
- `http://localhost:3000/dang-nhap` — login page shows
- `http://localhost:3000/dashboard` — redirects to `/dang-nhap` when not logged in
- All existing public pages still work

- [ ] **Step 4: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: final adjustments for Phase 2A build"
```
