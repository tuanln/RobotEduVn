import type { Metadata } from "next";
import Image from "next/image";
import { getArticles } from "@/lib/sheets";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Dự Án Nổi Bật",
  description: "Các dự án STEM nổi bật từ cộng đồng MakerViet và OpenSTEM.",
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
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
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
          <p className="py-20 text-center text-muted-foreground">
            Chưa có dự án nào. Hãy là người đầu tiên chia sẻ dự án của bạn!
          </p>
        )}
      </div>
    </div>
  );
}
