import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STAGES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return STAGES.map((stage) => ({ slug: stage.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const stage = STAGES.find((s) => s.slug === slug);
    if (!stage) return { title: "Không tìm thấy" };
    return {
      title: `${stage.titleVi} (${stage.ageRange} tuổi)`,
      description: stage.description,
    };
  });
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stageIndex = STAGES.findIndex((s) => s.slug === slug);
  if (stageIndex === -1) notFound();

  const stage = STAGES[stageIndex];
  const prevStage = stageIndex > 0 ? STAGES[stageIndex - 1] : null;
  const nextStage =
    stageIndex < STAGES.length - 1 ? STAGES[stageIndex + 1] : null;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/hanh-trinh" className="hover:text-foreground">
            Hành Trình Học
          </Link>
          <span className="mx-2">/</span>
          <span className={stage.color}>{stage.titleVi}</span>
        </nav>

        {/* Header */}
        <div
          className={`rounded-2xl border-2 ${stage.borderColor} ${stage.bgColor} p-8 text-center`}
        >
          <span className="text-7xl">{stage.icon}</span>
          <h1
            className={`mt-4 text-4xl font-extrabold ${stage.color}`}
          >
            Bước {stageIndex + 1}: {stage.titleVi}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {stage.title} &bull; {stage.ageRange} tuổi
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-2xl">{stage.badge}</span>
            <span className="text-sm font-medium">{stage.badgeName}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8">
          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold">Giới Thiệu</h2>
            {stage.longDescription.split("\n\n").map((para, i) => (
              <p key={i} className="mb-3 text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Tools & Skills */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Công Cụ Sử Dụng</h2>
              <div className="flex flex-wrap gap-3">
                {stage.tools.map((tool) => (
                  <div
                    key={tool}
                    className={`rounded-lg border ${stage.borderColor} ${stage.bgColor} px-4 py-2 text-sm font-medium`}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Kỹ Năng Đạt Được</h2>
              <ul className="space-y-2">
                {stage.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className={`h-2 w-2 rounded-full ${stage.color.replace("text-", "bg-")}`} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Video Hub link */}
          <div className="rounded-xl border border-primary/40 bg-primary/10 p-6 text-center">
            <h2 className="text-xl font-bold">Video Bài Học</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Xem các video hướng dẫn cho giai đoạn {stage.titleVi}
            </p>
            <Button asChild className="mt-4">
              <Link href={`/video-hub?stage=${stage.slug}`}>
                Xem Video Hub &rarr;
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {prevStage ? (
              <Button variant="outline" asChild>
                <Link href={`/hanh-trinh/${prevStage.slug}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {prevStage.titleVi}
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {nextStage ? (
              <Button asChild>
                <Link href={`/hanh-trinh/${nextStage.slug}`}>
                  {nextStage.titleVi}
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
