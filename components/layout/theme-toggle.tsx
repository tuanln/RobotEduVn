"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Chuyển sáng/tối. Lựa chọn lưu ở localStorage; lần đầu vào thì theo cài đặt
 * hệ điều hành. Script trong app/layout.tsx đã đặt class trước khi vẽ để tránh
 * nháy trắng — nguồn sự thật là class "dark" trên <html>, nút chỉ đọc lại từ đó.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  // Máy chủ không biết theme của người dùng — coi như sáng, MutationObserver
  // sẽ đồng bộ ngay sau khi hydrate.
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => false);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Chế độ riêng tư chặn localStorage — vẫn đổi được cho phiên này.
    }
  }

  const label = isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label} title={label}>
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </Button>
  );
}
