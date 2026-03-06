import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Giới Thiệu OpenSTEM Foundation",
  description:
    "OpenSTEM Foundation — Tổ chức Doanh nghiệp Xã hội vì Giáo dục STEM. Mục tiêu 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader
          title="Về OpenSTEM Foundation"
          subtitle='"Mở cửa tri thức STEM cho mọi trẻ em Việt Nam"'
        />

        <div className="space-y-8">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">OpenSTEM Foundation là gì?</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              OpenSTEM Foundation là một Tổ chức Doanh nghiệp Xã hội (Social
              Enterprise), hoạt động theo mô hình phi lợi nhuận, được khởi xướng
              bởi hệ sinh thái MakerViet – ThingEdu – Rogo với hơn 10 năm kinh
              nghiệm xây dựng cộng đồng mã nguồn mở và giáo dục STEM tại Việt
              Nam.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Tên gọi &ldquo;Open&rdquo; thể hiện triết lý cốt lõi: mở cửa tri
              thức, mã nguồn mở, mô hình mở — ai cũng có thể tham gia, đóng góp
              và thụ hưởng.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">Tầm Nhìn & Sứ Mệnh</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary/40 bg-primary/10 p-6">
                <h3 className="text-sm font-semibold uppercase text-primary">
                  Tầm nhìn
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Mỗi trẻ em Việt Nam đều có cơ hội tiếp cận giáo dục STEM &
                  Robot để phát triển tư duy độc lập và làm chủ công nghệ.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                <h3 className="text-sm font-semibold uppercase text-emerald-500">
                  Sứ mệnh
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Phổ cập kiến thức STEM & Robot cho 1 triệu trẻ em Việt Nam
                  trong 5 năm thông qua hệ sinh thái giáo dục mở, sản phẩm Made
                  in Vietnam, và mạng lưới cộng đồng toàn quốc.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">Xuất Xứ & Nền Tảng</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Được xây dựng trên nền tảng 10 năm phát triển của Cộng đồng Maker
              Việt (2015–2025):
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                &bull; Mã nguồn mở: VIA (xe tự hành), ThingBot (robot giáo dục),
                K12 Maker, NEO One
              </li>
              <li>
                &bull; Cuộc thi quốc gia: VSC, FARC, GreenBot
              </li>
              <li>
                &bull; Đội tuyển Việt Nam tại FIRST Global Challenge
              </li>
              <li>
                &bull; Mạng lưới hơn 50 CLB Robotics khắp cả nước
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">
              Mô Hình Tổ Chức — &ldquo;Chiến Tranh Nhân Dân&rdquo; Trong Giáo
              Dục
            </h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  layer: "Lớp 1",
                  name: "Đội Chủ Lực",
                  desc: "Hội đồng Sáng lập & Đối tác Chiến lược (MakerViet, ThingEdu, Rogo, FPT Shop...)",
                },
                {
                  layer: "Lớp 2",
                  name: "Bộ Đội Địa Phương",
                  desc: "Mentor, tình nguyện viên, giáo viên, phụ huynh — lực lượng tại mọi địa phương",
                },
                {
                  layer: "Lớp 3",
                  name: "Dân Quân Tự Vệ",
                  desc: "Trẻ em — vừa là người thụ hưởng, vừa là người chia sẻ (Social Learning)",
                },
              ].map((item) => (
                <div
                  key={item.layer}
                  className="flex items-start gap-4 rounded-lg border border-border p-4"
                >
                  <span className="rounded bg-primary/15 px-3 py-1 text-sm font-bold text-primary">
                    {item.layer}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/hanh-trinh">Bắt Đầu Hành Trình STEM &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
