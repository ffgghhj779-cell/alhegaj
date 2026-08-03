import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "مشاريعنا",
  description:
    "نماذج من مشاريع مكتب الحجاز للخدمات العقارية — تسويق وإدارة وبيع بأعلى معايير الاحتراف.",
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
            نماذج مختارة تعكس أسلوبنا في التسويق والإدارة وإتمام الصفقات.
          </p>
        </FadeIn>

        <StaggerGrid className="mt-14 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_8px_28px_-16px_rgba(0,0,0,0.1)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_20px_48px_-20px_rgba(0,0,0,0.14)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                  <p className="text-[0.75rem] font-medium tracking-wide text-gold-mid">
                    {project.city}
                  </p>
                  <h2 className="heading-card text-lg">{project.title}</h2>
                  <p className="body-copy mt-1 flex-1">{project.summary}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex text-sm font-semibold text-gold transition-colors hover:text-gold-mid"
                  >
                    استفسر عن مشروع مشابه
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
