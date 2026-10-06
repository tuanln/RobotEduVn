import type { RouteKey } from "@/lib/i18n/routes";

/** Một link chân trang: nội bộ thì `route`, ra ngoài thì `href`. */
export interface LinkKhung {
  label: string;
  route?: RouteKey;
  href?: string;
}

/**
 * Chữ của khung trang — những thứ hiện trên MỌI trang công khai: chân trang,
 * link bỏ qua menu, khung chat, nút đổi giao diện, nút menu di động.
 */
export interface KhungContent {
  /** Thay SITE.tagline / SITE.description trong metadata gốc. */
  site: { tagline: string; description: string };
  skipLink: string;
  footer: {
    gioiThieu: string;
    khoiXuong: string;
    cot: { tieuDe: string; links: LinkKhung[] }[];
    /** Phần sau tên "OpenSTEM Foundation". */
    banQuyen: string;
    mucTieu: string;
  };
  chat: {
    ten: string;
    phuDe: string;
    chao: string;
    moiHoi: string;
    goiYTieuDe: string;
    goiY: string[];
    dangNghi: string;
    loiKetNoi: string;
    placeholder: string;
    moChat: string;
    dongChat: string;
    gui: string;
  };
  theme: { sangSang: string; sangToi: string };
  menu: { mo: string; dong: string };
  /** Tiền tố aria-label của nút chuyển ngôn ngữ: "Chuyển sang English". */
  chuyenSang: string;
}
