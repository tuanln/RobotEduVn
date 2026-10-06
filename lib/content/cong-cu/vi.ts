import type { CongCuContent } from "./types";

/** Chép nguyên văn từ app/(site)/[locale]/(public)/cong-cu/page.tsx. */
export const CONG_CU_VI: CongCuContent = {
  meta: {
    title: "Công Cụ & Thiết Bị",
    description:
      "Đồ nghề trong xưởng Làng Maker — phương tiện để trẻ làm ra sản phẩm thật, không phải cấp bậc phải leo.",
  },
  tieuDe: "Công Cụ & Thiết Bị",
  phuDe: "Đồ nghề trong xưởng — phương tiện để làm, không phải cấp bậc để leo",
  ghiChu:
    "Không ai phải học hết công cụ này rồi mới được sang công cụ kia. Trẻ chọn đồ nghề vừa tay với thứ mình đang muốn làm.",
  tools: [
    {
      name: "GCompris",
      nhip: "choi",
      type: "Phần mềm",
      origin: "Mã nguồn mở quốc tế",
      desc: "Bộ phần mềm giáo dục với 200+ hoạt động đa dạng: toán học, đọc, khoa học, địa lý, âm nhạc, logic. Hoàn toàn miễn phí, chạy trên Windows, Linux, Android.",
      features: ["200+ hoạt động", "Miễn phí", "Đa nền tảng", "Hỗ trợ tiếng Việt"],
    },
    {
      name: "KTurtle",
      nhip: "lam",
      type: "Phần mềm",
      origin: "Mã nguồn mở (KDE)",
      desc: "Môi trường lập trình Logo — trẻ điều khiển chú rùa vẽ hình trên màn hình bằng các lệnh đơn giản. Học tư duy hình học và lập trình cơ bản.",
      features: ["Lập trình trực quan", "Hình học", "Miễn phí", "Linux/Windows"],
    },
    {
      name: "Python",
      nhip: "lam",
      type: "Ngôn ngữ",
      origin: "Mã nguồn mở",
      desc: "Ngôn ngữ lập trình phổ biến nhất thế giới, cú pháp đơn giản dễ học. Trẻ học từ biến, hàm đến đệ quy và lập trình hướng đối tượng.",
      features: ["Dễ học", "#1 thế giới", "Miễn phí", "Nhiều tài nguyên"],
    },
    {
      name: "ThingBot",
      nhip: "lam",
      type: "Robot giáo dục",
      origin: "Made in Vietnam (Rogo)",
      desc: "Robot giáo dục đa năng, hỗ trợ lập trình bằng Python và khối. Tích hợp cảm biến, motor, LED. Giá cả hợp lý, phù hợp học sinh Việt Nam.",
      features: ["Made in Vietnam", "Python + Khối", "Cảm biến", "Giá hợp lý"],
    },
    {
      name: "NEO One",
      nhip: "lam",
      type: "Máy tính giáo dục",
      origin: "Made in Vietnam (ThingEdu)",
      desc: "Máy tính nhỏ gọn dành cho giáo dục, chạy Linux, hỗ trợ lập trình Python, Scratch, và kết nối cảm biến. Thay thế Raspberry Pi với giá thành thấp hơn.",
      features: ["Made in Vietnam", "Linux", "Giá thấp", "IoT ready"],
    },
    {
      name: "K12 Maker",
      nhip: "lam",
      type: "Robot thi đấu",
      origin: "Made in Vietnam (MakerViet)",
      desc: "Bộ kit robot dành cho thi đấu STEM. Thiết kế module, dễ lắp ráp và tùy biến. Sử dụng trong các cuộc thi VSC, FARC, GreenBot.",
      features: ["Made in Vietnam", "Thi đấu", "Module", "Dễ tùy biến"],
    },
    {
      name: "VIA",
      nhip: "lam",
      type: "Xe tự hành",
      origin: "Made in Vietnam (MakerViet)",
      desc: "Dự án xe tự hành mã nguồn mở. Học sinh học về AI, xử lý ảnh, điều khiển tự động thông qua việc xây dựng và lập trình xe tự hành thực tế.",
      features: ["Made in Vietnam", "AI", "Mã nguồn mở", "Thực tế"],
    },
  ],
};
