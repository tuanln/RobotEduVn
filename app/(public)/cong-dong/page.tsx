import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Cộng Đồng",
  description:
    "Cộng đồng OpenSTEM — Dự án nổi bật, Tạp chí MakerViet, Mạng lưới Maker Hub, và kết nối STEM.",
};

const sections = [
  {
    icon: "🚀",
    title: "Dự Án Nổi Bật",
    desc: "Các dự án STEM từ cộng đồng: xe tự hành, robot, IoT và nhiều hơn.",
    href: "/cong-dong/du-an",
    color: "border-amber-500/30 bg-amber-500/5",
  },
  {
    icon: "📰",
    title: "Tạp Chí MakerViet",
    desc: "Bài viết, hướng dẫn và tin tức hàng tháng từ cộng đồng Maker.",
    href: "/cong-dong/tap-chi",
    color: "border-emerald-500/30 bg-emerald-500/5",
  },
  {
    icon: "📍",
    title: "Mạng Lưới Maker Hub",
    desc: "Tìm Maker Hub (Làng Maker) gần bạn — tại FPT Shop và các địa điểm đối tác.",
    href: "/cong-dong/maker-hub",
    color: "border-blue-500/30 bg-blue-500/5",
  },
];

const externalLinks = [
  {
    name: "Facebook: Bình Dân Học STEM & Robot",
    url: "https://facebook.com/groups/binhdanhocSTEM",
    desc: "Nhóm Facebook cho phụ huynh và học sinh",
  },
  {
    name: "YouTube: MakerViet",
    url: "https://youtube.com/@makerviet",
    desc: "Video bài học và dự án",
  },
  {
    name: "GitHub: MakerViet",
    url: "https://github.com/makerviet",
    desc: "Mã nguồn mở các dự án",
  },
];

export default function CommunityPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Cộng Đồng OpenSTEM"
          subtitle="Kết nối — Chia sẻ — Cùng phát triển"
        />

        {/* Stats */}
        <div className="mb-12 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "50+", label: "CLB Robotics" },
            { value: "34", label: "Tỉnh thành" },
            { value: "10,000+", label: "Thành viên" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="text-2xl font-extrabold text-primary">
                {stat.value}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`rounded-xl border ${section.color} p-6 transition-all hover:scale-[1.02] hover:shadow-lg`}
            >
              <span className="text-4xl">{section.icon}</span>
              <h3 className="mt-3 text-lg font-bold">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {section.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* External */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold">Kết Nối Cộng Đồng</h2>
          <div className="mt-4 space-y-3">
            {externalLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div>
                  <h3 className="text-sm font-semibold">{link.name}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
                <span className="text-muted-foreground">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
