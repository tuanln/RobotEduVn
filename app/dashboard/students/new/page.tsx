"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { LearningStage } from "@/lib/types";

const STAGES: { value: LearningStage; label: string }[] = [
  { value: "kham-pha", label: "Khám Phá (4-12)" },
  { value: "tu-duy", label: "Tư Duy (8-12)" },
  { value: "lap-trinh", label: "Lập Trình (9-12)" },
  { value: "iot-robot", label: "IoT & Robot (10-15)" },
  { value: "chia-se", label: "Chia Sẻ (15-18)" },
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
        setError(data.error || "Lỗi khi tạo học sinh");
        return;
      }

      const student = await res.json();
      router.push(`/dashboard/students/${student.id}`);
    } catch {
      setError("Lỗi kết nối. Thử lại sau.");
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
        <h1 className="text-2xl font-bold">Thêm học sinh mới</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Họ và tên *</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn An"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Tên gọi (nickname)</label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="An"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Ngày sinh</label>
                <Input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Giới tính</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">-- Chọn --</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Lớp</label>
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
                <label className="mb-1 block text-sm font-medium">Trường</label>
                <Input
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="TH Lê Văn Tám"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin phụ huynh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Tên phụ huynh</label>
              <Input
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Nguyễn Văn Bình"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Số điện thoại</label>
                <Input
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="0901234567"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
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
            <CardTitle className="text-base">Học tập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Giai đoạn hiện tại *</label>
              <select
                value={currentStage}
                onChange={(e) => setCurrentStage(e.target.value as LearningStage)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {STAGES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Maker Hub ID *</label>
              <Input
                value={makerHubId}
                onChange={(e) => setMakerHubId(e.target.value)}
                placeholder="hub-hcm-01"
                required
              />
            </div>
          </CardContent>
        </Card>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo học sinh"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/students">Hủy</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
