"use client";

import { useEffect, useMemo, useRef } from "react";

const VARIANTS = [
  { src: "/assets/petals/petal-a.svg", kind: "petal", wRatio: 1.0 },
  { src: "/assets/petals/petal-b.svg", kind: "petal", wRatio: 1.05 },
  { src: "/assets/petals/petal-c.svg", kind: "petal", wRatio: 0.85 },
  { src: "/assets/petals/petal-d.svg", kind: "petal", wRatio: 0.95 },
  { src: "/assets/petals/leaf-soft.svg", kind: "leaf", wRatio: 1.8 },
  { src: "/assets/petals/leaf-small.svg", kind: "leaf", wRatio: 1.6 },
] as const;

export type PetalDensity = "heavy" | "medium" | "light" | "none";

export function Petals({ density = "medium" }: { density?: PetalDensity }) {
  const n = density === "heavy" ? 32 : density === "light" ? 10 : 20;

  const petals = useMemo(() => {
    if (density === "none") return [];
    // Deterministic-ish RNG seeded by index for SSR stability
    return Array.from({ length: n }, (_, i) => {
      const rand = (k: number) => {
        const x = Math.sin(i * 9301 + k * 49297) * 233280;
        return x - Math.floor(x);
      };
      const isLeaf = rand(0) < 0.22;
      const pool = isLeaf
        ? VARIANTS.filter((v) => v.kind === "leaf")
        : VARIANTS.filter((v) => v.kind === "petal");
      const v = pool[Math.floor(rand(1) * pool.length)];
      const base = 10 + rand(2) * 12;
      return {
        key: i,
        src: v.src,
        kind: v.kind,
        left: (rand(3) * 100).toFixed(1) + "%",
        duration: (7 + rand(4) * 6).toFixed(1) + "s",
        delay: (-rand(5) * 20).toFixed(1) + "s",
        w: base * v.wRatio,
        h: base,
        rot: (rand(6) * 360).toFixed(0) + "deg",
        spin: ((rand(7) - 0.5) * 300).toFixed(0) + "deg",
        opacity: (0.5 + rand(8) * 0.25).toFixed(2),
      };
    });
  }, [n, density]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (density === "none") return;
    const RX = 220;
    const RY = 180;
    const STRENGTH = 55;
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const nodes = el.children;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i] as HTMLElement;
          let pushX = 0;
          if (mouse.active) {
            const r = node.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const nx = Math.abs(dx) / RX;
            const ny = Math.abs(dy) / RY;
            if (nx < 1 && ny < 1) {
              const fx = 1 - nx;
              const fy = 1 - ny;
              const falloff = fx * fx * fy;
              pushX = (dx >= 0 ? 1 : -1) * STRENGTH * falloff;
            }
          }
          node.style.setProperty("--pushX", pushX.toFixed(1) + "px");
        }
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density, n]);

  if (density === "none") return null;

  return (
    <div className="cf-petals" aria-hidden="true" ref={containerRef}>
      {petals.map((p) => (
        <span
          key={p.key}
          className={`cf-petal cf-petal--${p.kind}`}
          style={
            {
              left: p.left,
              width: p.w + "px",
              height: p.h + "px",
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
              "--rot": p.rot,
              "--spin": p.spin,
            } as React.CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} className="cf-petal-img" alt="" />
        </span>
      ))}
    </div>
  );
}
