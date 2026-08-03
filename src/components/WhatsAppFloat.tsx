"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { buildWhatsAppUrl } from "@/lib/navigation";

/** Floating WhatsApp on mobile — hidden on contact/admin where forms dominate */
export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/contact") ||
    /^\/properties\/[^/]+$/.test(pathname) ||
    /^\/projects\/[^/]+$/.test(pathname)
  ) {
    return null;
  }

  const href = buildWhatsAppUrl(
    "السلام عليكم، أرغب بالتواصل مع الحجاز للخدمات العقارية.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-6 end-4 z-30 inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.65)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 lg:end-6 lg:size-14"
    >
      <MessageCircle className="size-6" strokeWidth={1.8} aria-hidden />
    </a>
  );
}
