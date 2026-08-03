"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLockup from "@/components/BrandLockup";
import { isNavActive, NAV_ITEMS } from "@/lib/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
        scrolled || open
          ? "border-b border-gold/20 bg-black/90 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md"
          : "border-b border-transparent bg-black/70 backdrop-blur-sm"
      }`}
    >
      <nav
        className="page-shell flex h-[4.25rem] items-center justify-between gap-4 sm:h-[4.75rem] sm:gap-6"
        aria-label="التنقل الرئيسي"
      >
        <Link
          href="/"
          className="group min-w-0 shrink-0 transition-opacity duration-300 hover:opacity-90"
          aria-label="الحجاز للخدمات العقارية — الصفحة الرئيسية"
        >
          <BrandLockup tone="dark" priority />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative px-3 py-2.5 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 xl:px-3.5 xl:text-[0.875rem] ${
                    active
                      ? "text-gold"
                      : "text-white/65 hover:text-gold-soft"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-300 ease-out xl:inset-x-3.5 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-gold hidden px-5 py-2.5 text-[0.8125rem] sm:inline-flex"
          >
            احجز استشارة
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold-soft transition-[border-color,color,background-color] duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "إغلاق" : "القائمة"}</span>
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={`absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[7px] h-0.5 bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[14px] h-0.5 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-gold/15 bg-black transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="page-shell flex flex-col gap-1 py-5">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-4 py-3.5 text-base font-medium transition-colors duration-300 ${
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-white/75 hover:bg-gold/5 hover:text-gold-soft"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-3">
            <Link
              href="/contact"
              className="btn-gold flex w-full px-4 py-3.5"
            >
              احجز استشارة
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
