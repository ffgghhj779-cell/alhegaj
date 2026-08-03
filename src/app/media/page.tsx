import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import MediaHighlights from "@/components/MediaHighlights";
import { BRAND } from "@/lib/brand";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "الوسائط",
  description:
    "معرض الهوية والمشاريع لمكتب الحجاز للخدمات العقارية — لقطات معمارية ومواد بصرية.",
};

const GALLERY = [
  {
    src: BRAND.facade,
    alt: BRAND.alt.facade,
    tall: true,
  },
  {
    src: BRAND.stationery,
    alt: BRAND.alt.stationery,
    tall: false,
  },
  {
    src: BRAND.businessCards,
    alt: BRAND.alt.businessCards,
    tall: false,
  },
  {
    src: BRAND.hardhat,
    alt: BRAND.alt.hardhat,
    tall: true,
  },
  ...PROJECTS.slice(0, 4).map((project, index) => ({
    src: project.image,
    alt: `${project.title} — ${project.city}`,
    tall: index % 2 === 0,
  })),
] as const;

function resolveHighlights() {
  const ids = (process.env.NEXT_PUBLIC_TIKTOK_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return PROJECTS.slice(0, 3).map((project, index) => ({
    id: project.id,
    title: project.title,
    image: project.image,
    href: `/projects/${project.id}`,
    tiktokId: ids[index],
  }));
}

export default function MediaPage() {
  const highlights = resolveHighlights();
  const hasTikTok = highlights.some((item) => item.tiktokId);

  return (
    <section className="bg-surface">
      <div className="page-shell section-y">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
          <p className="eyebrow">المعرض</p>
          <h1 className="heading-page mt-3">الوسائط</h1>
          <p className="body-lead mt-5">
            هوية المكتب ولقطات من مشاريع سعودية نعمل عليها — صورة تعكس جودة العرض.
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {GALLERY.map((item) => (
            <FadeIn key={`${item.src}-${item.alt}`}>
              <figure className="group relative overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[0_10px_32px_-18px_rgba(0,0,0,0.45)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-20px_rgba(0,0,0,0.55)]">
                <div
                  className={`relative w-full ${item.tall ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="border-t border-border/70 px-5 py-4 text-[0.8125rem] leading-7 text-muted">
                  {item.alt}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-24 lg:mt-28">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">مختارات بصرية</p>
            <h2 className="heading-section mt-3">
              {hasTikTok ? "فيديو من مشاريعنا" : "أحدث المشاريع في صور"}
            </h2>
            <p className="body-copy mt-4">
              {hasTikTok
                ? "مقاطع تفاعلية من حسابنا، إلى جانب روابط تفاصيل كل مشروع."
                : "لقطات من محفظة المشاريع — اضغطوا للانتقال إلى صفحة التفاصيل الكاملة."}
            </p>
          </div>
          <MediaHighlights items={highlights} />
          <div className="mt-10 text-center">
            <Link href="/projects" className="btn-gold min-h-11">
              تصفّح كل المشاريع
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
