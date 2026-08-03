import Link from "next/link";
import { Bath, BedDouble, Maximize2, Phone } from "lucide-react";
import type { Property, PropertyStatus } from "@/generated/prisma/client";
import { formatPrice, statusLabel } from "@/lib/property-utils";

type PropertySidebarProps = {
  property: Property;
};

function SpecRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Maximize2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/80 py-3.5 last:border-b-0">
      <span className="inline-flex items-center gap-2.5 text-sm text-muted">
        <Icon className="size-4 shrink-0 text-gold" strokeWidth={1.6} aria-hidden />
        {label}
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground">
        {value}
      </span>
    </div>
  );
}

export default function PropertySidebar({ property }: PropertySidebarProps) {
  const status = property.status as PropertyStatus;

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="surface-card p-6 sm:p-7">
        <span className="inline-flex rounded px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide bg-gold text-black">
          {statusLabel(status)}
        </span>

        <p className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
          {formatPrice(property.price, status)}
        </p>

        <div className="mt-5">
          <SpecRow
            icon={Maximize2}
            label="المساحة"
            value={`${property.area.toLocaleString("ar-SA")} م²`}
          />
          <SpecRow
            icon={BedDouble}
            label="الغرف"
            value={property.rooms.toLocaleString("ar-SA")}
          />
          <SpecRow
            icon={Bath}
            label="الحمامات"
            value={property.bathrooms.toLocaleString("ar-SA")}
          />
        </div>

        <Link href="/contact" className="btn-dark mt-7 w-full">
          <Phone className="size-4" aria-hidden />
          تواصل معنا
        </Link>

        <p className="mt-4 text-center text-xs leading-6 text-muted">
          فريق الحجاز العقارية جاهز لترتيب زيارة خاصة بسرية تامة.
        </p>
      </div>
    </aside>
  );
}
