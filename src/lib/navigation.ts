export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/properties", label: "العقارات" },
  { href: "/projects", label: "مشاريعنا" },
  { href: "/media", label: "الوسائط" },
  { href: "/contact", label: "تواصل معنا" },
] as const;

export const SITE = {
  nameAr: "الحجاز للخدمات العقارية",
  nameShortAr: "الحجاز",
  nameShortService: "للخدمات العقارية",
  nameEn: "AL-HIJAZ REAL ESTATE SERVICES",
  tagline: "فخامة المكان… ورهبة التفاصيل",
  sloganEn: "Where place meets presence",
  description:
    "مكتب الحجاز للخدمات العقارية — حلول عقارية متكاملة ترتكز على الجودة والابتكار والموثوقية في المملكة العربية السعودية.",
  phone: "+966 11 000 0000",
  email: "info@alhejaz.sa",
  address: "الرياض — حي العليا، طريق الملك فهد",
  /** Admin WhatsApp digits only (country code, no + or spaces) */
  whatsappAdmin: "966500000000",
  lat: 24.6936,
  lng: 46.6853,
  social: {
    instagram: "",
    tiktok: "",
    twitter: "",
    linkedin: "",
  },
} as const;

export function getAdminWhatsApp(): string {
  const fromEnv = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP?.replace(/\D/g, "");
  return fromEnv && fromEnv.length >= 10 ? fromEnv : SITE.whatsappAdmin;
}

/** أخفِ روابط السوشيال العامة حتى تُضبط حسابات حقيقية */
export function getConfiguredSocialLinks(): { label: string; href: string }[] {
  const entries: { label: string; href: string }[] = [
    { label: "إنستغرام", href: SITE.social.instagram },
    { label: "تيك توك", href: SITE.social.tiktok },
    { label: "X", href: SITE.social.twitter },
    { label: "لينكدإن", href: SITE.social.linkedin },
  ];

  return entries.filter(({ href }) => {
    if (!href) return false;
    try {
      const url = new URL(href);
      return url.pathname.length > 1;
    } catch {
      return false;
    }
  });
}

export function buildWhatsAppUrl(text: string): string {
  const digits = getAdminWhatsApp();
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
