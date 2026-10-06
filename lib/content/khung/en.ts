import type { KhungContent } from "./types";

/**
 * Khung trang, bản tiếng Anh. Link ngoài (`href`) giữ y nguyên bản tiếng
 * Việt — địa chỉ không phải văn. Tên nhóm Facebook là tên riêng.
 */
export const KHUNG_EN: KhungContent = {
  site: {
    tagline: "Open STEM & Robotics Education",
    description:
      "An open STEM and robotics platform for Vietnamese children. Learning by making — a three-beat loop of Play, Make, Share for ages 4 to 18, rooted in Seymour Papert’s thinking.",
  },
  skipLink: "Skip to main content",
  footer: {
    gioiThieu:
      "An open STEM and robotics platform for Vietnamese children. Learning goes hand in hand with making — every child is a maker.",
    khoiXuong: "Started by",
    cot: [
      {
        tieuDe: "Explore",
        links: [
          { label: "Làng Maker (the Maker Village)", route: "makerVillage" },
          { label: "How We Learn", route: "howWeLearn" },
          { label: "Papert’s Philosophy", route: "philosophy" },
          { label: "Tools & Kit", route: "tools" },
          { label: "Video Hub", route: "videos" },
        ],
      },
      {
        tieuDe: "For Teachers",
        links: [
          { label: "Curriculum Materials", route: "forMentors" },
          { label: "Mentor Community", route: "community" },
          { label: "Open a Maker Hub", route: "makerHubs" },
        ],
      },
      {
        tieuDe: "Connect",
        links: [
          {
            label: "Email: lang@makerviet.org",
            href: "mailto:lang@makerviet.org",
          },
          {
            label: "Facebook: Bình dân học STEM (our parents’ group)",
            href: "https://facebook.com/groups/binhdanhocSTEM",
          },
          { label: "GitHub: MakerViet", href: "https://github.com/makerviet" },
          { label: "YouTube: MakerViet", href: "https://youtube.com/@makerviet" },
        ],
      },
    ],
    banQuyen: ". Open source — open education.",
    mucTieu: "Goal: one million Vietnamese children reaching STEM & robotics",
  },
  chat: {
    ten: "Neo Trẻ AI",
    phuDe: "Your STEM assistant",
    chao: "Hi! I’m Neo Trẻ AI 🤖",
    moiHoi:
      "Ask me anything about STEM, robots, how learning works at Làng Maker, or the maker community.",
    goiYTieuDe: "Try asking:",
    goiY: [
      "My child is 8 — where do we start?",
      "Where is the nearest Maker Hub?",
      "How do we sign up for STEM sessions?",
      "What is Làng Maker’s philosophy of learning?",
    ],
    dangNghi: "Thinking…",
    loiKetNoi:
      "Sorry, the connection failed. Please try again or write to lang@makerviet.org.",
    placeholder: "Type your question…",
    moChat: "Open chat",
    dongChat: "Close chat",
    gui: "Send",
  },
  theme: {
    sangSang: "Switch to light theme",
    sangToi: "Switch to dark theme",
  },
  menu: { mo: "Open menu", dong: "Close menu" },
  chuyenSang: "Switch to",
};
