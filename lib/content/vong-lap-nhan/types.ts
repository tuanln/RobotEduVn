/**
 * Chữ của dòng "đường quay lại" trong `components/nhip/vong-lap.tsx` — tách
 * ra mô-đun hai bản để được `missingKeys`/`emptyStringKeys` canh, thay vì
 * nằm trong một ternary nội tuyến không ai bắt lỗi được.
 */
export interface VongLapNhan {
  /** Câu dưới sơ đồ ba nhịp, nhắc đường quay lại từ Chia sẻ về Chơi. */
  quayLai: string;
}
