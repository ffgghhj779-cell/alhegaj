import Image from "next/image";
import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  variant?: "dark" | "light" | "stacked" | "mark";
  className?: string;
  priority?: boolean;
};

const VARIANTS = {
  dark: {
    src: BRAND.logoDark,
    width: 176,
    height: 156,
    className: "h-10 w-auto sm:h-11",
  },
  light: {
    src: BRAND.logoLight,
    width: 176,
    height: 156,
    className: "h-16 w-auto sm:h-[4.5rem]",
  },
  stacked: {
    src: BRAND.logoOfficial,
    width: 220,
    height: 300,
    className: "h-28 w-auto sm:h-32",
  },
  mark: {
    src: BRAND.logoMark,
    width: 96,
    height: 96,
    className: "size-10",
  },
} as const;

export default function BrandLogo({
  variant = "dark",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const config = VARIANTS[variant];

  return (
    <Image
      src={config.src}
      alt={BRAND.alt.logo}
      width={config.width}
      height={config.height}
      priority={priority}
      className={`object-contain ${config.className} ${className}`}
    />
  );
}
