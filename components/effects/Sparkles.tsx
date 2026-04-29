import { useMemo } from "react";

export function Sparkles({ count = 6, seed = 0 }: { count?: number; seed?: number }) {
  const pts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const rand = (k: number) => {
          const x = Math.sin((seed + i) * 9301 + k * 49297) * 233280;
          return x - Math.floor(x);
        };
        return {
          top: rand(0) * 80 + 5 + "%",
          left: rand(1) * 80 + 5 + "%",
          delay: (rand(2) * 2.4).toFixed(2) + "s",
          size: (6 + rand(3) * 8).toFixed(0) + "px",
          key: i,
        };
      }),
    [count, seed],
  );
  return (
    <>
      {pts.map((p) => (
        <span
          key={p.key}
          className="cf-sparkle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}
