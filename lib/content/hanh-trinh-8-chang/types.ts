/**
 * Nội dung trang Hành trình và khối "Con mấy tuổi?" ở trang chủ
 * (spec 2026-11-06 mục 3, 4, 10).
 *
 * Chữ nằm trong vi.ts / en.ts có test parity. Mã ảnh (`anh`) trỏ tới
 * `public/hoc-lieu/lang/<mã>.webp`; thiếu tệp thì khung tự ẩn.
 */

export type MaGiaiDoan = "gieo-hat" | "vuon-canh" | "ket-trai" | "rung-ve-coi";

/** Một giai đoạn của cây tre, gắn với một quãng tuổi. */
export interface GiaiDoan {
  ma: MaGiaiDoan;
  ten: string;
  tuoi: string;
  /** Điều quan trọng nhất: con lớn lên thế nào. Đặt TRÊN dòng đồ nghề. */
  lonLen: string;
  doNghe: string[];
  /** Nút trên thẻ ở trang chủ. href là đường dẫn công khai. */
  link: { label: string; href: string };
  anh: string;
}

/** Một trong tám chặng người Làng Maker. */
export interface Chang {
  so: number;
  giaiDoan: MaGiaiDoan;
  ten: string;
  ai: string;
  lamGi: string;
  datDuoc: string;
  dauMoc: string;
  baMang: { dienTu: string; robotics: string; ai: string };
}

/** Một nguyên tắc Papert, kể bằng một cảnh thật ở Làng. */
export interface NguyenTac {
  ten: string;
  canh: string;
}

/** Một câu chuyện thật, có nguồn. */
export interface ChuyenThat {
  ma: string;
  tieuDe: string;
  doan: string[];
  anh: string[];
  nguon: string;
}

export interface HanhTrinhContent {
  meta: { title: string; description: string };
  tieuDe: string;
  phuDe: string;
  langNghe: { tieuDe: string; doan: string[] };
  chuKy: { tieuDe: string; moTa: string };
  conMayTuoi: { tieuDe: string; phuDe: string };
  giaiDoan: GiaiDoan[];
  tamChang: { tieuDe: string; phuDe: string };
  chang: Chang[];
  camKet: { tieuDe: string; moTa: string };
  viSao: {
    tieuDe: string;
    moTa: string;
    nguyenTac: NguyenTac[];
    nenTang: string;
    docThem: string;
  };
  chuyenThat: { tieuDe: string; phuDe: string; ds: ChuyenThat[] };
  bePhong: { tieuDe: string; y: string[] };
  nhan: {
    conLonLen: string;
    doNghe: string;
    ai: string;
    lamGi: string;
    datDuoc: string;
    dauMoc: string;
    baMang: { dienTu: string; robotics: string; ai: string };
    nguon: string;
    chang: string;
  };
}
