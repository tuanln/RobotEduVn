/**
 * Nội dung trang Làng Maker.
 *
 * Nguồn tư liệu 2016–2019: slide "Maker Hanoi — Review VIA Project" trong lưu trữ
 * Google Drive (tệp ghi 12/2020) · bài VTV 11/12/2016 · hồ sơ fablabs.io ·
 * thư mục FIRST ROBOTIC trong lưu trữ. Nguồn 2022–2026: kênh YouTube MakerViet và
 * dữ liệu chính trong repo.
 *
 * QUY TẮC: mỗi mốc BẮT BUỘC có `nguon`. Không thêm mốc nào mà không nói được căn cứ.
 * Không dẫn makerhanoi.org — tên miền đã chết.
 */

/** Một vai trong làng. `bac` null nghĩa là không thuộc thang bốn bậc. */
export interface VaiLang {
  ten: string;
  laAi: string;
  bac: 1 | 2 | 3 | 4 | null;
}

export interface MocThoiGian {
  /** Nhãn hiển thị, ví dụ "5/2016" hoặc "2018–2019". */
  moc: string;
  /** Năm để sắp xếp và kiểm tra. */
  nam: number;
  tieuDe: string;
  chiTiet: string;
  /** Căn cứ. Bắt buộc, không được rỗng. */
  nguon: string;
}

/**
 * Thang MakerCoach: Dân làng → Thợ học việc → Thợ cả → Già làng.
 * Nghệ nhân đứng cạnh thang, không phải một bậc.
 * Nguồn: thingedu-canon LANG_MAKER_PLAYBOOK mục 5, GLOSSARY mục 48 và 38.
 */
export const NGUOI_TRONG_LANG: VaiLang[] = [
  {
    ten: "Dân làng",
    bac: 1,
    laAi: "Người mới đến. Chơi trước đã, chưa cần biết gì, chưa phải đăng ký gì. Mọi đứa trẻ bước vào làng đều bắt đầu ở đây.",
  },
  {
    ten: "Thợ học việc",
    bac: 2,
    laAi: "Đã chọn một thứ muốn làm và đang học nghề, làm cạnh thợ cả. Chưa được chứng nhận, nhưng đã tự tay hỏng và tự tay sửa.",
  },
  {
    ten: "Thợ cả",
    bac: 3,
    laAi: "Làm chủ được một nghề và kèm được người khác. Ở Làng Maker, thợ cả là người dẫn buổi học — không giảng bài, mà làm cùng.",
  },
  {
    ten: "Già làng",
    bac: 4,
    laAi: "Người dẫn cả làng và chứng nhận tay nghề cho người khác. Giữ nếp làng nhiều hơn là giữ kiến thức.",
  },
  {
    ten: "Nghệ nhân",
    bac: null,
    laAi: "Người có nghề riêng ngoài làng — mộc, điện, gốm, may, cơ khí — ghé qua truyền lại một ngón nghề. Không nằm trong thang bậc, và cũng không cần.",
  },
];

/** Câu của người sáng lập, viết trước khi có chữ "Làng Maker" nào. */
export const TRICH_DAN_2017 = {
  loi: "Tôi muốn tạo ra nhiều lab như Maker Hanoi ở trường học, ở nông thôn, ở các tỉnh của Việt Nam. Mọi bạn trẻ đều cần được chạm vào công nghệ, được có ước mơ của riêng mình. Chúng tôi muốn mang STEM và Robot đến với tất cả mọi người.",
  nguoiNoi: "Tuấn Lê",
  thoiDiem: "6/2017",
  ghiChu: `Dịch từ nguyên văn tiếng Anh trong slide "Maker Hanoi — Review", lưu trữ Google Drive.`,
} as const;

/** Dòng đồ nghề mười năm — bằng chứng vật chất cho luận đề của trang. */
export const DO_NGHE_MUOI_NAM: string[] = [
  "MEO 1.0",
  "MEO 2.0",
  "K12 Maker",
  "ABC Maker 1.0",
  "ABC Maker 1.5",
  "ABC Maker 2.0",
  "Maker Bot 2020",
  "VIA",
  "ThingBot & NEO One",
];

export const MUOI_NAM: MocThoiGian[] = [
  {
    moc: "5/2016",
    nam: 2016,
    tieuDe: "Một cái xưởng chung mở cửa ở Hà Nội",
    chiTiet: `Maker Hanoi ra đời, là thành viên mạng lưới FabLab toàn cầu và hoạt động phi lợi nhuận. Khẩu hiệu từ ngày đầu: đóng góp của bạn, chúng ta cùng chia sẻ.`,
    nguon: `Slide "Maker Hanoi — Review", lưu trữ Google Drive · hồ sơ fablabs.io`,
  },
  {
    moc: "12/2016",
    nam: 2016,
    tieuDe: "Ngày hội IoT đầu tiên do cộng đồng tự làm",
    chiTiet:
      "Vietnam IoT Weekend tổ chức tại toà nhà FPT, Duy Tân, Cầu Giấy — không có ban tổ chức chuyên nghiệp nào, chỉ có những người mê chế tạo.",
    nguon: `Slide "Maker Hanoi — Review", lưu trữ Google Drive`,
  },
  {
    moc: "11/12/2016",
    nam: 2016,
    tieuDe: "Truyền hình quốc gia tìm đến xưởng",
    chiTiet: `VTV đưa tin "Maker Hanoi — điểm đến của nhiều bạn trẻ yêu thích công nghệ".`,
    nguon: "vtv.vn, bản tin công nghệ 11/12/2016 (kiểm còn truy cập được 2026-09-06)",
  },
  {
    moc: "6/2017",
    nam: 2017,
    tieuDe: "Câu nói định hình mười năm sau",
    chiTiet: `Người sáng lập viết ra điều mình muốn: nhiều lab như thế này ở trường học, ở nông thôn, ở các tỉnh. Chữ "Làng Maker" lúc đó chưa tồn tại.`,
    nguon: `Slide "Maker Hanoi — Review", lưu trữ Google Drive`,
  },
  {
    moc: "1/2018",
    nam: 2018,
    tieuDe: "Vietnam IoT Day — kết nối cộng đồng",
    chiTiet: "Ngày hội thứ hai, tổ chức tại Lương Yên Coworking.",
    nguon: `Slide "Maker Hanoi — Review", lưu trữ Google Drive`,
  },
  {
    moc: "2018",
    nam: 2018,
    tieuDe: "Bước ra sân quốc tế",
    chiTiet:
      "Hồ sơ FIRST Global Challenge bắt đầu từ năm này và có liên tục cho tới nay trong lưu trữ của cộng đồng.",
    nguon: "Thư mục FIRST ROBOTIC/FGC 2018 đến FGC 2026, lưu trữ Google Drive",
  },
  {
    moc: "2018–2019",
    nam: 2019,
    tieuDe: "Cuộc Đua Số",
    chiTiet:
      "Cuộc thi xe tự hành trở thành bài toán thật và nguồn dữ liệu cho dòng xe tự hành của cộng đồng.",
    nguon: `Slide "Maker Hanoi — Review", lưu trữ Google Drive`,
  },
  {
    moc: "2020",
    nam: 2020,
    tieuDe: "VIA — xe tự hành mã nguồn mở",
    chiTiet: `Maker Bot 2020 và dự án VIA: xe tự hành mở, kèm bộ mô phỏng, tập dữ liệu do cộng đồng đóng góp, và điều khiển bằng giọng nói tiếng Việt. Cùng năm có Vietnam STEAM Challenge.`,
    nguon: `Slide "Maker Hanoi — Review" · thư mục Vietnam STEAM Challenge 2020, lưu trữ Google Drive`,
  },
  {
    moc: "2021",
    nam: 2021,
    tieuDe: "Vietnam STEAM Challenge mùa hai",
    chiTiet: "Sân thi đấu trong nước tiếp tục, giữa hai năm dịch.",
    nguon: "Thư mục Vietnam STEAM Challenge 2021, lưu trữ Google Drive",
  },
  {
    moc: "5/2022",
    nam: 2022,
    tieuDe: "Mang xưởng đi tỉnh",
    chiTiet:
      "Mobile Maker Tour đến Quy Nhơn — tổ hợp không gian khoa học ExploraScience và khuôn viên Fschool.",
    nguon: "Video kênh MakerViet, đăng 28 và 31/5/2022",
  },
  {
    moc: "6/2022",
    nam: 2022,
    tieuDe: "Chung kết Vietnam Robotics Challenge",
    chiTiet: "Vòng chung kết VRC 2022, quay bằng camera 360 độ.",
    nguon: "Video kênh MakerViet, đăng 28/6/2022",
  },
  {
    moc: "10/2022",
    nam: 2022,
    tieuDe: "Đội tuyển Việt Nam ở Geneva",
    chiTiet: "FIRST Global Challenge 2022 tại Palexpo, Geneva.",
    nguon: "Video kênh MakerViet, đăng 12 và 13/10/2022",
  },
  {
    moc: "2023",
    nam: 2023,
    tieuDe: "Năm đào tạo người dẫn",
    chiTiet:
      "Khoá Arduino cho người mới, chương trình Maker Tech-Tutor đào tạo gia sư công nghệ, và robot CoBot cho lớp học. Làng bắt đầu tạo ra thợ cả của chính mình.",
    nguon:
      "Video kênh MakerViet đăng 26/5, 26/11 và 24/12/2023 · thư mục VRC 2023, lưu trữ Google Drive",
  },
  {
    moc: "2024–2025",
    nam: 2025,
    tieuDe: "Đồ nghề thành sản phẩm",
    chiTiet:
      "ThingBot và phần mềm lập trình khối ThingEduBlock ra mắt, rồi bộ Kit ThingBot bản 2025–2026. Hành trình FIRST Global tiếp tục.",
    nguon:
      "Video kênh MakerViet đăng 7/3/2025 và 25/12/2025 · thư mục FGC 2024, FGC 2025, lưu trữ Google Drive",
  },
  {
    moc: "2026",
    nam: 2026,
    tieuDe: "Ba Làng Maker mở cửa",
    chiTiet:
      "190 Xã Đàn và 29 Dương Khuê ở Hà Nội, FPT Shop Quang Trung ở Thanh Hoá. Điều viết ra năm 2017 bắt đầu có địa chỉ.",
    nguon: "Dữ liệu Maker Hub của chính website này (lib/content/hubs.ts)",
  },
];
