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
  if (key) return ROUTES[key][to];
  const id = videoId(tidy(path), "vi") ?? videoId(tidy(path), "en");
  return id === null ? null : videoPath(id, to);
}

/** `/en/maker-village` → `/lang-maker`. Middleware dùng để viết lại đường dẫn. */
export function canonicalPathFromEn(enPath: string): string | null {
  const wanted = tidy(enPath);
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (ROUTES[key].en === wanted) return ROUTES[key].vi;
  }
  const id = videoId(wanted, "en");
  return id === null ? null : videoPath(id, "vi");
}
