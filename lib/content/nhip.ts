import { NHIP_SLUGS, type NhipSlug } from "./nhip-slug";

/** Một hướng làm bên trong nhịp Làm. Ba hướng là song song, KHÔNG xếp hạng. */
export interface HuongLam {
  title: string;
  /** Trẻ làm được gì — viết trước, tên công cụ viết sau. */
  doing: string;
  tools: string[];
}

/** Nguyên tắc dẫn buổi học, lấy từ PHILOSOPHY.md của canon. */
export interface NguyenTac {
  title: string;
  desc: string;
}

export interface NhipInfo {
  slug: NhipSlug;
  ten: string;
  khauHieu: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  moTaNgan: string;
  /** Nhiều đoạn, ngăn nhau bằng dòng trống. */
  moTaDai: string;
  /** Nhịp này diễn ra thế nào tại một Làng Maker thật. */
  taiLangMaker: string;
  huyHieu: string;
  tenHuyHieu: string;
  /** Chỉ nhịp Chơi. */
  tramChoi?: string[];
  /** Chỉ nhịp Làm. */
  huong?: HuongLam[];
  /** Chỉ nhịp Làm. */
  nguyenTac?: NguyenTac[];
}

/**
 * Ba nhịp của vòng lặp Làng Maker. Nguồn: thingedu-canon
 * `00-CANON/PHILOSOPHY.md` mục 2, 3, 4, 7, 9 · `00-CANON/GLOSSARY.md` mục
 * 40, 42, 51 · `20-PROGRAM/LANG_MAKER_PLAYBOOK.md` mục 3.
 *
 * Đây là VÒNG LẶP chứ không phải thang bậc: xong Chia sẻ thì quay lại Chơi ở
 * vòng sau, chủ đề khó hơn. Mọi giao diện vẽ ba nhịp phải thể hiện đường quay lại.
 */
export const NHIP: NhipInfo[] = [
  {
    slug: "choi",
    ten: "Chơi",
    khauHieu: "Tò mò trước đã — chưa học gì cả",
    icon: "🎪",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    borderColor: "border-amber-300 dark:border-amber-500/30",
    moTaNgan:
      "Trẻ chạm, thử, làm hỏng rồi thử lại ở các trạm trò chơi. Không bài giảng, không điểm số — chỉ để bật ra một câu hỏi: cái này chạy kiểu gì?",
    moTaDai: `Nhịp đầu tiên không dạy gì cả. Việc duy nhất của nó là làm cho đứa trẻ muốn biết.

Trẻ đi giữa các trạm trò chơi, tự chọn trạm mình thích, chơi bao lâu tuỳ ý. Có trạm vẽ, có trạm vận động, có trạm xếp thẻ giấy điều khiển nhân vật. Người lớn đứng cạnh không giảng bài, chỉ hỏi lại khi trẻ thắc mắc.

Khi một đứa trẻ quay sang hỏi "sao nó lại chạy được?" thì nhịp Chơi đã xong việc của nó. Câu hỏi đó là thứ kéo trẻ sang nhịp tiếp theo — và nó phải đến từ chính đứa trẻ, không phải từ thời khoá biểu.`,
    taiLangMaker:
      "Bảo tàng Tò mò mở liên tục tại Làng Maker với năm nhóm trạm chơi. Cửa vào là buổi Hour of STEAM — trải nghiệm miễn phí 60–90 phút cho người mới vào cuối tuần, không cần biết trước gì, không cần mang theo gì. Dẫn trải nghiệm là hai nhân vật Faddy Dế và NEO Tre.",
    huyHieu: "🔍",
    tenHuyHieu: "Người Tò Mò",
    tramChoi: [
      "NEO Art Zone",
      "NEO Arcade",
      "NEO AI Sport",
      "NEO Sport",
      "NEO Paper Play",
    ],
  },
  {
    slug: "lam",
    ten: "Làm",
    khauHieu: "Bắt tay làm ra một thứ chạy được",
    icon: "🔨",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "border-emerald-300 dark:border-emerald-500/30",
    moTaNgan:
      "Bảy buổi cùng một người dẫn, để biến câu hỏi lúc chơi thành một sản phẩm thật — cầm được, chạy được, hỏng được và sửa được.",
    moTaDai: `Đây là phần dài nhất và cũng là phần khó nhất. Trẻ chọn một dự án đủ nhỏ để tự làm chủ hoàn toàn, nhưng đủ thật để nó chạy trên thiết bị thật chứ không dừng ở màn hình.

Trong bảy buổi, trẻ dựng, thử, hỏng, tìm ra vì sao hỏng, rồi sửa. Người dẫn không làm hộ và cũng không đưa đáp án — chỉ hỏi ngược để trẻ tự đọc được thông tin nằm trong cái lỗi.

Ba hướng làm bên dưới là ba lối vào song song, không phải ba cấp bậc. Một bạn mười tuổi có thể vào thẳng hướng robot; một bạn mười bốn tuổi có thể bắt đầu ở hướng điều khiển. Không ai phải xếp hàng leo bậc.`,
    taiLangMaker:
      "Bảy buổi dự án tại Làng Maker cùng Coach Maker, theo nguyên tắc 7+1 — bảy buổi làm và một buổi thứ tám để chia sẻ. Mỗi dự án là một thế giới thu nhỏ đủ để trẻ làm chủ trọn vẹn.",
    huyHieu: "🔨",
    tenHuyHieu: "Thợ Làm",
    huong: [
      {
        title: "Điều khiển & tư duy máy tính",
        doing:
          "Ra lệnh cho máy làm đúng ý mình — vẽ một hình, đi một đoạn, lặp lại mười lần mà không sai bước nào.",
        tools: ["KTurtle", "ThingEduBlock"],
      },
      {
        title: "Lập trình",
        doing:
          "Tự viết chương trình giải bài toán của chính mình, thay vì chép lại bài mẫu của người khác.",
        tools: ["Python"],
      },
      {
        title: "Robot, mạch điện & IoT",
        doing:
          "Làm cho một vật thật cử động được và cảm nhận được thế giới quanh nó.",
        tools: ["ThingBot", "Arduino", "NEO One"],
      },
    ],
    nguyenTac: [
      {
        title: "Chạm trước, ký hiệu sau",
        desc: "Tay chạm vật thật trước; code và công thức chỉ đến sau, khi trẻ đã có trải nghiệm cụ thể để ký hiệu bám vào.",
      },
      {
        title: "Khó mà vui",
        desc: "Dự án đủ khó để phải nghĩ thật, nhưng do chính trẻ chọn. Khó vì muốn làm, không phải khó vì bị ép.",
      },
      {
        title: "Lỗi là thông tin",
        desc: "Robot đi lệch không phải là thua. Người dẫn không sửa hộ, chỉ hỏi ngược: con nghĩ vì sao nó rẽ trái?",
      },
    ],
  },
  {
    slug: "chia-se",
    ten: "Chia sẻ",
    khauHieu: "Làm xong thì kể cho người khác nghe",
    icon: "🎤",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "border-blue-300 dark:border-blue-500/30",
    moTaNgan:
      "Trẻ tự đứng lên kể lại: mình định làm gì, hỏng chỗ nào, sửa ra sao. Kể được cho người khác hiểu mới là hiểu thật.",
    moTaDai: `Một sản phẩm chỉ thật sự thuộc về đứa trẻ khi nó kể lại được hành trình làm ra sản phẩm đó.

Buổi chia sẻ do chính trẻ tổ chức: tự dựng bàn, tự giới thiệu, tự trả lời câu hỏi của phụ huynh và của các bạn. Phần đáng giá nhất thường không phải sản phẩm chạy đẹp, mà là đoạn trẻ kể về chỗ mình làm hỏng.

Ở đây có một quy ước quan trọng: trình bày để được góp ý và giúp nhau, không phải để hơn thua. Ai làm xong sớm thì quay lại đỡ bạn còn loay hoay — và thường chính bạn đó là người học được nhiều nhất.

Chia sẻ xong không phải là tốt nghiệp. Nó dẫn ngược về nhịp Chơi cho vòng sau, với một câu hỏi khó hơn.`,
    taiLangMaker:
      "Buổi thứ tám của chương trình 7+1 mang tên Make & Share, tổ chức tại Làng Maker trước phụ huynh. Đi xa hơn thì có các cuộc thi robot trong nước và quốc tế, và con đường quay lại làm người dẫn cho lớp sau.",
    huyHieu: "🎤",
    tenHuyHieu: "Người Chia Sẻ",
  },
];

/** Tra nhịp theo slug. Slug đã được kiểu hoá nên luôn tìm thấy. */
export function getNhip(slug: NhipSlug): NhipInfo {
  const nhip = NHIP.find((n) => n.slug === slug);
  if (!nhip) {
    throw new Error(`Không có nhịp "${slug}" — NHIP và NHIP_SLUGS lệch nhau`);
  }
  return nhip;
}

/** Nhịp kế tiếp trong vòng lặp; sau nhịp cuối thì quay về nhịp đầu. */
export function nhipKeTiep(slug: NhipSlug): NhipInfo {
  const i = NHIP_SLUGS.indexOf(slug);
  return NHIP[(i + 1) % NHIP.length];
}
