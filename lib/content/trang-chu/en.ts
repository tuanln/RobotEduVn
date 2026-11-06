import { SITE } from "@/lib/site";
import type { TrangChuContent } from "./types";

/** Trang chủ, bản tiếng Anh. Giọng văn theo lib/content/triet-ly/en.ts. */
export const TRANG_CHU_EN: TrangChuContent = {
  meta: {
    title: `${SITE.name} — Open STEM & Robotics Education`,
    description:
      "An open STEM and robotics platform for Vietnamese children. Learning by making — a three-beat loop of Play, Make, Share for ages 4 to 18, rooted in Seymour Papert’s thinking.",
  },
  hero: {
    nhanTren: "The Làng Maker handbook",
    tieuDe: ["A robot is", "an object to think", "with"],
    moTa: "At Làng Maker (the Maker Village), children play with robots to learn how to think. A path for tinkering with robots from age 6: play to get curious, build something that actually works, then tell someone else how you did it.",
    papert: "We learn the way Seymour Papert (MIT) described: children learn deepest when they make something they care about.",
    papertLink: "See why",
    nutCachHoc: "Start here",
    nutVideo: "See the 8-stage journey",
    lapLai: "repeat",
    mucTieu: "Five-year goal: one million Vietnamese children with access to STEM & robotics",
  },
  conDuong: {
    tieuDe: "The 8-stage path",
    phuDe: "From Khách Làng (village guest) to Già Làng (elder), in four seasons of the bamboo. Nobody has to climb all the way; each stage is a real place to stand.",
    nut: "See the journey",
    altAnh: "Diagram of the eight stages of a Làng Maker member: village guest, apprentice, village competitor, Dế STEM ambassador, maker-builder, Team Vietnam, master maker, elder (in Vietnamese)",
  },
  baMang: {
    tieuDe: "One robot, three strands",
    phuDe: "Electronics, robotics and AI are not three separate subjects. They meet in the robot and grow with the child.",
    vong: [
      { ten: "Electronics", moTa: "Press a button and see a light, then plug in motors, then design your own sensor circuit." },
      { ten: "Robotics", moTa: "Drive a robot through a maze, then program in blocks, then build a self-driving car." },
      { ten: "AI", moTa: "Say “forward” and the robot moves, then teach the machine gestures, then delegate to an agent and check when it is wrong." },
    ],
    hoatDongAI: {
      tieuDe: "Four real AI activities at the village",
      ds: [
        { ten: "Say “forward” and the robot moves; play camera games with the whole body", chang: "Stage 1" },
        { ten: "Teach the machine to recognise hand gestures in a camera game", chang: "Stage 2" },
        { ten: "Use an AI agent to build a game: describe the rules, the machine writes code, the child tests and fixes", chang: "Stage 4" },
        { ten: "A VIA self-driving car that sees the lane; a home-built voice assistant that drives the robot", chang: "Stage 5" },
      ],
    },
    kyNang: "The skills that stay: systems thinking, breaking big work into small steps, debugging, teamwork, explaining to others, and using AI as a tool: knowing how to delegate to the machine, how to check when it is wrong, and never letting it do the work for you.",
  },
  fanroc: {
    tieuDe: "FanRoc season",
    moTa: "FanRoc is the entry competition for school students in Vietnam: launched in November, finals in March. At the village, students prepare with ThingBot, ThingBlock, a PS2 controller and the simulated field.",
    nut: "See the journey",
    href: "/en/how-we-learn",
  },
  baNhip: {
    tieuDe: "Three beats on repeat",
    phuDe: "Rooted in Seymour Papert’s constructionism — “learning by making”",
    xemChiTiet: "See how learning works",
  },
  soLieu: {
    tieuDe: "The network today",
    phuDe: "Real numbers only — updated from the platform’s own data",
    hub: { label: "Maker Hubs", note: "open now" },
    tinh: { label: "Provinces", chuaCo: "none yet" },
    video: { label: "Video lessons", note: "free" },
    nhip: { label: "Beats", note: "on repeat, harder each round" },
    mucTieuDam: "Five-year goal:",
    mucTieuThan:
      "1,000,000 Vietnamese children with access to STEM & robotics. This is where we are heading, not a number we have reached.",
  },
  doiTac: {
    tieuDe: "Partners & community",
    phuDe:
      "A united front for STEM education — everyone brings what they have, in the spirit of Hồ Chí Minh’s call: “those who have rifles, use rifles; those who have swords, use swords”",
    ds: [
      { name: "MakerViet", role: "Maker community & open source" },
      { name: "ThingEdu", role: "STEM education & software" },
      { name: "Rogo", role: "ThingBot educational robot" },
      { name: "FPT Shop", role: "Maker Hub network" },
      { name: "FIRST Global", role: "International robotics challenge" },
    ],
  },
  cta: {
    tieuDe: "Ready to start your STEM journey?",
    moTa: "Children can start from age 4 — beginning with the Play beat, completely free.",
    nutCachHoc: "See how we learn",
    nutHub: "Find a Maker Hub near you",
  },
};
