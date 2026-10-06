# Song ngữ — 8 trang còn lại + khung trang (kế hoạch 2/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mọi URL `/en/*` hiển thị tiếng Anh thật — không còn chữ tiếng Việt ngoài tên riêng, thuật ngữ làng có chú giải, và dữ liệu gốc được đánh dấu `lang="vi"`.

**Architecture:** Lặp lại đúng mẫu trang Triết Lý của kế hoạch 1: mỗi trang có `lib/content/<trang>/{types,vi,en}.ts`, trang thành vỏ mỏng nhận nội dung theo `locale`. Khung trang (footer, skip link, chat, nhãn nhịp, metadata gốc) đi TRƯỚC vì nó hiện trên mọi trang. Cổng nghiệm thu cuối là một script quét HTML thật của bản build và đếm từ có dấu tiếng Việt.

**Tech Stack:** Next.js 16.1.6 App Router (Turbopack), TypeScript, vitest, Tailwind.

**Spec:** `docs/superpowers/specs/2026-09-23-song-ngu-va-hinh-anh-design.md` (mục 2.4–2.8, 4, 5). Đọc kèm `docs/NHAT_KY_TRIEN_KHAI.md` mục 24/09/2026 — tám cái bẫy và bảy món nợ của kế hoạch 1.

## Global Constraints

- Tiếng Việt KHÔNG tiền tố; tiếng Anh `/en/<slug-tiếng-Anh>` theo bảng `lib/i18n/routes.ts`. Không đổi URL tiếng Việt nào.
- Bước nhấc chữ ra `vi.ts` giữ nguyên TỪNG DẤU CÂU của bản đang chạy. Nhấc và dịch là hai việc tách rời.
- Thuật ngữ làng: giữ tiếng Việt, kèm chú giải tiếng Anh LẦN ĐẦU xuất hiện trên mỗi trang, các lần sau chỉ còn tên tiếng Việt (spec 2.6). Nguồn chú giải: `lib/content/glossary.ts`.
- "Maker Hub" giữ nguyên. "Làng Maker" giữ nguyên, lần đầu kèm "(the Maker Village)".
- Bản tiếng Anh viết như viết bản gốc, giọng văn theo `lib/content/triet-ly/en.ts`. Không dịch máy rồi để đó.
- KHÔNG dịch: trường `nguon` (căn cứ dẫn nguồn), tên người, địa chỉ, tên hub, tên sản phẩm (ThingBot, NEO One, VIA, K12 Maker…), tên giải đấu/chương trình (giữ nguyên + chú giải lần đầu, spec mục 6.4), và dữ liệu CMS (tiêu đề/mô tả video YouTube, bài viết). Dữ liệu gốc tiếng Việt hiển thị trên trang tiếng Anh PHẢI bọc `lang="vi"`.
- KHÔNG dịch `dashboard`, `dang-nhap`, `admin`. Không đụng 5 redirect trong `next.config.ts`. Không sửa khoá Google, mật khẩu admin (vé riêng).
- Mọi đường dẫn nội bộ đi qua `pathFor()` — không ghi cứng `/hanh-trinh`, `/cong-cu`…
- Font OG không có glyph mũi tên: chuỗi nào có thể vào ảnh OG dùng `»`, không dùng `→ ↻`.
- Next 16: `params` là `Promise<{ locale: string }>` — luôn `isLocale()` + `DEFAULT_LOCALE` (đã gói trong `localeOf()` ở Task 1).
- Comment trong mã viết tiếng Việt, theo nếp repo.

## Review Focus

1. **Liên kết trên trang `/en` dẫn về trang tiếng Việt** — bấm bất kỳ link nội bộ nào trên `/en/*` phải ở lại `/en/*`. Pin: test `noi-bo-khong-ghi-cung.test.ts` ở Task 1 quét mã nguồn tìm `href="/` ghi cứng.
2. **Trang con video `/en/videos/<id>` trả 404** (hiện tại middleware từ chối mọi route động). Pin: test `rewriteTarget("/en/videos/abc")` ở Task 1.
3. **Trang đã dịch nhưng quên thêm vào `TRANSLATED_ROUTES`** → vẫn bị `noindex`, không vào sitemap, nút gợi ý không hiện. Pin: test hai chiều ở Task 9 (mọi route khác `home`… đều phải có trong tập sau kế hoạch này).
4. **Dữ liệu gốc tiếng Việt (tiêu đề video, tên hub, `nguon`) lọt ra trang `/en` không đánh dấu** — trình đọc màn hình đọc sai giọng, và script nghiệm thu báo rò. Pin: script `check-en-leaks` ở Task 9 bỏ qua phần tử `lang="vi"`, báo mọi chỗ còn lại.
5. **Bản `en` trôi khỏi bản `vi`** (thêm thẻ bên vi, quên bên en). Pin: mỗi Task nội dung có test `missingKeys` + `emptyStringKeys` + "thật sự đã dịch".

---

## File Structure

| Tệp | Trách nhiệm |
|---|---|
| `lib/i18n/params.ts` (mới) | `localeOf(params)` — gom 3 dòng lặp ở mọi trang |
| `lib/seo/page-metadata.ts` (mới) | `pageMetadata(key, locale, meta)` — canonical + hreflang (chỉ khi đã dịch) + OG có ảnh |
| `lib/i18n/routes.ts` (sửa) | thêm route động video: `videoPath(id, locale)`, `canonicalPathFromEn`/`alternatePath` hiểu `/en/videos/<id>` |
| `lib/content/khung/{types,vi,en}.ts` (mới) | chữ của khung trang: footer, skip link, chat, theme toggle, header aria, metadata gốc |
| `lib/content/trang-chu/…` | Trang chủ |
| `lib/content/cach-hoc/…` | `/hanh-trinh` + 3 trang nhịp |
| `lib/content/cong-cu/…`, `cho-mentor/…` | Công Cụ, Cho Mentor |
| `lib/content/cong-dong/…` | Cộng Đồng + Maker Hub + Dự Án + Tạp Chí |
| `lib/content/video/…` | Video Hub + trang video |
| `lib/content/lang-maker-trang/…` | Làng Maker (khác `lib/content/lang-maker.ts` — tệp đó giữ dữ liệu tiếng Việt và test của nó) |
| `scripts/check-en-leaks.mjs` (mới) | cổng nghiệm thu: quét HTML thật, đếm từ tiếng Việt |
| `lib/i18n/en-allowlist.ts` (mới) | tên riêng/thuật ngữ được phép xuất hiện trên trang `/en` |

---

### Task 1: Hạ tầng dùng chung

**Files:**
- Create: `lib/i18n/params.ts`, `lib/seo/page-metadata.ts`, `lib/seo/page-metadata.test.ts`, `lib/i18n/route-dirs.test.ts`, `lib/i18n/noi-bo-khong-ghi-cung.test.ts`
- Modify: `lib/i18n/routes.ts`, `lib/i18n/routes.test.ts`, `lib/i18n/middleware-rewrite.test.ts`, `app/(site)/[locale]/(public)/triet-ly/page.tsx` (chuyển sang `pageMetadata`)

**Interfaces — Produces:**
```ts
// lib/i18n/params.ts
export async function localeOf(params: Promise<{ locale: string }>): Promise<Locale>;
// lib/seo/page-metadata.ts
export function pageMetadata(key: RouteKey, locale: Locale, meta: { title: string; description: string }): Metadata;
// lib/i18n/routes.ts
export function videoPath(id: string, locale: Locale): string; // "/video-hub/<id>" | "/en/videos/<id>"
```

- [ ] **Step 1: Viết test hỏng**

`lib/seo/page-metadata.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { pageMetadata } from "./page-metadata";

const META = { title: "T", description: "D" };

describe("pageMetadata", () => {
  it("canonical trỏ về chính trang theo đúng ngôn ngữ", () => {
    expect(pageMetadata("tools", "en", META).alternates?.canonical).toBe("/en/tools");
    expect(pageMetadata("tools", "vi", META).alternates?.canonical).toBe("/cong-cu");
  });

  it("chỉ khai hreflang khi trang đã có bản dịch thật", () => {
    // philosophy đã dịch từ kế hoạch 1
    expect(pageMetadata("philosophy", "vi", META).alternates?.languages).toEqual({
      vi: "/triet-ly",
      en: "/en/philosophy",
      "x-default": "/triet-ly",
    });
  });

  it("luôn mang ảnh OG — openGraph của trang ghi đè layout, không trộn", () => {
    const og = pageMetadata("tools", "en", META).openGraph;
    expect(og?.images).toBeDefined();
    expect(og?.locale).toBe("en_US");
  });
});
```
Thêm vào test đó một ca hreflang vắng cho route CHƯA dịch — dùng một key chắc chắn chưa vào `TRANSLATED_ROUTES` lúc chạy Task 1 (`"magazine"`), và ghi chú trong test: "Task 6 thêm magazine vào tập; khi đó đổi ca này sang key khác hoặc xoá — kế hoạch 2 dịch hết mọi route".

`lib/i18n/route-dirs.test.ts` (nợ kế hoạch 1: đổi tên thư mục → test xanh, production 404):
```ts
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";

const GOC = join(process.cwd(), "app/(site)/[locale]/(public)");

describe("ROUTES[*].vi có thư mục route thật", () => {
  for (const [key, { vi }] of Object.entries(ROUTES)) {
    it(key, () => {
      const rel = vi === "/" ? "" : vi.slice(1);
      // ba trang nhịp đi qua thư mục động [slug]
      const tinh = join(GOC, rel, "page.tsx");
      const dong = join(GOC, rel.replace(/[^/]+$/, "[slug]"), "page.tsx");
      expect(existsSync(tinh) || existsSync(dong)).toBe(true);
    });
  }
});
```

Thêm vào `lib/i18n/middleware-rewrite.test.ts`:
```ts
it("trang video tiếng Anh viết lại về route video-hub", () => {
  expect(rewriteTarget("/en/videos/mv-thingbot-kit-2026")).toBe("/en/video-hub/mv-thingbot-kit-2026");
});
it("đường dẫn video tiếng Việt giả dưới /en vẫn 404", () => {
  expect(rewriteTarget("/en/video-hub/mv-thingbot-kit-2026")).toBe("/en/__khong-ton-tai__");
});
it("id video không được chứa dấu / (chặn /en/videos/a/b)", () => {
  expect(rewriteTarget("/en/videos/a/b")).toBe("/en/__khong-ton-tai__");
});
```
Thêm vào `lib/i18n/routes.test.ts`:
```ts
it("alternatePath hiểu trang video", () => {
  expect(alternatePath("/video-hub/abc", "en")).toBe("/en/videos/abc");
  expect(alternatePath("/en/videos/abc", "vi")).toBe("/video-hub/abc");
});
it("videoPath", () => {
  expect(videoPath("abc", "vi")).toBe("/video-hub/abc");
  expect(videoPath("abc", "en")).toBe("/en/videos/abc");
});
```

`lib/i18n/noi-bo-khong-ghi-cung.test.ts` — bắt link ghi cứng tiếng Việt (Review Focus 1):
```ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";

function tsx(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return tsx(p);
    return p.endsWith(".tsx") ? [p] : [];
  });
}

const VI_PATHS = Object.values(ROUTES).map((r) => r.vi).filter((p) => p !== "/");
const FILES = [...tsx("app/(site)"), ...tsx("components")].filter((f) => !f.includes("dashboard"));

describe("không ghi cứng đường dẫn tiếng Việt trong href", () => {
  for (const f of FILES) {
    it(f, () => {
      const src = readFileSync(f, "utf8");
      const hits = VI_PATHS.filter((p) =>
        new RegExp(`href=\\{?[\`"]${p.replace(/\//g, "\\/")}(["\`/?]|$)`).test(src),
      );
      expect(hits).toEqual([]);
    });
  }
});
```
Test này sẽ ĐỎ cho tới khi Task 2–8 xong. Đánh dấu `describe.skip` ở Task 1, Task 9 bỏ `.skip`. Ghi chú lý do ngay trên dòng `describe.skip`.

- [ ] **Step 2: Chạy, xác nhận hỏng**

Run: `npx vitest run lib/seo lib/i18n`
Expected: FAIL — `pageMetadata`/`videoPath` không tồn tại, 3 ca video rewrite đỏ.

- [ ] **Step 3: Cài đặt**

`lib/i18n/params.ts`:
```ts
import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";

/** Next 16 đưa `locale` dạng string thô — thu hẹp về union ở một chỗ duy nhất. */
export async function localeOf(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}
```

`lib/seo/page-metadata.ts`:
```ts
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor, type RouteKey } from "@/lib/i18n/routes";
import { TRANSLATED_ROUTES } from "@/lib/i18n/translated";
import { ogImages } from "./metadata";

/**
 * Metadata chuẩn cho một trang công khai. Gác TRANSLATED_ROUTES: route chưa
 * dịch thì KHÔNG khai hreflang (khai là nói dối Google rằng có bản dịch).
 * Luôn tự mang `images` vì openGraph của trang ghi đè nguyên khối của layout.
 */
export function pageMetadata(
  key: RouteKey,
  locale: Locale,
  meta: { title: string; description: string },
): Metadata {
  const url = pathFor(key, locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      ...(TRANSLATED_ROUTES.has(key) && {
        languages: {
          vi: pathFor(key, "vi"),
          en: pathFor(key, "en"),
          "x-default": pathFor(key, "vi"),
        },
      }),
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "vi_VN",
      url,
      title: meta.title,
      description: meta.description,
      images: ogImages(meta.title),
    },
  };
}
```

`lib/i18n/routes.ts` — thêm sau `ROUTES`:
```ts
/** Route động duy nhất cần dịch: trang một video. id không chứa "/". */
const VIDEO = { vi: "/video-hub/", en: "/en/videos/" } as const;
const ID_HOP_LE = /^[^/]+$/;

export function videoPath(id: string, locale: Locale): string {
  return `${VIDEO[locale]}${id}`;
}

function videoId(path: string, locale: Locale): string | null {
  if (!path.startsWith(VIDEO[locale])) return null;
  const id = path.slice(VIDEO[locale].length);
  return ID_HOP_LE.test(id) ? id : null;
}
```
Sửa `alternatePath`: trước khi trả `null`, thử `videoId(tidy(path), "vi")` / `videoId(tidy(path), "en")` rồi trả `videoPath(id, to)`. Sửa `canonicalPathFromEn`: nếu `videoId(wanted, "en")` khác null thì trả `` `/video-hub/${id}` ``. `routeKeyFromPath` giữ nguyên (trang video không phải RouteKey; middleware coi là chưa dịch → noindex — Task 7 sửa `shouldNoindex` cho trang video).

Chuyển `triet-ly/page.tsx` sang `localeOf` + `pageMetadata("philosophy", locale, meta)` — xoá khối `alternates/openGraph` viết tay.

- [ ] **Step 4: Chạy lại** — `npx vitest run && npx tsc --noEmit`. Expected: PASS hết (test ghi cứng đang skip).

- [ ] **Step 5: Phá hỏng có chủ đích** (nếp repo, xem `feedback_plan_tests_must_fail`): xoá tạm nhánh `TRANSLATED_ROUTES.has(key)` → test hreflang phải đỏ; đổi tên tạm thư mục `cong-cu` → `route-dirs.test.ts` phải đỏ. Hoàn lại, ghi kết quả vào commit message.

- [ ] **Step 6: Commit** — `feat(i18n): localeOf, pageMetadata, route động video, test thư mục route`

---

### Task 2: Khung trang (đi TRƯỚC mọi trang)

**Files:**
- Create: `lib/content/khung/{types,vi,en}.ts`, `lib/content/khung/khung.test.ts`
- Modify: `components/layout/footer.tsx`, `app/(site)/[locale]/(public)/layout.tsx` (skip link, truyền `locale` cho `ChatWidget`), `components/chat/chat-widget.tsx`, `components/layout/theme-toggle.tsx`, `components/layout/header.tsx` (aria Mở/Đóng menu), `components/layout/language-switcher.tsx` (aria-label), `components/common/stage-badge.tsx` (nhận `locale`, lấy tên từ `NHIP_NHAN_*`), `app/(site)/[locale]/layout.tsx` (`metadata` tĩnh → `generateMetadata` theo locale)

**Interfaces — Produces:**
```ts
export interface KhungContent {
  site: { tagline: string; description: string };        // thay SITE.tagline/description khi en
  skipLink: string;
  footer: {
    gioiThieu: string;          // "Nền tảng giáo dục STEM & Robot mở…"
    khoiXuong: string;          // "Khởi xướng bởi"
    cot: { tieuDe: string; links: { label: string; route?: RouteKey; href?: string }[] }[];
    banQuyen: string;           // ". Mã nguồn mở — Giáo dục mở."
    mucTieu: string;
  };
  chat: { ten: string; phuDe: string; chao: string; moiHoi: string; goiYTieuDe: string;
          goiY: string[]; dangNghi: string; loiKetNoi: string; placeholder: string;
          moChat: string; dongChat: string };
  theme: { sangSangSang: string; sangSangToi: string };
  menu: { mo: string; dong: string };
  chuyenNgonNgu: string;        // tiền tố aria "Chuyển sang" / "Switch to"
}
export const KHUNG_VI: KhungContent; export const KHUNG_EN: KhungContent;
export function khung(locale: Locale): KhungContent;
// StageBadge mới:
export function StageBadge({ stage, locale }: { stage: NhipSlug; locale: Locale }): JSX.Element;
```
Đọc `chat-widget.tsx` toàn bộ trước khi viết type — nếu có chuỗi hiển thị nào ngoài danh sách trên (aria của nút mở/đóng, nút gửi), thêm trường. Footer: cột "Kết Nối" giữ `href` ngoài (`mailto:`, Facebook, GitHub, YouTube), các cột khác dùng `route` → `pathFor(route, locale)`. Nhãn "Facebook: Bình dân học STEM" bản en: `Facebook: Bình dân học STEM (our parents’ group)` — tên nhóm là tên riêng.

- [ ] **Step 1: Test hỏng** `khung.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { KHUNG_EN } from "./en";
import { KHUNG_VI } from "./vi";

describe("KHUNG", () => {
  it("en không thiếu khoá", () => expect(missingKeys(KHUNG_VI, KHUNG_EN)).toEqual([]));
  it("không trường rỗng", () => {
    expect(emptyStringKeys(KHUNG_VI)).toEqual([]);
    expect(emptyStringKeys(KHUNG_EN)).toEqual([]);
  });
  it("vi giữ nguyên chữ đang chạy", () => {
    expect(KHUNG_VI.skipLink).toBe("Bỏ qua menu, tới nội dung chính");
    expect(KHUNG_VI.footer.mucTieu).toBe("Mục tiêu: 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot");
  });
  it("thật sự đã dịch", () => {
    expect(KHUNG_EN.footer.gioiThieu).not.toBe(KHUNG_VI.footer.gioiThieu);
    expect(KHUNG_EN.chat.goiY).not.toEqual(KHUNG_VI.chat.goiY);
  });
  it("link ngoài giống hệt nhau ở hai bản — địa chỉ không phải văn", () => {
    const ngoai = (k: typeof KHUNG_VI) => k.footer.cot.flatMap((c) => c.links.map((l) => l.href).filter(Boolean));
    expect(ngoai(KHUNG_EN)).toEqual(ngoai(KHUNG_VI));
  });
});
```
- [ ] **Step 2:** `npx vitest run lib/content/khung` → FAIL (module chưa có).
- [ ] **Step 3:** Viết `types.ts`, nhấc nguyên văn sang `vi.ts`, viết `en.ts`, sửa 8 tệp component. `StageBadge` có 4 nơi gọi (`cong-cu`, `video-card`, `video-hub/[videoId]`, …) — `grep -rn StageBadge` và truyền `locale` ở tất cả; nơi nào là client component chưa có locale thì nhận prop `locale` từ cha.
- [ ] **Step 4:** `npx vitest run && npx tsc --noEmit && npx eslint`.
- [ ] **Step 5: Kiểm mắt** — `npm run build && npm start`, `curl -s localhost:3000/en/philosophy` (trang duy nhất đã dịch) → footer, skip link tiếng Anh; `curl -s localhost:3000/triet-ly` → y nguyên chữ cũ. (Bẫy 1 nhật ký: tắt server bằng `pkill -f next-server; lsof -ti:3000 | xargs kill -9`.)
- [ ] **Step 6: Commit** — `feat(i18n): dịch khung trang — footer, skip link, chat, nhãn nhịp, metadata gốc`

---

### Task 3: Trang chủ

**Files:**
- Create: `lib/content/trang-chu/{types,vi,en,trang-chu.test}.ts`
- Modify: `app/(site)/[locale]/(public)/page.tsx`, `components/home/{hero-section,learning-journey,impact-stats,partners-section,cta-section}.tsx`, `lib/i18n/translated.ts` (+`"home"`)

**Interfaces:**
```ts
export interface TrangChuContent {
  meta: { title: string; description: string };
  hero: { nhanTren: string; tieuDeChoi: string; tieuDeLam: string; tieuDeChiaSe: string;
          moTa: string; nutCachHoc: string; nutVideo: string; lapLai: string; mucTieu: string };
  baNhip: { tieuDe: string; phuDe: string; xemChiTiet: string };
  soLieu: { tieuDe: string; phuDe: string;
            hub: { label: string; note: string }; tinh: { label: string; chuaCo: string };
            video: { label: string; note: string }; nhip: { label: string; note: string };
            mucTieuDam: string; mucTieuThan: string };
  doiTac: { tieuDe: string; phuDe: string; vaiTro: Record<"MakerViet"|"ThingEdu"|"Rogo"|"FPT Shop"|"FIRST Global", string> };
  cta: { tieuDe: string; moTa: string; nutCachHoc: string; nutHub: string };
}
```
Các component nhận `t` (phần nội dung của mình) + `locale`. Ba chip nhịp ở hero lấy tên từ `NHIP_NHAN_*` và href từ `pathFor`. `impact-stats.tsx` là client component — nhận chuỗi qua props, KHÔNG import en/vi trực tiếp (giữ bundle nhỏ). `toLocaleString` theo `locale === "en" ? "en-US" : "vi-VN"`. Tên tỉnh thành (`note` của ô tỉnh) là dữ liệu → bọc `<span lang="vi">` khi locale en. Câu Bác Hồ "Ai có súng dùng súng, ai có gươm dùng gươm" dịch kèm nguồn: `“Those with guns use guns, those with swords use swords” — Hồ Chí Minh`.

- [ ] **Step 1: Test hỏng** — cùng 4 khối như Task 2 (`missingKeys`, `emptyStringKeys` cả hai bản, vi giữ nguyên `hero.moTa` = `"Ba nhịp lặp lại ở Làng Maker: chơi cho tò mò, bắt tay làm ra thứ chạy được, rồi kể lại cho người khác nghe."`, en ≠ vi ở `hero.moTa` và `cta.tieuDe`), cộng:
```ts
it("en giữ Làng Maker và chú giải lần đầu", () => {
  expect(TRANG_CHU_EN.hero.moTa).toContain("Làng Maker (the Maker Village)");
});
```
- [ ] **Step 2:** chạy → FAIL.
- [ ] **Step 3:** nhấc → `vi.ts`, viết `en.ts`, sửa 6 tệp, thêm `"home"` vào `TRANSLATED_ROUTES`. Trang chủ thêm `generateMetadata` dùng `pageMetadata("home", …)`.
- [ ] **Step 4:** `npx vitest run && npx tsc --noEmit && npx eslint`.
- [ ] **Step 5:** Kiểm bằng HTML thật: `/` giống hệt trước (so bằng `perl -0777 -pe 's/<script.*?<\/script>//gs; s/<style.*?<\/style>//gs; s/<[^>]+>/ /g'` — bẫy 2 nhật ký), `/en` tiếng Anh.
- [ ] **Step 6: Commit** — `feat(i18n): trang chủ song ngữ`

---

### Task 4: Cách Học + ba trang nhịp

**Files:**
- Create: `lib/content/cach-hoc/{types,vi,en,cach-hoc.test}.ts`
- Modify: `app/(site)/[locale]/(public)/hanh-trinh/page.tsx`, `hanh-trinh/[slug]/page.tsx`, `lib/i18n/translated.ts` (+`howWeLearn`, `nhipPlay`, `nhipMake`, `nhipShare`)

**Interfaces:**
```ts
export interface NhipTrang {            // prose dài của một nhịp — bốn trường ngắn đã có ở NHIP_NHAN_*
  moTaDai: string;                       // nhiều đoạn, ngăn bằng \n\n
  taiLangMaker: string;
  huong?: { title: string; doing: string }[];   // tools giữ ở NHIP (tên riêng)
  nguyenTac?: { title: string; desc: string }[];
}
export interface CachHocContent {
  meta: { title: string; description: string };
  tieuDe: string; phuDe: string; ghiChuTuoi: string;
  nhip: Record<NhipSlug, NhipTrang & { metaTitle: string }>;  // "Nhịp Chơi" / "The Play beat"
  nhan: { tieuDeCachHoc: string; taiLangMaker: string; namNhomTram: string; buoiDau: string;
          baHuong: string; baHuongGhiChu: string; doNghe: string; baNguyenTac: string;
          videoNhip: string; xemVideo: string; chuaCoVideo: string; timHub: string;
          nhipTiepTheo: string /* "Nhịp tiếp theo:" */; khongTimThay: string };
}
```
`vi.ts` KHÔNG chép prose — dựng từ `NHIP` (`moTaDai: getNhip("choi").moTaDai`…) để không có hai nguồn trôi nhau (cùng lý do `triet-ly/vi.ts` lấy nguyên lý từ `nhip.ts`). `en.ts` viết tay.

- [ ] **Step 1: Test hỏng** — khối chuẩn, cộng:
```ts
it("vi dựng từ NHIP, không chép tay", () => {
  for (const n of NHIP) expect(CACH_HOC_VI.nhip[n.slug].moTaDai).toBe(n.moTaDai);
});
it("số hướng làm và nguyên tắc khớp NHIP", () => {
  for (const n of NHIP) {
    expect(CACH_HOC_EN.nhip[n.slug].huong?.length).toBe(n.huong?.length);
    expect(CACH_HOC_EN.nhip[n.slug].nguyenTac?.length).toBe(n.nguyenTac?.length);
  }
});
it("ba nguyên tắc nhịp Làm khớp ba nguyên lý đầu của Triết Lý bản en", () => {
  expect(CACH_HOC_EN.nhip.lam.nguyenTac?.map((x) => x.title))
    .toEqual(TRIET_LY_EN.nguyenLy.slice(0, 3).map((x) => x.title));
});
```
- [ ] **Step 2:** chạy → FAIL.
- [ ] **Step 3:** viết 3 tệp; `[slug]/page.tsx` nhận `params: Promise<{ locale: string; slug: string }>`, `generateMetadata` dùng `pageMetadata(NHIP_ROUTE_KEY[slug], locale, …)` — chuyển hằng `NHIP_ROUTE_KEY` từ `components/nhip/vong-lap.tsx` sang `lib/content/nhip-slug.ts` và export, để hai nơi dùng chung. Link Video Hub: `` `${pathFor("videos", locale)}?stage=${slug}` ``. Breadcrumb, nút nhịp kế tiếp, nút tìm hub đều qua `pathFor`.
- [ ] **Step 4–6:** vitest + tsc + eslint; kiểm HTML `/hanh-trinh/lam` không đổi, `/en/how-we-learn/make` tiếng Anh; commit `feat(i18n): Cách Học và ba trang nhịp song ngữ`.

---

### Task 5: Công Cụ + Cho Mentor

**Files:**
- Create: `lib/content/cong-cu/{types,vi,en,cong-cu.test}.ts`, `lib/content/cho-mentor/{types,vi,en,cho-mentor.test}.ts`
- Modify: `cong-cu/page.tsx`, `cho-mentor/page.tsx`, `translated.ts` (+`tools`, `forMentors`)

**Interfaces:**
```ts
export interface CongCu { name: string; nhip: NhipSlug; type: string; origin: string; desc: string; features: string[] }
export interface CongCuContent { meta: {title;description}; tieuDe: string; phuDe: string; ghiChu: string; tools: CongCu[] }

export interface ChoMentorContent {
  meta: {title;description}; tieuDe: string; phuDe: string;
  taiNguyen: { icon: string; title: string; desc: string; route: RouteKey }[];
  cachTroThanh: string; buoc: string[]; nutLienHe: string;
}
```
`name` và `nhip` của công cụ giữ nguyên hai bản (test canh). "Made in Vietnam (Rogo)" giữ nguyên. "Hỗ trợ tiếng Việt" → "Vietnamese supported".

- [ ] **Step 1:** test chuẩn cho cả hai, cộng `expect(CONG_CU_EN.tools.map(t => [t.name, t.nhip])).toEqual(CONG_CU_VI.tools.map(t => [t.name, t.nhip]))` và cùng phép so cho `icon`/`route` của `taiNguyen`.
- [ ] **Step 2–6:** FAIL → viết → vitest/tsc/eslint → kiểm HTML hai bản → commit `feat(i18n): Công Cụ và Cho Mentor song ngữ`.

---

### Task 6: Cộng Đồng, Maker Hub, Dự Án, Tạp Chí

**Files:**
- Create: `lib/content/cong-dong/{types,vi,en,cong-dong.test}.ts`
- Modify: `cong-dong/page.tsx`, `cong-dong/maker-hub/page.tsx`, `cong-dong/du-an/page.tsx`, `cong-dong/tap-chi/page.tsx`, `translated.ts` (+`community`, `makerHubs`, `projects`, `magazine`); cập nhật ca "route chưa dịch" trong `page-metadata.test.ts` (Task 1 ghi chú)

**Interfaces:**
```ts
export interface CongDongContent {
  tongQuan: { meta: {title;description}; tieuDe: string; phuDe: string;
              soLieu: { hub: string; tinh: string; video: string };
              muc: { icon: string; title: string; desc: string; route: RouteKey; color: string }[];
              ketNoi: string; linkNgoai: { name: string; url: string; desc: string }[] };
  hub: { meta: {title;description}; tieuDe: string; phuDe: string;
         loai: Record<MakerHub["type"], string>;   // màu giữ trong page
         lich: string; mentor: string; thietBi: string; lienHe: string; dangCapNhat: string;
         banDo: string; dangHoatDong: string; tinh: string; moHub: string; guiDangKy: string;
         rongTieuDe: string; rongMoTa: string; rongNut: string; mailSubject: string };
  duAn: { meta: {title;description}; tieuDe: string; phuDe: string;
          rong: { title: string; description: string; actionLabel: string; mailSubject: string } };
  tapChi: { meta: {title;description}; tieuDe: string; phuDe: string;
            loai: Record<"tap-chi"|"du-an"|"huong-dan"|"tin-tuc", string>; tacGia: string;
            rong: { title: string; description: string; actionLabel: string; mailSubject: string } };
}
```
Trên `/en`: `hub.name`, `hub.address`, tên tỉnh (`city`), tên mentor, tiêu đề/tóm tắt bài viết bọc `<span lang="vi">` (hoặc đặt `lang="vi"` lên phần tử chứa sẵn). `mailto:` subject mã hoá bằng `encodeURIComponent(t.mailSubject)` thay vì chuỗi `%20` ghi tay.

- [ ] **Step 1:** test chuẩn cho `CONG_DONG_EN/VI`, cộng `url` của `linkNgoai` và `route` của `muc` giống hệt hai bản.
- [ ] **Step 2–6:** FAIL → viết → vitest/tsc/eslint → kiểm 4 trang hai bản → commit `feat(i18n): bốn trang Cộng Đồng song ngữ`.

---

### Task 7: Video Hub + trang một video

**Files:**
- Create: `lib/content/video/{types,vi,en,video.test}.ts`
- Modify: `video-hub/page.tsx`, `video-hub/[videoId]/page.tsx`, `components/video/{video-hub-content,video-filter,video-card}.tsx`, `middleware.ts` (`shouldNoindex` coi `/en/videos/<id>` là đã dịch khi `videos` ∈ `TRANSLATED_ROUTES`), `translated.ts` (+`videos`)

**Interfaces:**
```ts
export interface VideoContent {
  meta: {title;description}; tieuDe: string; phuDe: string; dangTai: string;
  tatCa: string; timKiem: string; khongThay: string; xoaLoc: string;
  tuoi: string;            // hậu tố: "tuổi" | "years"  → `${ageRange} ${t.tuoi}`
  lienQuan: string; chuaLienQuan: string; quayLai: string;
}
```
Ba component client nhận `t: VideoContent` + `locale` qua props từ trang (server). `VideoCard` dẫn tới `videoPath(video.id, locale)`. Bộ lọc nhịp dùng tên từ `NHIP_NHAN_*`. Trên `/en`: `video.title`, `video.description`, `tags` bọc `lang="vi"`. Trang một video có `generateMetadata` (hiện chưa có): title = tiêu đề video, canonical = `videoPath(id, locale)`, hreflang vi↔en.

- [ ] **Step 1:** test chuẩn + test middleware:
```ts
it("trang video tiếng Anh không bị noindex khi Video Hub đã dịch", () => {
  expect(shouldNoindex("/en/videos/mv-thingbot-kit-2026")).toBe(false);
});
```
(`shouldNoindex` cần `export` để test — đặt nó sang `lib/i18n/noindex.ts` cho test gọi được mà không nạp `next/server`.)
- [ ] **Step 2–6:** FAIL → viết → vitest/tsc/eslint → `curl -sI localhost:3000/en/videos/mv-thingbot-kit-2026` phải 200 không có `x-robots-tag`; click thẻ video trên `/en/videos` ở lại `/en` → commit `feat(i18n): Video Hub và trang video song ngữ`.

---

### Task 8: Làng Maker

**Files:**
- Create: `lib/content/lang-maker-trang/{types,vi,en,lang-maker-trang.test}.ts`
- Modify: `lang-maker/page.tsx`, `translated.ts` (+`makerVillage`). `lib/content/lang-maker.ts` GIỮ NGUYÊN (test của nó canh dữ liệu tiếng Việt + `nguon`).

**Interfaces:**
```ts
export interface LangMakerTrangContent {
  meta: {title;description}; tieuDe: string; phuDe: string;
  luanDe: { tieuDe: string; doan: string[] };   // đoạn có <strong>/<em> → tách: xem ghi chú
  laGi: { tieuDe: string; doan: string[]; tamNhin: {tieuDe: string; noiDung: string}; suMenh: {tieuDe: string; noiDung: string} };
  nguoiTrongLang: { tieuDe: string; moTa: string; vai: { ten: string; laAi: string }[]; ketDanLang: string; ketTruoc: string; ketChiaSe: string; ketSau: string };
  nguoiDan: { tieuDe: string; moTa: string; coChungNhan: string;
              vai: { ten: string; dan: string; viecCuThe: string }[];
              oCacHub: string; ngheMentor: Record<string, string>; /* key = Mentor.ten */
              danhSachDai: string; gioiThieuMinh: string; rongMoTa: string; mailSubject: string };
  muoiNam: { tieuDe: string; trichDan: { loi: string; ghiChu: string };
             moc: { tieuDe: string; chiTiet: string }[]; canCu: string;
             doNghe: { tieuDe: string; moTa: string } };
  cuaVao: { tieuDe: string; moTa: string; timHub: string; batDauChoi: string };
}
```
Đoạn có định dạng (`<strong>đối tác tư duy</strong>`, `<em>cùng</em>`): lưu dạng mảng mảnh `{ text: string; dam?: true; nghieng?: true }[]` — KHÔNG dùng `dangerouslySetInnerHTML`. Định nghĩa kiểu `Manh` trong `types.ts` và hàm render nhỏ trong page.

`vai`, `moc` khớp số lượng và thứ tự với `NGUOI_TRONG_LANG`, `NGUOI_DAN`, `MUOI_NAM`; phần không phải chữ (`bac`, `moc`, `nam`, `nguon`, `trongThangMakerCoach`) lấy từ `lang-maker.ts`, KHÔNG chép. `vi.ts` dựng từ `lang-maker.ts` cho các trường đã có ở đó. Trên `/en`, thẻ "Căn cứ:" giữ `nguon` nguyên văn bọc `lang="vi"`. Tên vai giữ tiếng Việt + chú giải lần đầu theo `GLOSSARY` (bản en dùng `` `${GLOSSARY.thoCa.vi} — ${GLOSSARY.thoCa.en}` `` cho lần đầu). "Bô Lão" chưa có trong glossary — thêm `boLao: { vi: "Bô Lão", en: "Elder Counsel — advises the village, certifies no one" }` vào `glossary.ts` (chốt luôn câu hỏi treo: glossary.ts **dùng**, không bỏ; sửa luôn `baNhip.en` về `"Play, Make, Share"` cho khớp `triet-ly/en.ts`, cập nhật `glossary.test.ts`).

Trích dẫn 2017: bản gốc là tiếng Anh trong slide — bản en dùng câu tiếng Anh nguyên văn nếu có trong lưu trữ; nếu không tìm được nguyên văn thì dịch ngược và đổi `ghiChu` thành "Translated back from the Vietnamese rendering of the original English slide" — KHÔNG được tự nhận là nguyên văn.

- [ ] **Step 1:** test chuẩn, cộng:
```ts
it("số vai và số mốc khớp dữ liệu gốc", () => {
  expect(LM_EN.nguoiTrongLang.vai).toHaveLength(NGUOI_TRONG_LANG.length);
  expect(LM_EN.nguoiDan.vai).toHaveLength(NGUOI_DAN.length);
  expect(LM_EN.muoiNam.moc).toHaveLength(MUOI_NAM.length);
});
it("mọi mentor có nghề bản en", () => {
  for (const m of MENTORS.filter((m) => m.nghe)) expect(LM_EN.nguoiDan.ngheMentor[m.ten]).toBeTruthy();
});
it("tên vai bản en giữ tiếng Việt", () => {
  expect(LM_EN.nguoiTrongLang.vai.map((v) => v.ten.split(" — ")[0]))
    .toEqual(NGUOI_TRONG_LANG.map((v) => v.ten));
});
```
- [ ] **Step 2–6:** FAIL → viết → vitest/tsc/eslint → so HTML `/lang-maker` trước/sau giống hệt; `/en/maker-village` tiếng Anh → commit `feat(i18n): trang Làng Maker song ngữ`.

---

### Task 9: Cổng nghiệm thu — quét chữ tiếng Việt trên bản build thật

**Files:**
- Create: `scripts/check-en-leaks.mjs`, `lib/i18n/en-allowlist.ts`, `lib/i18n/translated.test.ts`
- Modify: `lib/i18n/noi-bo-khong-ghi-cung.test.ts` (bỏ `.skip`), `package.json` (`"check:en": "node scripts/check-en-leaks.mjs"`), `docs/NHAT_KY_TRIEN_KHAI.md`

- [ ] **Step 1: Test hai chiều cho cái van** `translated.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { ROUTES, type RouteKey } from "./routes";
import { TRANSLATED_ROUTES } from "./translated";

describe("TRANSLATED_ROUTES", () => {
  it("sau kế hoạch 2, mọi route công khai đều đã dịch", () => {
    expect([...TRANSLATED_ROUTES].sort()).toEqual((Object.keys(ROUTES) as RouteKey[]).sort());
  });
});
```

- [ ] **Step 2: Script quét** `scripts/check-en-leaks.mjs`:
```js
// Dùng: node scripts/check-en-leaks.mjs [baseUrl]  (mặc định http://localhost:3000)
// Đọc HTML thật của mọi trang /en, bỏ <script>/<style> và mọi phần tử lang="vi",
// rồi liệt kê từ có chữ cái riêng của tiếng Việt không nằm trong danh sách cho phép.
import { EN_PATHS, ALLOW } from "../lib/i18n/en-allowlist.ts"; // chạy bằng: node --experimental-strip-types
const BASE = process.argv[2] ?? "http://localhost:3000";
const VI = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;

function strip(html) {
  let s = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ");
  // bỏ phần tử đánh dấu lang="vi" — lặp tới khi không còn (lồng nhau)
  const re = /<(\w+)\b[^>]*\blang="vi"[^>]*>[\s\S]*?<\/\1>/i;
  while (re.test(s)) s = s.replace(re, " ");
  return s.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
}

let tong = 0;
for (const path of EN_PATHS) {
  const res = await fetch(BASE + path);
  if (res.status !== 200) { console.log(`✗ ${path} → ${res.status}`); tong++; continue; }
  let text = strip(await res.text());
  for (const a of ALLOW) text = text.split(a).join(" ");
  const ro = [...new Set(text.split(/\s+/).filter((w) => VI.test(w)))];
  console.log(`${ro.length ? "✗" : "✓"} ${path}${ro.length ? "  " + ro.join(" ") : ""}`);
  tong += ro.length;
}
process.exit(tong ? 1 : 0);
```
`lib/i18n/en-allowlist.ts` export `EN_PATHS` = mọi `ROUTES[*].en` + `"/en/videos/mv-thingbot-kit-2026"`, và `ALLOW` = tên riêng/thuật ngữ được phép, sắp DÀI TRƯỚC NGẮN SAU (để "Làng Maker" bị gỡ trước "Làng"): các `GLOSSARY[*].vi`, "Bô Lão", "Tiếng Việt" (nút chuyển ngôn ngữ), tên 4 mentor, "Hồ Chí Minh", "Bình Dân Học Vụ", "Bình dân học STEM", "Faddy Dế", "Lê Ngọc Tuấn"… Mỗi mục thêm vào phải có lý do trong comment; KHÔNG thêm từ thường.

Nếu Node trong máy không chạy được `.ts` (`node -v` < 22.6), viết `en-allowlist.mjs` thay vì `.ts` và cho `translated.test.ts` import từ đó.

- [ ] **Step 3: Chứng minh script bắt được** — chạy khi CHƯA xong Task 2–8 (hoặc tạm hoàn lại `footer.tsx` bằng `git stash`) → phải ✗ ở mọi trang. Ghi số liệu "trước" vào nhật ký.
- [ ] **Step 4: Chạy thật** — `rm -rf .next && npm run build && npm start &`, đợi `curl -s -o /dev/null -w '%{http_code}' localhost:3000/` = 200, `npm run check:en` → toàn ✓, exit 0. Bỏ `.skip` ở test ghi cứng, `npx vitest run` xanh.
- [ ] **Step 5: Kiểm theo spec mục 5** — 14 URL tiếng Việt vẫn 200 không redirect; 5 redirect cũ còn sống; nút chuyển ngôn ngữ từ mỗi trang sang đúng trang đối ứng (14 cặp, bằng `alternatePath` + curl); `grep -i 'hreflang='` có cặp vi↔en + x-default trên mọi trang; `curl /sitemap.xml` có đủ 28 URL; ảnh OG `curl -sI /opengraph-image` = 200 image/png.
- [ ] **Step 6:** `npx tsc --noEmit && npx eslint && npx vitest run` — ghi số test.
- [ ] **Step 7: Nhật ký** — thêm mục 06/10/2026 vào đầu `docs/NHAT_KY_TRIEN_KHAI.md`: số từ rò trước/sau, bẫy mới gặp, nợ còn lại (ảnh OG bản tiếng Anh, khối "đang được cộng đồng dịch" — xem dưới).
- [ ] **Step 8: Commit** — `test(i18n): cổng quét chữ tiếng Việt trên trang /en, van TRANSLATED_ROUTES hai chiều`

---

## Ngoài phạm vi, cố ý

- **Ảnh OG bản tiếng Anh** (spec 2.7): `app/opengraph-image.tsx` là ảnh tĩnh duy nhất ở gốc `app/`. Làm riêng vì phải đụng cơ chế N-01 của kế hoạch 1.
- **Khối "Bản tiếng Việt đang được cộng đồng dịch"** trong `doc-papert` (câu hỏi treo 1): giữ nguyên, chờ chủ dự án.
- **Câu trả lời của chat Neo Trẻ**: chỉ dịch khung chat; ngôn ngữ trả lời do Gemini quyết, và khoá Gemini đang hỏng.
- **JSON-LD `audienceType`**: dữ liệu cho máy, một bản.
- Kế hoạch 3 (69 ảnh + 5 sơ đồ).
