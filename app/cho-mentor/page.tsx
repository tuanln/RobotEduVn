import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Cho Mentor & Giáo Viên",
  description:
    "Tài liệu giáo trình, hướng dẫn giảng dạy, và cộng đồng mentor cho giáo viên STEM.",
};

const resources = [
  {
    icon: "📚",
    title: "Giáo Trình 5 Bước",
    desc: "Giáo trình đầy đủ cho từng giai đoạn học, từ Khám phá đến Chia sẻ. Có thể tải về và in.",
    link: "/hanh-trinh",
  },
  {
    icon: "🎬",
    title: "Video Hướng Dẫn",
    desc: "Các video bài giảng mẫu, hướng dẫn sử dụng công cụ và thiết bị giáo dục.",
    link: "/video-hub",
  },
  {
    icon: "🛠️",
    title: "Công Cụ & Thiết Bị",
    desc: "Hướng dẫn sử dụng GCompris, KTurtle, Python, ThingBot, NEO One trong lớp học.",
    link: "/cong-cu",
  },
  {
    icon: "🏠",
    title: "Mở Maker Hub",
    desc: "Hướng dẫn mở và vận hành một Maker Hub tại địa phương. Từ không gian đến giáo trình.",
    link: "/cong-dong/maker-hub",
  },
];

const steps = [
  "Đăng ký tham gia cộng đồng Mentor qua email lang@makerviet.org",
  "Nhận tài liệu giáo trình và hướng dẫn sử dụng công cụ",
  "Tham gia tập huấn online/offline định kỳ hằng tháng",
  "Tổ chức lớp học/sinh hoạt tại trường hoặc Maker Hub",
  "Chia sẻ kinh nghiệm và góp ý cải tiến giáo trình",
];

export default function MentorPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Cho Mentor & Giáo Viên"
          subtitle="Tài liệu, công cụ và cộng đồng hỗ trợ giáo viên dạy STEM & Robot"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {resources.map((res) => (
            <Link
              key={res.title}
              href={res.link}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:bg-card"
            >
              <span className="text-4xl">{res.icon}</span>
              <h3 className="mt-3 text-lg font-bold">{res.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{res.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold">Cách Trở Thành Mentor</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <p className="pt-1 text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <a href="mailto:lang@makerviet.org">
                Liên Hệ Đăng Ký Mentor
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
