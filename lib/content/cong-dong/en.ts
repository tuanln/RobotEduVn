import type { CongDongContent } from "./types";

/**
 * Bốn trang Cộng Đồng, bản tiếng Anh. Tên nhóm Facebook là tên riêng —
 * giữ nguyên kèm giải thích. Địa chỉ link giống hệt bản vi.
 */
export const CONG_DONG_EN: CongDongContent = {
  tongQuan: {
    meta: {
      title: "Community",
      description:
        "The Làng Maker community — featured projects, the MakerViet Magazine, the Maker Hub network, and ways to connect around STEM.",
    },
    tieuDe: "The Làng Maker Community",
    phuDe: "Làng Maker (the Maker Village) — connect, share, grow together",
    soLieu: { hub: "Maker Hubs", tinh: "Provinces", video: "Video lessons" },
    muc: [
      {
        icon: "🚀",
        title: "Featured projects",
        desc: "STEM projects from the community: self-driving cars, robots, IoT and more.",
        route: "projects",
        color: "border-amber-500/30 bg-amber-500/5",
      },
      {
        icon: "📰",
        title: "MakerViet Magazine",
        desc: "Articles, how-tos and monthly news from the maker community.",
        route: "magazine",
        color: "border-emerald-500/30 bg-emerald-500/5",
      },
      {
        icon: "📍",
        title: "The Maker Hub network",
        desc: "Find a Maker Hub near you — at FPT Shop stores and partner venues.",
        route: "makerHubs",
        color: "border-blue-500/30 bg-blue-500/5",
      },
    ],
    ketNoi: "Connect with the community",
    linkNgoai: [
      {
        name: "Facebook: Bình Dân Học STEM & Robot",
        url: "https://facebook.com/groups/binhdanhocSTEM",
        desc: "Our Facebook group for parents and students (in Vietnamese)",
      },
      {
        name: "YouTube: MakerViet",
        url: "https://youtube.com/@makerviet",
        desc: "Video lessons and projects",
      },
      {
        name: "GitHub: MakerViet",
        url: "https://github.com/makerviet",
        desc: "Open-source code for our projects",
      },
    ],
  },
  hub: {
    meta: {
      title: "The Maker Hub Network",
      description:
        "Find a Maker Hub near you — local STEM & robotics makerspaces of Làng Maker (the Maker Village), at FPT Shop stores and partner venues.",
    },
    tieuDe: "The Maker Hub Network",
    phuDe:
      "Làng Maker (the Maker Village) — a local makerspace for STEM & robotics",
    loai: {
      "fpt-shop": "FPT Shop",
      clb: "Robotics Club",
      "truong-hoc": "School",
    },
    lich: "Schedule",
    mentor: "Guides",
    thietBi: "Equipment",
    lienHe: "Contact",
    dangCapNhat: "To be announced",
    banDo: "Get directions on Google Maps",
    dangHoatDong: "Hubs open now",
    tinh: "Provinces",
    moHub: "Want to open a hub where you live?",
    guiDangKy: "Send an application",
    rongTieuDe: "No Maker Hub has opened yet",
    rongMoTa:
      "The network is still being built. Get in touch to open the first hub in your area.",
    rongNut: "Apply to open a hub",
    mailSubject: "Application to open a Maker Hub",
  },
  duAn: {
    meta: {
      title: "Featured Projects",
      description:
        "Featured STEM projects from the MakerViet and Làng Maker community.",
    },
    tieuDe: "Featured Projects",
    phuDe: "STEM projects from the community — from an idea to a real, working thing",
    rong: {
      title: "No projects published yet",
      description:
        "This page will feature real projects by students and mentors in the community. Made something interesting? Send it to us and it could be the very first one here.",
      actionLabel: "Send us your project",
      mailSubject: "STEM project submission",
    },
  },
  tapChi: {
    meta: {
      title: "MakerViet Magazine",
      description: "Articles, how-tos and news from the MakerViet community.",
    },
    tieuDe: "MakerViet Magazine",
    phuDe: "Articles, how-tos and monthly news from the community",
    loai: {
      "tap-chi": "Magazine",
      "du-an": "Project",
      "huong-dan": "How-to",
      "tin-tuc": "News",
    },
    tacGia: "By",
    rong: {
      title: "The first issue is being edited",
      description:
        "The magazine will publish how-tos, projects and news from the maker community. Want to write for us? Send your idea to the editors.",
      actionLabel: "Pitch an article",
      mailSubject: "Article pitch for MakerViet Magazine",
    },
  },
};
