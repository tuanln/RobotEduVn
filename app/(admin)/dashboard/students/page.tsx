"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
        Bạn không có quyền truy cập trang này.
      </p>
    );
  }

  const STATUS_COLORS: Record<string, string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300",
    inactive: "bg-muted text-muted-foreground",
    graduated: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý học sinh</h1>
          <p className="text-muted-foreground">{students.length} học sinh</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/students/new">
            <Plus className="mr-2 h-4 w-4" />
            Thêm học sinh
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, Paper ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="secondary">
          Tìm
        </Button>
      </form>

      {loading ? (
        <p className="text-muted-foreground">Đang tải...</p>
      ) : students.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Chưa có học sinh nào. Bấm &ldquo;Thêm học sinh&rdquo; để bắt đầu.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Paper ID</th>
                    <th className="px-4 py-3 text-left font-medium">Họ tên</th>
                    <th className="px-4 py-3 text-left font-medium">Nhịp</th>
                    <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                    <th className="px-4 py-3 text-left font-medium">Sao</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b transition-colors hover:bg-muted/30">
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
                        <p className="text-xs text-muted-foreground">{student.nickname}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{student.currentStage}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[student.status] || ""}`}
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
