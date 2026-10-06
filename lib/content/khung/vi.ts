import type { KhungContent } from "./types";

/** Chép nguyên văn từ các component khung trang. Không đổi một dấu câu. */
export const KHUNG_VI: KhungContent = {
  site: {
    tagline: "Giáo Dục STEM & Robot Mở",
    description:
      "Nền tảng giáo dục STEM & Robot mở cho trẻ em Việt Nam. Học đi đôi với Làm — vòng lặp ba nhịp Chơi, Làm, Chia sẻ cho trẻ 4 đến 18 tuổi, theo triết lý Seymour Papert.",
    keywords: [
      "STEM",
      "Robot",
      "giáo dục",
      "trẻ em",
      "Việt Nam",
      "MakerViet",
      "Làng Maker",
      "Maker Hub",
      "Chơi Làm Chia sẻ",
      "Seymour Papert",
      "học bằng làm",
    ],
  },
  skipLink: "Bỏ qua menu, tới nội dung chính",
  footer: {
    gioiThieu:
      "Nền tảng giáo dục STEM & Robot mở cho trẻ em Việt Nam. Học đi đôi với Làm — mỗi trẻ em là một nhà sáng tạo.",
    khoiXuong: "Khởi xướng bởi",
    cot: [
      {
        tieuDe: "Khám Phá",
        links: [
          { label: "Làng Maker", route: "makerVillage" },
          { label: "Cách Học", route: "howWeLearn" },
          { label: "Triết Lý Papert", route: "philosophy" },
          { label: "Công Cụ & Thiết Bị", route: "tools" },
          { label: "Video Hub", route: "videos" },
        ],
      },
      {
        tieuDe: "Cho Giáo Viên",
        links: [
          { label: "Tài Liệu Giáo Trình", route: "forMentors" },
          { label: "Cộng Đồng Mentor", route: "community" },
          { label: "Đăng Ký Maker Hub", route: "makerHubs" },
        ],
      },
      {
        tieuDe: "Kết Nối",
        links: [
          {
            label: "Email: lang@makerviet.org",
            href: "mailto:lang@makerviet.org",
          },
          {
            label: "Facebook: Bình dân học STEM",
            href: "https://facebook.com/groups/binhdanhocSTEM",
          },
          { label: "GitHub: MakerViet", href: "https://github.com/makerviet" },
          { label: "YouTube: MakerViet", href: "https://youtube.com/@makerviet" },
        ],
      },
    ],
    banQuyen: ". Mã nguồn mở — Giáo dục mở.",
    mucTieu: "Mục tiêu: 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot",
  },
  chat: {
    ten: "Neo Trẻ AI",
    phuDe: "Trợ lý STEM của bạn",
    chao: "Xin chào! Mình là Neo Trẻ AI 🤖",
    moiHoi:
      "Hỏi mình bất cứ điều gì về STEM, Robot, cách học ở Làng Maker, hay cộng đồng Maker nhé!",
    goiYTieuDe: "Câu hỏi gợi ý:",
    goiY: [
      "Con tôi 8 tuổi thì bắt đầu thế nào?",
      "Maker Hub gần nhất ở đâu?",
      "Làm sao để đăng ký học STEM?",
      "Triết lý giáo dục của Làng Maker là gì?",
    ],
    dangNghi: "Đang suy nghĩ...",
    loiKetNoi:
      "Xin lỗi, có lỗi kết nối. Vui lòng thử lại hoặc liên hệ lang@makerviet.org.",
    placeholder: "Nhập câu hỏi...",
    moChat: "Mở chat",
    dongChat: "Đóng chat",
    gui: "Gửi",
  },
  theme: {
    sangSang: "Chuyển sang giao diện sáng",
    sangToi: "Chuyển sang giao diện tối",
  },
  menu: { mo: "Mở menu", dong: "Đóng menu" },
  chuyenSang: "Chuyển sang",
  tenTiengViet: "Tiếng Việt",
};
