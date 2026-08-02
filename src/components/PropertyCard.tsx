import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Maximize2 } from "lucide-react";
import type { Property } from "@/lib/properties";

type PropertyCardProps = {
  property: Property;
  priority?: boolean;
  className?: string;
};

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Maximize2;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-2 text-muted">
      <Icon
        className="size-3.5 shrink-0 text-gold"
        strokeWidth={1.6}
        aria-hidden
      />
      <span className="sr-only">{label}: </span>
      <span className="text-[0.75rem] font-medium tracking-wide sm:text-[0.8125rem]">
        {value}
      </span>
    </li>
  );
}

export default function PropertyCard({
  property,
  priority = false,
  className = "",
}: PropertyCardProps) {
  const {
    title,
    location,
    price,
    area,
    rooms,
    baths,
    image,
    imageAlt,
    href = "/properties",
    badges = [],
  } = property;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_8px_28px_-16px_rgba(0,0,0,0.1)] transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_20px_48px_-20px_rgba(0,0,0,0.14)] ${className}`}
    >
      <Link
        href={href}
        className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
          />

          {badges.length > 0 && (
            <ul className="absolute inset-x-0 top-0 z-10 flex flex-wrap gap-2 p-4">
              {badges.map((badge) => (
                <li key={badge.label}>
                  <span
                    className={`inline-flex rounded px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide ${
                      badge.variant === "dark"
                        ? "bg-black/90 text-gold-soft"
                        : "bg-gold text-black"
                    }`}
                  >
                    {badge.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
          <div className="flex flex-1 flex-col gap-1.5">
            <p className="text-[0.75rem] font-medium tracking-wide text-gold-mid">
              {location}
            </p>
            <h3 className="text-base font-bold leading-snug tracking-tight text-black sm:text-lg">
              {title}
            </h3>
            <p className="mt-2 text-lg font-bold tracking-tight text-gold sm:text-xl">
              {price}
            </p>
          </div>

          <ul className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-border/80 pt-4">
            <SpecItem
              icon={Maximize2}
              label="المساحة"
              value={`${area.toLocaleString("ar-SA")} م²`}
            />
            <SpecItem
              icon={BedDouble}
              label="الغرف"
              value={`${rooms.toLocaleString("ar-SA")} غرف`}
            />
            <SpecItem
              icon={Bath}
              label="الحمامات"
              value={`${baths.toLocaleString("ar-SA")} حمّام`}
            />
          </ul>
        </div>
      </Link>
    </article>
  );
}
