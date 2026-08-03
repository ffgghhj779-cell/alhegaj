import Link from "next/link";
import BrandLockup from "@/components/BrandLockup";
import { NAV_ITEMS, SITE } from "@/lib/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gold/15 bg-black text-white">
      <div className="page-shell grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Link
            href="/"
            className="inline-block transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            aria-label={SITE.nameAr}
          >
            <BrandLockup tone="dark" showSlogan />
          </Link>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.9] text-white/70">
            {SITE.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-4 text-sm">
            <li>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={SITE.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                X
              </a>
            </li>
            <li>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[0.8125rem] font-semibold tracking-[0.12em] text-gold">
            روابط سريعة
          </h2>
          <ul className="mt-5 space-y-3.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-sm text-white/70 transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                سياسة الخصوصية
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-[0.8125rem] font-semibold tracking-[0.12em] text-gold">
            تواصل معنا
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li>
              <span className="mb-1 block text-[0.75rem] text-white/55">
                العنوان
              </span>
              <span className="leading-7">{SITE.address}</span>
            </li>
            <li>
              <span className="mb-1 block text-[0.75rem] text-white/55">
                الهاتف
              </span>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                dir="ltr"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              <span className="mb-1 block text-[0.75rem] text-white/55">
                البريد
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors duration-300 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                dir="ltr"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="page-shell flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/50 sm:flex-row sm:text-start">
          <p>
            © {year} {SITE.nameAr}. جميع الحقوق محفوظة.
          </p>
          <p className="text-gold-mid/80">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
