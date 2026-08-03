import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/navigation";

type BrandLockupProps = {
  /** light = for white navbar; dark = for black footer */
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
  showSlogan?: boolean;
};

export default function BrandLockup({
  tone = "light",
  priority = false,
  className = "",
  showSlogan = true,
}: BrandLockupProps) {
  const onDark = tone === "dark";

  return (
    <span className={`inline-flex min-w-0 items-center gap-3 ${className}`}>
      <Image
        src={BRAND.logoMark}
        alt={BRAND.alt.logo}
        width={72}
        height={72}
        priority={priority}
        className={`size-10 shrink-0 object-contain sm:size-11 ${
          onDark ? "" : "drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]"
        }`}
      />
      <span className="flex min-w-0 flex-col items-start leading-none">
        <span
          className={`font-display text-[0.95rem] font-bold tracking-tight sm:text-[1.05rem] ${
            onDark ? "text-white" : "text-black"
          }`}
        >
          {SITE.nameShortAr}
        </span>
        <span
          className={`mt-1 font-display text-[0.68rem] font-medium tracking-wide sm:text-[0.72rem] ${
            onDark ? "text-gold-soft/90" : "text-gold"
          }`}
        >
          {SITE.nameShortService}
        </span>
        {showSlogan && (
          <span
            className={`mt-1.5 hidden font-latin text-[0.58rem] font-medium tracking-[0.18em] uppercase sm:block ${
              onDark ? "text-white/45" : "text-muted"
            }`}
          >
            {SITE.sloganEn}
          </span>
        )}
      </span>
    </span>
  );
}
