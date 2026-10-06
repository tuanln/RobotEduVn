import { TRIET_LY_EN } from "@/lib/content/triet-ly/en";
import type { CachHocContent } from "./types";

/**
 * Cách Học và ba trang nhịp, bản tiếng Anh. Viết như viết bản gốc.
 * Ba nguyên tắc nhịp Làm PHẢI trùng tên ba nguyên lý đầu của
 * triet-ly/en.ts — test canh điều đó.
 */
export const CACH_HOC_EN: CachHocContent = {
  meta: {
    title: "How We Learn at Làng Maker",
    description:
      "Three beats on repeat: play to get curious, build something real, then tell others how you did it. Not a ladder — a loop.",
  },
  tieuDe: "How We Learn at Làng Maker",
  phuDe:
    "Three beats, again and again — nobody climbs a ladder, everybody goes through all three",
  ghiChuTuoi:
    "Everyone from 4 to 18 goes through all three beats. What changes is not which beat you are on, but how hard the thing you choose to build is.",
  nhip: {
    choi: {
      metaTitle: "The Play beat",
      moTaDai: `The first beat teaches nothing at all. Its only job is to make a child want to know.

Children wander between play stations, pick the ones they like, and stay as long as they want. There is a drawing station, a movement station, a station where paper cards steer a character around. The adults nearby do not lecture; they only ask a question back when a child wonders out loud.

The moment a child turns round and asks “how does it move like that?”, the Play beat has done its work. That question is what pulls the child into the next beat — and it has to come from the child, not from a timetable.`,
      taiLangMaker:
        "The Curiosity Museum stays open at Làng Maker (the Maker Village) with five groups of play stations. The way in is Hour of STEAM — a free 60–90 minute weekend session for newcomers: nothing to know in advance, nothing to bring. Two characters, Faddy Dế and NEO Tre, host the visit.",
    },
    lam: {
      metaTitle: "The Make beat",
      moTaDai: `This is the longest part, and the hardest. A child picks a project small enough to own completely, but real enough to run on real hardware rather than stopping at a screen.

Over seven sessions the child builds, tests, breaks it, works out why it broke, and fixes it. The guide does not do it for them and does not hand out answers — they only ask questions back, so the child learns to read the information hidden inside the mistake.

The three directions below are three parallel ways in, not three levels. A ten-year-old can go straight to robots; a fourteen-year-old can start with control. Nobody has to queue up and climb.`,
      taiLangMaker:
        "Seven project sessions at Làng Maker (the Maker Village) with a Coach Maker, on the 7+1 rule — seven sessions of making and an eighth to share. Every project is a small world, small enough for a child to master completely.",
      huong: [
        {
          title: "Control & computational thinking",
          doing:
            "Tell a machine to do exactly what you mean — draw a shape, travel a distance, repeat it ten times without missing a step.",
        },
        {
          title: "Programming",
          doing:
            "Write your own program to solve your own problem, instead of copying someone else’s worked example.",
        },
        {
          title: "Robots, circuits & IoT",
          doing:
            "Make a real object move, and sense the world around it.",
        },
      ],
      // Một nguồn: ba nguyên lý đầu của Triết Lý bản en, như bản vi lấy từ nhip.ts.
      nguyenTac: TRIET_LY_EN.nguyenLy.slice(0, 3),
    },
    "chia-se": {
      metaTitle: "The Share beat",
      moTaDai: `A product only truly belongs to a child once they can tell the story of how it was made.

The sharing session is run by the children themselves: they set up their own tables, introduce their own work, and answer questions from parents and friends. The most valuable part is rarely the product that runs beautifully — it is the moment a child talks about where they got it wrong.

There is one important rule here: you present to get feedback and to help each other, not to win. Whoever finishes early goes back to help a friend who is still stuck — and that friend is often the one who learns the most.

Sharing is not graduation. It leads back to the Play beat for the next round, with a harder question.`,
      taiLangMaker:
        "The eighth session of the 7+1 programme is called Make & Share, held at Làng Maker (the Maker Village) in front of parents. Further on there are robotics competitions at home and abroad — and the road back, to become a guide for the next group.",
    },
  },
  nhan: {
    taiLangMaker: "At Làng Maker",
    namNhomTram: "Five groups of play stations",
    buoiDau:
      "The first session is free, 60–90 minutes, at weekends. Nothing to know in advance, nothing to bring.",
    baHuong: "Three directions, side by side",
    baHuongGhiChu:
      "Not three levels. A child picks the direction that fits what they want to build right now.",
    doNghe: "Kit",
    baNguyenTac: "Three rules for guiding a session",
    videoNhip: "Videos for this beat",
    xemVideo: "Browse the Video Hub",
    chuaCoVideo:
      "This beat has no videos yet — it is meant to be experienced in person.",
    timHub: "Find a Maker Hub near you",
    nhipTiepTheo: "Next beat:",
    khongTimThay: "Not found",
  },
};
