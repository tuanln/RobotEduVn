import type { NhipSlug } from "@/lib/content/nhip-slug";
import type { NhipNhan } from "./types";

/**
 * Chép nguyên văn bốn trường chữ của ba nhịp từ `lib/content/nhip.ts`
 * (dòng 51, 52, 57, 67 cho `choi`; 78, 79, 84, 94 cho `lam`; 132, 133, 138,
 * 150 cho `chia-se`). Không đổi một dấu câu.
 */
export const NHIP_NHAN_VI: Record<NhipSlug, NhipNhan> = {
  choi: {
    ten: "Chơi",
    khauHieu: "Tò mò trước đã — chưa học gì cả",
    moTaNgan:
      "Trẻ chạm, thử, làm hỏng rồi thử lại ở các trạm trò chơi. Không bài giảng, không điểm số — chỉ để bật ra một câu hỏi: cái này chạy kiểu gì?",
    tenHuyHieu: "Người Tò Mò",
  },
  lam: {
    ten: "Làm",
    khauHieu: "Bắt tay làm ra một thứ chạy được",
    moTaNgan:
      "Bảy buổi cùng một người dẫn, để biến câu hỏi lúc chơi thành một sản phẩm thật — cầm được, chạy được, hỏng được và sửa được.",
    tenHuyHieu: "Thợ Làm",
  },
  "chia-se": {
    ten: "Chia sẻ",
    khauHieu: "Làm xong thì kể cho người khác nghe",
    moTaNgan:
      "Trẻ tự đứng lên kể lại: mình định làm gì, hỏng chỗ nào, sửa ra sao. Kể được cho người khác hiểu mới là hiểu thật.",
    tenHuyHieu: "Người Chia Sẻ",
  },
};
