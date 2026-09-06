import type { Metadata } from "next";
import { getArticles } from "@/lib/sheets";
import { SectionHeader } from "@/components/common/section-header";
import { CoverImage } from "@/components/common/cover-image";
import { EmptyState } from "@/components/common/empty-state";

export const metadata: Metadata = {
  title: "Dự Án Nổi Bật",
  description: "Các dự án STEM nổi bật từ cộng đồng MakerViet và Làng Maker.",
};

export default async function ProjectsPage() {
  const articles = await getArticles();
  const projects = articles.filter((a) => a.category === "du-an");

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Dự Án Nổi Bật"
          subtitle="Các dự án STEM từ cộng đồng — từ ý tưởng đến sản phẩm thực tế"
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
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.excerpt}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
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
            title="Chưa có dự án nào được đăng"
            description="Trang này sẽ đăng dự án thật của học sinh và mentor trong cộng đồng. Bạn đã làm được gì thú vị? Gửi cho chúng tôi để trở thành dự án đầu tiên."
            actionLabel="Gửi dự án của bạn"
            actionHref="mailto:lang@makerviet.org?subject=Gửi%20dự%20án%20STEM"
          />
        )}
      </div>
    </div>
  );
}
