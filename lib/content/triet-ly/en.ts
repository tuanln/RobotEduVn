import type { TrietLyContent } from "./types";

/**
 * Nội dung trang Triết Lý, bản tiếng Anh.
 *
 * Viết như viết bản gốc, không dịch máy (spec 2026-09-23 mục 2.8).
 * Thuật ngữ làng giữ tiếng Việt kèm chú giải lần đầu xuất hiện (mục 2.6).
 *
 * Sáu nguyên lý ở đây PHẢI viết tay, không lấy từ nhip.ts như bản tiếng Việt —
 * nhip.ts chỉ có tiếng Việt. Thứ tự và số lượng phải khớp TRIET_LY_VI, và
 * triet-ly.test.ts canh điều đó.
 */
export const TRIET_LY_EN: TrietLyContent = {
  meta: {
    title: "Our Educational Philosophy",
    description:
      "The three pillars behind Làng Maker (the Maker Village): Hồ Chí Minh’s mass-literacy thinking, Seymour Papert’s constructionism, and FIRST’s spirit of Coopertition.",
  },
  header: {
    title: "Our Educational Philosophy",
    subtitle:
      "Three pillars that shape everything we do at Làng Maker (the Maker Village)",
  },
  vongLap: {
    heading: "The three-beat loop",
    intro:
      "Learning here is not a ladder to climb. It is three beats that repeat — Play, Make, Share. Each time round, the thing a child chooses to build is a little harder than the last.",
  },
  truCotHeading: "Pillar",
  truCot: [
    {
      icon: "🇻🇳",
      title: "Hồ Chí Minh’s Thought — “Bình Dân Học Vụ”, mass literacy",
      quote: "“Nothing is more precious than independence and freedom”",
      content: `A people’s-war methodology applied to education: bring everyone in, build three tiers of strength — a core team, local units, and a village militia — and win by position rather than by force.

Technological self-reliance: build Made-in-Vietnam products (ThingBot, NEO One, VIA) instead of depending on foreign kit.

A Làng Maker in every locality — each region builds its own strength, with the core team supporting rather than directing.`,
    },
    {
      icon: "🧩",
      title: "Constructionism — Seymour Papert",
      quote:
        "“Children develop their thinking by making things they can hold”",
      content: `Learning by making — not only reading or listening, but building something with your own hands.

The three-beat loop: Play, Make, Share. Not a ladder: once you have shared, you go back to playing, carrying a harder question than before.

The child is the maker of their own knowledge, not a vessel to pour knowledge into.`,
    },
    {
      icon: "🤝",
      title: "Coopertition — FIRST Robotics",
      quote: "“Compete and cooperate — raise the value of the whole community”",
      content: `Teams cooperate and compete at the same time, and neither cancels the other. Companies that contribute get back something proportionate in reputation, standing, and social impact.

Three tiers of strength: a core team (strategic partners), local units (mentors and volunteers), and a village militia (the children themselves — learning and passing it on at once).

Core values: open, free, fair, independent, communal.`,
    },
  ],
  nguyenLyHeading: "Six guiding principles",
  nguyenLy: [
    {
      title: "Touch first, symbols later",
      desc: "Hands touch a real object first. Code and formulas arrive afterwards, once there is a concrete experience for the symbols to hold on to.",
    },
    {
      title: "Hard and joyful",
      desc: "A project hard enough to demand real thought, but chosen by the child. Hard because they want it, not hard because it was imposed.",
    },
    {
      title: "An error is information",
      desc: "A robot veering off course is not a failure. The guide does not fix it for you — they ask back: why do you think it turned left?",
    },
    {
      title: "A small world",
      desc: "Every project is a world small enough for a child to master completely, and real enough to run on real hardware.",
    },
    {
      title: "Learning like a samba school",
      desc: "Beginners work beside experts on the same real task, rather than being sorted into separate classes by age or level.",
    },
    {
      title: "Off the screen",
      desc: "Every digital interaction starts from a physical act: assembling something, handling a device, watching a phenomenon happen.",
    },
  ],
};
