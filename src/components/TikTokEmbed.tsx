"use client";

type TikTokEmbedProps = {
  videoId: string;
  title: string;
};

/**
 * Lightweight TikTok iframe embed — loaded only on the client via next/dynamic.
 */
export default function TikTokEmbed({ videoId, title }: TikTokEmbedProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-black shadow-[0_14px_36px_-22px_rgba(0,0,0,0.28)]">
      <div className="relative aspect-[9/16] w-full max-h-[34rem]">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
