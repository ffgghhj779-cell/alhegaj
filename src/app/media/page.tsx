import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import MediaHighlights from "@/components/MediaHighlights";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "الوسائط",
  description:
    "معرض الصور والفيديوهات لمشاريع الحجاز للخدمات العقارية — عمارة وهوية بصرية بروح فاخرة.",
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
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "واجهة فيلا فاخرة بإضاءة مسائية دافئة",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    alt: "منزل معاصر بحديقة أمامية منسّقة",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    alt: "تفاصيل معمارية لزجاج وخرسانة مصقولة",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    alt: "فناء داخلي هادئ بتصميم معماري أصيل",
    tall: true,
  },
] as const;

const HIGHLIGHTS = [
  {
    id: "1",
    title: "جولة معمارية — مشروع فاخر",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    title: "تفاصيل التصميم الراقي",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "3",
    title: "إطلالة الموقع والطبيعة",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
] as const;

function resolveHighlights() {
  const ids = (process.env.NEXT_PUBLIC_TIKTOK_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return HIGHLIGHTS.map((item, index) => ({
    ...item,
    tiktokId: ids[index],
  }));
}

export default function MediaPage() {
  const highlights = resolveHighlights();

  return (
    <section className="bg-surface">
      <div className="page-shell section-y">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-14 bg-gold" aria-hidden />
          <p className="eyebrow">المعرض</p>
          <h1 className="heading-page mt-3">الوسائط</h1>
          <p className="body-lead mt-5">
            لقطات معمارية ومشاهد طبيعية من مشاريعنا — فخامة تُروى بالصورة والحركة.
          </p>
        </FadeIn>

        <StaggerGrid className="mt-14 columns-1 gap-5 sm:columns-2 sm:gap-6 lg:mt-16 lg:columns-3 lg:gap-7">
          {GALLERY.map((item) => (
            <StaggerItem
              key={item.src}
              className="mb-5 break-inside-avoid sm:mb-6 lg:mb-7"
            >
              <figure className="group relative overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[0_10px_32px_-18px_rgba(0,0,0,0.45)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-20px_rgba(0,0,0,0.55)]">
                <div
                  className={`relative w-full ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="border-t border-border/70 px-5 py-4 text-[0.8125rem] leading-7 text-muted">
                  {item.alt}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeIn className="mt-24 lg:mt-28">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">مشاهد متحركة</p>
            <h2 className="heading-section mt-3">مختارات بصرية من مشاريعنا</h2>
            <p className="body-copy mt-4">
              لقطات سينمائية بأسلوب رأسي. عند ضبط معرّفات تيك توك عبر البيئة تتحول
              تلقائياً إلى تضمينات تفاعلية.
            </p>
          </div>
          <MediaHighlights items={highlights} />
        </FadeIn>
      </div>
    </section>
  );
}
