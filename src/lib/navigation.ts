export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/properties", label: "العقارات" },
  { href: "/media", label: "الوسائط" },
  { href: "/contact", label: "تواصل معنا" },
] as const;

export const SITE = {
  nameAr: "الحجاز العقارية",
  nameEn: "Alhijaz Real Estate",
  tagline: "فخامة المكان… ورهبة التفاصيل",
  description:
    "منصة عقارية فاخرة تقدّم تجربة استثنائية في اختيار وتطوير العقارات في المملكة العربية السعودية.",
  phone: "+966 11 000 0000",
  email: "info@alhejaz.sa",
  address: "الرياض، المملكة العربية السعودية",
  /** Admin WhatsApp digits only (country code, no + or spaces) */
  whatsappAdmin: "966500000000",
  lat: 24.7136,
  lng: 46.6753,
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://www.tiktok.com/",
    twitter: "https://x.com/",
  },
} as const;

export function getAdminWhatsApp(): string {
  const fromEnv = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP?.replace(/\D/g, "");
  return fromEnv && fromEnv.length >= 10 ? fromEnv : SITE.whatsappAdmin;
}

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
