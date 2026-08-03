"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

export default function PropertyGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-[0_10px_32px_-18px_rgba(0,0,0,0.12)]">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover object-center transition-opacity duration-300"
        />
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={`${image.src}-${index}`}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`عرض الصورة ${index + 1}`}
                  aria-pressed={selected}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border transition-[border-color,opacity,transform] duration-300 ease-out ${
                    selected
                      ? "border-gold opacity-100"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
