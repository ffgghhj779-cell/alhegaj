import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { SITE } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على رؤية الحجاز العقارية ورسالتنا في تقديم تجارب عقارية فاخرة في المملكة.",
};

const VALUES = [
  {
    title: "الأناقة الخالدة",
    body: "نختار العقارات بمعايير تصميمية تتجاوز الموضة العابرة إلى قيمة جمالية تدوم.",
  },
  {
    title: "الثقة المطلقة",
    body: "شفافية كاملة في التفاصيل، والعقود، والموقع — بلا مفاجآت بعد التوقيع.",
  },
  {
    title: "الخدمة الشخصية",
    body: "رحلة مخصصة لكل عميل، من الاستشارة الأولى حتى تسليم المفتاح.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate min-h-[52vh] overflow-hidden sm:min-h-[58vh]">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80"
          alt="واجهة معمارية فاخرة تعكس هوية الحجاز العقارية"
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
          <p className="eyebrow text-gold-soft">قصتنا</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            من نحن
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.9] text-white/80 sm:text-lg">
            {SITE.nameAr} — حيث تلتقي الفخامة العقارية برؤية سعودية أصيلة.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell section-y">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="eyebrow">رؤيتنا</p>
              <h2 className="heading-section mt-3">
                إعادة تعريف تجربة امتلاك العقار الفاخر
              </h2>
              <p className="body-lead mt-5">
                نؤمن بأن العقار ليس مجرد مساحة، بل أسلوب حياة. لذلك ننتقي
                المشاريع بعناية فائقة، ونقدّم تجربة استشارية راقية تحترم وقتكم
                وذوقكم وطموحكم.
              </p>
              <p className="body-copy mt-4">
                انطلقت {SITE.nameAr} من الرياض لخدمة العملاء الباحثين عن تميّز
                حقيقي في المواقع، والتشطيبات، والاستثمار طويل الأمد داخل المملكة.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70 shadow-[0_16px_48px_-24px_rgba(0,0,0,0.16)] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                  alt="تفاصيل معمارية راقية لمنزل معاصر"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="page-shell section-y">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
            <h2 className="heading-section">قيمنا</h2>
            <p className="body-lead mt-4">
              ثلاثة مبادئ تقود كل قرار نتخذه في اختيار العقارات وخدمة عملائنا.
            </p>
          </FadeIn>

          <StaggerGrid className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {VALUES.map((item) => (
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

      <section className="bg-black">
        <div className="page-shell section-y-tight text-center">
          <FadeIn>
            <p className="text-gold-soft">{SITE.tagline}</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              هل تبحثون عن عقار يليق بذوقكم؟
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/properties" className="btn-gold">
                استكشف العقارات
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
