import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../../globals.css";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/common/json-ld";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/lib/i18n/locales";
import { localeOf } from "@/lib/i18n/params";
import { khung } from "@/lib/content/khung";
import { ogImages, twitterImages } from "@/lib/seo/metadata";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  const { tagline, description } = khung(locale).site;
  const title = `${SITE.name} — ${tagline}`;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s | ${SITE.name}` },
    description,
    keywords: [
      "STEM",
      "Robot",
      "giáo dục",
      "trẻ em",
      "Việt Nam",
      "MakerViet",
      "Làng Maker",
      "Maker Hub",
      "Chơi Làm Chia sẻ",
      "Seymour Papert",
      "học bằng làm",
    ],
    authors: [{ name: "Làng Maker" }],
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "vi_VN",
      url: SITE.url,
      siteName: SITE.name,
      title,
      description,
      // N-01 vấn đề 1: khai tường minh thay vì trông cậy quy ước tệp
      // opengraph-image.tsx tự kế thừa — gốc app/ không thuộc cây layout
      // nào trong hai root layout, nên auto-injection không chạy tới.
      images: ogImages(title),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages(),
    },
  };
}

export default async function SiteRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

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
