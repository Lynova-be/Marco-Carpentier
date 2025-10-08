import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export const HoverEffect = ({
  items,
  className,
  onItemClick,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image?: string;
  }[];
  className?: string;
  onItemClick?: (index: number) => void;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <ComponentWrapper
          key={item?.link + idx}
          href={item?.link}
          onClick={onItemClick ? () => onItemClick(idx) : undefined}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary/10 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.image && (
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <CardTitle className="text-gray-900">{item.title}</CardTitle>
            <CardDescription className="text-gray-600">{item.description}</CardDescription>
          </Card>
        </ComponentWrapper>
      ))}
    </div>
  );
};

// Internal helper: renders <button> for clickable items, else <a>
function ComponentWrapper({
  href,
  onClick,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </a>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-primary/20 ring-1 ring-primary/10 shadow-xl group-hover:shadow-2xl transition-shadow relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
