import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, PropertyStatus } from "../src/generated/prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SEED = [
  {
    title: "فيلا فاخرة في حي الياسمين",
    description:
      "فيلا معمارية فاخرة بواجهات حجرية وحديقة خاصة، تقع في أحد أرقى أحياء الرياض. تشطيبات راقية وإطلالات هادئة تناسب أسلوب حياة استثنائياً.",
    price: 4_800_000,
    status: PropertyStatus.Sale,
    area: 520,
    rooms: 5,
    bathrooms: 6,
    city: "الرياض",
    address: "حي الياسمين، الرياض",
    lat: 24.7752,
    lng: 46.6389,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "شقة بنتهاوس مطلة على الأفق",
    description:
      "بنتهاوس معاصر في جدة بإطلالة بانورامية، مساحات مفتوحة وزجاج واسع يعكس ضوء البحر وروح المدينة.",
    price: 3_200_000,
    status: PropertyStatus.Sale,
    area: 310,
    rooms: 4,
    bathrooms: 4,
    city: "جدة",
    address: "شمال جدة",
    lat: 21.5433,
    lng: 39.1728,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "قصر معاصر بحديقة واسعة",
    description:
      "قصر فسيح في الدمام يجمع بين الحداثة والخصوصية، مع حدائق منسّقة ومساحات استقبال تليق بالمناسبات الكبرى.",
    price: 7_500_000,
    status: PropertyStatus.Sale,
    area: 890,
    rooms: 7,
    bathrooms: 8,
    city: "الدمام",
    address: "الدمام، المنطقة الشرقية",
    lat: 26.3927,
    lng: 49.9777,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "فيلا دورين بتشطيب رخامي",
    description:
      "فيلا دورين في الخبر بتشطيبات رخامية فاخرة، تصميم معماري متوازن يمنح إحساساً بالاتساع والأناقة.",
    price: 5_100_000,
    status: PropertyStatus.Sale,
    area: 640,
    rooms: 6,
    bathrooms: 5,
    city: "الخبر",
    address: "الخبر، المنطقة الشرقية",
    lat: 26.2172,
    lng: 50.1971,
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "إقامة فاخرة على الواجهة البحرية",
    description:
      "إقامة راقية في ينبع بإطلالة بحرية هادئة، مثالية للإيجار السنوي الفاخر مع مساحات معيشة رحبة.",
    price: 280_000,
    status: PropertyStatus.Rent,
    area: 710,
    rooms: 5,
    bathrooms: 5,
    city: "ينبع",
    address: "الواجهة البحرية، ينبع",
    lat: 24.0231,
    lng: 38.19,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "مجمع سكني راقٍ بفناء داخلي",
    description:
      "وحدة سكنية ضمن مجمع راقٍ في مكة المكرمة، تتميز بفناء داخلي هادئ وتفاصيل معمارية مستوحاة من الطابع المحلي الأصيل.",
    price: 4_000_000,
    status: PropertyStatus.Sale,
    area: 480,
    rooms: 4,
    bathrooms: 4,
    city: "مكة المكرمة",
    address: "مكة المكرمة",
    lat: 21.4225,
    lng: 39.8262,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

async function main() {
  const existing = await prisma.property.count();
  if (existing > 0) {
    console.log(`Skip seed: ${existing} properties already exist.`);
    return;
  }

  await prisma.property.createMany({ data: [...SEED] });
  console.log(`Seeded ${SEED.length} properties.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
