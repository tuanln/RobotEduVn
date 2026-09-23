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
