import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Onest, Prata } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

// Шрифты загружаются и раздаются самим сайтом (без запросов к Google у посетителя).
const display = Prata({ weight: "400", subsets: ["latin", "cyrillic"], variable: "--font-prata", display: "swap" });
const sans = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.seo.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.locale} className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
