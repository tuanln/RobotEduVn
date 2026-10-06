import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VideoHubContent } from "@/components/video/video-hub-content";
import { localeOf } from "@/lib/i18n/params";

export const metadata: Metadata = {
  title: "Video Hub",
  description:
    "Video bài học STEM & Robot, phân loại theo ba nhịp Chơi, Làm, Chia sẻ.",
};

export default async function VideoHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Video Hub"
          subtitle="Video bài học STEM & Robot, phân loại theo ba nhịp Chơi, Làm, Chia sẻ"
        />
        <Suspense
          fallback={
            <div className="py-20 text-center text-muted-foreground">
              Đang tải video...
            </div>
          }
        >
          <VideoHubContent locale={locale} />
        </Suspense>
      </div>
    </div>
  );
}
