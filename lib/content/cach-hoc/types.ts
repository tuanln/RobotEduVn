import type { NhipSlug } from "@/lib/content/nhip-slug";

/**
 * Văn xuôi dài của một nhịp. Bốn trường ngắn (tên, khẩu hiệu, mô tả ngắn,
 * tên huy hiệu) đã có ở NHIP_NHAN_*; icon, màu, tên công cụ và trạm chơi là
 * tên riêng nên vẫn lấy thẳng từ NHIP.
 */
export interface NhipTrang {
  /** Tiêu đề thẻ <title>: "Nhịp Chơi". */
  metaTitle: string;
  /** Nhiều đoạn, ngăn nhau bằng dòng trống. */
  moTaDai: string;
  taiLangMaker: string;
  huong?: { title: string; doing: string }[];
  nguyenTac?: { title: string; desc: string }[];
}

export interface CachHocContent {
  meta: { title: string; description: string };
  tieuDe: string;
  phuDe: string;
  ghiChuTuoi: string;
  nhip: Record<NhipSlug, NhipTrang>;
  nhan: {
    taiLangMaker: string;
    namNhomTram: string;
    buoiDau: string;
    baHuong: string;
    baHuongGhiChu: string;
    doNghe: string;
    baNguyenTac: string;
    videoNhip: string;
    xemVideo: string;
    chuaCoVideo: string;
    timHub: string;
    /** Đứng trước tên nhịp kế tiếp: "Nhịp tiếp theo: Làm". */
    nhipTiepTheo: string;
    khongTimThay: string;
  };
}
