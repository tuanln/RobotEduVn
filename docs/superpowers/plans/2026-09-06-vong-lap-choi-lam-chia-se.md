# Kế hoạch thi công: vòng lặp Chơi → Làm → Chia sẻ

> **Cho người thi công (kể cả agent):** BẮT BUỘC dùng skill
> `superpowers:subagent-driven-development` (khuyến nghị) hoặc
> `superpowers:executing-plans` để làm từng task một. Các bước dùng checkbox
> `- [ ]` để theo dõi.

**Mục tiêu:** Thay thang 5 bậc công cụ phần mềm trên robot.edu.vn bằng vòng lặp
ba nhịp Chơi → Làm → Chia sẻ đúng canon Làng Maker, mô tả chương trình thật
(Bảo tàng Tò mò · 7+1 · Make & Share) và bớt thiên tech.

**Kiến trúc:** Nguồn sự thật nội dung là một module mới `lib/content/nhip.ts`
export `NHIP: NhipInfo[]` (3 phần tử). Mọi trang, bộ lọc, sitemap và prompt AI
sinh ra từ mảng này — không nơi nào hardcode danh sách nhịp. Bốn URL của 3 giai
đoạn cũ được `next.config.ts` redirect 301 về nhịp tương ứng nên không mất SEO.
Giá trị dữ liệu cũ trong Firestore/Google Sheet được `normalizeNhipSlug()` dịch
sang nhịp mới lúc đọc, nên không cần migration.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
· shadcn/ui · Vitest (mới, chỉ dev) · Firebase · Google Sheets · Gemini.

**Spec:** `docs/superpowers/specs/2026-09-06-vong-lap-choi-lam-chia-se-design.md`
— đọc spec trước khi làm task đầu tiên.

## Ràng buộc toàn cục

Mọi task đều phải thoả các điều dưới đây, không nhắc lại trong từng task:

- **Ba nhịp và chỉ ba:** slug `choi` · `lam` · `chia-se`, đúng thứ tự đó.
- **Là vòng lặp, không phải thang.** Mọi chỗ vẽ ba nhịp phải có đường quay lại
  từ Chia sẻ về Chơi. Cấm đánh số "Bước 1/2/3" như bản 5 bậc cũ.
- **Không mở đầu bằng tên phần mềm.** Không câu/đoạn nào giới thiệu một nhịp
  được bắt đầu bằng: `GCompris`, `KTurtle`, `Python`, `Arduino`, `ThingBot`,
  `NEO One`, `ThingEduBlock`, `GitHub`. Tên công cụ chỉ xuất hiện ở cuối, dưới
  nhãn "đồ nghề".
- **Không đăng học phí** ở bất kỳ đâu (chốt 2026-09-06). Chỉ nói HoS miễn phí.
- **Không nêu tên người dịch** cuốn Mindstorms bản tiếng Việt, không hứa ngày
  phát hành.
- **Quy ước đặt tên:** khái niệm tiếng Việt là "nhịp". Trong code, union type
  đổi thành `NhipSlug`; module nội dung là `lib/content/nhip.ts` export `NHIP`.
  **Tên trường dữ liệu giữ nguyên** (`VideoItem.stage`, `Student.currentStage`)
  vì đó là hợp đồng với cột Google Sheet và document Firestore — đổi tên trường
  là migration dữ liệu, nằm ngoài phạm vi spec. Component `StageBadge` giữ
  nguyên tên file và tên hàm, chỉ đổi dữ liệu bên trong.
- **Cổng chất lượng cuối mỗi task:** `npx tsc --noEmit` sạch, `npx eslint .`
  sạch, `npx vitest run` xanh. Task nào đụng giao diện thì thêm
  `npx next build` xanh.
- **Commit từng task**, message tiếng Việt, kết thúc bằng:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

---

## Cấu trúc file

| File | Trách nhiệm | Việc |
|---|---|---|
| `lib/content/nhip.ts` | Nguồn sự thật 3 nhịp + `normalizeNhipSlug` | **Tạo** |
| `lib/content/stages.ts` | 5 giai đoạn cũ | **Xoá** |
| `lib/types.ts` | `NhipSlug` thay `LearningStage` | Sửa |
| `lib/content/videos.ts` | Gắn lại thẻ nhịp cho 15 video | Sửa |
| `lib/sheets.ts` | Chuẩn hoá slug khi đọc Google Sheet | Sửa |
| `next.config.ts` | 4 redirect 301 | Sửa |
| `app/(public)/hanh-trinh/page.tsx` | Trang vòng lặp | Viết lại |
| `app/(public)/hanh-trinh/[slug]/page.tsx` | Trang từng nhịp | Viết lại |
| `components/home/learning-journey.tsx` | Vòng lặp trên trang chủ | Viết lại |
| `components/home/hero-section.tsx` | Hero bớt tiếng Anh | Sửa |
| `app/(public)/page.tsx` | Ô số liệu "3 Nhịp" | Sửa |
| `app/opengraph-image.tsx` | Hàng 5 bậc → 3 nhịp | Sửa |
| `app/(public)/triet-ly/page.tsx` | 6 nguyên lý + khối Đọc Papert | Sửa |
| `app/(public)/cong-cu/page.tsx` | Khung "đồ nghề trong xưởng" | Sửa |
| `components/common/stage-badge.tsx` | 5 khoá → 3 khoá | Sửa |
| `components/video/video-filter.tsx` | Chip sinh từ `NHIP` | Sửa |
| `lib/gemini.ts` | Prompt theo 3 nhịp + 7+1 | Sửa |
| `lib/types/student.ts`, 2 trang dashboard | `currentStage` 3 giá trị | Sửa |
| `app/layout.tsx` | Từ khoá SEO | Sửa |
| `vitest.config.ts`, `lib/content/*.test.ts` | Bộ test | **Tạo** |

---

## Task 1: Bộ test và `normalizeNhipSlug`

Dựng chỗ để viết test (repo chưa có), rồi viết hàm dịch slug cũ → nhịp mới.
Hàm này là thứ giữ cho dữ liệu Firestore/Sheet cũ không vỡ.

**Files:**
- Tạo: `vitest.config.ts`
- Tạo: `lib/content/nhip-slug.ts`
- Tạo: `lib/content/nhip-slug.test.ts`
- Sửa: `package.json` (thêm devDependency + script `test`)

**Interfaces:**
- Consumes: chưa có gì.
- Produces: `type NhipSlug = "choi" | "lam" | "chia-se"`;
  `NHIP_SLUGS: readonly NhipSlug[]`;
  `normalizeNhipSlug(raw: string | undefined | null): NhipSlug`.

- [ ] **Bước 1: Cài vitest**

```bash
npm install -D vitest@^3
```

- [ ] **Bước 2: Tạo `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
});
```

- [ ] **Bước 3: Thêm script vào `package.json`**

Trong `"scripts"`, thêm dòng: `"test": "vitest run",`

- [ ] **Bước 4: Viết test trước khi có code**

Tạo `lib/content/nhip-slug.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { NHIP_SLUGS, normalizeNhipSlug } from "./nhip-slug";

describe("NHIP_SLUGS", () => {
  it("có đúng ba nhịp, đúng thứ tự vòng lặp", () => {
    expect(NHIP_SLUGS).toEqual(["choi", "lam", "chia-se"]);
  });
});

describe("normalizeNhipSlug", () => {
  it("giữ nguyên slug mới", () => {
    expect(normalizeNhipSlug("choi")).toBe("choi");
    expect(normalizeNhipSlug("lam")).toBe("lam");
    expect(normalizeNhipSlug("chia-se")).toBe("chia-se");
  });

  it("dịch 5 giai đoạn cũ sang nhịp tương ứng", () => {
    expect(normalizeNhipSlug("kham-pha")).toBe("choi");
    expect(normalizeNhipSlug("tu-duy")).toBe("lam");
    expect(normalizeNhipSlug("lap-trinh")).toBe("lam");
    expect(normalizeNhipSlug("iot-robot")).toBe("lam");
    expect(normalizeNhipSlug("chia-se")).toBe("chia-se");
  });

  it("giá trị lạ hoặc rỗng thì về nhịp đầu tiên, không ném lỗi", () => {
    expect(normalizeNhipSlug("khong-ton-tai")).toBe("choi");
    expect(normalizeNhipSlug("")).toBe("choi");
    expect(normalizeNhipSlug(undefined)).toBe("choi");
    expect(normalizeNhipSlug(null)).toBe("choi");
  });

  it("không phân biệt hoa thường và khoảng trắng thừa từ Google Sheet", () => {
    expect(normalizeNhipSlug(" IoT-Robot ")).toBe("lam");
    expect(normalizeNhipSlug("Chia-Se")).toBe("chia-se");
  });
});
```

- [ ] **Bước 5: Chạy test để thấy nó FAIL**

Chạy: `npx vitest run lib/content/nhip-slug.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./nhip-slug"`.

- [ ] **Bước 6: Viết code tối thiểu cho test xanh**

Tạo `lib/content/nhip-slug.ts`:

```ts
/**
 * Slug ba nhịp của vòng lặp Chơi → Làm → Chia sẻ.
 * Thứ tự trong mảng chính là thứ tự vòng lặp; đừng đổi.
 */
export const NHIP_SLUGS = ["choi", "lam", "chia-se"] as const;

export type NhipSlug = (typeof NHIP_SLUGS)[number];

/**
 * Bản đồ 5 giai đoạn cũ → 3 nhịp mới. Giữ lại vĩnh viễn: document Firestore và
 * dòng Google Sheet tạo trước 09/2026 vẫn mang giá trị cũ, chuẩn hoá lúc đọc
 * rẻ hơn và an toàn hơn là migration dữ liệu.
 */
const SLUG_CU: Record<string, NhipSlug> = {
  "kham-pha": "choi",
  "tu-duy": "lam",
  "lap-trinh": "lam",
  "iot-robot": "lam",
  "chia-se": "chia-se",
};

export function normalizeNhipSlug(
  raw: string | undefined | null
): NhipSlug {
  const key = (raw ?? "").trim().toLowerCase();
  if ((NHIP_SLUGS as readonly string[]).includes(key)) {
    return key as NhipSlug;
  }
  return SLUG_CU[key] ?? NHIP_SLUGS[0];
}
```

- [ ] **Bước 7: Chạy test để thấy nó PASS**

Chạy: `npx vitest run lib/content/nhip-slug.test.ts`
Kỳ vọng: PASS, 4 test.

- [ ] **Bước 8: Phá hỏng có chủ đích để chứng minh test bắt được lỗi**

Sửa tạm `SLUG_CU`, đổi `"iot-robot": "lam"` thành `"iot-robot": "choi"`.
Chạy lại: `npx vitest run lib/content/nhip-slug.test.ts`
Kỳ vọng: **FAIL** ở test "dịch 5 giai đoạn cũ" với
`expected 'choi' to be 'lam'`.
Nếu vẫn PASS thì test vô dụng — dừng lại và sửa test.
**Khôi phục lại `"iot-robot": "lam"` rồi chạy lại cho xanh.**

- [ ] **Bước 9: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/content/nhip-slug.ts lib/content/nhip-slug.test.ts
git commit -m "$(cat <<'MSG'
test: thêm vitest và normalizeNhipSlug dịch slug 5 giai đoạn cũ sang 3 nhịp

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 2: Nội dung ba nhịp — `lib/content/nhip.ts`

Trái tim của cả thay đổi. Viết nội dung ba nhịp theo canon, kèm test bất biến
canh cho quy tắc "không mở đầu bằng tên phần mềm".

**Files:**
- Tạo: `lib/content/nhip.ts`
- Tạo: `lib/content/nhip.test.ts`

**Interfaces:**
- Consumes: `NhipSlug`, `NHIP_SLUGS` từ `lib/content/nhip-slug.ts` (Task 1).
- Produces: `NHIP: NhipInfo[]` (3 phần tử, đúng thứ tự vòng lặp);
  `getNhip(slug: NhipSlug): NhipInfo`;
  và các interface `NhipInfo`, `HuongLam`, `NguyenTac` với đúng các trường
  dùng ở Task 5–8:
  `slug · ten · khauHieu · icon · color · bgColor · borderColor · moTaNgan ·
  moTaDai · taiLangMaker · huyHieu · tenHuyHieu · tramChoi? · huong? · nguyenTac?`

- [ ] **Bước 1: Viết test trước**

Tạo `lib/content/nhip.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { NHIP, getNhip } from "./nhip";
import { NHIP_SLUGS } from "./nhip-slug";

const TEN_PHAN_MEM = [
  "GCompris",
  "KTurtle",
  "Python",
  "Arduino",
  "ThingBot",
  "NEO One",
  "ThingEduBlock",
  "GitHub",
];

describe("NHIP", () => {
  it("có đúng ba nhịp, đúng thứ tự vòng lặp", () => {
    expect(NHIP.map((n) => n.slug)).toEqual([...NHIP_SLUGS]);
  });

  it("không mô tả nào mở đầu bằng tên phần mềm", () => {
    for (const nhip of NHIP) {
      for (const doan of [nhip.moTaNgan, nhip.khauHieu, nhip.taiLangMaker]) {
        for (const ten of TEN_PHAN_MEM) {
          expect(
            doan.trimStart().startsWith(ten),
            `Nhịp "${nhip.ten}" mở đầu bằng "${ten}": ${doan.slice(0, 60)}`
          ).toBe(false);
        }
      }
    }
  });

  it("không chỗ nào của nhịp nhắc tới học phí", () => {
    const tuCam = ["học phí", "600k", "600.000", "đồng/tháng", "vnđ"];
    const toanBoChu = NHIP.map((n) =>
      [n.khauHieu, n.moTaNgan, n.moTaDai, n.taiLangMaker].join(" ")
    )
      .join(" ")
      .toLowerCase();
    for (const tu of tuCam) {
      expect(toanBoChu.includes(tu), `còn nhắc "${tu}"`).toBe(false);
    }
  });

  it("nhịp Chơi liệt kê đúng 5 trạm Bảo tàng Tò mò", () => {
    const choi = getNhip("choi");
    expect(choi.tramChoi).toEqual([
      "NEO Art Zone",
      "NEO Arcade",
      "NEO AI Sport",
      "NEO Sport",
      "NEO Paper Play",
    ]);
  });

  it("nhịp Làm có 3 hướng song song và 3 nguyên tắc dẫn buổi học", () => {
    const lam = getNhip("lam");
    expect(lam.huong).toHaveLength(3);
    expect(lam.nguyenTac).toHaveLength(3);
    for (const h of lam.huong ?? []) {
      expect(h.tools.length).toBeGreaterThan(0);
    }
  });

  it("chỉ nhịp Chơi có trạm chơi, chỉ nhịp Làm có hướng và nguyên tắc", () => {
    expect(getNhip("lam").tramChoi).toBeUndefined();
    expect(getNhip("chia-se").huong).toBeUndefined();
    expect(getNhip("choi").nguyenTac).toBeUndefined();
  });

  it("mọi nhịp đều nói được nó diễn ra thế nào tại Làng Maker", () => {
    for (const nhip of NHIP) {
      expect(nhip.taiLangMaker.length).toBeGreaterThan(40);
    }
  });
});

describe("getNhip", () => {
  it("trả đúng nhịp theo slug", () => {
    expect(getNhip("chia-se").ten).toBe("Chia sẻ");
  });
});
```

- [ ] **Bước 2: Chạy test để thấy FAIL**

Chạy: `npx vitest run lib/content/nhip.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./nhip"`.

- [ ] **Bước 3: Viết `lib/content/nhip.ts`**

```ts
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
      "Bảo tàng Tò mò mở liên tục tại Làng Maker với năm nhóm trạm chơi. Cửa vào là buổi Hour of STEAM — trải nghiệm miễn phí 60–90 phút cho người mới vào cuối tuần, không cần biết trước gì, không cần mang theo gì.",
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
```

- [ ] **Bước 4: Chạy test để thấy PASS**

Chạy: `npx vitest run`
Kỳ vọng: PASS toàn bộ (Task 1 + Task 2).

- [ ] **Bước 5: Phá hỏng có chủ đích ba lần**

Mỗi lần sửa, chạy `npx vitest run lib/content/nhip.test.ts`, xác nhận FAIL đúng
test mong đợi, rồi **khôi phục nguyên trạng**:

1. Đổi `moTaNgan` của nhịp Làm thành `"Python là ngôn ngữ..."`
   → phải FAIL ở test "không mô tả nào mở đầu bằng tên phần mềm".
2. Thêm `" Học phí 600k/tháng."` vào cuối `taiLangMaker` của nhịp Làm
   → phải FAIL ở test "không chỗ nào của nhịp nhắc tới học phí".
3. Xoá một phần tử khỏi `huong` của nhịp Làm
   → phải FAIL ở test "nhịp Làm có 3 hướng song song".

Nếu bất kỳ lần nào vẫn PASS thì test đó vô dụng — sửa test rồi làm lại.

- [ ] **Bước 6: Chạy lại toàn bộ cổng chất lượng**

```bash
npx vitest run && npx tsc --noEmit && npx eslint .
```

- [ ] **Bước 7: Commit**

```bash
git add lib/content/nhip.ts lib/content/nhip.test.ts
git commit -m "$(cat <<'MSG'
feat: nội dung ba nhịp Chơi - Làm - Chia sẻ theo canon Làng Maker

Kèm test bất biến canh hai quy tắc của spec: không mô tả nào mở đầu
bằng tên phần mềm, và không chỗ nào nhắc học phí.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 3: Chuyển mô hình dữ liệu sang ba nhịp (app vẫn chạy)

Đổi kiểu, xoá module cũ, gắn lại thẻ video, và sửa **mọi** nơi tiêu thụ để
`tsc` và `next build` vẫn xanh. Task này cố ý chỉ sửa cơ học — nội dung và giao
diện để các task sau. Kết thúc task, site chạy được với ba nhịp nhưng giao diện
còn thô.

**Files:**
- Sửa: `lib/types.ts`, `lib/types/student.ts`, `lib/content/videos.ts`,
  `lib/sheets.ts`, `lib/gemini.ts`, `app/sitemap.ts`,
  `components/common/stage-badge.tsx`, `components/video/video-filter.tsx`,
  `components/video/video-hub-content.tsx`, `components/home/hero-section.tsx`,
  `components/home/learning-journey.tsx`, `app/(public)/page.tsx`,
  `app/(public)/hanh-trinh/page.tsx`, `app/(public)/hanh-trinh/[slug]/page.tsx`,
  `app/dashboard/students/new/page.tsx`, `app/dashboard/students/[id]/page.tsx`
- Xoá: `lib/content/stages.ts`
- Tạo: `lib/content/videos.test.ts`

**Interfaces:**
- Consumes: `NHIP`, `getNhip`, `NhipInfo` (Task 2); `NhipSlug`,
  `normalizeNhipSlug` (Task 1).
- Produces: `lib/types.ts` export `type NhipSlug` (re-export từ
  `lib/content/nhip-slug`) và bỏ hẳn `LearningStage`. `VideoItem.stage: NhipSlug`.
  `Student.currentStage: NhipSlug`.

- [ ] **Bước 1: Viết test gắn thẻ video trước**

Tạo `lib/content/videos.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { VIDEOS } from "./videos";
import { NHIP_SLUGS } from "./nhip-slug";

describe("VIDEOS", () => {
  it("mọi video đều mang slug nhịp hợp lệ, không còn slug 5 bậc cũ", () => {
    for (const v of VIDEOS) {
      expect(
        (NHIP_SLUGS as readonly string[]).includes(v.stage),
        `video "${v.id}" còn slug "${v.stage}"`
      ).toBe(true);
    }
  });

  it("video kỹ thuật vào nhịp Làm", () => {
    const idLam = [
      "mv-thingbot-kit-2026",
      "mv-thingbot-gioi-thieu",
      "mv-thingbot-phan-cung",
      "mv-cobot-lap-rap",
      "mv-arduino-bai-1",
      "mv-arduino-bai-2",
      "mv-thingedublock",
    ];
    for (const id of idLam) {
      expect(VIDEOS.find((v) => v.id === id)?.stage, id).toBe("lam");
    }
  });

  it("video thi đấu và cộng đồng vào nhịp Chia sẻ", () => {
    const idChiaSe = [
      "mv-maker-tutor-b3",
      "mv-vrc-2022-chung-ket",
      "mv-vsc-vrc-2020-2022",
      "mv-fgc-2022-welcome",
      "mv-fgc-2022-before",
      "mv-fgc-2022-geneva",
      "mv-mobile-maker-explora",
      "mv-mobile-maker-fschool",
    ];
    for (const id of idChiaSe) {
      expect(VIDEOS.find((v) => v.id === id)?.stage, id).toBe("chia-se");
    }
  });

  it("mọi id là duy nhất", () => {
    expect(new Set(VIDEOS.map((v) => v.id)).size).toBe(VIDEOS.length);
  });
});
```

- [ ] **Bước 2: Chạy test để thấy FAIL**

Chạy: `npx vitest run lib/content/videos.test.ts`
Kỳ vọng: FAIL — video đang mang slug `iot-robot` / `tu-duy`.

- [ ] **Bước 3: Đổi kiểu trong `lib/types.ts`**

Xoá khối `export type LearningStage = ...` (5 giá trị) và thay bằng:

```ts
export type { NhipSlug } from "./content/nhip-slug";
import type { NhipSlug } from "./content/nhip-slug";
```

Trong `VideoItem`, đổi `stage: LearningStage;` thành `stage: NhipSlug;`.
Xoá `StageInfo` (nay đã do `NhipInfo` thay thế).

- [ ] **Bước 4: Sửa cơ học các nơi dùng `LearningStage`**

Thay `LearningStage` → `NhipSlug` và đổi import sang `@/lib/types` tại:
`lib/types/student.ts`, `lib/sheets.ts`, `components/video/video-filter.tsx`,
`components/video/video-hub-content.tsx`,
`app/dashboard/students/new/page.tsx`, `app/dashboard/students/[id]/page.tsx`.

Trong hai trang dashboard, thay mảng `STAGES` cứng 5 phần tử bằng:

```tsx
import { NHIP } from "@/lib/content/nhip";
// ...
const NHIP_OPTIONS = NHIP.map((n) => ({ value: n.slug, label: n.ten }));
```

rồi đổi chỗ `.map` tương ứng sang `NHIP_OPTIONS`.

- [ ] **Bước 5: Gắn lại thẻ 15 video trong `lib/content/videos.ts`**

Đổi `stage: "iot-robot"` → `stage: "lam"` (6 video ThingBot/CoBot/Arduino),
`stage: "tu-duy"` → `stage: "lam"` (video ThingEduBlock), giữ nguyên
`stage: "chia-se"` (8 video còn lại). Cập nhật comment đầu file: hai giai đoạn
trống nay là **nhịp Chơi** chưa có video.

- [ ] **Bước 6: Chuẩn hoá slug khi đọc Google Sheet trong `lib/sheets.ts`**

Trong `parseVideos`, đổi

```ts
stage: (row[4] || "kham-pha") as LearningStage,
```

thành

```ts
stage: normalizeNhipSlug(row[4]),
```

và thêm `import { normalizeNhipSlug } from "./content/nhip-slug";` ở đầu file.
Đổi `import { VIDEOS } ...` giữ nguyên; bỏ import `STAGES` nếu có.

- [ ] **Bước 7: Sửa 3 khoá của `components/common/stage-badge.tsx`**

```tsx
import { Badge } from "@/components/ui/badge";
import { NhipSlug } from "@/lib/types";
import { getNhip } from "@/lib/content/nhip";

/** Nhãn nhịp. Màu lấy từ chính dữ liệu nhịp nên không lệch với các trang khác. */
export function StageBadge({ stage }: { stage: NhipSlug }) {
  const nhip = getNhip(stage);
  return (
    <Badge
      variant="outline"
      className={`${nhip.bgColor} ${nhip.color} ${nhip.borderColor}`}
    >
      {nhip.ten}
    </Badge>
  );
}
```

- [ ] **Bước 8: Sinh chip lọc từ `NHIP` trong `components/video/video-filter.tsx`**

Thay mảng `stages` cứng bằng:

```tsx
import { NHIP } from "@/lib/content/nhip";

const stages: { value: NhipSlug | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  ...NHIP.map((n) => ({ value: n.slug, label: n.ten })),
];
```

- [ ] **Bước 9: Đổi mọi import `STAGES` sang `NHIP` rồi xoá module cũ**

Tại `app/sitemap.ts`, `lib/gemini.ts`, `app/(public)/page.tsx`,
`components/home/hero-section.tsx`, `components/home/learning-journey.tsx`,
`app/(public)/hanh-trinh/page.tsx`, `app/(public)/hanh-trinh/[slug]/page.tsx`:
đổi `import { STAGES } from "@/lib/content/stages"` thành
`import { NHIP } from "@/lib/content/nhip"`, đổi `STAGES` → `NHIP`, và đổi tên
trường: `titleVi` → `ten`, `description` → `moTaNgan`,
`longDescription` → `moTaDai`, `badgeName` → `tenHuyHieu`, `badge` → `huyHieu`.
Bỏ mọi chỗ dùng `stage.ageRange`, `stage.title`, `stage.tools`, `stage.skills`
(các trường này không còn) — ở task này cứ xoá đoạn hiển thị chúng, task 5 và 6
sẽ dựng lại giao diện đúng.

Sau đó: `git rm lib/content/stages.ts`

- [ ] **Bước 10: Cổng chất lượng**

```bash
npx vitest run && npx tsc --noEmit && npx eslint . && npx next build
```
Kỳ vọng: tất cả xanh. `next build` phải in ra `/hanh-trinh/choi`,
`/hanh-trinh/lam`, `/hanh-trinh/chia-se` trong danh sách route SSG.

- [ ] **Bước 11: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
refactor: chuyển mô hình 5 giai đoạn sang 3 nhịp, app vẫn chạy

Đổi LearningStage thành NhipSlug, xoá lib/content/stages.ts, gắn lại
thẻ nhịp cho 15 video, chuẩn hoá slug cũ khi đọc Google Sheet.
Giao diện còn thô, task sau dựng lại.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 4: Redirect 4 URL cũ và sitemap

Giữ SEO: bốn đường dẫn của giai đoạn cũ phải dẫn về nhịp tương ứng, không 404.

**Files:**
- Sửa: `next.config.ts`
- Kiểm: `app/sitemap.ts` (đã sinh từ `NHIP` sau Task 3)

**Interfaces:**
- Consumes: slug nhịp từ Task 1.
- Produces: 4 redirect 301 cố định (khai báo tĩnh, không import module app —
  `next.config.ts` chạy ở tầng cấu hình).

- [ ] **Bước 1: Viết redirect vào `next.config.ts`**

```ts
import type { NextConfig } from "next";

/**
 * Bốn giai đoạn cũ đã gộp vào ba nhịp (spec 2026-09-06 mục 4.2). Giữ redirect
 * vĩnh viễn: các link này đã nằm trong sitemap và có thể đã được chia sẻ.
 * `chia-se` trùng tên slug cũ nên không cần redirect.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/hanh-trinh/kham-pha", destination: "/hanh-trinh/choi", permanent: true },
      { source: "/hanh-trinh/tu-duy", destination: "/hanh-trinh/lam", permanent: true },
      { source: "/hanh-trinh/lap-trinh", destination: "/hanh-trinh/lam", permanent: true },
      { source: "/hanh-trinh/iot-robot", destination: "/hanh-trinh/lam", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Bước 2: Chạy dev và kiểm bằng curl**

```bash
npm run dev &
sleep 8
for u in kham-pha tu-duy lap-trinh iot-robot chia-se; do
  echo -n "$u -> "
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "http://localhost:3000/hanh-trinh/$u"
done
```

Kỳ vọng: `kham-pha` → `308` về `/hanh-trinh/choi`; `tu-duy`, `lap-trinh`,
`iot-robot` → `308` về `/hanh-trinh/lam`; `chia-se` → `200` (không redirect).
Next trả 308 cho `permanent: true` — đúng, đó là redirect vĩnh viễn giữ nguyên
method.

- [ ] **Bước 3: Kiểm sitemap không còn slug cũ**

```bash
curl -s http://localhost:3000/sitemap.xml | grep -c "kham-pha\|tu-duy\|lap-trinh\|iot-robot"
curl -s http://localhost:3000/sitemap.xml | grep -c "hanh-trinh/choi\|hanh-trinh/lam"
```

Kỳ vọng: lệnh đầu in `0`, lệnh sau in `2`.

- [ ] **Bước 4: Commit**

```bash
git add next.config.ts
git commit -m "$(cat <<'MSG'
feat: redirect 301 bốn URL giai đoạn cũ về nhịp tương ứng

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 5: Trang Hành Trình và trang từng nhịp

**Files:**
- Viết lại: `app/(public)/hanh-trinh/page.tsx`
- Viết lại: `app/(public)/hanh-trinh/[slug]/page.tsx`
- Tạo: `components/nhip/vong-lap.tsx`

**Interfaces:**
- Consumes: `NHIP`, `getNhip`, `nhipKeTiep`, `NhipInfo` (Task 2).
- Produces: `<VongLap />` — sơ đồ ba nhịp có đường quay lại, dùng lại ở Task 6.

- [ ] **Bước 1: Tạo `components/nhip/vong-lap.tsx`**

```tsx
import Link from "next/link";
import { NHIP } from "@/lib/content/nhip";

/**
 * Sơ đồ vòng lặp ba nhịp. Điểm bắt buộc theo spec: có đường quay lại từ nhịp
 * cuối về nhịp đầu — đây là thứ phân biệt vòng lặp với thang bậc.
 */
export function VongLap({ dangO }: { dangO?: string }) {
  return (
    <div className="relative">
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {NHIP.map((nhip) => (
          <li key={nhip.slug}>
            <Link
              href={`/hanh-trinh/${nhip.slug}`}
              aria-current={dangO === nhip.slug ? "page" : undefined}
              className={`flex h-full flex-col rounded-2xl border p-6 transition-all hover:shadow-lg ${nhip.borderColor} ${nhip.bgColor} ${
                dangO === nhip.slug ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
              }`}
            >
              <span className="text-4xl" aria-hidden>
                {nhip.icon}
              </span>
              <h3 className={`mt-3 text-2xl font-extrabold ${nhip.color}`}>
                {nhip.ten}
              </h3>
              <p className="mt-1 text-sm font-medium">{nhip.khauHieu}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {nhip.moTaNgan}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span aria-hidden>{nhip.huyHieu}</span>
                {nhip.tenHuyHieu}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      {/* Đường quay lại — vòng lặp, không phải thang bậc */}
      <p className="mt-6 flex items-center justify-center gap-2 rounded-full border border-dashed border-primary/40 bg-primary/5 px-5 py-3 text-center text-sm">
        <span aria-hidden>↻</span>
        Chia sẻ xong thì quay lại Chơi ở vòng sau, với câu hỏi khó hơn
      </p>
    </div>
  );
}
```

- [ ] **Bước 2: Viết lại `app/(public)/hanh-trinh/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VongLap } from "@/components/nhip/vong-lap";

export const metadata: Metadata = {
  title: "Cách Học Ở Làng Maker",
  description:
    "Ba nhịp lặp lại: chơi cho tò mò, bắt tay làm ra sản phẩm thật, rồi kể lại cho người khác. Không phải thang bậc — là vòng lặp.",
};

export default function HanhTrinhPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Cách Học Ở Làng Maker"
          subtitle="Ba nhịp lặp đi lặp lại — không ai phải leo bậc, ai cũng đi qua đủ ba"
        />
        <VongLap />
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Từ 4 đến 18 tuổi đều đi qua đủ ba nhịp này. Khác nhau không nằm ở nhịp
          nào, mà ở độ khó của thứ trẻ chọn làm.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Bước 3: Viết lại `app/(public)/hanh-trinh/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import { NHIP, getNhip, nhipKeTiep } from "@/lib/content/nhip";
import { NHIP_SLUGS, type NhipSlug } from "@/lib/content/nhip-slug";
import { getVideos } from "@/lib/sheets";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return NHIP.map((nhip) => ({ slug: nhip.slug }));
}

function laSlugNhip(slug: string): slug is NhipSlug {
  return (NHIP_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!laSlugNhip(slug)) return { title: "Không tìm thấy" };
  const nhip = getNhip(slug);
  return { title: `Nhịp ${nhip.ten}`, description: nhip.moTaNgan };
}

export default async function NhipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!laSlugNhip(slug)) notFound();

  const nhip = getNhip(slug);
  const keTiep = nhipKeTiep(slug);
  const videos = await getVideos();
  const coVideo = videos.some((v) => v.stage === slug);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/hanh-trinh" className="hover:text-foreground">
            Cách Học Ở Làng Maker
          </Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className={nhip.color}>{nhip.ten}</span>
        </nav>

        <header
          className={`rounded-2xl border-2 ${nhip.borderColor} ${nhip.bgColor} p-8 text-center`}
        >
          <span className="text-7xl" aria-hidden>{nhip.icon}</span>
          <h1 className={`mt-4 text-4xl font-extrabold ${nhip.color}`}>
            {nhip.ten}
          </h1>
          <p className="mt-2 text-lg font-medium">{nhip.khauHieu}</p>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden>{nhip.huyHieu}</span>
            {nhip.tenHuyHieu}
          </p>
        </header>

        <div className="mt-8 space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            {nhip.moTaDai.split("\n\n").map((doan, i) => (
              <p key={i} className="mb-3 leading-relaxed text-muted-foreground">
                {doan}
              </p>
            ))}
          </section>

          <section className="rounded-xl border border-primary/40 bg-primary/5 p-6">
            <h2 className="text-xl font-bold">Tại Làng Maker</h2>
            <p className="mt-2 text-muted-foreground">{nhip.taiLangMaker}</p>
          </section>

          {nhip.tramChoi && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">Năm nhóm trạm chơi</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {nhip.tramChoi.map((tram) => (
                  <span
                    key={tram}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium ${nhip.borderColor} ${nhip.bgColor}`}
                  >
                    {tram}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Buổi trải nghiệm đầu tiên miễn phí, 60–90 phút, cuối tuần. Không
                cần biết trước gì, không cần mang theo gì.
              </p>
            </section>
          )}

          {nhip.huong && (
            <section>
              <h2 className="text-xl font-bold">Ba hướng làm, đi song song</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Không phải ba cấp bậc. Trẻ chọn hướng vừa tay với thứ mình đang
                muốn làm.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {nhip.huong.map((h) => (
                  <div
                    key={h.title}
                    className="flex flex-col rounded-xl border border-border bg-card p-5"
                  >
                    <h3 className="font-bold">{h.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {h.doing}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Đồ nghề
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {h.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {nhip.nguyenTac && (
            <section>
              <h2 className="text-xl font-bold">Ba nguyên tắc dẫn buổi học</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {nhip.nguyenTac.map((nt) => (
                  <div
                    key={nt.title}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <h3 className="font-bold">{nt.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {nt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {coVideo ? (
            <section className="rounded-xl border border-border bg-card p-6 text-center">
              <h2 className="text-xl font-bold">Video của nhịp này</h2>
              <Button asChild className="mt-4">
                <Link href={`/video-hub?stage=${nhip.slug}`}>
                  Xem Video Hub <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </section>
          ) : (
            <section className="rounded-xl border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Nhịp này chưa có video — vì nó vốn để trải nghiệm trực tiếp.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/cong-dong/maker-hub">Tìm Maker Hub gần bạn</Link>
              </Button>
            </section>
          )}

          {/* Vòng lặp: sau nhịp cuối thì dẫn ngược về nhịp đầu */}
          <div className="flex justify-end">
            <Button asChild size="lg">
              <Link href={`/hanh-trinh/${keTiep.slug}`}>
                {slug === "chia-se" ? (
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
                ) : null}
                Nhịp tiếp theo: {keTiep.ten}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Bước 4: Cổng chất lượng và xem thật**

```bash
npx tsc --noEmit && npx eslint . && npx next build
npm run dev
```
Mở lần lượt `/hanh-trinh`, `/hanh-trinh/choi`, `/hanh-trinh/lam`,
`/hanh-trinh/chia-se` ở **cả giao diện sáng và tối**. Kiểm bằng mắt:
không trang nào in "Bước N"; trang Chơi có đủ 5 trạm; trang Làm có 3 hướng +
3 nguyên tắc; trang Chia sẻ có nút dẫn ngược về Chơi; trang Chơi hiện dòng
"chưa có video" chứ không phải nút Video Hub rỗng. Không lỗi console.

- [ ] **Bước 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: trang Hành Trình và ba trang nhịp theo vòng lặp

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 6: Trang chủ, hero và ảnh OG

**Files:**
- Viết lại: `components/home/learning-journey.tsx`
- Sửa: `components/home/hero-section.tsx`
- Sửa: `app/(public)/page.tsx`
- Sửa: `app/opengraph-image.tsx`

**Interfaces:**
- Consumes: `NHIP` (Task 2), `<VongLap />` (Task 5).

- [ ] **Bước 1: `learning-journey.tsx` dùng lại `<VongLap />`**

Xoá toàn bộ hai nhánh desktop/mobile cũ (đánh số 1–5, mũi tên một chiều) và
thay thân component bằng `<SectionHeader …/>` + `<VongLap />` + link
"Xem chi tiết cách học →". Đổi tiêu đề mục thành **"Ba Nhịp Lặp Lại"**, phụ đề
`'Theo triết lý Kiến tạo của Seymour Papert — "Học bằng làm"'`.
Component không còn cần `"use client"` — bỏ dòng đó.

- [ ] **Bước 2: Hero bớt tiếng Anh**

Trong `components/home/hero-section.tsx`:
- Đổi `<h1>` thành: `Chơi ` + `<span gradient>Làm</span>` + ` Chia sẻ` —
  bỏ hẳn cụm "Khám Phá STEM & Robotics" (hai từ tiếng Anh to nhất trang).
- Đổi đoạn dưới `<h1>` thành:
  `"Ba nhịp lặp lại ở Làng Maker: chơi cho tò mò, bắt tay làm ra thứ chạy được, rồi kể lại cho người khác nghe."`
- Hàng chip: đổi `STAGES` → `NHIP`, nhãn dùng `nhip.ten`.
- Nút chính đổi chữ thành `"Xem cách học"`, giữ `href="/hanh-trinh"`.

- [ ] **Bước 3: Ô số liệu thứ tư trong `app/(public)/page.tsx`**

```tsx
{ value: NHIP.length, label: "Nhịp", note: "lặp lại, vòng sau khó hơn" },
```

- [ ] **Bước 4: Hàng chữ đáy ảnh OG trong `app/opengraph-image.tsx`**

Thay khối 5 bậc bằng:

```tsx
<div style={{ marginTop: 56, display: "flex", gap: 16, fontSize: 30, color: "#7dd3a8" }}>
  <span>Chơi</span><span>→</span>
  <span>Làm</span><span>→</span>
  <span>Chia sẻ</span><span>↻</span>
</div>
```

- [ ] **Bước 5: Cổng chất lượng và xem ảnh OG thật**

```bash
npx tsc --noEmit && npx eslint . && npx next build
cp .next/server/app/opengraph-image.body /tmp/og-nhip.png && file /tmp/og-nhip.png
```
Mở `/tmp/og-nhip.png` xem bằng mắt: phải đủ dấu tiếng Việt và đọc được
`Chơi → Làm → Chia sẻ ↻`. Mở trang chủ ở cả hai giao diện sáng/tối.

- [ ] **Bước 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: trang chủ và ảnh OG theo vòng lặp ba nhịp, hero bỏ tiêu đề tiếng Anh

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 7: Trang Triết Lý và khối "Đọc Papert"

**Files:**
- Sửa: `app/(public)/triet-ly/page.tsx`
- Tạo: `components/nhip/doc-papert.tsx`

**Interfaces:**
- Consumes: không.
- Produces: `<DocPapert />` — khối link sách, đặt cuối trang Triết Lý.

- [ ] **Bước 1: Kiểm ba link còn sống TRƯỚC khi viết code**

```bash
curl -sIL -m 60 "https://dam-prod.media.mit.edu/x/2025/01/27/Mindstorms.pdf" -w "PDF: %{http_code} %{content_type}\n" -o /dev/null
curl -sIL -m 30 "https://www.media.mit.edu/publications/mindstorms/" -w "MIT: %{http_code}\n" -o /dev/null
curl -sIL -m 30 "https://archive.org/details/mindstormschildr0000pape" -w "IA:  %{http_code}\n" -o /dev/null
```

Kỳ vọng: PDF `200 application/pdf`; MIT `200`; IA `200`.
**Nếu link PDF không còn 200:** đừng đoán URL mới — chỉ giữ hai link còn sống,
ghi rõ trong commit là link PDF đã chết, và báo lại chủ dự án.

- [ ] **Bước 2: Tạo `components/nhip/doc-papert.tsx`**

```tsx
import { BookOpen, Download, ExternalLink } from "lucide-react";

/**
 * Canon DOMAIN_MAP mục 1: vai trò số một của robot.edu.vn là "phổ cập Papert".
 * Link PDF nằm trên CDN của MIT nên có thể đổi — luôn kèm link trang chủ MIT
 * và bản Internet Archive để người đọc tự tìm lại được.
 * Ba link kiểm tra HTTP 200 ngày 2026-09-06.
 */
export function DocPapert() {
  return (
    <section className="rounded-2xl border border-border bg-card p-8">
      <div className="flex items-start gap-4">
        <BookOpen className="mt-1 h-6 w-6 flex-shrink-0 text-primary" aria-hidden />
        <div>
          <h2 className="text-xl font-bold">Đọc Papert</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Toàn bộ cách học ở Làng Maker bắt nguồn từ một cuốn sách năm 1980 của
            Seymour Papert: <em>Mindstorms — Children, Computers, and Powerful
            Ideas</em>. MIT Media Lab đăng công khai bản đầy đủ, miễn phí, với sự
            cho phép của gia đình Papert.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://dam-prod.media.mit.edu/x/2025/01/27/Mindstorms.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" aria-hidden />
              Tải sách bản gốc
              <span className="opacity-70">(PDF, 60 MB)</span>
            </a>
            <a
              href="https://archive.org/details/mindstormschildr0000pape"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Đọc trực tuyến, không cần tải
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Nguồn chính thức:{" "}
            <a
              href="https://www.media.mit.edu/publications/mindstorms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              trang xuất bản của MIT Media Lab
            </a>
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
            <p className="text-sm">
              <span className="font-semibold">Bản tiếng Việt đang được cộng
              đồng dịch</span>, kèm <em>Chuyện Làng Maker</em> sau mỗi chương —
              kể lại mười năm Maker Việt đã sống với đúng ý tưởng của chương đó
              ra sao.
            </p>
            <a
              href="mailto:lang@makerviet.org?subject=Nhận%20tin%20bản%20tiếng%20Việt%20Mindstorms"
              className="mt-2 inline-block text-sm text-primary hover:underline"
            >
              Nhận tin khi bản dịch xong &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Bước 3: Bổ sung trang Triết Lý**

Giữ nguyên khối 3 trụ cột đang có. Thêm **phía trên** chúng một mục vòng lặp,
**phía dưới** một mục sáu nguyên lý, và **cuối trang** là `<DocPapert />`.

Import thêm ở đầu file:

```tsx
import { VongLap } from "@/components/nhip/vong-lap";
import { DocPapert } from "@/components/nhip/doc-papert";
```

Chèn ngay sau `<SectionHeader …/>`:

```tsx
<section className="mb-12">
  <h2 className="mb-4 text-2xl font-bold">Vòng lặp ba nhịp</h2>
  <p className="mb-6 text-muted-foreground">
    Cách học ở Làng Maker không phải một thang bậc phải leo, mà là ba nhịp lặp
    đi lặp lại. Mỗi vòng, thứ trẻ chọn làm lại khó hơn một chút.
  </p>
  <VongLap />
</section>
```

Chèn sau khối 3 trụ cột:

```tsx
<section className="mt-12">
  <h2 className="mb-4 text-2xl font-bold">Sáu nguyên lý dẫn đường</h2>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {NGUYEN_LY.map((n) => (
      <div key={n.title} className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-bold">{n.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{n.desc}</p>
      </div>
    ))}
  </div>
</section>

<div className="mt-12">
  <DocPapert />
</div>
```

Và khai báo `NGUYEN_LY` ở đầu file, ngoài component:

```tsx
/** Sáu nguyên lý, rút từ thingedu-canon 00-CANON/PHILOSOPHY.md mục 1, 3, 4, 5, 6, 9. */
const NGUYEN_LY = [
  {
    title: "Chạm trước, ký hiệu sau",
    desc: "Trẻ thao tác với vật thật trước; code và công thức chỉ đến sau, khi đã có trải nghiệm cụ thể để bám vào.",
  },
  {
    title: "Khó mà vui",
    desc: "Học sâu xảy ra khi việc khó nhưng do chính trẻ chọn làm, đầy hứng thú — không phải khó vì bị ép.",
  },
  {
    title: "Lỗi là thông tin",
    desc: "Chương trình sai không phải là thua. Trẻ quan sát, đặt giả thuyết, thử lại — người dẫn không sửa hộ, chỉ hỏi ngược.",
  },
  {
    title: "Thế giới thu nhỏ",
    desc: "Mỗi dự án là một thế giới đủ nhỏ để trẻ làm chủ trọn vẹn, đủ thật để chạy được trên thiết bị thật.",
  },
  {
    title: "Học như trường samba",
    desc: "Người mới học cạnh người giỏi trong cùng một việc thật, không chia lớp tách biệt theo tuổi hay trình độ.",
  },
  {
    title: "Tách trẻ khỏi màn hình",
    desc: "Mọi tương tác số đều bắt nguồn từ một hành động vật lý: lắp ráp, thao tác thiết bị, quan sát hiện tượng.",
  },
];
```

- [ ] **Bước 4: Cổng chất lượng và xem thật**

```bash
npx tsc --noEmit && npx eslint . && npx next build
```
Mở `/triet-ly` ở cả hai giao diện. Kiểm: 6 nguyên lý hiện đủ; khối Đọc Papert
ghi rõ "PDF, 60 MB"; **không có tên người dịch ở bất kỳ đâu**; bấm thử link tải
thấy trình duyệt bắt đầu tải PDF.

- [ ] **Bước 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: trang Triết Lý thêm vòng lặp, sáu nguyên lý và khối Đọc Papert

Link PDF Mindstorms do MIT Media Lab đăng với sự cho phép của gia đình
Papert, đã kiểm 200 application/pdf trước khi đưa vào.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 8: Trang Công Cụ, prompt AI và từ khoá SEO

Ba mặt còn lại vẫn nói bằng giọng cũ.

**Files:**
- Sửa: `app/(public)/cong-cu/page.tsx`
- Sửa: `lib/gemini.ts`
- Sửa: `app/layout.tsx`

**Interfaces:**
- Consumes: `NHIP`, `getNhip` (Task 2); `HUBS` (đã có).

- [ ] **Bước 1: Đổi khung trang Công Cụ thành "đồ nghề trong xưởng"**

- Tiêu đề mục giữ "Công Cụ & Thiết Bị", đổi phụ đề thành
  `"Đồ nghề trong xưởng — phương tiện để làm, không phải cấp bậc để leo"`.
- Ngay dưới tiêu đề, thêm một đoạn ngắn:
  `"Không ai phải học hết công cụ này rồi mới được sang công cụ kia. Trẻ chọn đồ nghề vừa tay với thứ mình đang muốn làm."`
- Mỗi công cụ đang gắn thẻ giai đoạn cũ → gắn lại thẻ nhịp bằng
  `<StageBadge stage="lam" />` (hoặc `"choi"` cho GCompris), bỏ phần
  `(4-12)` độ tuổi trong nhãn.

- [ ] **Bước 2: Dựng lại prompt trong `lib/gemini.ts`**

Đổi `import { STAGES } ...` thành `import { NHIP } from "./content/nhip";`
và thay khối `stageList` bằng:

```ts
const nhipList = NHIP.map(
  (n) => `  - ${n.ten}: ${n.khauHieu}. Tại Làng Maker: ${n.taiLangMaker}`
).join("\n");
```

Trong chuỗi prompt, thay mục "LỘ TRÌNH HỌC 5 GIAI ĐOẠN" bằng:

```
VÒNG LẶP BA NHỊP (không phải thang bậc — xong Chia sẻ thì quay lại Chơi ở vòng sau):
${nhipList}

CHƯƠNG TRÌNH THẬT TẠI LÀNG MAKER:
- Bảo tàng Tò mò: 5 nhóm trạm chơi, mở liên tục
- HoS (Hour of STEAM): buổi trải nghiệm MIỄN PHÍ 60-90 phút cho người mới, cuối tuần
- Nguyên tắc 7+1: 7 buổi dự án + buổi thứ 8 Make & Share trước phụ huynh
```

Bổ sung vào mục "QUY TẮC VỀ SỰ THẬT" hai dòng:

```
- TUYỆT ĐỐI KHÔNG nói học phí. Nếu được hỏi giá, trả lời rằng buổi trải nghiệm
  HoS miễn phí và mời liên hệ Maker Hub gần nhất để biết chi tiết.
- Không mô tả ba nhịp như cấp bậc phải leo. Ai cũng đi qua đủ ba nhịp, ở mọi tuổi.
```

- [ ] **Bước 3: Từ khoá SEO trong `app/layout.tsx`**

```ts
keywords: [
  "STEM",
  "Robot",
  "giáo dục",
  "trẻ em",
  "Việt Nam",
  "MakerViet",
  "OpenSTEM",
  "Làng Maker",
  "Maker Hub",
  "Chơi Làm Chia sẻ",
  "Seymour Papert",
  "học bằng làm",
],
```

(bỏ `"lập trình"`, `"ThingBot"` — tên công cụ không còn là định vị của site).

- [ ] **Bước 4: Cổng chất lượng và thử chatbot**

```bash
npx tsc --noEmit && npx eslint . && npx next build
```

Nếu `GEMINI_API_KEY` hợp lệ, thử:

```bash
curl -s -X POST http://localhost:3000/api/gemini -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Học ở đây bao nhiêu tiền một tháng?"}]}'
```
Kỳ vọng: câu trả lời **không có con số học phí**, có nhắc buổi HoS miễn phí.
Nếu khoá vẫn hỏng (đang hỏng tính đến 2026-09-06) thì bỏ qua bước thử này và
ghi rõ trong commit là chưa thử được đường thật.

- [ ] **Bước 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: trang Công Cụ đổi thành đồ nghề, prompt AI và SEO theo ba nhịp

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 9: Nghiệm thu toàn bộ theo mục 6 của spec

Không viết code mới. Chạy đủ sáu điểm nghiệm thu và ghi kết quả thật.

- [ ] **Bước 1: Ba cổng tự động**

```bash
npx vitest run && npx tsc --noEmit && npx eslint . && npx next build
```
Kỳ vọng: cả bốn xanh. Dán kết quả thật vào báo cáo, không viết "chắc là xanh".

- [ ] **Bước 2: Bốn redirect**

```bash
npm run dev &
sleep 8
for u in kham-pha tu-duy lap-trinh iot-robot; do
  echo -n "$u -> "; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "http://localhost:3000/hanh-trinh/$u"
done
```
Kỳ vọng: đủ bốn dòng `308`, đích đúng theo bảng ở Task 4. Không dòng nào `404`.

- [ ] **Bước 3: Sitemap**

```bash
curl -s http://localhost:3000/sitemap.xml | grep -o "hanh-trinh/[a-z-]*" | sort -u
```
Kỳ vọng: đúng ba dòng `hanh-trinh/choi`, `hanh-trinh/lam`, `hanh-trinh/chia-se`.

- [ ] **Bước 4: Xem thật bằng trình duyệt, cả sáng và tối**

Bảy trang: `/`, `/hanh-trinh`, `/hanh-trinh/choi`, `/hanh-trinh/lam`,
`/hanh-trinh/chia-se`, `/video-hub`, `/cong-cu`, `/triet-ly`.
Với mỗi trang: chụp màn hình, đọc console. Kỳ vọng: không lỗi console; Video
Hub có đúng 4 chip (Tất cả + 3 nhịp) và chip Chơi cho trạng thái rỗng tử tế.

- [ ] **Bước 5: Đọc soát bằng grep**

```bash
# Không còn slug cũ trong mã nguồn
grep -rn "kham-pha\|tu-duy\|lap-trinh\|iot-robot" app components lib --include="*.ts" --include="*.tsx" | grep -v "nhip-slug"
# Không chỗ nào lộ học phí
grep -rni "học phí\|600k\|600.000" app components lib --include="*.ts" --include="*.tsx"
# Không đánh số bước kiểu thang bậc
grep -rn "Bước 1:\|Bước 2:\|Bước 3:" app components --include="*.tsx"
```
Kỳ vọng: cả ba lệnh **không in ra gì** (trừ lệnh đầu chỉ được phép hiện
`lib/content/nhip-slug.ts`, nơi cố ý giữ bản đồ slug cũ).

- [ ] **Bước 6: Kiểm lại ba link sách**

Chạy lại đúng ba lệnh curl ở Task 7 Bước 1. Cả ba phải còn 200.

- [ ] **Bước 7: Báo cáo và commit cuối**

Viết báo cáo ngắn cho chủ dự án: cái gì đã đổi, kết quả thật của từng điểm
nghiệm thu, và **những gì chưa làm được** (ví dụ chưa thử được chatbot vì khoá
Gemini hỏng). Không tuyên bố xong nếu có bước nào chưa chạy.

```bash
git add -A
git commit -m "$(cat <<'MSG'
chore: nghiệm thu vòng lặp ba nhịp theo mục 6 của spec

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```
