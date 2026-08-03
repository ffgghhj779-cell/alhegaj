"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const TikTokEmbed = dynamic(() => import("@/components/TikTokEmbed"), {
  ssr: false,
  loading: () => (
    <div
      className="aspect-[9/16] max-h-[34rem] animate-pulse rounded-2xl border border-border bg-surface"
      aria-hidden
    />
  ),
});

export type MediaHighlight = {
  id: string;
  title: string;
  image: string;
  href?: string;
  /** Real TikTok video id — when absent, show static project highlight */
  tiktokId?: string;
};

export default function MediaHighlights({ items }: { items: MediaHighlight[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item) =>
        item.tiktokId ? (
          <TikTokEmbed
            key={item.id}
            videoId={item.tiktokId}
            title={item.title}
          />
        ) : (
          <Link
            key={item.id}
            href={item.href ?? "/projects"}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-black shadow-[0_14px_36px_-22px_rgba(0,0,0,0.28)] outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          >
            <article>
              <div className="relative aspect-[4/5] max-h-[34rem] sm:aspect-[3/4]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <p className="text-sm font-semibold leading-7 text-white">
                    {item.title}
                  </p>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-black/40 text-gold">
                    <ArrowLeft className="size-4" aria-hidden />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ),
      )}
    </div>
  );
}
