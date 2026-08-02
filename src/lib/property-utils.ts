import type { Property as DbProperty, PropertyStatus } from "@/generated/prisma/client";
import type { Property as CardProperty, PropertyBadge } from "@/lib/properties";

export function formatPrice(price: number, status: PropertyStatus): string {
  const formatted = new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);

  if (status === "Rent") {
    return `${formatted} / سنوياً`;
  }
  return formatted;
}

export function statusLabel(status: PropertyStatus): string {
  return status === "Sale" ? "للبيع" : "للإيجار";
}

export function toCardProperty(property: DbProperty): CardProperty {
  const badges: PropertyBadge[] = [
    { label: statusLabel(property.status), variant: "gold" },
  ];

  if (property.price >= 5_000_000) {
    badges.push({ label: "مميز", variant: "dark" });
  }

  return {
    id: property.id,
    title: property.title,
    location: "المملكة العربية السعودية",
    price: formatPrice(property.price, property.status),
    area: property.area,
    rooms: property.rooms,
    baths: property.bathrooms,
    image: property.imageUrl,
    imageAlt: property.title,
    href: `/properties/${property.id}`,
    badges,
  };
}

/** Architectural gallery variants (no people) derived from primary image */
export function galleryImages(primaryUrl: string, title: string) {
  const extras = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
  ];

  return [
    { src: primaryUrl, alt: `الصورة الرئيسية — ${title}` },
    ...extras.map((src, i) => ({
      src,
      alt: `منظر معماري ${i + 2} — ${title}`,
    })),
  ];
}
