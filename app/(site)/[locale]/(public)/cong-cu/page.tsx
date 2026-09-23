import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { StageBadge } from "@/components/common/stage-badge";
import type { NhipSlug } from "@/lib/types";

export const metadata: Metadata = {
  title: "Công Cụ & Thiết Bị",
  description:
    "Đồ nghề trong xưởng Làng Maker — phương tiện để trẻ làm ra sản phẩm thật, không phải cấp bậc phải leo.",
};

const tools = [
  {
    name: "GCompris",
    nhip: "choi" as NhipSlug,
    type: "Phần mềm",
    origin: "Mã nguồn mở quốc tế",
    desc: "Bộ phần mềm giáo dục với 200+ hoạt động đa dạng: toán học, đọc, khoa học, địa lý, âm nhạc, logic. Hoàn toàn miễn phí, chạy trên Windows, Linux, Android.",
    features: ["200+ hoạt động", "Miễn phí", "Đa nền tảng", "Hỗ trợ tiếng Việt"],
  },
  {
    name: "KTurtle",
    nhip: "lam" as NhipSlug,
    type: "Phần mềm",
    origin: "Mã nguồn mở (KDE)",
    desc: "Môi trường lập trình Logo — trẻ điều khiển chú rùa vẽ hình trên màn hình bằng các lệnh đơn giản. Học tư duy hình học và lập trình cơ bản.",
    features: ["Lập trình trực quan", "Hình học", "Miễn phí", "Linux/Windows"],
  },
  {
    name: "Python",
    nhip: "lam" as NhipSlug,
    type: "Ngôn ngữ",
    origin: "Mã nguồn mở",
    desc: "Ngôn ngữ lập trình phổ biến nhất thế giới, cú pháp đơn giản dễ học. Trẻ học từ biến, hàm đến đệ quy và lập trình hướng đối tượng.",
    features: ["Dễ học", "#1 thế giới", "Miễn phí", "Nhiều tài nguyên"],
  },
  {
    name: "ThingBot",
    nhip: "lam" as NhipSlug,
    type: "Robot giáo dục",
    origin: "Made in Vietnam (Rogo)",
    desc: "Robot giáo dục đa năng, hỗ trợ lập trình bằng Python và khối. Tích hợp cảm biến, motor, LED. Giá cả hợp lý, phù hợp học sinh Việt Nam.",
    features: ["Made in Vietnam", "Python + Khối", "Cảm biến", "Giá hợp lý"],
  },
  {
    name: "NEO One",
    nhip: "lam" as NhipSlug,
    type: "Máy tính giáo dục",
    origin: "Made in Vietnam (ThingEdu)",
    desc: "Máy tính nhỏ gọn dành cho giáo dục, chạy Linux, hỗ trợ lập trình Python, Scratch, và kết nối cảm biến. Thay thế Raspberry Pi với giá thành thấp hơn.",
    features: ["Made in Vietnam", "Linux", "Giá thấp", "IoT ready"],
  },
  {
    name: "K12 Maker",
    nhip: "lam" as NhipSlug,
    type: "Robot thi đấu",
    origin: "Made in Vietnam (MakerViet)",
    desc: "Bộ kit robot dành cho thi đấu STEM. Thiết kế module, dễ lắp ráp và tùy biến. Sử dụng trong các cuộc thi VSC, FARC, GreenBot.",
    features: ["Made in Vietnam", "Thi đấu", "Module", "Dễ tùy biến"],
  },
  {
    name: "VIA",
    nhip: "lam" as NhipSlug,
    type: "Xe tự hành",
    origin: "Made in Vietnam (MakerViet)",
    desc: "Dự án xe tự hành mã nguồn mở. Học sinh học về AI, xử lý ảnh, điều khiển tự động thông qua việc xây dựng và lập trình xe tự hành thực tế.",
    features: ["Made in Vietnam", "AI", "Mã nguồn mở", "Thực tế"],
  },
];

export default function ToolsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Công Cụ & Thiết Bị"
          subtitle="Đồ nghề trong xưởng — phương tiện để làm, không phải cấp bậc để leo"
        />
        <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-sm text-muted-foreground">
          Không ai phải học hết công cụ này rồi mới được sang công cụ kia. Trẻ
          chọn đồ nghề vừa tay với thứ mình đang muốn làm.
        </p>

        <div className="space-y-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                    <StageBadge stage={tool.nhip} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tool.type} &bull; {tool.origin}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:w-48">
                  {tool.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
