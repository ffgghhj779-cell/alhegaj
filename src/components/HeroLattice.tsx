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

  const domeFaces = faces.filter(([a, b, c]) => {
    const y = (verts[a][1] + verts[b][1] + verts[c][1]) / 3;
    return y >= -0.08;
  });

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

const DOME_HI = buildDome(3);
const DOME_LO = buildDome(2);

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

export default function HeroLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const angleRef = useRef(0);
  const rafRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dprCap = () =>
      Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);

    const resize = () => {
      const dpr = dprCap();
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const tiltX = -0.42;
    const gold = "183, 163, 90";
    const isMobile = () => window.innerWidth < 768;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, w, h);

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

      const dome = isMobile() ? DOME_LO : DOME_HI;
      const angle = angleRef.current;
      const scale = Math.min(w, h) * (isMobile() ? 0.78 : 0.72);
      const cx = w * 0.5;
      const cy = h * (isMobile() ? 0.52 : 0.58);

      type Seg = { x1: number; y1: number; x2: number; y2: number; z: number };
      const segs: Seg[] = [];

      for (const [i, j] of dome.edges) {
        let a = rotateY(dome.verts[i], angle);
        let b = rotateY(dome.verts[j], angle);
        a = rotateX(a, tiltX);
        b = rotateX(b, tiltX);

        const fov = 2.35;
        const za = a[2] + fov;
        const zb = b[2] + fov;
        if (za <= 0.15 || zb <= 0.15) continue;

        segs.push({
          x1: cx + (a[0] / za) * scale,
          y1: cy - (a[1] / za) * scale,
          x2: cx + (b[0] / zb) * scale,
          y2: cy - (b[1] / zb) * scale,
          z: (a[2] + b[2]) / 2,
        });
      }

      segs.sort((p, q) => p.z - q.z);

      const pulse = reduceMotion
        ? 1
        : 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(angle * 2.4));

      for (const s of segs) {
        const depth = (s.z + 1) / 2;
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.strokeStyle = `rgba(${gold}, ${(0.12 + depth * 0.38) * pulse})`;
        ctx.lineWidth = 0.6 + depth * 1.1;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      /* Sparse vertex sparks — cheap, no particle system */
      const sparkStep = isMobile() ? 5 : 3;
      for (let i = 0; i < dome.verts.length; i += sparkStep) {
        let v = rotateY(dome.verts[i], angle);
        v = rotateX(v, tiltX);
        const z = v[2] + 2.35;
        if (z <= 0.2) continue;
        const x = cx + (v[0] / z) * scale;
        const y = cy - (v[1] / z) * scale;
        const depth = (v[2] + 1) / 2;
        const r = 0.9 + depth * 1.4;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gold}, ${(0.18 + depth * 0.35) * pulse})`;
        ctx.fill();
      }

      const bloom = ctx.createRadialGradient(
        w * 0.5,
        h * 0.38,
        0,
        w * 0.5,
        h * 0.4,
        w * 0.35,
      );
      bloom.addColorStop(0, `rgba(${gold}, ${0.055 + pulse * 0.055})`);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);
    };

    const speed = 0.0038;
    const tick = () => {
      if (reduceMotion) {
        draw();
        return;
      }
      if (visibleRef.current) {
        angleRef.current += speed;
        draw();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    draw();
    if (!reduceMotion) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030303]" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(183,163,90,0.07)_0%,transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,transparent_42%,rgba(0,0,0,0.4)_78%,rgba(0,0,0,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
