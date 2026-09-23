/**
 * Bốn trường chữ hiển thị của một nhịp — tách khỏi `NhipInfo` trong
 * `lib/content/nhip.ts` vì `nhip.ts` chỉ có tiếng Việt và còn nuôi ba trang
 * nhịp của kế hoạch 2 (KHÔNG được sửa ở đây). `icon`, `huyHieu`, `slug` và
 * các lớp màu không phải chữ nên vẫn lấy thẳng từ `NHIP`.
 */
export interface NhipNhan {
  ten: string;
  khauHieu: string;
  moTaNgan: string;
  tenHuyHieu: string;
}
