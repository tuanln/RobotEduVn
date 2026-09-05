import type { Metadata } from "next";
import Image from "next/image";
import { getArticles } from "@/lib/sheets";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Tạp Chí MakerViet",
  description: "Bài viết, hướng dẫn và tin tức từ cộng đồng MakerViet.",
};

const categoryLabels: Record<string, string> = {
  "tap-chi": "Tạp Chí",
  "du-an": "Dự Án",
  "huong-dan": "Hướng Dẫn",
  "tin-tuc": "Tin Tức",
};

export default async function MagazinePage() {
  const articles = await getArticles();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Tạp Chí MakerViet"
          subtitle="Bài viết, hướng dẫn và tin tức hàng tháng từ cộng đồng"
        />

        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row"
            >
              <div className="relative aspect-video flex-shrink-0 overflow-hidden rounded-lg sm:w-48">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="200px"
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                    {categoryLabels[article.category] || article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.publishDate}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold">{article.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {article.excerpt}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Tác giả: {article.author}
                </p>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            Chưa có bài viết nào.
          </p>
        )}
      </div>
    </div>
  );
}
