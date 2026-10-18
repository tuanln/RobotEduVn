import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBreadcrumbItems } from "fumadocs-core/breadcrumb";
import { findNeighbour } from "fumadocs-core/page-tree";
import { mdxKhoaHoc } from "@/components/khoa-hoc/mdx";
import { ThanhBenDiDong } from "@/components/khoa-hoc/thanh-ben";
import { TimKiem } from "@/components/khoa-hoc/tim-kiem";
import { khoaHoc } from "@/lib/khoa-hoc/source";
import { ogImages } from "@/lib/seo/metadata";

// 48 trang đều dựng sẵn lúc build; slug lạ thì 404, không render theo yêu cầu.
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string; slug?: string[] }> };

const SLUG_CANH_GAC = "__chi-co-tieng-viet__";

/**
 * Bẫy Next 16.3.8: nếu generateStaticParams trả MẢNG RỖNG cho một giá trị của
 * segment cha (ở đây locale "en"), Next bỏ luôn MỌI đường dẫn của route, kể cả
 * 48 trang "vi" → toàn bộ /khoa-hoc 404 vì dynamicParams = false. Nên nhánh
 * "en" trả một slug canh gác; layout gọi notFound() cho mọi locale khác "vi",
 * và middleware đã ép /en/khoa-hoc/* về 404 trước khi tới đây.
 */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (params.locale !== "vi") return [{ slug: [SLUG_CANH_GAC] }];
  return khoaHoc.generateParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = khoaHoc.getPage(slug);
  if (!page) notFound();
  const title = page.data.title;
  const description = page.data.description ?? "Học liệu robotics và IoT của Làng Maker.";
  return {
    title,
    description,
    // chỉ có bản tiếng Việt → không khai hreflang
    alternates: { canonical: page.url },
    openGraph: { type: "article", locale: "vi_VN", url: page.url, title, description, images: ogImages(title) },
  };
}

export default async function TrangKhoaHoc({ params }: Props) {
  const { slug } = await params;
  const page = khoaHoc.getPage(slug);
  if (!page) notFound();

  const tree = khoaHoc.getPageTree();
  const vet = getBreadcrumbItems(page.url, tree, { includePage: false, includeRoot: true });
  const { previous, next } = findNeighbour(tree, page.url);
  const Body = page.data.body;
  const toc = page.data.toc.filter((t) => t.depth <= 3);

  return (
    <div className="flex gap-10">
      <article className="min-w-0 max-w-3xl flex-1">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <ThanhBenDiDong tree={tree} />
          <TimKiem />
        </div>

        <nav aria-label="Vị trí trang" className="mb-3 text-sm text-muted-foreground">
          <Link href="/khoa-hoc" className="hover:text-foreground">
            Khóa học
          </Link>
          {vet
            // bỏ gốc cây (fumadocs đặt tên mặc định "Docs") và trang gốc đã có ở đầu
            .filter((v) => v.url !== "/khoa-hoc" && v.name !== tree.name)
            .map((v, i) => (
              <span key={i}>
                <span aria-hidden> › </span>
                {v.url ? (
                  <Link href={v.url} className="hover:text-foreground">
                    {v.name}
                  </Link>
                ) : (
                  v.name
                )}
              </span>
            ))}
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{page.data.title}</h1>
        {page.data.description && <p className="mt-3 text-lg text-muted-foreground">{page.data.description}</p>}

        <div className="mt-6">
          <Body components={mdxKhoaHoc} />
        </div>

        {(previous || next) && (
          <nav aria-label="Trang trước và trang sau" className="mt-12 grid gap-3 sm:grid-cols-2">
            {previous ? (
              <Link href={previous.url} className="rounded-xl border border-border p-4 hover:bg-accent">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ChevronLeft className="h-3 w-3" aria-hidden /> Trang trước
                </span>
                <span className="mt-1 block font-semibold">{previous.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={next.url} className="rounded-xl border border-border p-4 text-right hover:bg-accent">
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  Trang sau <ChevronRight className="h-3 w-3" aria-hidden />
                </span>
                <span className="mt-1 block font-semibold">{next.name}</span>
              </Link>
            )}
          </nav>
        )}

        <p className="mt-10 border-t border-border pt-4 text-sm text-muted-foreground">Nguồn học liệu: Maker Việt.</p>
      </article>

      {toc.length > 1 && (
        <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto xl:block">
          <p className="mb-2 text-sm font-semibold">Trong trang này</p>
          <ul className="space-y-1 text-sm">
            {toc.map((t) => (
              <li key={t.url} style={{ paddingLeft: (t.depth - 2) * 12 }}>
                <a href={t.url} className="text-muted-foreground hover:text-foreground">
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
