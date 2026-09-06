import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NHIP } from "@/lib/content/nhip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return NHIP.map((nhip) => ({ slug: nhip.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const nhip = NHIP.find((n) => n.slug === slug);
    if (!nhip) return { title: "Không tìm thấy" };
    return {
      title: nhip.ten,
      description: nhip.moTaNgan,
    };
  });
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const nhipIndex = NHIP.findIndex((n) => n.slug === slug);
  if (nhipIndex === -1) notFound();

  const nhip = NHIP[nhipIndex];
  const prevNhip = nhipIndex > 0 ? NHIP[nhipIndex - 1] : null;
  const nextNhip = nhipIndex < NHIP.length - 1 ? NHIP[nhipIndex + 1] : null;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/hanh-trinh" className="hover:text-foreground">
            Hành Trình Học
          </Link>
          <span className="mx-2">/</span>
          <span className={nhip.color}>{nhip.ten}</span>
        </nav>

        {/* Header */}
        <div
          className={`rounded-2xl border-2 ${nhip.borderColor} ${nhip.bgColor} p-8 text-center`}
        >
          <span className="text-7xl">{nhip.icon}</span>
          <h1
            className={`mt-4 text-4xl font-extrabold ${nhip.color}`}
          >
            {nhip.ten}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {nhip.khauHieu}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-2xl">{nhip.huyHieu}</span>
            <span className="text-sm font-medium">{nhip.tenHuyHieu}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8">
          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold">Giới Thiệu</h2>
            {nhip.moTaDai.split("\n\n").map((para, i) => (
              <p key={i} className="mb-3 text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Video Hub link */}
          <div className="rounded-xl border border-primary/40 bg-primary/10 p-6 text-center">
            <h2 className="text-xl font-bold">Video Bài Học</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Xem các video hướng dẫn cho nhịp {nhip.ten}
            </p>
            <Button asChild className="mt-4">
              <Link href={`/video-hub?stage=${nhip.slug}`}>
                Xem Video Hub &rarr;
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {prevNhip ? (
              <Button variant="outline" asChild>
                <Link href={`/hanh-trinh/${prevNhip.slug}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {prevNhip.ten}
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {nextNhip ? (
              <Button asChild>
                <Link href={`/hanh-trinh/${nextNhip.slug}`}>
                  {nextNhip.ten}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/cong-dong">
                  Tham Gia Cộng Đồng
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
