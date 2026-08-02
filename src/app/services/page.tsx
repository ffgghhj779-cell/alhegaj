import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  ClipboardCheck,
  KeyRound,
  LineChart,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "خدمات عقارية متكاملة من الاستشارة والتسويق حتى التسليم وإدارة الاستثمار.",
};

const SERVICES = [
  {
    icon: MessagesSquare,
    title: "استشارات عقارية خاصة",
    body: "جلسة تقييم لاحتياجاتكم وميزانيتكم وأسلوب حياتكم، مع توصيات دقيقة لمواقع ومشاريع مناسبة.",
  },
  {
    icon: Building2,
    title: "عرض وبيع العقارات الفاخرة",
    body: "تسويق راقٍ للعقارات المختارة، بعرض بصري احترافي ومطابقة سرية مع العملاء المناسبين.",
  },
  {
    icon: KeyRound,
    title: "خدمات الإيجار الفاخر",
    body: "إدارة عقود الإيجار السنوي للوحدات الراقية بمعايير خصوصية وجودة عالية.",
  },
  {
    icon: ClipboardCheck,
    title: "تقييم ومعاينة",
    body: "معاينة ميدانية وتقرير واضح عن حالة العقار، الموقع، والقيمة السوقية المتوقعة.",
  },
  {
    icon: LineChart,
    title: "استشارات استثمارية",
    body: "تحليل العائد والمخاطر للفرص الاستثمارية في أبرز الوجهات السكنية والتجارية.",
  },
  {
    icon: Sparkles,
    title: "تجربة تسليم متكاملة",
    body: "مرافقة كاملة حتى استلام المفتاح، مع تنسيق الإجراءات والتفاصيل النهائية.",
  },
] as const;

const STEPS = [
  { step: "٠١", title: "استشارة", body: "نستمع لرؤيتكم ونحدد المعايير بدقة." },
  { step: "٠٢", title: "انتقاء", body: "نرشّح عقارات مطابقة لذوقكم وميزانيتكم." },
  { step: "٠٣", title: "معاينة", body: "زيارات خاصة بترتيب مرن وسري." },
  { step: "٠٤", title: "إتمام", body: "دعم كامل حتى إغلاق الصفقة والتسليم." },
] as const;

export default function ServicesPage() {
  return (
    <section className="bg-surface">
      <div className="page-shell section-y">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
          <p className="eyebrow">ما نقدّمه</p>
          <h1 className="heading-page mt-3">خدماتنا</h1>
          <p className="body-lead mt-5">
            منظومة خدمات متكاملة تغطي رحلتكم العقارية من الفكرة الأولى إلى
            التسليم — بروح فاخرة واحترافية هادئة.
          </p>
        </FadeIn>

        <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <article className="surface-card flex h-full flex-col p-6 sm:p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h2 className="heading-card mt-5">{service.title}</h2>
                  <p className="body-copy mt-3 flex-1">{service.body}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        <FadeIn className="mt-20 lg:mt-24">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">آلية العمل</p>
            <h2 className="heading-section mt-3">أربع خطوات واضحة</h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((item) => (
              <li key={item.step} className="text-center sm:text-start">
                <p className="text-sm font-semibold tracking-[0.18em] text-gold">
                  {item.step}
                </p>
                <h3 className="mt-3 text-lg font-bold text-black">{item.title}</h3>
                <p className="body-copy mt-2">{item.body}</p>
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn className="mt-20 rounded-2xl bg-black px-6 py-12 text-center sm:px-10 sm:py-14 lg:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            ابدأوا رحلتكم معنا اليوم
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            فريقنا جاهز لترتيب استشارة خاصة تناسب جدولكم وتطلعاتكم.
          </p>
          <Link href="/contact" className="btn-gold mt-8">
            احجز استشارة
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
