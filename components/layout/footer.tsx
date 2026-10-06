import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor } from "@/lib/i18n/routes";
import { khung } from "@/lib/content/khung";

export function Footer({ locale }: { locale: Locale }) {
  const t = khung(locale).footer;
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href={pathFor("home", locale)} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                R
              </div>
              <span className="text-lg font-bold">
                Robot<span className="text-primary">.Edu</span>.VN
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{t.gioiThieu}</p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              {t.khoiXuong} MakerViet &bull; ThingEdu &bull; Rogo
            </p>
          </div>

          {/* Links */}
          {t.cot.map(({ tieuDe, links }) => (
            <div key={tieuDe}>
              <h3 className="mb-3 text-sm font-semibold">{tieuDe}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.route ? pathFor(link.route, locale) : (link.href ?? "")}
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
            &copy; 2026{" "}
            <a
              href="https://de-stem-foundation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              OpenSTEM Foundation
            </a>
            {t.banQuyen}
          </p>
          <p className="text-xs text-muted-foreground/60">{t.mucTieu}</p>
        </div>
      </div>
    </footer>
  );
}
