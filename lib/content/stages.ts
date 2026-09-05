import { StageInfo } from "@/lib/types";

/**
 * Năm giai đoạn của hành trình học — nội dung biên tập, không phải dữ liệu vận hành.
 * Nguồn: triết lý Constructionism (Seymour Papert) + lộ trình công cụ mở của MakerViet.
 */
export const STAGES: StageInfo[] = [
  {
    slug: "kham-pha",
    title: "Discovery",
    titleVi: "Khám Phá",
    ageRange: "4-12",
    icon: "🎮",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    borderColor: "border-amber-300 dark:border-amber-500/30",
    tools: ["GCompris"],
    skills: ["Làm quen máy tính", "Tư duy logic cơ bản", "Sáng tạo"],
    description:
      "Bắt đầu hành trình STEM với 200+ hoạt động vui nhộn trên GCompris. Trẻ làm quen công nghệ qua trò chơi giáo dục.",
    longDescription: `Giai đoạn Khám Phá là bước đầu tiên trong hành trình STEM, dành cho trẻ từ 4 đến 12 tuổi. Sử dụng phần mềm GCompris (mã nguồn mở), trẻ được trải nghiệm hơn 200 hoạt động giáo dục đa dạng: từ puzzle, trò chơi logic, đến làm quen với bàn phím và chuột.

Mục tiêu chính: Giúp trẻ yêu thích công nghệ, tự tin sử dụng máy tính, và phát triển tư duy logic cơ bản thông qua việc chơi mà học.

Phương pháp: Học qua trải nghiệm (Experiential Learning) — trẻ tự khám phá, thử sai, và rút ra bài học. Không có áp lực điểm số, chỉ có niềm vui khám phá.`,
    badge: "🔍",
    badgeName: "Nhà Khám Phá",
  },
  {
    slug: "tu-duy",
    title: "Thinking",
    titleVi: "Tư Duy",
    ageRange: "8-12",
    icon: "🐢",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-500/10",
    borderColor: "border-violet-300 dark:border-violet-500/30",
    tools: ["KTurtle"],
    skills: ["Tư duy hình học", "Lệnh điều khiển", "Lập trình trực quan"],
    description:
      "Phát triển tư duy logic với KTurtle — điều khiển chú rùa vẽ hình bằng code. Trẻ học cách suy nghĩ có hệ thống.",
    longDescription: `Giai đoạn Tư Duy giúp trẻ từ 8 đến 12 tuổi chuyển từ khám phá sang tư duy có hệ thống. Sử dụng KTurtle (Logo programming), trẻ học cách điều khiển chú rùa vẽ hình trên màn hình bằng các lệnh đơn giản.

Mục tiêu chính: Phát triển tư duy tuần tự, hiểu khái niệm góc, khoảng cách, vòng lặp. Trẻ bắt đầu "nghĩ như lập trình viên" — chia bài toán lớn thành các bước nhỏ.

Phương pháp: Constructionism (Seymour Papert) — trẻ xây dựng kiến thức thông qua việc tạo ra sản phẩm (hình vẽ) có thể nhìn thấy và chia sẻ.`,
    badge: "🧠",
    badgeName: "Nhà Tư Duy",
  },
  {
    slug: "lap-trinh",
    title: "Programming",
    titleVi: "Lập Trình",
    ageRange: "9-12",
    icon: "🐍",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "border-emerald-300 dark:border-emerald-500/30",
    tools: ["Python"],
    skills: ["Lập trình thực sự", "Biến & Hàm", "Đệ quy", "OOP cơ bản"],
    description:
      "Học lập trình Python thực sự — từ biến, hàm, đến đệ quy. Trẻ có thể viết chương trình độc lập.",
    longDescription: `Giai đoạn Lập Trình đưa trẻ từ 9 đến 12 tuổi vào thế giới lập trình thực sự với Python — ngôn ngữ lập trình phổ biến nhất thế giới. Từ những dòng code đầu tiên, trẻ dần dần làm chủ các khái niệm: biến, hàm, vòng lặp, điều kiện, và đệ quy.

Mục tiêu chính: Trẻ có thể tự viết chương trình hoàn chỉnh, giải quyết bài toán thực tế, và hiểu cách máy tính "suy nghĩ".

Phương pháp: Project-based Learning — mỗi bài học gắn với một dự án cụ thể (trò chơi, máy tính, ứng dụng) để trẻ thấy ý nghĩa của việc học lập trình.`,
    badge: "💻",
    badgeName: "Lập Trình Viên Nhí",
  },
  {
    slug: "iot-robot",
    title: "IoT & Robot",
    titleVi: "IoT & Robot",
    ageRange: "10-15",
    icon: "🤖",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-500/10",
    borderColor: "border-red-300 dark:border-red-500/30",
    tools: ["ThingBot", "Arduino", "NEO One"],
    skills: ["Lập trình nhúng", "Điện tử cơ bản", "Cơ khí", "IoT"],
    description:
      "Từ màn hình ra thế giới thực — lập trình robot, cảm biến, và các dự án IoT với ThingBot và Arduino.",
    longDescription: `Giai đoạn IoT & Robot đưa trẻ từ 10 đến 15 tuổi từ thế giới ảo sang thế giới thực. Sử dụng ThingBot (robot giáo dục Made in Vietnam), Arduino, và NEO One, trẻ học cách lập trình điều khiển thiết bị vật lý: motor, đèn LED, cảm biến, và robot.

Mục tiêu chính: Trẻ tạo được sản phẩm vật lý hoạt động — từ xe điều khiển, robot tránh vật cản, đến hệ thống IoT thông minh. Đây là lúc "code thành thực" — thấy kết quả ngay trước mắt.

Sản phẩm Made in Vietnam: ThingBot (Rogo), NEO One (ThingEdu), K12 Maker — tất cả được phát triển bởi cộng đồng Maker Việt, đảm bảo giá cả hợp lý và phù hợp với học sinh Việt Nam.`,
    badge: "🤖",
    badgeName: "Kỹ Sư Robot",
  },
  {
    slug: "chia-se",
    title: "Sharing",
    titleVi: "Chia Sẻ",
    ageRange: "15-18",
    icon: "👥",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "border-blue-300 dark:border-blue-500/30",
    tools: ["GitHub", "AI Tools", "Cộng đồng"],
    skills: ["Làm việc nhóm", "Thuyết trình", "Mentor", "AI"],
    description:
      "Trở thành mentor, chia sẻ kiến thức, tham gia cuộc thi và xây dựng cộng đồng STEM.",
    longDescription: `Giai đoạn Chia Sẻ dành cho học sinh từ 15 đến 18 tuổi — những người đã trải qua các giai đoạn trước và sẵn sàng "trả lại" cho cộng đồng. Đây là tinh thần Social Learning — học bằng cách dạy người khác.

Mục tiêu chính: Học sinh trở thành mentor cho các bạn nhỏ hơn, tham gia các cuộc thi robot quốc gia (VSC, FARC, GreenBot) và quốc tế (FIRST Global Challenge), và xây dựng dự án thực tế phục vụ cộng đồng.

Đội tuyển Việt Nam tại FIRST Global Challenge và chương trình Đại sứ Robotics Việt Nam là lực lượng tiên phong của giai đoạn này — những tấm gương truyền cảm hứng cho thế hệ tiếp theo.`,
    badge: "🌟",
    badgeName: "Đại Sứ STEM",
  },
];
