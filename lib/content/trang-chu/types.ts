/** Toàn bộ chữ của trang chủ — năm khối hero, ba nhịp, số liệu, đối tác, lời mời. */
export interface TrangChuContent {
  meta: { title: string; description: string };
  hero: {
    nhanTren: string;
    /** Ba chữ của tiêu đề lớn; chữ giữa tô gradient. */
    tieuDe: [string, string, string];
    moTa: string;
    nutCachHoc: string;
    nutVideo: string;
    lapLai: string;
    mucTieu: string;
  };
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
