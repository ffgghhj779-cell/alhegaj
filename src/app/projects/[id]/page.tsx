import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, CalendarDays, Layers, MapPin, Timer } from "lucide-react";
import DynamicMap from "@/components/DynamicMap";
import FadeIn from "@/components/FadeIn";
import PropertyGallery from "@/components/PropertyGallery";
import { SITE } from "@/lib/navigation";
import { getProjectById, PROJECTS } from "@/lib/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "مشروع غير موجود" };
  return {
    title: project.title,
    description: project.summary,
  };
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Layers;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/80 bg-black/25 px-4 py-3.5">
      <p className="inline-flex items-center gap-2 text-[0.72rem] text-muted">
        <Icon className="size-3.5 text-gold" strokeWidth={1.6} aria-hidden />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const contactHref = `/contact?interest=${encodeURIComponent("استشارة")}&source=project&ref=${encodeURIComponent(project.id)}&message=${encodeURIComponent(`أرغب بالاستفسار عن مشروع: ${project.title} (${project.city})`)}`;

  return (
    <section className="bg-surface pb-[5.5rem] lg:pb-0">
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
                  href="/projects"
                  className="transition-colors hover:text-gold"
                >
                  مشاريعنا
                </Link>
              </li>
              <li className="text-border" aria-hidden>
                /
              </li>
              <li className="font-medium text-foreground">{project.title}</li>
            </ol>
          </nav>

          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="rounded bg-gold px-2.5 py-1 text-[0.7rem] font-semibold text-black">
              {project.status}
            </span>
            <span className="rounded bg-black/50 px-2.5 py-1 text-[0.7rem] font-semibold text-gold-soft">
              {project.year}
            </span>
          </div>

          <h1 className="heading-page">{project.title}</h1>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted sm:text-base">
            <MapPin className="size-4 text-gold" aria-hidden />
            {project.city} — {project.district}
          </p>
          <p className="body-lead mt-5 max-w-3xl">{project.summary}</p>
        </FadeIn>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">
          <div className="space-y-12">
            <FadeIn>
              <PropertyGallery images={project.gallery} />
            </FadeIn>

            <FadeIn delay={0.06}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat
                  icon={Layers}
                  label="الوحدات"
                  value={project.units.toLocaleString("ar-SA")}
                />
                <Stat
                  icon={Building2}
                  label="مساحة البناء"
                  value={`${project.builtUpArea.toLocaleString("ar-SA")} م²`}
                />
                <Stat
                  icon={Timer}
                  label="دورة التسويق"
                  value={`${project.marketingDays.toLocaleString("ar-SA")} يوماً`}
                />
                <Stat
                  icon={CalendarDays}
                  label="سنة المشروع"
                  value={project.year.toLocaleString("ar-SA")}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <article className="surface-card p-6 sm:p-8 lg:p-10">
                <h2 className="heading-card">نبذة عن المشروع</h2>
                <p className="body-copy mt-5 whitespace-pre-line text-[1.02rem]">
                  {project.description}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <article className="surface-card p-6 sm:p-8">
                <h2 className="heading-card">أبرز النتائج</h2>
                <ul className="mt-5 space-y-3">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-7 text-foreground/90"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>

            <FadeIn delay={0.12}>
              <article className="surface-card p-6 sm:p-8">
                <h2 className="heading-card">المواصفات والمرافق</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.amenities.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border/70 px-4 py-3 text-sm text-foreground/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div>
                <h2 className="heading-card mb-5">موقع المشروع</h2>
                <DynamicMap
                  lat={project.lat}
                  lng={project.lng}
                  title={project.title}
                  address={`${project.city} — ${project.district}`}
                  height={360}
                  interactive
                  showDirections
                />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.05}>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="surface-card p-6 sm:p-7">
                <p className="text-[0.75rem] font-medium tracking-wide text-gold-mid">
                  دور المكتب
                </p>
                <p className="mt-2 text-base font-semibold leading-8 text-foreground">
                  {project.role}
                </p>
                <dl className="mt-6 space-y-3.5 border-t border-border/80 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">نوع العميل</dt>
                    <dd className="text-end font-medium">{project.clientType}</dd>
                  </div>
                  {project.landArea ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">مساحة الأرض</dt>
                      <dd className="font-medium">
                        {project.landArea.toLocaleString("ar-SA")} م²
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">المدينة</dt>
                    <dd className="font-medium">{project.city}</dd>
                  </div>
                </dl>

                <Link href={contactHref} className="btn-gold mt-7 w-full min-h-11">
                  طلب من الموقع
                </Link>
                <p className="mt-4 text-center text-xs leading-6 text-muted">
                  {SITE.nameShortAr} — يُرسل الطلب إلى لوحة الإدارة داخل المنصة.
                </p>
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-black/95 p-3 backdrop-blur-md lg:hidden safe-bottom">
        <div className="mx-auto flex max-w-lg">
          <Link href={contactHref} className="btn-gold min-h-11 flex-1 text-sm">
            طلب من الموقع
          </Link>
        </div>
      </div>
    </section>
  );
}
