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

export type SamplePropertyDetail = {
  id: string;
  title: string;
  description: string;
  price: number;
  status: "Sale" | "Rent";
  area: number;
  rooms: number;
  bathrooms: number;
  city: string;
  address: string;
  lat: number;
  lng: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  gallery?: { src: string; alt: string }[];
};

const now = new Date("2025-11-01T10:00:00.000Z");

function formatSamplePrice(price: number, status: "Sale" | "Rent"): string {
  const formatted = new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);
  return status === "Rent" ? `${formatted} / سنوياً` : formatted;
}

/** بيانات عرض سعودية كاملة — تُستخدم عند فراغ قاعدة البيانات */
export const SAMPLE_PROPERTY_DETAILS: SamplePropertyDetail[] = [
  {
    id: "sample-riyadh-yasmin",
    title: "فيلا دورين — حي الياسمين",
    description:
      "فيلا دورين بواجهة حجرية حديثة في حي الياسمين شمال الرياض، مساحة البناء تقريباً 520 م² على أرض مناسبة للعائلات.\n\nتضمّ مجلس رجال، صالة عائلية، مطبخ مجهز، خمس غرف نوم ماستر مع حمّامات، وملحق خارجي. الموقع قريب من طريق الملك سلمان والمدارس والخدمات.\n\nالصك إلكتروني، والبيع جاهز للإفراغ بعد المعاينة والموافقة البنكية إن لزم.",
    price: 4_800_000,
    status: "Sale",
    area: 520,
    rooms: 5,
    bathrooms: 6,
    city: "الرياض",
    address: "حي الياسمين — شمال الرياض",
    lat: 24.8125,
    lng: 46.6408,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    createdAt: now,
    updatedAt: now,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
        alt: "واجهة الفيلا في حي الياسمين",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        alt: "الحديقة الأمامية",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        alt: "صالة الاستقبال",
      },
    ],
  },
  {
    id: "sample-jeddah-shati",
    title: "بنتهاوس — شاطئ جدة",
    description:
      "بنتهاوس فاخر شمال جدة بإطلالة بانورامية ومساحات مفتوحة بزجاج واسع. مناسبة للسكن الدائم أو الاستثمار الإيجاري الراقي.\n\nأربع غرف نوم، صالة واسعة، مطبخ أمريكي، وتراس مطل. المبنى مخدوم بمواقف وأمن.\n\nمتاح للمعاينة بموعد مسبق عبر المكتب.",
    price: 3_200_000,
    status: "Sale",
    area: 310,
    rooms: 4,
    bathrooms: 4,
    city: "جدة",
    address: "شمال جدة — قرب الواجهة البحرية",
    lat: 21.6433,
    lng: 39.1028,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    createdAt: now,
    updatedAt: now,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        alt: "واجهة البنتهاوس في جدة",
      },
      {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
        alt: "إطلالة خارجية",
      },
    ],
  },
  {
    id: "sample-dammam-palace",
    title: "قصر معاصر — الدمام",
    description:
      "قصر فسيح في الدمام يجمع الحداثة والخصوصية، مع حدائق منسّقة ومجالس استقبال واسعة تناسب المناسبات.\n\nسبع غرف نوم، ثمانية حمّامات، ملحق ضيافة، ومواقف متعددة. مناسب للسكن العائلي الكبير أو كأصل استثماري مميز في الشرقية.",
    price: 7_500_000,
    status: "Sale",
    area: 890,
    rooms: 7,
    bathrooms: 8,
    city: "الدمام",
    address: "الدمام — حي الشاطئ",
    lat: 26.3927,
    lng: 49.9777,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "sample-khobar-marble",
    title: "فيلا رخامية — الخبر",
    description:
      "فيلا دورين في الخبر بتشطيبات رخامية فاخرة وتصميم متوازن يمنح إحساساً بالاتساع. قريبة من الكورنيش ومرافق المدينة.\n\nست غرف، خمس حمّامات، مجلس وملحق. جاهزة للسكن فوراً.",
    price: 5_100_000,
    status: "Sale",
    area: 640,
    rooms: 6,
    bathrooms: 5,
    city: "الخبر",
    address: "الخبر — قرب الكورنيش",
    lat: 26.2172,
    lng: 50.1971,
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1600&q=80",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "sample-yanbu-rent",
    title: "إقامة بحرية — ينبع (إيجار سنوي)",
    description:
      "إقامة راقية في ينبع بإطلالة بحرية هادئة، مثالية للإيجار السنوي للعائلات أو الكوادر المقيمة.\n\nخمس غرف، مساحات معيشة رحبة، وحديقة خاصة. الإيجار سنوي وفق عقد إلكتروني عبر منصة إيجار.",
    price: 280_000,
    status: "Rent",
    area: 710,
    rooms: 5,
    bathrooms: 5,
    city: "ينبع",
    address: "الواجهة البحرية — ينبع",
    lat: 24.0231,
    lng: 38.19,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "sample-makkah-courtyard",
    title: "وحدة بفناء داخلي — مكة المكرمة",
    description:
      "وحدة سكنية ضمن مجمّع راقٍ في مكة المكرمة، بفناء داخلي هادئ وتفاصيل معمارية مستوحاة من الطابع المحلي.\n\nأربع غرف، مناسبة للسكن العائلي مع سهولة الوصول للحرم عبر الطرق الرئيسية.",
    price: 4_000_000,
    status: "Sale",
    area: 480,
    rooms: 4,
    bathrooms: 4,
    city: "مكة المكرمة",
    address: "مكة المكرمة — حي العزيزية",
    lat: 21.4225,
    lng: 39.8262,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    createdAt: now,
    updatedAt: now,
  },
];

export function getSampleProperty(id: string): SamplePropertyDetail | undefined {
  return SAMPLE_PROPERTY_DETAILS.find((p) => p.id === id);
}

export function sampleToCard(property: SamplePropertyDetail): Property {
  const badges: PropertyBadge[] = [
    {
      label: property.status === "Sale" ? "للبيع" : "للإيجار",
      variant: "gold",
    },
  ];
  if (property.price >= 5_000_000 || property.status === "Rent") {
    badges.push({ label: "مميز", variant: "dark" });
  }

  return {
    id: property.id,
    title: property.title,
    location: property.city,
    price: formatSamplePrice(property.price, property.status),
    area: property.area,
    rooms: property.rooms,
    baths: property.bathrooms,
    image: property.imageUrl,
    imageAlt: property.title,
    href: `/properties/${property.id}`,
    badges,
  };
}

export const SAMPLE_PROPERTIES: Property[] =
  SAMPLE_PROPERTY_DETAILS.map(sampleToCard);
