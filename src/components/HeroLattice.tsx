"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";

/**
 * Architectural building hero — full structure visible (16:9 asset),
 * smooth left ↔ right scroll loop like a cinematic pan.
 */
export default function HeroLattice() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]" aria-hidden>
      <motion.div
        className="absolute inset-y-0 left-0 h-full w-[112%] will-change-transform"
        initial={false}
        animate={
          reduceMotion
            ? { x: "-5%" }
            : {
                x: ["0%", "-10.7%", "0%"],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 34,
                ease: [0.37, 0, 0.63, 1],
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        <Image
          src={BRAND.heroLattice}
          alt=""
          fill
          priority
          quality={96}
          sizes="120vw"
          className="object-cover object-center"
        />
      </motion.div>

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 25%, rgba(183,163,90,0.07) 50%, transparent 75%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
          transition={{
            duration: 34,
            ease: [0.37, 0, 0.63, 1],
            repeat: Infinity,
          }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.45)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
    </div>
  );
}
