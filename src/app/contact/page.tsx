import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import DynamicMap from "@/components/DynamicMap";
import FadeIn from "@/components/FadeIn";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { BRAND } from "@/lib/brand";
import { getAdminWhatsApp, SITE } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق الحجاز للخدمات العقارية — نموذج طلب يُوجَّه تلقائياً إلى واتساب الإدارة.",
};

export default function ContactPage() {
  const adminWhatsApp = getAdminWhatsApp();

  return (
    <section className="bg-surface">
      <div className="page-shell section-y">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
          <p className="eyebrow">نحن هنا</p>
          <h1 className="heading-page mt-3">تواصل معنا</h1>
          <p className="body-lead mt-5">
            اتركوا بياناتكم واهتمامكم — يُعاد توجيه الطلب فوراً إلى واتساب الإدارة
            برسالة عربية منسّقة.
          </p>
        </FadeIn>

        <FadeIn className="mt-10 overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[0_10px_32px_-18px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[16/10] min-h-[160px] sm:aspect-[21/9] sm:min-h-[180px]">
            <Image
              src={BRAND.businessCards}
              alt={BRAND.alt.businessCards}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              aria-hidden
            />
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <FadeIn className="lg:col-span-7">
            <div className="surface-card p-6 sm:p-9 lg:p-10">
              <h2 className="heading-card">نموذج طلب تواصل</h2>
              <p className="body-copy mt-3">
                جميع الحقول مطلوبة. بعد الإرسال تُفتح محادثة واتساب الإدارة
                تلقائياً.
              </p>
              <div className="mt-8">
                <LeadCaptureForm adminWhatsApp={adminWhatsApp} />
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-8 lg:col-span-5">
            <FadeIn delay={0.06}>
              <div className="rounded-2xl border border-white/10 bg-black p-6 text-white sm:p-8">
                <h2 className="text-lg font-bold tracking-tight text-gold-soft">
                  بيانات التواصل
                </h2>
                <ul className="mt-7 space-y-5 text-sm">
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[0.75rem] text-white/40">العنوان</p>
                      <p className="mt-1 leading-7 text-white/80">
                        {SITE.address}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Phone className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[0.75rem] text-white/40">الهاتف</p>
                      <a
                        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                        className="mt-1 inline-block text-white/80 transition-colors duration-300 hover:text-gold-soft"
                        dir="ltr"
                      >
                        {SITE.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Mail className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[0.75rem] text-white/40">البريد</p>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="mt-1 inline-block text-white/80 transition-colors duration-300 hover:text-gold-soft"
                        dir="ltr"
                      >
                        {SITE.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <Link
                  href={`https://wa.me/${adminWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-8 w-full"
                >
                  واتساب مباشر
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h2 className="heading-card mb-4">موقعنا</h2>
                <DynamicMap
                  lat={SITE.lat}
                  lng={SITE.lng}
                  title={SITE.nameAr}
                  height={300}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
