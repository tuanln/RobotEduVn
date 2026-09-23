"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { ROUTES, routeKeyFromPath } from "@/lib/i18n/routes";
import { nenGoiY } from "@/lib/i18n/suggest";
import { TRANSLATED_ROUTES } from "@/lib/i18n/translated";

const KHOA = "goi-y-ngon-ngu-da-dong";

/**
 * Không cần lắng nghe thay đổi từ nơi khác — chỉ cần biết đây có phải lần
 * render sau khi hydrate ở trình duyệt hay không (server không có
 * navigator/localStorage). Đây là mẹo "isClient" chuẩn khuyến nghị của React
 * để đọc dữ liệu chỉ-có-ở-trình-duyệt mà KHÔNG cần setState trong effect
 * (repo này bật rule react-hooks/set-state-in-effect).
 */
function subscribeKhongLam() {
  return () => {};
}

function docDaTuChoi(): boolean {
  try {
    return localStorage.getItem(KHOA) === "1";
  } catch {
    // Trình duyệt chặn site data — coi như chưa từ chối, không hỏng trang.
    return false;
  }
}

export function LanguageSuggestion({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  // true chỉ sau khi đã hydrate ở trình duyệt; false lúc render ở máy chủ.
  const laTrinhDuyet = useSyncExternalStore(
    subscribeKhongLam,
    () => true,
    () => false,
  );
  const daTuChoiLuu = useSyncExternalStore(
    subscribeKhongLam,
    docDaTuChoi,
    () => false,
  );

  // Đóng dải ngay trong phiên hiện tại, không đợi vòng render đọc lại
  // localStorage (đổi tab mới cần đọc lại).
  const [vuaDong, setVuaDong] = useState(false);

  let browserLangs: readonly string[] = [];
  try {
    browserLangs = navigator.languages ?? [];
  } catch {
    // Một số môi trường hạn chế có thể chặn; không có thông tin ngôn ngữ thì
    // nenGoiY() trả null và dải im lặng — đúng hành vi mong muốn.
  }

  const goiY = laTrinhDuyet
    ? nenGoiY({
        current: locale,
        browserLangs,
        daTuChoi: daTuChoiLuu || vuaDong,
      })
    : null;

  if (goiY === null) return null;

  // Tính route key MỘT LẦN, dùng lại cho cả việc lọc theo TRANSLATED_ROUTES
  // lẫn tra đường dẫn đối ứng (khỏi gọi routeKeyFromPath lần hai bên trong
  // alternatePath).
  const key = routeKeyFromPath(pathname);

  // Gợi ý sang bản tiếng Việt luôn an toàn (nội dung tiếng Việt luôn có
  // thật). Nhưng gợi ý sang bản tiếng Anh chỉ được làm khi trang đó nằm
  // trong TRANSLATED_ROUTES — nếu không, /en/... trả 200 nhưng chữ vẫn là
  // tiếng Việt, gợi ý lúc đó còn tệ hơn không gợi ý gì (brief chưa lường
  // tới điều này, xem báo cáo Task 11).
  if (goiY === "en" && (key === null || !TRANSLATED_ROUTES.has(key))) {
    return null;
  }

  const href = key === null ? null : ROUTES[key][goiY];
  if (href === null) return null;

  const dong = () => {
    try {
      localStorage.setItem(KHOA, "1");
    } catch {
      // Không lưu được thì thôi, vẫn phải đóng được dải.
    }
    setVuaDong(true);
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
