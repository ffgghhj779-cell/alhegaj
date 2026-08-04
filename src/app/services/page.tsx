import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ClipboardSignature,
  FileSearch,
  Handshake,
  Home,
  KeyRound,
  LineChart,
  Megaphone,
  MessageCircle,
  Search,
  Share2,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/navigation";
import { SERVICES, SERVICES_INTRO } from "@/lib/services";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "خدمات مكتب الحجاز للخدمات العقارية: بيع وشراء، تسويق، إدارة أملاك، إيجار، توثيق إيجار، واستشارات استثمارية.",
};

const ICONS = [
  Home,
  Megaphone,
  Building2,
  KeyRound,
  ClipboardSignature,
  Handshake,
  LineChart,
  Share2,
  FileSearch,
  Search,
] as const;

export default function ServicesPage() {
  return (
    <section className="bg-surface">
      <div className="page-shell section-y">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="mx-auto mb-6 h-px w-14 bg-gold lg:mx-0" aria-hidden />
            <p className="eyebrow">مكتب الحجاز للخدمات العقارية</p>
            <h1 className="heading-page mt-3">خدماتنا</h1>
            <p className="body-lead mt-5">{SERVICES_INTRO}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl bg-[var(--surface-elevated)] shadow-[0_14px_40px_-18px_rgba(0,0,0,0.5)] lg:mx-0 lg:max-w-none">
              <Image
                src={BRAND.hardhat}
                alt={BRAND.alt.hardhat}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </FadeIn>
        </div>

        <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[index] ?? Home;
            const waUrl = buildWhatsAppUrl(
              `السلام عليكم، أرغب بطلب خدمة: ${service.title}`,
            );
            return (
              <StaggerItem key={service.slug}>
                <article className="surface-card flex h-full flex-col gap-4 p-6 sm:p-7">
                  <div className="flex gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="heading-card text-lg">{service.title}</h2>
                      <p className="body-copy mt-2">{service.body}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col gap-2 border-t border-border/70 pt-4 sm:flex-row sm:items-center">
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-gold min-h-11 flex-1 text-sm"
                    >
                      اطلب من الموقع
                    </Link>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dark min-h-11 flex-1 text-sm"
                    >
                      <MessageCircle className="size-4" aria-hidden />
                      واتساب
                    </a>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        <FadeIn className="mt-20 rounded-2xl bg-black px-6 py-12 text-center sm:px-10 sm:py-14 lg:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            هل تبحثون عن خدمة عقارية محددة؟
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            اختاروا الخدمة المناسبة وعبّئوا الطلب من الموقع، أو تواصلوا مباشرة عبر
            واتساب.
          </p>
          <Link href="/contact" className="btn-gold mt-8">
            تواصل عام
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
