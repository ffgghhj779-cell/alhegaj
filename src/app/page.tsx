import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import HeroLattice from "@/components/HeroLattice";
import PropertyCard from "@/components/PropertyCard";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { BRAND } from "@/lib/brand";
import {
  MISSION,
  PARTNERS,
  TESTIMONIALS,
  VALUES,
  VISION_2030,
} from "@/lib/content";
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
        <HeroLattice />

        <div className="page-shell relative z-10 flex min-h-[calc(100svh-4.25rem)] flex-col justify-end pb-20 pt-28 sm:min-h-[calc(100svh-4.75rem)] sm:pb-24 lg:pb-28">
          <p className="animate-fade-up font-latin text-[0.7rem] font-medium tracking-[0.32em] text-gold-soft uppercase sm:text-[0.78rem]">
            {SITE.nameEn}
          </p>

          <h1 className="animate-fade-up-delay mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.12]">
            {SITE.nameShortAr}
            <span className="mt-2 block text-2xl font-bold text-gold-soft sm:text-3xl lg:text-4xl">
              {SITE.nameShortService}
            </span>
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-xl font-display text-base leading-[1.9] text-white/80 sm:text-lg">
            {SITE.tagline}
          </p>

          <div className="animate-fade-up-delay-2 mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link href="/properties" className="btn-gold">
              استكشف العقارات
            </Link>
            <Link href="/contact" className="btn-outline-light">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="page-shell section-y">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
            <h2 className="heading-section">{SITE.tagline}</h2>
            <p className="body-lead mt-5">{MISSION}</p>
          </FadeIn>

          <StaggerGrid className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-10 lg:mt-20 lg:gap-14">
            {VALUES.slice(0, 3).map((item) => (
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

      <section className="relative isolate overflow-hidden bg-black">
        <Image
          src={BRAND.stationery}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/70"
          aria-hidden
        />
        <div className="page-shell relative z-10 section-y-tight">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium tracking-wide text-gold">
              رؤية المملكة 2030
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {VISION_2030.title}
            </h2>
            <p className="mt-5 text-base leading-[1.9] text-white/70 sm:text-lg">
              {VISION_2030.body}
            </p>
            <Link href="/about" className="btn-gold mt-8">
              اقرأ المزيد عنا
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-background">
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

      <section className="bg-surface">
        <div className="page-shell section-y">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">شركاؤنا</p>
            <h2 className="heading-section mt-3">شراكات تعزّز الثقة</h2>
          </FadeIn>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {PARTNERS.map((name) => (
              <li
                key={name}
                className="text-sm font-semibold tracking-wide text-muted-strong/80 sm:text-base"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background">
        <div className="page-shell section-y">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
            <h2 className="heading-section">ماذا يقول عملاؤنا</h2>
          </FadeIn>
          <StaggerGrid className="mt-14 grid gap-8 md:grid-cols-3 lg:gap-10">
            {TESTIMONIALS.map((item) => (
              <StaggerItem key={item.name}>
                <blockquote className="h-full border-s-2 border-gold/60 ps-5">
                  <p className="body-copy text-foreground/85">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm font-semibold text-gold-mid">
                    {item.name}
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-black">
        <div className="page-shell section-y-tight text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              ابدأوا رحلتكم العقارية معنا
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              استشارة أولية، وخيارات واضحة، ومتابعة حتى إتمام الصفقة.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/projects" className="btn-gold">
                مشاريعنا
              </Link>
              <Link href="/contact" className="btn-outline-light">
                تواصل معنا
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
