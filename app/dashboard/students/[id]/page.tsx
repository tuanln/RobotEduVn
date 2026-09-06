"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pencil, Save, Trash2, X } from "lucide-react";
import Link from "next/link";
import type { Student } from "@/lib/types/student";
import type { NhipSlug } from "@/lib/types";
import { NHIP } from "@/lib/content/nhip";

const NHIP_OPTIONS = NHIP.map((n) => ({ value: n.slug, label: n.ten }));

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState<Partial<Student>>({});

  const loadStudent = useCallback(async function loadStudent() {
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
  }, [params.id]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

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
        setError("Lỗi khi cập nhật.");
      }
    } catch {
      setError("Lỗi kết nối.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Bạn có chắc muốn vô hiệu hóa học sinh này?")) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      await fetch(`/api/students/${params.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dashboard/students");
    } catch {
      setError("Lỗi khi xóa.");
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Đang tải...</p>;
  }

  if (!student) {
    return <p className="text-destructive">Không tìm thấy học sinh.</p>;
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
            <p className="font-mono text-sm text-muted-foreground">{student.paperId}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!editing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Pencil className="mr-1 h-3 w-3" />
                Sửa
              </Button>
              {user?.role === "admin" && (
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-1 h-3 w-3" />
                  Vô hiệu hóa
                </Button>
              )}
            </>
          ) : (
            <>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Save className="mr-1 h-3 w-3" />
                {saving ? "Đang lưu..." : "Lưu"}
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
                Hủy
              </Button>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

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
            <p className="text-xs text-muted-foreground">Chuỗi ngày</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold">{student.badges?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">Huy hiệu</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {editing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Họ tên</label>
                  <Input
                    value={editData.fullName || ""}
                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Nickname</label>
                  <Input
                    value={editData.nickname || ""}
                    onChange={(e) => setEditData({ ...editData, nickname: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Nhịp</label>
                  <select
                    value={editData.currentStage || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, currentStage: e.target.value as NhipSlug })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {NHIP_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Maker Hub</label>
                  <Input
                    value={editData.makerHubId || ""}
                    onChange={(e) => setEditData({ ...editData, makerHubId: e.target.value })}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Nickname:</span> {student.nickname}
              </div>
              <div>
                <span className="text-muted-foreground">Giới tính:</span> {student.gender || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Ngày sinh:</span> {student.dateOfBirth || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Lớp:</span> {student.grade || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Trường:</span> {student.school || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Nhịp:</span>{" "}
                <Badge variant="outline">{student.currentStage}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Maker Hub:</span> {student.makerHubId}
              </div>
              <div>
                <span className="text-muted-foreground">Trạng thái:</span>{" "}
                <Badge variant={student.status === "active" ? "default" : "secondary"}>
                  {student.status}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">RFID:</span>{" "}
                <span className="font-mono">{student.rfidUid || "Chưa liên kết"}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Phụ huynh</CardTitle>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Tên phụ huynh</label>
                <Input
                  value={editData.parentName || ""}
                  onChange={(e) => setEditData({ ...editData, parentName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Điện thoại</label>
                  <Input
                    value={editData.parentPhone || ""}
                    onChange={(e) => setEditData({ ...editData, parentPhone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <Input
                    value={editData.parentEmail || ""}
                    onChange={(e) => setEditData({ ...editData, parentEmail: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Tên:</span> {student.parentName || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">SĐT:</span> {student.parentPhone || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span> {student.parentEmail || "—"}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
