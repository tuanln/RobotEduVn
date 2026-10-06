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
    nhanTren: "Làng Maker",
    tieuDe: ["Play", "Make", "Share"],
    moTa: "Three beats that repeat at Làng Maker (the Maker Village): play to get curious, build something that actually works, then tell someone else how you did it.",
    nutCachHoc: "See how we learn",
    nutVideo: "Browse the Video Hub",
    lapLai: "repeat",
    mucTieu: "Five-year goal: one million Vietnamese children reaching STEM & robotics",
  },
  baNhip: {
    tieuDe: "Three Beats, on Repeat",
    phuDe: "Rooted in Seymour Papert’s constructionism — “learning by making”",
    xemChiTiet: "See how learning works",
  },
  soLieu: {
    tieuDe: "The Network Today",
    phuDe: "Real numbers only — pulled straight from the platform’s own data",
    hub: { label: "Maker Hubs", note: "open now" },
    tinh: { label: "Provinces", chuaCo: "none yet" },
    video: { label: "Video lessons", note: "free" },
    nhip: { label: "Beats", note: "on repeat, harder each round" },
    mucTieuDam: "Five-year goal:",
    mucTieuThan:
      "1,000,000 Vietnamese children with access to STEM & robotics. This is where we are heading, not a number we have reached.",
  },
  doiTac: {
    tieuDe: "Partners & Community",
    phuDe:
      "A united front for STEM education — “those with guns bring guns, those with swords bring swords” (Hồ Chí Minh)",
    ds: [
      { name: "MakerViet", role: "Maker community & open source" },
      { name: "ThingEdu", role: "STEM education & software" },
      { name: "Rogo", role: "ThingBot educational robot" },
      { name: "FPT Shop", role: "Maker Hub network" },
      { name: "FIRST Global", role: "International robotics challenge" },
    ],
  },
  cta: {
    tieuDe: "Ready to Start Your STEM Journey?",
    moTa: "Children can start from age 4 — beginning with the Play beat, completely free.",
    nutCachHoc: "See How We Learn",
    nutHub: "Find a Maker Hub Near You",
  },
};
