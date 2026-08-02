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

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
