# Kế hoạch thi công: đổi tên sang Làng Maker và trang /lang-maker

> **Cho người thi công (kể cả agent):** BẮT BUỘC dùng skill
> `superpowers:subagent-driven-development` (khuyến nghị) hoặc
> `superpowers:executing-plans`, làm từng task một. Các bước dùng checkbox `- [ ]`.

**Mục tiêu:** Đưa "Làng Maker" thành tên chính của site thay "OpenSTEM Foundation",
cho chân trang dẫn sang Dế STEM Foundation, và dựng một trang kể chuyện Làng Maker —
người trong làng và mười năm — thay cho trang giới thiệu cũ.

**Kiến trúc:** Nội dung trang mới nằm trong `lib/content/lang-maker.ts` (dữ liệu thuần,
không JSX) để test canh được. Trang `/lang-maker` chỉ đọc từ đó. `/gioi-thieu` bị xoá và
redirect 301 sang trang mới — cùng cơ chế redirect đã dùng cho bốn URL giai đoạn cũ.

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind 4 · shadcn/ui ·
Vitest · lucide-react.

**Spec:** `docs/superpowers/specs/2026-09-06-trang-lang-maker-design.md` — đọc trước Task 1.

## Ràng buộc toàn cục

- **Mỗi mốc thời gian BẮT BUỘC có trường `nguon` không rỗng.** Không mốc nào lên trang mà
  thiếu căn cứ. Có test canh.
- **Thang bốn bậc đúng thứ tự:** Dân làng → Thợ học việc → Thợ cả → Già làng. Nghệ nhân
  KHÔNG thuộc thang, đứng cạnh.
- **KHÔNG dẫn `makerhanoi.org`** — tên miền đã chết (kiểm 2026-09-06, không phân giải).
- **KHÔNG bịa mốc.** Mốc nào chỉ có bằng chứng là thư mục lưu trữ thì diễn đạt dè dặt
  ("hồ sơ … trong lưu trữ"), không khẳng định thành tích.
- **KHÔNG đăng ảnh** lấy từ slide Google Drive (chưa rõ quyền hình ảnh trẻ em).
- **KHÔNG nêu tên riêng ai** ngoài người sáng lập trong câu trích 6/2017.
- **Dòng bản quyền chân trang giữ nguyên chữ** `© 2026 OpenSTEM Foundation` — đó là pháp
  nhân. Chỉ biến nó thành link.
- **⚠️ vtv.vn chặn user-agent mặc định của curl** (lúc 503 lúc 200). Muốn kiểm phải dùng UA
  trình duyệt, nếu không sẽ báo trượt oan:
  `curl -sIL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" <url>`
- Cổng chất lượng cuối mỗi task: `npx tsc --noEmit`, `npx eslint .`, `npx vitest run` xanh;
  task đụng giao diện thêm `npx next build`.
- Commit tiếng Việt, kết thúc bằng `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

---

## Cấu trúc file

| File | Trách nhiệm | Việc |
|---|---|---|
| `lib/content/lang-maker.ts` | 5 vai trong làng · 15 mốc mười năm · dòng đồ nghề · câu trích 2017 | **Tạo** |
| `lib/content/lang-maker.test.ts` | Canh bất biến: mốc có nguồn, thang đúng thứ tự | **Tạo** |
| `app/(public)/lang-maker/page.tsx` | Trang bốn khối | **Tạo** |
| `app/(public)/gioi-thieu/page.tsx` | — | **Xoá** |
| `next.config.ts` | Thêm redirect `/gioi-thieu` → `/lang-maker` | Sửa |
| `app/sitemap.ts` | Bỏ `gioi-thieu`, thêm `lang-maker` | Sửa |
| `lib/content/nav.ts`, `components/layout/footer.tsx` | Nhãn + href điều hướng | Sửa |
| `components/layout/footer.tsx` | Dòng bản quyền thành link Dế STEM Foundation | Sửa |
| 8 file đổi tên tổ chức | `OpenSTEM Foundation` → `Làng Maker` | Sửa |

---

## Task 1: Dữ liệu Làng Maker

**Files:**
- Tạo: `lib/content/lang-maker.ts`
- Tạo: `lib/content/lang-maker.test.ts`

**Interfaces:**
- Consumes: chưa có gì.
- Produces: `VaiLang`, `MocThoiGian`, `NGUOI_TRONG_LANG: VaiLang[]` (5 phần tử),
  `MUOI_NAM: MocThoiGian[]` (15 phần tử), `DO_NGHE_MUOI_NAM: string[]`,
  `TRICH_DAN_2017: { loi: string; nguoiNoi: string; thoiDiem: string; ghiChu: string }`.

- [ ] **Bước 1: Viết test trước**

Tạo `lib/content/lang-maker.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  NGUOI_TRONG_LANG,
  MUOI_NAM,
  DO_NGHE_MUOI_NAM,
  TRICH_DAN_2017,
} from "./lang-maker";

describe("NGUOI_TRONG_LANG", () => {
  it("có bốn bậc đúng thứ tự từ dưới lên, cộng nghệ nhân đứng ngoài thang", () => {
    const trongThang = NGUOI_TRONG_LANG.filter((v) => v.bac !== null);
    expect(trongThang.map((v) => v.ten)).toEqual([
      "Dân làng",
      "Thợ học việc",
      "Thợ cả",
      "Già làng",
    ]);
    expect(trongThang.map((v) => v.bac)).toEqual([1, 2, 3, 4]);

    const ngoaiThang = NGUOI_TRONG_LANG.filter((v) => v.bac === null);
    expect(ngoaiThang.map((v) => v.ten)).toEqual(["Nghệ nhân"]);
  });

  it("mọi vai đều nói được mình là ai", () => {
    for (const vai of NGUOI_TRONG_LANG) {
      expect(vai.laAi.length, vai.ten).toBeGreaterThan(20);
    }
  });
});

describe("MUOI_NAM", () => {
  it("MỌI mốc đều có căn cứ — không mốc nào lên trang mà thiếu nguồn", () => {
    for (const moc of MUOI_NAM) {
      expect(moc.nguon.trim().length, `mốc "${moc.moc}" thiếu nguồn`).toBeGreaterThan(10);
    }
  });

  it("không mốc nào ở tương lai và không mốc nào trước khi làng ra đời", () => {
    const namNay = new Date().getFullYear();
    for (const moc of MUOI_NAM) {
      expect(moc.nam, moc.moc).toBeGreaterThanOrEqual(2016);
      expect(moc.nam, moc.moc).toBeLessThanOrEqual(namNay);
    }
  });

  it("sắp xếp theo thứ tự thời gian tăng dần", () => {
    const nam = MUOI_NAM.map((m) => m.nam);
    expect(nam).toEqual([...nam].sort((a, b) => a - b));
  });

  it("không dẫn tên miền đã chết makerhanoi.org", () => {
    const toanBo = MUOI_NAM.map((m) => `${m.chiTiet} ${m.nguon}`).join(" ");
    expect(toanBo.includes("makerhanoi.org")).toBe(false);
  });
});

describe("DO_NGHE_MUOI_NAM", () => {
  it("kể được dòng đồ nghề từ MEO tới ThingBot", () => {
    expect(DO_NGHE_MUOI_NAM[0]).toContain("MEO");
    expect(DO_NGHE_MUOI_NAM[DO_NGHE_MUOI_NAM.length - 1]).toContain("ThingBot");
    expect(DO_NGHE_MUOI_NAM.length).toBeGreaterThanOrEqual(7);
  });
});

describe("TRICH_DAN_2017", () => {
  it("ghi rõ người nói, thời điểm, và nói rõ đây là bản dịch", () => {
    expect(TRICH_DAN_2017.thoiDiem).toBe("6/2017");
    expect(TRICH_DAN_2017.nguoiNoi.length).toBeGreaterThan(3);
    expect(TRICH_DAN_2017.ghiChu.toLowerCase()).toContain("dịch");
  });
});
```

- [ ] **Bước 2: Chạy test để thấy FAIL**

Chạy: `npx vitest run lib/content/lang-maker.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./lang-maker"`.

- [ ] **Bước 3: Viết `lib/content/lang-maker.ts`**

```ts
/**
 * Nội dung trang Làng Maker.
 *
 * Nguồn tư liệu 2016–2019: slide "Maker Hanoi — Review VIA Project" trong lưu trữ
 * Google Drive (tệp ghi 12/2020) · bài VTV 11/12/2016 · hồ sơ fablabs.io ·
 * thư mục FIRST ROBOTIC trong lưu trữ. Nguồn 2022–2026: kênh YouTube MakerViet và
 * dữ liệu chính trong repo.
 *
 * QUY TẮC: mỗi mốc BẮT BUỘC có `nguon`. Không thêm mốc nào mà không nói được căn cứ.
 * Không dẫn makerhanoi.org — tên miền đã chết.
 */

/** Một vai trong làng. `bac` null nghĩa là không thuộc thang bốn bậc. */
export interface VaiLang {
  ten: string;
  laAi: string;
  bac: 1 | 2 | 3 | 4 | null;
}

export interface MocThoiGian {
  /** Nhãn hiển thị, ví dụ "5/2016" hoặc "2018–2019". */
  moc: string;
  /** Năm để sắp xếp và kiểm tra. */
  nam: number;
  tieuDe: string;
  chiTiet: string;
  /** Căn cứ. Bắt buộc, không được rỗng. */
  nguon: string;
}

/**
 * Thang MakerCoach: Dân làng → Thợ học việc → Thợ cả → Già làng.
 * Nghệ nhân đứng cạnh thang, không phải một bậc.
 * Nguồn: thingedu-canon LANG_MAKER_PLAYBOOK mục 5, GLOSSARY mục 48 và 38.
 */
export const NGUOI_TRONG_LANG: VaiLang[] = [
  {
    ten: "Dân làng",
    bac: 1,
    laAi: "Người mới đến. Chơi trước đã, chưa cần biết gì, chưa phải đăng ký gì. Mọi đứa trẻ bước vào làng đều bắt đầu ở đây.",
  },
  {
    ten: "Thợ học việc",
    bac: 2,
    laAi: "Đã chọn một thứ muốn làm và đang học nghề, làm cạnh thợ cả. Chưa được chứng nhận, nhưng đã tự tay hỏng và tự tay sửa.",
  },
  {
    ten: "Thợ cả",
    bac: 3,
    laAi: "Làm chủ được một nghề và kèm được người khác. Ở Làng Maker, thợ cả là người dẫn buổi học — không giảng bài, mà làm cùng.",
  },
  {
    ten: "Già làng",
    bac: 4,
    laAi: "Người dẫn cả làng và chứng nhận tay nghề cho người khác. Giữ nếp làng nhiều hơn là giữ kiến thức.",
  },
  {
    ten: "Nghệ nhân",
    bac: null,
    laAi: "Người có nghề riêng ngoài làng — mộc, điện, gốm, may, cơ khí — ghé qua truyền lại một ngón nghề. Không nằm trong thang bậc, và cũng không cần.",
  },
];

/** Câu của người sáng lập, viết trước khi có chữ "Làng Maker" nào. */
export const TRICH_DAN_2017 = {
  loi: "Tôi muốn tạo ra nhiều lab như Maker Hanoi ở trường học, ở nông thôn, ở các tỉnh của Việt Nam. Mọi bạn trẻ đều cần được chạm vào công nghệ, được có ước mơ của riêng mình. Chúng tôi muốn mang STEM và Robot đến với tất cả mọi người.",
  nguoiNoi: "Tuấn Lê",
  thoiDiem: "6/2017",
  ghiChu:
    "Dịch từ nguyên văn tiếng Anh trong slide “Maker Hanoi — Review”, lưu trữ Google Drive.",
} as const;

/** Dòng đồ nghề mười năm — bằng chứng vật chất cho luận đề của trang. */
export const DO_NGHE_MUOI_NAM: string[] = [
  "MEO 1.0",
  "MEO 2.0",
  "K12 Maker",
  "ABC Maker 1.0",
  "ABC Maker 1.5",
  "ABC Maker 2.0",
  "Maker Bot 2020",
  "VIA",
  "ThingBot & NEO One",
];

export const MUOI_NAM: MocThoiGian[] = [
  {
    moc: "5/2016",
    nam: 2016,
    tieuDe: "Một cái xưởng chung mở cửa ở Hà Nội",
    chiTiet:
      "Maker Hanoi ra đời, là thành viên mạng lưới FabLab toàn cầu và hoạt động phi lợi nhuận. Khẩu hiệu từ ngày đầu: đóng góp của bạn, chúng ta cùng chia sẻ.",
    nguon: "Slide “Maker Hanoi — Review”, lưu trữ Google Drive · hồ sơ fablabs.io",
  },
  {
    moc: "12/2016",
    nam: 2016,
    tieuDe: "Ngày hội IoT đầu tiên do cộng đồng tự làm",
    chiTiet:
      "Vietnam IoT Weekend tổ chức tại toà nhà FPT, Duy Tân, Cầu Giấy — không có ban tổ chức chuyên nghiệp nào, chỉ có những người mê chế tạo.",
    nguon: "Slide “Maker Hanoi — Review”, lưu trữ Google Drive",
  },
  {
    moc: "11/12/2016",
    nam: 2016,
    tieuDe: "Truyền hình quốc gia tìm đến xưởng",
    chiTiet:
      "VTV đưa tin “Maker Hanoi — điểm đến của nhiều bạn trẻ yêu thích công nghệ”.",
    nguon: "vtv.vn, bản tin công nghệ 11/12/2016 (kiểm còn truy cập được 2026-09-06)",
  },
  {
    moc: "6/2017",
    nam: 2017,
    tieuDe: "Câu nói định hình mười năm sau",
    chiTiet:
      "Người sáng lập viết ra điều mình muốn: nhiều lab như thế này ở trường học, ở nông thôn, ở các tỉnh. Chữ “Làng Maker” lúc đó chưa tồn tại.",
    nguon: "Slide “Maker Hanoi — Review”, lưu trữ Google Drive",
  },
  {
    moc: "1/2018",
    nam: 2018,
    tieuDe: "Vietnam IoT Day — kết nối cộng đồng",
    chiTiet: "Ngày hội thứ hai, tổ chức tại Lương Yên Coworking.",
    nguon: "Slide “Maker Hanoi — Review”, lưu trữ Google Drive",
  },
  {
    moc: "2018",
    nam: 2018,
    tieuDe: "Bước ra sân quốc tế",
    chiTiet:
      "Hồ sơ FIRST Global Challenge bắt đầu từ năm này và có liên tục cho tới nay trong lưu trữ của cộng đồng.",
    nguon: "Thư mục FIRST ROBOTIC/FGC 2018 đến FGC 2026, lưu trữ Google Drive",
  },
  {
    moc: "2018–2019",
    nam: 2019,
    tieuDe: "Cuộc Đua Số",
    chiTiet:
      "Cuộc thi xe tự hành trở thành bài toán thật và nguồn dữ liệu cho dòng xe tự hành của cộng đồng.",
    nguon: "Slide “Maker Hanoi — Review”, lưu trữ Google Drive",
  },
  {
    moc: "2020",
    nam: 2020,
    tieuDe: "VIA — xe tự hành mã nguồn mở",
    chiTiet:
      "Maker Bot 2020 và dự án VIA: xe tự hành mở, kèm bộ mô phỏng, tập dữ liệu do cộng đồng đóng góp, và điều khiển bằng giọng nói tiếng Việt. Cùng năm có Vietnam STEAM Challenge.",
    nguon:
      "Slide “Maker Hanoi — Review” · thư mục Vietnam STEAM Challenge 2020, lưu trữ Google Drive",
  },
  {
    moc: "2021",
    nam: 2021,
    tieuDe: "Vietnam STEAM Challenge mùa hai",
    chiTiet: "Sân thi đấu trong nước tiếp tục, giữa hai năm dịch.",
    nguon: "Thư mục Vietnam STEAM Challenge 2021, lưu trữ Google Drive",
  },
  {
    moc: "5/2022",
    nam: 2022,
    tieuDe: "Mang xưởng đi tỉnh",
    chiTiet:
      "Mobile Maker Tour đến Quy Nhơn — tổ hợp không gian khoa học ExploraScience và khuôn viên Fschool.",
    nguon: "Video kênh MakerViet, đăng 28 và 31/5/2022",
  },
  {
    moc: "6/2022",
    nam: 2022,
    tieuDe: "Chung kết Vietnam Robotics Challenge",
    chiTiet: "Vòng chung kết VRC 2022, quay bằng camera 360 độ.",
    nguon: "Video kênh MakerViet, đăng 28/6/2022",
  },
  {
    moc: "10/2022",
    nam: 2022,
    tieuDe: "Đội tuyển Việt Nam ở Geneva",
    chiTiet: "FIRST Global Challenge 2022 tại Palexpo, Geneva.",
    nguon: "Video kênh MakerViet, đăng 12 và 13/10/2022",
  },
  {
    moc: "2023",
    nam: 2023,
    tieuDe: "Năm đào tạo người dẫn",
    chiTiet:
      "Khoá Arduino cho người mới, chương trình Maker Tech-Tutor đào tạo gia sư công nghệ, và robot CoBot cho lớp học. Làng bắt đầu tạo ra thợ cả của chính mình.",
    nguon:
      "Video kênh MakerViet đăng 26/5, 26/11 và 24/12/2023 · thư mục VRC 2023, lưu trữ Google Drive",
  },
  {
    moc: "2024–2025",
    nam: 2025,
    tieuDe: "Đồ nghề thành sản phẩm",
    chiTiet:
      "ThingBot và phần mềm lập trình khối ThingEduBlock ra mắt, rồi bộ Kit ThingBot bản 2025–2026. Hành trình FIRST Global tiếp tục.",
    nguon:
      "Video kênh MakerViet đăng 7/3/2025 và 25/12/2025 · thư mục FGC 2024, FGC 2025, lưu trữ Google Drive",
  },
  {
    moc: "2026",
    nam: 2026,
    tieuDe: "Ba Làng Maker mở cửa",
    chiTiet:
      "190 Xã Đàn và 29 Dương Khuê ở Hà Nội, FPT Shop Quang Trung ở Thanh Hoá. Điều viết ra năm 2017 bắt đầu có địa chỉ.",
    nguon: "Dữ liệu Maker Hub của chính website này (lib/content/hubs.ts)",
  },
];
```

- [ ] **Bước 4: Chạy test để thấy PASS**

Chạy: `npx vitest run`
Kỳ vọng: PASS toàn bộ (các test cũ + test mới).

- [ ] **Bước 5: Phá hỏng có chủ đích ba lần**

Mỗi lần sửa, chạy `npx vitest run lib/content/lang-maker.test.ts`, xác nhận FAIL đúng test
mong đợi, dán output FAIL thật vào báo cáo, rồi **khôi phục nguyên trạng**:

1. Xoá nội dung trường `nguon` của mốc 5/2016 (để `nguon: ""`)
   → phải FAIL ở test "MỌI mốc đều có căn cứ".
2. Đổi `bac` của "Thợ cả" từ `3` thành `2`
   → phải FAIL ở test "có bốn bậc đúng thứ tự".
3. Thêm chuỗi `" makerhanoi.org"` vào cuối `chiTiet` của mốc 5/2016
   → phải FAIL ở test "không dẫn tên miền đã chết".

Nếu lần nào vẫn PASS thì test đó vô dụng — sửa test rồi làm lại.

- [ ] **Bước 6: Cổng chất lượng**

```bash
npx vitest run && npx tsc --noEmit && npx eslint .
```

- [ ] **Bước 7: Commit**

```bash
git add lib/content/lang-maker.ts lib/content/lang-maker.test.ts
git commit -m "$(cat <<'MSG'
feat: dữ liệu Làng Maker — năm vai trong làng và mười năm có căn cứ

Mỗi mốc mang trường nguon bắt buộc; test canh không mốc nào lên trang
mà thiếu căn cứ, thang bốn bậc đúng thứ tự, và không dẫn tên miền chết.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 2: Trang `/lang-maker`, thay `/gioi-thieu`

**Files:**
- Tạo: `app/(public)/lang-maker/page.tsx`
- Xoá: `app/(public)/gioi-thieu/page.tsx`
- Sửa: `next.config.ts`, `app/sitemap.ts`, `lib/content/nav.ts`, `components/layout/footer.tsx`

**Interfaces:**
- Consumes: `NGUOI_TRONG_LANG`, `MUOI_NAM`, `DO_NGHE_MUOI_NAM`, `TRICH_DAN_2017` (Task 1).
- Produces: route `/lang-maker`; redirect 301 `/gioi-thieu` → `/lang-maker`.

- [ ] **Bước 1: Đọc trang cũ trước khi xoá**

```bash
cat "app/(public)/gioi-thieu/page.tsx"
```

Trang cũ có ba ý phải **chuyển sang trang mới, không được mất**: làng là gì · tầm nhìn ·
sứ mệnh. Đổi chủ ngữ từ "OpenSTEM Foundation" sang "Làng Maker" khi chuyển.

- [ ] **Bước 2: Viết `app/(public)/lang-maker/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  NGUOI_TRONG_LANG,
  MUOI_NAM,
  DO_NGHE_MUOI_NAM,
  TRICH_DAN_2017,
} from "@/lib/content/lang-maker";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Làng Maker",
  description:
    "Làng Maker dùng robot để tạo ra đứa trẻ — robot không phải đích đến. Mười năm, năm vai trong làng, và một cái xưởng mở cửa từ 2016.",
};

export default function LangMakerPage() {
  const trongThang = NGUOI_TRONG_LANG.filter((v) => v.bac !== null);
  const ngoaiThang = NGUOI_TRONG_LANG.filter((v) => v.bac === null);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader
          title="Làng Maker"
          subtitle="Một cái xưởng chung, mở cửa từ 2016"
        />

        {/* 1. Luận đề */}
        <section className="rounded-2xl border border-primary/40 bg-primary/5 p-8">
          <h2 className="text-2xl font-bold">Dùng robot để tạo ra đứa trẻ</h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              Nghe ngược, nhưng đó là điều làng làm. Robot không phải đích đến —
              đứa trẻ mới là thứ được làm ra. Con robot chạy xong rồi cũng cất
              vào tủ; thứ ở lại là một đứa trẻ biết mình làm được.
            </p>
            <p>
              Đồ vật được lập trình ở đây là <strong>đối tác tư duy</strong> của
              trẻ, không phải môn học phải thuộc. Trẻ nghĩ <em>cùng</em> con
              robot, chứ không học <em>về</em> con robot.
            </p>
            <p>
              Câu này có từ ngày đầu, khi làng còn tên là Maker Hanoi:{" "}
              <strong>đóng góp của bạn, chúng ta cùng chia sẻ.</strong>
            </p>
          </div>
        </section>

        {/* 2. Người trong làng */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Người trong làng</h2>
          <p className="mt-2 text-muted-foreground">
            Làng không có lớp chia theo tuổi. Người mới học cạnh người giỏi,
            trong cùng một việc thật.
          </p>

          <ol className="mt-6 space-y-3">
            {trongThang.map((vai) => (
              <li
                key={vai.ten}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold text-muted-foreground"
                  aria-hidden
                >
                  {vai.bac}
                </span>
                <div>
                  <h3 className="font-bold">{vai.ten}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{vai.laAi}</p>
                </div>
              </li>
            ))}
          </ol>

          {ngoaiThang.map((vai) => (
            <div
              key={vai.ten}
              className="mt-3 rounded-xl border border-dashed border-border p-5"
            >
              <h3 className="font-bold">{vai.ten}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{vai.laAi}</p>
            </div>
          ))}

          <p className="mt-6 rounded-xl bg-muted/50 p-5 text-sm">
            Đứa trẻ bước vào làng là <strong>dân làng</strong>. Con đường đi lên
            là có thật — và nó khép lại đúng ở nhịp{" "}
            <Link href="/hanh-trinh/chia-se" className="text-primary hover:underline">
              Chia sẻ
            </Link>
            , khi em quay lại dẫn lớp sau.
          </p>
        </section>

        {/* 3. Mười năm */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Mười năm</h2>

          <figure className="mt-4 rounded-xl border-l-4 border-primary bg-card p-6">
            <blockquote className="text-lg italic leading-relaxed">
              “{TRICH_DAN_2017.loi}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              — {TRICH_DAN_2017.nguoiNoi}, {TRICH_DAN_2017.thoiDiem}.{" "}
              {TRICH_DAN_2017.ghiChu}
            </figcaption>
          </figure>

          <ol className="mt-8 space-y-6 border-l border-border pl-6">
            {MUOI_NAM.map((moc) => (
              <li key={moc.moc + moc.tieuDe} className="relative">
                <span
                  className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background"
                  aria-hidden
                />
                <p className="text-sm font-bold text-primary">{moc.moc}</p>
                <h3 className="mt-1 font-bold">{moc.tieuDe}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{moc.chiTiet}</p>
                <p className="mt-2 text-xs text-muted-foreground/70">
                  Căn cứ: {moc.nguon}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <h3 className="font-bold">Mười năm làm đồ nghề</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Thứ được làm ra không phải mấy con robot này, mà là những người
              biết làm ra chúng.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {DO_NGHE_MUOI_NAM.map((ten, i) => (
                <span key={ten} className="flex items-center gap-2">
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-sm">
                    {ten}
                  </span>
                  {i < DO_NGHE_MUOI_NAM.length - 1 && (
                    <span className="text-muted-foreground" aria-hidden>
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Cửa vào */}
        <section className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold">Vào làng thế nào?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Buổi đầu tiên miễn phí, và không cần biết gì trước.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/cong-dong/maker-hub">
                <MapPin className="mr-2 h-4 w-4" aria-hidden />
                Tìm Maker Hub gần bạn
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/hanh-trinh/choi">
                Bắt đầu từ nhịp Chơi
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Bước 3: Chuyển ba ý của trang cũ sang, rồi xoá trang cũ**

Chèn thêm một khối vào trang mới, đặt **giữa khối Luận đề và khối Người trong làng**, mang
ba ý của `/gioi-thieu` cũ với chủ ngữ đổi sang Làng Maker:

```tsx
        {/* Làng là gì · tầm nhìn · sứ mệnh — chuyển từ trang /gioi-thieu cũ */}
        <section className="mt-12 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold">Làng Maker là gì?</h2>
            <p className="mt-3 text-muted-foreground">
              Làng Maker là không gian sáng tạo mở, hoạt động phi lợi nhuận, do
              cộng đồng MakerViet · ThingEdu · Rogo dựng lên sau hơn mười năm làm
              mã nguồn mở và giáo dục STEM tại Việt Nam.
            </p>
            <p className="mt-3 text-muted-foreground">
              Chữ “mở” là cốt lõi: mở cửa tri thức, mở mã nguồn, mở mô hình — ai
              cũng có thể tham gia, đóng góp và thụ hưởng.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold">Tầm nhìn</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Mỗi trẻ em Việt Nam đều có cơ hội tiếp cận STEM và Robot để phát
                triển tư duy độc lập và làm chủ công nghệ.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold">Sứ mệnh</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Phổ cập STEM và Robot cho 1 triệu trẻ em Việt Nam trong 5 năm,
                bằng hệ sinh thái giáo dục mở và sản phẩm Made in Vietnam.
              </p>
            </div>
          </div>
        </section>
```

Rồi: `git rm "app/(public)/gioi-thieu/page.tsx"`

- [ ] **Bước 4: Redirect trong `next.config.ts`**

Thêm vào mảng `redirects()` đang có, sau bốn redirect nhịp:

```ts
      { source: "/gioi-thieu", destination: "/lang-maker", permanent: true },
```

- [ ] **Bước 5: Sitemap và điều hướng**

**Đã kiểm trước:** `/gioi-thieu` hiện **không được link từ nav hay footer** — nó chỉ nằm
trong `app/sitemap.ts`, tức đang là trang mồ côi. Nên đây là THÊM mục mới, không phải đổi.

- `app/sitemap.ts` dòng 16: đổi `"/gioi-thieu"` thành `"/lang-maker"`.
- `lib/content/nav.ts`: chèn `{ label: "Làng Maker", href: "/lang-maker" },` ngay **sau**
  mục `{ label: "Cách Học", href: "/hanh-trinh" }`. Menu sẽ thành 9 mục — sau khi build,
  mở trang chủ ở bề rộng 1280px kiểm xem thanh nav ngang có tràn hay đè lên nút "Bắt Đầu
  Ngay" không. Nếu tràn, báo lại cho controller, **đừng tự ý bỏ mục khác đi**.
- `components/layout/footer.tsx`: trong nhóm `"Khám Phá"`, chèn
  `{ label: "Làng Maker", href: "/lang-maker" },` lên **đầu** nhóm.

**Lưu ý khi grep:** `lib/content/videos.ts` có một video mang id `mv-thingbot-gioi-thieu`.
Đừng dùng lệnh grep rộng `gioi-thieu` trên cả repo rồi tưởng là còn sót link trang cũ.

- [ ] **Bước 6: Cổng chất lượng và kiểm bằng curl**

```bash
npx tsc --noEmit && npx eslint . && npx vitest run && npx next build
pkill -f "next dev"; npm run dev > /tmp/dev.log 2>&1 &
sleep 10
curl -s -o /dev/null -w "gioi-thieu -> %{http_code} %{redirect_url}\n" http://localhost:3000/gioi-thieu
curl -s -o /dev/null -w "lang-maker -> %{http_code}\n" http://localhost:3000/lang-maker
curl -s http://localhost:3000/sitemap.xml | grep -c "lang-maker"
curl -s http://localhost:3000/sitemap.xml | grep -c "gioi-thieu"
curl -s http://localhost:3000/lang-maker | grep -c "Căn cứ:"
```

Kỳ vọng: `gioi-thieu` → **308** về `/lang-maker`; `lang-maker` → **200**; sitemap có
`lang-maker` (1) và không còn `gioi-thieu` (0); trang có **15** dòng "Căn cứ:".

**Lưu ý:** `next.config.ts` không nạp lại khi dev server đang chạy — phải khởi động lại
mới thấy redirect. Thấy 200 thay vì 308 gần như chắc chắn là do quên bước này.

- [ ] **Bước 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: trang /lang-maker kể chuyện làng, thay trang giới thiệu cũ

Bốn khối: luận đề dùng robot để tạo ra đứa trẻ, năm vai trong làng,
mười năm có căn cứ từng mốc, và cửa vào. /gioi-thieu redirect 301 sang
đây; ba ý của trang cũ (là gì, tầm nhìn, sứ mệnh) chuyển sang nguyên vẹn.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 3: Đổi tên xuyên site và link Dế STEM Foundation

**Files:**
- Sửa: `components/layout/footer.tsx`, `components/home/hero-section.tsx`,
  `app/(public)/triet-ly/page.tsx`, `app/(public)/cong-dong/page.tsx`,
  `app/(public)/cong-dong/du-an/page.tsx`, `app/layout.tsx`,
  `components/common/json-ld.tsx`, `components/chat/chat-widget.tsx`, `lib/gemini.ts`

**Interfaces:**
- Consumes: không.
- Produces: không có API mới; chỉ đổi chữ và một link.

- [ ] **Bước 1: Liệt kê chính xác chỗ cần đổi**

```bash
grep -rn "OpenSTEM Foundation\|OpenSTEM" app components lib --include="*.ts" --include="*.tsx"
```

- [ ] **Bước 2: Đổi từng chỗ**

| File | Đổi |
|---|---|
| `components/home/hero-section.tsx` | eyebrow `OpenSTEM Foundation` → `Làng Maker` |
| `app/(public)/triet-ly/page.tsx` | phụ đề `...của OpenSTEM Foundation` → `...của Làng Maker`; mô tả metadata `Ba trụ cột triết lý của OpenSTEM` → `...của Làng Maker` |
| `app/(public)/cong-dong/page.tsx` | tiêu đề `Cộng Đồng OpenSTEM` → `Cộng Đồng Làng Maker`; metadata `Cộng đồng OpenSTEM` → `Cộng đồng Làng Maker` |
| `app/(public)/cong-dong/du-an/page.tsx` | metadata `cộng đồng MakerViet và OpenSTEM` → `cộng đồng MakerViet và Làng Maker` |
| `app/layout.tsx` | `authors: [{ name: "OpenSTEM Foundation" }]` → `[{ name: "Làng Maker" }]`; trong `keywords`, đổi `"OpenSTEM"` thành `"Làng Maker"` (nếu đã có `"Làng Maker"` rồi thì bỏ hẳn `"OpenSTEM"`, không để trùng) |
| `components/common/json-ld.tsx` | `alternateName: "OpenSTEM Foundation"` → `alternateName: "Làng Maker"` |
| `components/chat/chat-widget.tsx` | câu gợi ý `Triết lý giáo dục của OpenSTEM là gì?` → `Triết lý giáo dục của Làng Maker là gì?` |
| `lib/gemini.ts` | `trợ lý AI của Robot.edu.vn và OpenSTEM Foundation` → `...và Làng Maker`; tiêu đề mục `VỀ OPENSTEM:` → `VỀ LÀNG MAKER:`; dòng `Tổ chức doanh nghiệp xã hội vì giáo dục STEM, khởi xướng bởi...` giữ nguyên nội dung |

**KHÔNG đổi:** dòng bản quyền `© 2026 OpenSTEM Foundation` ở `components/layout/footer.tsx`.

- [ ] **Bước 3: Chân trang thành link Dế STEM Foundation**

Trong `components/layout/footer.tsx`, thay đoạn text bản quyền bằng:

```tsx
          <p className="text-xs text-muted-foreground/60">
            &copy; 2026{" "}
            <a
              href="https://de-stem-foundation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              OpenSTEM Foundation
            </a>
            . Mã nguồn mở — Giáo dục mở.
          </p>
```

- [ ] **Bước 4: Kiểm bằng grep**

```bash
grep -rn "OpenSTEM" app components lib --include="*.ts" --include="*.tsx"
```

Kỳ vọng: **chỉ còn đúng một dòng** — thẻ `<a>` trong `footer.tsx`. Mọi dòng khác là TRƯỢT.

- [ ] **Bước 5: Cổng chất lượng và kiểm link**

```bash
npx tsc --noEmit && npx eslint . && npx vitest run && npx next build
curl -sIL -m 25 -o /dev/null -w "DeSTEM: %{http_code}\n" https://de-stem-foundation.vercel.app
curl -s http://localhost:3000/ | grep -c "de-stem-foundation.vercel.app"
```

Kỳ vọng: Dế STEM trả 200; trang chủ có 1 dòng chứa link đó.

- [ ] **Bước 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: Làng Maker thành tên chính, chân trang dẫn sang Dế STEM Foundation

Giữ nguyên chữ "OpenSTEM Foundation" ở đúng dòng bản quyền vì đó là
pháp nhân, và biến nó thành link.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

## Task 4: Nghiệm thu theo mục 6 của spec

Không viết code mới. Chạy đủ và ghi kết quả THẬT; lệnh nào trượt thì ghi TRƯỢT kèm output,
**đừng sửa phép kiểm cho khớp kết quả**.

- [ ] **Bước 1: Bốn cổng**

```bash
npx vitest run && npx tsc --noEmit && npx eslint . && npx next build
```

- [ ] **Bước 2: Đường dẫn**

```bash
pkill -f "next dev"; npm run dev > /tmp/dev.log 2>&1 &
sleep 10
curl -s -o /dev/null -w "gioi-thieu -> %{http_code} %{redirect_url}\n" http://localhost:3000/gioi-thieu
curl -s -o /dev/null -w "lang-maker -> %{http_code}\n" http://localhost:3000/lang-maker
curl -s http://localhost:3000/sitemap.xml | grep -o "lang-maker\|gioi-thieu" | sort -u
```
Kỳ vọng: 308 về `/lang-maker`; 200; sitemap chỉ in `lang-maker`.

- [ ] **Bước 3: Đọc soát tên tổ chức**

```bash
grep -rn "OpenSTEM" app components lib --include="*.ts" --include="*.tsx"
```
Kỳ vọng: đúng một dòng, là thẻ `<a>` bản quyền trong `footer.tsx`.

- [ ] **Bước 4: Nội dung trang**

```bash
curl -s http://localhost:3000/lang-maker > /tmp/lm.html
grep -c "Căn cứ:" /tmp/lm.html          # kỳ vọng 15
grep -c "Dân làng\|Thợ học việc\|Thợ cả\|Già làng\|Nghệ nhân" /tmp/lm.html   # > 0
grep -c "makerhanoi.org" /tmp/lm.html   # kỳ vọng 0
grep -c "6/2017" /tmp/lm.html           # > 0
grep -c "de-stem-foundation" /tmp/lm.html # kỳ vọng 1 (chân trang)
```

- [ ] **Bước 5: Kiểm ba link ngoài, ĐÚNG cách**

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
curl -sIL -m 30 -A "$UA" -o /dev/null -w "VTV:     %{http_code}\n" "https://vtv.vn/cong-nghe/maker-hanoi-diem-den-cua-nhieu-ban-tre-yeu-thich-cong-nghe-20161211130214.htm"
curl -sIL -m 25 -o /dev/null -w "FabLabs: %{http_code}\n" "https://www.fablabs.io/labs/makerhanoi"
curl -sIL -m 25 -o /dev/null -w "DeSTEM:  %{http_code}\n" "https://de-stem-foundation.vercel.app"
```
Cả ba phải 200. **Nhớ dùng UA trình duyệt cho vtv.vn** — UA mặc định của curl bị chặn.

- [ ] **Bước 6: Báo cáo**

Viết báo cáo ngắn: đã đổi gì, kết quả thật từng bước, và **những gì chưa làm được**.
Không tuyên bố xong nếu có bước nào chưa chạy.
