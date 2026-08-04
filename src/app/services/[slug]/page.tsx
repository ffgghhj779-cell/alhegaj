import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  ClipboardSignature,
  FileSearch,
  Handshake,
  Home,
  KeyRound,
  LineChart,
  Megaphone,
  Search,
  Share2,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { BRAND } from "@/lib/brand";
import { getServiceBySlug, SERVICES } from "@/lib/services";

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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "خدمة غير موجودة" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const index = SERVICES.findIndex((s) => s.slug === slug);
  const Icon = ICONS[index] ?? Home;

  return (
    <section className="bg-surface">
      <div className="page-shell section-y-tight">
        <FadeIn>
          <nav aria-label="مسار التنقل" className="mb-8 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2.5">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  الرئيسية
                </Link>
              </li>
              <li className="text-border" aria-hidden>
                /
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-gold"
                >
                  خدماتنا
                </Link>
              </li>
              <li className="text-border" aria-hidden>
                /
              </li>
              <li className="font-medium text-foreground">{service.title}</li>
            </ol>
          </nav>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start lg:gap-12">
          <div className="space-y-8">
            <FadeIn>
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon className="size-5" strokeWidth={1.6} aria-hidden />
              </div>
              <p className="eyebrow mt-6">خدمة متخصصة</p>
              <h1 className="heading-page mt-3">{service.title}</h1>
              <p className="body-lead mt-5">{service.summary}</p>
              <p className="body-copy mt-4">{service.body}</p>

              <a href="#service-request" className="btn-gold mt-8 inline-flex min-h-11">
                اطلب من الموقع
              </a>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)]">
                <Image
                  src={BRAND.stationery}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.05} className="lg:sticky lg:top-28">
            <div id="service-request">
              <ServiceRequestForm service={service} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
