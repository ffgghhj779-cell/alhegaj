"use client";

import { motion, useReducedMotion } from "framer-motion";

type GoldRuleProps = {
  className?: string;
  /** RTL sections often want the line to grow from the start edge */
  origin?: "center" | "start" | "end";
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin gold rule that draws itself once on scroll — transform only */
export default function GoldRule({
  className = "mx-auto mb-6 h-px w-14 bg-gold",
  origin = "center",
}: GoldRuleProps) {
  const reduceMotion = useReducedMotion();
  const transformOrigin =
    origin === "start" ? "right center" : origin === "end" ? "left center" : "center";

  if (reduceMotion) {
    return <div className={className} aria-hidden />;
  }

  return (
    <motion.div
      className={className}
      style={{ transformOrigin, willChange: "transform" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.85, ease: EASE }}
      aria-hidden
    />
  );
}
