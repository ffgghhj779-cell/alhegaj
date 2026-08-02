import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/navigation";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alhejaz.sa";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.nameAr} | ${SITE.nameEn}`,
    template: `%s | ${SITE.nameAr}`,
  },
  description: SITE.description,
  keywords: [
    "عقارات",
    "الحجاز العقارية",
    "عقارات فاخرة",
    "السعودية",
    "الرياض",
    "Alhijaz Real Estate",
  ],
  authors: [{ name: SITE.nameAr }],
  creator: SITE.nameAr,
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: SITE.nameAr,
    title: `${SITE.nameAr} | ${SITE.nameEn}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nameAr} | ${SITE.nameEn}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          تخطّي إلى المحتوى
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
