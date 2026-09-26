import type { NhipSlug } from "@/lib/content/nhip-slug";
import type { NhipNhan } from "./types";

export const NHIP_NHAN_EN: Record<NhipSlug, NhipNhan> = {
  choi: {
    ten: "Play",
    khauHieu: "Curiosity first — no lessons yet",
    moTaNgan:
      "Kids touch, try, break things, and try again at play stations. No lectures, no grades — just enough to spark one question: how does this actually work?",
    tenHuyHieu: "The Curious One",
  },
  lam: {
    ten: "Make",
    khauHieu: "Hands-on, building something that actually works",
    moTaNgan:
      "Seven sessions with one mentor, turning the question from Play into a real product — one you can hold, run, break, and fix.",
    tenHuyHieu: "The Maker",
  },
  "chia-se": {
    ten: "Share",
    khauHieu: "Once it's done, tell others about it",
    moTaNgan:
      "Kids stand up and tell the story themselves: what they set out to build, where it broke, how they fixed it. Being able to explain it to someone else is what real understanding looks like.",
    tenHuyHieu: "The Storyteller",
  },
};
