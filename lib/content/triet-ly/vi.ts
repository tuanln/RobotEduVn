import { getNhip } from "@/lib/content/nhip";
import type { TrietLyContent } from "./types";

/**
 * Nội dung trang Triết Lý, bản tiếng Việt.
 *
 * Nhấc nguyên văn từ app/(public)/triet-ly/page.tsx ngày 2026-09-23.
 * KHÔNG sửa câu chữ trong lần nhấc này — nhấc và dịch là hai việc tách rời
 * (spec 2026-09-23 mục 2.5).
 *
 * Ba nguyên lý đầu lấy trực tiếp từ lib/content/nhip.ts (nguồn sự thật của
 * nhịp Làm) để tránh chép tay hai bản trôi dạt khỏi nhau.
 */
export const TRIET_LY_VI: TrietLyContent = {
  meta: {
    title: "Triết Lý Giáo Dục",
    description:
      "Ba trụ cột triết lý của Làng Maker: Tư tưởng Hồ Chí Minh, Triết lý Kiến tạo Papert, Tinh thần Coopertition FIRST.",
  },
  header: {
    title: "Triết Lý Giáo Dục",
    subtitle: "Ba trụ cột định hướng mọi hoạt động của Làng Maker",
  },
  vongLap: {
    heading: "Vòng lặp ba nhịp",
    intro:
      "Cách học ở Làng Maker không phải một thang bậc phải leo, mà là ba nhịp lặp đi lặp lại. Mỗi vòng, thứ trẻ chọn làm lại khó hơn một chút.",
  },
  truCotHeading: "Trụ cột",
  truCot: [
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

Vòng lặp ba nhịp: Chơi, Làm, Chia sẻ. Không phải thang bậc phải leo — xong Chia sẻ thì quay lại Chơi ở vòng sau, với câu hỏi khó hơn.

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
  ],
  nguyenLyHeading: "Sáu nguyên lý dẫn đường",
  nguyenLy: [
    ...(getNhip("lam").nguyenTac ?? []).map((n) => ({
      title: n.title,
      desc: n.desc,
    })),
    {
      title: "Thế giới thu nhỏ",
      desc: "Mỗi dự án là một thế giới đủ nhỏ để trẻ làm chủ trọn vẹn, đủ thật để chạy được trên thiết bị thật.",
    },
    {
      title: "Học như trường samba",
      desc: "Người mới học cạnh người giỏi trong cùng một việc thật, không chia lớp tách biệt theo tuổi hay trình độ.",
    },
    {
      title: "Tách trẻ khỏi màn hình",
      desc: "Mọi tương tác số đều bắt nguồn từ một hành động vật lý: lắp ráp, thao tác thiết bị, quan sát hiện tượng.",
    },
  ],
};
