import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PropertyCard from "@/components/PropertyCard";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { SITE } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";
import { SAMPLE_PROPERTIES } from "@/lib/properties";
import { toCardProperty } from "@/lib/property-utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dbFeatured = await prisma.property.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const featured =
    dbFeatured.length > 0
      ? dbFeatured.map(toCardProperty)
      : SAMPLE_PROPERTIES.slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden sm:min-h-[calc(100svh-4.75rem)]">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80"
          alt="واجهة معمارية فاخرة لمبنى سكني حديث"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"
          aria-hidden
        />
        <div
          className="hero-glow pointer-events-none absolute -start-24 top-1/4 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <div
          className="hero-glow pointer-events-none absolute -end-16 bottom-1/4 h-64 w-64 rounded-full bg-gold-soft/15 blur-3xl"
          aria-hidden
        />

        <div className="page-shell relative z-10 flex min-h-[calc(100svh-4.25rem)] flex-col justify-end pb-20 pt-28 sm:min-h-[calc(100svh-4.75rem)] sm:pb-24 lg:pb-28">
          <p className="animate-fade-up text-[0.8125rem] font-medium tracking-[0.28em] text-gold-soft uppercase">
            {SITE.nameEn}
          </p>

          <h1 className="animate-fade-up-delay mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.12]">
            أهلاً بكم في{" "}
            <span className="text-gold-soft">{SITE.nameAr}</span>
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-base leading-[1.9] text-white/80 sm:text-lg">
            نعيد تعريف الفخامة العقارية في المملكة — بتصاميم راقية، مواقع
            استثنائية، وتجربة تليق بطموحكم.
          </p>

          <div className="animate-fade-up-delay-2 mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link href="/properties" className="btn-gold">
              استكشف العقارات
            </Link>
            <Link href="/about" className="btn-outline-light">
              تعرف علينا
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="page-shell section-y">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
            <h2 className="heading-section">{SITE.tagline}</h2>
            <p className="body-lead mt-5">
              من الاختيار الأول حتى تسليم المفتاح، نقدّم رحلة عقارية متكاملة
              بمعايير الرفاهية والثقة.
            </p>
          </FadeIn>

          <StaggerGrid className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-10 lg:mt-20 lg:gap-14">
            {[
              {
                title: "مواقع استثنائية",
                body: "عقارات منتقاة في أبرز الوجهات السكنية والتجارية.",
              },
              {
                title: "تصميم فاخر",
                body: "تفاصيل معمارية راقية تعكس ذوقاً رفيعاً وأناقة خالدة.",
              },
              {
                title: "خدمة شخصية",
                body: "فريق متخصص يرافقكم بسرية واحترافية في كل خطوة.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <article className="text-center sm:text-start">
                  <div
                    className="mx-auto mb-5 h-px w-10 bg-gold sm:mx-0"
                    aria-hidden
                  />
                  <h3 className="heading-card">{item.title}</h3>
                  <p className="body-copy mt-3">{item.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell section-y">
          <FadeIn className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">مختاراتنا</p>
              <h2 className="heading-section mt-3">عقارات تليق بذوقكم</h2>
            </div>
            <Link
              href="/properties"
              className="text-sm font-semibold text-gold transition-colors duration-300 hover:text-gold-mid"
            >
              عرض الكل
            </Link>
          </FadeIn>

          <StaggerGrid className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-10">
            {featured.map((property, index) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} priority={index === 0} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
