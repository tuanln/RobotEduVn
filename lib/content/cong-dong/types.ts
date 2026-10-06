import type { RouteKey } from "@/lib/i18n/routes";
import type { MakerHub } from "@/lib/types";

/** Khối "chưa có nội dung" của trang Dự Án và Tạp Chí. */
export interface KhoiRong {
  title: string;
  description: string;
  actionLabel: string;
  /** Tiêu đề thư — trang tự mã hoá bằng encodeURIComponent. */
  mailSubject: string;
}

/** Chữ của bốn trang Cộng Đồng. Tên hub, địa chỉ, bài viết là dữ liệu — không ở đây. */
export interface CongDongContent {
  tongQuan: {
    meta: { title: string; description: string };
    tieuDe: string;
    phuDe: string;
    soLieu: { hub: string; tinh: string; video: string };
    /** `icon`, `route`, `color` giống hệt hai bản. */
    muc: { icon: string; title: string; desc: string; route: RouteKey; color: string }[];
    ketNoi: string;
    linkNgoai: { name: string; url: string; desc: string }[];
  };
  hub: {
    meta: { title: string; description: string };
    tieuDe: string;
    phuDe: string;
    loai: Record<MakerHub["type"], string>;
    lich: string;
    mentor: string;
    thietBi: string;
    lienHe: string;
    dangCapNhat: string;
    banDo: string;
    dangHoatDong: string;
    tinh: string;
    moHub: string;
    guiDangKy: string;
    rongTieuDe: string;
    rongMoTa: string;
    rongNut: string;
    mailSubject: string;
  };
  duAn: {
    meta: { title: string; description: string };
    tieuDe: string;
    phuDe: string;
    rong: KhoiRong;
  };
  tapChi: {
    meta: { title: string; description: string };
    tieuDe: string;
    phuDe: string;
    loai: Record<"tap-chi" | "du-an" | "huong-dan" | "tin-tuc", string>;
    tacGia: string;
    rong: KhoiRong;
  };
}
