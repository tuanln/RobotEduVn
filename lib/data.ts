import { StageInfo, VideoItem, Article, MakerHub } from "./types";

export const STAGES: StageInfo[] = [
  {
    slug: "kham-pha",
    title: "Discovery",
    titleVi: "Khám Phá",
    ageRange: "4-12",
    icon: "🎮",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
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
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-300",
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
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-300",
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
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
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
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    tools: ["GitHub", "AI Tools", "Cộng đồng"],
    skills: ["Làm việc nhóm", "Thuyết trình", "Mentor", "AI"],
    description:
      "Trở thành mentor, chia sẻ kiến thức, tham gia cuộc thi và xây dựng cộng đồng STEM.",
    longDescription: `Giai đoạn Chia Sẻ dành cho học sinh từ 15 đến 18 tuổi — những người đã trải qua các giai đoạn trước và sẵn sàng "trả lại" cho cộng đồng. Đây là tinh thần Social Learning — học bằng cách dạy người khác.

Mục tiêu chính: Học sinh trở thành mentor cho các bạn nhỏ hơn, tham gia các cuộc thi robot quốc gia (VSC, FARC, GreenBot) và quốc tế (FIRST Global Challenge), và xây dựng dự án thực tế phục vụ cộng đồng.

Đội tuyển Việt Nam tại FIRST Global Challenge với 50+ đại sứ Robotics là lực lượng tiên phong của giai đoạn này — những tấm gương truyền cảm hứng cho thế hệ tiếp theo.`,
    badge: "🌟",
    badgeName: "Đại Sứ STEM",
  },
];

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: "1",
    title: "GCompris — Giới thiệu phần mềm giáo dục cho trẻ em",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    stage: "kham-pha",
    ageRange: "4-12",
    tags: ["gcompris", "khám phá", "cơ bản"],
    description: "Hướng dẫn cài đặt và sử dụng GCompris cho trẻ từ 4 tuổi.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    featured: true,
    published: true,
    order: 1,
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    title: "KTurtle — Vẽ hình bằng code",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    stage: "tu-duy",
    ageRange: "8-12",
    tags: ["kturtle", "tư duy", "hình học"],
    description: "Học lập trình Logo với KTurtle — vẽ hình tam giác, hình vuông.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    featured: true,
    published: true,
    order: 2,
    createdAt: "2026-01-20",
  },
  {
    id: "3",
    title: "Python cơ bản — Bài 1: Hello World",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    stage: "lap-trinh",
    ageRange: "9-12",
    tags: ["python", "lập trình", "cơ bản"],
    description: "Bài học đầu tiên về Python — in ra màn hình và biến.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    featured: true,
    published: true,
    order: 3,
    createdAt: "2026-02-01",
  },
  {
    id: "4",
    title: "ThingBot — Lắp ráo robot đầu tiên",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    stage: "iot-robot",
    ageRange: "10-15",
    tags: ["thingbot", "robot", "arduino"],
    description: "Hướng dẫn lắp ráp và lập trình ThingBot cơ bản.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    featured: true,
    published: true,
    order: 4,
    createdAt: "2026-02-10",
  },
  {
    id: "5",
    title: "Dự án xe tự hành VIA — Từ ý tưởng đến thực tế",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    stage: "chia-se",
    ageRange: "15-18",
    tags: ["via", "xe tự hành", "dự án"],
    description: "Học sinh lớp 11 chia sẻ quá trình chế tạo xe tự hành VIA.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    featured: false,
    published: true,
    order: 5,
    createdAt: "2026-02-15",
  },
  {
    id: "6",
    title: "NEO One — Máy tính giáo dục Made in Vietnam",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    stage: "iot-robot",
    ageRange: "10-15",
    tags: ["neo-one", "máy tính", "giáo dục"],
    description: "Giới thiệu NEO One và cách sử dụng trong giáo dục STEM.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    featured: false,
    published: true,
    order: 6,
    createdAt: "2026-02-20",
  },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Dự án xe tự hành VIA của học sinh lớp 9 Hà Nội",
    slug: "du-an-via-hoc-sinh-lop-9",
    category: "du-an",
    content:
      "Nhóm học sinh 3 bạn lớp 9 trường THCS Nguyễn Trãi đã hoàn thành dự án xe tự hành VIA sau 3 tháng. Xe có thể tự nhận diện làn đường và tránh vật cản...",
    excerpt:
      "Nhóm học sinh lớp 9 Hà Nội hoàn thành dự án xe tự hành VIA sau 3 tháng tự học và chế tạo.",
    coverImage: "/images/placeholder-project.jpg",
    author: "MakerViet",
    tags: ["via", "xe tự hành", "dự án", "hà nội"],
    published: true,
    publishDate: "2026-02-15",
  },
  {
    id: "2",
    title: "OpenSTEM Day tại FPT Shop Q1 — 200 học sinh tham gia",
    slug: "openstem-day-fpt-shop-q1",
    category: "tin-tuc",
    content:
      "Sự kiện OpenSTEM Day đầu tiên tại FPT Shop Q1 TP.HCM đã thu hút 200 học sinh và phụ huynh. Các bạn được trải nghiệm lập trình Python, điều khiển ThingBot...",
    excerpt:
      "Sự kiện OpenSTEM Day đầu tiên tại TP.HCM thu hút 200 học sinh trải nghiệm STEM & Robot.",
    coverImage: "/images/placeholder-event.jpg",
    author: "OpenSTEM",
    tags: ["openstem-day", "sự kiện", "tphcm"],
    published: true,
    publishDate: "2026-03-01",
  },
  {
    id: "3",
    title: "Hướng dẫn bắt đầu với GCompris cho phụ huynh",
    slug: "huong-dan-gcompris-phu-huynh",
    category: "huong-dan",
    content:
      "GCompris là phần mềm giáo dục mã nguồn mở với hơn 200 hoạt động cho trẻ từ 4 tuổi. Bài viết này hướng dẫn phụ huynh cách cài đặt và sử dụng GCompris tại nhà...",
    excerpt: "Hướng dẫn chi tiết cách cài đặt và sử dụng GCompris cho trẻ em tại nhà.",
    coverImage: "/images/placeholder-guide.jpg",
    author: "ThingEdu",
    tags: ["gcompris", "hướng dẫn", "phụ huynh"],
    published: true,
    publishDate: "2026-02-20",
  },
];

export const MOCK_HUBS: MakerHub[] = [
  {
    id: "hub-hcm-01",
    name: "Maker Hub FPT Shop Quận 1",
    type: "fpt-shop",
    address: "123 Lê Lai, Quận 1, TP.HCM",
    lat: 10.7769,
    lng: 106.7009,
    mentors: ["Nguyễn Văn A", "Trần Thị B"],
    schedule: "T7 9-11h: Khám phá (4-8 tuổi) | CN 14-16h: CLB Robotics (10-15 tuổi)",
    equipment: ["ThingBot", "NEO One", "K12 Maker"],
    contact: "hub-q1@openstem.vn",
    active: true,
  },
  {
    id: "hub-hcm-02",
    name: "Maker Hub FPT Shop Quận 7",
    type: "fpt-shop",
    address: "456 Nguyễn Thị Thập, Quận 7, TP.HCM",
    lat: 10.7372,
    lng: 106.7219,
    mentors: ["Lê Văn C"],
    schedule: "T7 14-16h: Lập trình Python (9-12 tuổi)",
    equipment: ["ThingBot", "NEO One"],
    contact: "hub-q7@openstem.vn",
    active: true,
  },
  {
    id: "hub-hn-01",
    name: "Maker Hub Hà Nội — Cầu Giấy",
    type: "fpt-shop",
    address: "789 Xuân Thủy, Cầu Giấy, Hà Nội",
    lat: 21.0378,
    lng: 105.7822,
    mentors: ["Phạm Văn D", "Hoàng Thị E"],
    schedule: "T7 9-11h: Khám phá | CN 9-11h: Robot | CN 14-16h: Python",
    equipment: ["ThingBot", "NEO One", "K12 Maker", "VIA"],
    contact: "hub-hn@openstem.vn",
    active: true,
  },
  {
    id: "hub-dn-01",
    name: "CLB Robotics Đà Nẵng",
    type: "clb",
    address: "12 Bạch Đằng, Hải Châu, Đà Nẵng",
    lat: 16.0544,
    lng: 108.2022,
    mentors: ["Võ Văn F"],
    schedule: "CN 9-11h: CLB Robotics (10-15 tuổi)",
    equipment: ["ThingBot", "Arduino Kit"],
    contact: "clb-dn@openstem.vn",
    active: true,
  },
  {
    id: "hub-ct-01",
    name: "Maker Hub Cần Thơ",
    type: "fpt-shop",
    address: "34 Trần Hưng Đạo, Ninh Kiều, Cần Thơ",
    lat: 10.0341,
    lng: 105.7676,
    mentors: ["Đặng Văn G"],
    schedule: "T7 14-16h: Khám phá và Lập trình",
    equipment: ["ThingBot", "NEO One"],
    contact: "hub-ct@openstem.vn",
    active: true,
  },
];

export const NAV_ITEMS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Hành Trình Học", href: "/hanh-trinh" },
  { label: "Công Cụ & Thiết Bị", href: "/cong-cu" },
  { label: "Maker Hub", href: "/cong-dong/maker-hub" },
  { label: "Triết Lý Papert", href: "/triet-ly" },
  { label: "Cho Mentor", href: "/cho-mentor" },
  { label: "Video Hub", href: "/video-hub" },
  { label: "Cộng Đồng", href: "/cong-dong" },
];
