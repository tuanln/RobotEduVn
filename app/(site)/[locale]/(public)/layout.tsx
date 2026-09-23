import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locales";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <>
      {/* Cho người dùng bàn phím nhảy thẳng vào nội dung, bỏ qua 8 mục menu */}
      <a
        href="#noi-dung"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Bỏ qua menu, tới nội dung chính
      </a>
      <Header locale={locale} />
      <main id="noi-dung" className="min-h-screen">
        {children}
      </main>
      <Footer locale={locale} />
      <ChatWidget />
    </>
  );
}
