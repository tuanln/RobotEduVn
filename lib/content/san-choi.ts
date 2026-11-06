/**
 * Sân chơi: các cuộc thi để mang sản phẩm từ Làng ra ngoài (spec 2026-11-06
 * mục 3b, 10.3). Chỉ có bản tiếng Việt.
 *
 * QUY TẮC (như lang-maker.ts): mỗi sân chơi BẮT BUỘC có `nguon` và `link` đã
 * kiểm tra. Không ghi ngày của mùa tới khi ban tổ chức chưa công bố; chỉ ghi
 * "thường diễn ra" theo mùa gần nhất. Mentor thêm sân chơi mới bằng cách góp
 * một mục vào mảng này, không cần sửa giao diện.
 *
 * Mức hợp triết lý Làng, ba tiêu chí: học sinh tự làm (có luật chống làm hộ)
 * · bài toán mở từ đời thật · đề cao chia sẻ, hợp tác.
 */

export type MucHop = "rat-hop" | "hop" | "de-sau";

export interface SanChoi {
  ma: string;
  ten: string;
  tenDayDu: string;
  dang: string;
  aiDu: string;
  thoiGian: string;
  /** Chặng nên tới, theo 8 chặng. */
  chang: string;
  chuanBi: string;
  mucHop: MucHop;
  viSaoHop: string;
  link: string;
  nguon: string;
}

export const MUC_HOP: Record<MucHop, { ten: string; moTa: string }> = {
  "rat-hop": {
    ten: "Rất hợp",
    moTa: "Học sinh tự làm, đề mở, chấm cả cách chia sẻ.",
  },
  hop: {
    ten: "Hợp, nếu giữ “không làm hộ”",
    moTa: "Nhiệm vụ cố định hoặc dễ bị người lớn làm thay. Đi được, nhưng mentor phải lùi lại.",
  },
  "de-sau": {
    ten: "Để sau",
    moTa: "Dành cho sinh viên, hoặc là chỗ Thợ Cả quay về huấn luyện.",
  },
};

export const SAN_CHOI: SanChoi[] = [
  {
    ma: "fanroc",
    ten: "FanRoc",
    tenDayDu: "FPT Schools AI & Robotics Challenge",
    dang: "Robot thi đấu + AI",
    aiDu: "Học sinh phổ thông toàn quốc",
    thoiGian: "Phát động tháng 11, chung kết tháng 3. Mùa 2025–26 có hơn 1.700 đội",
    chang: "3. Đấu Thủ Làng",
    chuanBi: "ThingBot, ThingBlock, tay cầm PS2, sân mô phỏng",
    mucHop: "rat-hop",
    viSaoHop: "Cửa vào: đội nhỏ, luật rõ, mọi em ở Làng đều có thể tới. Robot là của em, không phải của thầy.",
    link: "https://en.baogialai.com.vn/fanroc-2025-2026-finals-in-gia-lai-award-13-prizes-select-teams-for-national-round-post1678.amp",
    nguon: "Báo Gia Lai, bài về chung kết FanRoc 2025–2026 (kiểm 06/11/2026)",
  },
  {
    ma: "fgc",
    ten: "FIRST Global Challenge",
    tenDayDu: "FIRST Global Challenge, Olympic robot",
    dang: "Olympic robot, một đội mỗi quốc gia",
    aiDu: "Học sinh THPT, chọn vào Đội tuyển Việt Nam",
    thoiGian: "Mỗi năm một kỳ. 2025 ở Panama, 2024 ở Athens",
    chang: "6. Đội Tuyển Việt Nam",
    chuanBi: "Toàn bộ chặng 3–5, sổ kỹ thuật, kể chuyện bằng mạng xã hội",
    mucHop: "rat-hop",
    viSaoHop: "Tinh thần Gracious Professionalism: thi đấu hết mình nhưng tôn trọng đối thủ. Sổ kỹ thuật do học sinh tự viết.",
    link: "https://first.global/2025-nations/vietnam-2025/",
    nguon: "first.global, trang Vietnam 2025; fanpage Team Vietnam - FIRST Global, bài tổng kết 03/11/2025",
  },
  {
    ma: "ftc",
    ten: "FTC Vietnam",
    tenDayDu: "FIRST Tech Challenge Vietnam",
    dang: "Robot đối kháng theo mùa, tinh thần FIRST",
    aiDu: "Lớp 7–12",
    thoiGian: "Giải quốc gia khoảng tháng 1–2",
    chang: "5. Thợ Chế Tác",
    chuanBi: "Thiết kế, gia công, lập trình, sổ kỹ thuật",
    mucHop: "rat-hop",
    viSaoHop: "Cùng tinh thần FIRST như FGC; giải thưởng không chỉ dành cho nhà vô địch mà cho cả cách làm.",
    link: "https://tapchicongthuong.vn/first-tech-challenge-vietnam-championship-2025--phan-thuong-khong-chi-gianh-cho-nha-vo-dich-133412.htm",
    nguon: "Tạp chí Công Thương, FTC Vietnam Championship 2025 (kiểm 06/11/2026)",
  },
  {
    ma: "nasa-space-apps",
    ten: "NASA Space Apps",
    tenDayDu: "NASA International Space Apps Challenge",
    dang: "Hackathon 48 giờ với dữ liệu mở của NASA",
    aiDu: "Mọi lứa tuổi theo đội (quy định cho người dưới 18: xem thể lệ từng điểm)",
    thoiGian: "Đầu tháng 10. Năm 2025 Việt Nam có 4 điểm: Hà Nội, TP.HCM, Đà Nẵng, Ninh Bình",
    chang: "5 → 7",
    chuanBi: "Lập trình, dùng agent AI, kể chuyện bằng dữ liệu",
    mucHop: "rat-hop",
    viSaoHop: "Bài toán mở từ dữ liệu thật của NASA; đội tự chọn đề, tự dựng, tự trình bày.",
    link: "https://www.spaceappschallenge.org/",
    nguon: "Đại biểu Nhân dân, bài về điểm Ninh Bình trên bản đồ Space Apps (kiểm 06/11/2026)",
  },
  {
    ma: "technovation",
    ten: "Technovation Girls",
    tenDayDu: "Technovation Girls",
    dang: "App hoặc công cụ AI giải bài toán cộng đồng, dành cho nữ",
    aiDu: "Học sinh nữ",
    thoiGian: "Tháng 8 tới tháng 5",
    chang: "4 → 5",
    chuanBi: "App Inventor, agent AI, thiết kế app",
    mucHop: "rat-hop",
    viSaoHop: "Làm app bằng App Inventor, đúng đồ nghề chặng 4. Đề từ cộng đồng của chính em.",
    link: "https://technovationchallenge.org/get-involved/students",
    nguon: "technovationchallenge.org, trang dành cho học sinh (kiểm 06/11/2026)",
  },
  {
    ma: "samsung-sft",
    ten: "Samsung Solve for Tomorrow",
    tenDayDu: "Samsung Solve for Tomorrow Việt Nam",
    dang: "Dự án STEM giải bài toán cộng đồng",
    aiDu: "Bảng A THCS, bảng B THPT",
    thoiGian: "Tháng 4–10",
    chang: "4. Đại Sứ (bảng A), 5. Thợ Chế Tác (bảng B)",
    chuanBi: "Dự án kiểu BlueSilk: IoT, cảm biến, AI",
    mucHop: "rat-hop",
    viSaoHop: "Dự án từ bài toán thật quanh em, giống BlueSilk. Có bảng THCS nên chặng 4 đi được.",
    link: "https://news.samsung.com/vn/khoi-dong-chuong-trinh-samsung-solve-for-tomorrow-2026-thuc-day-giao-duc-stem-gan-voi-phat-trien-xa-hoi-ben-vung",
    nguon: "Samsung Newsroom Việt Nam, khởi động mùa 2026 (kiểm 06/11/2026)",
  },
  {
    ma: "wro",
    ten: "Robotacon WRO",
    tenDayDu: "World Robot Olympiad Việt Nam",
    dang: "Robot theo nhiệm vụ; hạng Future Innovators là đề mở",
    aiDu: "Tiểu học tới THPT, chia bảng theo tuổi",
    thoiGian: "Chung kết quốc gia tháng 8 (2026: Quy Nhơn, 160 đội), sau đó thi quốc tế",
    chang: "3. Đấu Thủ Làng → 6",
    chuanBi: "Robot dò đường, lập trình nhiệm vụ",
    mucHop: "hop",
    viSaoHop: "Hạng Robomission là nhiệm vụ cố định, dễ bị luyện mẫu. Chọn hạng Future Innovators thì đề mở hơn.",
    link: "https://en.qdnd.vn/social-affairs/news/nearly-500-contestants-compete-at-robotacon-wro-2026-national-finals-594335",
    nguon: "QĐND, chung kết Robotacon WRO 2026 (kiểm 06/11/2026)",
  },
  {
    ma: "vex",
    ten: "VEX",
    tenDayDu: "VEX Robotics Competition (VIQRC dưới 15 tuổi, VRC dưới 19 tuổi)",
    dang: "Robot đối kháng theo mùa",
    aiDu: "Tiểu học, THCS, THPT",
    thoiGian: "Khai mạc giải quốc gia tháng 10, chọn đội đi giải thế giới",
    chang: "3 → 5",
    chuanBi: "Cơ khí, lái robot, sổ kỹ thuật",
    mucHop: "hop",
    viSaoHop: "Bộ kit chuẩn và sổ kỹ thuật là điểm tốt; nhưng chi phí kit cao, mentor cần giữ để em tự lắp.",
    link: "https://daibieunhandan.vn/14-doi-tuyen-cua-viet-nam-se-tham-du-vex-robotics-world-championship-2026-10405941.html",
    nguon: "Đại biểu Nhân dân, 14 đội Việt Nam dự VEX Worlds 2026; Tiền Phong, Robot Olympiad 2026 (kiểm 06/11/2026)",
  },
  {
    ma: "farc",
    ten: "FARC",
    tenDayDu: "FPTU AI & Robotics Challenge",
    dang: "AI + robot theo chủ đề xã hội",
    aiDu: "THPT",
    thoiGian: "Mùa 2025: tháng 5–8, chủ đề nông nghiệp bền vững",
    chang: "5. Thợ Chế Tác",
    chuanBi: "Robot có AI, camera",
    mucHop: "hop",
    viSaoHop: "Chủ đề xã hội tốt, nhưng mùa ngắn và theo sân cố định; hợp đội đã qua FanRoc.",
    link: "https://fpt.com/en/news/fpt-news/hang-tram-doi-thi-thpt-toan-quoc-xac-nhan-tham-chien-fptu-ai-robotics-challenge-2025",
    nguon: "fpt.com, tin FARC 2025 (kiểm 06/11/2026)",
  },
  {
    ma: "robocon",
    ten: "Robocon Việt Nam",
    tenDayDu: "Robocon Việt Nam",
    dang: "Robot đối kháng",
    aiDu: "Sinh viên đại học",
    thoiGian: "Hằng năm",
    chang: "7. Thợ Cả (thi, hoặc quay về huấn luyện)",
    chuanBi: "Chuyển giao cho đội trẻ",
    mucHop: "de-sau",
    viSaoHop: "Sân của sinh viên. Với Làng, đây là chỗ Thợ Cả quay về dẫn đội.",
    link: "https://www.sggp.org.vn/36-doi-tranh-tai-tai-robocon-viet-nam-2026-post854518.html",
    nguon: "SGGP, 36 đội tranh tài Robocon Việt Nam 2026 (kiểm 06/11/2026)",
  },
];

/** Sơ đồ chọn theo tuổi, in ở đầu trang. */
export const CHON_THEO_TUOI: { tuoi: string; goiY: string; ma: string[] }[] = [
  { tuoi: "6–10 tuổi", goiY: "Chợ Phiên ở Làng, buổi 8 của mỗi chu kỳ. Không chấm điểm.", ma: [] },
  { tuoi: "10–14 tuổi", goiY: "Sân đầu tiên ngoài Làng.", ma: ["fanroc", "wro", "samsung-sft"] },
  { tuoi: "14–18 tuổi", goiY: "Đề mở, đội tự dựng, sổ kỹ thuật tự viết.", ma: ["ftc", "fgc", "nasa-space-apps", "technovation"] },
];

export function sanChoiTheoMuc(muc: MucHop): SanChoi[] {
  return SAN_CHOI.filter((s) => s.mucHop === muc);
}
