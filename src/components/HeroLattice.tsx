"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";

/**
 * Full-bleed architectural lattice hero — Ken Burns drift + soft light sweep.
 * Uses the exact brand plate background at highest available resolution.
 */
export default function HeroLattice() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
      <motion.div
        className="absolute inset-[-8%] size-[116%]"
        initial={reduceMotion ? false : { scale: 1.06, x: "1.5%", y: "-1%" }}
        animate={
          reduceMotion
            ? { scale: 1.04, x: 0, y: 0 }
            : {
                scale: [1.06, 1.14, 1.08],
                x: ["1.5%", "-1.2%", "0.8%"],
                y: ["-1%", "1.4%", "-0.6%"],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 32,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }
        }
      >
        <Image
          src={BRAND.heroLattice}
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Soft gold light sweep across the lattice */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 35%, rgba(183,163,90,0.09) 48%, transparent 62%)",
            backgroundSize: "220% 220%",
          }}
          animate={{ backgroundPosition: ["0% 40%", "100% 60%", "0% 40%"] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      {/* Soft vignette — keep lattice readable, no logo in frame */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.35)_68%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/45" />
    </div>
  );
}
