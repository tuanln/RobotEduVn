import type { Metadata } from "next";
import Link from "next/link";
import { NHIP } from "@/lib/content/nhip";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Vòng Lặp Ba Nhịp",
  description:
    "Vòng lặp học STEM & Robot ba nhịp theo triết lý Kiến tạo của Seymour Papert: Chơi, Làm, Chia sẻ.",
};

export default function LearningPathPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Vòng Lặp Ba Nhịp"
          subtitle='Theo triết lý Kiến tạo của Seymour Papert — "Trẻ em xây dựng kiến thức thông qua việc tạo ra sản phẩm"'
        />

        {/* Flow Diagram */}
        <div className="mb-16">
          <div className="relative mx-auto max-w-4xl">
            {/* Desktop flow */}
            <div className="hidden gap-4 md:grid md:grid-cols-3">
              {NHIP.map((nhip, i) => (
                <div key={nhip.slug} className="relative">
                  <Link
                    href={`/hanh-trinh/${nhip.slug}`}
                    className={`flex flex-col items-center rounded-xl border-2 ${nhip.borderColor} ${nhip.bgColor} p-4 text-center transition-all hover:scale-105`}
                  >
                    <span className="text-3xl">{nhip.icon}</span>
                    <span
                      className={`mt-2 text-sm font-bold ${nhip.color}`}
                    >
                      {nhip.ten}
                    </span>
                  </Link>
                  {i < NHIP.length - 1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-xl text-muted-foreground/40">
                      &rarr;
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Mobile flow */}
            <div className="space-y-2 md:hidden">
              {NHIP.map((nhip, i) => (
                <div key={nhip.slug}>
                  <Link
                    href={`/hanh-trinh/${nhip.slug}`}
                    className={`flex items-center gap-4 rounded-xl border ${nhip.borderColor} ${nhip.bgColor} p-4`}
                  >
                    <span className="text-3xl">{nhip.icon}</span>
                    <div>
                      <span className={`font-bold ${nhip.color}`}>
                        {nhip.ten}
                      </span>
                    </div>
                  </Link>
                  {i < NHIP.length - 1 && (
                    <div className="ml-8 h-2 border-l-2 border-dashed border-muted-foreground/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Cards */}
        <div className="space-y-8">
          {NHIP.map((nhip, i) => (
            <div
              key={nhip.slug}
              className={`rounded-2xl border ${nhip.borderColor} ${nhip.bgColor} p-8`}
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-shrink-0 text-center md:w-48">
                  <span className="text-6xl">{nhip.icon}</span>
                  <h3
                    className={`mt-3 text-2xl font-bold ${nhip.color}`}
                  >
                    Nhịp {i + 1}: {nhip.ten}
                  </h3>
                  <div className="mt-2 text-2xl">{nhip.huyHieu}</div>
                  <p className="text-xs text-muted-foreground">
                    {nhip.tenHuyHieu}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">{nhip.moTaNgan}</p>
                  <div className="mt-4">
                    <Link
                      href={`/hanh-trinh/${nhip.slug}`}
                      className={`text-sm font-medium ${nhip.color} hover:underline`}
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
