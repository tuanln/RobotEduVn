import { SITE } from "@/lib/site";
import type { TrangChuContent } from "./types";

/** Chép nguyên văn từ components/home/*.tsx và page.tsx. Không đổi một dấu câu. */
export const TRANG_CHU_VI: TrangChuContent = {
  // Trang chủ trước đây dùng metadata mặc định của layout — giữ nguyên.
  meta: { title: `${SITE.name} — Giáo Dục STEM & Robot Mở`, description: SITE.description },
  hero: {
    nhanTren: "Sổ tay số Làng Maker",
    tieuDe: ["Robot là", "vật để nghĩ", "cùng"],
    moTa: "Ở Làng Maker, trẻ chơi với robot để học cách nghĩ. Một con đường tự vọc robot từ 6 tuổi: chơi cho tò mò, làm ra thứ chạy được, rồi kể lại cho người khác.",
    papert: "Cách học theo Seymour Papert (MIT): trẻ học sâu nhất khi tự làm ra thứ mình thích.",
    papertLink: "Xem vì sao",
    nutCachHoc: "Bắt đầu ngay",
    nutVideo: "Xem hành trình 8 chặng",
    lapLai: "lặp lại",
    mucTieu: "Mục tiêu 5 năm: 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot",
  },
  conDuong: {
    tieuDe: "Con đường 8 chặng",
    phuDe: "Từ Khách Làng tới Già Làng, theo bốn giai đoạn của cây tre. Không ai phải leo hết; mỗi chặng là một chỗ đứng có thật.",
    nut: "Xem hành trình",
    altAnh: "Sơ đồ tám chặng người Làng Maker: Khách Làng, Thợ Học Việc, Đấu Thủ Làng, Đại Sứ Dế STEM, Thợ Chế Tác, Đội Tuyển Việt Nam, Thợ Cả, Già Làng",
  },
  baMang: {
    tieuDe: "Một robot, ba mảng",
    phuDe: "Điện tử, Robotics và AI không phải ba môn riêng. Chúng gặp nhau ở con robot và lớn dần cùng con.",
    vong: [
      { ten: "Điện tử", moTa: "Bấm nút thấy đèn sáng, rồi cắm động cơ, rồi tự thiết kế mạch cảm biến." },
      { ten: "Robotics", moTa: "Lái robot qua mê cung, rồi lập trình khối, rồi dựng xe tự hành." },
      { ten: "AI", moTa: "Nói “tiến lên” robot chạy, rồi dạy máy nhận cử chỉ, rồi giao việc cho agent và kiểm tra khi máy sai." },
    ],
    hoatDongAI: {
      tieuDe: "Bốn hoạt động AI có thật ở Làng",
      ds: [
        { ten: "Nói “tiến lên”, robot chạy; chơi game camera bằng cả người", chang: "Chặng 1" },
        { ten: "Dạy máy nhận ra cử chỉ tay trong game camera", chang: "Chặng 2" },
        { ten: "Dùng agent AI để làm game: em mô tả luật, máy viết mã, em thử và sửa", chang: "Chặng 4" },
        { ten: "Xe tự hành VIA nhìn làn đường; tự dựng trợ lý giọng nói điều khiển robot", chang: "Chặng 5" },
      ],
    },
    kyNang: "Kỹ năng ở lại: tư duy hệ thống, chia việc lớn thành bước nhỏ, gỡ lỗi, làm việc nhóm, kể lại cho người khác hiểu, và dùng AI như một đồ nghề: biết giao việc cho máy, biết kiểm tra khi máy sai, không để máy làm hộ.",
  },
  fanroc: {
    tieuDe: "Mùa thi FanRoc",
    moTa: "FanRoc là cửa vào sân chơi cho học sinh phổ thông: phát động tháng 11, chung kết tháng 3. Ở Làng, em chuẩn bị với ThingBot, ThingBlock, tay cầm PS2 và sân mô phỏng.",
    nut: "Xem các sân chơi",
    href: "/san-choi#fanroc",
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
