import type { Metadata } from "next";

import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "머니랩 (MoneyLab) - 한국 금융 계산기",
    template: "%s",
  },
  description:
    "한국 사용자를 위한 투자, 배당, 연봉, 대출, 적금, FIRE, ETF, 환율, 연금 계산기 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-100 text-slate-900 antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.12),_transparent_24%),linear-gradient(180deg,#f8fbff_0%,#eef4fb_38%,#f8fafc_100%)]">
          <SiteHeader />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
