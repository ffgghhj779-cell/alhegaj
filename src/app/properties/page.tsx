import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PropertiesCatalog from "@/components/PropertiesCatalog";
import { prisma } from "@/lib/prisma";
import { SAMPLE_PROPERTIES } from "@/lib/properties";
import { toCardProperty } from "@/lib/property-utils";

export const metadata: Metadata = {
  title: "العقارات",
  description:
    "تصفح مجموعة منتقاة من العقارات الفاخرة في المملكة العربية السعودية — بيع وإيجار.",
};

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const dbProperties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  const cards =
    dbProperties.length > 0
      ? dbProperties.map(toCardProperty)
      : SAMPLE_PROPERTIES.map((p) => ({
          ...p,
          href: `/properties/${p.id}`,
        }));

  return (
    <section className="bg-surface">
      <div className="page-shell section-y">
        <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">محفظتنا العقارية</p>
            <h1 className="heading-page mt-3">العقارات</h1>
            <p className="body-lead mt-5">
              مجموعة منتقاة من العقارات الفاخرة — تصاميم معمارية راقية ومواقع
              استثنائية في أنحاء المملكة.
            </p>
          </div>
          <Link href="/admin/add-property" className="btn-dark shrink-0 px-5">
            إضافة عقار
          </Link>
        </FadeIn>

        <div className="mt-12 sm:mt-14">
          <PropertiesCatalog properties={cards} />
        </div>
      </div>
    </section>
  );
}
