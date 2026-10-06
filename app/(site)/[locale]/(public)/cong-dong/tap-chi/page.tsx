import type { Metadata } from "next";
import { getArticles } from "@/lib/sheets";
import { SectionHeader } from "@/components/common/section-header";
import { CoverImage } from "@/components/common/cover-image";
import { EmptyState } from "@/components/common/empty-state";
import { congDong, mailto } from "@/lib/content/cong-dong";
import { localeOf } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo/page-metadata";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("magazine", locale, congDong(locale).tapChi.meta);
}

export default async function MagazinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = congDong(locale).tapChi;
  // Bài viết là dữ liệu CMS tiếng Việt — trang en đánh dấu lang="vi".
  const duLieu = locale === "en" ? "vi" : undefined;
  const articles = await getArticles();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title={t.tieuDe}
          subtitle={t.phuDe}
        />

        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row"
            >
              <div className="relative aspect-video flex-shrink-0 overflow-hidden rounded-lg sm:w-48">
                <CoverImage
                  src={article.coverImage}
                  alt={article.title}
                  sizes="200px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                    {t.loai[article.category as keyof typeof t.loai] ?? article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.publishDate}
                  </span>
                </div>
                <h3 lang={duLieu} className="mt-2 text-lg font-bold">
                  {article.title}
                </h3>
                <p lang={duLieu} className="mt-2 text-sm text-muted-foreground">
                  {article.excerpt}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t.tacGia} <span lang={duLieu}>{article.author}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <EmptyState
            icon="📰"
            title={t.rong.title}
            description={t.rong.description}
            actionLabel={t.rong.actionLabel}
            actionHref={mailto(t.rong.mailSubject)}
          />
        )}
      </div>
    </div>
  );
}
