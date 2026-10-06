import type { ChoMentorContent } from "./types";

/** Chép nguyên văn từ app/(site)/[locale]/(public)/cho-mentor/page.tsx. */
export const CHO_MENTOR_VI: ChoMentorContent = {
  meta: {
    title: "Cho Mentor & Giáo Viên",
    description:
      "Tài liệu giáo trình, hướng dẫn giảng dạy, và cộng đồng mentor cho giáo viên STEM.",
  },
  tieuDe: "Cho Mentor & Giáo Viên",
  phuDe: "Tài liệu, công cụ và cộng đồng hỗ trợ giáo viên dạy STEM & Robot",
  taiNguyen: [
    {
      icon: "📚",
      title: "Giáo Trình Ba Nhịp",
      desc: "Giáo trình cho từng nhịp Chơi, Làm, Chia sẻ. Có thể tải về và in.",
      route: "howWeLearn",
    },
    {
      icon: "🎬",
      title: "Video Hướng Dẫn",
      desc: "Các video bài giảng mẫu, hướng dẫn sử dụng công cụ và thiết bị giáo dục.",
      route: "videos",
    },
    {
      icon: "🛠️",
      title: "Công Cụ & Thiết Bị",
      desc: "Hướng dẫn sử dụng GCompris, KTurtle, Python, ThingBot, NEO One trong lớp học.",
      route: "tools",
    },
    {
      icon: "🏠",
      title: "Mở Maker Hub",
      desc: "Hướng dẫn mở và vận hành một Maker Hub (Làng Maker) tại địa phương. Từ không gian đến giáo trình.",
      route: "makerHubs",
    },
  ],
  cachTroThanh: "Cách Trở Thành Mentor",
  buoc: [
    "Đăng ký tham gia cộng đồng Mentor qua email lang@makerviet.org",
    "Nhận tài liệu giáo trình và hướng dẫn sử dụng công cụ",
    "Tham gia tập huấn online/offline định kỳ hằng tháng",
    "Tổ chức lớp học/sinh hoạt tại trường hoặc Maker Hub",
    "Chia sẻ kinh nghiệm và góp ý cải tiến giáo trình",
  ],
  nutLienHe: "Liên Hệ Đăng Ký Mentor",
};
