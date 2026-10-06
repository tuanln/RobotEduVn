import { SITE } from "@/lib/site";
import type { TrangChuContent } from "./types";

/** Chép nguyên văn từ components/home/*.tsx và page.tsx. Không đổi một dấu câu. */
export const TRANG_CHU_VI: TrangChuContent = {
  // Trang chủ trước đây dùng metadata mặc định của layout — giữ nguyên.
  meta: { title: `${SITE.name} — Giáo Dục STEM & Robot Mở`, description: SITE.description },
  hero: {
    nhanTren: "Làng Maker",
    tieuDe: ["Chơi", "Làm", "Chia sẻ"],
    moTa: "Ba nhịp lặp lại ở Làng Maker: chơi cho tò mò, bắt tay làm ra thứ chạy được, rồi kể lại cho người khác nghe.",
    nutCachHoc: "Xem cách học",
    nutVideo: "Xem Video Hub",
    lapLai: "lặp lại",
    mucTieu: "Mục tiêu 5 năm: 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot",
  },
  baNhip: {
    tieuDe: "Ba Nhịp Lặp Lại",
    phuDe: 'Theo triết lý Kiến tạo của Seymour Papert — "Học bằng làm"',
    xemChiTiet: "Xem chi tiết cách học",
  },
  soLieu: {
    tieuDe: "Hiện Trạng Mạng Lưới",
    phuDe: "Những con số đang có thật — cập nhật theo dữ liệu của nền tảng",
    hub: { label: "Maker Hub", note: "đang hoạt động" },
    tinh: { label: "Tỉnh thành", chuaCo: "chưa có" },
    video: { label: "Video bài học", note: "miễn phí" },
    nhip: { label: "Nhịp", note: "lặp lại, vòng sau khó hơn" },
    mucTieuDam: "Mục tiêu 5 năm:",
    mucTieuThan:
      "1.000.000 trẻ em Việt Nam được tiếp cận STEM & Robot. Đây là đích đến, không phải số đã đạt.",
  },
  doiTac: {
    tieuDe: "Đối Tác & Cộng Đồng",
    phuDe:
      "Mặt trận thống nhất vì giáo dục STEM — Ai có súng dùng súng, ai có gươm dùng gươm",
    ds: [
      { name: "MakerViet", role: "Cộng đồng Maker & Mã nguồn mở" },
      { name: "ThingEdu", role: "Giáo dục STEM & Phần mềm" },
      { name: "Rogo", role: "Robot giáo dục ThingBot" },
      { name: "FPT Shop", role: "Mạng lưới Maker Hub" },
      { name: "FIRST Global", role: "Cuộc thi Robot quốc tế" },
    ],
  },
  cta: {
    tieuDe: "Sẵn Sàng Bắt Đầu Hành Trình STEM?",
    moTa: "Từ 4 tuổi đã có thể bắt đầu — bắt đầu từ nhịp Chơi, hoàn toàn miễn phí.",
    nutCachHoc: "Xem Cách Học",
    nutHub: "Tìm Maker Hub Gần Bạn",
  },
};
