import type { CongCuContent } from "./types";

/** Công Cụ, bản tiếng Anh. Tên sản phẩm và tên giải đấu giữ nguyên. */
export const CONG_CU_EN: CongCuContent = {
  meta: {
    title: "Tools & Kit",
    description:
      "The kit in the Làng Maker workshop — the means for children to build real things, not a ladder of levels to climb.",
  },
  tieuDe: "Tools & Kit",
  phuDe: "The workshop’s kit — something to build with, not a ladder to climb",
  ghiChu:
    "Nobody has to master one tool before they are allowed to move on to the next. A child picks the kit that fits what they want to build right now.",
  tools: [
    {
      name: "GCompris",
      nhip: "choi",
      type: "Software",
      origin: "Open source (international)",
      desc: "A suite of educational software with more than 200 activities: maths, reading, science, geography, music, logic. Completely free, runs on Windows, Linux and Android.",
      features: ["200+ activities", "Free", "Cross-platform", "Vietnamese supported"],
    },
    {
      name: "KTurtle",
      nhip: "lam",
      type: "Software",
      origin: "Open source (KDE)",
      desc: "A Logo programming environment — children steer a turtle that draws on the screen using simple commands. A first taste of geometric thinking and programming.",
      features: ["Visual programming", "Geometry", "Free", "Linux/Windows"],
    },
    {
      name: "Python",
      nhip: "lam",
      type: "Language",
      origin: "Open source",
      desc: "The world’s most popular programming language, with a simple syntax that is easy to pick up. Children go from variables and functions all the way to recursion and object-oriented programming.",
      features: ["Easy to learn", "#1 worldwide", "Free", "Plenty of resources"],
    },
    {
      name: "ThingBot",
      nhip: "lam",
      type: "Educational robot",
      origin: "Made in Vietnam (Rogo)",
      desc: "A versatile educational robot, programmable in Python or with blocks. Built-in sensors, motors and LEDs. Affordable, and designed for Vietnamese students.",
      features: ["Made in Vietnam", "Python + blocks", "Sensors", "Affordable"],
    },
    {
      name: "NEO One",
      nhip: "lam",
      type: "Educational computer",
      origin: "Made in Vietnam (ThingEdu)",
      desc: "A compact computer built for education. It runs Linux, supports Python and Scratch, and connects to sensors — an alternative to the Raspberry Pi at a lower cost.",
      features: ["Made in Vietnam", "Linux", "Low cost", "IoT-ready"],
    },
    {
      name: "K12 Maker",
      nhip: "lam",
      type: "Competition robot",
      origin: "Made in Vietnam (MakerViet)",
      desc: "A robot kit for STEM competitions. Modular, easy to assemble and to customise. Used in the VSC, FARC and GreenBot competitions.",
      features: ["Made in Vietnam", "Competition", "Modular", "Easy to customise"],
    },
    {
      name: "VIA",
      nhip: "lam",
      type: "Self-driving car",
      origin: "Made in Vietnam (MakerViet)",
      desc: "An open-source self-driving car project. Students learn AI, image processing and autonomous control by building and programming a real self-driving car.",
      features: ["Made in Vietnam", "AI", "Open source", "Hands-on"],
    },
  ],
};
