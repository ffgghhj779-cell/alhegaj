import type { Metadata } from "next";
import { Montserrat, Tajawal } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/navigation";
import "./globals.css";

/** Premium Arabic display + UI — geometric, matches brand lockup */
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

/** Premium English tracking — thin caps for slogan / English name */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-latin",
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
    "الحجاز للخدمات العقارية",
    "Alhijaz Real Estate",
    "عقارات فاخرة",
    "السعودية",
    "الرياض",
    "بيع عقارات",
    "إيجار",
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
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${montserrat.variable} h-full`}
    >
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
