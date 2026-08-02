"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Viewport amount before triggering (0–1) */
  amount?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * GPU-only fade-up on scroll (transform + opacity).
 * Uses once-viewport to avoid re-trigger jank.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  amount = 0.22,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: EASE,
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
