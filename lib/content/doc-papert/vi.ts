import type { DocPapertContent } from "./types";

/**
 * Chép nguyên văn từ `components/nhip/doc-papert.tsx`. Ba URL và địa chỉ
 * `mailto:` kiểm tra HTTP 200 ngày 2026-09-06.
 */
export const DOC_PAPERT_VI: DocPapertContent = {
  heading: "Đọc Papert",
  introPrefix:
    "Toàn bộ cách học ở Làng Maker bắt nguồn từ một cuốn sách năm 1980 (ấn bản 2 năm 1993) của Seymour Papert: ",
  bookTitle: "Mindstorms — Children, Computers, and Powerful Ideas",
  introSuffix:
    ". MIT Media Lab đăng công khai bản đầy đủ, miễn phí, với sự cho phép của gia đình Papert.",
  downloadLabel: "Tải sách bản gốc",
  downloadSize: "(PDF, 60 MB)",
  readOnlineLabel: "Đọc trực tuyến, không cần tải",
  officialSourceLabel: "Nguồn chính thức:",
  officialSourceLinkText: "trang xuất bản của MIT Media Lab",
  communityBold: "Bản tiếng Việt đang được cộng đồng dịch",
  communityMiddle: ", kèm ",
  communityBookTitle: "Chuyện Làng Maker",
  communityAfter:
    " sau mỗi chương — kể lại mười năm Maker Việt đã sống với đúng ý tưởng của chương đó ra sao.",
  notifyLinkText: "Nhận tin khi bản dịch xong",
  links: {
    pdfUrl: "https://dam-prod.media.mit.edu/x/2025/01/27/Mindstorms.pdf",
    archiveUrl: "https://archive.org/details/mindstormschildr0000pape",
    mitUrl: "https://www.media.mit.edu/publications/mindstorms/",
    mailto:
      "mailto:lang@makerviet.org?subject=Nhận%20tin%20bản%20tiếng%20Việt%20Mindstorms",
  },
};
