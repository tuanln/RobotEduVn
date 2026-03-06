import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Robot.Edu.VN — Giáo Dục STEM & Robot Mở",
    template: "%s | Robot.Edu.VN",
  },
  description:
    "Nền tảng giáo dục STEM & Robot mở cho trẻ em Việt Nam. Học đi đôi với Làm — từ Khám phá đến Chia sẻ. Mục tiêu 1 triệu trẻ em tiếp cận STEM trong 5 năm.",
  keywords: [
    "STEM",
    "Robot",
    "giáo dục",
    "trẻ em",
    "Việt Nam",
    "MakerViet",
    "OpenSTEM",
    "lập trình",
    "ThingBot",
  ],
  authors: [{ name: "OpenSTEM Foundation" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://robot.edu.vn",
    siteName: "Robot.Edu.VN",
    title: "Robot.Edu.VN — Giáo Dục STEM & Robot Mở",
    description:
      "Nền tảng giáo dục STEM & Robot mở cho trẻ em Việt Nam. Mục tiêu 1 triệu trẻ em tiếp cận STEM trong 5 năm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
