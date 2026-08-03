import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/navigation";

type BrandLockupProps = {
  tone?: "dark";
  priority?: boolean;
  className?: string;
  showSlogan?: boolean;
};

/** Official dark-theme brand lockup for navbar / footer */
export default function BrandLockup({
  tone = "dark",
  priority = false,
  className = "",
  showSlogan = true,
}: BrandLockupProps) {
  void tone;

  return (
    <span className={`inline-flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`}>
      <Image
        src={BRAND.logoMark}
        alt={BRAND.alt.logo}
        width={72}
        height={72}
        priority={priority}
        className="size-9 shrink-0 object-contain sm:size-11"
      />
      <span className="flex min-w-0 flex-col items-start leading-none">
        <span className="font-display text-[0.9rem] font-bold tracking-tight text-white sm:text-[1.05rem]">
          {SITE.nameShortAr}
        </span>
        <span className="mt-1 font-display text-[0.65rem] font-medium tracking-wide text-gold-soft/90 sm:text-[0.72rem]">
          {SITE.nameShortService}
        </span>
        {showSlogan ? (
          <span className="mt-1.5 hidden font-latin text-[0.58rem] font-medium tracking-[0.18em] text-white/55 uppercase sm:block">
            {SITE.sloganEn}
          </span>
        ) : null}
      </span>
    </span>
  );
}
