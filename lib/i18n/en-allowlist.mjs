/**
 * Chữ có dấu tiếng Việt ĐƯỢC PHÉP xuất hiện trên trang /en mà không bọc
 * lang="vi" — dùng cho scripts/check-en-leaks.mjs.
 *
 * Chỉ tên riêng và thuật ngữ làng (spec 2.6: giữ tiếng Việt, chú giải lần đầu).
 * KHÔNG thêm từ thường — chỗ nào rò từ thường là chỗ chưa dịch, phải dịch.
 * Thứ tự không quan trọng: script tự xếp dài trước ngắn sau.
 */
export const ALLOW = [
  // Thuật ngữ làng — lib/content/glossary.ts (cả dạng viết hoa đang dùng ở NGUOI_DAN)
  "Làng Maker",
  "Dân làng",
  "dân làng",
  // Dạng viết thường khi đứng giữa câu, sau lần chú giải đầu (spec 2.6)
  "thợ học việc",
  "thợ cả",
  "Thợ học việc",
  "Thợ cả",
  "Già làng",
  "Già Làng",
  "Nghệ nhân",
  "Bô Lão",
  // Nút chuyển ngôn ngữ — tên ngôn ngữ viết bằng chính ngôn ngữ đó
  "Tiếng Việt",
  // Tên nhân vật, trợ lý, nhóm, chương trình, giải đấu (spec mục 6.4: giữ nguyên + chú giải)
  "Neo Trẻ AI",
  "Faddy Dế",
  "Bình dân học STEM",
  "Bình Dân Học STEM & Robot",
  "Bình Dân Học Vụ",
  "Cuộc Đua Số",
  "Maker Việt",
  "Thái Phiên",
  // Tên người
  "Hồ Chí Minh",
  "Seymour Papert",
  // Địa danh
  "Duy Tân",
  "Cầu Giấy",
  "Lương Yên",
  "Quy Nhơn",
  "Thanh Hóa",
  "Xã Đàn",
  "Dương Khuê",
];
