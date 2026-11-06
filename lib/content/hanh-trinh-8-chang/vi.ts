import type { HanhTrinhContent } from "./types";

/**
 * Nguồn: bộ slide "Hành trình Người Làng Maker" (14 trang, 11/2026), ảnh
 * "Hành Trình 8 Chặng", trao đổi với anh Tuấn 05–07/11/2026. Số liệu FGC
 * lấy từ bài tổng kết trên fanpage Team Vietnam - FIRST Global ngày
 * 03/11/2025. Số thứ tự chặng theo danh sách ở slide 4.
 */
export const HANH_TRINH_VI: HanhTrinhContent = {
  meta: {
    title: "Hành Trình 8 Chặng Ở Làng Maker",
    description:
      "Con đường tự vọc robot từ 6 tuổi: tám chặng theo bốn giai đoạn cây tre, ba mảng Điện tử, Robotics, AI, và vì sao Làng học theo cách của Seymour Papert.",
  },
  tieuDe: "Hành Trình Người Làng Maker",
  phuDe: "Từ khách ghé chơi tới Thợ Cả quay về dẫn đội. Robot chỉ là phương tiện; thứ lớn lên là đứa trẻ.",
  langNghe: {
    tieuDe: "Một làng nghề công nghệ",
    doan: [
      "Làng gốm có bí kíp pha men, làng dệt có bí kíp nhuộm. Làng Maker cũng là một làng nghề, chỉ khác là bí kíp được chia sẻ mã nguồn mở cho mọi người. Già Làng giữ nếp, Thợ Cả làm cùng, Thợ Học Việc đứng cạnh nhìn rồi tự tay làm.",
      "Ở đây không có bài giảng. Trẻ bước vào xưởng, cầm robot lên và bắt đầu. Kiến thức không được rót vào đầu, mà do chính em dựng lên khi chế tạo, thử, hỏng, và sửa.",
    ],
  },
  chuKy: {
    tieuDe: "Chu kỳ 7 + 1",
    moTa:
      "Mỗi chu kỳ tám buổi. Bảy buổi đầu là Xưởng: chơi và làm. Buổi thứ tám là Chợ Phiên: em mang sản phẩm ra trình diễn cho phụ huynh và các bạn. Đó là lý do phụ huynh được mời tới buổi 8, và là nhịp Chia sẻ của vòng lặp.",
  },
  conMayTuoi: {
    tieuDe: "Con mấy tuổi?",
    phuDe: "Chọn quãng tuổi của con để thấy chỗ bắt đầu, và con sẽ lớn lên thế nào ở chặng đó.",
  },
  giaiDoan: [
    {
      ma: "gieo-hat",
      ten: "Gieo hạt",
      tuoi: "6–8 tuổi",
      lonLen: "Dám chạm, dám thử, không sợ sai.",
      doNghe: [
        "Máy tính NEO One với GCompris tiếng Việt",
        "Trò chơi camera và giọng nói trên NEO",
        "Bài 1 trên trang Mô phỏng, không cần robot",
      ],
      link: { label: "Thử mô phỏng ngay", href: "/mo-phong" },
      anh: "A2",
    },
    {
      ma: "vuon-canh",
      ten: "Vươn cành",
      tuoi: "8–11 tuổi",
      lonLen: "Biết tự sửa lỗi, kiên trì tới khi robot chạy.",
      doNghe: [
        "ThingBot và lập trình khối ThingBlock",
        "micro:bit với MakeCode",
        "Tinkercad: vẽ 3D vật mình cần",
      ],
      link: { label: "Học khóa ThingBlock", href: "/khoa-hoc/thingedu/thingblock" },
      anh: "A1",
    },
    {
      ma: "ket-trai",
      ten: "Kết trái",
      tuoi: "11–14 tuổi",
      lonLen: "Làm dự án thật, làm việc nhóm, đi thi lần đầu.",
      doNghe: [
        "ThingBot với cảm biến, tay cầm PS2",
        "Tinkercad Circuits, App Inventor làm app điều khiển robot",
        "FanRoc và dự án kiểu BlueSilk",
      ],
      link: { label: "Xem sân chơi", href: "/san-choi" },
      anh: "F1",
    },
    {
      ma: "rung-ve-coi",
      ten: "Rụng về cội",
      tuoi: "14–18 tuổi",
      lonLen: "Dẫn dắt, dạy lại em nhỏ, mang màu cờ ra sân quốc tế.",
      doNghe: [
        "Mạch VIA và bộ K12 Maker, Arduino C",
        "Sách điện tử VIA về xe tự hành và AI",
        "FTC, FIRST Global, NASA Space Apps",
      ],
      link: { label: "Khóa Maker Việt", href: "/khoa-hoc/maker-viet" },
      anh: "G1",
    },
  ],
  tamChang: {
    tieuDe: "Tám chặng, bốn giai đoạn của cây tre",
    phuDe: "Không ai phải leo hết. Mỗi chặng là một chỗ đứng có thật trong Làng, với việc để làm và dấu mốc để nhận ra.",
  },
  chang: [
    {
      so: 1,
      giaiDoan: "gieo-hat",
      ten: "Khách Làng",
      ai: "Mọi đứa trẻ bước vào Làng lần đầu, từ 4 tuổi",
      lamGi: "Giờ lập trình miễn phí, lái robot vượt mê cung, chơi game camera bằng cả người",
      datDuoc: "Không sợ máy. Biết robot là thứ mình điều khiển được",
      dauMoc: "Giấy phép lái Robot",
      baMang: {
        dienTu: "Bấm nút, thấy đèn sáng, còi kêu",
        robotics: "Lái robot qua mê cung",
        ai: "Nói “tiến lên”, robot chạy",
      },
    },
    {
      so: 2,
      giaiDoan: "gieo-hat",
      ten: "Thợ Học Việc",
      ai: "6–10 tuổi, đã chọn một thứ muốn làm",
      lamGi: "Lắp xe ben, xe cẩu BlockBot; lập trình khối trên ThingBlock và trang Mô phỏng",
      datDuoc: "Tự tay hỏng, tự tay sửa. Đọc được một chương trình khối",
      dauMoc: "Cấp 1 PLAY",
      baMang: {
        dienTu: "Cắm động cơ, servo đúng cổng",
        robotics: "Xe hai bánh chạy theo chương trình của em",
        ai: "Dạy máy nhận ra cử chỉ tay trong game camera",
      },
    },
    {
      so: 3,
      giaiDoan: "vuon-canh",
      ten: "Đấu Thủ Làng",
      ai: "9–14 tuổi, thích thi đấu",
      lamGi: "Robot Sport hằng tuần, chuẩn bị FanRoc với tay cầm PS2",
      datDuoc: "Sửa dây, thay pin dưới áp lực. Thua rồi sửa rồi thắng",
      dauMoc: "Đội thi đầu tiên",
      baMang: {
        dienTu: "Cảm biến siêu âm, pin, dây dẫn",
        robotics: "Robot thi đấu điều khiển bằng tay cầm",
        ai: "Thử chiến thuật trên sân mô phỏng",
      },
    },
    {
      so: 4,
      giaiDoan: "vuon-canh",
      ten: "Đại Sứ Dế STEM",
      ai: "10–14 tuổi, muốn làm thứ của riêng mình",
      lamGi: "Xưởng DIY, in 3D, trợ giảng cho Khách Làng",
      datDuoc: "Có dự án mang tên mình. Giải thích được cho em nhỏ hơn",
      dauMoc: "Cấp 2 MAKE",
      baMang: {
        dienTu: "Thiết kế mạch cảm biến cho dự án",
        robotics: "In 3D, lắp cơ cấu mình vẽ ra",
        ai: "Dùng agent AI để làm game: em mô tả luật, máy viết mã, em thử và sửa. Em vẫn là người thiết kế",
      },
    },
    {
      so: 5,
      giaiDoan: "ket-trai",
      ten: "Thợ Chế Tác",
      ai: "14–18 tuổi",
      lamGi: "Phác thảo, mô phỏng, gia công, lập trình, thử. Workshop ở tỉnh, dự án kiểu BlueSilk",
      datDuoc: "Đi trọn một vòng từ ý tưởng tới sản phẩm chạy được",
      dauMoc: "Cấp 3 KNOW & SHARE",
      baMang: {
        dienTu: "Hệ điện của xe tự hành",
        robotics: "Xe tự hành VIA: camera nhìn làn đường",
        ai: "Tự dựng trợ lý giọng nói điều khiển robot",
      },
    },
    {
      so: 6,
      giaiDoan: "ket-trai",
      ten: "Đội Tuyển Việt Nam",
      ai: "Đấu Thủ và Đại Sứ xuất sắc",
      lamGi: "FIRST Global Challenge, FTC Việt Nam",
      datDuoc: "Thi đấu hết mình, tôn trọng đối thủ. Đại diện một quốc gia",
      dauMoc: "Màu cờ trên áo",
      baMang: {
        dienTu: "Robot thi quốc tế",
        robotics: "Chiến thuật liên minh ba đội",
        ai: "Phân tích dữ liệu trận đấu",
      },
    },
    {
      so: 7,
      giaiDoan: "rung-ve-coi",
      ten: "Thợ Cả",
      ai: "Sinh viên, cựu Đại Sứ và cựu tuyển thủ",
      lamGi: "Huấn luyện đội thi, làm Tech-Tutor, dẫn buổi học",
      datDuoc: "Kèm được người khác. Không giảng bài, mà làm cùng",
      dauMoc: "Dẫn một chu kỳ 7 + 1 trọn vẹn",
      baMang: {
        dienTu: "Tạo bộ kit mới: ThingBot, VIA",
        robotics: "Huấn luyện đội thi",
        ai: "Góp mã nguồn mở cho công cụ AI của Làng",
      },
    },
    {
      so: 8,
      giaiDoan: "rung-ve-coi",
      ten: "Già Làng",
      ai: "Người đã đi hết vòng và ở lại",
      lamGi: "Giữ triết lý, định hướng, chứng nhận tay nghề",
      datDuoc: "Làng có thêm một người giữ nếp",
      dauMoc: "Một Thợ Cả do mình dẫn, từng là Khách Làng",
      baMang: {
        dienTu: "Chọn đồ nghề cho thế hệ sau",
        robotics: "Mở Làng mới",
        ai: "Quyết định AI được dùng tới đâu trong Làng",
      },
    },
  ],
  camKet: {
    tieuDe: "Cam kết 4 : 1",
    moTa:
      "Ai được học ở Làng thì chia sẻ lại cho bốn người. Không phải nghĩa vụ, mà là cách Làng lớn lên: Khách Làng hôm nay là Thợ Cả của ngày mai.",
  },
  viSao: {
    tieuDe: "Vì sao học thế này",
    moTa:
      "Làng học theo cách Seymour Papert (MIT) viết trong Mindstorms: trẻ học sâu nhất khi tự làm ra thứ mình thích, và robot là một “vật để nghĩ cùng”. Năm nguyên tắc dưới đây không phải lý thuyết, mà là năm cảnh thấy mỗi tuần ở Làng.",
    nguyenTac: [
      {
        ten: "Xưởng trước, lớp sau",
        canh: "Bé 6 tuổi được cầm NEO One và lái ThingBot ngay buổi đầu. Không ai giảng trước. Câu hỏi đến sau khi tay đã chạm.",
      },
      {
        ten: "Niềm vui khó",
        canh: "Robot chạy lệch thì con tự chỉnh tốc độ hai bánh. Buồng tằm BlueSilk nóng quá thì con sửa ngưỡng bật rơ-le. Khó, nhưng là cái khó con muốn vượt.",
      },
      {
        ten: "Sàn thấp, trần cao, tường rộng",
        canh: "Cùng một ThingBot: 6 tuổi bấm nút, 10 tuổi lập trình khối, 15 tuổi viết Arduino. Robot vừa đi thi, vừa nuôi tằm, vừa canh nhà.",
      },
      {
        ten: "Không làm hộ",
        canh: "Mentor hỏi “con thử gì rồi?” thay vì cầm tua vít. Phụ huynh ngồi xa một chút. Dùng AI để làm game vẫn được, nhưng con là người thiết kế và là người kiểm tra khi máy sai.",
      },
      {
        ten: "Học bằng cách dạy",
        canh: "Buổi 8 là Chợ Phiên: em kể lại cho phụ huynh và các bạn. Đội tuyển FIRST Global về Làng dạy lại các em nhỏ.",
      },
    ],
    nenTang: "Cách làm này học từ FabLab của MIT, cộng đồng Arduino và các cuộc thi FIRST.",
    docThem: "Đọc sâu hơn về ba trụ cột triết lý",
  },
  chuyenThat: {
    tieuDe: "Chuyện thật",
    phuDe: "Hai dẫn chứng từ chính Làng, để phụ huynh thấy con đường này đi được tới đâu.",
    ds: [
      {
        ma: "bluesilk",
        tieuDe: "BlueSilk: buồng nuôi tằm do các con làm",
        doan: [
          "Từ bài toán của một làng tằm, các em dựng buồng nuôi có cảm biến nhiệt độ và độ ẩm, rơ-le bật quạt, servo mở cửa. Mạch do các em cắm, ngưỡng do các em chọn, và khi tằm ốm thì chính các em đọc số liệu để sửa.",
          "Sản phẩm có cả bản web game và bản 3D để bạn nào chưa cầm mạch cũng chơi được. Đó là nhịp Chia sẻ: thứ làm ở Làng được mang ra ngoài cho người khác dùng.",
        ],
        anh: ["F1"],
        nguon: "Dự án BlueSilk của Làng Maker, bản web công khai tại bluesilk-vr.vercel.app (29/09/2026)",
      },
      {
        ma: "team-vietnam-fgc",
        tieuDe: "Team Vietnam FIRST Global: từ Làng ra sân thế giới",
        doan: [
          "Đội tuyển Việt Nam tại FIRST Global Challenge 2025 ở Panama về nước với Huy chương Bạc Jackie Bezos Award, Top 12 chung cuộc, Storytelling Award và Social Media Award. Năm trước đó, đội thi ở Athens.",
          "Điều Làng tự hào hơn thành tích: các em đặt “chuyên nghiệp, tử tế” lên đầu, và về nước thì tới Hope School dạy lại các em nhỏ. Đó chính là chặng Rụng về cội.",
        ],
        anh: ["G1", "G2", "G3"],
        nguon: "Fanpage Team Vietnam - FIRST Global, bài tổng kết FGC 2025 ngày 03/11/2025; album FGC 2024 Athens và Team Vietnam × Hope School",
      },
    ],
  },
  bePhong: {
    tieuDe: "Bệ phóng cho con, nhìn từ lớp lớn",
    y: [
      "Sổ Maker ghi lại từng dự án, từng chặng con đã qua: một hồ sơ thật, không phải điểm số.",
      "Thành tích quốc tế là có thật, nhưng chỉ là một trong nhiều cửa ra.",
      "Kỹ năng ở lại: tư duy hệ thống, chia việc lớn thành bước nhỏ, gỡ lỗi, làm việc nhóm, kể lại cho người khác hiểu, và dùng AI như một đồ nghề.",
      "Sự trở về: người đi xa nhất là người quay về dẫn đội tiếp theo.",
    ],
  },
  nhan: {
    conLonLen: "Con lớn lên thế nào",
    doNghe: "Đồ nghề",
    ai: "Ai",
    lamGi: "Làm gì",
    datDuoc: "Đạt được",
    dauMoc: "Dấu mốc",
    baMang: { dienTu: "Điện tử", robotics: "Robotics", ai: "AI" },
    nguon: "Nguồn",
    chang: "Chặng",
  },
};
