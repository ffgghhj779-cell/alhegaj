"use client";

import Image from "next/image";
import { Play } from "lucide-react";
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
  /** Real TikTok video id — when absent, show elegant static highlight */
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
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-black shadow-[0_14px_36px_-22px_rgba(0,0,0,0.28)]"
          >
            <div className="relative aspect-[9/16] max-h-[34rem]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/40 bg-black/40 text-gold backdrop-blur-sm">
                  <Play className="size-6 fill-gold" aria-hidden />
                </span>
                <p className="px-4 text-center text-sm font-medium text-white/90">
                  {item.title}
                </p>
              </div>
            </div>
          </article>
        ),
      )}
    </div>
  );
}
