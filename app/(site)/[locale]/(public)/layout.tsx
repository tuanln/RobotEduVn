import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { LanguageSuggestion } from "@/components/layout/language-suggestion";
import { localeOf } from "@/lib/i18n/params";
import { khung } from "@/lib/content/khung";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);

  return (
    <>
      {/* Cho người dùng bàn phím nhảy thẳng vào nội dung, bỏ qua 8 mục menu */}
      <a
        href="#noi-dung"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        {khung(locale).skipLink}
      </a>
      <LanguageSuggestion locale={locale} />
      <Header locale={locale} />
      <main id="noi-dung" className="min-h-screen">
        {children}
      </main>
      <Footer locale={locale} />
      <ChatWidget t={khung(locale).chat} />
    </>
  );
}
