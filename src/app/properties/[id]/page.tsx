import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DynamicMap from "@/components/DynamicMap";
import FadeIn from "@/components/FadeIn";
import PropertyGallery from "@/components/PropertyGallery";
import PropertySidebar from "@/components/PropertySidebar";
import { prisma } from "@/lib/prisma";
import { galleryImages, statusLabel } from "@/lib/property-utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) {
    return { title: "عقار غير موجود" };
  }

  return {
    title: property.title,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) notFound();

  const images = galleryImages(property.imageUrl, property.title);

  return (
    <section className="bg-surface">
      <div className="page-shell section-y-tight">
        <FadeIn>
          <nav aria-label="مسار التنقل" className="mb-8 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2.5">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  الرئيسية
                </Link>
              </li>
              <li className="text-border" aria-hidden>
                /
              </li>
              <li>
                <Link
                  href="/properties"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  العقارات
                </Link>
              </li>
              <li className="text-border" aria-hidden>
                /
              </li>
              <li className="font-medium text-black">{property.title}</li>
            </ol>
          </nav>

          <div className="mb-10">
            <p className="eyebrow">{statusLabel(property.status)}</p>
            <h1 className="heading-page mt-3">{property.title}</h1>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">
          <div className="space-y-12">
            <FadeIn>
              <PropertyGallery images={images} />
            </FadeIn>

            <FadeIn delay={0.08}>
              <article className="surface-card p-6 sm:p-8 lg:p-10">
                <h2 className="heading-card">عن العقار</h2>
                <p className="body-copy mt-5 whitespace-pre-line text-[1.02rem]">
                  {property.description}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div>
                <h2 className="heading-card mb-5">الموقع على الخريطة</h2>
                <DynamicMap
                  lat={property.lat}
                  lng={property.lng}
                  title={property.title}
                  height={400}
                />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.05}>
            <PropertySidebar property={property} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
