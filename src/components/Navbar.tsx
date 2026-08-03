"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import BrandLockup from "@/components/BrandLockup";
import { isNavActive, NAV_ITEMS } from "@/lib/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
        scrolled || open
          ? "border-b border-gold/20 bg-black/92 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md"
          : "border-b border-transparent bg-black/75 backdrop-blur-sm"
      }`}
    >
      <nav
        className="page-shell flex h-[4.25rem] items-center justify-between gap-3 sm:h-[4.75rem] sm:gap-5"
        aria-label="التنقل الرئيسي"
      >
        <Link
          href="/"
          className="group min-w-0 shrink-0 transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
          aria-label="الحجاز للخدمات العقارية — الصفحة الرئيسية"
        >
          <BrandLockup tone="dark" priority showSlogan className="max-sm:gap-2" />
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-3 py-2.5 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
                    active
                      ? "text-gold"
                      : "text-white/70 hover:text-gold-soft"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-300 ease-out ${
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

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/contact"
            className="btn-gold hidden min-h-11 px-5 py-2.5 text-[0.8125rem] sm:inline-flex"
          >
            احجز استشارة
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-gold/30 text-gold-soft transition-[border-color,color,background-color] duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((v) => !v)}
          >
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

      {open ? (
        <button
          type="button"
          className="fixed inset-0 top-[4.25rem] z-40 bg-black/55 sm:top-[4.75rem] xl:hidden"
          aria-label="إغلاق القائمة"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        ref={menuRef}
        id={menuId}
        className={`relative z-50 overflow-hidden border-t border-gold/15 bg-black transition-[max-height,opacity] duration-300 ease-out xl:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="page-shell flex flex-col gap-1 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block min-h-12 rounded-md px-4 py-3.5 text-base font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-white/80 hover:bg-gold/5 hover:text-gold-soft"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-3">
            <Link href="/contact" className="btn-gold flex min-h-12 w-full px-4 py-3.5">
              احجز استشارة
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
