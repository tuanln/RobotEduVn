/**
 * Một mảnh chữ trong đoạn có định dạng. Đoạn có <strong>/<em> được lưu dạng
 * mảng mảnh để KHÔNG phải dùng dangerouslySetInnerHTML.
 */
export interface Manh {
  text: string;
  dam?: true;
  nghieng?: true;
}

/**
 * Chữ của trang Làng Maker. Phần không phải chữ (bậc, mốc, năm, căn cứ
 * `nguon`, có chứng nhận hay không) vẫn lấy từ lib/content/lang-maker.ts.
 * `vai`, `moc` khớp số lượng và thứ tự với dữ liệu gốc — test canh.
 */
export interface LangMakerTrangContent {
  meta: { title: string; description: string };
  tieuDe: string;
  phuDe: string;
  luanDe: { tieuDe: string; doan: Manh[][] };
  laGi: {
    tieuDe: string;
    doan: string[];
    tamNhin: { tieuDe: string; noiDung: string };
    suMenh: { tieuDe: string; noiDung: string };
  };
  nguoiTrongLang: {
    tieuDe: string;
    moTa: string;
    vai: { ten: string; laAi: string }[];
    /** Câu kết: phần trước link, chữ của link (tới nhịp Chia sẻ), phần sau. */
    ket: { truoc: Manh[]; link: string; sau: string };
  };
  nguoiDan: {
    tieuDe: string;
    moTa: string;
    coChungNhan: string;
    vai: { ten: string; dan: string; viecCuThe: string }[];
    oCacHub: string;
    /** Khoá là `Mentor.ten`. */
    ngheMentor: Record<string, string>;
    danhSachDai: string;
    gioiThieuMinh: string;
    rongMoTa: string;
    mailSubject: string;
  };
  muoiNam: {
    tieuDe: string;
    trichDan: { loi: string; ghiChu: string };
    moc: { tieuDe: string; chiTiet: string }[];
    canCu: string;
    doNghe: { tieuDe: string; moTa: string };
  };
  cuaVao: { tieuDe: string; moTa: string; timHub: string; batDauChoi: string };
}
