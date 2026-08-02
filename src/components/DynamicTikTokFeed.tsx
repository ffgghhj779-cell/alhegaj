"use client";

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

export type TikTokItem = {
  videoId: string;
  title: string;
};

export default function DynamicTikTokFeed({ items }: { items: TikTokItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item) => (
        <TikTokEmbed
          key={item.videoId}
          videoId={item.videoId}
          title={item.title}
        />
      ))}
    </div>
  );
}
