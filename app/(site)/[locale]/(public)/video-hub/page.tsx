import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VideoHubContent } from "@/components/video/video-hub-content";
import { videoChu } from "@/lib/content/video";
import { localeOf } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("videos", locale, videoChu(locale).meta);
}

export default async function VideoHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = videoChu(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />
        <Suspense
          fallback={
            <div className="py-20 text-center text-muted-foreground">
              {t.dangTai}
            </div>
          }
        >
          <VideoHubContent locale={locale} t={t} />
        </Suspense>
      </div>
    </div>
  );
}
