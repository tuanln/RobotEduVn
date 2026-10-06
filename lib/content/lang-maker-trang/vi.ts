import {
  MENTORS,
  MUOI_NAM,
  NGUOI_DAN,
  NGUOI_TRONG_LANG,
  TRICH_DAN_2017,
} from "@/lib/content/lang-maker";
import type { LangMakerTrangContent } from "./types";

/**
 * Trang Làng Maker, bản tiếng Việt. Vai, mốc và trích dẫn DỰNG TỪ
 * lang-maker.ts; chữ còn lại chép nguyên văn từ lang-maker/page.tsx.
 */
export const LM_VI: LangMakerTrangContent = {
  meta: {
    title: "Làng Maker",
    description:
      "Làng Maker dùng robot để tạo ra đứa trẻ — robot không phải đích đến. Mười năm, năm vai trong làng, và một cái xưởng mở cửa từ 2016.",
  },
  tieuDe: "Làng Maker",
  phuDe: "Một cái xưởng chung, mở cửa từ 2016",
  luanDe: {
    tieuDe: "Dùng robot để tạo ra đứa trẻ",
    doan: [
      [
        {
          text: "Nghe ngược, nhưng đó là điều làng làm. Robot không phải đích đến — đứa trẻ mới là thứ được làm ra. Con robot chạy xong rồi cũng cất vào tủ; thứ ở lại là một đứa trẻ biết mình làm được.",
        },
      ],
      [
        { text: "Đồ vật được lập trình ở đây là " },
        { text: "đối tác tư duy", dam: true },
        { text: " của trẻ, không phải môn học phải thuộc. Trẻ nghĩ " },
        { text: "cùng", nghieng: true },
        { text: " con robot, chứ không học " },
        { text: "về", nghieng: true },
        { text: " con robot." },
      ],
      [
        { text: "Câu này có từ ngày đầu, khi làng còn tên là Maker Hanoi: " },
        { text: "“Your contributions, we share”", dam: true },
        { text: " — đóng góp của bạn, chúng ta cùng chia sẻ." },
      ],
    ],
  },
  laGi: {
    tieuDe: "Làng Maker là gì?",
    doan: [
      "Làng Maker là không gian sáng tạo mở, hoạt động phi lợi nhuận, do cộng đồng MakerViet · ThingEdu · Rogo dựng lên sau mười năm làm mã nguồn mở và giáo dục STEM tại Việt Nam.",
      "Chữ “mở” là cốt lõi: mở cửa tri thức, mở mã nguồn, mở mô hình — ai cũng có thể tham gia, đóng góp và thụ hưởng.",
    ],
    tamNhin: {
      tieuDe: "Tầm nhìn",
      noiDung:
        "Mỗi trẻ em Việt Nam đều có cơ hội tiếp cận STEM và Robot để phát triển tư duy độc lập và làm chủ công nghệ.",
    },
    suMenh: {
      tieuDe: "Sứ mệnh",
      noiDung:
        "Phổ cập STEM và Robot cho 1 triệu trẻ em Việt Nam trong 5 năm, bằng hệ sinh thái giáo dục mở, sản phẩm Made in Vietnam, và mạng lưới cộng đồng toàn quốc.",
    },
  },
  nguoiTrongLang: {
    tieuDe: "Người trong làng",
    moTa: "Làng không có lớp chia theo tuổi. Người mới học cạnh người giỏi, trong cùng một việc thật.",
    vai: NGUOI_TRONG_LANG.map(({ ten, laAi }) => ({ ten, laAi })),
    ket: {
      truoc: [
        { text: "Đứa trẻ bước vào làng là " },
        { text: "dân làng", dam: true },
        { text: ". Con đường đi lên là có thật — và nó khép lại đúng ở nhịp " },
      ],
      link: "Chia sẻ",
      sau: ", khi em quay lại dẫn lớp sau.",
    },
  },
  nguoiDan: {
    tieuDe: "Người dẫn ở làng",
    moTa: "Bốn vai. Ba trong số đó cũng là bậc trong thang bên trên — người dẫn hôm nay từng là dân làng.",
    coChungNhan: "có chứng nhận",
    vai: NGUOI_DAN.map(({ ten, dan, viecCuThe }) => ({ ten, dan, viecCuThe })),
    oCacHub: "Người dẫn ở các Maker Hub",
    ngheMentor: Object.fromEntries(
      MENTORS.filter((m) => m.nghe).map((m) => [m.ten, m.nghe as string]),
    ),
    danhSachDai: "Danh sách còn đang dài thêm.",
    gioiThieuMinh: "Bạn dẫn ở một hub? Giới thiệu mình",
    rongMoTa:
      "Chân dung từng người dẫn đang được các Maker Hub gửi về. Chúng tôi chỉ đăng tên người đã đồng ý.",
    mailSubject: "Giới thiệu người dẫn ở Làng Maker",
  },
  muoiNam: {
    tieuDe: "Mười năm",
    trichDan: { loi: TRICH_DAN_2017.loi, ghiChu: TRICH_DAN_2017.ghiChu },
    moc: MUOI_NAM.map(({ tieuDe, chiTiet }) => ({ tieuDe, chiTiet })),
    canCu: "Căn cứ:",
    doNghe: {
      tieuDe: "Mười năm làm đồ nghề",
      moTa: "Thứ được làm ra không phải mấy con robot này, mà là những người biết làm ra chúng.",
    },
  },
  cuaVao: {
    tieuDe: "Vào làng thế nào?",
    moTa: "Buổi đầu tiên miễn phí, và không cần biết gì trước.",
    timHub: "Tìm Maker Hub gần bạn",
    batDauChoi: "Bắt đầu từ nhịp Chơi",
  },
};
