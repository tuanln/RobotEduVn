import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import { NHIP, getNhip, nhipKeTiep } from "@/lib/content/nhip";
import { NHIP_SLUGS, type NhipSlug } from "@/lib/content/nhip-slug";
import { getVideos } from "@/lib/sheets";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return NHIP.map((nhip) => ({ slug: nhip.slug }));
}

function laSlugNhip(slug: string): slug is NhipSlug {
  return (NHIP_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!laSlugNhip(slug)) return { title: "Không tìm thấy" };
  const nhip = getNhip(slug);
  return { title: `Nhịp ${nhip.ten}`, description: nhip.moTaNgan };
}

export default async function NhipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!laSlugNhip(slug)) notFound();

  const nhip = getNhip(slug);
  const keTiep = nhipKeTiep(slug);
  const videos = await getVideos();
  const coVideo = videos.some((v) => v.stage === slug);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/hanh-trinh" className="hover:text-foreground">
            Cách Học Ở Làng Maker
          </Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className={nhip.color}>{nhip.ten}</span>
        </nav>

        <header
          className={`rounded-2xl border-2 ${nhip.borderColor} ${nhip.bgColor} p-8 text-center`}
        >
          <span className="text-7xl" aria-hidden>{nhip.icon}</span>
          <h1 className={`mt-4 text-4xl font-extrabold ${nhip.color}`}>
            {nhip.ten}
          </h1>
          <p className="mt-2 text-lg font-medium">{nhip.khauHieu}</p>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden>{nhip.huyHieu}</span>
            {nhip.tenHuyHieu}
          </p>
        </header>

        <div className="mt-8 space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            {nhip.moTaDai.split("\n\n").map((doan, i) => (
              <p key={i} className="mb-3 leading-relaxed text-muted-foreground">
                {doan}
              </p>
            ))}
          </section>

          <section className="rounded-xl border border-primary/40 bg-primary/5 p-6">
            <h2 className="text-xl font-bold">Tại Làng Maker</h2>
            <p className="mt-2 text-muted-foreground">{nhip.taiLangMaker}</p>
          </section>

          {nhip.tramChoi && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">Năm nhóm trạm chơi</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {nhip.tramChoi.map((tram) => (
                  <span
                    key={tram}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium ${nhip.borderColor} ${nhip.bgColor}`}
                  >
                    {tram}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Buổi trải nghiệm đầu tiên miễn phí, 60–90 phút, cuối tuần. Không
                cần biết trước gì, không cần mang theo gì.
              </p>
            </section>
          )}

          {nhip.huong && (
            <section>
              <h2 className="text-xl font-bold">Ba hướng làm, đi song song</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Không phải ba cấp bậc. Trẻ chọn hướng vừa tay với thứ mình đang
                muốn làm.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {nhip.huong.map((h) => (
                  <div
                    key={h.title}
                    className="flex flex-col rounded-xl border border-border bg-card p-5"
                  >
                    <h3 className="font-bold">{h.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {h.doing}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Đồ nghề
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {h.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {nhip.nguyenTac && (
            <section>
              <h2 className="text-xl font-bold">Ba nguyên tắc dẫn buổi học</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {nhip.nguyenTac.map((nt) => (
                  <div
                    key={nt.title}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <h3 className="font-bold">{nt.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {nt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {coVideo ? (
            <section className="rounded-xl border border-border bg-card p-6 text-center">
              <h2 className="text-xl font-bold">Video của nhịp này</h2>
              <Button asChild className="mt-4">
                <Link href={`/video-hub?stage=${nhip.slug}`}>
                  Xem Video Hub <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </section>
          ) : (
            <section className="rounded-xl border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Nhịp này chưa có video — vì nó vốn để trải nghiệm trực tiếp.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/cong-dong/maker-hub">Tìm Maker Hub gần bạn</Link>
              </Button>
            </section>
          )}

          {/* Vòng lặp: sau nhịp cuối thì dẫn ngược về nhịp đầu */}
          <div className="flex justify-end">
            <Button asChild size="lg">
              <Link href={`/hanh-trinh/${keTiep.slug}`}>
                {slug === "chia-se" ? (
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
                ) : null}
                {`Nhịp tiếp theo: ${keTiep.ten}`}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
