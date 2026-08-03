"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";

/**
 * Original dome architecture (full frame, no wide-crop) —
 * rotates like orbiting under the upper half of a sphere.
 */
export default function HeroLattice() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#030303]"
      aria-hidden
      style={{ perspective: "1800px", perspectiveOrigin: "50% 62%" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative aspect-square h-[132%] w-auto will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
          initial={false}
          animate={
            reduceMotion
              ? { rotateY: 0, rotateX: 12 }
              : {
                  rotateY: [-18, 18, -18],
                  rotateX: [10, 13, 10],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 40,
                  ease: [0.42, 0, 0.58, 1],
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
            quality={97}
            sizes="(max-width: 768px) 150vh, 135vh"
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 40%, rgba(183,163,90,0.11), transparent 68%)",
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            x: ["-5%", "5%", "-5%"],
          }}
          transition={{
            duration: 40,
            ease: [0.42, 0, 0.58, 1],
            repeat: Infinity,
          }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_0%,transparent_38%,rgba(0,0,0,0.3)_75%,rgba(0,0,0,0.62)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
    </div>
  );
}
