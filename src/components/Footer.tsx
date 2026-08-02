import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-black text-white">
      <div className="page-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <p className="text-2xl font-bold tracking-tight text-gold-soft sm:text-3xl">
            {SITE.nameAr}
          </p>
          <p className="mt-2 text-[0.7rem] font-medium tracking-[0.22em] text-gold-mid uppercase">
            {SITE.nameEn}
          </p>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.9] text-white/65">
            {SITE.description}
          </p>
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
                  className="text-sm text-white/65 transition-colors duration-300 hover:text-gold-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-[0.8125rem] font-semibold tracking-[0.12em] text-gold">
            تواصل معنا
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-white/65">
            <li>
              <span className="mb-1 block text-[0.75rem] text-white/40">
                العنوان
              </span>
              <span className="leading-7">{SITE.address}</span>
            </li>
            <li>
              <span className="mb-1 block text-[0.75rem] text-white/40">
                الهاتف
              </span>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="transition-colors duration-300 hover:text-gold-soft"
                dir="ltr"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              <span className="mb-1 block text-[0.75rem] text-white/40">
                البريد
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors duration-300 hover:text-gold-soft"
                dir="ltr"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/40 sm:flex-row sm:text-start">
          <p>
            © {year} {SITE.nameAr}. جميع الحقوق محفوظة.
          </p>
          <p className="text-gold-mid/75">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
