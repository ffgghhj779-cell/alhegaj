export type PropertyBadge = {
  label: string;
  variant?: "gold" | "dark";
};

export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  baths: number;
  image: string;
  imageAlt: string;
  href?: string;
  badges?: PropertyBadge[];
};

/** Architectural placeholder listings — no people in imagery */
export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "فيلا فاخرة في حي الياسمين",
    location: "الرياض",
    price: "٤٫٨ مليون ر.س",
    area: 520,
    rooms: 5,
    baths: 6,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "واجهة فيلا معمارية فاخرة بإضاءة مسائية",
    href: "/properties",
    badges: [
      { label: "للبيع", variant: "gold" },
      { label: "مميز", variant: "dark" },
    ],
  },
  {
    id: "2",
    title: "شقة بنتهاوس مطلة على الأفق",
    location: "جدة",
    price: "٣٫٢ مليون ر.س",
    area: 310,
    rooms: 4,
    baths: 4,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "منزل حديث بواجهات زجاجية وحديقة أمامية",
    href: "/properties",
    badges: [{ label: "للبيع", variant: "gold" }],
  },
  {
    id: "3",
    title: "قصر معاصر بحديقة واسعة",
    location: "الدمام",
    price: "٧٫٥ مليون ر.س",
    area: 890,
    rooms: 7,
    baths: 8,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "عمارة سكنية فاخرة بتصميم معاصر",
    href: "/properties",
    badges: [
      { label: "للبيع", variant: "gold" },
      { label: "مميز", variant: "dark" },
    ],
  },
  {
    id: "4",
    title: "فيلا دورين بتشطيب رخامي",
    location: "الخبر",
    price: "٥٫١ مليون ر.س",
    area: 640,
    rooms: 6,
    baths: 5,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "واجهة فيلا بيضاء بأقواس معمارية أنيقة",
    href: "/properties",
    badges: [{ label: "للبيع", variant: "gold" }],
  },
  {
    id: "5",
    title: "إقامة فاخرة على الواجهة البحرية",
    location: "ينبع",
    price: "٦٫٤ مليون ر.س",
    area: 710,
    rooms: 5,
    baths: 5,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "منزل فاخر بإطلالة مائية وتصميم معاصر",
    href: "/properties",
    badges: [
      { label: "للإيجار", variant: "gold" },
      { label: "مميز", variant: "dark" },
    ],
  },
  {
    id: "6",
    title: "مجمع سكني راقٍ بفناء داخلي",
    location: "مكة المكرمة",
    price: "٤٫٠ مليون ر.س",
    area: 480,
    rooms: 4,
    baths: 4,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "فناء داخلي لمجمع سكني بتصميم معماري هادئ",
    href: "/properties",
    badges: [{ label: "للبيع", variant: "gold" }],
  },
];
