import type { HanhTrinhContent } from "./types";

/**
 * English version. Village terms stay in Vietnamese with a gloss on first use
 * (spec 2026-09-23 §2.6): Làng Maker, Khách Làng, Thợ Cả, Già Làng, Chợ Phiên.
 * Course and competition pages are Vietnamese-only; links say so.
 */
export const HANH_TRINH_EN: HanhTrinhContent = {
  meta: {
    title: "The 8-Stage Journey at Làng Maker",
    description:
      "A path for tinkering with robots from age 6: eight stages in four bamboo seasons, three strands (electronics, robotics, AI), and why the village learns the way Seymour Papert described.",
  },
  tieuDe: "The Làng Maker Journey",
  phuDe: "From a visiting child to a Thợ Cả (master maker) who comes back to coach. The robot is only the vehicle; what grows is the child.",
  langNghe: {
    tieuDe: "A craft village for technology",
    doan: [
      "A pottery village keeps its glaze recipes; a weaving village keeps its dyes. Làng Maker (the Maker Village) is a craft village too, except its secrets are open source. The Già Làng (elders) keep the customs, the Thợ Cả (masters) work alongside, and the apprentices watch, then do it themselves.",
      "There are no lectures here. A child walks into the workshop, picks up a robot and starts. Knowledge is not poured in; the child builds it while making, testing, breaking and fixing.",
    ],
  },
  chuKy: {
    tieuDe: "The 7 + 1 cycle",
    moTa:
      "Each cycle is eight sessions. Seven are workshop sessions: play and make. The eighth is Chợ Phiên (market day): the child demonstrates the product to parents and friends. That is why parents are invited to session 8, and it is the Share beat of the loop.",
  },
  conMayTuoi: {
    tieuDe: "How old is your child?",
    phuDe: "Pick the age band to see where to start, and how your child grows at that stage.",
  },
  giaiDoan: [
    {
      ma: "gieo-hat",
      ten: "Sowing",
      tuoi: "Ages 6–8",
      lonLen: "Dares to touch, dares to try, is not afraid of mistakes.",
      doNghe: [
        "NEO One computer with GCompris in Vietnamese",
        "Camera and voice games on NEO",
        "Lesson 1 on the simulator, no robot needed",
      ],
      link: { label: "Try the simulator", href: "/mo-phong" },
      anh: "A2",
    },
    {
      ma: "vuon-canh",
      ten: "Branching",
      tuoi: "Ages 8–11",
      lonLen: "Fixes their own bugs and keeps going until the robot runs.",
      doNghe: [
        "ThingBot with ThingBlock block programming",
        "micro:bit with MakeCode",
        "Tinkercad: drawing the 3D part you need",
      ],
      link: { label: "ThingBlock course (in Vietnamese)", href: "/khoa-hoc/thingedu/thingblock" },
      anh: "A1",
    },
    {
      ma: "ket-trai",
      ten: "Bearing fruit",
      tuoi: "Ages 11–14",
      lonLen: "Builds real projects, works in a team, enters a first competition.",
      doNghe: [
        "ThingBot with sensors and a PS2 controller",
        "Tinkercad Circuits, App Inventor for a robot-control app",
        "FanRoc and BlueSilk-style projects",
      ],
      link: { label: "Competitions (in Vietnamese)", href: "/san-choi" },
      anh: "F1",
    },
    {
      ma: "rung-ve-coi",
      ten: "Returning to the roots",
      tuoi: "Ages 14–18",
      lonLen: "Leads, teaches the younger ones, carries the flag abroad.",
      doNghe: [
        "VIA board and the K12 Maker kit, Arduino C",
        "The VIA e-book on self-driving cars and AI",
        "FTC, FIRST Global, NASA Space Apps",
      ],
      link: { label: "Maker Việt courses (in Vietnamese)", href: "/khoa-hoc/maker-viet" },
      anh: "G1",
    },
  ],
  tamChang: {
    tieuDe: "Eight stages, four seasons of the bamboo",
    phuDe: "Nobody has to climb all the way. Each stage is a real place in the village, with work to do and a milestone to recognise.",
  },
  chang: [
    {
      so: 1,
      giaiDoan: "gieo-hat",
      ten: "Khách Làng (village guest)",
      ai: "Every child on their first visit, from age 4",
      lamGi: "Free coding hour, driving a robot through a maze, playing camera games with the whole body",
      datDuoc: "Not afraid of machines. Knows a robot is something you can control",
      dauMoc: "Robot driving licence",
      baMang: {
        dienTu: "Press a button, see a light, hear a buzzer",
        robotics: "Drive a robot through a maze",
        ai: "Say “forward” and the robot moves",
      },
    },
    {
      so: 2,
      giaiDoan: "gieo-hat",
      ten: "Thợ học việc (apprentice)",
      ai: "Ages 6–10, has picked one thing to make",
      lamGi: "Build a BlockBot dump truck or crane; program in blocks on ThingBlock and the simulator",
      datDuoc: "Breaks it and fixes it alone. Can read a block program",
      dauMoc: "Level 1 PLAY",
      baMang: {
        dienTu: "Plug motors and servos into the right ports",
        robotics: "A two-wheel car that runs the child's own program",
        ai: "Teach the machine to recognise hand gestures in a camera game",
      },
    },
    {
      so: 3,
      giaiDoan: "vuon-canh",
      ten: "Village competitor",
      ai: "Ages 9–14, loves to compete",
      lamGi: "Weekly Robot Sport; preparing for FanRoc with a PS2 controller",
      datDuoc: "Fixes wires and swaps batteries under pressure. Loses, fixes, wins",
      dauMoc: "First competition team",
      baMang: {
        dienTu: "Ultrasonic sensor, batteries, wiring",
        robotics: "A controller-driven competition robot",
        ai: "Try tactics on the simulated field",
      },
    },
    {
      so: 4,
      giaiDoan: "vuon-canh",
      ten: "Dế STEM ambassador",
      ai: "Ages 10–14, wants to make something of their own",
      lamGi: "DIY workshop, 3D printing, teaching assistant for new guests",
      datDuoc: "Has a project with their name on it. Can explain it to a younger child",
      dauMoc: "Level 2 MAKE",
      baMang: {
        dienTu: "Design a sensor circuit for the project",
        robotics: "3D print and assemble a mechanism they drew",
        ai: "Use an AI agent to build a game: the child describes the rules, the machine writes code, the child tests and fixes. The child stays the designer",
      },
    },
    {
      so: 5,
      giaiDoan: "ket-trai",
      ten: "Maker-builder",
      ai: "Ages 14–18",
      lamGi: "Sketch, simulate, fabricate, program, test. Provincial workshops, BlueSilk-style projects",
      datDuoc: "Goes the full loop from idea to a working product",
      dauMoc: "Level 3 KNOW & SHARE",
      baMang: {
        dienTu: "The electrical system of a self-driving car",
        robotics: "VIA self-driving car: a camera that sees the lane",
        ai: "Build a voice assistant that drives the robot",
      },
    },
    {
      so: 6,
      giaiDoan: "ket-trai",
      ten: "Team Vietnam",
      ai: "Outstanding competitors and ambassadors",
      lamGi: "FIRST Global Challenge, FTC Vietnam",
      datDuoc: "Competes hard, respects opponents. Represents a nation",
      dauMoc: "The flag on the shirt",
      baMang: {
        dienTu: "An international competition robot",
        robotics: "Three-team alliance tactics",
        ai: "Match data analysis",
      },
    },
    {
      so: 7,
      giaiDoan: "rung-ve-coi",
      ten: "Thợ Cả (master maker)",
      ai: "University students, former ambassadors and team members",
      lamGi: "Coach competition teams, serve as Tech-Tutor, lead sessions",
      datDuoc: "Can mentor others. Works alongside instead of lecturing",
      dauMoc: "Leads a full 7 + 1 cycle",
      baMang: {
        dienTu: "Create new kits: ThingBot, VIA",
        robotics: "Coach competition teams",
        ai: "Contribute open source to the village's AI tools",
      },
    },
    {
      so: 8,
      giaiDoan: "rung-ve-coi",
      ten: "Già Làng (elder)",
      ai: "Those who completed the loop and stayed",
      lamGi: "Keep the philosophy, set direction, certify craft",
      datDuoc: "The village gains one more keeper of its customs",
      dauMoc: "A Thợ Cả they mentored who once was a Khách Làng",
      baMang: {
        dienTu: "Choose the tools for the next generation",
        robotics: "Open a new village",
        ai: "Decide how far AI is used in the village",
      },
    },
  ],
  camKet: {
    tieuDe: "The 4 : 1 promise",
    moTa:
      "Whoever learns at the village passes it on to four people. Not a duty, but how the village grows: today's Khách Làng is tomorrow's Thợ Cả.",
  },
  viSao: {
    tieuDe: "Why we learn this way",
    moTa:
      "The village learns the way Seymour Papert (MIT) described in Mindstorms: children learn deepest when they make something they care about, and a robot is an “object to think with”. The five principles below are not theory; they are five scenes you see every week at the village.",
    nguyenTac: [
      {
        ten: "Workshop first, classroom later",
        canh: "A six-year-old holds a NEO One and drives a ThingBot in the very first session. Nobody lectures first. Questions come after the hands have touched.",
      },
      {
        ten: "Hard fun",
        canh: "If the robot veers, the child adjusts the two wheel speeds. If the BlueSilk silkworm chamber runs hot, the child changes the relay threshold. Hard, but the kind of hard they want to beat.",
      },
      {
        ten: "Low floor, high ceiling, wide walls",
        canh: "One ThingBot: at 6 you press buttons, at 10 you program in blocks, at 15 you write Arduino. The same robot competes, raises silkworms and watches the house.",
      },
      {
        ten: "Never do it for them",
        canh: "The mentor asks “what have you tried?” instead of taking the screwdriver. Parents sit a little further away. Using AI to build a game is fine, but the child is the designer and the one who checks when the machine is wrong.",
      },
      {
        ten: "Learn by teaching",
        canh: "Session 8 is Chợ Phiên: the child tells parents and friends how it works. The FIRST Global team comes back to the village to teach the younger ones.",
      },
    ],
    nenTang: "This way of working draws on MIT's FabLab, the Arduino community and the FIRST competitions.",
    docThem: "Read more on the three pillars of our philosophy",
  },
  chuyenThat: {
    tieuDe: "True stories",
    phuDe: "Two pieces of evidence from the village itself, so parents can see how far this path goes.",
    ds: [
      {
        ma: "bluesilk",
        tieuDe: "BlueSilk: a silkworm chamber built by the children",
        doan: [
          "Starting from a real problem in a silk village, the children built a rearing chamber with temperature and humidity sensors, a relay for the fan and a servo for the door. They wired the circuit, chose the thresholds, and when the worms got sick they read the data to fix it.",
          "The product also has a web game and a 3D version so that anyone without the hardware can play. That is the Share beat: what is made at the village goes out for others to use.",
        ],
        anh: ["F1"],
        nguon: "Làng Maker's BlueSilk project, public web build at bluesilk-vr.vercel.app (29 Sep 2026)",
      },
      {
        ma: "team-vietnam-fgc",
        tieuDe: "Team Vietnam FIRST Global: from the village to the world stage",
        doan: [
          "Vietnam's team at the FIRST Global Challenge 2025 in Panama came home with the Silver Medal of the Jackie Bezos Award, a Top 12 overall finish, the Storytelling Award and the Social Media Award. The year before, the team competed in Athens.",
          "What the village is prouder of than the medals: the students put “professional and kind” first, and on returning they went to Hope School to teach younger children. That is the Returning-to-the-roots stage.",
        ],
        anh: ["G1", "G2", "G3"],
        nguon: "Team Vietnam - FIRST Global fan page, FGC 2025 wrap-up post of 3 Nov 2025; albums FGC 2024 Athens and Team Vietnam × Hope School",
      },
    ],
  },
  bePhong: {
    tieuDe: "A launch pad, seen from the senior years",
    y: [
      "The Maker Logbook records every project and every stage: a real portfolio, not grades.",
      "International results are real, but they are one of many doors out.",
      "The skills that stay: systems thinking, breaking big work into small steps, debugging, teamwork, explaining to others, and using AI as a tool.",
      "The return: those who go furthest are the ones who come back to lead the next team.",
    ],
  },
  nhan: {
    conLonLen: "How your child grows",
    doNghe: "Tools",
    ai: "Who",
    lamGi: "What they do",
    datDuoc: "What they gain",
    dauMoc: "Milestone",
    baMang: { dienTu: "Electronics", robotics: "Robotics", ai: "AI" },
    nguon: "Source",
    chang: "Stage",
  },
};
