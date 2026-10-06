import type { LangMakerTrangContent } from "./types";

/**
 * Trang Làng Maker, bản tiếng Anh. Viết như viết bản gốc.
 *
 * Tên vai giữ tiếng Việt, chú giải trong ngoặc LẦN ĐẦU xuất hiện trên trang
 * (spec 2.6, chú giải ngắn lấy từ lib/content/glossary.ts); khối "người dẫn"
 * bên dưới chỉ chú giải vai lần đầu gặp (Bô Lão). Trích dẫn 2017 là NGUYÊN
 * VĂN tiếng Anh trong slide "Maker Hanoi — Review" (Google Drive, IoT Lab/VIA
 * Project), kể cả chữ "Robotic" — không sửa lời người khác. Thứ tự mốc khớp
 * MUOI_NAM; căn cứ `nguon` giữ tiếng Việt, trang đánh dấu lang="vi".
 */
export const LM_EN: LangMakerTrangContent = {
  meta: {
    title: "Làng Maker (the Maker Village)",
    description:
      "Làng Maker uses robots to make children — the robot is not the point. Ten years, five roles in the village, and a shared workshop open since 2016.",
  },
  tieuDe: "Làng Maker",
  phuDe: "The Maker Village — a shared workshop, open since 2016",
  luanDe: {
    tieuDe: "Using robots to make children",
    doan: [
      [
        {
          text: "It sounds backwards, but that is what the village does. The robot is not the goal — the child is what gets made. Once the robot has run, it goes back in the cupboard; what stays is a child who knows they can make things.",
        },
      ],
      [
        { text: "The programmable objects here are a child’s " },
        { text: "thinking partners", dam: true },
        { text: ", not a subject to memorise. Children think " },
        { text: "with", nghieng: true },
        { text: " the robot rather than learning " },
        { text: "about", nghieng: true },
        { text: " it." },
      ],
      [
        {
          text: "The line goes back to the very first day, when the village was still called Maker Hanoi: ",
        },
        { text: "“Your contributions, we share”", dam: true },
        { text: " — words the village still lives by." },
      ],
    ],
  },
  laGi: {
    tieuDe: "What is Làng Maker?",
    doan: [
      "Làng Maker is an open, non-profit makerspace, built by the MakerViet · ThingEdu · Rogo community after ten years of open-source work and STEM education in Vietnam.",
      "“Open” is the heart of it: open knowledge, open source, an open model — anyone can join in, contribute, and benefit.",
    ],
    tamNhin: {
      tieuDe: "Vision",
      noiDung:
        "Every Vietnamese child has the chance to reach STEM and robotics, to grow independent thinking and to be in charge of technology.",
    },
    suMenh: {
      tieuDe: "Mission",
      noiDung:
        "Bring STEM and robotics to one million Vietnamese children within five years, through an open education ecosystem, Made-in-Vietnam products, and a nationwide community network.",
    },
  },
  nguoiTrongLang: {
    tieuDe: "People of the village",
    moTa: "The village has no classes sorted by age. Newcomers learn beside skilled hands, on the same real job.",
    vai: [
      {
        ten: "Dân làng (Villager)",
        laAi: "A newcomer. Plays first; needs to know nothing and sign up for nothing yet. Every child who walks into the village starts here.",
      },
      {
        ten: "Thợ học việc (Apprentice)",
        laAi: "Has picked something they want to make and is learning the trade beside a master. Not certified yet, but has already broken things with their own hands and fixed them again.",
      },
      {
        ten: "Thợ cả (Master)",
        laAi: "Has mastered a trade and can bring others along. At Làng Maker, the master leads the session — not by lecturing, but by making alongside.",
      },
      {
        ten: "Già làng (Village Elder)",
        laAi: "Leads the whole village and certifies other people’s skills. Keeps the village’s ways more than its knowledge.",
      },
      {
        ten: "Nghệ nhân (Artisan)",
        laAi: "Someone with a trade of their own outside the village — woodwork, electrics, pottery, sewing, metalwork — who drops in to pass on a skill. They stand beside the ladder, not on it, and that is fine.",
      },
    ],
    ket: {
      truoc: [
        { text: "A child who walks into the village is a " },
        { text: "dân làng", dam: true },
        { text: ". The way up is real — and it closes the loop at the " },
      ],
      link: "Share",
      sau: " beat, when they come back to guide the next group.",
    },
  },
  nguoiDan: {
    tieuDe: "The village’s guides",
    moTa: "Four roles. Three of them are also rungs on the ladder above — today’s guide was once a dân làng.",
    coChungNhan: "certified",
    vai: [
      {
        ten: "Già Làng",
        dan: "Leads the whole village and certifies other people’s skills.",
        viecCuThe:
          "Does not teach every week. Turns up at the eighth session to hear the children present, and is the one who signs off when an apprentice is ready to become a master.",
      },
      {
        ten: "Bô Lão (Elder Counsel)",
        dan: "A respected elder of the village — advises, does not grade.",
        viecCuThe:
          "Sits at the table when the village talks about big things — opening a new site, handling a hard problem. Certifies no one, and is not part of the training path.",
      },
      {
        ten: "Nghệ nhân",
        dan: "Someone with a trade of their own outside the village, who drops in to pass on a skill.",
        viecCuThe:
          "Woodwork, electrics, pottery, sewing, metalwork — each person brings one real trade. They come for a session, teach exactly what they know how to do, and go back to their own workshop.",
      },
      {
        ten: "Thợ cả",
        dan: "Leads the weekly session — the closest of the four to the children.",
        viecCuThe:
          "Makes alongside the children for all seven project sessions. Does not lecture and does not fix things for them; when the robot veers off, asks questions back until the child finds the mistake themselves.",
      },
    ],
    oCacHub: "Guides at the Maker Hubs",
    ngheMentor: {
      "Lê Ngọc Tuấn": "Founder of Maker Hanoi",
      "Đàm Phi Hùng":
        "Coach of Vietnam’s team at the FIRST Global Challenge, and a former team member",
      "Trịnh Trần Viết Hưng":
        "Member of Vietnam’s 2022 team, world bronze medallist",
      "Phạm Việt":
        "FIRST Tech Challenge Vietnam referee, member of the Thái Phiên robotics team",
    },
    danhSachDai: "The list is still growing.",
    gioiThieuMinh: "Do you guide at a hub? Introduce yourself",
    rongMoTa:
      "Portraits of each guide are on their way from the Maker Hubs. We only publish the names of people who have agreed.",
    mailSubject: "Introducing a guide at Làng Maker",
  },
  muoiNam: {
    tieuDe: "Ten years",
    trichDan: {
      loi: "I want to create many labs like Maker Hanoi in schools, rural areas, provinces in Vietnam. All young people need to have access to technology, have dreams for themselves. We want to bring STEM, Robotic to everyone.",
      ghiChu:
        "Verbatim from the English original in the “Maker Hanoi — Review” slides, Google Drive archive.",
    },
    moc: [
      {
        tieuDe: "A shared workshop opens in Hanoi",
        chiTiet:
          "Maker Hanoi is born — a member of the global FabLab network, run as a non-profit. Its motto from day one: your contributions, we share.",
      },
      {
        tieuDe: "The first IoT festival, made by the community itself",
        chiTiet:
          "Vietnam IoT Weekend takes place in the FPT building on Duy Tân street, Cầu Giấy — no professional organiser, just people who love to build.",
      },
      {
        tieuDe: "National television comes to the workshop",
        chiTiet:
          "VTV runs a story calling Maker Hanoi “a destination for young people who love technology”.",
      },
      {
        tieuDe: "The words that shaped the next ten years",
        chiTiet:
          "The founder writes down what he wants: many labs like this one, in schools, in the countryside, in the provinces. The name “Làng Maker” does not exist yet.",
      },
      {
        tieuDe: "Vietnam IoT Day — bringing the community together",
        chiTiet: "The second festival, held at Lương Yên Coworking.",
      },
      {
        tieuDe: "Onto the international stage",
        chiTiet:
          "The FIRST Global Challenge records start this year and continue, unbroken, in the community’s archive to this day.",
      },
      {
        tieuDe: "Cuộc Đua Số (the Digital Race)",
        chiTiet:
          "A self-driving car competition becomes a real problem to solve, and the data source for the community’s line of autonomous cars.",
      },
      {
        tieuDe: "VIA — an open-source self-driving car",
        chiTiet:
          "Maker Bot 2020 and the VIA project: an open self-driving car with a simulator, a community-contributed dataset, and Vietnamese voice control. The same year sees the Vietnam STEAM Challenge.",
      },
      {
        tieuDe: "Vietnam STEAM Challenge, season two",
        chiTiet:
          "The home competition carries on, between two years of the pandemic.",
      },
      {
        tieuDe: "Taking the workshop on the road",
        chiTiet:
          "The Mobile Maker Tour reaches Quy Nhơn — the ExploraScience science centre and the Fschool campus.",
      },
      {
        tieuDe: "Vietnam Robotics Challenge finals",
        chiTiet: "The VRC 2022 final round, filmed in 360 degrees.",
      },
      {
        tieuDe: "Team Vietnam in Geneva",
        chiTiet: "FIRST Global Challenge 2022 at Palexpo, Geneva.",
      },
      {
        tieuDe: "The year of training guides",
        chiTiet:
          "An Arduino course for beginners, the Maker Tech-Tutor programme to train technology tutors, and the CoBot robot for classrooms. The village starts making masters of its own.",
      },
      {
        tieuDe: "The kit becomes a product",
        chiTiet:
          "ThingBot and the ThingEduBlock block-programming software launch, followed by the 2025–2026 ThingBot Kit. The FIRST Global journey goes on.",
      },
      {
        tieuDe: "Three Maker Hubs open their doors",
        chiTiet:
          "190 Xã Đàn and 29 Dương Khuê in Hanoi, and FPT Shop Quang Trung in Thanh Hóa. What was written down in 2017 finally has an address.",
      },
    ],
    canCu: "Source:",
    doNghe: {
      tieuDe: "Ten years of making the kit",
      moTa: "What got made was never these robots — it was the people who know how to make them.",
    },
  },
  cuaVao: {
    tieuDe: "How do you join the village?",
    moTa: "The first session is free, and you need to know nothing in advance.",
    timHub: "Find a Maker Hub near you",
    batDauChoi: "Start with the Play beat",
  },
};
