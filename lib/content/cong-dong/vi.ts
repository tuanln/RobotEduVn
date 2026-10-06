import type { CongDongContent } from "./types";

/** Chép nguyên văn từ bốn trang app/(site)/[locale]/(public)/cong-dong/**. */
export const CONG_DONG_VI: CongDongContent = {
  tongQuan: {
    meta: {
      title: "Cộng Đồng",
      description:
        "Cộng đồng Làng Maker — Dự án nổi bật, Tạp chí MakerViet, Mạng lưới Maker Hub, và kết nối STEM.",
    },
    tieuDe: "Cộng Đồng Làng Maker",
    phuDe: "Kết nối — Chia sẻ — Cùng phát triển",
    soLieu: { hub: "Maker Hub", tinh: "Tỉnh thành", video: "Video bài học" },
    muc: [
      {
        icon: "🚀",
        title: "Dự Án Nổi Bật",
        desc: "Các dự án STEM từ cộng đồng: xe tự hành, robot, IoT và nhiều hơn.",
        route: "projects",
        color: "border-amber-500/30 bg-amber-500/5",
      },
      {
        icon: "📰",
        title: "Tạp Chí MakerViet",
        desc: "Bài viết, hướng dẫn và tin tức hàng tháng từ cộng đồng Maker.",
        route: "magazine",
        color: "border-emerald-500/30 bg-emerald-500/5",
      },
      {
        icon: "📍",
        title: "Mạng Lưới Maker Hub",
        desc: "Tìm Maker Hub (Làng Maker) gần bạn — tại FPT Shop và các địa điểm đối tác.",
        route: "makerHubs",
        color: "border-blue-500/30 bg-blue-500/5",
      },
    ],
    ketNoi: "Kết Nối Cộng Đồng",
    linkNgoai: [
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
    ],
  },
  hub: {
    meta: {
      title: "Mạng Lưới Maker Hub",
      description:
        "Tìm Maker Hub (Làng Maker) gần bạn — không gian sáng tạo STEM & Robot tại FPT Shop và các địa điểm đối tác.",
    },
    tieuDe: "Mạng Lưới Maker Hub",
    phuDe: '"Làng Maker" — không gian sáng tạo STEM & Robot tại địa phương',
    loai: { "fpt-shop": "FPT Shop", clb: "CLB Robotics", "truong-hoc": "Trường Học" },
    lich: "Lịch sinh hoạt",
    mentor: "Mentor",
    thietBi: "Thiết bị",
    lienHe: "Liên hệ",
    dangCapNhat: "Đang cập nhật",
    banDo: "Xem đường đi trên Google Maps",
    dangHoatDong: "Hub đang hoạt động",
    tinh: "Tỉnh thành",
    moHub: "Mở hub tại nơi bạn ở?",
    guiDangKy: "Gửi đăng ký",
    rongTieuDe: "Chưa có Maker Hub nào mở cửa",
    rongMoTa:
      "Mạng lưới đang được xây dựng. Liên hệ để mở hub đầu tiên tại địa phương của bạn.",
    rongNut: "Đăng ký mở hub",
    mailSubject: "Đăng ký mở Robot Hub",
  },
  duAn: {
    meta: {
      title: "Dự Án Nổi Bật",
      description: "Các dự án STEM nổi bật từ cộng đồng MakerViet và Làng Maker.",
    },
    tieuDe: "Dự Án Nổi Bật",
    phuDe: "Các dự án STEM từ cộng đồng — từ ý tưởng đến sản phẩm thực tế",
    rong: {
      title: "Chưa có dự án nào được đăng",
      description:
        "Trang này sẽ đăng dự án thật của học sinh và mentor trong cộng đồng. Bạn đã làm được gì thú vị? Gửi cho chúng tôi để trở thành dự án đầu tiên.",
      actionLabel: "Gửi dự án của bạn",
      mailSubject: "Gửi dự án STEM",
    },
  },
  tapChi: {
    meta: {
      title: "Tạp Chí MakerViet",
      description: "Bài viết, hướng dẫn và tin tức từ cộng đồng MakerViet.",
    },
    tieuDe: "Tạp Chí MakerViet",
    phuDe: "Bài viết, hướng dẫn và tin tức hàng tháng từ cộng đồng",
    loai: {
      "tap-chi": "Tạp Chí",
      "du-an": "Dự Án",
      "huong-dan": "Hướng Dẫn",
      "tin-tuc": "Tin Tức",
    },
    tacGia: "Tác giả:",
    rong: {
      title: "Số đầu tiên đang được biên tập",
      description:
        "Tạp chí sẽ đăng bài hướng dẫn, dự án và tin tức từ cộng đồng Maker. Bạn muốn viết bài? Gửi ý tưởng cho ban biên tập.",
      actionLabel: "Gửi bài viết",
      mailSubject: "Gửi bài cho Tạp chí MakerViet",
    },
  },
};
