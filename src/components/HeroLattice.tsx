"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Vec3 = [number, number, number];

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function mid(a: Vec3, b: Vec3): Vec3 {
  return normalize([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]);
}

/** Icosphere subdivided, then keep upper hemisphere (dome). */
function buildDome(subdivisions: number) {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: Vec3[] = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],
    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],
    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1],
  ];
  let verts: Vec3[] = raw.map((v) => normalize(v));

  let faces: [number, number, number][] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  for (let s = 0; s < subdivisions; s++) {
    const next: [number, number, number][] = [];
    const cache = new Map<string, number>();
    const getMid = (a: number, b: number) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const hit = cache.get(key);
      if (hit !== undefined) return hit;
      const m = mid(verts[a], verts[b]);
      const idx = verts.length;
      verts.push(m);
      cache.set(key, idx);
      return idx;
    };
    for (const [a, b, c] of faces) {
      const ab = getMid(a, b);
      const bc = getMid(b, c);
      const ca = getMid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }

  // Keep faces that sit mostly on the upper dome (y >= -0.05)
  const domeFaces = faces.filter(([a, b, c]) => {
    const y = (verts[a][1] + verts[b][1] + verts[c][1]) / 3;
    return y >= -0.08;
  });

  // Unique edges
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (const [a, b, c] of domeFaces) {
    for (const [i, j] of [
      [a, b],
      [b, c],
      [c, a],
    ] as const) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edges.push([i, j]);
    }
  }

  return { verts, edges };
}

const { verts: BASE_VERTS, edges: BASE_EDGES } = buildDome(3);

function rotateY(v: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function rotateX(v: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

/**
 * Custom geodesic dome — procedural wireframe (not from photo),
 * slow orbit like the upper half of a sphere.
 */
export default function HeroLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const angleRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tiltX = -0.42; // look up under the vault
    const gold = "183, 163, 90";

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Atmosphere
      const bg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.42,
        w * 0.05,
        w * 0.5,
        h * 0.5,
        w * 0.72,
      );
      bg.addColorStop(0, "#12100c");
      bg.addColorStop(0.55, "#080807");
      bg.addColorStop(1, "#030303");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const angle = angleRef.current;
      const scale = Math.min(w, h) * 0.72;
      const cx = w * 0.5;
      const cy = h * 0.58;

      // Project edges with depth sorting for subtle lighting
      type Seg = { x1: number; y1: number; x2: number; y2: number; z: number };
      const segs: Seg[] = [];

      for (const [i, j] of BASE_EDGES) {
        let a = rotateY(BASE_VERTS[i], angle);
        let b = rotateY(BASE_VERTS[j], angle);
        a = rotateX(a, tiltX);
        b = rotateX(b, tiltX);

        // Perspective
        const fov = 2.35;
        const za = a[2] + fov;
        const zb = b[2] + fov;
        if (za <= 0.15 || zb <= 0.15) continue;

        const x1 = cx + (a[0] / za) * scale;
        const y1 = cy - (a[1] / za) * scale;
        const x2 = cx + (b[0] / zb) * scale;
        const y2 = cy - (b[1] / zb) * scale;
        segs.push({ x1, y1, x2, y2, z: (a[2] + b[2]) / 2 });
      }

      segs.sort((p, q) => p.z - q.z);

      for (const s of segs) {
        const depth = (s.z + 1) / 2; // ~0..1
        const alpha = 0.12 + depth * 0.38;
        const width = 0.6 + depth * 1.1;
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.strokeStyle = `rgba(${gold}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Soft gold bloom in the vault center
      const bloom = ctx.createRadialGradient(
        w * 0.5,
        h * 0.38,
        0,
        w * 0.5,
        h * 0.4,
        w * 0.35,
      );
      bloom.addColorStop(0, `rgba(${gold}, 0.09)`);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);
    };

    const speed = 0.0042; // rad per frame ~ slow luxury spin
    const tick = () => {
      if (!reduceMotion) {
        angleRef.current += speed;
      }
      draw();
      rafRef.current = requestAnimationFrame(tick);
    };

    draw();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030303]" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,transparent_45%,rgba(0,0,0,0.35)_80%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}
