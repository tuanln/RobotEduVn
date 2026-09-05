import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VideoHubContent } from "@/components/video/video-hub-content";

export const metadata: Metadata = {
  title: "Video Hub",
  description:
    "Video bài học STEM & Robot — từ cơ bản đến nâng cao. Phân loại theo lộ trình học 5 bước.",
};

export default function VideoHubPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Video Hub"
          subtitle="Video bài học STEM & Robot — từ cơ bản đến nâng cao"
        />
        <Suspense
          fallback={
            <div className="py-20 text-center text-muted-foreground">
              Đang tải video...
            </div>
          }
        >
          <VideoHubContent />
        </Suspense>
      </div>
    </div>
  );
}
