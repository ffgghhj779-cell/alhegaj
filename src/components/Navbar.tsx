"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE } from "@/lib/navigation";

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

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
        scrolled || open
          ? "border-b border-border/80 bg-white/95 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.1)] backdrop-blur-md"
          : "border-b border-transparent bg-white/75 backdrop-blur-sm"
      }`}
    >
      <nav
        className="page-shell flex h-[4.25rem] items-center justify-between gap-6 sm:h-[4.75rem]"
        aria-label="التنقل الرئيسي"
      >
        <Link
          href="/"
          className="group flex min-w-0 flex-col items-start leading-tight"
        >
          <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300 group-hover:text-gold sm:text-xl">
            {SITE.nameAr}
          </span>
          <span className="mt-0.5 hidden text-[0.65rem] font-medium tracking-[0.2em] text-gold-mid uppercase sm:block">
            {SITE.nameEn}
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative px-3.5 py-2.5 text-[0.875rem] font-medium tracking-wide transition-colors duration-300 ${
                    active
                      ? "text-gold"
                      : "text-muted-strong/80 hover:text-gold"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-300 ease-out ${
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
            className="btn-dark hidden px-5 py-2.5 text-[0.8125rem] sm:inline-flex"
          >
            احجز استشارة
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-black transition-[border-color,color,background-color] duration-300 hover:border-gold hover:bg-surface hover:text-gold lg:hidden"
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
        className={`overflow-hidden border-t border-border bg-white transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="page-shell flex flex-col gap-1 py-5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-4 py-3.5 text-base font-medium transition-colors duration-300 ${
                    active
                      ? "bg-surface text-gold"
                      : "text-black hover:bg-surface hover:text-gold"
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
              className="btn-dark flex w-full px-4 py-3.5"
            >
              احجز استشارة
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
