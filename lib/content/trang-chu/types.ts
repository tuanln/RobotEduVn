/** Toàn bộ chữ của trang chủ — năm khối hero, ba nhịp, số liệu, đối tác, lời mời. */
export interface TrangChuContent {
  meta: { title: string; description: string };
  hero: {
    nhanTren: string;
    /** Ba chữ của tiêu đề lớn; chữ giữa tô gradient. */
    tieuDe: [string, string, string];
    moTa: string;
    /** Dòng Papert dưới câu mở, dẫn tới /hanh-trinh#vi-sao. */
    papert: string;
    papertLink: string;
    nutCachHoc: string;
    nutVideo: string;
    lapLai: string;
    mucTieu: string;
  };
  /** Khối con đường 8 chặng: ảnh A1 + nút sang trang Hành trình. */
  conDuong: { tieuDe: string; phuDe: string; nut: string; altAnh: string };
  /** Một robot, ba mảng: sơ đồ ba vòng + bốn hoạt động AI có thật. */
  baMang: {
    tieuDe: string;
    phuDe: string;
    vong: { ten: string; moTa: string }[];
    hoatDongAI: { tieuDe: string; ds: { ten: string; chang: string }[] };
    kyNang: string;
  };
  /** Khối mùa thi FanRoc. */
  fanroc: { tieuDe: string; moTa: string; nut: string; href: string };
  baNhip: { tieuDe: string; phuDe: string; xemChiTiet: string };
  soLieu: {
    tieuDe: string;
    phuDe: string;
    hub: { label: string; note: string };
    tinh: { label: string; chuaCo: string };
    video: { label: string; note: string };
    nhip: { label: string; note: string };
    mucTieuDam: string;
    mucTieuThan: string;
  };
  doiTac: { tieuDe: string; phuDe: string; ds: { name: string; role: string }[] };
  cta: { tieuDe: string; moTa: string; nutCachHoc: string; nutHub: string };
}
