import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Triết Lý Giáo Dục",
  description:
    "Ba trụ cột triết lý của OpenSTEM: Tư tưởng Hồ Chí Minh, Triết lý Kiến tạo Papert, Tinh thần Coopertition FIRST.",
};

const pillars = [
  {
    icon: "🇻🇳",
    title: 'Tư Tưởng Hồ Chí Minh — "Bình Dân Học Vụ"',
    quote: '"Không có gì quý hơn độc lập tự do"',
    content: `Áp dụng phương pháp luận chiến tranh nhân dân vào giáo dục: huy động toàn dân tham gia, xây dựng lực lượng ba tầng (đội chủ lực, bộ đội địa phương, dân quân), lấy thế thắng lực.

Độc lập tự chủ về công nghệ — xây dựng sản phẩm Made in Vietnam (ThingBot, NEO One, VIA) thay vì phụ thuộc nước ngoài.

Mô hình "Làng Maker" tại mọi địa phương — mỗi vùng miền tự xây dựng lực lượng với sự hỗ trợ của đội chủ lực.`,
  },
  {
    icon: "🧩",
    title: "Triết Lý Kiến Tạo — Seymour Papert",
    quote: '"Trẻ em phát triển tư duy thông qua việc tạo ra sản phẩm hữu hình"',
    content: `Học bằng làm (Learning by Making) — không chỉ đọc sách hay nghe giảng, mà phải tự tay làm, tự tay tạo ra sản phẩm.

Lộ trình 5 bước: Khám Phá → Tư Duy → Lập Trình → IoT & Robot → Chia Sẻ. Mỗi bước xây dựng trên bước trước, từ đơn giản đến phức tạp.

Trẻ em là chủ thể — không phải bình chứa để rót kiến thức vào, mà là những nhà kiến trúc tự xây dựng thế giới tri thức của mình.`,
  },
  {
    icon: "🤝",
    title: "Tinh Thần Coopertition — FIRST Robotics",
    quote: '"Cạnh tranh cộng hưởng — cùng nâng cao giá trị cho cộng đồng"',
    content: `Các đội tác vừa hợp tác vừa cạnh tranh lành mạnh. Doanh nghiệp đóng góp và cùng nhận lại giá trị tương xứng về thương hiệu, uy tín và tác động xã hội.

Mô hình ba lực lượng: Đội Chủ lực (đối tác chiến lược), Bộ đội Địa phương (mentor, tình nguyện viên), Dân quân Tự vệ (trẻ em — vừa học vừa chia sẻ).

Giá trị cốt lõi: Mở — Miễn phí — Công bằng — Độc lập — Cộng đồng.`,
  },
];

export default function PhilosophyPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Triết Lý Giáo Dục"
          subtitle="Ba trụ cột định hướng mọi hoạt động của OpenSTEM Foundation"
        />

        <div className="space-y-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-start gap-4">
                <span className="text-5xl">{pillar.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">
                    Trụ cột {i + 1}: {pillar.title}
                  </h2>
                  <blockquote className="mt-2 border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {pillar.quote}
                  </blockquote>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {pillar.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
