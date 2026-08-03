import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { BRAND } from "@/lib/brand";
import {
  GOALS,
  MISSION,
  VALUES,
  VISION,
  VISION_2030,
} from "@/lib/content";
import { SITE } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "رؤية ورسالة وقيم وأهداف مكتب الحجاز للخدمات العقارية — مواكبة مستهدفات رؤية المملكة 2030.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate min-h-[52vh] overflow-hidden sm:min-h-[58vh]">
        <Image
          src={BRAND.facade}
          alt={BRAND.alt.facade}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25"
          aria-hidden
        />
        <div className="page-shell relative z-10 flex min-h-[52vh] flex-col justify-end pb-16 pt-28 sm:min-h-[58vh] sm:pb-20">
          <p className="eyebrow text-gold-soft">{SITE.nameEn}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            من نحن
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.9] text-white/80 sm:text-lg">
            شركة عقارية رائدة تقدّم حلولًا متكاملة ترتكز على الجودة والابتكار
            والموثوقية.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="page-shell section-y grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="eyebrow">الرؤية</p>
            <h2 className="heading-section mt-3">ما نسعى إليه</h2>
            <p className="body-lead mt-5">{VISION}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="eyebrow">الرسالة</p>
            <h2 className="heading-section mt-3">ما نقدّمه كل يوم</h2>
            <p className="body-lead mt-5">{MISSION}</p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface">
        <div className="page-shell section-y grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="eyebrow">هويتنا</p>
            <h2 className="heading-section mt-3">علامة تُعرَف بالثقة</h2>
            <p className="body-lead mt-5">
              هويتنا البصرية تعكس طموحنا المعماري: وضوح، استقرار، وحضور يليق
              بالسوق العقاري السعودي.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-black">
              <Image
                src={BRAND.stationery}
                alt={BRAND.alt.stationery}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-black">
        <div className="page-shell section-y-tight">
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
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface">
        <div className="page-shell section-y">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
            <h2 className="heading-section">قيمنا</h2>
          </FadeIn>
          <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {VALUES.map((item) => (
              <StaggerItem key={item.title}>
                <article className="surface-card h-full p-6 sm:p-7">
                  <div className="mb-4 h-px w-10 bg-gold" aria-hidden />
                  <h3 className="heading-card">{item.title}</h3>
                  <p className="body-copy mt-3">{item.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-background">
        <div className="page-shell section-y grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <Image
                src={BRAND.businessCards}
                alt={BRAND.alt.businessCards}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="eyebrow">الأهداف</p>
            <h2 className="heading-section mt-3">ما نعمل لتحقيقه</h2>
            <ol className="mt-8 space-y-4">
              {GOALS.slice(0, 4).map((goal, index) => (
                <li key={goal} className="flex gap-4">
                  <span className="text-sm font-bold tracking-wide text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="body-copy text-foreground/85">{goal}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>

        <div className="page-shell pb-20 sm:pb-24 lg:pb-28">
          <ol className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {GOALS.slice(4).map((goal, index) => (
              <FadeIn key={goal} delay={index * 0.04}>
                <li className="flex gap-4 rounded-2xl border border-border/70 bg-surface/80 p-5">
                  <span className="text-sm font-bold tracking-wide text-gold">
                    {String(index + 5).padStart(2, "0")}
                  </span>
                  <p className="body-copy text-foreground/85">{goal}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="page-shell section-y-tight text-center">
          <FadeIn>
            <p className="text-gold-soft">{SITE.tagline}</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              تواصلوا معنا لتجربة عقارية استثنائية
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/services" className="btn-gold">
                خدماتنا
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
