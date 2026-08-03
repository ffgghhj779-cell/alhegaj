import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "مشاريعنا",
  description:
    "محفظة مشاريع عقارية سعودية لمكتب الحجاز — تسويق وبيع وإدارة تأجير في الرياض وجدة والشرقية.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-surface">
      <div className="page-shell section-y">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
          <p className="eyebrow">محفظة الأعمال</p>
          <h1 className="heading-page mt-3">مشاريعنا</h1>
          <p className="body-lead mt-5">
            نماذج تشغيلية من السوق السعودي — تسويق، بيع، وتأجير بمعايير عرض واضحة
            وتجربة عميل مكتملة.
          </p>
        </FadeIn>

        <StaggerGrid className="mt-14 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[0_8px_28px_-16px_rgba(0,0,0,0.45)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_48px_-20px_rgba(0,0,0,0.55)]">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute start-4 top-4 rounded bg-black/85 px-2.5 py-1 text-[0.7rem] font-semibold text-gold-soft">
                      {project.status}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                    <p className="text-[0.75rem] font-medium tracking-wide text-gold-mid">
                      {project.city} — {project.district}
                    </p>
                    <h2 className="heading-card text-lg">{project.title}</h2>
                    <p className="body-copy mt-1 flex-1">{project.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-4 text-[0.75rem] text-muted">
                      <span>{project.year}</span>
                      <span className="font-semibold text-gold">
                        تفاصيل المشروع
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
