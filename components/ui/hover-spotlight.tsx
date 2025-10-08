"use client";

import React from "react";
import clsx from "clsx";

type Props = React.PropsWithChildren<{
  className?: string;
  intensity?: number; // 0..1
  radius?: number; // px
}>;

export function HoverSpotlight({ children, className, intensity = 0.22, radius = 260 }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const [hovered, setHovered] = React.useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={clsx("relative rounded-2xl", className)}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Spotlight layer */}
      <div
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200",
        )}
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, rgba(15,98,178,${intensity}), transparent 60%)`,
          // 15,98,178 = #0f62b2 (primary)
          zIndex: 0,
        }}
      />

      {/* Content is above the spotlight */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
