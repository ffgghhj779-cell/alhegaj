"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Staggered fade-up for grid children — transform/opacity only */
export default function StaggerGrid({ children, className }: StaggerGridProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
