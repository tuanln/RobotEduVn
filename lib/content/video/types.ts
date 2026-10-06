/** Chữ giao diện của Video Hub và trang một video. Tiêu đề/mô tả video là dữ liệu YouTube. */
export interface VideoContent {
  meta: { title: string; description: string };
  tieuDe: string;
  phuDe: string;
  dangTai: string;
  tatCa: string;
  timKiem: string;
  khongThay: string;
  xoaLoc: string;
  /** Khuôn nhãn độ tuổi, `{range}` được thay bằng "10-15": "{range} tuổi" | "Ages {range}". */
  tuoi: string;
  lienQuan: string;
  chuaLienQuan: string;
  /** Nút quay lại danh sách. */
  quayLai: string;
}
