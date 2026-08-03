"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type VisionBandProps = {
  imageSrc: string;
  children: ReactNode;
};

/** Vision 2030 band — light parallax on desktop only */
export default function VisionBand({ imageSrc, children }: VisionBandProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [allowParallax, setAllowParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setAllowParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion || !allowParallax ? ["0%", "0%"] : ["-7%", "7%"],
  );

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-black section-grain"
    >
      <motion.div className="absolute inset-[-12%] will-change-transform" style={{ y }}>
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          aria-hidden
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/70"
        aria-hidden
      />
      <div className="page-shell relative z-10 section-y-tight">{children}</div>
    </section>
  );
}
