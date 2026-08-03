"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealMediaProps = {
  children: ReactNode;
  className?: string;
};

/** One-shot media reveal via IntersectionObserver (clip-path + opacity) */
export default function RevealMedia({ children, className = "" }: RevealMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-media ${revealed ? "is-revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
