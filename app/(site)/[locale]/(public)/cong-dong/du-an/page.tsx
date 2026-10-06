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
  return pageMetadata("projects", locale, congDong(locale).duAn.meta);
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = congDong(locale).duAn;
  // Bài viết là dữ liệu CMS tiếng Việt — trang en đánh dấu lang="vi".
  const duLieu = locale === "en" ? "vi" : undefined;
  const articles = await getArticles();
  const projects = articles.filter((a) => a.category === "du-an");

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title={t.tieuDe}
          subtitle={t.phuDe}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative aspect-video">
                <CoverImage
                  src={project.coverImage}
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 lang={duLieu} className="text-lg font-bold">
                  {project.title}
                </h3>
                <p lang={duLieu} className="mt-2 text-sm text-muted-foreground">
                  {project.excerpt}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span lang={duLieu} className="text-xs text-muted-foreground">
                    {project.author} &bull; {project.publishDate}
                  </span>
                  <div className="flex gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <EmptyState
            icon="🚀"
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
