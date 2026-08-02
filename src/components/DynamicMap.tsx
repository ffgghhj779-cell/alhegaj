"use client";

import dynamic from "next/dynamic";
import type { InteractiveMapProps } from "@/components/InteractiveMap";

function MapSkeleton({ height = 360, className }: Pick<InteractiveMapProps, "height" | "className">) {
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
  loading: () => <MapSkeleton />,
});

export default function DynamicMap(props: InteractiveMapProps) {
  return <InteractiveMap {...props} />;
}
