import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVideos } from "@/lib/sheets";
import { VideoPlayer } from "@/components/video/video-player";
import { StageBadge } from "@/components/common/stage-badge";
import { VideoCard } from "@/components/video/video-card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locales";
import { pathFor, videoPath } from "@/lib/i18n/routes";
import { videoChu } from "@/lib/content/video";
import { ogImages } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; videoId: string }>;
}): Promise<Metadata> {
  const { locale: raw, videoId } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const video = (await getVideos()).find((v) => v.id === videoId);
  if (!video) return {};
  // Trang một video đi theo Video Hub (đã dịch) — khai cặp hreflang vi↔en.
  return {
    title: video.title,
    description: video.description,
    alternates: {
      canonical: videoPath(video.id, locale),
      languages: {
        vi: videoPath(video.id, "vi"),
        en: videoPath(video.id, "en"),
        "x-default": videoPath(video.id, "vi"),
      },
    },
    openGraph: {
      type: "video.other",
      locale: locale === "en" ? "en_US" : "vi_VN",
      url: videoPath(video.id, locale),
      title: video.title,
      description: video.description,
      images: ogImages(video.title),
    },
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ locale: string; videoId: string }>;
}) {
  const { locale: raw, videoId } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = videoChu(locale);
  // Tiêu đề, mô tả, thẻ video là dữ liệu YouTube tiếng Việt.
  const duLieu = locale === "en" ? "vi" : undefined;
  const videos = await getVideos();
  const video = videos.find((v) => v.id === videoId);

  if (!video) notFound();

  const related = videos
    .filter((v) => v.stage === video.stage && v.id !== video.id)
    .slice(0, 3);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href={pathFor("videos", locale)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.quayLai}
          </Link>
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <VideoPlayer youtubeId={video.youtubeId} title={video.title} />
            <h1 lang={duLieu} className="mt-6 text-2xl font-bold">
              {video.title}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <StageBadge stage={video.stage} locale={locale} />
              <span className="text-sm text-muted-foreground">
                {video.ageRange} {t.tuoi}
              </span>
              {video.tags.length > 0 && (
                <div lang={duLieu} className="flex gap-1">
                  {video.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p lang={duLieu} className="mt-4 text-muted-foreground leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Sidebar: related */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{t.lienQuan}</h2>
            <div className="space-y-4">
              {related.map((v) => (
                <VideoCard key={v.id} video={v} locale={locale} tuoi={t.tuoi} />
              ))}
            </div>
            {related.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {t.chuaLienQuan}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
