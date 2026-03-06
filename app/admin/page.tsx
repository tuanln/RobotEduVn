"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [status, setStatus] = useState("");

  // Video form
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoStage, setVideoStage] = useState("kham-pha");
  const [videoAge, setVideoAge] = useState("");
  const [videoTags, setVideoTags] = useState("");
  const [videoDesc, setVideoDesc] = useState("");

  // Article form
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("tin-tuc");
  const [articleExcerpt, setArticleExcerpt] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Simple client-side check — real auth would use API
    if (password === "openstem2026") {
      setAuthenticated(true);
    } else {
      setStatus("Mật khẩu không đúng.");
    }
  }

  function extractYouTubeInfo(url: string) {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/
    );
    if (match) {
      const id = match[1];
      setVideoUrl(url);
      // Auto-fill thumbnail
      setStatus(`Đã nhận diện YouTube ID: ${id}`);
    }
  }

  async function handleRevalidate(path: string) {
    setStatus("Đang cập nhật...");
    try {
      const res = await fetch(
        `/api/revalidate?secret=openstem-revalidate&path=${path}`,
        { method: "POST" }
      );
      if (res.ok) {
        setStatus(`Đã cập nhật trang ${path}`);
      } else {
        setStatus("Lỗi khi cập nhật.");
      }
    } catch {
      setStatus("Lỗi kết nối.");
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Đăng Nhập
              </Button>
              {status && (
                <p className="text-sm text-destructive">{status}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-3xl font-bold">Admin Panel</h1>

        {status && (
          <div className="mb-6 rounded-lg bg-muted p-3 text-sm">{status}</div>
        )}

        <Tabs defaultValue="video">
          <TabsList className="mb-6">
            <TabsTrigger value="video">Thêm Video</TabsTrigger>
            <TabsTrigger value="article">Thêm Bài Viết</TabsTrigger>
            <TabsTrigger value="revalidate">Cập Nhật Cache</TabsTrigger>
          </TabsList>

          {/* Add Video */}
          <TabsContent value="video">
            <Card>
              <CardHeader>
                <CardTitle>Thêm Video Mới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    YouTube URL
                  </label>
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value);
                      extractYouTubeInfo(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Tiêu đề
                  </label>
                  <Input
                    placeholder="Tên video..."
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Giai đoạn
                    </label>
                    <select
                      value={videoStage}
                      onChange={(e) => setVideoStage(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="kham-pha">Khám Phá (4-12)</option>
                      <option value="tu-duy">Tư Duy (8-12)</option>
                      <option value="lap-trinh">Lập Trình (9-12)</option>
                      <option value="iot-robot">IoT & Robot (10-15)</option>
                      <option value="chia-se">Chia Sẻ (15-18)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Độ tuổi
                    </label>
                    <Input
                      placeholder="4-12"
                      value={videoAge}
                      onChange={(e) => setVideoAge(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Tags (phân cách bằng dấu phẩy)
                  </label>
                  <Input
                    placeholder="python, lap-trinh, co-ban"
                    value={videoTags}
                    onChange={(e) => setVideoTags(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Mô tả
                  </label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={3}
                    placeholder="Mô tả video..."
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() =>
                    setStatus(
                      "Tính năng ghi vào Google Sheets sẽ hoạt động khi có SHEETS API key. Hiện tại dữ liệu được lưu trong mock data."
                    )
                  }
                  className="w-full"
                >
                  Thêm Video
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Article */}
          <TabsContent value="article">
            <Card>
              <CardHeader>
                <CardTitle>Thêm Bài Viết Mới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Tiêu đề
                  </label>
                  <Input
                    placeholder="Tiêu đề bài viết..."
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Danh mục
                    </label>
                    <select
                      value={articleCategory}
                      onChange={(e) => setArticleCategory(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="tin-tuc">Tin Tức</option>
                      <option value="du-an">Dự Án</option>
                      <option value="huong-dan">Hướng Dẫn</option>
                      <option value="tap-chi">Tạp Chí</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Tác giả
                    </label>
                    <Input
                      placeholder="Tên tác giả"
                      value={articleAuthor}
                      onChange={(e) => setArticleAuthor(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Tóm tắt
                  </label>
                  <Input
                    placeholder="Tóm tắt 2-3 câu..."
                    value={articleExcerpt}
                    onChange={(e) => setArticleExcerpt(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Nội dung (Markdown)
                  </label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                    rows={10}
                    placeholder="Nội dung bài viết..."
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() =>
                    setStatus(
                      "Tính năng ghi vào Google Sheets sẽ hoạt động khi có SHEETS API key."
                    )
                  }
                  className="w-full"
                >
                  Đăng Bài Viết
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revalidate */}
          <TabsContent value="revalidate">
            <Card>
              <CardHeader>
                <CardTitle>Cập Nhật Cache</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Bấm nút để cập nhật nội dung từ Google Sheets lên website.
                </p>
                {[
                  { path: "/video-hub", label: "Video Hub" },
                  { path: "/cong-dong/du-an", label: "Dự Án" },
                  { path: "/cong-dong/tap-chi", label: "Tạp Chí" },
                  { path: "/cong-dong/maker-hub", label: "Maker Hub" },
                  { path: "/", label: "Trang Chủ" },
                ].map((item) => (
                  <Button
                    key={item.path}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleRevalidate(item.path)}
                  >
                    {item.label}
                    <span className="text-xs text-muted-foreground">
                      {item.path}
                    </span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
