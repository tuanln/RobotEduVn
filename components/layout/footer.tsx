import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  "Khám Phá": [
    { label: "Hành Trình Học", href: "/hanh-trinh" },
    { label: "Triết Lý Papert", href: "/triet-ly" },
    { label: "Công Cụ & Thiết Bị", href: "/cong-cu" },
    { label: "Video Hub", href: "/video-hub" },
  ],
  "Cho Giáo Viên": [
    { label: "Tài Liệu Giáo Trình", href: "/cho-mentor" },
    { label: "Cộng Đồng Mentor", href: "/cong-dong" },
    { label: "Đăng Ký Maker Hub", href: "/cong-dong/maker-hub" },
  ],
  "Kết Nối": [
    { label: "Email: lang@makerviet.org", href: "mailto:lang@makerviet.org" },
    {
      label: "Facebook: Bình dân học STEM",
      href: "https://facebook.com/groups/binhdanhocSTEM",
    },
    { label: "GitHub: MakerViet", href: "https://github.com/makerviet" },
    {
      label: "YouTube: MakerViet",
      href: "https://youtube.com/@makerviet",
    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                R
              </div>
              <span className="text-lg font-bold">
                Robot<span className="text-primary">.Edu</span>.VN
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Nền tảng giáo dục STEM & Robot mở cho trẻ em Việt Nam. Học đi đôi
              với Làm — mỗi trẻ em là một nhà sáng tạo.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              Khởi xướng bởi MakerViet &bull; ThingEdu &bull; Rogo
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground/60">
            &copy; 2026 OpenSTEM Foundation. Mã nguồn mở — Giáo dục mở.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Mục tiêu: 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot
          </p>
        </div>
      </div>
    </footer>
  );
}
