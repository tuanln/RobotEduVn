/**
 * Toàn bộ chữ hiển thị trong `components/nhip/doc-papert.tsx`, tách ra
 * mô-đun hai bản. `links` giữ ba URL ra ngoài và địa chỉ `mailto:` — đây là
 * địa chỉ, không phải văn, nên giống hệt nhau ở cả hai bản.
 */
export interface DocPapertContent {
  heading: string;
  /** Đoạn giới thiệu, trước tên sách in nghiêng. */
  introPrefix: string;
  /** Tên sách, hiển thị trong thẻ <em>. */
  bookTitle: string;
  /** Đoạn giới thiệu, sau tên sách in nghiêng. */
  introSuffix: string;
  downloadLabel: string;
  downloadSize: string;
  readOnlineLabel: string;
  officialSourceLabel: string;
  officialSourceLinkText: string;
  /** Phần in đậm của khối "bản tiếng Việt". */
  communityBold: string;
  /** Nối giữa phần in đậm và tên "Chuyện Làng Maker". */
  communityMiddle: string;
  /** Tên chuyên mục, hiển thị trong thẻ <em>. */
  communityBookTitle: string;
  /** Phần còn lại sau tên chuyên mục. */
  communityAfter: string;
  notifyLinkText: string;
  links: {
    pdfUrl: string;
    archiveUrl: string;
    mitUrl: string;
    mailto: string;
  };
}
