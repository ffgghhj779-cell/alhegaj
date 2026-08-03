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
    location: property.city || "المملكة العربية السعودية",
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

/** Gallery: only real listing photos — never invent stock extras */
export function galleryImages(primaryUrl: string, title: string) {
  return [{ src: primaryUrl, alt: `الصورة الرئيسية — ${title}` }];
}
