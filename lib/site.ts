/** Thông tin định danh site — dùng chung cho metadata, JSON-LD và ảnh OG. */
export const SITE = {
  name: "Robot.Edu.VN",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://robot.edu.vn",
  tagline: "Giáo Dục STEM & Robot Mở",
  description:
    "Nền tảng giáo dục STEM & Robot mở cho trẻ em Việt Nam. Học đi đôi với Làm — lộ trình 5 giai đoạn từ 4 đến 18 tuổi theo triết lý Seymour Papert.",
  email: "lang@makerviet.org",
  founders: ["MakerViet", "ThingEdu", "Rogo"],
  social: [
    "https://youtube.com/@makerviet",
    "https://github.com/makerviet",
    "https://facebook.com/groups/binhdanhocSTEM",
  ],
} as const;
