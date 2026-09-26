# Hạ tầng song ngữ Việt–Anh — Kế hoạch thi công (kế hoạch 1/3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng xong hạ tầng song ngữ và đưa **trọn một trang (Triết Lý)** đi hết đường từ tiếng Việt sang tiếng Anh, để chứng minh khuôn mẫu chạy được trước khi nhân ra tám trang còn lại.

**Architecture:** Một cây route `app/(site)/[locale]/(public)/…` với hai root layout (site và admin). Tên thư mục route **luôn giữ slug tiếng Việt**; `middleware.ts` dịch slug tiếng Anh sang slug tiếng Việt khi viết lại đường dẫn. Văn xuôi nhấc khỏi JSX vào cặp `vi.ts`/`en.ts` dùng chung một `interface`, kèm một bộ kiểm tra tương đương khoá để bắt chỗ dịch sót ở cả mức kiểu lẫn mức chạy.

**Tech Stack:** Next.js 16.1.6 (App Router), React 19.2.3, TypeScript 5, Tailwind 4, vitest 3.2.7.

**Spec:** `docs/superpowers/specs/2026-09-23-song-ngu-va-hinh-anh-design.md`

**Ba kế hoạch, đây là kế hoạch 1:**

| # | Phạm vi | Vì sao tách |
|---|---|---|
| 1 (tệp này) | Hạ tầng + trang Triết Lý đi trọn | Chứng minh khuôn mẫu trên một trang trước khi nhân bản |
| 2 | Tám trang còn lại | Lặp lại khuôn mẫu đã chứng minh; viết sau khi biết hình dạng thật |
| 3 | Hình ảnh và sơ đồ (Phần B của spec) | Phụ thuộc hình dạng mô-đun nội dung do kế hoạch 1 sinh ra |

---

## ⚠️ Một điểm spec chưa chốt — phải đọc trước khi bắt đầu

Spec §2.2 và §2.4 nói "slug tiếng Anh" nhưng không nói **thư mục route** tên gì. Điều này
không tự suy ra được: một thư mục `app/(site)/[locale]/(public)/` không thể vừa tên
`lang-maker` vừa tên `maker-village`.

**Kế hoạch này chốt:** thư mục route giữ **slug tiếng Việt** (`lang-maker`, `triet-ly`, …),
và `middleware.ts` dịch `/en/maker-village` → viết lại thành `/en/lang-maker` trong nội bộ.
Người dùng vẫn thấy đúng URL tiếng Anh như spec §2.4 hứa.

Chọn vậy vì phương án còn lại — một route bắt-tất `[[...slug]]` kèm sổ đăng ký trang —
đánh đổi toàn bộ cấu trúc tệp hiện có để lấy một lợi ích không có thật.

**Hệ quả:** bảng ở spec §2.4 vẫn đúng nguyên văn với người dùng; chỉ thêm một tầng dịch
slug trong middleware. Không cần sửa spec.

---

## Global Constraints

Áp dụng cho **mọi** nhiệm vụ trong kế hoạch này.

- **Không đổi một dấu câu nào của bản tiếng Việt** trong các nhiệm vụ nhấc chữ (Task 8). Nhấc và dịch là hai việc tách rời (spec §2.5).
- **14 URL tiếng Việt ở spec §2.4 phải giữ nguyên**, trả 200, không redirect.
- **Không đụng năm redirect** trong `next.config.ts`.
- **Không dịch** `app/dashboard`, `app/(auth)/dang-nhap` (spec §2.8).
- **Không dịch trường `nguon`** — đó là căn cứ dẫn nguồn, không phải văn (spec §2.8).
- **Không tự động chuyển ngôn ngữ** theo IP hay `Accept-Language` (spec §2.3).
- Tệp test đặt **cạnh nguồn trong `lib/`** và tên `*.test.ts` — `vitest.config.ts` chỉ quét `lib/**/*.test.ts`. Test đặt chỗ khác sẽ **không bao giờ chạy**.
- Tên test và thông điệp commit viết **tiếng Việt**, theo lệ của repo.
- Chạy toàn bộ test bằng `npm test`. Kiểm kiểu bằng `npx tsc --noEmit`.
- Sau khi sửa `next.config.ts` hay `middleware.ts`: **khởi động lại dev server**, nó không nạp lại (spec §5).
- Commit sau mỗi nhiệm vụ. Làm trên nhánh `feat/song-ngu-va-hinh-anh`.

---

## Cấu trúc tệp

**Tạo mới**

| Tệp | Trách nhiệm |
|---|---|
| `lib/i18n/locales.ts` | Danh sách ngôn ngữ, kiểu `Locale`, hàm nhận dạng |
| `lib/i18n/routes.ts` | Bảng ánh xạ slug — **nguồn sự thật duy nhất** (spec §2.4) |
| `lib/i18n/parity.ts` | So khoá hai đối tượng nội dung, bắt chỗ dịch sót lúc chạy |
| `lib/content/glossary.ts` | Tám thuật ngữ làng, vi + chú giải en (spec §2.6) |
| `middleware.ts` | Viết lại đường dẫn, dịch slug en → vi |
| `app/(site)/[locale]/layout.tsx` | Root layout site, `<html lang={locale}>` |
| `app/(admin)/layout.tsx` | Root layout khu quản trị, `<html lang="vi">` |
| `components/layout/language-switcher.tsx` | Nút chuyển ngôn ngữ |
| `lib/content/triet-ly/types.ts` · `vi.ts` · `en.ts` | Nội dung trang Triết Lý |

**Di chuyển**

| Từ | Sang |
|---|---|
| `app/(public)/**` | `app/(site)/[locale]/(public)/**` |
| `app/dashboard/**` · `app/(auth)/**` | `app/(admin)/dashboard/**` · `app/(admin)/(auth)/**` |
| `app/layout.tsx` | Xoá — thay bằng hai root layout |

**Sửa**

| Tệp | Sửa gì |
|---|---|
| `lib/content/nav.ts` | Nhãn menu theo ngôn ngữ, href sinh từ `routes.ts` |
| `components/layout/header.tsx` · `footer.tsx` | Nhận `locale` qua prop |
| `app/sitemap.ts` | Liệt kê cả hai ngôn ngữ |
| `app/(site)/[locale]/(public)/triet-ly/page.tsx` | Thành vỏ mỏng |

---

## Task 1: Spike — hai root layout có dựng được trên Next 16.1.6 không

Spec §2.2 đánh dấu đây là **giả định chưa kiểm chứng**. Hỏng thì cả kế hoạch phải thiết kế lại, nên nó đứng đầu.

**Đây là mã dùng một lần.** Xong là xoá, không commit.

**Files:**
- Tạm: `app/(probe-a)/layout.tsx`, `app/(probe-a)/probe-a/page.tsx`
- Tạm: `app/(probe-b)/layout.tsx`, `app/(probe-b)/probe-b/page.tsx`
- Tạm di chuyển: `app/layout.tsx` → `app/layout.tsx.bak`

- [ ] **Bước 1: Dời root layout hiện có ra chỗ khác**

```bash
git mv app/layout.tsx app/layout.tsx.bak
```

- [ ] **Bước 2: Dựng hai root layout thử**

`app/(probe-a)/layout.tsx`:

```tsx
export default function ProbeALayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
```

`app/(probe-a)/probe-a/page.tsx`:

```tsx
export default function ProbeAPage() {
  return <p>probe-a</p>;
}
```

`app/(probe-b)/layout.tsx`:

```tsx
export default function ProbeBLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/(probe-b)/probe-b/page.tsx`:

```tsx
export default function ProbeBPage() {
  return <p>probe-b</p>;
}
```

- [ ] **Bước 3: Dựng thật**

Chạy: `npm run build`

Kỳ vọng: build **thành công**. Nếu báo lỗi kiểu "Conflicting root layouts" hoặc "root layout không tìm thấy" thì spike **hỏng**.

- [ ] **Bước 4: Xác nhận `lang` khác nhau ở hai nhánh**

```bash
pkill -f "next start" || true
npm run build && npm start &
sleep 5
curl -s localhost:3000/probe-a | grep -o '<html lang="[a-z]*"'
curl -s localhost:3000/probe-b | grep -o '<html lang="[a-z]*"'
```

Kỳ vọng: in ra `<html lang="vi"` và `<html lang="en"`. Hai dòng **phải khác nhau** — đó chính là điều cần chứng minh.

- [ ] **Bước 5: Dọn sạch**

```bash
rm -rf "app/(probe-a)" "app/(probe-b)"
git mv app/layout.tsx.bak app/layout.tsx
npm run build
git status --short   # phải sạch
```

- [ ] **Bước 6: Báo kết quả**

- **Spike đạt** → ghi một dòng vào `docs/NHAT_KY_TRIEN_KHAI.md` rồi sang Task 2.
- **Spike hỏng** → **DỪNG. Báo chủ dự án.** Không tự chuyển sang phương án lùi. Spec §2.2 nói rõ điều này.

---

## Task 2: `lib/i18n/locales.ts` — kiểu ngôn ngữ

**Files:**
- Tạo: `lib/i18n/locales.ts`
- Test: `lib/i18n/locales.test.ts`

**Interfaces:**
- Produces: `LOCALES: readonly ["vi","en"]`, `type Locale = "vi"|"en"`, `DEFAULT_LOCALE: Locale`, `isLocale(v: unknown): v is Locale`

- [ ] **Bước 1: Viết test hỏng**

`lib/i18n/locales.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "./locales";

describe("LOCALES", () => {
  it("có đúng hai ngôn ngữ, tiếng Việt đứng trước", () => {
    expect(LOCALES).toEqual(["vi", "en"]);
  });

  it("mặc định là tiếng Việt — đây là site cho trẻ em Việt Nam", () => {
    expect(DEFAULT_LOCALE).toBe("vi");
  });
});

describe("isLocale", () => {
  it("nhận đúng hai mã hợp lệ", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("từ chối mã lạ, rỗng, undefined và kiểu khác", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(7)).toBe(false);
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/i18n/locales.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./locales"`

- [ ] **Bước 3: Viết mã tối thiểu**

`lib/i18n/locales.ts`:

```ts
/** Hai ngôn ngữ của site. Tiếng Việt đứng trước vì là ngôn ngữ mặc định. */
export const LOCALES = ["vi", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "vi";

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/i18n/locales.test.ts`
Kỳ vọng: PASS, 4 test.

- [ ] **Bước 5: Commit**

```bash
git add lib/i18n/locales.ts lib/i18n/locales.test.ts
git commit -m "feat(i18n): kiểu Locale và danh sách hai ngôn ngữ"
```

---

## Task 3: `lib/i18n/routes.ts` — bảng ánh xạ slug

Nguồn sự thật duy nhất cho `hreflang`, nút chuyển ngôn ngữ, sitemap và middleware (spec §2.4).

**Files:**
- Tạo: `lib/i18n/routes.ts`
- Test: `lib/i18n/routes.test.ts`

**Interfaces:**
- Consumes: `Locale`, `LOCALES` từ Task 2
- Produces:
  - `type RouteKey` — 14 khoá
  - `ROUTES: Record<RouteKey, Record<Locale, string>>`
  - `pathFor(key: RouteKey, locale: Locale): string`
  - `routeKeyFromPath(path: string): RouteKey | null` — nhận **đường dẫn công khai** (`/lang-maker` hoặc `/en/maker-village`)
  - `alternatePath(path: string, to: Locale): string | null`
  - `canonicalPathFromEn(enPath: string): string | null` — `/en/maker-village` → `/lang-maker`; middleware dùng

- [ ] **Bước 1: Viết test hỏng**

`lib/i18n/routes.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { LOCALES } from "./locales";
import {
  alternatePath,
  canonicalPathFromEn,
  pathFor,
  ROUTES,
  routeKeyFromPath,
} from "./routes";

describe("ROUTES", () => {
  it("có đủ 14 trang như spec 2.4", () => {
    expect(Object.keys(ROUTES)).toHaveLength(14);
  });

  it("mọi trang đều khai đủ hai ngôn ngữ, không rỗng", () => {
    for (const [key, paths] of Object.entries(ROUTES)) {
      for (const locale of LOCALES) {
        expect(paths[locale], `${key}.${locale}`).toBeTruthy();
      }
    }
  });

  it("đường dẫn tiếng Việt KHÔNG có tiền tố ngôn ngữ", () => {
    for (const paths of Object.values(ROUTES)) {
      expect(paths.vi.startsWith("/en")).toBe(false);
    }
  });

  it("mọi đường dẫn tiếng Anh đều bắt đầu bằng /en", () => {
    for (const paths of Object.values(ROUTES)) {
      expect(paths.en === "/en" || paths.en.startsWith("/en/")).toBe(true);
    }
  });

  it("không có đường dẫn trùng nhau", () => {
    const all = Object.values(ROUTES).flatMap((p) => [p.vi, p.en]);
    expect(new Set(all).size).toBe(all.length);
  });

  it("giữ nguyên 14 URL tiếng Việt đang chạy thật", () => {
    // Ràng buộc toàn cục: đổi một dòng ở đây là làm hỏng link đã chia sẻ.
    expect(Object.values(ROUTES).map((p) => p.vi).sort()).toEqual(
      [
        "/",
        "/cho-mentor",
        "/cong-cu",
        "/cong-dong",
        "/cong-dong/du-an",
        "/cong-dong/maker-hub",
        "/cong-dong/tap-chi",
        "/hanh-trinh",
        "/hanh-trinh/chia-se",
        "/hanh-trinh/choi",
        "/hanh-trinh/lam",
        "/lang-maker",
        "/triet-ly",
        "/video-hub",
      ].sort(),
    );
  });
});

describe("pathFor", () => {
  it("trả đúng đường dẫn theo ngôn ngữ", () => {
    expect(pathFor("makerVillage", "vi")).toBe("/lang-maker");
    expect(pathFor("makerVillage", "en")).toBe("/en/maker-village");
    expect(pathFor("home", "vi")).toBe("/");
    expect(pathFor("home", "en")).toBe("/en");
  });
});

describe("routeKeyFromPath", () => {
  it("nhận ra trang từ đường dẫn của cả hai ngôn ngữ", () => {
    expect(routeKeyFromPath("/lang-maker")).toBe("makerVillage");
    expect(routeKeyFromPath("/en/maker-village")).toBe("makerVillage");
    expect(routeKeyFromPath("/hanh-trinh/choi")).toBe("nhipPlay");
    expect(routeKeyFromPath("/en/how-we-learn/play")).toBe("nhipPlay");
  });

  it("bỏ qua dấu / thừa ở cuối", () => {
    expect(routeKeyFromPath("/lang-maker/")).toBe("makerVillage");
  });

  it("trả null cho đường dẫn lạ, không ném lỗi", () => {
    expect(routeKeyFromPath("/khong-ton-tai")).toBeNull();
    expect(routeKeyFromPath("")).toBeNull();
  });
});

describe("alternatePath", () => {
  it("chuyển sang đúng trang tương ứng, KHÔNG về trang chủ", () => {
    expect(alternatePath("/lang-maker", "en")).toBe("/en/maker-village");
    expect(alternatePath("/en/philosophy", "vi")).toBe("/triet-ly");
    expect(alternatePath("/hanh-trinh/chia-se", "en")).toBe(
      "/en/how-we-learn/share",
    );
  });

  it("trang không có bản đối ứng thì trả null, KHÔNG dẫn tới 404", () => {
    expect(alternatePath("/khong-ton-tai", "en")).toBeNull();
  });
});

describe("canonicalPathFromEn", () => {
  it("dịch slug tiếng Anh sang slug thư mục tiếng Việt", () => {
    expect(canonicalPathFromEn("/en/maker-village")).toBe("/lang-maker");
    expect(canonicalPathFromEn("/en")).toBe("/");
    expect(canonicalPathFromEn("/en/how-we-learn/make")).toBe("/hanh-trinh/lam");
  });

  it("đường dẫn tiếng Anh lạ thì trả null", () => {
    expect(canonicalPathFromEn("/en/nothing-here")).toBeNull();
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/i18n/routes.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./routes"`

- [ ] **Bước 3: Viết mã**

`lib/i18n/routes.ts`:

```ts
import type { Locale } from "./locales";

/**
 * Bảng ánh xạ slug — nguồn sự thật duy nhất (spec 2026-09-23 mục 2.4).
 * Từ đây sinh ra: hreflang, nút chuyển ngôn ngữ, sitemap và middleware.
 *
 * LƯU Ý: cột `vi` cũng chính là tên thư mục route. Đường dẫn tiếng Anh được
 * middleware dịch ngược về cột `vi` trước khi Next định tuyến.
 */
export const ROUTES = {
  home: { vi: "/", en: "/en" },
  makerVillage: { vi: "/lang-maker", en: "/en/maker-village" },
  howWeLearn: { vi: "/hanh-trinh", en: "/en/how-we-learn" },
  nhipPlay: { vi: "/hanh-trinh/choi", en: "/en/how-we-learn/play" },
  nhipMake: { vi: "/hanh-trinh/lam", en: "/en/how-we-learn/make" },
  nhipShare: { vi: "/hanh-trinh/chia-se", en: "/en/how-we-learn/share" },
  philosophy: { vi: "/triet-ly", en: "/en/philosophy" },
  tools: { vi: "/cong-cu", en: "/en/tools" },
  forMentors: { vi: "/cho-mentor", en: "/en/for-mentors" },
  videos: { vi: "/video-hub", en: "/en/videos" },
  community: { vi: "/cong-dong", en: "/en/community" },
  makerHubs: { vi: "/cong-dong/maker-hub", en: "/en/community/maker-hubs" },
  projects: { vi: "/cong-dong/du-an", en: "/en/community/projects" },
  magazine: { vi: "/cong-dong/tap-chi", en: "/en/community/magazine" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export function pathFor(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

/** Bỏ dấu / thừa ở cuối, nhưng giữ "/" gốc. */
function tidy(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function routeKeyFromPath(path: string): RouteKey | null {
  const wanted = tidy(path);
  if (!wanted) return null;
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    const paths = ROUTES[key];
    if (paths.vi === wanted || paths.en === wanted) return key;
  }
  return null;
}

export function alternatePath(path: string, to: Locale): string | null {
  const key = routeKeyFromPath(path);
  return key ? ROUTES[key][to] : null;
}

/** `/en/maker-village` → `/lang-maker`. Middleware dùng để viết lại đường dẫn. */
export function canonicalPathFromEn(enPath: string): string | null {
  const wanted = tidy(enPath);
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (ROUTES[key].en === wanted) return ROUTES[key].vi;
  }
  return null;
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/i18n/routes.test.ts`
Kỳ vọng: PASS, 14 test.

- [ ] **Bước 5: Commit**

```bash
git add lib/i18n/routes.ts lib/i18n/routes.test.ts
git commit -m "feat(i18n): bảng ánh xạ slug vi-en làm nguồn sự thật duy nhất"
```

---

## Task 4: `lib/i18n/parity.ts` — bắt chỗ dịch sót lúc chạy

`tsc` bắt được khi `en.ts` **thiếu một trường**, nhưng không bắt được khi trường đó có mặt mà **rỗng**, hay khi một mảng bị hụt phần tử. Nhiệm vụ này bịt cả hai lỗ.

Spec §5 yêu cầu **phải thử phá hỏng thật để chứng minh cơ chế có tác dụng**, không được chỉ khẳng định. Bước 6 làm đúng việc đó.

**Files:**
- Tạo: `lib/i18n/parity.ts`
- Test: `lib/i18n/parity.test.ts`

**Interfaces:**
- Produces:
  - `deepKeys(value: unknown, prefix?: string): string[]`
  - `missingKeys(reference: unknown, candidate: unknown): string[]`
  - `emptyStringKeys(value: unknown, prefix?: string): string[]`

- [ ] **Bước 1: Viết test hỏng**

`lib/i18n/parity.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { deepKeys, emptyStringKeys, missingKeys } from "./parity";

describe("deepKeys", () => {
  it("liệt kê khoá lồng nhau theo đường dẫn chấm", () => {
    expect(deepKeys({ a: 1, b: { c: 2 } }).sort()).toEqual(["a", "b.c"]);
  });

  it("đánh số phần tử mảng — để hụt phần tử là phát hiện được", () => {
    expect(deepKeys({ xs: ["p", "q"] }).sort()).toEqual(["xs.0", "xs.1"]);
  });

  it("coi mảng rỗng và object rỗng là một khoá lá", () => {
    expect(deepKeys({ xs: [], o: {} }).sort()).toEqual(["o", "xs"]);
  });
});

describe("missingKeys", () => {
  it("không thiếu gì thì trả mảng rỗng", () => {
    expect(missingKeys({ a: 1, b: { c: 2 } }, { a: 9, b: { c: 8 } })).toEqual([]);
  });

  it("chỉ ra đúng khoá bị thiếu", () => {
    expect(missingKeys({ a: 1, b: { c: 2 } }, { a: 9 })).toEqual(["b.c"]);
  });

  it("chỉ ra phần tử mảng bị hụt", () => {
    expect(missingKeys({ xs: ["p", "q", "r"] }, { xs: ["p", "q"] })).toEqual([
      "xs.2",
    ]);
  });
});

describe("emptyStringKeys", () => {
  it("bắt chuỗi rỗng và chuỗi chỉ có khoảng trắng", () => {
    expect(emptyStringKeys({ a: "xong", b: "", c: "   " }).sort()).toEqual([
      "b",
      "c",
    ]);
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/i18n/parity.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./parity"`

- [ ] **Bước 3: Viết mã**

`lib/i18n/parity.ts`:

```ts
/**
 * So hai đối tượng nội dung vi/en để bắt chỗ dịch sót.
 *
 * `tsc` đã bắt được trường hợp thiếu hẳn trường. Tệp này bịt hai lỗ còn lại:
 * trường có mặt nhưng rỗng, và mảng hụt phần tử.
 */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function deepKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) return prefix ? [prefix] : [];
    return value.flatMap((item, i) =>
      deepKeys(item, prefix ? `${prefix}.${i}` : String(i)),
    );
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) return prefix ? [prefix] : [];
    return entries.flatMap(([k, v]) =>
      deepKeys(v, prefix ? `${prefix}.${k}` : k),
    );
  }

  return prefix ? [prefix] : [];
}

/** Khoá có trong `reference` mà vắng trong `candidate`. */
export function missingKeys(reference: unknown, candidate: unknown): string[] {
  const have = new Set(deepKeys(candidate));
  return deepKeys(reference).filter((k) => !have.has(k));
}

/** Khoá trỏ tới chuỗi rỗng hoặc chỉ gồm khoảng trắng. */
export function emptyStringKeys(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return value.trim() === "" && prefix ? [prefix] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, i) =>
      emptyStringKeys(item, prefix ? `${prefix}.${i}` : String(i)),
    );
  }

  if (isPlainObject(value)) {
    return Object.entries(value).flatMap(([k, v]) =>
      emptyStringKeys(v, prefix ? `${prefix}.${k}` : k),
    );
  }

  return [];
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/i18n/parity.test.ts`
Kỳ vọng: PASS, 7 test.

- [ ] **Bước 5: Commit**

```bash
git add lib/i18n/parity.ts lib/i18n/parity.test.ts
git commit -m "feat(i18n): so khoá vi-en để bắt chỗ dịch sót lúc chạy"
```

- [ ] **Bước 6: CHỨNG MINH cơ chế có tác dụng — phá hỏng thật**

Spec §5 yêu cầu bước này. Không được bỏ, và không được thay bằng lời khẳng định.

```bash
# Tạm thêm một test khẳng định điều SAI, để xem bộ kiểm có bắt không
cat >> lib/i18n/parity.test.ts <<'PROOF'

describe("CHỨNG MINH — xoá tạm để xem bộ kiểm có bắt không", () => {
  it("phải phát hiện bản en hụt một nguyên lý", () => {
    const vi = { nguyenLy: [{ title: "a" }, { title: "b" }, { title: "c" }] };
    const en = { nguyenLy: [{ title: "a" }, { title: "b" }] };
    expect(missingKeys(vi, en)).toEqual(["nguyenLy.2.title"]);
  });

  it("phải phát hiện bản en để trống một trường", () => {
    const en = { quote: "", title: "Papert" };
    expect(emptyStringKeys(en)).toEqual(["quote"]);
  });
});
PROOF

npx vitest run lib/i18n/parity.test.ts
```

Kỳ vọng: cả hai test **PASS** — nghĩa là bộ kiểm thật sự bắt được hai kiểu sót.

Sau đó **giữ lại** hai test này (đổi tên `describe` thành `"bắt được hai kiểu dịch sót thường gặp"`) và commit:

```bash
git add lib/i18n/parity.test.ts
git commit -m "test(i18n): chứng minh bộ so khoá bắt được mảng hụt và trường rỗng"
```

---

## Task 5: `lib/content/glossary.ts` — tám thuật ngữ làng

Spec §2.6. Chốt cách dịch **một lần** cho cả site, để mọi trang dùng chung và không trôi.

**Files:**
- Tạo: `lib/content/glossary.ts`
- Test: `lib/content/glossary.test.ts`

**Interfaces:**
- Produces: `type GlossaryKey`, `GLOSSARY: Record<GlossaryKey, { vi: string; en: string }>`, `gloss(key: GlossaryKey, locale: Locale): string`

- [ ] **Bước 1: Viết test hỏng**

`lib/content/glossary.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { emptyStringKeys } from "@/lib/i18n/parity";
import { gloss, GLOSSARY } from "./glossary";

describe("GLOSSARY", () => {
  it("có đủ tám thuật ngữ như spec 2.6", () => {
    expect(Object.keys(GLOSSARY)).toHaveLength(8);
  });

  it("không thuật ngữ nào bỏ trống", () => {
    expect(emptyStringKeys(GLOSSARY)).toEqual([]);
  });

  it("giữ nguyên tên tiếng Việt, không dịch hẳn sang tiếng Anh", () => {
    expect(GLOSSARY.thoCa.vi).toBe("Thợ cả");
    expect(GLOSSARY.giaLang.vi).toBe("Già làng");
  });

  it("Maker Hub giữ nguyên ở cả hai ngôn ngữ — vốn đã là tiếng Anh", () => {
    expect(GLOSSARY.makerHub.vi).toBe("Maker Hub");
    expect(GLOSSARY.makerHub.en).toBe("Maker Hub");
  });

  it("chú giải Nghệ nhân phải nói rõ đứng CẠNH thang, không TRÊN thang", () => {
    // Chi tiết này là điểm dễ dịch sai nhất của cả bảng.
    expect(GLOSSARY.ngheNhan.en).toContain("beside the ladder");
  });
});

describe("gloss", () => {
  it("trả tên tiếng Việt khi đọc bản tiếng Việt", () => {
    expect(gloss("langMaker", "vi")).toBe("Làng Maker");
  });

  it("trả chú giải tiếng Anh khi đọc bản tiếng Anh", () => {
    expect(gloss("langMaker", "en")).toBe("the Maker Village");
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/content/glossary.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./glossary"`

- [ ] **Bước 3: Viết mã**

`lib/content/glossary.ts`:

```ts
import type { Locale } from "@/lib/i18n/locales";

/**
 * Tám thuật ngữ làng, chốt cách dịch một lần cho cả site (spec 2026-09-23 mục 2.6).
 *
 * Chủ dự án chốt: GIỮ tên tiếng Việt, kèm chú giải tiếng Anh. Không dịch hẳn
 * sang tiếng Anh (mất bản sắc, lại trùng từ vựng đã mòn ở nước ngoài) và không
 * để trần (người đọc mới không hiểu gì).
 *
 * Quy tắc hiển thị: lần đầu xuất hiện trên MỖI trang thì kèm chú giải; các lần
 * sau chỉ còn tên tiếng Việt.
 */
export const GLOSSARY = {
  langMaker: { vi: "Làng Maker", en: "the Maker Village" },
  danLang: {
    vi: "Dân làng",
    en: "Villager — a newcomer; plays first, registers nothing",
  },
  thoHocViec: { vi: "Thợ học việc", en: "Apprentice" },
  thoCa: {
    vi: "Thợ cả",
    en: "Master — leads the session by making alongside, not by lecturing",
  },
  giaLang: { vi: "Già làng", en: "Village Elder" },
  ngheNhan: {
    vi: "Nghệ nhân",
    en: "Artisan — a trade master from outside the village; stands beside the ladder, not on it",
  },
  baNhip: { vi: "Chơi – Làm – Chia sẻ", en: "Play – Make – Share" },
  makerHub: { vi: "Maker Hub", en: "Maker Hub" },
} as const satisfies Record<string, Record<Locale, string>>;

export type GlossaryKey = keyof typeof GLOSSARY;

export function gloss(key: GlossaryKey, locale: Locale): string {
  return GLOSSARY[key][locale];
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/content/glossary.test.ts`
Kỳ vọng: PASS, 7 test.

- [ ] **Bước 5: Commit**

```bash
git add lib/content/glossary.ts lib/content/glossary.test.ts
git commit -m "feat(i18n): chốt tám thuật ngữ làng dùng chung cả site"
```

---

## Task 6: Dời cây route và dựng hai root layout

Nhiệm vụ lớn nhất kế hoạch. Sau nhiệm vụ này site vẫn **chỉ có tiếng Việt** — chưa trang tiếng Anh nào — nhưng chạy trên hạ tầng mới. Đó là điều cần kiểm chứng: hạ tầng đổi mà người dùng không thấy gì đổi.

**Files:**
- Di chuyển: `app/(public)/**` → `app/(site)/[locale]/(public)/**`
- Di chuyển: `app/dashboard/**` → `app/(admin)/dashboard/**`; `app/(auth)/**` → `app/(admin)/(auth)/**`
- Tạo: `app/(site)/[locale]/layout.tsx`, `app/(admin)/layout.tsx`, `middleware.ts`
- Xoá: `app/layout.tsx`
- Test: `lib/i18n/middleware-rewrite.test.ts`

**Interfaces:**
- Consumes: `LOCALES`, `isLocale` (Task 2); `canonicalPathFromEn` (Task 3)
- Produces: `rewriteTarget(pathname: string): string | null` trong `lib/i18n/rewrite.ts` — tách khỏi `middleware.ts` để test được (middleware chạy trong runtime riêng, vitest không nạp thẳng được)

- [ ] **Bước 1: Viết test hỏng cho logic viết lại đường dẫn**

`lib/i18n/middleware-rewrite.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { rewriteTarget } from "./rewrite";

describe("rewriteTarget", () => {
  it("đường dẫn tiếng Việt được gắn tiền tố /vi trong nội bộ", () => {
    expect(rewriteTarget("/lang-maker")).toBe("/vi/lang-maker");
    expect(rewriteTarget("/")).toBe("/vi");
  });

  it("đường dẫn tiếng Anh được dịch slug rồi gắn /en", () => {
    expect(rewriteTarget("/en/maker-village")).toBe("/en/lang-maker");
    expect(rewriteTarget("/en")).toBe("/en");
    expect(rewriteTarget("/en/how-we-learn/make")).toBe("/en/hanh-trinh/lam");
  });

  it("slug tiếng Anh không có trong bảng thì trả null — để Next trả 404", () => {
    expect(rewriteTarget("/en/nothing-here")).toBeNull();
  });

  it("KHÔNG đụng vào khu quản trị", () => {
    expect(rewriteTarget("/dashboard")).toBeNull();
    expect(rewriteTarget("/dashboard/students")).toBeNull();
    expect(rewriteTarget("/dang-nhap")).toBeNull();
  });

  it("KHÔNG đụng vào api và tài nguyên tĩnh", () => {
    expect(rewriteTarget("/api/gemini")).toBeNull();
    expect(rewriteTarget("/favicon.ico")).toBeNull();
    expect(rewriteTarget("/sitemap.xml")).toBeNull();
    expect(rewriteTarget("/robots.txt")).toBeNull();
  });

  it("KHÔNG đụng vào tệp có phần mở rộng, kể cả tên có băm", () => {
    // Ảnh OG do Next sinh ra mang tên băm kiểu /opengraph-image-a1b2c3.png.
    // Liệt kê tiền tố cố định là bắt không hết — phải bắt theo dấu chấm.
    expect(rewriteTarget("/opengraph-image-a1b2c3.png")).toBeNull();
    expect(rewriteTarget("/anh/hero.webp")).toBeNull();
    expect(rewriteTarget("/manifest.webmanifest")).toBeNull();
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/i18n/middleware-rewrite.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./rewrite"`

- [ ] **Bước 3: Viết logic viết lại đường dẫn**

`lib/i18n/rewrite.ts`:

```ts
import { canonicalPathFromEn } from "./routes";

/** Đường dẫn middleware không được đụng tới. */
const BO_QUA = [
  "/api",
  "/dashboard",
  "/dang-nhap",
  "/_next",
  "/anh",
  "/favicon.ico",
  "/sitemap.xml",
  "/robots.txt",
  "/opengraph-image",
];

/**
 * Đường dẫn công khai → đường dẫn nội bộ có tiền tố ngôn ngữ.
 * Trả null nghĩa là "không viết lại" — để Next tự xử (bỏ qua hoặc 404).
 */
export function rewriteTarget(pathname: string): string | null {
  if (BO_QUA.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  // Mọi tệp có phần mở rộng đều là tài nguyên tĩnh. Cần dòng này vì ảnh OG do
  // Next sinh ra mang tên băm (/opengraph-image-a1b2c3.png) nên không khớp
  // được bằng danh sách tiền tố cố định ở trên.
  if (pathname.includes(".")) return null;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const canonical = canonicalPathFromEn(pathname);
    if (canonical === null) return null;
    return canonical === "/" ? "/en" : `/en${canonical}`;
  }

  return pathname === "/" ? "/vi" : `/vi${pathname}`;
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/i18n/middleware-rewrite.test.ts`
Kỳ vọng: PASS, 5 test.

- [ ] **Bước 5: Viết `middleware.ts`**

```ts
import { NextResponse, type NextRequest } from "next/server";
import { rewriteTarget } from "@/lib/i18n/rewrite";

export function middleware(request: NextRequest) {
  const target = rewriteTarget(request.nextUrl.pathname);
  if (target === null) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
```

- [ ] **Bước 6: Dời cây route**

```bash
mkdir -p "app/(site)/[locale]" "app/(admin)"
git mv "app/(public)" "app/(site)/[locale]/(public)"
git mv app/dashboard "app/(admin)/dashboard"
git mv "app/(auth)" "app/(admin)/(auth)"
```

`app/api`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/favicon.ico`, `app/globals.css` **giữ nguyên chỗ cũ** — chúng không thuộc ngôn ngữ nào.

- [ ] **Bước 7: Dựng hai root layout**

`app/(site)/[locale]/layout.tsx` — chép từ `app/layout.tsx` cũ, đổi ba chỗ: `lang` động, `params` bất đồng bộ, thêm `generateStaticParams`:

```tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../../globals.css";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/common/json-ld";
import { LOCALES, type Locale } from "@/lib/i18n/locales";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: "Làng Maker" }],
};

export default async function SiteRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Đặt theme trước khi trình duyệt vẽ, tránh nháy sáng khi đang ở chế độ tối */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${nunito.variable} font-sans antialiased`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
```

`app/(admin)/layout.tsx` — khu quản trị, luôn tiếng Việt:

```tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Quản trị | Robot.Edu.VN",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Bước 8: Xoá root layout cũ**

```bash
git rm app/layout.tsx
```

- [ ] **Bước 9: Dựng và kiểm kiểu**

```bash
npx tsc --noEmit
npm run build
```

Kỳ vọng: cả hai thành công. Lỗi hay gặp: đường dẫn `import "./globals.css"` — hai root layout ở hai độ sâu khác nhau nên số `../` khác nhau.

- [ ] **Bước 10: Kiểm chứng — 14 URL tiếng Việt không đổi**

```bash
pkill -f "next start" || true
npm start &
sleep 5
for p in / /lang-maker /hanh-trinh /hanh-trinh/choi /hanh-trinh/lam /hanh-trinh/chia-se \
         /triet-ly /cong-cu /cho-mentor /video-hub /cong-dong \
         /cong-dong/maker-hub /cong-dong/du-an /cong-dong/tap-chi; do
  printf '%s -> %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' "localhost:3000$p")"
done
```

Kỳ vọng: **cả 14 dòng đều là 200.** Một dòng 404 hay 3xx là hỏng ràng buộc toàn cục — dừng và sửa.

- [ ] **Bước 11: Kiểm chứng — năm redirect cũ còn sống**

```bash
for p in /hanh-trinh/kham-pha /hanh-trinh/tu-duy /hanh-trinh/lap-trinh \
         /hanh-trinh/iot-robot /gioi-thieu; do
  printf '%s -> %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' "localhost:3000$p")"
done
```

Kỳ vọng: cả 5 dòng là `308`.

- [ ] **Bước 12: Kiểm chứng — khu quản trị còn vào được và vẫn `lang="vi"`**

```bash
curl -s localhost:3000/dang-nhap | grep -o '<html lang="[a-z]*"'
curl -s localhost:3000/lang-maker | grep -o '<html lang="[a-z]*"'
```

Kỳ vọng: dòng đầu `<html lang="vi"`, dòng sau cũng `<html lang="vi"` (chưa có bản tiếng Anh ở nhiệm vụ này).

- [ ] **Bước 13: Chạy toàn bộ test**

Chạy: `npm test`
Kỳ vọng: PASS — 20 test cũ + các test mới từ Task 2–5.

- [ ] **Bước 14: Commit**

```bash
git add -A
git commit -m "refactor(i18n): dời cây route sang [locale] và dựng hai root layout

URL tiếng Việt giữ nguyên 14 đường dẫn, năm redirect cũ còn nguyên.
Khu quản trị tách sang root layout riêng, không vào hệ đa ngữ."
```

---

## Task 7: Menu và nút chuyển ngôn ngữ

**Files:**
- Sửa: `lib/content/nav.ts`
- Tạo: `components/layout/language-switcher.tsx`
- Sửa: `components/layout/header.tsx`, `components/layout/footer.tsx`
- Sửa: `app/(site)/[locale]/(public)/layout.tsx`
- Test: `lib/content/nav.test.ts`

**Interfaces:**
- Consumes: `pathFor`, `alternatePath`, `RouteKey` (Task 3); `Locale` (Task 2)
- Produces: `navItems(locale: Locale): { label: string; href: string }[]`

- [ ] **Bước 1: Viết test hỏng**

`lib/content/nav.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { navItems } from "./nav";

describe("navItems", () => {
  it("có đủ chín mục ở cả hai ngôn ngữ", () => {
    expect(navItems("vi")).toHaveLength(9);
    expect(navItems("en")).toHaveLength(9);
  });

  it("giữ nguyên nhãn và đường dẫn tiếng Việt đang chạy", () => {
    const vi = navItems("vi");
    expect(vi[0]).toEqual({ label: "Trang Chủ", href: "/" });
    expect(vi[1]).toEqual({ label: "Cách Học", href: "/hanh-trinh" });
    expect(vi[2]).toEqual({ label: "Làng Maker", href: "/lang-maker" });
  });

  it("bản tiếng Anh dùng đường dẫn có tiền tố /en", () => {
    for (const item of navItems("en")) {
      expect(item.href === "/en" || item.href.startsWith("/en/")).toBe(true);
    }
  });

  it("giữ tên Làng Maker và Maker Hub nguyên tiếng Việt trong menu tiếng Anh", () => {
    const labels = navItems("en").map((i) => i.label);
    expect(labels).toContain("Làng Maker");
    expect(labels).toContain("Maker Hub");
  });

  it("không nhãn nào bỏ trống", () => {
    for (const locale of ["vi", "en"] as const) {
      for (const item of navItems(locale)) {
        expect(item.label.trim()).not.toBe("");
      }
    }
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/content/nav.test.ts`
Kỳ vọng: FAIL — `navItems` chưa tồn tại.

- [ ] **Bước 3: Viết mã**

`lib/content/nav.ts` (thay toàn bộ nội dung cũ):

```ts
import type { Locale } from "@/lib/i18n/locales";
import { pathFor, type RouteKey } from "@/lib/i18n/routes";

/**
 * Chín mục menu. Nhãn tiếng Việt giữ nguyên bản đang chạy.
 * Nhãn tiếng Anh giữ "Làng Maker" và "Maker Hub" nguyên tiếng Việt theo
 * quy tắc thuật ngữ (spec 2026-09-23 mục 2.6).
 */
const MUC: { key: RouteKey; label: Record<Locale, string> }[] = [
  { key: "home", label: { vi: "Trang Chủ", en: "Home" } },
  { key: "howWeLearn", label: { vi: "Cách Học", en: "How We Learn" } },
  { key: "makerVillage", label: { vi: "Làng Maker", en: "Làng Maker" } },
  { key: "tools", label: { vi: "Công Cụ", en: "Tools" } },
  { key: "makerHubs", label: { vi: "Maker Hub", en: "Maker Hub" } },
  { key: "philosophy", label: { vi: "Triết Lý Papert", en: "Papert’s Philosophy" } },
  { key: "forMentors", label: { vi: "Cho Mentor", en: "For Mentors" } },
  { key: "videos", label: { vi: "Video Hub", en: "Video Hub" } },
  { key: "community", label: { vi: "Cộng Đồng", en: "Community" } },
];

export function navItems(locale: Locale): { label: string; href: string }[] {
  return MUC.map(({ key, label }) => ({
    label: label[locale],
    href: pathFor(key, locale),
  }));
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/content/nav.test.ts`
Kỳ vọng: PASS, 5 test.

- [ ] **Bước 5: Viết nút chuyển ngôn ngữ**

`components/layout/language-switcher.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/locales";
import { alternatePath } from "@/lib/i18n/routes";

/**
 * Chuyển sang ĐÚNG trang tương ứng, không đá về trang chủ (spec mục 2.4).
 * Trang không có bản đối ứng thì nút bị vô hiệu, không dẫn tới 404.
 */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const to: Locale = locale === "vi" ? "en" : "vi";
  const href = alternatePath(pathname, to);
  const nhan = to === "en" ? "English" : "Tiếng Việt";

  if (href === null) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        title={
          locale === "vi"
            ? "Trang này chưa có bản tiếng Anh"
            : "This page has no Vietnamese version yet"
        }
      >
        <Languages className="h-4 w-4" aria-hidden />
        {nhan}
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href={href} hrefLang={to} aria-label={`Chuyển sang ${nhan}`}>
        <Languages className="h-4 w-4" aria-hidden />
        {nhan}
      </Link>
    </Button>
  );
}
```

- [ ] **Bước 6: Nối vào Header**

Trong `components/layout/header.tsx`, sửa bốn chỗ:

1. Đổi chữ ký: `export function Header({ locale }: { locale: Locale })`
2. Thêm import: `import type { Locale } from "@/lib/i18n/locales";`, `import { navItems } from "@/lib/content/nav";`, `import { pathFor } from "@/lib/i18n/routes";`, `import { LanguageSwitcher } from "@/components/layout/language-switcher";`
3. Bỏ `import { NAV_ITEMS } from "@/lib/content/nav";`, thêm `const items = navItems(locale);` trong thân hàm, đổi cả hai chỗ `NAV_ITEMS.map` thành `items.map`
4. Đặt `<LanguageSwitcher locale={locale} />` ngay trước `<ThemeToggle />` ở **cả** khối desktop lẫn khối mobile

Hai nút "Bắt Đầu Ngay" đổi thành:

```tsx
<Link href={pathFor("howWeLearn", locale)}>
  {locale === "vi" ? "Bắt Đầu Ngay" : "Start Here"}
</Link>
```

- [ ] **Bước 7: Truyền `locale` từ layout công khai**

Trong `app/(site)/[locale]/(public)/layout.tsx`, đọc `params` rồi truyền xuống `<Header locale={locale} />` và `<Footer locale={locale} />`. Layout phải thành `async`:

```tsx
export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
```

`Footer` nhận `locale` nhưng ở nhiệm vụ này **chưa dùng** — dịch chân trang thuộc kế hoạch 2. Thêm prop bây giờ để kế hoạch 2 không phải sửa lại chữ ký.

- [ ] **Bước 8: Dựng và kiểm bằng mắt**

```bash
npx tsc --noEmit && pkill -f "next start" || true
npm run build && npm start &
sleep 5
curl -s localhost:3000/lang-maker | grep -c 'English'
```

Kỳ vọng: `1` hoặc hơn — nút chuyển ngôn ngữ có mặt.

- [ ] **Bước 9: Commit**

```bash
git add -A
git commit -m "feat(i18n): menu theo ngôn ngữ và nút chuyển sang trang tương ứng"
```

---

## Task 8: Nhấc nội dung trang Triết Lý ra khỏi JSX — KHÔNG dịch gì

Spec §2.5 và đợt 1 của §4. Nhiệm vụ này **chỉ di chuyển chữ**. Kiểm chứng được tuyệt đối: trang trước và sau phải giống hệt nhau.

**Files:**
- Tạo: `lib/content/triet-ly/types.ts`, `lib/content/triet-ly/vi.ts`
- Sửa: `app/(site)/[locale]/(public)/triet-ly/page.tsx`
- Test: `lib/content/triet-ly/triet-ly.test.ts`

**Interfaces:**
- Consumes: `getNhip` từ `lib/content/nhip.ts`
- Produces:

```ts
interface TruCot { icon: string; title: string; quote: string; content: string }
interface NguyenLy { title: string; desc: string }
interface TrietLyContent {
  meta: { title: string; description: string };
  header: { title: string; subtitle: string };
  vongLap: { heading: string; intro: string };
  truCotHeading: string;   // "Trụ cột" — ghép với số thứ tự
  truCot: TruCot[];        // đúng 3
  nguyenLyHeading: string;
  nguyenLy: NguyenLy[];    // đúng 6
}
```

- [ ] **Bước 1: Chụp lại bản dựng hiện tại để đối chiếu**

```bash
pkill -f "next start" || true
npm run build && npm start &
sleep 5
curl -s localhost:3000/triet-ly > /tmp/triet-ly-truoc.html
wc -c /tmp/triet-ly-truoc.html
```

- [ ] **Bước 2: Viết test hỏng**

`lib/content/triet-ly/triet-ly.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { emptyStringKeys } from "@/lib/i18n/parity";
import { TRIET_LY_VI } from "./vi";

describe("TRIET_LY_VI", () => {
  it("có đúng ba trụ cột", () => {
    expect(TRIET_LY_VI.truCot).toHaveLength(3);
  });

  it("có đúng sáu nguyên lý", () => {
    expect(TRIET_LY_VI.nguyenLy).toHaveLength(6);
  });

  it("ba nguyên lý đầu lấy từ nhịp Làm, không chép tay", () => {
    // Chép tay thì hai bản sẽ trôi khỏi nhau. Nguồn sự thật là nhip.ts.
    expect(TRIET_LY_VI.nguyenLy[0].title).toBe("Chạm trước, ký hiệu sau");
    expect(TRIET_LY_VI.nguyenLy[1].title).toBe("Khó mà vui");
    expect(TRIET_LY_VI.nguyenLy[2].title).toBe("Lỗi là thông tin");
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(TRIET_LY_VI)).toEqual([]);
  });

  it("giữ nguyên tiêu đề ba trụ cột đang chạy thật", () => {
    expect(TRIET_LY_VI.truCot.map((t) => t.title)).toEqual([
      'Tư Tưởng Hồ Chí Minh — "Bình Dân Học Vụ"',
      "Triết Lý Kiến Tạo — Seymour Papert",
      "Tinh Thần Coopertition — FIRST Robotics",
    ]);
  });
});
```

- [ ] **Bước 3: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/content/triet-ly/`
Kỳ vọng: FAIL — `Failed to resolve import "./vi"`

- [ ] **Bước 4: Viết `types.ts`**

`lib/content/triet-ly/types.ts`:

```ts
export interface TruCot {
  icon: string;
  title: string;
  quote: string;
  /** Các đoạn ngăn bằng dòng trống; trang tự tách thành thẻ <p>. */
  content: string;
}

export interface NguyenLy {
  title: string;
  desc: string;
}

export interface TrietLyContent {
  meta: { title: string; description: string };
  header: { title: string; subtitle: string };
  vongLap: { heading: string; intro: string };
  /** Ghép với số thứ tự: "Trụ cột 1: …" */
  truCotHeading: string;
  truCot: TruCot[];
  nguyenLyHeading: string;
  nguyenLy: NguyenLy[];
}
```

- [ ] **Bước 5: Viết `vi.ts` — chép nguyên văn, không sửa một dấu câu**

`lib/content/triet-ly/vi.ts`:

```ts
import { getNhip } from "@/lib/content/nhip";
import type { TrietLyContent } from "./types";

/**
 * Nội dung trang Triết Lý, bản tiếng Việt.
 *
 * Nhấc nguyên văn từ app/(public)/triet-ly/page.tsx ngày 2026-09-23.
 * KHÔNG sửa câu chữ trong lần nhấc này — nhấc và dịch là hai việc tách rời
 * (spec 2026-09-23 mục 2.5).
 *
 * Ba nguyên lý đầu lấy trực tiếp từ lib/content/nhip.ts (nguồn sự thật của
 * nhịp Làm) để tránh chép tay hai bản trôi dạt khỏi nhau.
 */
export const TRIET_LY_VI: TrietLyContent = {
  meta: {
    title: "Triết Lý Giáo Dục",
    description:
      "Ba trụ cột triết lý của Làng Maker: Tư tưởng Hồ Chí Minh, Triết lý Kiến tạo Papert, Tinh thần Coopertition FIRST.",
  },
  header: {
    title: "Triết Lý Giáo Dục",
    subtitle: "Ba trụ cột định hướng mọi hoạt động của Làng Maker",
  },
  vongLap: {
    heading: "Vòng lặp ba nhịp",
    intro:
      "Cách học ở Làng Maker không phải một thang bậc phải leo, mà là ba nhịp lặp đi lặp lại. Mỗi vòng, thứ trẻ chọn làm lại khó hơn một chút.",
  },
  truCotHeading: "Trụ cột",
  truCot: [
    {
      icon: "🇻🇳",
      title: 'Tư Tưởng Hồ Chí Minh — "Bình Dân Học Vụ"',
      quote: '"Không có gì quý hơn độc lập tự do"',
      content: `Áp dụng phương pháp luận chiến tranh nhân dân vào giáo dục: huy động toàn dân tham gia, xây dựng lực lượng ba tầng (đội chủ lực, bộ đội địa phương, dân quân), lấy thế thắng lực.

Độc lập tự chủ về công nghệ — xây dựng sản phẩm Made in Vietnam (ThingBot, NEO One, VIA) thay vì phụ thuộc nước ngoài.

Mô hình "Làng Maker" tại mọi địa phương — mỗi vùng miền tự xây dựng lực lượng với sự hỗ trợ của đội chủ lực.`,
    },
    {
      icon: "🧩",
      title: "Triết Lý Kiến Tạo — Seymour Papert",
      quote: '"Trẻ em phát triển tư duy thông qua việc tạo ra sản phẩm hữu hình"',
      content: `Học bằng làm (Learning by Making) — không chỉ đọc sách hay nghe giảng, mà phải tự tay làm, tự tay tạo ra sản phẩm.

Vòng lặp ba nhịp: Chơi, Làm, Chia sẻ. Không phải thang bậc phải leo — xong Chia sẻ thì quay lại Chơi ở vòng sau, với câu hỏi khó hơn.

Trẻ em là chủ thể — không phải bình chứa để rót kiến thức vào, mà là những nhà kiến trúc tự xây dựng thế giới tri thức của mình.`,
    },
    {
      icon: "🤝",
      title: "Tinh Thần Coopertition — FIRST Robotics",
      quote: '"Cạnh tranh cộng hưởng — cùng nâng cao giá trị cho cộng đồng"',
      content: `Các đội tác vừa hợp tác vừa cạnh tranh lành mạnh. Doanh nghiệp đóng góp và cùng nhận lại giá trị tương xứng về thương hiệu, uy tín và tác động xã hội.

Mô hình ba lực lượng: Đội Chủ lực (đối tác chiến lược), Bộ đội Địa phương (mentor, tình nguyện viên), Dân quân Tự vệ (trẻ em — vừa học vừa chia sẻ).

Giá trị cốt lõi: Mở — Miễn phí — Công bằng — Độc lập — Cộng đồng.`,
    },
  ],
  nguyenLyHeading: "Sáu nguyên lý dẫn đường",
  nguyenLy: [
    ...(getNhip("lam").nguyenTac ?? []).map((n) => ({
      title: n.title,
      desc: n.desc,
    })),
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
  ],
};
```

- [ ] **Bước 6: Chạy lại test**

Chạy: `npx vitest run lib/content/triet-ly/`
Kỳ vọng: PASS, 5 test.

- [ ] **Bước 7: Biến trang thành vỏ mỏng**

`app/(site)/[locale]/(public)/triet-ly/page.tsx` — thay toàn bộ:

```tsx
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VongLap } from "@/components/nhip/vong-lap";
import { DocPapert } from "@/components/nhip/doc-papert";
import type { Locale } from "@/lib/i18n/locales";
import { TRIET_LY_VI } from "@/lib/content/triet-ly/vi";
import type { TrietLyContent } from "@/lib/content/triet-ly/types";

// Bản tiếng Anh nối vào ở Task 9.
function noiDung(_locale: Locale): TrietLyContent {
  return TRIET_LY_VI;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = noiDung(locale);
  return { title: meta.title, description: meta.description };
}

export default async function PhilosophyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = noiDung(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader title={t.header.title} subtitle={t.header.subtitle} />

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">{t.vongLap.heading}</h2>
          <p className="mb-6 text-muted-foreground">{t.vongLap.intro}</p>
          <VongLap />
        </section>

        <div className="space-y-8">
          {t.truCot.map((pillar, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-start gap-4">
                <span className="text-5xl">{pillar.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">
                    {t.truCotHeading} {i + 1}: {pillar.title}
                  </h2>
                  <blockquote className="mt-2 border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {pillar.quote}
                  </blockquote>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {pillar.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">{t.nguyenLyHeading}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.nguyenLy.map((n) => (
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
      </div>
    </div>
  );
}
```

- [ ] **Bước 8: KIỂM CHỨNG — trang phải giống hệt trước khi nhấc**

Đây là lý do nhiệm vụ này tồn tại riêng.

```bash
npx tsc --noEmit && pkill -f "next start" || true
npm run build && npm start &
sleep 5
curl -s localhost:3000/triet-ly > /tmp/triet-ly-sau.html

# So phần chữ người đọc thấy, bỏ qua id do bản dựng sinh ra
strip() { sed -E 's/<[^>]+>/ /g; s/[[:space:]]+/ /g' "$1"; }
diff <(strip /tmp/triet-ly-truoc.html) <(strip /tmp/triet-ly-sau.html) && echo "GIỐNG HỆT"
```

Kỳ vọng: in ra `GIỐNG HỆT`.

Có khác biệt thì **sửa `vi.ts` cho khớp bản cũ**, không sửa bản cũ cho khớp `vi.ts` — ràng buộc toàn cục là không đổi một dấu câu nào.

Ngoại lệ hợp lệ duy nhất: nút chuyển ngôn ngữ mới thêm ở Task 7.

- [ ] **Bước 9: Commit**

```bash
git add -A
git commit -m "refactor(triet-ly): nhấc nội dung khỏi JSX vào mô-đun có kiểu

Chưa dịch gì. Bản dựng trước và sau giống hệt nhau ở phần chữ."
```

---

## Task 9: Viết bản tiếng Anh trang Triết Lý

Đợt 3 của spec §4. Đến đây cơ chế chống dịch sót mới có việc để làm.

**Files:**
- Tạo: `lib/content/triet-ly/en.ts`
- Sửa: `app/(site)/[locale]/(public)/triet-ly/page.tsx` (hàm `noiDung`)
- Sửa: `lib/content/triet-ly/triet-ly.test.ts`

**Interfaces:**
- Consumes: `TrietLyContent` (Task 8), `missingKeys` / `emptyStringKeys` (Task 4), `GLOSSARY` (Task 5)
- Produces: `TRIET_LY_EN: TrietLyContent`

- [ ] **Bước 1: Viết test hỏng — test tương đương khoá**

Thêm vào `lib/content/triet-ly/triet-ly.test.ts`. **Gộp hai dòng import dưới đây vào
khối import sẵn có ở đầu tệp** — `emptyStringKeys` đã được import từ Task 8, thêm dòng
import thứ hai từ cùng một mô-đun sẽ làm eslint báo lỗi:

```ts
import { TRIET_LY_EN } from "./en";
import { missingKeys } from "@/lib/i18n/parity";

describe("TRIET_LY_EN", () => {
  it("không thiếu khoá nào so với bản tiếng Việt", () => {
    expect(missingKeys(TRIET_LY_VI, TRIET_LY_EN)).toEqual([]);
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(TRIET_LY_EN)).toEqual([]);
  });

  it("có đủ ba trụ cột và sáu nguyên lý như bản tiếng Việt", () => {
    expect(TRIET_LY_EN.truCot).toHaveLength(TRIET_LY_VI.truCot.length);
    expect(TRIET_LY_EN.nguyenLy).toHaveLength(TRIET_LY_VI.nguyenLy.length);
  });

  it("giữ tên Làng Maker nguyên tiếng Việt, không dịch thành Maker Village", () => {
    const all = JSON.stringify(TRIET_LY_EN);
    expect(all).toContain("Làng Maker");
  });

  it("giữ nguyên icon của bản tiếng Việt — icon không phải chữ để dịch", () => {
    expect(TRIET_LY_EN.truCot.map((t) => t.icon)).toEqual(
      TRIET_LY_VI.truCot.map((t) => t.icon),
    );
  });

  it("thật sự đã dịch, không phải chép lại bản tiếng Việt", () => {
    expect(TRIET_LY_EN.header.subtitle).not.toBe(TRIET_LY_VI.header.subtitle);
    expect(TRIET_LY_EN.nguyenLyHeading).not.toBe(TRIET_LY_VI.nguyenLyHeading);
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/content/triet-ly/`
Kỳ vọng: FAIL — `Failed to resolve import "./en"`

- [ ] **Bước 3: Viết `en.ts`**

`lib/content/triet-ly/en.ts`:

```ts
import type { TrietLyContent } from "./types";

/**
 * Nội dung trang Triết Lý, bản tiếng Anh.
 *
 * Viết như viết bản gốc, không dịch máy (spec 2026-09-23 mục 2.8).
 * Thuật ngữ làng giữ tiếng Việt kèm chú giải lần đầu xuất hiện (mục 2.6).
 *
 * Sáu nguyên lý ở đây PHẢI viết tay, không lấy từ nhip.ts như bản tiếng Việt —
 * nhip.ts chỉ có tiếng Việt. Thứ tự và số lượng phải khớp TRIET_LY_VI, và
 * triet-ly.test.ts canh điều đó.
 */
export const TRIET_LY_EN: TrietLyContent = {
  meta: {
    title: "Our Educational Philosophy",
    description:
      "The three pillars behind Làng Maker (the Maker Village): Hồ Chí Minh’s mass-literacy thinking, Seymour Papert’s constructionism, and FIRST’s spirit of Coopertition.",
  },
  header: {
    title: "Our Educational Philosophy",
    subtitle:
      "Three pillars that shape everything we do at Làng Maker (the Maker Village)",
  },
  vongLap: {
    heading: "The three-beat loop",
    intro:
      "Learning here is not a ladder to climb. It is three beats that repeat — Play, Make, Share. Each time round, the thing a child chooses to build is a little harder than the last.",
  },
  truCotHeading: "Pillar",
  truCot: [
    {
      icon: "🇻🇳",
      title: "Hồ Chí Minh’s Thought — “Bình Dân Học Vụ”, mass literacy",
      quote: "“Nothing is more precious than independence and freedom”",
      content: `A people’s-war methodology applied to education: bring everyone in, build three tiers of strength — a core team, local units, and a village militia — and win by position rather than by force.

Technological self-reliance: build Made-in-Vietnam products (ThingBot, NEO One, VIA) instead of depending on foreign kit.

A Làng Maker in every locality — each region builds its own strength, with the core team supporting rather than directing.`,
    },
    {
      icon: "🧩",
      title: "Constructionism — Seymour Papert",
      quote:
        "“Children develop their thinking by making things they can hold”",
      content: `Learning by making — not only reading or listening, but building something with your own hands.

The three-beat loop: Play, Make, Share. Not a ladder: once you have shared, you go back to playing, carrying a harder question than before.

The child is the maker of their own knowledge, not a vessel to pour knowledge into.`,
    },
    {
      icon: "🤝",
      title: "Coopertition — FIRST Robotics",
      quote: "“Compete and cooperate — raise the value of the whole community”",
      content: `Teams cooperate and compete at the same time, and neither cancels the other. Companies that contribute get back something proportionate in reputation, standing, and social impact.

Three tiers of strength: a core team (strategic partners), local units (mentors and volunteers), and a village militia (the children themselves — learning and passing it on at once).

Core values: open, free, fair, independent, communal.`,
    },
  ],
  nguyenLyHeading: "Six guiding principles",
  nguyenLy: [
    {
      title: "Touch first, symbols later",
      desc: "Hands touch a real object first. Code and formulas arrive afterwards, once there is a concrete experience for the symbols to hold on to.",
    },
    {
      title: "Hard and joyful",
      desc: "A project hard enough to demand real thought, but chosen by the child. Hard because they want it, not hard because it was imposed.",
    },
    {
      title: "An error is information",
      desc: "A robot veering off course is not a failure. The guide does not fix it for you — they ask back: why do you think it turned left?",
    },
    {
      title: "A small world",
      desc: "Every project is a world small enough for a child to master completely, and real enough to run on real hardware.",
    },
    {
      title: "Learning like a samba school",
      desc: "Beginners work beside experts on the same real task, rather than being sorted into separate classes by age or level.",
    },
    {
      title: "Off the screen",
      desc: "Every digital interaction starts from a physical act: assembling something, handling a device, watching a phenomenon happen.",
    },
  ],
};
```

- [ ] **Bước 4: Nối vào trang**

Trong `app/(site)/[locale]/(public)/triet-ly/page.tsx`, thay hàm `noiDung`:

```tsx
import { TRIET_LY_EN } from "@/lib/content/triet-ly/en";

function noiDung(locale: Locale): TrietLyContent {
  return locale === "en" ? TRIET_LY_EN : TRIET_LY_VI;
}
```

- [ ] **Bước 5: Chạy test**

Chạy: `npx vitest run lib/content/triet-ly/`
Kỳ vọng: PASS, 11 test.

- [ ] **Bước 6: CHỨNG MINH cơ chế bắt dịch sót có tác dụng**

Ràng buộc toàn cục và spec §5: phải phá hỏng thật, không được chỉ khẳng định.

```bash
# (a) tsc phải bắt khi THIẾU HẲN một trường
cp lib/content/triet-ly/en.ts /tmp/en.ts.bak
sed -i '' 's/  truCotHeading: "Pillar",//' lib/content/triet-ly/en.ts
npx tsc --noEmit ; echo "tsc thoát với mã: $?"
```

Kỳ vọng: tsc **báo lỗi**, mã thoát khác 0, nội dung lỗi nhắc `truCotHeading`.

```bash
# (b) vitest phải bắt khi mảng HỤT phần tử
cp /tmp/en.ts.bak lib/content/triet-ly/en.ts
node -e '
const fs=require("fs");
const p="lib/content/triet-ly/en.ts";
let s=fs.readFileSync(p,"utf8");
s=s.replace(/\{\n      title: "Off the screen",[\s\S]*?\},\n/, "");
fs.writeFileSync(p,s);
'
npx vitest run lib/content/triet-ly/ ; echo "vitest thoát với mã: $?"
```

Kỳ vọng: vitest **FAIL** ở test `"không thiếu khoá nào so với bản tiếng Việt"`, chỉ đúng khoá `nguyenLy.5.title` và `nguyenLy.5.desc`.

```bash
# Khôi phục
cp /tmp/en.ts.bak lib/content/triet-ly/en.ts
npx vitest run lib/content/triet-ly/ && npx tsc --noEmit
```

Kỳ vọng: cả hai xanh trở lại.

**Cả hai phép phá hỏng phải cho kết quả như trên.** Một phép không bắt được nghĩa là cơ chế chống dịch sót chưa hoạt động — dừng và sửa trước khi đi tiếp, vì tám trang của kế hoạch 2 đều dựa vào nó.

- [ ] **Bước 7: Kiểm chứng trang tiếng Anh chạy thật**

```bash
pkill -f "next start" || true
npm run build && npm start &
sleep 5
curl -s -o /dev/null -w '%{http_code}\n' localhost:3000/en/philosophy
curl -s localhost:3000/en/philosophy | grep -o '<html lang="[a-z]*"'
curl -s localhost:3000/en/philosophy | grep -c 'Six guiding principles'
curl -s localhost:3000/triet-ly      | grep -c 'Sáu nguyên lý dẫn đường'
```

Kỳ vọng: `200`; `<html lang="en"`; `1`; `1`.

- [ ] **Bước 8: Commit**

```bash
git add -A
git commit -m "feat(triet-ly): bản tiếng Anh, chứng minh cơ chế bắt dịch sót

Phá hỏng có chủ đích hai lần: tsc bắt trường thiếu, vitest bắt mảng hụt."
```

---

## Task 10: hreflang, sitemap hai ngữ, OG theo ngôn ngữ

Đợt 4 của spec §4 và toàn bộ §2.7.

**Files:**
- Sửa: `app/sitemap.ts`
- Sửa: `app/(site)/[locale]/layout.tsx`
- Sửa: `app/(site)/[locale]/(public)/triet-ly/page.tsx`
- Test: `lib/i18n/sitemap-paths.test.ts`
- Tạo: `lib/i18n/sitemap-paths.ts`

**Interfaces:**
- Consumes: `ROUTES`, `LOCALES`
- Produces: `sitemapEntries(baseUrl: string): { url: string; alternates: Record<Locale, string> }[]`

- [ ] **Bước 1: Viết test hỏng**

`lib/i18n/sitemap-paths.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { sitemapEntries } from "./sitemap-paths";

const BASE = "https://robot.edu.vn";

describe("sitemapEntries", () => {
  it("liệt kê cả hai ngôn ngữ: 14 trang × 2", () => {
    expect(sitemapEntries(BASE)).toHaveLength(28);
  });

  it("mỗi mục khai đủ bản đối ứng của cả hai ngôn ngữ", () => {
    for (const entry of sitemapEntries(BASE)) {
      expect(entry.alternates.vi.startsWith(BASE)).toBe(true);
      expect(entry.alternates.en.startsWith(BASE)).toBe(true);
    }
  });

  it("URL tuyệt đối, không có dấu / lặp", () => {
    for (const entry of sitemapEntries(BASE)) {
      expect(entry.url.startsWith(`${BASE}/`) || entry.url === BASE).toBe(true);
      expect(entry.url.slice(BASE.length)).not.toContain("//");
    }
  });

  it("có mặt cả trang chủ tiếng Việt lẫn trang chủ tiếng Anh", () => {
    const urls = sitemapEntries(BASE).map((e) => e.url);
    expect(urls).toContain(BASE);
    expect(urls).toContain(`${BASE}/en`);
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/i18n/sitemap-paths.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./sitemap-paths"`

- [ ] **Bước 3: Viết mã**

`lib/i18n/sitemap-paths.ts`:

```ts
import { LOCALES, type Locale } from "./locales";
import { ROUTES, type RouteKey } from "./routes";

export interface SitemapEntry {
  url: string;
  alternates: Record<Locale, string>;
}

function abs(baseUrl: string, path: string): string {
  return path === "/" ? baseUrl : `${baseUrl}${path}`;
}

export function sitemapEntries(baseUrl: string): SitemapEntry[] {
  const keys = Object.keys(ROUTES) as RouteKey[];
  return keys.flatMap((key) =>
    LOCALES.map((locale) => ({
      url: abs(baseUrl, ROUTES[key][locale]),
      alternates: {
        vi: abs(baseUrl, ROUTES[key].vi),
        en: abs(baseUrl, ROUTES[key].en),
      },
    })),
  );
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/i18n/sitemap-paths.test.ts`
Kỳ vọng: PASS, 4 test.

- [ ] **Bước 5: Nối vào `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/i18n/sitemap-paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://robot.edu.vn";

  return sitemapEntries(baseUrl).map((entry) => ({
    url: entry.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: entry.url === baseUrl ? 1 : 0.8,
    alternates: {
      languages: {
        vi: entry.alternates.vi,
        en: entry.alternates.en,
        "x-default": entry.alternates.vi,
      },
    },
  }));
}
```

- [ ] **Bước 6: Thêm `hreflang` và `openGraph.locale` vào trang Triết Lý**

Trong `generateMetadata` của `triet-ly/page.tsx`:

```tsx
import { pathFor } from "@/lib/i18n/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = noiDung(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: pathFor("philosophy", locale),
      languages: {
        vi: pathFor("philosophy", "vi"),
        en: pathFor("philosophy", "en"),
        "x-default": pathFor("philosophy", "vi"),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "vi_VN",
      url: pathFor("philosophy", locale),
      title: meta.title,
      description: meta.description,
    },
  };
}
```

- [ ] **Bước 7: Kiểm chứng**

```bash
npx tsc --noEmit && pkill -f "next start" || true
npm run build && npm start &
sleep 5
curl -s localhost:3000/sitemap.xml | grep -c '<xhtml:link'
curl -s localhost:3000/triet-ly      | grep -o 'hreflang="[a-z-]*"' | sort -u
curl -s localhost:3000/en/philosophy | grep -o 'hreflang="[a-z-]*"' | sort -u
curl -s localhost:3000/en/philosophy | grep -o 'og:locale" content="[a-zA-Z_]*"'
```

Kỳ vọng:
- sitemap có ít nhất 84 dòng `xhtml:link` (28 mục × 3 bản đối ứng)
- hai lệnh giữa đều in ra `hreflang="en"`, `hreflang="vi"`, `hreflang="x-default"`
- lệnh cuối in `og:locale" content="en_US"`

- [ ] **Bước 8: Chạy toàn bộ test và kiểm lại mọi ràng buộc**

```bash
npm test
npx tsc --noEmit
npx eslint

for p in / /lang-maker /hanh-trinh /hanh-trinh/choi /hanh-trinh/lam /hanh-trinh/chia-se \
         /triet-ly /cong-cu /cho-mentor /video-hub /cong-dong \
         /cong-dong/maker-hub /cong-dong/du-an /cong-dong/tap-chi; do
  printf '%s -> %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' "localhost:3000$p")"
done
```

Kỳ vọng: test xanh, tsc sạch, eslint sạch, **cả 14 URL tiếng Việt vẫn 200**.

- [ ] **Bước 9: Commit**

```bash
git add -A
git commit -m "feat(i18n): hreflang hai chiều, sitemap hai ngữ, og:locale theo ngôn ngữ"
```

---

## Task 11: Dải gợi ý ngôn ngữ — gợi ý, không ép

Spec §2.3 yêu cầu: **không tự động chuyển** theo IP hay `Accept-Language`, chỉ hiện **một dải nhỏ đóng được**, và nhớ lựa chọn trong `localStorage` (không phải cookie phía máy chủ, để không hỏng cache tĩnh).

Vì không được đọc `Accept-Language` phía máy chủ, dải này chạy hoàn toàn ở trình duyệt.

**Files:**
- Tạo: `lib/i18n/suggest.ts`
- Test: `lib/i18n/suggest.test.ts`
- Tạo: `components/layout/language-suggestion.tsx`
- Sửa: `app/(site)/[locale]/(public)/layout.tsx`

**Interfaces:**
- Consumes: `Locale`, `LOCALES` (Task 2); `alternatePath` (Task 3)
- Produces: `nenGoiY(args: { current: Locale; browserLangs: readonly string[]; daTuChoi: boolean }): Locale | null`

- [ ] **Bước 1: Viết test hỏng**

`lib/i18n/suggest.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { nenGoiY } from "./suggest";

describe("nenGoiY", () => {
  it("người dùng trình duyệt tiếng Anh đang xem bản tiếng Việt thì gợi ý tiếng Anh", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: ["en-US", "en"], daTuChoi: false }),
    ).toBe("en");
  });

  it("người dùng trình duyệt tiếng Việt thì KHÔNG gợi ý gì", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: ["vi-VN", "vi"], daTuChoi: false }),
    ).toBeNull();
  });

  it("đang xem đúng ngôn ngữ của mình rồi thì không gợi ý", () => {
    expect(
      nenGoiY({ current: "en", browserLangs: ["en-US"], daTuChoi: false }),
    ).toBeNull();
  });

  it("đã đóng dải một lần thì không gợi ý lại nữa", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: ["en-US"], daTuChoi: true }),
    ).toBeNull();
  });

  it("ngôn ngữ trình duyệt không phải vi cũng không phải en thì gợi ý tiếng Anh", () => {
    // Người Nhật, người Pháp… đọc bản tiếng Anh dễ hơn bản tiếng Việt.
    expect(
      nenGoiY({ current: "vi", browserLangs: ["ja-JP"], daTuChoi: false }),
    ).toBe("en");
  });

  it("không có thông tin ngôn ngữ thì KHÔNG gợi ý — im lặng hơn là đoán bừa", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: [], daTuChoi: false }),
    ).toBeNull();
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/i18n/suggest.test.ts`
Kỳ vọng: FAIL — `Failed to resolve import "./suggest"`

- [ ] **Bước 3: Viết mã**

`lib/i18n/suggest.ts`:

```ts
import type { Locale } from "./locales";

/**
 * Có nên gợi ý đổi ngôn ngữ không (spec 2026-09-23 mục 2.3).
 *
 * Chỉ GỢI Ý, không bao giờ tự chuyển: tự chuyển làm người dùng bực và làm
 * Google index sai. Hàm thuần để test được; phần đọc navigator.languages và
 * localStorage nằm ở component.
 */
export function nenGoiY({
  current,
  browserLangs,
  daTuChoi,
}: {
  current: Locale;
  browserLangs: readonly string[];
  daTuChoi: boolean;
}): Locale | null {
  if (daTuChoi) return null;
  if (browserLangs.length === 0) return null;

  const thichTiengViet = browserLangs.some((l) =>
    l.toLowerCase().startsWith("vi"),
  );
  const muon: Locale = thichTiengViet ? "vi" : "en";

  return muon === current ? null : muon;
}
```

- [ ] **Bước 4: Chạy lại**

Chạy: `npx vitest run lib/i18n/suggest.test.ts`
Kỳ vọng: PASS, 6 test.

- [ ] **Bước 5: Viết component**

`components/layout/language-suggestion.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { alternatePath } from "@/lib/i18n/routes";
import { nenGoiY } from "@/lib/i18n/suggest";

const KHOA = "goi-y-ngon-ngu-da-dong";

export function LanguageSuggestion({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [goiY, setGoiY] = useState<Locale | null>(null);

  useEffect(() => {
    let daTuChoi = false;
    try {
      daTuChoi = localStorage.getItem(KHOA) === "1";
    } catch {
      // Trình duyệt chặn site data — coi như chưa từ chối, không hỏng trang.
    }
    setGoiY(
      nenGoiY({
        current: locale,
        browserLangs: navigator.languages ?? [],
        daTuChoi,
      }),
    );
  }, [locale]);

  if (goiY === null) return null;

  const href = alternatePath(pathname, goiY);
  if (href === null) return null;

  const dong = () => {
    try {
      localStorage.setItem(KHOA, "1");
    } catch {
      // Không lưu được thì thôi, vẫn phải đóng được dải.
    }
    setGoiY(null);
  };

  return (
    <div className="flex items-center justify-center gap-3 border-b border-border bg-muted/60 px-4 py-2 text-sm">
      <span>
        {goiY === "en"
          ? "This page is also available in English."
          : "Trang này cũng có bản tiếng Việt."}
      </span>
      <Link href={href} hrefLang={goiY} className="font-medium underline">
        {goiY === "en" ? "Read in English" : "Đọc bản tiếng Việt"}
      </Link>
      <button
        type="button"
        onClick={dong}
        aria-label={goiY === "en" ? "Dismiss" : "Đóng"}
        className="rounded p-1 hover:bg-accent"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
```

- [ ] **Bước 6: Nối vào layout công khai**

Trong `app/(site)/[locale]/(public)/layout.tsx`, đặt ngay trên `<Header />`:

```tsx
<LanguageSuggestion locale={locale} />
<Header locale={locale} />
```

- [ ] **Bước 7: Kiểm chứng — KHÔNG được tự chuyển**

```bash
pkill -f "next start" || true
npx tsc --noEmit && pkill -f "next start" || true
npm run build && npm start &
sleep 5

# Trình duyệt tiếng Anh xin trang tiếng Việt: PHẢI trả 200, KHÔNG redirect
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' \
  -H 'Accept-Language: en-US,en;q=0.9' localhost:3000/triet-ly
```

Kỳ vọng: `200` và **không có URL chuyển hướng**. Ra 3xx là vi phạm spec §2.3 — sửa ngay.

- [ ] **Bước 8: Commit**

```bash
git add -A
git commit -m "feat(i18n): dải gợi ý ngôn ngữ đóng được, không tự chuyển

Gợi ý dựa trên navigator.languages phía trình duyệt, nhớ bằng localStorage
để không hỏng cache tĩnh (spec mục 2.3)."
```

---

## Task 12: Hai thành phần dùng chung còn nói tiếng Việt trên trang tiếng Anh

**Vì sao có nhiệm vụ này:** Task 9 đóng xong thì đo thật `/en/philosophy` và thấy nó là
**trang lai** — phần văn xuôi đúng tiếng Anh, nhưng hai khối dùng chung vẫn nguyên tiếng
Việt. Đo ngày 2026-09-23 trên bản dựng thật:

```
Đọc Papert                -> 1 lần      Chia sẻ xong thì quay lại -> 1 lần
Tải sách bản gốc          -> 1 lần      Bản tiếng Việt            -> 1 lần
Thợ Làm                   -> 1 lần      Chơi / Làm                -> 2 / 4 lần
```

Kế hoạch này tuyên bố mục tiêu là "đưa TRỌN một trang đi hết đường sang tiếng Anh, để chứng
minh khuôn mẫu chạy được". Trang lai thì khuôn mẫu **chưa được chứng minh** cho trường hợp
khó nhất: thành phần dùng chung lấy dữ liệu từ một mô-đun chỉ có tiếng Việt. Mà `nhip.ts`
còn nuôi ba trang nhịp của kế hoạch 2 — không giải bây giờ thì kế hoạch 2 vấp ngay ngày đầu
với tám trang đang dở.

**Files:**
- Tạo: `lib/content/nhip-nhan/{types.ts,vi.ts,en.ts}` — 12 chuỗi hiển thị của ba nhịp
- Tạo: `lib/content/doc-papert/{types.ts,vi.ts,en.ts}`
- Sửa: `components/nhip/vong-lap.tsx`, `components/nhip/doc-papert.tsx`
- Sửa: `components/home/learning-journey.tsx` (truyền `locale` xuống `VongLap`)
- Sửa: `app/(site)/[locale]/(public)/page.tsx`, `hanh-trinh/page.tsx`, `triet-ly/page.tsx` — truyền `locale`
- Test: `lib/content/nhip-nhan/nhip-nhan.test.ts`, `lib/content/doc-papert/doc-papert.test.ts`

**Interfaces:**
- Consumes: `Locale`, `isLocale`, `DEFAULT_LOCALE`; `pathFor`, `RouteKey`; `missingKeys`, `emptyStringKeys`; `NHIP`, `NhipSlug`
- Produces: `NHIP_NHAN_VI` / `NHIP_NHAN_EN` kiểu `Record<NhipSlug, NhipNhan>` với `NhipNhan = { ten, khauHieu, moTaNgan, tenHuyHieu }`; `DOC_PAPERT_VI` / `DOC_PAPERT_EN`; `VongLap({ locale })`; `DocPapert({ locale })`

**Ba lỗi phải đóng trong nhiệm vụ này:**

1. **Nhãn ba nhịp.** `vong-lap.tsx` đọc `nhip.ten`, `nhip.khauHieu`, `nhip.moTaNgan`,
   `nhip.tenHuyHieu` thẳng từ `NHIP` (chỉ tiếng Việt). Bốn trường này chuyển sang mô-đun
   nhãn có hai bản. **KHÔNG sửa `lib/content/nhip.ts`** — nó là nguồn sự thật của ba trang
   nhịp và thuộc kế hoạch 2; nhiệm vụ này chỉ thêm một lớp nhãn bên cạnh. `icon`, `huyHieu`,
   `slug` và các lớp màu vẫn lấy từ `NHIP` vì chúng không phải chữ.

2. **Đường dẫn ghi cứng.** `vong-lap.tsx:15` có `href={`/hanh-trinh/${nhip.slug}`}` — trên
   trang tiếng Anh, link này ném người đọc về trang tiếng Việt. Phải sinh từ `pathFor`.
   Ánh xạ slug nhịp sang `RouteKey`: `choi` → `nhipPlay`, `lam` → `nhipMake`,
   `chia-se` → `nhipShare`.

3. **Toàn bộ chữ trong `doc-papert.tsx`** chuyển sang mô-đun nội dung hai bản. Ba đường
   link ra ngoài (PDF của MIT, Internet Archive, trang xuất bản MIT Media Lab) và địa chỉ
   `mailto:` **giữ nguyên, không dịch** — chúng là địa chỉ, không phải văn.

- [ ] **Bước 1: Viết test hỏng cho nhãn ba nhịp**

```ts
// lib/content/nhip-nhan/nhip-nhan.test.ts
import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { NHIP } from "@/lib/content/nhip";
import { NHIP_NHAN_EN } from "./en";
import { NHIP_NHAN_VI } from "./vi";

describe("NHIP_NHAN_VI", () => {
  it("có nhãn cho đúng ba nhịp, khớp slug trong NHIP", () => {
    expect(Object.keys(NHIP_NHAN_VI).sort()).toEqual(
      NHIP.map((n) => n.slug).sort(),
    );
  });

  it("giữ nguyên nhãn tiếng Việt đang chạy thật", () => {
    expect(NHIP_NHAN_VI["choi"].ten).toBe("Chơi");
    expect(NHIP_NHAN_VI["lam"].ten).toBe("Làm");
    expect(NHIP_NHAN_VI["chia-se"].ten).toBe("Chia sẻ");
    expect(NHIP_NHAN_VI["lam"].tenHuyHieu).toBe("Thợ Làm");
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(NHIP_NHAN_VI)).toEqual([]);
  });
});

describe("NHIP_NHAN_EN", () => {
  it("không thiếu khoá nào so với bản tiếng Việt", () => {
    expect(missingKeys(NHIP_NHAN_VI, NHIP_NHAN_EN)).toEqual([]);
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(NHIP_NHAN_EN)).toEqual([]);
  });

  it("thật sự đã dịch, không chép lại bản tiếng Việt", () => {
    for (const slug of Object.keys(NHIP_NHAN_VI) as (keyof typeof NHIP_NHAN_VI)[]) {
      expect(NHIP_NHAN_EN[slug].khauHieu).not.toBe(NHIP_NHAN_VI[slug].khauHieu);
      expect(NHIP_NHAN_EN[slug].moTaNgan).not.toBe(NHIP_NHAN_VI[slug].moTaNgan);
    }
  });
});
```

- [ ] **Bước 2: Chạy để chắc nó hỏng**

Chạy: `npx vitest run lib/content/nhip-nhan/`
Kỳ vọng: FAIL — `Failed to resolve import "./en"`

- [ ] **Bước 3: Viết mô-đun nhãn ba nhịp**

`vi.ts` chép **nguyên văn** bốn trường của ba nhịp từ `lib/content/nhip.ts` (dòng 51, 52,
57, 67 cho `choi`; 78, 79, 84, 94 cho `lam`; 132, 133, 138, 150 cho `chia-se`). Không đổi
một dấu câu.

`en.ts` dịch, giữ đúng tinh thần: `Chơi` → `Play`, `Làm` → `Make`, `Chia sẻ` → `Share`; tên
huy hiệu dịch thành danh hiệu nghe tự nhiên trong tiếng Anh (`Người Tò Mò` → `The Curious
One`, `Thợ Làm` → `The Maker`, `Người Chia Sẻ` → `The Storyteller`).

- [ ] **Bước 4: Chạy lại** — `npx vitest run lib/content/nhip-nhan/` phải PASS.

- [ ] **Bước 5: Test hỏng + mô-đun cho `DocPapert`**

Cùng khuôn mẫu: `types.ts` một interface, `vi.ts` chép nguyên văn từ
`components/nhip/doc-papert.tsx`, `en.ts` dịch, test dùng `missingKeys` + `emptyStringKeys`
và một test canh **ba URL cùng địa chỉ mailto giống hệt nhau ở cả hai bản** (địa chỉ không
phải văn để dịch).

- [ ] **Bước 6: Sửa hai thành phần nhận `locale`**

`VongLap({ locale }: { locale: Locale })` và `DocPapert({ locale }: { locale: Locale })`.
`VongLap` đổi `href` sang `pathFor` theo ánh xạ ở mục 2 trên.

- [ ] **Bước 7: Truyền `locale` từ mọi nơi gọi**

`learning-journey.tsx` nhận thêm prop `locale` và chuyển tiếp; trang chủ, `hanh-trinh/page.tsx`
và `triet-ly/page.tsx` đọc `locale` theo đúng mẫu R-05 rồi truyền xuống.

- [ ] **Bước 8: KIỂM CHỨNG — trang tiếng Anh không còn chữ Việt nào**

```bash
pkill -f "next start" || true
npm run build && npm start &
sleep 12
curl -s -o /dev/null -w '%{http_code}\n' localhost:3000/    # phải 200 TRƯỚC khi đo
curl -s localhost:3000/en/philosophy \
  | perl -0777 -pe 's/<script\b[^>]*>.*?<\/script>//gs; s/<style\b[^>]*>.*?<\/style>//gs; s/<[^>]+>/ /g; s/\s+/ /g' \
  > /tmp/en-phil.txt
for s in "Đọc Papert" "Tải sách bản gốc" "Chia sẻ xong thì quay lại" "Bản tiếng Việt" "Thợ Làm"; do
  printf '%s -> %s\n' "$s" "$(grep -o "$s" /tmp/en-phil.txt | wc -l | tr -d ' ')"
done
```

Kỳ vọng: **cả năm dòng đều là `0`**.

Ngoại lệ đã duyệt (R-04), vẫn còn tiếng Việt và KHÔNG sửa ở nhiệm vụ này: link nhảy bỏ qua
menu, chân trang, ChatWidget.

- [ ] **Bước 9: Kiểm link trong sơ đồ vòng lặp trỏ đúng nhánh**

```bash
curl -s localhost:3000/en/philosophy | grep -o 'href="/en/how-we-learn/[a-z]*"' | sort -u
curl -s localhost:3000/triet-ly      | grep -o 'href="/hanh-trinh/[a-z-]*"'    | sort -u
```

Kỳ vọng: dòng đầu ra ba link `/en/how-we-learn/{play,make,share}`; dòng sau ra ba link
`/hanh-trinh/{choi,lam,chia-se}`. Trang tiếng Anh **không được** chứa link `/hanh-trinh/`.

- [ ] **Bước 10: `npm test`, `npx tsc --noEmit`, `npx eslint .` — tất cả phải sạch, và 14 URL tiếng Việt vẫn 200.**

- [ ] **Bước 11: Commit**

```bash
git add -A
git commit -m "feat(i18n): sơ đồ vòng lặp và khối Đọc Papert theo ngôn ngữ

Trang /en/philosophy trước đó là trang lai: văn xuôi tiếng Anh nhưng hai
khối dùng chung vẫn tiếng Việt, và link vòng lặp ghi cứng sang nhánh Việt."
```

---

## Xong kế hoạch 1 — trạng thái đạt được

| Đã có | Chưa có |
|---|---|
| Hạ tầng song ngữ chạy thật | Tám trang còn lại vẫn chỉ tiếng Việt |
| Trang Triết Lý song ngữ trọn vẹn | Chân trang, widget chat chưa dịch |
| Cơ chế chống dịch sót **đã chứng minh bằng phá hỏng thật** | **Ảnh OG bản tiếng Anh** — xem ghi chú dưới |
| Dải gợi ý ngôn ngữ, không tự chuyển | Ảnh và sơ đồ (kế hoạch 3) |
| 14 URL tiếng Việt nguyên vẹn, 5 redirect cũ nguyên vẹn | |
| `hreflang`, sitemap hai ngữ, `og:locale` theo ngôn ngữ | |

**Ảnh OG tiếng Anh hoãn sang kế hoạch 2, có chủ đích.** Task 10 mới làm `og:locale`;
bản thân tấm ảnh OG (`app/opengraph-image.tsx`) còn nguyên tiếng Việt. Hoãn vì ảnh OG
dùng khẩu hiệu chung của site, mà khẩu hiệu tiếng Anh chỉ chốt được sau khi trang chủ
đã dịch — việc của kế hoạch 2.

> **Mang theo cảnh báo này sang kế hoạch 2 (spec §2.7):** font nhúng BeVietnamPro trong
> `assets/fonts/` chỉ có **459 điểm mã và KHÔNG có glyph mũi tên**. Ảnh OG tiếng Anh phải
> dùng `»`; dùng `→` hay `↻` sẽ ra ô vuông rỗng. Lỗi này đã xảy ra một lần ngày 2026-09-06.

Nút chuyển ngôn ngữ trên tám trang chưa dịch sẽ **tự vô hiệu kèm chú thích**, không dẫn tới 404 — đó là lý do `alternatePath` trả `null` thay vì đoán bừa.

**Điều kiện để sang kế hoạch 2:** Task 9 Bước 6 phải cho đúng hai kết quả phá hỏng. Không đạt thì tám trang sau sẽ được dịch mà không có gì canh.
