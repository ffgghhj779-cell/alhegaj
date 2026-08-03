"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { InteractiveMapProps } from "@/components/InteractiveMap";

function MapSkeleton({
  height = 360,
  className,
}: Pick<InteractiveMapProps, "height" | "className">) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-border bg-surface ${className ?? ""}`}
      style={{ height }}
      aria-hidden
    />
  );
}

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
});

export default function DynamicMap(props: InteractiveMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <MapSkeleton height={props.height} className={props.className} />;
  }

  return <InteractiveMap {...props} />;
}
