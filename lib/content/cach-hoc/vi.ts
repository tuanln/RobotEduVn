import { NHIP } from "@/lib/content/nhip";
import type { NhipSlug } from "@/lib/content/nhip-slug";
import type { CachHocContent, NhipTrang } from "./types";

/**
 * Văn xuôi của ba nhịp DỰNG TỪ `NHIP` — không chép tay, để không có hai nguồn
 * trôi khỏi nhau (cùng lý do triet-ly/vi.ts lấy nguyên lý từ nhip.ts). Nhãn
 * giao diện chép nguyên văn từ hai trang hanh-trinh.
 */
const nhip = Object.fromEntries(
  NHIP.map((n) => [
    n.slug,
    {
      metaTitle: `Nhịp ${n.ten}`,
      moTaDai: n.moTaDai,
      taiLangMaker: n.taiLangMaker,
      ...(n.huong && {
        huong: n.huong.map(({ title, doing }) => ({ title, doing })),
      }),
      ...(n.nguyenTac && { nguyenTac: n.nguyenTac }),
    } satisfies NhipTrang,
  ]),
) as Record<NhipSlug, NhipTrang>;

export const CACH_HOC_VI: CachHocContent = {
  meta: {
    title: "Cách Học Ở Làng Maker",
    description:
      "Ba nhịp lặp lại: chơi cho tò mò, bắt tay làm ra sản phẩm thật, rồi kể lại cho người khác. Không phải thang bậc — là vòng lặp.",
  },
  tieuDe: "Cách Học Ở Làng Maker",
  phuDe: "Ba nhịp lặp đi lặp lại — không ai phải leo bậc, ai cũng đi qua đủ ba",
  ghiChuTuoi:
    "Từ 4 đến 18 tuổi đều đi qua đủ ba nhịp này. Khác nhau không nằm ở nhịp nào, mà ở độ khó của thứ trẻ chọn làm.",
  nhip,
  nhan: {
    taiLangMaker: "Tại Làng Maker",
    namNhomTram: "Năm nhóm trạm chơi",
    buoiDau:
      "Buổi trải nghiệm đầu tiên miễn phí, 60–90 phút, cuối tuần. Không cần biết trước gì, không cần mang theo gì.",
    baHuong: "Ba hướng làm, đi song song",
    baHuongGhiChu:
      "Không phải ba cấp bậc. Trẻ chọn hướng vừa tay với thứ mình đang muốn làm.",
    doNghe: "Đồ nghề",
    baNguyenTac: "Ba nguyên tắc dẫn buổi học",
    videoNhip: "Video của nhịp này",
    xemVideo: "Xem Video Hub",
    chuaCoVideo: "Nhịp này chưa có video — vì nó vốn để trải nghiệm trực tiếp.",
    timHub: "Tìm Maker Hub gần bạn",
    nhipTiepTheo: "Nhịp tiếp theo:",
    khongTimThay: "Không tìm thấy",
  },
};
