import type { Metadata } from "next";
import Link from "next/link";
import { STAGES } from "@/lib/data";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Hành Trình Học 5 Bước",
  description:
    "Lộ trình học STEM & Robot 5 giai đoạn theo triết lý Kiến tạo của Seymour Papert: Khám phá, Tư duy, Lập trình, IoT & Robot, Chia sẻ.",
};

export default function LearningPathPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Hành Trình Học 5 Bước"
          subtitle='Theo triết lý Kiến tạo của Seymour Papert — "Trẻ em xây dựng kiến thức thông qua việc tạo ra sản phẩm"'
        />

        {/* Flow Diagram */}
        <div className="mb-16">
          <div className="relative mx-auto max-w-4xl">
            {/* Desktop flow */}
            <div className="hidden gap-4 md:grid md:grid-cols-5">
              {STAGES.map((stage, i) => (
                <div key={stage.slug} className="relative">
                  <Link
                    href={`/hanh-trinh/${stage.slug}`}
                    className={`flex flex-col items-center rounded-xl border-2 ${stage.borderColor} ${stage.bgColor} p-4 text-center transition-all hover:scale-105`}
                  >
                    <span className="text-3xl">{stage.icon}</span>
                    <span
                      className={`mt-2 text-sm font-bold ${stage.color}`}
                    >
                      {stage.titleVi}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {stage.ageRange} tuổi
                    </span>
                  </Link>
                  {i < STAGES.length - 1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-xl text-muted-foreground/40">
                      &rarr;
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Mobile flow */}
            <div className="space-y-2 md:hidden">
              {STAGES.map((stage, i) => (
                <div key={stage.slug}>
                  <Link
                    href={`/hanh-trinh/${stage.slug}`}
                    className={`flex items-center gap-4 rounded-xl border ${stage.borderColor} ${stage.bgColor} p-4`}
                  >
                    <span className="text-3xl">{stage.icon}</span>
                    <div>
                      <span className={`font-bold ${stage.color}`}>
                        {stage.titleVi}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {stage.ageRange} tuổi
                      </p>
                    </div>
                  </Link>
                  {i < STAGES.length - 1 && (
                    <div className="ml-8 h-2 border-l-2 border-dashed border-muted-foreground/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Cards */}
        <div className="space-y-8">
          {STAGES.map((stage, i) => (
            <div
              key={stage.slug}
              className={`rounded-2xl border ${stage.borderColor} ${stage.bgColor} p-8`}
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-shrink-0 text-center md:w-48">
                  <span className="text-6xl">{stage.icon}</span>
                  <h3
                    className={`mt-3 text-2xl font-bold ${stage.color}`}
                  >
                    Bước {i + 1}: {stage.titleVi}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stage.title} &bull; {stage.ageRange} tuổi
                  </p>
                  <div className="mt-2 text-2xl">{stage.badge}</div>
                  <p className="text-xs text-muted-foreground">
                    {stage.badgeName}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">{stage.description}</p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold">Công cụ</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {stage.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full bg-background px-3 py-1 text-xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Kỹ năng</h4>
                      <ul className="mt-1 space-y-1">
                        {stage.skills.map((skill) => (
                          <li
                            key={skill}
                            className="text-xs text-muted-foreground"
                          >
                            &bull; {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/hanh-trinh/${stage.slug}`}
                      className={`text-sm font-medium ${stage.color} hover:underline`}
                    >
                      Xem chi tiết &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
